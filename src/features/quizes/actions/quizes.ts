"use server"

import { getMqzAPIFetchInstance } from "@/lib/mqz-api";
import { AnswerQuizResponse, QuizResponse } from "@/types/quizes";

export const getQuizes = async () => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<QuizResponse>("/quizes");
}

export const answerQuiz = async (quizId: string, answers: {
    value: string;
}[]) => {
    const mqzFetchInstance = await getMqzAPIFetchInstance();
    return mqzFetchInstance<AnswerQuizResponse>(`/quizes/${quizId}/answer`, {
        method: "POST",
        body: {
            answers
        },
    });
}