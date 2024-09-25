import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type H1Props = PropsWithChildren<{
    className?: string;
}>
export default function H1({children, className} : H1Props) {

    return <h1 className={cn('text-center mt-8 text-4xl font-bold font-bodoniXT tracking-wider', className)}>

        {children}

    </h1>
}
