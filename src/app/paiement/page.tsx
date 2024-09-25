"use client";

import H1 from "@/components/app/h1";
import {Button} from "@/components/ui/button";
import {createCheckoutSession} from "@/actions/auth-actions";
import {useEffect, useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Main from "@/components/main";

type SearchParamsType = { searchParams: { [key: string]: string | string[] | undefined } };
export default function Page({searchParams} : SearchParamsType) {
    const [isPending, startTransition] = useTransition();
    const { update, data } = useSession();
    const router = useRouter();
    const [maxCall, setMaxCall] = useState(0);

    useEffect(() => {
        const updateJWT = async () => {
            if (searchParams.success && maxCall < 10) {
                await update(true);
                setMaxCall(v => v + 1)
            }
            if (maxCall >= 10) {
                router.push('/paiement?errorPaiement=true');
            }
        };
        updateJWT();
    }, [searchParams.success, data]);

    useEffect(() => {
        if (data?.user?.hasAccess) {
            router.push('/app?successPaiement=true');
        }
    }, [data?.user?.hasAccess]);


    return <Main className={'flex flex-col items-center gap-16'}>
        <H1>Paiement</H1>


        <h2 className={"text-xl mt-4"}>L&apos;accès aux cours <b>React</b> et <b>Next.js</b> sont accessibles après une petite contribution de 150€.</h2>



        {!searchParams.success && (
            <Button
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        await createCheckoutSession();
                    });
                }}>Abonnement (150€)</Button>
        )}


        {searchParams.success && <p className={'text-green-700'}>Le paiement a bien été effectué.</p>}

        {searchParams.errorPaiement && <p className={'text-red-700'}>Il y a eu un problème dans le paiement.</p>}

        {searchParams.cancelled &&
           <p className={'text-red-700'}>Le paiement a échoué. Vous pouvez retenter ou nous contacter.</p>}

    </Main>;
}