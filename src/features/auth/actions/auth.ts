"use server";

import { getMqzAPIFetchInstance } from "@/lib/mqz-api";
import { SignInResponse } from "@/features/auth/types/auth";

export const signIn = async (email: string, password: string) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<SignInResponse>(`/auth/sign-in/email`, {
        method: "POST",
        body: {
            email,
            password,
        },
    });
}

export const signUp = async (email: string, password: string, username: string) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<SignInResponse>(`/auth/sign-up/email`, {
        method: "POST",
        body: {
            email,
            password,
            username,
        },
    });
}

export const signOut = async () => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<void>(`/auth/sign-out`, {
        method: "POST",
    });
}