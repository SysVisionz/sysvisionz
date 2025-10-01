import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from "iron-session";
import { cookies} from 'next/headers'
import {
  sessionOptions,
  sleep,
  defaultSession,
  SessionData,
} from "~/session-lib";
import UserModel from '../../models/User';

export async function GET (
  request: NextRequest,
) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    const action = request.nextUrl.searchParams.get('action') as string;

    // Handle logout
    if (action === "logout") {
      if (!session.user){
        return new Response('No user logged in at present', {status: 400})
      }
      const user = session.user
      session.destroy();
      return new Response(JSON.stringify(`successfully logged out user ${user?.displayName}`), {status: 200});
    }


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
  const [displayName, pass] = [req.headers.get('displayName'), req.headers.get('pass')]
  if (!displayName || !pass){
    return new Response('Insufficient credentials provided. displayName and pass headers required.', {status: 400})
  }
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  const email = displayName
  const user = await UserModel.findByCredentials({email, displayName}, pass)
  if (!user){
    return new Response ("User not found or credentials incorrect", {status: 400})
  }
    session.user = {
      id: user.id,
      displayName: user.displayName || user.email
    }
    session.isLoggedIn = true;
    await session.save();

    await sleep(250);

    return new Response(`successfully logged in as ${user.displayName || user.email}`);
  }
