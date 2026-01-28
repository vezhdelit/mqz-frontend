import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_APP_BASE_URL: z.url()
    },
    runtimeEnv: {
        NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    },
    emptyStringAsUndefined: true,
});

export type ClientEnv = typeof clientEnv;