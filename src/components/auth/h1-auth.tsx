import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type H1AuthProps = PropsWithChildren<{
    className?: string;
}>
export default function H1Auth({children, className}: H1AuthProps) {

    return <h1 className={cn("mb-20 mt-12 font-bodoniXT text-center text-6xl max450:text-5xl", className)}>{children}</h1>;
}
