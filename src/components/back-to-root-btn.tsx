import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";

export default function BackToRootBtn() {

    return (

        <Link
            href={'/'}
            className={buttonVariants({
                variant: 'default',
                className: 'ml-4 mt-16 mx-auto mb-4'
            })}>Retour à l&apos;accueil</Link>
    )
}
