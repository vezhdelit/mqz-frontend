import { Button } from "@/components/ui/button";

interface QuizActionsProps {
  isAnswered: boolean;
  hasNextQuiz: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function QuizActions({
  isAnswered,
  hasNextQuiz,
  canSubmit,
  isSubmitting,
  onSubmit,
  onNext,
  onFinish,
}: QuizActionsProps) {
  if (!isAnswered) {
    return (
      <div className="flex justify-center gap-4">
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
