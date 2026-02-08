import Image from "next/image";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ExtendedQuizOption } from "@/types/quiz-options";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

interface QuizOptionProps {
  option: ExtendedQuizOption;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  isGiven: boolean;
  onSelect: (optionId: string) => void;
}

/**
 * Individual quiz option card with selection and feedback states
 */
export const QuizOption = memo(function QuizOption({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  isGiven,
  onSelect,
}: QuizOptionProps) {
  const handleClick = () => {
    if (!isAnswered) {
      onSelect(option.id);
    }
  };

  const cardStyles = cn(
    "transition-all duration-500",
    !isAnswered && "cursor-pointer hover:scale-105",
    isSelected && "ring-2 ring-blue-500",
    isAnswered &&
      isCorrect &&
      "ring-2 ring-green-500 bg-green-500/20 animate-in fade-in zoom-in-95 duration-500",
    isAnswered &&
      isGiven &&
      !isCorrect &&
      "ring-2 ring-red-500 bg-red-500/20 animate-in fade-in zoom-in-95 duration-500",
    isAnswered && "cursor-default"
  );

  return (
    <Card className={cn(cardStyles, "py-5")} onClick={handleClick}>
      <CardContent className="p-0 px-2.5 relative">
        {option.item && (
          <>
            {option.item.imageUrl && (
              <Image
                src={option.item.imageUrl}
                alt={option.item.text || "Option"}
                width={300}
                height={200}
                className="rounded-lg w-full object-cover"
              />
            )}
            {option.item.text && (
              <p className="text-white text-center font-semibold">
                {option.item.text}
              </p>
            )}
          </>
        )}
        {isAnswered && (
          <AnswerFeedback isCorrect={isCorrect} isGiven={isGiven} />
        )}
      </CardContent>
    </Card>
  );
});

interface AnswerFeedbackProps {
  isCorrect: boolean;
  isGiven: boolean;
}

function AnswerFeedback({ isCorrect, isGiven }: AnswerFeedbackProps) {
  return (
    <div className="absolute right-3 md:right-5 animate-in zoom-in-50 duration-500 delay-200 top-1/2 -translate-y-1/2">
      {isCorrect && (
        <IoIosCheckmarkCircle
          className="text-green-500 text-3xl"
          aria-label="Correct answer"
        />
      )}
      {isGiven && !isCorrect && (
        <IoIosCloseCircle
          className="text-red-500 text-3xl"
          aria-label="Incorrect answer"
        />
      )}
    </div>
  );
}
