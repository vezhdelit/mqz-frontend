import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
    server: {
    },
    runtimeEnv: {
    },
    emptyStringAsUndefined: true,
});

export type ServerEnv = typeof serverEnv;