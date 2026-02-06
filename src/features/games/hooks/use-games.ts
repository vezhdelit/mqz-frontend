import { useMutation, useQuery } from "@tanstack/react-query";
import { answerGameQuiz, createGame, getGame } from "../actions/games";
import { queryKeys } from "@/lib/query-keys";
import type { ExtendedGame } from "@/types/games";

interface AnswerGameQuizInput {
  gameId: string;
  gameQuizId: string;
  answers: { value: string }[];
}

/**
 * Hook for creating a new game
 * @returns Mutation for game creation
 */
export function useCreateGame() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await createGame();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.data;
    },
  });
}

/**
 * Hook for fetching game details
 * @param gameId - The game ID to fetch
 * @returns Query with game data
 */
export function useGetGame(gameId: string) {
  return useQuery({
    queryKey: queryKeys.games.detail(gameId),
    queryFn: async () => {
      const { data, error } = await getGame(gameId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.data as ExtendedGame;
    },
    enabled: !!gameId,
  });
}

/**
 * Hook for submitting an answer to a game quiz
 * @returns Mutation for answering a quiz
 */
export function useAnswerGameQuiz() {
  return useMutation({
    mutationFn: async ({ gameId, gameQuizId, answers }: AnswerGameQuizInput) => {
      const { data, error } = await answerGameQuiz(gameId, gameQuizId, answers);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.data;
    },
  });
}