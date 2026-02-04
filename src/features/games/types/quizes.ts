import { ApiResponseWithItems } from "../../../types/api";

export type QuizResponse = ApiResponseWithItems<Quiz>;

export interface Quiz {
    id: string;
    type: "blurred_poster" | string; // Using a union in case there are other types
    difficulty: "easy" | "medium" | "hard" | string;
    status: "active" | "inactive" | string;
    createdAt: string; // ISO Date string
    updatedAt: string;
    activatedAt: string | null;
    deactivatedAt: string | null;
    archivedAt: string | null;
    questions: QuizQuestion[];
    options: QuizOption[];
    reveals: QuizReveal[];
    answers: QuizAnswer[];
}

export interface QuizQuestion {
    id: string;
    quizId: string;
    title: string;
    description: string | null;
    items: QuizQuestionItem[];
    createdAt: string;
    updatedAt: string;
}

export interface QuizReveal {
    id: string;
    quizId: string;
    questionId: string;
    title: string;
    description: string | null;
    items: QuizQuestionItem[];
    createdAt: string;
    updatedAt: string;
}

export interface QuizAnswer {
    id: string;
    quizId: string;
    questionId: string;
    answerType: "option" | "text" | string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

export interface QuizQuestionItem {
    imageUrl: string;
}

export interface QuizOption {
    id: string;
    quizId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export interface AnswerQuizResponse {
    message: string;
    givenAnswers: AnswerValue[];
    correctAnswers: AnswerValue[];
    status: "correct" | "incorrect" | string;
}
export interface AnswerValue {
    value: string;
}