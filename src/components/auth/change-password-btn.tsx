import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

export default function ChangePasswordBtn() {
    const {pending} = useFormStatus();

    return <Button
                type={'submit'}
                variant={'default'}
                disabled={pending}
                className={'w-full mt-8 py-6'}>Changer le mot de passe</Button>
}
