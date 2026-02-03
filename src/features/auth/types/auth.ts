export type User = {
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: "user" | "admin";
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