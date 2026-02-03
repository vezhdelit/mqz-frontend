import Link from "next/link";
import { SignUpForm } from "@/features/auth/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-gray-400">Sign up to get started with MQZ</p>
      </div>
      
      <SignUpForm />
      
      <div className="text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
