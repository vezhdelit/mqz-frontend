import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store";
import { authClient } from "@/lib/auth-client";

export const useSignIn = () => {
    const { setUserData } = useAuthStore();
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            })
            if (error) {
                throw new Error(error.message);
            }
            setUserData(data.token, {
                name: data.user.name,
                email: data.user.email,
                emailVerified: data.user.emailVerified,
                createdAt: data.user.createdAt.toISOString(),
                updatedAt: data.user.updatedAt.toISOString(),
                role: "user",
                image: null,
                banned: false,
                banReason: null,
                banExpires: null,
                id: data.user.id,
            });
            return data;
        },
        onSuccess: (data) => {
            console.log("Signed in successfully:", data);
        },
        onError: (error) => {
            console.error("Error signing in:", error);
        },
    });
}

export const useSignUp = () => {
    const { setUserData } = useAuthStore();
    return useMutation({
        mutationFn: async ({ email, password, username }: { email: string; password: string; username: string }) => {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name: username,
            });
            if (error) {
                throw new Error(error.message);
            }
            setUserData(data.token, {
                name: data.user.name,
                email: data.user.email,
                emailVerified: data.user.emailVerified,
                createdAt: data.user.createdAt.toISOString(),
                updatedAt: data.user.updatedAt.toISOString(),
                role: "user",
                image: null,
                banned: false,
                banReason: null,
                banExpires: null,
                id: data.user.id,
            });
            return data;
        }
    });
}

export const useSignOut = () => {
    const { setUserData } = useAuthStore();
    return useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) {
                throw new Error(error.message);
            }
            setUserData(null, null);
        },
        onSuccess: () => {
            console.log("Signed out successfully");
        },
        onError: (error) => {
            console.error("Error signing out:", error);
        },
    });
}

export const useAuth = () => {
    const { token, user } = useAuthStore();

    return {
        isAuthenticated: !!token && !!user,
        token,
        user,
    };
}