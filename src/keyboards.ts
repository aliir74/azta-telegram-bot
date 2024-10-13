import { InlineKeyboard } from "grammy";
import { SessionState } from "./session";
import { CONFIRM_BUTTON_TEXT, CANCEL_BUTTON_TEXT } from "./consts";

export const CONFIRM_CALLBACK_QUERY = `${SessionState.AWAITING_PHONE}_CONFIRM`;
export const CANCEL_CALLBACK_QUERY = `${SessionState.AWAITING_PHONE}_CANCEL`;
export const confirmButtonKeyboard = new InlineKeyboard()
    .text(CONFIRM_BUTTON_TEXT, CONFIRM_CALLBACK_QUERY)
    .text(CANCEL_BUTTON_TEXT, CANCEL_CALLBACK_QUERY);
