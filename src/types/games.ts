import { ExtendedGameQuiz, GameQuiz } from "./game-quizes";

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
}
export type ExtendedGame = Game & {
    gameQuizes: ExtendedGameQuiz[];
}
