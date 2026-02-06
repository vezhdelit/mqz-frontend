/**
 * Centralized query keys for React Query
 * This provides type-safe and consistent query key management
 */

export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
  games: {
    all: ['games'] as const,
    detail: (gameId: string) => [...queryKeys.games.all, 'detail', gameId] as const,
    create: () => [...queryKeys.games.all, 'create'] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
