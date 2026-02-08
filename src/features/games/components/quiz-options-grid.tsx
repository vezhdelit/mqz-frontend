import type { ExtendedQuizOption } from "@/types/quiz-options";
import type { Answer } from "@/types/answer";
import { QuizOption } from "./quiz-option";
import { QuizTextInput } from "./quiz-text-input";
import { isCorrectOption, isGivenOption } from "../utils/answer-utils";

interface QuizOptionsGridProps {
  options: ExtendedQuizOption[];
  selectedAnswers: string[];
  textInput?: string;
  isCorrect: boolean;
  isAnswered: boolean;
  correctAnswers: Answer[];
  givenAnswers: Answer[];
  answerType: "single_choice" | "multiple_choice" | "text_input";
  onSelectAnswer: (answerId: string) => void;
  onTextInputChange?: (value: string) => void;
}

/**
 * Display grid of quiz options with interactive selection or text input
 */
export function QuizOptionsGrid({
  options,
  selectedAnswers,
  textInput = "",
  isCorrect,
  isAnswered,
  correctAnswers,
  givenAnswers,
  answerType,
  onSelectAnswer,
  onTextInputChange,
}: QuizOptionsGridProps) {
  // For text_input type, render text input instead of options
  if (answerType === "text_input") {
    // Check if the answer was correct by comparing text values
    const correctAnswerObj = correctAnswers.find((ca): ca is { value: string } => 'value' in ca);

    const correctAnswer = correctAnswerObj?.value;

    return (
      <QuizTextInput
        value={textInput}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer}
        onChange={onTextInputChange || (() => {})}
      />
    );
  }

  // For single/multiple choice, render options grid
  const gridClassName = answerType === "single_choice" 
    ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
    : "grid grid-cols-1 md:grid-cols-2 gap-4";

  return (
    <div className={gridClassName}>
      {options.map((option) => {
        const isSelected = selectedAnswers.includes(option.id);
        const isCorrect = isCorrectOption(option.id, correctAnswers);
        const isGiven = isGivenOption(option.id, givenAnswers);

        return (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={isSelected}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            isGiven={isGiven}
            answerType={answerType}
            onSelect={onSelectAnswer}
          />
        );
      })}
    </div>
  );
}
