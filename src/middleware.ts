import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (!hostname.startsWith("dev.")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const credentials = atob(authHeader.slice(6));
    const [username, password] = credentials.split(":");
    const validUser = process.env.BASIC_AUTH_USER;
    const validPass = process.env.BASIC_AUTH_PASSWORD;

    if (validUser && validPass && username === validUser && password === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="DOG ROUTE Dev"' },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|icon\\.svg|favicon\\.ico).*)",
};
