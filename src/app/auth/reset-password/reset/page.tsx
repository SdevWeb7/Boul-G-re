"use client";

import Main from "@/components/main";
import H1 from "@/components/h1";
import {useToast} from "@/hooks/use-toast";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {resetPassword} from "@/actions/reset-password-actions";
import ChangePasswordBtn from "@/components/auth/change-password-btn";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";


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

        <H1 className={'mb-20 mt-10 text-center text-6xl max450:text-5xl'}>Changement du mot de passe</H1>


        <Card className={'max-w-[450px] mx-auto pt-2'}>
            <CardHeader>
                <h2>Veuillez choisir un nouveau mot de passe et le confirmer</h2>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        className={'mb-4'}
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


        <Link className={buttonVariants({
            variant: 'default',
            className: 'ml-4 mt-16 mx-auto'
        })} href={'/'}>Retour à l&apos;accueil</Link>

    </Main>
}
