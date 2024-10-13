import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";

export const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",") ?? [];

export const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID ?? "";

export const REDIS_URL = process.env.REDIS_URL ?? "";
