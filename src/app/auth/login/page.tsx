import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your account to continue</p>
      </div>
      
      <LoginForm />
      
      <div className="text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
