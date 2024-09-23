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
        searchParams.mustConnect = undefined;
    }, [searchParams.mustConnect, searchParams]);


    return <Main>

        <H1 className={'mb-20'}>Connexion</H1>

        <AuthForm formType="logIn"/>


    </Main>
}
