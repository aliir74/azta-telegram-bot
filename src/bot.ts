import { Bot, session } from "grammy";
import { TELEGRAM_BOT_TOKEN } from "./environment";
import { getSession, MyContext, SessionData, SessionState } from "./session";
import {
    HELLO_MESSAGE,
    START_COMMAND,
    START_MESSAGE,
    ENTER_NEW_CUSTOMER_PHONE_MESSAGE,
    CONFIRMATION_MESSAGE,
    RESET_MESSAGE,
    RESET_COMMAND,
    INVALID_STATE_MESSAGE
} from "./consts";
import { storePhoneNumber, validateAdminUser } from "./utils";
import {
    confirmButtonKeyboard,
    handleConfirmButton,
    handleCancelButton,
    CONFIRM_CALLBACK_QUERY,
    CANCEL_CALLBACK_QUERY
} from "./keyboards";
import { storage } from "./redis";

const bot = new Bot<MyContext>(TELEGRAM_BOT_TOKEN);

bot.use(
    session({
        initial: (): SessionData => ({
            users: {}
        }),
        storage: storage
    })
);

// Commands
bot.command(START_COMMAND, async (ctx) => await ctx.reply(START_MESSAGE));
bot.command(RESET_COMMAND, async (ctx) => {
    const userId = validateAdminUser(ctx.from?.id.toString() || "");
    const userState = getSession(ctx.session, userId);
    userState.state = SessionState.IDLE;
    await ctx.reply(RESET_MESSAGE);
});

// Callback queries
bot.on("callback_query:data", async (ctx) => {
    switch (ctx.callbackQuery.data) {
        case CONFIRM_CALLBACK_QUERY:
            await handleConfirmButton(ctx);
            break;
        case CANCEL_CALLBACK_QUERY:
            await handleCancelButton(ctx);
            break;
        default:
            await ctx.reply(INVALID_STATE_MESSAGE);
            break;
    }
});

// Messages
bot.on("message", async (ctx) => {
    const userId = validateAdminUser(ctx.from?.id.toString());
    const userState = getSession(ctx.session, userId);
    const message = ctx.message.text || "";
    switch (userState.state) {
        case SessionState.IDLE:
            await ctx.reply(HELLO_MESSAGE);
            await ctx.reply(ENTER_NEW_CUSTOMER_PHONE_MESSAGE);
            userState.state = SessionState.AWAITING_PHONE;
            break;
        case SessionState.AWAITING_PHONE:
            try {
                storePhoneNumber(userState, message);
            } catch (error) {
                await ctx.reply((error as Error).message);
                return;
            }
            await ctx.reply(
                `${CONFIRMATION_MESSAGE}: ${userState.phoneNumber}`,
                {
                    reply_markup: confirmButtonKeyboard
                }
            );
            userState.state = SessionState.AWAITING_CONFIRMATION;
            break;
    }
});

bot.start();
