import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";

export const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",") ?? [];

export const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID ?? "";

if (!GROUP_CHAT_ID) {
    throw new Error("GROUP_CHAT_ID is not set");
}
if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
}
if (!ADMIN_USER_IDS) {
    throw new Error("ADMIN_USER_IDS is not set");
}
