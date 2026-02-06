import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ExtendedQuizQuestion } from "@/types/quiz-questions";
import type { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";
import { cn } from "@/lib/utils";
import { preloadImages } from "@/lib/image-utils";
import { IMAGE_PRELOAD_DELAY_MS } from "@/lib/constants";

interface QuizQuestionProps {
  question: ExtendedQuizQuestion;
  isRevealed?: boolean;
  questionReveal?: ExtendedQuizQuestionReveal | null;
}

/**
 * Display quiz question with optional reveal
 * Handles image preloading for smooth transitions
 */
export function QuizQuestion({
  question,
  isRevealed = false,
  questionReveal,
}: QuizQuestionProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // Preload reveal images when they become available
  useEffect(() => {
    if (!isRevealed || !questionReveal || questionReveal.items.length === 0) {
      setShowReveal(false);
      setImagesLoaded(true);
      return;
    }

    setImagesLoaded(false);

    const imageUrls = questionReveal.items
      .map((item) => item.imageUrl)
      .filter((url): url is string => !!url);

    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      setTimeout(() => setShowReveal(true), IMAGE_PRELOAD_DELAY_MS);
      return;
    }

    preloadImages(imageUrls)
      .then(() => {
        setImagesLoaded(true);
        setTimeout(() => setShowReveal(true), IMAGE_PRELOAD_DELAY_MS);
      })
      .catch(() => {
        // Even on error, show the reveal
        setImagesLoaded(true);
        setTimeout(() => setShowReveal(true), IMAGE_PRELOAD_DELAY_MS);
      });
  }, [isRevealed, questionReveal]);

  return (
    <Card className="bg-white/10 border-white/20 animate-in fade-in slide-in-from-top-4 duration-500">
      <CardContent className="p-6 relative min-h-75">
        {/* Default Question */}
        <QuestionContent
          question={question}
          isVisible={!showReveal || !isRevealed}
        />

        {/* Question Reveal */}
        {questionReveal && (
          <QuestionRevealContent
            questionReveal={questionReveal}
            isVisible={showReveal && imagesLoaded && isRevealed}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface QuestionContentProps {
  question: ExtendedQuizQuestion;
  isVisible: boolean;
}

function QuestionContent({ question, isVisible }: QuestionContentProps) {
  return (
    <div
      className={cn(
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <h2 className="text-2xl font-bold text-white mb-2">{question.title}</h2>
      {question.description && (
        <p className="text-white/80 mb-4">{question.description}</p>
      )}
      {question.items && question.items.length > 0 && (
        <QuestionItems items={question.items} alt="Quiz image" />
      )}
    </div>
  );
}

interface QuestionRevealContentProps {
  questionReveal: ExtendedQuizQuestionReveal;
  isVisible: boolean;
}

function QuestionRevealContent({
  questionReveal,
  isVisible,
}: QuestionRevealContentProps) {
  return (
    <div
      className={cn(
        "absolute inset-6 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        {questionReveal.title}
      </h2>
      {questionReveal.description && (
        <p className="text-white/80 mb-4">{questionReveal.description}</p>
      )}
      {questionReveal.items && questionReveal.items.length > 0 && (
        <QuestionItems items={questionReveal.items} alt="Quiz reveal image" />
      )}
    </div>
  );
}

interface QuestionItem {
  id: string;
  imageUrl?: string | null;
  text?: string | null;
}

interface QuestionItemsProps {
  items: QuestionItem[];
  alt: string;
}

function QuestionItems({ items, alt }: QuestionItemsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div key={item.id}>
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.text || alt}
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
  );
}


