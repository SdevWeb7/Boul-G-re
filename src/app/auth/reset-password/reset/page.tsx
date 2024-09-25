"use client";

import Main from "@/components/main";
import {useToast} from "@/hooks/use-toast";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {resetPassword} from "@/actions/reset-password-actions";
import {useRouter} from "next/navigation";
import H1Auth from "@/components/auth/h1-auth";
import MyCard from "@/components/my-card";
import ResetPasswordBtn from "@/components/auth/reset-password-btn";
import BackToRootBtn from "@/components/back-to-root-btn";


export default function Page({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const password = formData.get('password');
        const passwordConfirmation = formData.get('passwordConfirmation');

        if (!password || !passwordConfirmation) {
            toast({description: 'Veuillez renseigner un mot de passe et une confirmation'});
            return;
        }
        const {error} = await resetPassword(searchParams.token as string, password as string, passwordConfirmation as string);

        if (error) {
            toast({description: error});
            return;
        } else router.push('/auth/login?passwordReset=true');

    }

    return <Main>

        <H1Auth>Nouveau mot de passe</H1Auth>


        <MyCard className={'pt-2'}>
            <CardHeader>
                <CardTitle
                    className={'text-xl font-medium'}>Choisissez un nouveau mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        className={'mb-4'}
                        type="password"
                        id="password"
                        name="password" />


                    <Label htmlFor="passwordConfirmation">Confirmation mot de passe</Label>
                    <Input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation" />

                    <ResetPasswordBtn mode={'reset'} />
                </form>
            </CardContent>
        </MyCard>



        <BackToRootBtn />

    </Main>
}
