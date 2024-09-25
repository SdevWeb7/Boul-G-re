"use client";

import Main from "@/components/main";
import AuthForm from "@/components/auth/auth-form";
import H1 from "@/components/h1";
import {useToast} from "@/hooks/use-toast";
import {useEffect} from "react";

export default function Page({searchParams} : {searchParams: { [key: string]: string | string[] | undefined } }) {
    const { toast } = useToast();

    useEffect(() => {
        if (searchParams.mustConnect) {
            toast({
                description: "Veuillez vous connecter pour accéder à cette page."
            });
        }
        if (searchParams.passwordReset) {
            toast({
                description: "Votre mot de passe a bien été réinitialisé."
            });
        }
        searchParams.mustConnect = undefined;
        searchParams.passwordReset = undefined;
    }, [searchParams.mustConnect, searchParams.passwordReset]);


    return <Main>

        <H1 className={'mb-20 mt-10 text-center text-6xl'}>Connexion</H1>

        <AuthForm formType="logIn"/>


    </Main>
}
