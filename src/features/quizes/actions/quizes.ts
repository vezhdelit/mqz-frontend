"use server"

import { getMqzAPIFetchInstance } from "@/lib/mqz-api";
import { QuizResponse } from "@/types/quizes";

export const getQuizes = async () => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<QuizResponse>("/quizes");
}

export const answerQuiz = async (quizId: string, answers: {
    value: string;
}[]) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<{ message: string }>(`/quizes/answer`, {
        method: "POST",
        body: {
            quizId,
            answers
        },
    });
}