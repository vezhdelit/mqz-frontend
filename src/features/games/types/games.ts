import { ApiResponse } from "../../../types/api";
import { Quiz, QuizReveal } from "./quizes";

export type CreateGameResponse = ApiResponse<{
    gameId: string;
}>;

export type GetGameResponse = ApiResponse<Game>;

export type AnswerGameQuizResponse = ApiResponse<{
    quizReveal: QuizReveal | null,

    givenAnswers: {
        value: string;
    }[],
    correctAnswers: {
        value: string;
    }[],
    isCorrect: boolean,

    isGameCompleted: boolean,
    completedQuizes: number,
    totalQuizes: number,

    totalScore: number,
    pointsEarned: number,

}>;

export interface Game {
    id: string;
    userId: string;
    difficulty: 'easy' | 'medium' | 'hard';
    theme: string;
    status: string;
    totalQuizes: number;
    completedQuizes: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    expiresAt: string | null;
    archivedAt: string | null;
    gameQuizes: GameQuiz[];
}

export interface GameQuiz {
    id: string;
    gameId: string;
    quizId: string;
    order: number;
    isCompleted: boolean;
    isCorrect: boolean | null;
    userAnswer: string | null;
    pointsEarned: number;
    timeSpentSeconds: number | null;
    createdAt: string;
    completedAt: string | null;
    quiz: Quiz;
}