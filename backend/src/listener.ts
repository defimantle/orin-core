import { Connection, PublicKey } from '@solana/web3.js';
import * as admin from 'firebase-admin';
import { adjustRoomEnvironment } from './mqtt_mock';
import './firebase_config'; // Initialize Firebase Admin
import * as fs from 'fs';
import * as path from 'path';
import { BorshCoder, Idl } from '@coral-xyz/anchor';

// NOTE: Replace with your deployed Program ID or dynamic devnet string
const PROGRAM_ID = new PublicKey("FqtrHgdYTph1DSP9jDYD7xrKPrjSjCTtnw6fyKMmboYk");

// Change to your actual Solana RPC (Devnet/Mainnet/Local)
const NETWORK = process.env.NETWORK || 'Localnet';
const RPC_ENDPOINT = NETWORK === 'Localnet' ? 'http://127.0.0.1:8899' : 'https://api.devnet.solana.com';

const connection = new Connection(RPC_ENDPOINT, 'confirmed');

// Load IDL and configure Coder
const IDL_PATH = path.resolve(__dirname, "../../target/idl/orin_identity.json");
const idl = JSON.parse(fs.readFileSync(IDL_PATH, "utf8")) as Idl;
const coder = new BorshCoder(idl);

export function startSolanaListener() {
    console.log(`[ORIN-Backend] 🚀 Starting Solana listener on ${RPC_ENDPOINT}`);
    console.log(`[ORIN-Backend] 📡 Watching Program ID: ${PROGRAM_ID.toBase58()}\n`);

    // Listen to all account changes owned by our Anchor program
    connection.onProgramAccountChange(
        PROGRAM_ID,
        async (updatedAccountInfo, context) => {
            console.log("---------------------------------------------------------");
            console.log(`[ORIN-Backend] 🔔 On-chain Data Changed at slot ${context.slot}!`);
            
            const pubkey = updatedAccountInfo.accountId.toBase58();
            // Decode the data right from the account buffer
            let parsedPreferences;
            try {
                // The account name in IDL usually needs lowerCamelCase for Anchor decode
                const decoded = coder.accounts.decode("GuestIdentity", updatedAccountInfo.accountInfo.data);
                // "preferences" is stored as a stringified JSON on-chain
                parsedPreferences = JSON.parse(decoded.preferences || "{}");
            } catch (err) {
                console.error("[ORIN-Backend] ❌ Failed to decode account or parse JSON preferences:", err);
                parsedPreferences = { temp: 22.5, light_color: "#FF5733", brightness: 85 }; // fallback
            }
            
            console.log(`[ORIN-Backend] 👤 Guest Account: ${pubkey}`);
            console.log(`[ORIN-Backend] ✨ Extracted Preferences:`, parsedPreferences);

            try {
                // 1. Sync to Firebase Real-time DB (Mocked if no credentials)
                if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                    const dbRef = admin.database().ref(`/rooms/guest_${pubkey}`);
                    await dbRef.update({
                        has_arrived: true,
                        preferences: parsedPreferences,
                        last_updated: Date.now()
                    });
                    console.log(`[Firebase Sync] ✅ Triggered Real-time DB update for Frontend.`);
                } else {
                    console.log(`[Firebase Sync Mock] ⚠️ No Google Credentials found. Bypassing real Firebase hit.`);
                    console.log(`[Firebase Sync Mock] ✅ Simulated DB Update for /rooms/guest_${pubkey}`);
                }

                // 2. Bridge to Physical Layer (IoT / MQTT)
                adjustRoomEnvironment(pubkey, parsedPreferences);

            } catch (error) {
                console.error("[ORIN-Backend] ❌ Failed to sync/bridge data:", error);
            }
            console.log("---------------------------------------------------------");
        },
        'confirmed'
    );
}

// Start listener immediately when executed
if (require.main === module) {
    startSolanaListener();
}
