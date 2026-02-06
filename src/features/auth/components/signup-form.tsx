"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "../hooks/use-auth";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/use-form";
import { ROUTES, ERROR_MESSAGES, PASSWORD_MIN_LENGTH } from "@/lib/constants";

export function SignUpForm() {
  const signUp = useSignUp();
  const router = useRouter();

  const { values, isSubmitting, error, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: async (formValues) => {
      await signUp.mutateAsync(formValues);
      router.push(ROUTES.HOME);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

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
          placeholder="Create a password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          disabled={isSubmitting}
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm" role="alert">
          {error || ERROR_MESSAGES.AUTH.SIGNUP_FAILED}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
