import { InlineKeyboard } from "grammy";
import { SessionState } from "./session";
import { CONFIRM_BUTTON_TEXT, CANCEL_BUTTON_TEXT } from "./consts";

export const confirmButtonKeyboard = new InlineKeyboard()
    .text(CONFIRM_BUTTON_TEXT, `${SessionState.AWAITING_PHONE}_CONFIRM`)
    .text(CANCEL_BUTTON_TEXT, `${SessionState.AWAITING_PHONE}_CANCEL`);
