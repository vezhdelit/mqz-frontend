import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth";

interface AuthState {
    token: string | null;
    user: User | null;

    setUserData: (token: string | null, user: User | null) => void;
}
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setUserData: (token: string | null, user: User | null) =>
                set({ token, user }),
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

        }
    )
);