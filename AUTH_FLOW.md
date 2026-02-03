# Authentication Flow

## Overview

This project implements a complete authentication flow using server actions, Zustand for state management, and Next.js middleware for route protection.

## Architecture

### Components

1. **Auth Store** (`src/features/auth/store/auth.store.ts`)
   - Uses Zustand with persist middleware
   - Stores token and user data in sessionStorage
   - Syncs auth token with cookies for middleware access

2. **Auth Actions** (`src/features/auth/actions/auth.ts`)
   - Server actions for sign-in, sign-up, and sign-out
   - Communicates with the MQZ API backend

3. **Auth Hooks** (`src/features/auth/hooks/use-auth.ts`)
   - `useSignIn()` - Handle user login
   - `useSignUp()` - Handle user registration
   - `useSignOut()` - Handle user logout
   - `useAuth()` - Get current authentication state

4. **Auth Components** (`src/features/auth/components/`)
   - `LoginForm` - Login form component
   - `SignUpForm` - Registration form component

5. **Auth Pages**
   - `/auth/login` - Login page
   - `/auth/signup` - Registration page

6. **Middleware** (`src/middleware.ts`)
   - Protects routes from unauthorized access
   - Redirects unauthenticated users to login
   - Redirects authenticated users away from auth pages

7. **API Client** (`src/lib/mqz-api.ts`)
   - Automatically includes Bearer token in requests
   - Reads token from sessionStorage

## Usage

### Sign Up

```tsx
import { useSignUp } from "@/features/auth/hooks/use-auth";

function MyComponent() {
  const signUp = useSignUp();

  const handleSignUp = async () => {
    await signUp.mutateAsync({
      email: "user@example.com",
      password: "password123",
      username: "username"
    });
  };
}
```

### Sign In

```tsx
import { useSignIn } from "@/features/auth/hooks/use-auth";

function MyComponent() {
  const signIn = useSignIn();

  const handleSignIn = async () => {
    await signIn.mutateAsync({
      email: "user@example.com",
      password: "password123"
    });
  };
}
```

### Sign Out

```tsx
import { useSignOut } from "@/features/auth/hooks/use-auth";

function MyComponent() {
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut.mutateAsync();
  };
}
```

### Check Authentication Status

```tsx
import { useAuth } from "@/features/auth/hooks/use-auth";

function MyComponent() {
  const { isAuthenticated, user, token } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

## Route Protection

Routes are automatically protected by middleware. To configure which routes are public:

Edit `src/middleware.ts`:

```typescript
const publicRoutes = ['/auth/login', '/auth/signup', '/public-page'];
```

## Environment Variables

Required environment variables:

```env
MQZ_API_URL=https://your-api-url.com
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
```

## Data Flow

1. User submits login/signup form
2. Form calls appropriate hook (useSignIn/useSignUp)
3. Hook calls server action
4. Server action makes API request
5. On success, token and user data stored in Zustand store
6. Store updates sessionStorage and sets cookie
7. API client reads token from sessionStorage for subsequent requests
8. Middleware reads token from cookie for route protection

## Security Considerations

- Tokens are stored in sessionStorage (cleared when browser closes)
- Tokens are also stored in cookies for middleware access
- All API requests include Bearer token in Authorization header
- Protected routes redirect to login if no valid token
- Auth pages redirect to home if user is already authenticated

## Testing the Flow

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/auth/signup` to create an account

3. After signup, you'll be redirected to the home page

4. Try accessing the home page without being logged in - you'll be redirected to login

5. Sign out and verify redirect to login page

6. Sign in again to verify persistence
