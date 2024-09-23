"use client";

import Main from "@/components/main";
import H1 from "@/components/h1";
import {useToast} from "@/components/ui/use-toast";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {resetPassword} from "@/actions/reset-password-actions";
import ChangePasswordBtn from "@/components/auth/change-password-btn";


export default function Page({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        const password = formData.get('password');
        const passwordConfirmation = formData.get('passwordConfirmation');

        if (!password || !passwordConfirmation) {
            toast({description: 'Veuillez renseigner un mot de passe et une confirmation'});
            return;
        }
        const {success, error} = await resetPassword(searchParams.token as string, password as string, passwordConfirmation as string);

        if (error) {
            toast({description: error});
            return;
        } else toast({description: success});
    }

    return <Main>

        <H1 className={'mb-20'}>Réinitialisation du mot de passe</H1>


        <Card className={'w-full min750:max-w-[600px] mx-auto pt-8 min750:px-16 space-y-3'}>
            <CardHeader>
                <h2>Veuillez entrer votre adresse email afin de recevoir un email de réinitialisation de votre mot de passe</h2>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password" />


                    <Label htmlFor="passwordConfirmation">Confirmer mot de passe</Label>
                    <Input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation" />

                    <ChangePasswordBtn />
                </form>
            </CardContent>
        </Card>


    </Main>
}
