"use client";

import Main from "@/components/main";
import AuthForm from "@/components/auth/auth-form";
import {useToast} from "@/hooks/use-toast";
import {useEffect} from "react";
import H1Auth from "@/components/auth/h1-auth";
import BackToRootBtn from "@/components/back-to-root-btn";

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

        <H1Auth className={''}>Connexion</H1Auth>

        <AuthForm formType="logIn"/>



        <BackToRootBtn />
    </Main>
}
