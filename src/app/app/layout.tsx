import Main from "@/components/main";
import Header from "@/components/app/header";
import {PropsWithChildren} from "react";

export default function AppLayout({children}: PropsWithChildren) {

    return <>


            <Header />

            <Main>
                {children}
            </Main>

        </>;
}
