import { useMutation, useQuery } from "@tanstack/react-query";
import { asnwerGameQuiz, createGame, getGame } from "../actions/games";

export const useCreateGame = () => {
    return useMutation({
        mutationFn: async () => {
            const { data, error } = await createGame();
            if (error) {
                throw new Error(error.message);
            }
            return data.data;
        },
        onSuccess: (data) => {
            console.log("Quiz answered successfully:", data);
        },
        onError: (error) => {
            console.error("Error answering quiz:", error);
        },
    });
}

export const useGetGame = (gameId: string) => {
    return useQuery({
        queryKey: ["game", gameId],
        queryFn: async () => {
            const { data, error } = await getGame(gameId);
            if (error) {
                throw new Error(error.message);
            }
            return data.data;
        }
    });
}

export const useAnswerGameQuiz = () => {
    return useMutation({
        mutationFn: async ({ gameId, gameQuizId, answers }: {
            gameId: string; gameQuizId: string; answers: {
                value: string;
            }[]
        }) => {
            const { data, error } = await asnwerGameQuiz(gameId, gameQuizId, answers);
            if (error) {
                throw new Error(error.message);
            }
            return data.data;
        },
        onSuccess: (data) => {
            console.log("Game quiz answered successfully:", data);
        },
        onError: (error) => {
            console.error("Error answering game quiz:", error);
        },
    });
}