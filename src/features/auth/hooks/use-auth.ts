import { useMutation, useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/auth-client";

export const useSignIn = () => {
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            })
            if (error) {
                throw new Error(error.message);
            }
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
            return data;
        }
    });
}

export const useSignOut = () => {
    return useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            console.log("Signed out successfully");
        },
        onError: (error) => {
            console.error("Error signing out:", error);
        },
    });
}

export const useGetSession = () => {
    return useQuery({
        queryKey: ['auth', 'session'],
        queryFn: async () => {
            const { data, error } = await authClient.getSession();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    });
}