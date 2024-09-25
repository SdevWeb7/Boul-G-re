import {Card} from "@/components/ui/card";
import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


type MyCardProps = PropsWithChildren<{
    className?: string;
}>;
export default function MyCard({children, className}: MyCardProps) {

    return <Card className={cn('max-w-[450px] mx-auto pt-2', className)}>{children}</Card>
}
