import { Button } from "@/components/ui/button";

interface QuizActionsProps {
  isAnswered: boolean;
  hasNextQuiz: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  answerType: "single_choice" | "multiple_choice" | "text_input";
  answerInstructions?: string;
  onSubmit: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function QuizActions({
  isAnswered,
  hasNextQuiz,
  canSubmit,
  isSubmitting,
  answerType,
  answerInstructions,
  onSubmit,
  onNext,
  onFinish,
}: QuizActionsProps) {
  if (!isAnswered) {
    const hintText = answerInstructions
      ? answerInstructions
      : answerType === "single_choice"
        ? "Select one answer"
        : answerType === "multiple_choice"
          ? "Select all that apply"
          : "Type your answer in the text field";

    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-white/70 text-sm font-medium">{hintText}</p>
        <Button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          size="2xl"
          className="px-8 py-8 w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4">
      {hasNextQuiz ? (
        <Button onClick={onNext} size="2xl" className="px-8 py-8 w-full">
          Next Quiz
        </Button>
      ) : (
        <Button onClick={onFinish} size="2xl" className="px-8 py-8 w-full">
          View Results
        </Button>
      )}
    </div>
  );
}
