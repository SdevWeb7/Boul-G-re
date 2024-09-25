"use client";

import { logIn, signUp } from "@/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

type AuthFormProps = {
    formType: "logIn" | "signUp";
};

export default function AuthForm({ formType }: AuthFormProps) {
    const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
    const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

    return (
        <Card className="max-w-[450px] mx-auto pt-2 space-y-3">
            <CardHeader>
                <CardTitle>Veuillez entrer vos identifiants</CardTitle>
            </CardHeader>
            <CardContent className={'pb-0'}>
                <form action={formType === "logIn" ? dispatchLogIn : dispatchSignUp}>
                    <div className="space-y-1">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input id="email" name="email" type="email" required maxLength={100}/>
                    </div>

                    <div className="mb-6 mt-2 space-y-1">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            maxLength={100}
                        />
                    </div>

                    {formType === "logIn" && <Link href="/auth/reset-password" className="text-sm text-zinc-500">Mot de passe oublié?</Link>}

                    <AuthFormBtn type={formType}/>

                    {signUpError && (
                        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
                    )}
                    {logInError && (
                        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
                    )}
                </form>
            </CardContent>

            <CardFooter className="flex justify-between">

                {formType === "logIn" ? (
                <p className="text-sm text-zinc-500">
                    Pas encore de compte?{" "}
                    <Link href="/auth/signup" className="font-medium">Inscription</Link>
                </p>
                ) : (
                    <p className="text-sm text-zinc-500">
                        Déjà inscrit(e)?{" "}
                        <Link href="/auth/login" className="font-medium">Connexion</Link>
                    </p>)}

            </CardFooter>
        </Card>
    );
}