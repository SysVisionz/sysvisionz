import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  username?: string;
  isLoggedIn?: boolean;
  hello?: string;
}

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieName: "sysvisionz-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax" as const,
    path: "/",
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return await getIronSession<SessionData>(cookies(), sessionOptions);
}