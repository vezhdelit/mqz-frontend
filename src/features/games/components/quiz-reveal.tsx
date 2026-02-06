import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";

interface QuizRevealProps {
  reveal: ExtendedQuizQuestionReveal;
}

export function QuizReveal({ reveal }: QuizRevealProps) {
  return (
    <Card className="bg-blue-500/20 border-blue-500/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{reveal.title}</h3>
        {reveal.description && (
          <p className="text-white/90">{reveal.description}</p>
        )}
        {reveal.items && reveal.items.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {reveal.items.map((item) => (
              <div key={item.id}>
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.text || "Reveal image"}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                )}
                {item.text && <p className="text-white mt-2">{item.text}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
