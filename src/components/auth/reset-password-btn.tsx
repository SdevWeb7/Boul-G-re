import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

type ResetPasswordBtnProps = {
    mode?: "reset" | null;
};
export default function ResetPasswordBtn({mode}: ResetPasswordBtnProps) {
    const {pending} = useFormStatus();

    return <Button
                type={'submit'}
                variant={'default'}
                disabled={pending}
                className={'w-full mt-8 py-6 whitespace-normal'}>{mode ? "Changer le mot de passe" : "Recevoir l'email"}</Button>
}
