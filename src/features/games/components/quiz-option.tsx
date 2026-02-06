import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedQuizOption } from "@/types/quiz-options";
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

export function QuizOption({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  isGiven,
  onSelect,
}: QuizOptionProps) {
  return (
    <Card
      className={cn(
        "transition-all",
        !isAnswered && "cursor-pointer hover:scale-105",
        isSelected && !isAnswered && "ring-2 ring-blue-500",
        isAnswered && isCorrect && "ring-2 ring-green-500 bg-green-500/20",
        isAnswered && isGiven && !isCorrect && "ring-2 ring-red-500 bg-red-500/20",
        isAnswered && "cursor-default"
      )}
      onClick={() => !isAnswered && onSelect(option.id)}
    >
      <CardContent className="p-4 relative">
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
              <p className="text-white mt-2 text-center font-semibold">
                {option.item.text}
              </p>
            )}
          </>
        )}
        {isAnswered && (
          <div className="absolute top-2 right-2">
            {isCorrect && (
              <IoIosCheckmarkCircle className="text-green-500 text-3xl" />
            )}
            {isGiven && !isCorrect && (
              <IoIosCloseCircle className="text-red-500 text-3xl" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
