import { getMqzAPIClient } from "@/lib/mqz-api";
import { DEFAULT_GAME_DIFFICULTY, DEFAULT_GAME_THEME } from "@/lib/constants";
import type { AnswerGameQuizResponse, CreateGameResponse, GetGameResponse } from "../types/games";

/**
 * Create a new game with default theme and difficulty
 * @returns Promise with game creation response
 */
export async function createGame() {
  const apiClient = getMqzAPIClient();
  return apiClient<CreateGameResponse>(`/games`, {
    method: "POST",
    body: {
      theme: DEFAULT_GAME_THEME,
      difficulty: DEFAULT_GAME_DIFFICULTY,
    },
  });
}

/**
 * Fetch game details by ID
 * @param gameId - The game ID to fetch
 * @returns Promise with game data
 */
export async function getGame(gameId: string) {
  const apiClient = getMqzAPIClient();
  return apiClient<GetGameResponse>(`/games/${gameId}`, {
    method: "GET",
  });
}

/**
 * Submit answer for a game quiz
 * @param gameId - The game ID
 * @param gameQuizId - The quiz ID
 * @param answers - Array of answer values
 * @returns Promise with answer submission response
 */
export async function answerGameQuiz(
  gameId: string,
  gameQuizId: string,
  answers: { value: string }[]
) {
  const apiClient = getMqzAPIClient();
  return apiClient<AnswerGameQuizResponse>(
    `/games/${gameId}/quizes/${gameQuizId}/answer`,
    {
      method: "POST",
      body: { answers },
    }
  );
}