"use client";

import Link from "next/link";
import H1 from "@/components/h1";
import {useState, useTransition} from "react";
import {logOut} from "@/actions/auth-actions";
import {motion} from "framer-motion";
import {ArrowRight, Calendar, FileText, Table} from "lucide-react";
import {ExitIcon, RulerHorizontalIcon} from "@radix-ui/react-icons";
import {usePathname} from "next/navigation";
import BreadSVGBlack from "@/app/assets/svg/BreadSVGBlack";
import { cn } from "@/lib/utils";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    return <motion.header
                    animate={{width: !isMenuOpen ? "4rem" : "17rem"}}
                    className={`min-w-[${!isMenuOpen ? 4 : 16.5}rem] bg-beige flex flex-col justify-between sticky top-0 h-screen rounded-r-xl p-2`}>


        <nav className={"flex flex-col mt-8"}>
            <Link href={'/app'}
                  className={cn("flex items-center gap-2 w-full mb-16 font-bold rounded-xl px-1 py-2 hover:bg-white",{
                   "bg-white": pathname === "/app"
                  })}>

                <BreadSVGBlack
                    className={`min-h-8 min-w-8 max-w-8 max-h-8 my-1 mx-1`}/>

                {isMenuOpen && <H1 className={"p-header font-fabada whitespace-nowrap font-bold text-2xl"}>Boulanger Pro</H1>}
            </Link>



            <Link href={'/app/estimations'}
                  className={cn("flex items-center gap-2 w-full mb-4 font-bold text-xl rounded-xl px-1 py-2 hover:bg-white", {
                      "bg-white": pathname === "/app/estimations"
                  })}>

                <RulerHorizontalIcon
                    className={`min-h-7 min-w-7 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap text-"}>Estimations</p>}
            </Link>


            <Link href={'/app/recettes'}
                  className={cn("flex items-center gap-2 w-full mb-4 text-xl font-bold rounded-xl px-1 py-2 hover:bg-white", {
                      "bg-white": pathname === "/app/recettes"
                  })}>

                <Table
                    className={`min-h-7 min-w-7 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Recettes</p>}
            </Link>


            <Link href={'/app/inventaire'}
                  className={cn("flex items-center gap-2 w-full mb-4 text-xl font-bold rounded-xl px-1 py-2 hover:bg-white", {
                      "bg-white": pathname === "/app/inventaire"
                  })}>

                <FileText
                    className={`min-h-7 min-w-7 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Inventaire</p>}
            </Link>



            <Link href={'/app/plannings'}
                  className={cn("flex items-center gap-2 w-full mb-4 text-xl font-bold rounded-xl px-1 py-2 hover:bg-white", {
                      "bg-white": pathname === "/app/plannings"
                  })}>

                <Calendar
                    className={`min-h-7 min-w-7 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Plannings</p>}
            </Link>



            <Link href={'/'}
                  className={`flex gap-2 w-full mt-12 text-xl font-bold rounded-xl px-1 py-2 hover:bg-white ${isPending ? "pointer-events-none opacity-50" : ""}`}
                  onClick={(e) => {
                      e.preventDefault();
                      startTransition(async () => await logOut());
                  }}>

                <ExitIcon
                    className={`min-h-7 min-w-7 mx-2`}/>

                {isMenuOpen && <p className={"p-header whitespace-nowrap"}>Déconnexion</p>}
            </Link>

        </nav>

        <button
            className={`flex items-center gap-2 text-xl font-bold rounded-xl px-1 py-2 mb-4 hover:bg-white`}
            onClick={() => setIsMenuOpen(v => !v)}>

            <ArrowRight
                className={`min-h-7 min-w-7 mx-2 transition ${isMenuOpen ? " rotate-180" : ""}`}/>

            {isMenuOpen && <p className={"p-header font-bold whitespace-nowrap"}>Diminuer</p>}
        </button>


    </motion.header>
}
