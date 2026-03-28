import Fastify from "fastify";
import websocket from "@fastify/websocket";
import WebSocket from "ws";
import { validateEnvOrExit } from "../config/validate_env";
import { getEnv } from "../config/env";
import { stateProvider } from "../state";
import { createRequestLogger, logger } from "../shared/logger";
import { GuestContext, LlmError, OrinAgent } from "../ai_agent";
import { randomUUID } from "node:crypto";
import { FAST_INTENTS } from "../config/fast_intents";

validateEnvOrExit();
const env = getEnv();
const agent = new OrinAgent();

type VoiceCommandBody = {
  guestPda: string;
  userInput: string;
  guestContext: GuestContext;
};

type VoiceTestBody = {
  userInput: string;
  guestContext?: GuestContext;
  deviceId?: string;
};

type VoiceFastCached = {
  text: string;
  audioBase64: string;
  createdAt: number;
};

const VOICE_CACHE_TTL_MS = 10 * 60 * 1000;
const voiceCache = new Map<string, VoiceFastCached>();
const TTS_CACHE_TTL_MS = 10 * 60 * 1000;
const ttsCache = new Map<string, VoiceFastCached>();
const ACK_TEXT = "Dame un segundo y lo resuelvo.";

const app = Fastify({ logger: false });

function normalizeInput(input: string): string {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

function buildCacheKey(userInput: string, guestContext: GuestContext): string {
  return `${normalizeInput(userInput)}::${guestContext.name.toLowerCase()}::${guestContext.loyaltyPoints}`;
}

function getVoiceCache(key: string): VoiceFastCached | null {
  const hit = voiceCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.createdAt > VOICE_CACHE_TTL_MS) {
    voiceCache.delete(key);
    return null;
  }
  return hit;
}

function setVoiceCache(key: string, value: VoiceFastCached): void {
  voiceCache.set(key, value);
}

function getTtsCache(key: string): VoiceFastCached | null {
  const hit = ttsCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.createdAt > TTS_CACHE_TTL_MS) {
    ttsCache.delete(key);
    return null;
  }
  return hit;
}

function setTtsCache(key: string, value: VoiceFastCached): void {
  ttsCache.set(key, value);
}

function ttsKey(text: string): string {
  return normalizeInput(text);
}

function findFastIntentReply(userInput: string): string | null {
  const text = normalizeInput(userInput);
  const intent = FAST_INTENTS.find((it) => it.keys.some((k) => text.includes(k)));
  return intent?.reply ?? null;
}

