import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type H2Props = PropsWithChildren<{
    className?: string;
}>
export default function H2({children, className} : H2Props) {

    return <h2 className={cn('', className)}>{children}</h2>
}
