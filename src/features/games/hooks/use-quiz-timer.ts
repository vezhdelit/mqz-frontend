import { useEffect, useState, useCallback, useRef } from "react";
import { QUIZ_TIME_LIMIT_SECONDS } from "@/lib/constants";

/**
 * Hook for managing quiz timer countdown
 * @param isActive - Whether the timer should be active
 * @param onTimeUp - Callback when time runs out
 * @returns Timer state and reset function
 */
export function useQuizTimer(isActive: boolean, onTimeUp: () => void) {
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT_SECONDS);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep the ref updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const reset = useCallback(() => {
    setTimeRemaining(QUIZ_TIME_LIMIT_SECONDS);
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
