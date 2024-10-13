import { InlineKeyboard } from "grammy";
import { SessionState } from "./session";
import { CONFIRM_BUTTON_TEXT, CANCEL_BUTTON_TEXT } from "./consts";

export const CONFIRM_CALLBACK_QUERY = "confirm";
export const CANCEL_CALLBACK_QUERY = "cancel";
const labelDataPairs = [
    [CONFIRM_BUTTON_TEXT, CONFIRM_CALLBACK_QUERY],
    [CANCEL_BUTTON_TEXT, CANCEL_CALLBACK_QUERY]
];
const buttonRow = labelDataPairs.map(([text, query]) =>
    InlineKeyboard.text(text, query)
);
export const confirmButtonKeyboard = InlineKeyboard.from([buttonRow]);
