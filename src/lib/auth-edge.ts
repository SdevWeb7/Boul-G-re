import { NextAuthConfig } from "next-auth";
import prisma from "./db";

export const nextAuthEdgeConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized: ({ auth, request }) => {
            // runs on every request with middleware
            const authenticatedPaths = ["/app"];
            const isTryingToAccessAuthenticatedPath = authenticatedPaths.some(path =>
                request.nextUrl.pathname.includes(path)
            );
            const isTryingToAccessAuthPath = request.nextUrl.pathname.includes("/auth");
            const isTryingToAccessAdminPath = request.nextUrl.pathname.includes("/admin");
            const isLoggedIn = Boolean(auth?.user?.email);
            const isAdmin = auth?.user?.isAdmin;

            if (!isAdmin && isTryingToAccessAdminPath) {
                return false;
            }
            if (!isLoggedIn && isTryingToAccessAuthenticatedPath) {
                return Response.redirect(new URL('/auth/login?mustConnect=true', request.nextUrl));
            }
            if (isLoggedIn && isTryingToAccessAuthPath) {
                return Response.redirect(new URL('/', request.nextUrl));
            }
            return true;
        },
        jwt: async ({ token, user, trigger }) => {
            if (user) {
                // on sign in
                token.userId = user.id as string;
                token.email = user.email!;
                token.hasAccess = user.hasAccess;
                token.isAdmin = user.isAdmin;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.avatarImgSrc = user.avatarImgSrc;
            }

            if (trigger === "update") {
                // on every request
                const userFromDb = await prisma.user.findUnique({
                    where: {
                        email: token.email,
                    },
                });
                if (userFromDb) {
                    token.hasAccess = userFromDb.hasAccess;
                    token.firstname = userFromDb.firstname;
                    token.lastname = userFromDb.lastname;
                    token.avatarImgSrc = userFromDb.avatarImgSrc;
                }
            }

            return token;
        },
        session: ({ session, token }) => {
            session.user.id = token.userId;
            session.user.email = token.email;
            session.user.hasAccess = token.hasAccess;
            session.user.isAdmin = token.isAdmin;
            session.user.firstname = token.firstname;
            session.user.lastname = token.lastname;
            session.user.avatarImgSrc = token.avatarImgSrc;

            return session;
        }
    },
    providers: [],
} satisfies NextAuthConfig;
