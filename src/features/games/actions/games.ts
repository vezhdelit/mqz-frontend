import { getMqzAPIFetchInstance } from "@/lib/mqz-api";
import { AnswerGameQuizResponse, CreateGameResponse, Game } from "@/features/games/types/games";

export const createGame = async () => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<CreateGameResponse>(`/games`, {
        method: "POST",
        body: {
            theme: "drama",
            difficulty: "easy",
        },
        credentials: "include",
    });
}

export const getGame = async (gameId: string) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<{ data: Game }>(`/games/${gameId}`, {
        method: "GET",
        credentials: "include",
    });
}

export const asnwerGameQuiz = async (gameId: string, gameQuizId: string, answer: string) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<AnswerGameQuizResponse>(`/games/${gameId}/quizes/${gameQuizId}/answer`, {
        method: "POST",
        body: {
            answer,
        },
        credentials: "include",
    })
};