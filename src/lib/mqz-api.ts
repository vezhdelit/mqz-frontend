import { clientEnv } from "@/env/client";
import { createFetch } from "@better-fetch/fetch";

const MQZ_API_URL = clientEnv.NEXT_PUBLIC_MQZ_API_URL;

export async function getMqzAPIFetchInstance() {
    return createFetch({
        baseURL: `${MQZ_API_URL}/api`
    });
}