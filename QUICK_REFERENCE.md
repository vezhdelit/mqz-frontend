# Quick Reference Guide - Refactored Code Patterns

## Import Patterns

### Before
```typescript
import { useMutation, useQuery } from "@tanstack/react-query"
```

### After
```typescript
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
```

## API Calls

### Before
```typescript
const mqzFetchInstance = await getMqzAPIFetchInstance();
return mqzFetchInstance<Response>(`/endpoint`, {
  credentials: "include",
});
```

### After
```typescript
const apiClient = getMqzAPIClient();
return apiClient<Response>(`/endpoint`);
```

## Constants Usage

### Before
```typescript
const QUIZ_TIME_LIMIT = 60;
setTimeout(() => setShowReveal(true), 50);
```

### After
```typescript
import { QUIZ_TIME_LIMIT_SECONDS, IMAGE_PRELOAD_DELAY_MS } from "@/lib/constants";
```

## Query Keys

### Before
```typescript
queryKey: ['auth', 'session']
queryKey: ["game", gameId]
```

### After
```typescript
queryKey: queryKeys.auth.session()
queryKey: queryKeys.games.detail(gameId)
```

## Error Handling

### Before
```typescript
catch (error) {
  console.error("Login failed:", error);
}
```

### After
```typescript
import { ERROR_MESSAGES } from "@/lib/constants";

catch (err) {
  const message = err instanceof Error 
    ? err.message 
    : ERROR_MESSAGES.AUTH.LOGIN_FAILED;
  setError(message);
}
```

## Form Management

### Before
```typescript
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await signIn.mutateAsync({ email, password });
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### After
```typescript
import { useForm } from "@/hooks/use-form";

const { values, isSubmitting, error, handleChange, handleSubmit } = useForm({
  initialValues: { email: "", password: "" },
  onSubmit: async (formValues) => {
    await signIn.mutateAsync(formValues);
    router.push(ROUTES.HOME);
  },
});
```

## Components

### Loading States
```typescript
import { LoadingState } from "@/components/loading-state";

if (isLoading) {
  return <LoadingState message="Loading game..." />;
}
```

### Error States
```typescript
import { ErrorState } from "@/components/error-state";

if (error) {
  return (
    <ErrorState
      title="Game Not Found"
      message="The game doesn't exist."
      onRetry={() => refetch()}
    />
  );
}
```

## Utilities

### Time Formatting
```typescript
import { formatTime } from "@/lib/format";

<span>{formatTime(timeRemaining)}</span>
```

### User Display
```typescript
import { formatUserDisplayName } from "@/lib/format";

<span>{formatUserDisplayName(user.name, user.email)}</span>
```

### Image Preloading
```typescript
import { preloadImages } from "@/lib/image-utils";

await preloadImages([url1, url2, url3]);
```

## Type Safety

### Function Signatures
```typescript
// Before
export const createGame = async () => { ... }

// After
export async function createGame(): Promise<Response> { ... }
```

### Component Props
```typescript
// Always use type/interface
interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function Component({ value, onChange }: Props) { ... }
```

## Performance

### Memoization
```typescript
import { memo } from "react";

export const QuizOption = memo(function QuizOption({ ... }) {
  // Component implementation
});
```

### Computed Values
```typescript
const hasNextQuiz = useMemo(
  () => currentQuizIndex !== null && game
    ? currentQuizIndex < game.gameQuizes.length - 1
    : false,
  [currentQuizIndex, game]
);
```

## File Organization

```
src/
├── lib/                    # Utilities and helpers
│   ├── constants.ts       # App constants
│   ├── query-keys.ts      # React Query keys
│   ├── format.ts          # Formatting utilities
│   ├── image-utils.ts     # Image handling
│   └── ...
├── hooks/                  # Shared hooks
│   └── use-form.ts        # Form management
├── components/             # Shared components
│   ├── error-boundary.tsx
│   ├── error-state.tsx
│   └── loading-state.tsx
└── features/              # Feature modules
    ├── auth/
    │   ├── hooks/
    │   ├── components/
    │   └── types/
    └── games/
        ├── hooks/
        ├── components/
        ├── utils/
        └── types/
```

## Best Practices

1. **Always use constants** instead of magic numbers/strings
2. **Use query keys** from centralized location
3. **Handle errors properly** with user-friendly messages
4. **Add loading states** for async operations
5. **Use TypeScript types** for everything
6. **Add JSDoc comments** for public APIs
7. **Extract reusable logic** into hooks/utilities
8. **Memoize expensive operations** with useMemo/useCallback
9. **Use proper error boundaries** at appropriate levels
10. **Keep components focused** on single responsibility
