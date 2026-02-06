import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedQuizQuestion } from "@/types/quiz-questions";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: ExtendedQuizQuestion;
  isRevealed?: boolean;
  questionReveal?: ExtendedQuizQuestionReveal | null;
}

export function QuizQuestion({
  question,
  isRevealed,
  questionReveal,
}: QuizQuestionProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // Preload reveal images when they become available
  useEffect(() => {
    if (isRevealed && questionReveal && questionReveal.items.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagesLoaded(false);
      const imageUrls = questionReveal.items
        .map((item) => item.imageUrl)
        .filter((url): url is string => !!url);

      if (imageUrls.length === 0) {
        setImagesLoaded(true);
        setTimeout(() => setShowReveal(true), 50);
        return;
      }

      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
          // Small delay for smoother transition
          setTimeout(() => setShowReveal(true), 50);
        })
        .catch(() => {
          // Even on error, show the reveal
          setImagesLoaded(true);
          setTimeout(() => setShowReveal(true), 50);
        });
    } else {
      setShowReveal(false);
      setImagesLoaded(true);
    }
  }, [isRevealed, questionReveal]);

  return (
    <Card className="bg-white/10 border-white/20 animate-in fade-in slide-in-from-top-4 duration-500">
      <CardContent className="p-6 relative min-h-[300px]">
        {/* Default Question */}
        <div
          className={cn(
            "transition-opacity duration-500",
            showReveal && isRevealed
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          )}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            {question.title}
          </h2>
          {question.description && (
            <p className="text-white/80 mb-4">{question.description}</p>
          )}
          {question.items && question.items.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {question.items.map((item) => (
                <div key={item.id}>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.text || "Quiz image"}
                      width={200}
                      height={150}
                      className="rounded-lg"
                      priority
                    />
                  )}
                  {item.text && <p className="text-white mt-2">{item.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question Reveal */}
        {questionReveal && (
          <div
            className={cn(
              "absolute inset-6 transition-opacity duration-500",
              showReveal && imagesLoaded && isRevealed
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {questionReveal.title}
            </h2>
            {questionReveal.description && (
              <p className="text-white/80 mb-4">{questionReveal.description}</p>
            )}
            {questionReveal.items && questionReveal.items.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {questionReveal.items.map((item) => (
                  <div key={item.id}>
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.text || "Quiz reveal image"}
                        width={200}
                        height={150}
                        className="rounded-lg"
                        priority
                      />
                    )}
                    {item.text && (
                      <p className="text-white mt-2">{item.text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


