import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
    server: {
        MQZ_API_URL: z.url()
    },
    runtimeEnv: {
        MQZ_API_URL: process.env.MQZ_API_URL,
    },
    emptyStringAsUndefined: true,
});

export type ServerEnv = typeof serverEnv;