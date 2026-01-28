import { serverEnv } from "@/env/server";
import { createFetch } from "@better-fetch/fetch";

const MQZ_API_URL = serverEnv.MQZ_API_URL;

export async function getMqzAPIFetchInstance() {
    return createFetch({
        baseURL: MQZ_API_URL
    });
}