import { getMqzAPIFetchInstance } from "@/lib/mqz-api";
import { AnswerGameQuizResponse, CreateGameResponse, GetGameResponse } from "../types/games";

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
    return mqzFetchInstance<GetGameResponse>(`/games/${gameId}`, {
        method: "GET",
        credentials: "include",
    });
}

export const asnwerGameQuiz = async (gameId: string, gameQuizId: string, answers: {
    value: string;
}[]) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<AnswerGameQuizResponse>(`/games/${gameId}/quizes/${gameQuizId}/answer`, {
        method: "POST",
        body: {
            answers
        },
        credentials: "include",
    })
};