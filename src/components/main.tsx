import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type MainProps = PropsWithChildren<{
    className?: string;
}>
export default function Main({children, className}: MainProps) {

    return <main className={cn('bg-primary-light', className)}>
        {children}
    </main>
}
