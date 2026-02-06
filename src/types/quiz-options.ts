import { QuizAssetItem } from "./quiz-asset-items";

export type QuizOption = {
    id: string;
    quizId: string;
    createdAt: string;
    updatedAt: string;
};

export type ExtendedQuizOption = QuizOption & {
    item: QuizAssetItem | null;
};