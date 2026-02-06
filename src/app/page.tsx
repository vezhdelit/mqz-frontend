"use client";

import { Button } from "@/components/ui/button";
import { useGetSession, useSignOut } from "@/features/auth/hooks/use-auth";
import { useCreateGame } from "@/features/games/hooks/use-games";
import { formatUserDisplayName } from "@/lib/format";
import { ROUTES, ERROR_MESSAGES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export default function Page() {
  const { data: session, isLoading: isSessionLoading } = useGetSession();
  const router = useRouter();
  const createGame = useCreateGame();
  const signOut = useSignOut();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      await signOut.mutateAsync();
      router.push(ROUTES.LOGIN);
    } catch (err) {
      const message = err instanceof Error ? err.message : ERROR_MESSAGES.AUTH.SIGNOUT_FAILED;
      setError(message);
    }
  }, [signOut, router]);

  const handleCreateGame = useCallback(async () => {
    try {
      setError(null);
      const data = await createGame.mutateAsync();
      router.push(ROUTES.GAME(data.gameId));
    } catch (err) {
      const message = err instanceof Error ? err.message : ERROR_MESSAGES.GAME.CREATE_FAILED;
      setError(message);
    }
  }, [createGame, router]);

  if (isSessionLoading) {
    return <LoadingState message="Loading your session..." />;
  }

  return (
    <div className="flex flex-col gap-5 flex-1">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white w-full text-center">
          Welcome to the MQZ Demo
        </h1>
        {session && (
          <Button
            onClick={handleSignOut}
            variant="destructive"
            disabled={signOut.isPending}
          >
            {signOut.isPending ? "Signing out..." : "Sign Out"}
          </Button>
        )}
      </div>

      {session?.user && (
        <div className="text-center text-gray-300">
          <p>
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {formatUserDisplayName(session.user.name, session.user.email)}
            </span>
            !
          </p>
        </div>
      )}

      {error && (
        <ErrorState
          title="Action Failed"
          message={error}
          onRetry={() => setError(null)}
        />
      )}

      <div className="flex flex-col gap-6">
        <Button
          onClick={handleCreateGame}
          size="lg"
          className="mx-auto"
          disabled={createGame.isPending}
        >
          {createGame.isPending ? "Creating..." : "Create Game"}
        </Button>
      </div>
    </div>
  );
}
