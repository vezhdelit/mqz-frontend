import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_MQZ_API_URL: z.url(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_MQZ_API_URL: process.env.NEXT_PUBLIC_MQZ_API_URL,
    },
    emptyStringAsUndefined: true,
});

export type ClientEnv = typeof clientEnv;