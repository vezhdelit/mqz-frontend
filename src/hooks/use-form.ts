import { useState, useCallback, FormEvent } from "react";

interface UseFormInput<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
}

/**
 * Reusable form hook for handling form state and submission
 * @param initialValues - Initial form values
 * @param onSubmit - Form submission handler
 * @returns Form state and handlers
 */
export function useForm<T extends Record<string, string>>({
  initialValues,
  onSubmit,
}: UseFormInput<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  }, [error]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        await onSubmit(values);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setError(null);
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    reset,
  };
}
