"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "../hooks/use-auth";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/use-form";
import { ROUTES, ERROR_MESSAGES } from "@/lib/constants";

export function LoginForm() {
  const signIn = useSignIn();
  const router = useRouter();

  const { values, isSubmitting, error, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (formValues) => {
      await signIn.mutateAsync(formValues);
      router.push(ROUTES.HOME);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm" role="alert">
          {error || ERROR_MESSAGES.AUTH.LOGIN_FAILED}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
