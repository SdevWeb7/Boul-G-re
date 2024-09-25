"use client";

import {useEffect} from "react";
import {useToast} from "@/hooks/use-toast";


type CustomToasterProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default function CustomToaster({searchParams}: CustomToasterProps) {
    const { toast } = useToast();

    useEffect(() => {
        if (searchParams.successSignIn) {
            toast({
                description: "Vous êtes connecté(e)",
            });
        } else if (searchParams.successSignUp) {
            toast({
                description: "Vous êtes inscrit(e)",
            });
        } else if (searchParams.successLogout) {
            toast({
                description: "Vous êtes déconnecté(e)",
            });
        } else if (searchParams.successPaiement) {
            toast({
                description: "Paiement effectué avec succès",
            });
        }
        searchParams.successSignIn = undefined;
        searchParams.successSignUp = undefined;
        searchParams.successLogout = undefined;
        searchParams.successPaiement = undefined;
    }, [
        searchParams.successSignIn,
        searchParams.successSignUp,
        searchParams.successLogout,
        searchParams.successPaiement,
    ]);


    return <>

    </>
}
