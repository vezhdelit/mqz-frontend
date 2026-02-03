import { serverEnv } from "@/env/server";
import { createFetch } from "@better-fetch/fetch";

const MQZ_API_URL = serverEnv.MQZ_API_URL;

export async function getMqzAPIFetchInstance() {
    // Get token from sessionStorage if available (for authenticated requests)
    let token: string | null = null;
    
    // Check if running in browser context
    if (typeof window !== 'undefined') {
        try {
            const authStore = sessionStorage.getItem('auth-store');
            if (authStore) {
                const parsed = JSON.parse(authStore);
                token = parsed.state?.token || null;
            }
        } catch (error) {
            console.error('Error reading auth token:', error);
        }
    }

    return createFetch({
        baseURL: MQZ_API_URL,
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : undefined
    });
}