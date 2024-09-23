"use client";

import Link from "next/link";
import H1 from "@/components/h1";
import {useState, useTransition} from "react";
import {logOut} from "@/actions/auth-actions";
import {motion} from "framer-motion";
import {ArrowRight, Croissant} from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    return <motion.header
                    animate={{width: !isMenuOpen ? "6rem" : "15rem"}}
                    className={`flex flex-col justify-between items-center bg-beige rounded-r-xl p-4`}>



        {/*<nav className={"flex flex-col justify-between"}>*/}
        {/*    <Link href="/" className={'flex items-center gap-2 mb-10 mt-6'}>*/}
        {/*        <Croissant className={'min-w-5 min-h-5 max-h-5 max-w-5'}/>*/}
        {/*        {isMenuOpen && <H1 className={"text-2xl font-semibold"}>Boul&apos;Gère</H1>}*/}
        {/*    </Link>*/}


        {/*    {isMenuOpen && <div className={'flex flex-col'}>*/}
        {/*        <Link href="/auth/signup">Inventaire</Link>*/}
        {/*        <Link href="/auth/login">Recettes</Link>*/}
        {/*        <Link href="/auth/login">Planning</Link>*/}
        {/*        <Link*/}
        {/*            href="/"*/}
        {/*            className={isPending ? "pointer-events-none opacity-50" : ""}*/}
        {/*            onClick={(e) => {*/}
        {/*                e.preventDefault();*/}
        {/*                startTransition(async() => await logOut());*/}
        {/*            }}>Déconnexion</Link>*/}
        {/*    </div>}*/}

        {/*</nav>*/}


        <motion.button
                    className={"flex items-center gap-2"}
                    onClick={() => setIsMenuOpen(v => !v)}>
            <ArrowRight className={'test2'} />

            {isMenuOpen && <p className={'test'}>Fermer le menu</p>}
        </motion.button>


    </motion.header>
}
