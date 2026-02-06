import { QuizAssetItem } from "./quiz-asset-items";

export type QuizQuestion = {
    id: string;
    quizId: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}
export type ExtendedQuizQuestion = QuizQuestion & {
    items: QuizAssetItem[];
}