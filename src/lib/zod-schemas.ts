import {z} from "zod";


export const authSchema = z.object({
    email: z.string().trim().email().max(50, 'Veuillez entrer une adresse email valide').min(5, 'Veuillez entrer une adresse email valide'),
    password: z.string().trim().min(8, 'Le mot de passe doit faire minimum 8 caractères').max(35, 'Le mot de passe ne doit pas dépasser 35 caractères')
});

export const signUpSchema = z.object({
    email: z.string().trim().email('Email invalide').max(50, 'Veuillez entrer une adresse email valide').min(5, 'Veuillez entrer une adresse email valide'),
    password: z.string().trim().min(8, 'Le mot de passe doit faire minimum 8 caractères').max(35, 'Le mot de passe ne doit pas dépasser 35 caractères'),
    bakeryName: z.string().trim().min(3, "Le nom de la boulangerie doit avoir au moins 3 caractères").max(40, 'Le nom de la boulangerie ne doit pas dépasser 40 caractères')
});

export type TLoginForm = z.infer<typeof authSchema>;
export type TSignupForm = z.infer<typeof signUpSchema>;





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
