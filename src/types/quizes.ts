import { QuizAnswer } from "./quiz-answers";
import { ExtendedQuizOption } from "./quiz-options";
import { ExtendedQuizQuestionReveal } from "./quiz-question-reveals";
import { ExtendedQuizQuestion } from "./quiz-questions";


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
}

export type ExtendedQuiz = Quiz & {
    question: ExtendedQuizQuestion | null;
    questionReveal: ExtendedQuizQuestionReveal | null;
    options: ExtendedQuizOption[];
    answers: QuizAnswer[];
}