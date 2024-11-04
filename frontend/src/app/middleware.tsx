import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl?.pathname;

  if (!token && pathname !== "/signin") {
    // Fallback to localhost or origin based on availability
    const baseUrl = req.nextUrl?.origin || "http://localhost:3000";
    return NextResponse.redirect(new URL("/signin", baseUrl));
  }

  return NextResponse.next();
}



// import { useSession } from "next-auth/react";

// export default function Dashboard() {
//   const { data: session } = useSession();

//   if (!session) {
//     return <p>Please sign in to access the dashboard.</p>;
//   }

//   return <p>Welcome, {session.user.email}!</p>;
// }
