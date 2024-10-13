import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import {
    TELEGRAM_API_ID,
    TELEGRAM_API_HASH,
    TELEGRAM_SESSION_STRING,
    GROUP_CHAT_ID
} from "./environment";

const tgClient = new TelegramClient(
    new StringSession(TELEGRAM_SESSION_STRING),
    TELEGRAM_API_ID,
    TELEGRAM_API_HASH,
    { connectionRetries: 5 }
);

export async function addNewCustomer(phoneNumber: string) {
    console.log(`Adding new customer with phone number: ${phoneNumber}`);
    await tgClient.connect();
    await tgClient.invoke(
        new Api.channels.InviteToChannel({
            channel: GROUP_CHAT_ID,
            users: [phoneNumber]
        })
    );
}
