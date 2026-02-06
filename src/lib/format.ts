/**
 * Formatting utilities
 */

import { TIME_FORMAT } from './constants';

/**
 * Format seconds into MM:SS format   * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "1:05", "0:45")
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(TIME_FORMAT.PADDING, TIME_FORMAT.PAD_CHAR)}`;
}

/**
 * Format user display name
 * @param name - User's name
 * @param email - User's email (fallback)  * @returns Formatted display name
 */
export function formatUserDisplayName(name?: string | null, email?: string | null): string {
  return name || email || 'User';
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}
