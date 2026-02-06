export type QuizAssetItem = {
    id: string;
    quizQuestionId: string | null;
    quizQuestionRevealId: string | null;
    quizOptionId: string | null;
    imageUrl: string | null;
    text: string | null;
    createdAt: string;
    updatedAt: string;
}