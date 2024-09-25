import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type ContainerCardProps = PropsWithChildren<{
    className?: string;
}>;
export default function ContainerCard({children, className}: ContainerCardProps) {

    return <section className={cn("flex flex-wrap justify-center gap-5 mx-2", className)}>{children}</section>
}
