import { User } from "next-auth";

type nullableString = string | null;

declare module "next-auth" {
    interface User {
        email: string;
        hasAccess: boolean;
        isAdmin: boolean;
        firstname: nullableString;
        lastname: nullableString;
        avatarImgSrc: nullableString;
    }

    interface Session {
        user: User & {
            id: string;
        };
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        userId: string;
        email: string;
        hasAccess: boolean;
        isAdmin: boolean;
        firstname: nullableString;
        lastname: nullableString;
        avatarImgSrc: nullableString;
    }
}