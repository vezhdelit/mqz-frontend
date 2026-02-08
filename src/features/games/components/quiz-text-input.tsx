import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Input } from "@/components/ui/input";

interface QuizTextInputProps {
  value: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
  onChange: (value: string) => void;
}

/**
 * Text input component for quiz questions that require typed answers
 */
export const QuizTextInput = memo(function QuizTextInput({
  value,
  isAnswered,
  isCorrect,
  correctAnswer,
  onChange,
}: QuizTextInputProps) {
  const cardStyles = cn(
    "transition-all duration-500",
    isAnswered && isCorrect && "ring-2 ring-green-500 bg-green-500/20",
    isAnswered && !isCorrect && "ring-2 ring-red-500 bg-red-500/20",
  );

  return (
    <Card className={cn(cardStyles, "py-5")}>
      <CardContent className="p-0 px-2.5 relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isAnswered}
          placeholder="Type your answer here..."
          className={cn(
            "w-full text-white resize-none",
            isAnswered && "cursor-not-allowed opacity-70",
          )}
          maxLength={100}
        />

        {isAnswered && (
          <AnswerFeedback
            isCorrect={isCorrect || false}
            correctAnswer={correctAnswer}
          />
        )}

        {!isAnswered && (
          <div className="text-white/50 text-xs mt-2 text-right">
            {value.length}/100 characters
          </div>
        )}
      </CardContent>
    </Card>
  );
});

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer?: string;
}

function AnswerFeedback({ isCorrect, correctAnswer }: AnswerFeedbackProps) {
  return (
    <div className="mt-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <IoIosCheckmarkCircle
              className="text-green-500 text-2xl"
              aria-label="Correct answer"
            />
            <span className="text-green-500 font-semibold">Correct!</span>
          </>
        ) : (
          <>
            <IoIosCloseCircle
              className="text-red-500 text-2xl"
              aria-label="Incorrect answer"
            />
            <span className="text-red-500 font-semibold">Incorrect</span>
          </>
        )}
      </div>
      {!isCorrect && correctAnswer && (
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-white/70 text-sm mb-1">Correct answer:</p>
          <p className="text-white font-medium">{correctAnswer}</p>
        </div>
      )}
    </div>
  );
}
