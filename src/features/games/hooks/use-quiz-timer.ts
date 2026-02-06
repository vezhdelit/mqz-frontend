import { useEffect, useState, useCallback, useRef } from "react";

const QUIZ_TIME_LIMIT = 60; // 1 minute in seconds

export function useQuizTimer(
  isActive: boolean,
  onTimeUp: () => void
) {
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep the ref updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const reset = useCallback(() => {
    setTimeRemaining(QUIZ_TIME_LIMIT);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  return { timeRemaining, reset };
}
