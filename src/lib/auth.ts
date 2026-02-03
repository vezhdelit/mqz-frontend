import { betterAuth } from "better-auth";

import { admin, bearer, openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000", "http://localhost:9999"],

  advanced: {
    database: {
      generateId: false,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    bearer(),
    admin(),
    openAPI(),
    nextCookies(),
  ],
});

