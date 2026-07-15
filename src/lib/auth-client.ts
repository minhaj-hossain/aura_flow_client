import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Dynamically detect origin in browser to prevent preview environment mismatches
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BASE_URL || "http://localhost:3000",
});
