import { useMutation, useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { queryKeys } from "@/lib/query-keys";
import type { Session } from "@/features/auth/types/auth";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

/**
 * Hook for signing in a user
 * @returns Mutation for signing in with email and password
 */
export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: SignInData) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
  });
}

/**
 * Hook for signing up a new user
 * @returns Mutation for creating a new account
 */
export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, username }: SignUpData) => {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: username,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
  });
}

/**
 * Hook for signing out the current user
 * @returns Mutation for signing out
 */
export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
    },
  });
}

/**
 * Hook for getting the current session
 * @returns Query with session data
 */
export function useGetSession() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Session;
    },
  });
}