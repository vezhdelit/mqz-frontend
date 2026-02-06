import { ExtendedQuiz } from "./quizes";

export interface GameQuiz {
    id: string;
    gameId: string;
    quizId: string;
    order: number;
    isCompleted: boolean;
    isCorrect: boolean | null;
    userAnswers: {
        value: string;
    }[] | null;
    pointsEarned: number;
    timeSpentSeconds: number | null;
    createdAt: string;
    completedAt: string | null;
}

export type ExtendedGameQuiz = GameQuiz & {
    quiz: ExtendedQuiz;
}