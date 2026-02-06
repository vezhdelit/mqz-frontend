import type { Answer } from "@/types/answer";

/**
 * Check if an answer matches an option ID
 * Handles different answer types (quizOptionId and value)
 * @param answer - The answer to check
 * @param optionId - The option ID to match against
 * @returns True if the answer matches the option
 */
export function isAnswerMatch(answer: Answer, optionId: string): boolean {
  if ("quizOptionId" in answer) {
    return answer.quizOptionId === optionId;
  }
  if ("value" in answer) {
    return answer.value === optionId;
  }
  return false;
}

/**
 * Check if an option is correct based on correct answers
 * @param optionId - The option ID to check
 * @param correctAnswers - Array of correct answers
 * @returns True if the option is correct
 */
export function isCorrectOption(optionId: string, correctAnswers: Answer[]): boolean {
  return correctAnswers.some((ans) => isAnswerMatch(ans, optionId));
}

/**
 * Check if an option was given as an answer
 * @param optionId - The option ID to check
 * @param givenAnswers - Array of given answers
 * @returns True if the option was given
 */
export function isGivenOption(optionId: string, givenAnswers: Answer[]): boolean {
  return givenAnswers.some((ans) => isAnswerMatch(ans, optionId));
}
