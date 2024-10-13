import { Context, InlineKeyboard } from "grammy";
import { getSession, SessionState, MyContext } from "./session";
import {
    CONFIRM_BUTTON_TEXT,
    CANCEL_BUTTON_TEXT,
    INVALID_STATE_MESSAGE,
    RESET_MESSAGE,
    ENTER_NEW_CUSTOMER_PHONE_MESSAGE
} from "./consts";
import { validateAdminUser } from "./utils";
import { addNewCustomer } from "./adminAccount";
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

export const handleConfirmButton = (ctx: MyContext) => {
    console.log("Confirm button event");
    const userId = validateAdminUser(ctx.from?.id.toString() || "");
    const userState = getSession(ctx.session, userId);
    if (userState.state == SessionState.AWAITING_CONFIRMATION) {
        userState.state = SessionState.AWAITING_ADDITION;
    } else {
        ctx.reply(INVALID_STATE_MESSAGE);
        return;
    }
    addNewCustomer(userState.phoneNumber);
};

export const handleCancelButton = (ctx: MyContext) => {
    console.log("Cancel button event");
    const userId = validateAdminUser(ctx.from?.id.toString() || "");
    const userState = getSession(ctx.session, userId);
    if (userState.state == SessionState.AWAITING_PHONE) {
        userState.state = SessionState.IDLE;
    } else {
        ctx.reply(INVALID_STATE_MESSAGE);
        return;
    }
    ctx.reply(RESET_MESSAGE);
    ctx.reply(ENTER_NEW_CUSTOMER_PHONE_MESSAGE);
};
