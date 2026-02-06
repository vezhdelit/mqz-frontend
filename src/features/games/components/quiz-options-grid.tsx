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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswers.includes(option.id);
        const isCorrect =
          correctAnswers.some(
            (ans) => "quizOptionId" in ans && ans.quizOptionId === option.id
          ) || false;
        const isGiven =
          givenAnswers.some(
            (ans) => "quizOptionId" in ans && ans.quizOptionId === option.id
          ) || false;

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
