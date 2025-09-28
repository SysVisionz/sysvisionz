import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from "iron-session";
import { cookies} from 'next/headers'
import {
  sessionOptions,
  sleep,
  defaultSession,
  SessionData,
} from "~/session-lib";

export async function GET (
  request: NextRequest,
) {
    const res = NextResponse.next({
      request
    })
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    const action = request.nextUrl.searchParams.get('action') as string;

    // Handle logout
    if (action === "logout") {
      const user = session.username
      session.destroy();
      return new NextResponse(JSON.stringify(`successfully logged out user ${user}`), {status: 200});
    }

    // Handle session retrieval
    await sleep(250);

    if (session.isLoggedIn !== true) {
      return new Response(JSON.stringify(defaultSession), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(session), {status: 200})
    }
    return;
  }
  // POST request handling (for session creation)
export async function POST (
  req: NextRequest,
)  {
  const res = NextResponse.next({request: req})
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.isLoggedIn = true;
    session.username = (await req.json()).username ?? "No username";
    await session.save();

    await sleep(250);

    return new Response(JSON.stringify(session.username));
  }
