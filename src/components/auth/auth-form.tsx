"use client";

import { logIn, signUp } from "@/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthFormBtn from "./auth-form-btn";
import {CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import MyCard from "@/components/my-card";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {authSchema, signUpSchema, TLoginForm, TSignupForm} from "@/lib/zod-schemas";
import {toast} from "@/hooks/use-toast";

type AuthFormProps = {
    formType: "logIn" | "signUp";
};

export default function AuthForm({ formType }: AuthFormProps) {
    const {register, formState: {errors}, trigger, getValues} = useForm<TLoginForm | TSignupForm>({
        mode: 'onBlur',
        resolver: zodResolver(formType === "logIn" ? authSchema : signUpSchema),
    });

    const handleSubmit = async () => {
        const result = await trigger();
        if (!result) return;
        let response = null;

        const datas = getValues();

        if (formType === "logIn") response = await logIn(datas);
        else if (formType === "signUp") response = await signUp(datas);

        console.log(response);
        if (response?.message) toast({description: response.message});
    }

    return (
        <MyCard className="space-y-3">
            <CardHeader>
                <CardTitle
                    className={'text-xl font-medium'}>Veuillez entrer vos identifiants</CardTitle>
            </CardHeader>


            <CardContent className={'pb-0'}>
                <form
                    action={handleSubmit}>


                    <Label
                        htmlFor="email"
                        className={'block mt-4 text-base font-semibold'}>Adresse e-mail</Label>
                    <Input
                        id="email"
                        {...register("email")}
                        type="email"
                        required maxLength={100} />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}


                    <Label
                        htmlFor="password"
                        className={'block mt-4 text-base font-semibold'}>Mot de passe</Label>
                    <Input
                        id="password"
                        {...register("password")}
                        type="password"
                        required
                        maxLength={100}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}


                    {formType === "signUp" && <>
                        <Label
                            htmlFor="bakeryName"
                            className={'block mt-4 text-base font-semibold'}>Nom de votre boulangerie</Label>
                        <Input
                            id="bakeryName"
                            {...register("bakeryName")}
                            type="text"
                            required
                            maxLength={40} />
                        {/*@ts-expect-error*/}
                        {errors.bakeryName && <p className="text-red-500 text-sm mt-2">{errors.bakeryName.message}</p>}
                    </>}

                    {formType === "logIn" && (
                        <Link
                            href="/auth/reset-password"
                            className="text-sm text-zinc-500 mt-2 block">Mot de passe oublié?</Link>)}


                    <AuthFormBtn type={formType}/>

                </form>
            </CardContent>

            <CardFooter className="flex justify-between">

                {formType === "logIn" ? (
                    <p className="text-sm text-zinc-500">
                        Pas encore de compte?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-medium">Inscription</Link>
                    </p>
                ) : (
                    <p className="text-sm text-zinc-500">
                        Déjà inscrit(e)?{" "}
                        <Link
                            href="/auth/login"
                            className="font-medium">Connexion</Link>
                    </p>)}

            </CardFooter>
        </MyCard>
    );
}