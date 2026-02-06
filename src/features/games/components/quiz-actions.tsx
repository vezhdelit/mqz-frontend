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
          size="lg"
          className="px-8"
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4">
      {hasNextQuiz ? (
        <Button onClick={onNext} size="lg" className="px-8">
          Next Quiz
        </Button>
      ) : (
        <Button onClick={onFinish} size="lg" className="px-8">
          View Results
        </Button>
      )}
    </div>
  );
}
