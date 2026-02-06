
export type QuizAnswer = {
    id: string;
    quizId: string;
    quizOptionId: string | null;
    value: string | null;
    createdAt: string;
    updatedAt: string;
}