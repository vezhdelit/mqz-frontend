"use client";

import { Button } from "@/components/ui/button";
import { useCreateGame } from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const createGame = useCreateGame();

  return (
    <div className="flex flex-col gap-5 flex-1">
      <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
        Welcome to the MQZ Demo
      </h1>
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
