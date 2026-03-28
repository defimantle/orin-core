import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.string().optional().default("development"),
  NETWORK: z.enum(["devnet", "mainnet"]).default("devnet"),
  RPC_ENDPOINT: z.string().min(1),
  PROGRAM_ID: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
  GROQ_MODEL: z.string().min(1).default("llama-3.1-8b-instant"),
  GROQ_TIMEOUT_ACK_MS: z.coerce.number().int().positive().default(200),
  GROQ_TIMEOUT_BG_MS: z.coerce.number().int().positive().default(2000),
  DEEPGRAM_API_KEY: z.string().min(1),
  DEEPGRAM_TTS_MODEL: z.string().min(1).default("aura-2-orion-en"),
  MQTT_BROKER_URL: z.string().min(1),
  MQTT_TOPIC: z.string().min(1),
  REDIS_URL: z.string().min(1),
  STATE_PROVIDER: z.enum(["redis", "memory"]).default("redis"),
  API_HOST: z.string().min(1).default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(3001),
});

type ParsedEnv = z.infer<typeof envSchema>;

let cachedEnv: ParsedEnv | null = null;

export function getEnv(): ParsedEnv {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${formatted}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
