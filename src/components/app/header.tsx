"use client";

import {ReactNode, useState, useTransition} from "react";
import {logOut} from "@/actions/auth-actions";
import {motion} from "framer-motion";
import {ArrowRight, Calendar, FileText, Table} from "lucide-react";
import {ExitIcon, RulerHorizontalIcon} from "@radix-ui/react-icons";
import BreadSVGBlack from "@/app/assets/svg/BreadSVGBlack";
import { cn } from "@/lib/utils";
import LinkHeader from "@/components/app/link-header";


type ListLinkType = {
    href: string;
    label: string;
    icon: ReactNode;
    className?: string;
    pClassName?: string;
}
const listLinks: ListLinkType[] = [
    {
        href: '/app',
        label: 'Boulanger Pro',
        icon: <BreadSVGBlack className={`min-h-8 min-w-8 max-w-8 max-h-8 mx-1`}/>,
        className: "mb-16",
        pClassName: "text-2xl"
    },
    {
        href: '/app/estimations',
        label: 'Estimations',
        icon: <RulerHorizontalIcon className={`min-h-7 min-w-7 mx-2`}/>,
    },
    {
        href: '/app/recettes',
        label: 'Recettes',
        icon: <Table className={`min-h-7 min-w-7 mx-2`}/>,
    },
    {
        href: '/app/inventaire',
        label: 'Inventaire',
        icon: <FileText className={`min-h-7 min-w-7 mx-2`}/>,
    },
    {
        href: '/app/plannings',
        label: 'Plannings',
        icon: <Calendar className={`min-h-7 min-w-7 mx-2`}/>,
    }
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();



    return <motion.header
                    animate={{width: !isMenuOpen ? "4rem" : "17rem"}}
                    className={`min-w-[${!isMenuOpen ? 4 : 17}rem] bg-beige font-fabada flex flex-col justify-between sticky top-0 h-screen rounded-r-xl p-2`}>



        <nav className={"flex flex-col mt-8"}>

            {listLinks.map(link => (
                <LinkHeader
                    key={link.href}
                    className={link.className}
                    pClassName={link.pClassName}
                    isMenuOpen={isMenuOpen}
                    href={link.href}
                    label={link.label}
                    icon={link.icon} />
            ))}




            <LinkHeader
                href={'/'}
                label={'Déconnexion'}
                isMenuOpen={isMenuOpen}
                icon={<ExitIcon className={`min-h-7 min-w-7 mx-2`}/>}
                className={cn("mt-12", {
                    "pointer-events-none opacity-50": isPending
                })}
                onClick={(e) => {
                    e.preventDefault();
                    startTransition(async () => await logOut());
                }}>
            </LinkHeader>

        </nav>



        <LinkHeader
            href={'/'}
            label={'Fermer le menu'}
            isMenuOpen={isMenuOpen}
            icon={<ArrowRight className={`min-h-7 min-w-7 mx-2 transition ${isMenuOpen ? " rotate-180" : ""}`}/>}
            className={cn("mb-4", {
                "pointer-events-none opacity-50": isPending
            })}
            onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(v => !v)
            }}>
        </LinkHeader>


    </motion.header>
}