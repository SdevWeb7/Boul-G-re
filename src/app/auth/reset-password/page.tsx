"use client";

import Main from "@/components/main";
import {useToast} from "@/hooks/use-toast";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {requestResetPassword} from "@/actions/reset-password-actions";
import ResetPasswordBtn from "@/components/auth/reset-password-btn";
import MyCard from "@/components/my-card";
import H1Auth from "@/components/auth/h1-auth";
import BackToRootBtn from "@/components/back-to-root-btn";

export default function Page() {
    const { toast } = useToast();


    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email');

        if (!email) {
            toast({description: 'Veuillez renseigner votre email'});
            return;
        }
        const {error} = await requestResetPassword(email as string);

        if (error) toast({description: error});
        else toast({description: 'Un email de réinitialisation vous a été envoyé'});
    }

    return <Main>

        <H1Auth>Mot de passe oublié</H1Auth>


        <MyCard>
            <CardHeader>
                <CardTitle
                    className={'text-xl font-medium'}>Entrer votre adresse email afin de recevoir un email de réinitialisation</CardTitle>
            </CardHeader>

            <CardContent>
                <form action={handleSubmit}>
                    <Label
                        className={'text-base font-thin'}
                        htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email" />

                    <ResetPasswordBtn />
                </form>
            </CardContent>
        </MyCard>


        <BackToRootBtn />


    </Main>
}
