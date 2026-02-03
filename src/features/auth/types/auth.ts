export type UserRole = "user" | "admin";
export type User = {
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: UserRole;
    banned: boolean;
    banReason: string | null;
    banExpires: string | null;
    id: string;
};
export type SignInResponse = {
    redirect: boolean;
    token: string;
    user: User;
};