import CustomToaster from "@/components/custom-toaster";
import Link from "next/link";
import Main from "@/components/main";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {auth} from "@/lib/auth-no-edge";


type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function Home({searchParams}: HomeProps) {
    const session = await auth();


    return (
        <Main className={'flex flex-col justify-around items-center px-2 relative bg-transparent'}>

        <CustomToaster searchParams={searchParams}/>


        <h1 className={'max450:text-2xl font-fabada text-center text-4xl'}>
            <span className={'max450:text-8xl font-bakery text-9xl'}>Boulanger Pro</span><br/>
            Gestionnaire de boulangerie patisserie
        </h1>

        <p
            className={'text-center text-2xl max450:text-xl font-merriweather'}>
            {session?.user?.email ? `Content de vous revoir ${session.user.email}` : "Veuillez vous connecter afin d'accéder au service."}
        </p>




        <Link
            href={session?.user?.email ? "/app" : "/auth/login"}
            className={cn(buttonVariants({
                variant: 'default',
            }), "text-3xl max450:text-xl py-8 px-8")}>
            {session?.user?.email ? "Accéder à l'application" : "Se connecter"}
        </Link>



        <div
            className={'absolute bg-beige bg-home bottom-0 left-0 right-0 h-[50%] z-[-1]'}/>

        <div
            className={'absolute bg-primary-light top-0 left-0 right-0 h-[100%] z-[-2]'}/>

    </Main>);
}
