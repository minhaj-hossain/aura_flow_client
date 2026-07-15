import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; 

export async function proxy(request: NextRequest) {
  // 1. Fetch the active session securely on the server side using the request headers
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // 2. Protected Route Logic: If no session exists, redirect them to sign-in
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. If authenticated, allow the request to proceed seamlessly
  return NextResponse.next();
}

// 4. Corrected matcher configuration using an array of absolute paths
export const config = {
  matcher: ["/items/add", "/items/manage", "/profile"],
};
