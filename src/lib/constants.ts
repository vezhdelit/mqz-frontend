/**
 * Application-wide constants
 */

// Quiz configuration
export const QUIZ_TIME_LIMIT_SECONDS = 60;

// Game configuration
export const DEFAULT_GAME_THEME = 'drama';
export const DEFAULT_GAME_DIFFICULTY = 'easy';

// UI configuration
export const ANIMATION_DURATION_MS = 500;
export const IMAGE_PRELOAD_DELAY_MS = 50;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  GAME: (gameId: string) => `/games/${gameId}`,
} as const;

// Messages
export const ERROR_MESSAGES = {
  AUTH: {
    LOGIN_FAILED: 'Failed to sign in. Please check your credentials.',
    SIGNUP_FAILED: 'Failed to create account. Please try again.',
    SIGNOUT_FAILED: 'Failed to sign out. Please try again.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  },
  GAME: {
    NOT_FOUND: 'Game not found',
    ANSWER_FAILED: 'Failed to submit answer. Please try again.',
    CREATE_FAILED: 'Failed to create game. Please try again.',
    FETCH_FAILED: 'Failed to load game. Please try again.',
  },
  GENERIC: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  },
} as const;

// Password requirements
export const PASSWORD_MIN_LENGTH = 6;

// Time formatting
export const TIME_FORMAT = {
  PADDING: 2,
  PAD_CHAR: '0',
} as const;
