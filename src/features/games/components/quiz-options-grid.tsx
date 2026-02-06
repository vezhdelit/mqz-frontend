import { ExtendedQuizOption } from "@/types/quiz-options";
import { Answer } from "@/types/answer";
import { QuizOption } from "./quiz-option";

interface QuizOptionsGridProps {
  options: ExtendedQuizOption[];
  selectedAnswers: string[];
  isAnswered: boolean;
  correctAnswers: Answer[];
  givenAnswers: Answer[];
  onSelectAnswer: (answerId: string) => void;
}

export function QuizOptionsGrid({
  options,
  selectedAnswers,
  isAnswered,
  correctAnswers,
  givenAnswers,
  onSelectAnswer,
}: QuizOptionsGridProps) {
  const isAnswerMatch = (answer: Answer, optionId: string): boolean => {
    if ("quizOptionId" in answer) {
      return answer.quizOptionId === optionId;
    }
    if ("value" in answer) {
      return answer.value === optionId;
    }
    return false;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswers.includes(option.id);
        const isCorrect = correctAnswers.some((ans) => isAnswerMatch(ans, option.id));
        const isGiven = givenAnswers.some((ans) => isAnswerMatch(ans, option.id));

        return (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={isSelected}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            isGiven={isGiven}
            onSelect={onSelectAnswer}
          />
        );
      })}
    </div>
  );
}
