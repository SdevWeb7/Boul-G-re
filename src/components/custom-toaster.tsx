"use client";

import {useEffect} from "react";
import {useToast} from "@/hooks/use-toast";


type CustomToasterProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default function CustomToaster({searchParams}: CustomToasterProps) {
    const { toast } = useToast();

    useEffect(() => {
        if (searchParams.successPaiement) {
            toast({
                description:
                    "Paiement effectué avec succès. Vous pouvez maintenant accéder à tous nos cours.",
            });
        } else if (searchParams.successSignUp) {
            toast({
                description: "Vous êtes bien inscrit.",
            });
        } else if (searchParams.successLogout) {
            toast({
                description: "Vous êtes bien déconnecté.",
            });
        }
        searchParams.successPaiement = undefined;
        searchParams.successLogout = undefined;
        searchParams.successSignUp = undefined;
    }, [
        searchParams.successSignUp,
        searchParams.successLogout,
        searchParams.successPaiement,
    ]);


    return <>

    </>
}
