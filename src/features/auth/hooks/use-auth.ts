import { useMutation } from "@tanstack/react-query"
import { signIn, signOut, signUp } from "../actions/auth";
import { useAuthStore } from "../store/auth.store";

export const useSignIn = () => {
    const { setUserData } = useAuthStore();
    useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await signIn(email, password);
            if (error) {
                throw new Error(error.message);
            }
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