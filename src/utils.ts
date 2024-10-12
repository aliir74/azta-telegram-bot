import { NOT_AUTHORIZED_MESSAGE, PHONE_NUMBER_INVALID_MESSAGE } from "./consts";
import { ADMIN_USER_IDS, GROUP_CHAT_ID } from "./environment";
import { Bot, session, Keyboard } from "grammy";
import { SessionData, UserSessionData } from "./session";

export const storePhoneNumber = (
    userState: UserSessionData,
    phoneNumber: string
) => {
    if (!phoneNumber || !phoneNumber.startsWith("+")) {
        throw new Error(PHONE_NUMBER_INVALID_MESSAGE);
    }
    userState.phoneNumber = phoneNumber;
};

export const validateAdminUser = (userId: string): string => {
    if (!ADMIN_USER_IDS.includes(userId)) {
        throw new Error(NOT_AUTHORIZED_MESSAGE);
    }
    return userId;
};