async function prewarmAckOnly(): Promise<void> {
  try {
    if (!voiceCache.has("ack::default")) {
      const ackAudio = await agent.speak(ACK_TEXT);
      setVoiceCache("ack::default", {
        text: ACK_TEXT,
        audioBase64: ackAudio.toString("base64"),
        createdAt: Date.now(),
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.warn({ err: message }, "prewarm_ack_failed");
  }
}

async function prewarmServices(): Promise<void> {
  const warmContext: GuestContext = {
    name: "Warmup",
    loyaltyPoints: 0,
    history: ["boot"],
  };

  try {
    const text = await agent.generateQuickVoiceReply("Say: ORIN online.", warmContext, {
      timeoutMs: env.GROQ_TIMEOUT_BG_MS,
    });
    await agent.speak(text || "ORIN online.");

    for (const intent of FAST_INTENTS) {
      const key = `intent::${intent.keys[0]}`;
      if (!voiceCache.has(key)) {
        const audio = await agent.speak(intent.reply);
        setVoiceCache(key, {
          text: intent.reply,
          audioBase64: audio.toString("base64"),
          createdAt: Date.now(),
        });
      }
    }

    logger.info({ preloaded_intents: FAST_INTENTS.length }, "prewarm_complete");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.warn({ err: message }, "prewarm_failed_non_blocking");
  }
}

function createDeepgramSocket(): WebSocket {
  const url =
    "wss://api.deepgram.com/v1/listen?model=nova-2&language=en&interim_results=true&endpointing=300&smart_format=true";
  return new WebSocket(url, {
    headers: {
      Authorization: `Token ${env.DEEPGRAM_API_KEY}`,
    },
  });
}

app.register(websocket);

app.addHook("onRequest", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Headers", "Content-Type, x-request-id");
  reply.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (request.method === "OPTIONS") return reply.code(204).send();
});

app.post<{ Body: VoiceCommandBody }>("/api/v1/voice-command", async (request, reply) => {
  const reqLogger = createRequestLogger(request.headers["x-request-id"] as string | undefined);
  const { guestPda, userInput, guestContext } = request.body ?? ({} as VoiceCommandBody);

  if (!guestPda || !userInput || !guestContext) {
    reqLogger.error("invalid_request_body");
    return reply.status(400).send({ error: "Invalid body. Required: guestPda, userInput, guestContext" });
  }

  await stateProvider.setPendingCommand({ guestPda, userInput, guestContext, createdAt: Date.now() });
  reqLogger.info({ guest_pda: guestPda }, "pending_command_stored");
  return reply.status(202).send({ status: "accepted", guestPda, message: "Command staged. Awaiting on-chain hash-lock validation." });
});

app.post<{ Body: VoiceTestBody }>("/api/v1/voice-fast", async (request, reply) => {
  const reqLogger = createRequestLogger(request.headers["x-request-id"] as string | undefined);
  const t0 = Date.now();
  const { userInput, guestContext, deviceId } = request.body ?? ({} as VoiceTestBody);

  if (!userInput || !userInput.trim()) {
    return reply.status(400).send({ error: "userInput is required" });
  }

  const storedPrefs = deviceId ? await stateProvider.getUserPreferences(deviceId) : null;
  const effectiveGuestContext: GuestContext = guestContext ?? {
    name: storedPrefs?.name || "User",
    loyaltyPoints: storedPrefs?.loyaltyPoints ?? 0,
    history: storedPrefs?.history ?? [],
  };

  try {
    const cacheKey = buildCacheKey(userInput, effectiveGuestContext);
    const cached = getVoiceCache(cacheKey);
    if (cached) {
      const tHit = Date.now();
      reqLogger.info({ total_ms: tHit - t0 }, "voice_fast_cache_hit");
      return reply.send({
        status: "ok",
        mimeType: "audio/mpeg",
        audioBase64: cached.audioBase64,
        latencyMs: { llm: 0, tts: 0, total: tHit - t0 },
        cached: true,
        ack: false,
      });
    }

    const fastReply = findFastIntentReply(userInput);
    if (fastReply) {
      const intentKey = FAST_INTENTS.find((it) => it.reply === fastReply)?.keys[0] ?? "intent";
      const prebuilt = getVoiceCache(`intent::${intentKey}`);

      if (prebuilt) {
        setVoiceCache(cacheKey, { ...prebuilt, createdAt: Date.now() });
        const tHit = Date.now();
        reqLogger.info({ total_ms: tHit - t0 }, "voice_fast_intent_prebuilt_hit");
        return reply.send({
          status: "ok",
          mimeType: "audio/mpeg",
          audioBase64: prebuilt.audioBase64,
          latencyMs: { llm: 0, tts: 0, total: tHit - t0 },
          cached: true,
          fastIntent: true,
          ack: false,
        });
      }

      const tA = Date.now();
      const cachedTts = getTtsCache(ttsKey(fastReply));
      const audio = cachedTts ? Buffer.from(cachedTts.audioBase64, "base64") : await agent.speak(fastReply);
      const tB = Date.now();
      const payload = {
        text: fastReply,
        audioBase64: audio.toString("base64"),
        createdAt: Date.now(),
      };
      setTtsCache(ttsKey(fastReply), payload);
      setVoiceCache(cacheKey, payload);
      reqLogger.info({ total_ms: tB - t0 }, "voice_fast_intent_tts_only");
      const responsePayload = {
        status: "ok",
        mimeType: "audio/mpeg",
        audioBase64: payload.audioBase64,
        latencyMs: { llm: 0, tts: tB - tA, total: tB - t0 },
        cached: false,
        fastIntent: true,
        ack: false,
      };

      if (deviceId) {
        const updatedHistory = [userInput, ...(effectiveGuestContext.history ?? [])].slice(0, 10);
        await stateProvider.setUserPreferences(deviceId, {
          name: effectiveGuestContext.name,
          loyaltyPoints: effectiveGuestContext.loyaltyPoints,
          history: updatedHistory,
        });
      }

      return reply.send(responsePayload);
    }

    const t1 = Date.now();
    const ack = getVoiceCache("ack::default");
    if (ack) {
      setImmediate(async () => {
        try {
          const quickText = await agent.generateQuickVoiceReply(userInput, effectiveGuestContext, {
            timeoutMs: env.GROQ_TIMEOUT_BG_MS,
          });
          const t2 = Date.now();
          const cachedTts = getTtsCache(ttsKey(quickText));
          const audioBuffer = cachedTts
            ? Buffer.from(cachedTts.audioBase64, "base64")
            : await agent.speak(quickText);
          const t3 = Date.now();

          setVoiceCache(cacheKey, {
            text: quickText,
            audioBase64: audioBuffer.toString("base64"),
            createdAt: Date.now(),
          });
          setTtsCache(ttsKey(quickText), {
            text: quickText,
            audioBase64: audioBuffer.toString("base64"),
            createdAt: Date.now(),
          });

          reqLogger.info({ llm_ms: t2 - t1, tts_ms: t3 - t2, total_ms: t3 - t0 }, "voice_fast_async_cached");
          if (deviceId) {
            const updatedHistory = [userInput, ...(effectiveGuestContext.history ?? [])].slice(0, 10);
            await stateProvider.setUserPreferences(deviceId, {
              name: effectiveGuestContext.name,
              loyaltyPoints: effectiveGuestContext.loyaltyPoints,
              history: updatedHistory,
            });
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          reqLogger.warn({ err: message }, "voice_fast_async_error");
        }
      });

      const tAck = Date.now();
      reqLogger.info({ total_ms: tAck - t0 }, "voice_fast_ack");
      const responsePayload = {
        status: "ok",
        mimeType: "audio/mpeg",
        audioBase64: ack.audioBase64,
        latencyMs: { llm: 0, tts: 0, total: tAck - t0 },
        cached: true,
        fastIntent: false,
        ack: true,
      };

      if (deviceId) {
        const updatedHistory = [userInput, ...(effectiveGuestContext.history ?? [])].slice(0, 10);
        await stateProvider.setUserPreferences(deviceId, {
          name: effectiveGuestContext.name,
          loyaltyPoints: effectiveGuestContext.loyaltyPoints,
          history: updatedHistory,
        });
      }

      return reply.send(responsePayload);
    }

    const quickText = await agent.generateQuickVoiceReply(userInput, effectiveGuestContext, {
      timeoutMs: env.GROQ_TIMEOUT_BG_MS,
    });
    const t2 = Date.now();
    const cachedTts = getTtsCache(ttsKey(quickText));
    const audioBuffer = cachedTts ? Buffer.from(cachedTts.audioBase64, "base64") : await agent.speak(quickText);
    const t3 = Date.now();

    setVoiceCache(cacheKey, {
      text: quickText,
      audioBase64: audioBuffer.toString("base64"),
      createdAt: Date.now(),
    });
    setTtsCache(ttsKey(quickText), {
      text: quickText,
      audioBase64: audioBuffer.toString("base64"),
      createdAt: Date.now(),
    });

    reqLogger.info({ llm_ms: t2 - t1, tts_ms: t3 - t2, total_ms: t3 - t0 }, "voice_fast_success");

    const responsePayload = {
      status: "ok",
      mimeType: "audio/mpeg",
      audioBase64: audioBuffer.toString("base64"),
      latencyMs: { llm: t2 - t1, tts: t3 - t2, total: t3 - t0 },
      cached: false,
      fastIntent: false,
      ack: false,
    };

    if (deviceId) {
      const updatedHistory = [userInput, ...(effectiveGuestContext.history ?? [])].slice(0, 10);
      await stateProvider.setUserPreferences(deviceId, {
        name: effectiveGuestContext.name,
        loyaltyPoints: effectiveGuestContext.loyaltyPoints,
        history: updatedHistory,
      });
    }

    return reply.send(responsePayload);
  } catch (error) {
    if (error instanceof LlmError && (error.kind === "timeout" || error.kind === "quota")) {
      const tFallbackStart = Date.now();
      const fallbackReply =
        findFastIntentReply(userInput) ?? "Disculpá, tuve un problema de red. ¿Podés repetir?";

      try {
        const cachedTts = getTtsCache(ttsKey(fallbackReply));
        const audioBuffer = cachedTts
          ? Buffer.from(cachedTts.audioBase64, "base64")
          : await agent.speak(fallbackReply);
        const tFallbackEnd = Date.now();
        setTtsCache(ttsKey(fallbackReply), {
          text: fallbackReply,
          audioBase64: audioBuffer.toString("base64"),
          createdAt: Date.now(),
        });
        reqLogger.warn(
          {
            reason: error.kind,
            total_ms: tFallbackEnd - t0,
          },
          "voice_fast_fallback"
        );

        return reply.send({
          status: "ok",
          mimeType: "audio/mpeg",
          audioBase64: audioBuffer.toString("base64"),
          latencyMs: { llm: 0, tts: tFallbackEnd - tFallbackStart, total: tFallbackEnd - t0 },
          cached: false,
          fastIntent: Boolean(findFastIntentReply(userInput)),
          fallback: true,
          ack: false,
        });
      } catch (fallbackError) {
        const message = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        reqLogger.error({ err: message }, "voice_fast_fallback_error");
        return reply.status(503).send({ error: message });
      }
    }

    const message = error instanceof Error ? error.message : String(error);
    reqLogger.error({ err: message }, "voice_fast_error");
    return reply.status(500).send({ error: message });
  }
});

app.get("/api/v1/stt-stream", { websocket: true }, (connection: any) => {
  const clientSocket = connection.socket as WebSocket;
  const dgSocket = createDeepgramSocket();
  const sessionId = randomUUID();
  const t0 = Date.now();
  let firstTokenAt: number | null = null;
  let transcript = "";
  let replySent = false;

  const sendClient = (data: unknown) => {
    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(JSON.stringify(data));
    }
  };

  dgSocket.on("open", () => {
    sendClient({ type: "ready" });
    logger.info({ session_id: sessionId }, "stt_stream_open");
  });

  dgSocket.on("message", (raw) => {
    try {
      const evt = JSON.parse(raw.toString()) as any;
      const text = evt?.channel?.alternatives?.[0]?.transcript as string | undefined;
      const isFinal = Boolean(evt?.is_final);
      if (text && text.trim()) {
        if (!firstTokenAt) firstTokenAt = Date.now();
        if (isFinal) transcript = `${transcript} ${text}`.trim();
        sendClient({ type: "transcript", text, final: isFinal });

        if (isFinal && !replySent) {
          replySent = true;
          (async () => {
            try {
              const quickText = await agent.generateQuickVoiceReply(text, {
                name: "User",
                loyaltyPoints: 0,
                history: [],
              });
              const audioBuffer = await agent.speak(quickText);
              sendClient({
                type: "reply",
                text: quickText,
                mimeType: "audio/mpeg",
                audioBase64: audioBuffer.toString("base64"),
              });
            } catch (err) {
              sendClient({ type: "error", error: (err as Error)?.message ?? String(err) });
            }
          })();
        }
      }
    } catch {
      // no-op
    }
  });

  dgSocket.on("error", (err) => {
    sendClient({ type: "error", error: err.message });
  });

  clientSocket.on("message", (msg: any, isBinary: boolean) => {
    if (isBinary) {
      if (dgSocket.readyState === WebSocket.OPEN) {
        dgSocket.send(msg);
      }
      return;
    }

    try {
      const cmd = JSON.parse(msg.toString()) as { type?: string };
      if (cmd.type === "stop") {
        if (dgSocket.readyState === WebSocket.OPEN) {
          dgSocket.send(JSON.stringify({ type: "CloseStream" }));
          dgSocket.close();
        }
        const tDone = Date.now();
        logger.info(
          {
            session_id: sessionId,
            first_token_ms: firstTokenAt ? firstTokenAt - t0 : null,
            total_ms: tDone - t0,
          },
          "stt_stream_done"
        );
        sendClient({ type: "done", text: transcript.trim() });
      }
    } catch {
      // no-op
    }
  });

  clientSocket.on("close", () => {
    if (dgSocket.readyState === WebSocket.OPEN) {
      dgSocket.send(JSON.stringify({ type: "CloseStream" }));
      dgSocket.close();
    }
    const tClose = Date.now();
    logger.info(
      {
        session_id: sessionId,
        first_token_ms: firstTokenAt ? firstTokenAt - t0 : null,
        total_ms: tClose - t0,
      },
      "stt_stream_closed"
    );
  });
});

app.get("/api/v1/warmup", async () => ({ status: "warm", cacheSize: voiceCache.size }));
app.get("/health", async () => ({ status: "ok" }));

export async function startApiServer(): Promise<void> {
  await prewarmAckOnly();
  await app.listen({ host: env.API_HOST, port: env.API_PORT });
  logger.info({ host: env.API_HOST, port: env.API_PORT }, "api_server_started");
  setImmediate(() => {
    prewarmServices().catch((err) => {
      logger.warn({ err: err?.message ?? String(err) }, "prewarm_services_error");
    });
  });
}

if (require.main === module) {
  startApiServer().catch((err) => {
    logger.error({ err: err.message }, "api_server_start_error");
    process.exit(1);
  });
}

