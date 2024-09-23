"use client";

import Main from "@/components/main";
import H1 from "@/components/h1";
import {useToast} from "@/components/ui/use-toast";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {requestResetPassword} from "@/actions/reset-password-actions";
import ResetPasswordBtn from "@/components/auth/reset-password-btn";

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

        <H1 className={'mb-20'}>Réinitialisation du mot de passe</H1>


        <Card className={'w-full min750:max-w-[600px] mx-auto pt-8 min750:px-16 space-y-3'}>
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


    </Main>
}
