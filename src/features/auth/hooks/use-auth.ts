import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store";
import { signIn, signOut, signUp } from "../actions/auth";

export const useSignIn = () => {
    const { setUserData } = useAuthStore();
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await signIn(email, password);
            if (error) {
                console.log("useSignIn error:", error);
                throw new Error(error.message);
            }
            console.log("useSignIn data:", data);

            setUserData(data.token, data.user);
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
            const { data, error } = await signUp(email, password, username);
            if (error) {
                throw new Error(error.message);
            }
            setUserData(data.token, data.user);
            return data;
        }
    });
}

export const useSignOut = () => {
    const { setUserData } = useAuthStore();
    return useMutation({
        mutationFn: async () => {
            const { error } = await signOut();
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