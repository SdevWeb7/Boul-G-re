"use server";

import {auth, signIn, signOut} from "@/lib/auth-no-edge";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import {redirect} from "next/navigation";
import {AuthError} from "next-auth";
import {authSchema, signUpSchema} from "@/lib/zod-schemas";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export async function logIn(data: unknown, successMessage = "") {
    const validatedFormData = authSchema.safeParse(data);
    if (!validatedFormData.success) return { message: "Erreur serveur." };

    try {
        await signIn("credentials", {
            email: validatedFormData.data.email,
            password: validatedFormData.data.password,
            redirectTo: `/app?${successMessage ? "successSignUp=true" : "successSignIn=true"}`,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return {
                        message: "Problème d'authentification.",
                    };
                }
                default: {
                    return {
                        message: "Problème d'authentification.",
                    };
                }
            }
        }
        throw error; // nextjs redirects throws error, so we need to rethrow it
    }
}

export async function signUp(data: unknown) {
    const validatedFormData = signUpSchema.safeParse(data);
    if (!validatedFormData.success) return { message: "Erreur serveur." };

    const { email, password, bakeryName } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                email,
                hashedPassword,
                bakery: {
                    create: {
                        name: bakeryName,
                    },
                }
            },
        });
    } catch (error) {
        console.error(error);
        return { message: "Il y a eu un problème dans la création du compte." };
    }

    await logIn(validatedFormData.data, "Vous êtes bien inscrit.");
}

export async function logOut() {
    await signOut({ redirectTo: "/?successLogout=true" });
}

export async function createCheckoutSession() {
    const session = await auth();
    if (!session) return { message: "Not authenticated." };


    // create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email,
        line_items: [
            {
                price: "price_1PgowsGYAchVW4YpOCWBq2YK",
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/paiement?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/paiement?cancelled=true`,
    });

    // redirect user
    redirect(checkoutSession.url);
}