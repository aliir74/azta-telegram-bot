import { Context, SessionFlavor } from "grammy";

export enum SessionState {
    IDLE = "idle",
    AWAITING_PHONE = "awaitingPhone",
    AWAITING_CONFIRMATION = "awaitingConfirmation",
    AWAITING_ADDITION = "awaitingAddition",
    SENDING_INVITE = "sendingInvite",
    DONE = "done"
}

export interface UserSessionData {
    state: SessionState;
    phoneNumber: string;
}

export interface SessionData {
    users: Record<string, UserSessionData>;
}

export type MyContext = Context & SessionFlavor<SessionData>;

export function getSession(session: SessionData, userId: string) {
    if (!session.users[userId]) {
        session.users[userId] = { state: SessionState.IDLE, phoneNumber: "" };
    }
    return session.users[userId];
}
