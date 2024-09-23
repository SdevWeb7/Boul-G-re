import {z} from "zod";


export const authSchema = z.object({
    email: z.string().trim().email().max(100, 'Email must be at most 100 characters'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters').max(100, 'Password must be at most 100 characters')
});

export type TAuthForm = z.infer<typeof authSchema>;





export const requestResetPasswordSchema = z.object({
    email: z.string().trim().email().max(100, "L'email doit faire au maximum 100 caractères"),
});

export const resetPasswordSchema = z.object({
    password: z.string().trim().min(8, 'Le mot de passe doit faire au moins 8 caractères').max(100, 'Le mot de passe doit faire au maximum 100 caractères'),
    passwordConfirmation: z.string().trim().min(8, 'Le mot de passe doit faire au moins 8 caractères').max(100, 'Le mot de passe doit faire au maximum 100 caractères')
}).refine((data) => data.passwordConfirmation === data.password, 'Les mots de passe ne correspondent pas');

export const tokenSchema = z.object({
    token: z.string().trim().min(8, 'Token incorrect').max(100, 'Token incorrect')
});
