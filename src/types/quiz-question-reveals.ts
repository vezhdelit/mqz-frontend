import { QuizAssetItem } from "./quiz-asset-items";

export type QuizQuestionReveal = {
    id: string;
    quizId: string;
    questionId: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export type ExtendedQuizQuestionReveal = QuizQuestionReveal & {
    items: QuizAssetItem[];
}