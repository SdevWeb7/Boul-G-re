"use client";

import Link from "next/link";
import H1 from "@/components/h1";
import {useState, useTransition} from "react";
import {logOut} from "@/actions/auth-actions";
import {motion} from "framer-motion";
import {ArrowRight, Calendar, Croissant, FileText, Table} from "lucide-react";
import {ExitIcon, RulerHorizontalIcon} from "@radix-ui/react-icons";
import {usePathname} from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    return <motion.header
                    animate={{width: !isMenuOpen ? "4.5rem" : "15rem"}}
                    className={`bg-beige flex flex-col justify-between sticky top-0 h-screen rounded-r-xl p-4`}>


        <nav className={"flex flex-col mt-8"}>
            <Link href={'/app'}
                  className={`flex items-center gap-2 w-full mb-16 rounded-xl px-1 py-2 ${pathname === "/app" ? "bg-white" : ""}`}>

                <Croissant
                    className={`min-h-8 min-w-8 my-1`}/>

                {isMenuOpen && <H1 className={"p-header whitespace-nowrap font-bold text-3xl tracking-wider"}>Boulanger Pro</H1>}
            </Link>



            <Link href={'/app/estimations'}
                  className={`flex items-center gap-2 w-full mb-4 font-bold rounded-xl px-1 py-2 ${pathname === "/app/estimations" ? "bg-white" : ""}`}>

                <RulerHorizontalIcon
                    className={`min-h-6 min-w-6 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap text-"}>Estimations</p>}
            </Link>


            <Link href={'/app/recettes'}
                  className={`flex items-center gap-2 w-full mb-4 font-bold rounded-xl px-1 py-2 ${pathname === "/app/recettes" ? "bg-white" : ""}`}>

                <Table
                    className={`min-h-6 min-w-6 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Recettes</p>}
            </Link>


            <Link href={'/app/inventaire'}
                  className={`flex items-center gap-2 w-full mb-4 font-bold rounded-xl px-1 py-2 ${pathname === "/app/inventaire" ? "bg-white" : ""}`}>

                <FileText
                    className={`min-h-6 min-w-6 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Inventaire</p>}
            </Link>



            <Link href={'/app/plannings'}
                  className={`flex items-center gap-2 w-full mb-4 font-bold rounded-xl px-1 py-2 ${pathname === "/app/plannings" ? "bg-white" : ""}`}>

                <Calendar
                    className={`min-h-6 min-w-6 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Plannings</p>}
            </Link>



            <Link href={'/'}
                  className={`font-bold flex gap-2 w-full mt-12 ${isPending ? "pointer-events-none opacity-50" : ""}`}
                  onClick={(e) => {
                      e.preventDefault();
                      startTransition(async () => await logOut());
                  }}>

                <ExitIcon
                    className={`min-h-6 min-w-6 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Déconnexion</p>}
            </Link>

        </nav>

        <button
            className={`flex gap-2 w-full`}
            onClick={() => setIsMenuOpen(v => !v)}>

            <ArrowRight
                className={`min-h-6 min-w-6 mx-2 transition ${isMenuOpen ? " rotate-180" : ""}`}/>

            {isMenuOpen && <p className={"p-header font-bold whitespace-nowrap"}>Diminuer</p>}
        </button>


    </motion.header>
}
