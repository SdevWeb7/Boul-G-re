"use server";

import {auth, signIn, signOut} from "@/lib/auth-no-edge";
import {authSchema} from "@/lib/zod-schemas";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import {redirect} from "next/navigation";
import {AuthError} from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export async function logIn(prevState: unknown, formData: unknown) {
    if (!(formData instanceof FormData)) return { message: "Données invalides" };

    try {
        await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: "/?successLogin=true",
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

export async function signUp(prevState: unknown, formData: unknown) {
    if (!(formData instanceof FormData)) return { message: "Données invalides" };

    const formDataEntries = Object.fromEntries(formData.entries());

    const validatedFormData = authSchema.safeParse(formDataEntries);
    if (!validatedFormData.success) return { message: "Erreur serveur." };

    const { email, password } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });
    } catch (error) {
        console.error(error);
        return { message: "Il y a eu un problème dans la création du compte." };
    }

    await signIn("credentials", {
        email,
        password,
        redirectTo: "/?successSignUp=true",
    });
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
        success_url: `${process.env.CANONICAL_URL}/paiement?success=true`,
        cancel_url: `${process.env.CANONICAL_URL}/paiement?cancelled=true`,
    });

    // redirect user
    redirect(checkoutSession.url);
}