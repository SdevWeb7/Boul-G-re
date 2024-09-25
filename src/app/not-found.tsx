import H1 from "@/components/app/h1";
import Main from "@/components/main";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function NotFound()
{

    return <Main>

        <H1 className={'text-3xl text-center font-bold mt-12'}>
            Not Found - 404
        </H1>

        <Link className={buttonVariants({
            variant: 'default',
            className: 'ml-4 mt-16 mx-auto'
        })} href={'/'}>Retour à l&apos;accueil</Link>
    </Main>
}
