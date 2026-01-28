import { useMutation, useQuery } from "@tanstack/react-query";
import { answerQuiz, getQuizes } from "../actions/quizes";

export const useGetQuizes = () => {
    return useQuery({
        queryKey: ["quizes"],
        queryFn: async () => {
            const { data, error } = await getQuizes();
            if (error) {
                throw new Error(error.message);
            }
            return data.quizes;
        },
    });
};

export const useAnswerQuiz = () => {
    return useMutation({
        mutationFn: async ({ quizId, answers }: { quizId: string; answers: { value: string }[] }) => {
            const { data, error } = await answerQuiz(quizId, answers);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: (data) => {
            console.log("Quiz answered successfully:", data);
        },
        onError: (error) => {
            console.error("Error answering quiz:", error);
        },
    });
}