import { clientEnv } from "@/env/client";
import { createFetch } from "@better-fetch/fetch";

const MQZ_API_URL = clientEnv.NEXT_PUBLIC_MQZ_API_URL;

/**
 * Singleton API client instance for MQZ API
 * Avoids creating new fetch instances on every request
 */
let apiClientInstance: ReturnType<typeof createFetch> | null = null;

/**
 * Get or create the MQZ API fetch instance
 * @returns Configured fetch instance with base URL and credentials
 */
export function getMqzAPIClient() {
  if (!apiClientInstance) {
    apiClientInstance = createFetch({
      baseURL: `${MQZ_API_URL}/api`,
      credentials: 'include',
    });
  }
  return apiClientInstance;
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getMqzAPIClient() instead
 */
export async function getMqzAPIFetchInstance() {
  return getMqzAPIClient();
}