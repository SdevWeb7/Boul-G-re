"use client";

import Link from "next/link";
import Image from "next/image";
import H1 from "@/components/h1";
import logoImg from "@/app/assets/logo.jpg";
import {useState, useTransition} from "react";
import {logOut} from "@/actions/auth-actions";
import {motion} from "framer-motion";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    return <motion.header
                    animate={{width: !isMenuOpen ? "6rem" : "15rem"}}
                    className={`bg-primary-dark text-white rounded-r-xl p-4`}>



        <nav className={"flex flex-col justify-between"}>
            <Link href="/" className={'flex items-center gap-4'}>
                <Image src={logoImg} alt="logo" width={30} height={30} />
                {isMenuOpen && <H1 className={"text-2xl font-semibold"}>Boul&apos;Gère</H1>}
            </Link>


            {isMenuOpen && <div className={'flex flex-col'}>
                <Link href="/auth/signup">Inventaire</Link>
                <Link href="/auth/login">Recettes</Link>
                <Link href="/auth/login">Planning</Link>
                <Link
                    href="/"
                    className={isPending ? "pointer-events-none opacity-50" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        startTransition(async() => await logOut());
                    }}>Déconnexion</Link>
            </div>}

        </nav>



        <button onClick={() => setIsMenuOpen(v => !v)}>Fermer le menu</button>
    </motion.header>
}
