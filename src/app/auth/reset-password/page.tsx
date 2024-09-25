"use client";

import Main from "@/components/main";
import H1 from "@/components/h1";
import {useToast} from "@/hooks/use-toast";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {requestResetPassword} from "@/actions/reset-password-actions";
import ResetPasswordBtn from "@/components/auth/reset-password-btn";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function Page() {
    const { toast } = useToast();


    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email');

        if (!email) {
            toast({description: 'Veuillez renseigner votre email'});
            return;
        }
        const {error} = await requestResetPassword(email as string);

        if (error) {
            toast({description: error});
            return;
        } else {
            toast({description: 'Un email de réinitialisation vous a été envoyé'});
        }
    }

    return <Main>

        <H1 className={'mb-20 mt-10 text-center text-6xl max450:text-5xl'}>Réinitialisation du mot de passe</H1>


        <Card className={'max-w-[450px] mx-auto pt-2'}>
            <CardHeader>
                <h2>Veuillez entrer votre adresse email afin de recevoir un email de réinitialisation de votre mot de passe</h2>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email" />

                    <ResetPasswordBtn />

                </form>
            </CardContent>
        </Card>

        <Link className={buttonVariants({
            variant: 'default',
            className: 'ml-4 mt-16 mx-auto'
        })} href={'/'}>Retour à l&apos;accueil</Link>


    </Main>
}
