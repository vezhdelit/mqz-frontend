import { ExtendedGameQuiz, GameQuiz } from "./game-quizes";

export interface Game {
    id: string;
    userId: string;
    difficulty: 'easy' | 'medium' | 'hard';
    theme: string;
    status: string;
    totalQuizes: number;
    completedQuizes: number;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    expiresAt: string | null;
    archivedAt: string | null;
}
export type ExtendedGame = Game & {
    gameQuizes: ExtendedGameQuiz[];
    currentGameQuizId: ExtendedGameQuiz["id"] | null;
}
