import { Answer } from "@/types/answer";
import { ApiResponse } from "@/types/api";
import { ExtendedGame } from "@/types/games";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";

export type CreateGameResponse = ApiResponse<{
    gameId: string;
}>;

export type GetGameResponse = ApiResponse<ExtendedGame>;

export type AnswerGameQuizResponse = ApiResponse<{
    quizQuestionReveal: ExtendedQuizQuestionReveal | null;

    givenAnswers: Answer[];
    correctAnswers: Answer[];
    isCorrect: boolean;

    isGameCompleted: boolean;
    completedQuizes: number;
    totalQuizes: number;
}>;