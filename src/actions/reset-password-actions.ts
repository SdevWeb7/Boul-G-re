"use server";

import prisma from "@/lib/db";
import crypto from 'crypto';
import {Resend} from "resend";
import {ResetPasswordTemplateEmail} from "@/components/email/reset-password-template-email";
import {requestResetPasswordSchema, resetPasswordSchema, tokenSchema} from "@/lib/zod-schemas";
import bcrypt from "bcryptjs";


const resend = new Resend(process.env.RESEND_API_KEY);


export const requestResetPassword = async (email: string) => {
    const parsedEmail = requestResetPasswordSchema.safeParse({email});
    if (!parsedEmail.success) return {error: 'Veuillez renseigner un email valide'};

    const user = await prisma.user.findUnique({
        where: {
            email: parsedEmail.data.email
        }
    });
    if (!user) return {error: 'Aucun utilisateur trouvé avec cet email'};


    const resetPasswordToken = crypto.randomBytes(32).toString('base64url');
    const today = new Date();
    const expirationDate = new Date(today.setDate(today.getDate() + 1));

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: expirationDate
        }
    });

    const {data, error} = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Réinitialisation de votre mot de passe',
        react: ResetPasswordTemplateEmail({token: resetPasswordToken}),
    });

    if (error) return {error: 'Une erreur est survenue, veuillez réessayer plus tard'};
    return {data};
}

export const resetPassword = async (token: string, password: string, passwordConfirmation: string) => {
    const safeToken = tokenSchema.safeParse({token});
    if (!safeToken.success) return {error: 'Token invalide'};
    const safeData = resetPasswordSchema.safeParse({password, passwordConfirmation});
    if (!safeData.success) return {error: 'Veuillez renseigner un mot de passe valide'};

    let user;
    try {
        user = await prisma.user.findFirst({
            where: { resetPasswordToken: safeToken.data.token }
        });

    } catch (error) {
        console.error(error);
        return {error: 'Une erreur est survenue, veuillez réessayer plus tard'};
    }
    if (!user) return {error: 'Token invalide'};
    if (user.resetPasswordTokenExpiry && user.resetPasswordTokenExpiry < new Date()) return {error: 'Token expiré'};

    const hashedPassword = await bcrypt.hash(safeData.data.password, 10);
    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                hashedPassword: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null
            }
        });
    } catch (error) {
        console.error(error);
        return {error: 'Une erreur est survenue, veuillez réessayer plus tard'};
    }

    return {success: 'Mot de passe réinitialisé avec succès'};
}