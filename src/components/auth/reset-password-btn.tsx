import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

export default function ResetPasswordBtn() {
    const {pending} = useFormStatus();

    return <Button
                type={'submit'}
                variant={'default'}
                disabled={pending}
                className={'w-full mt-8 py-6 whitespace-normal'}>Recevoir un email de réinitialisation</Button>
}
