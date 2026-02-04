"use client";

import { Button } from "@/components/ui/button";
import { useGetSession, useSignOut } from "@/features/auth/hooks/use-auth";
import { useCreateGame } from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useGetSession();
  const router = useRouter();
  const createGame = useCreateGame();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 flex-1">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white w-full text-center">
          Welcome to the MQZ Demo
        </h1>
        {!!session && (
          <Button
            onClick={handleSignOut}
            variant="destructive"
            disabled={signOut.isPending}
          >
            {signOut.isPending ? "Signing out..." : "Sign Out"}
          </Button>
        )}
      </div>

      {!!session && session.user && (
        <div className="text-center text-gray-300">
          <p>
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {session.user.name || session.user.email}
            </span>
            !
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <Button
          onClick={async () => {
            const data = await createGame.mutateAsync();
            router.push(`/games/${data.gameId}`);
          }}
          size="lg"
          className={cn("mx-auto")}
        >
          Create Game
        </Button>
      </div>
    </div>
  );
}
