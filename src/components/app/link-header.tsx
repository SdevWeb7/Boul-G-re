import {MouseEventHandler, ReactNode} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {buttonVariants} from "@/components/ui/button";


type LinkHeaderProps = {
    href: string;
    label: string;
    icon: ReactNode;
    isMenuOpen: boolean;
    className?: string;
    pClassName?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}
export default function LinkHeader({href, label, icon, isMenuOpen, className, onClick, pClassName}: LinkHeaderProps) {
    const pathname = usePathname();


    return (
        <Link
            title={label}
            href={href}
            onClick={onClick}
            className={cn(buttonVariants({
                variant: 'link-header',
                size: 'link-header'
            }), {
                    "bg-white": pathname === href
                }, className)}>

            {icon}

            {isMenuOpen && <p className={cn("opacity-0 animate-apparition-link-header whitespace-nowrap", pClassName)}>{label}</p>}
        </Link>);
}
