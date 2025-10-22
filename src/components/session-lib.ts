import { SessionOptions } from "iron-session";
import type { ObjectId } from "mongoose";

export interface SessionData {
  user: {
    id: ObjectId,
    displayName: string
  } | null
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: null,
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_SESSION_PASSWORD!,
  cookieName: "sysvisionz-iron-cookie",
  cookieOptions: {
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}