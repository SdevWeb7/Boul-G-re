import H1 from "@/components/app/h1";
import CustomToaster from "@/components/custom-toaster";
import MyCard from "@/components/my-card";
import ContainerCard from "@/components/app/container-card";
import {auth} from "@/lib/auth-no-edge";

type AppHomeProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default async function AppHome({searchParams}: AppHomeProps) {

    const session = await auth();

    return <>
        <CustomToaster searchParams={searchParams}/>

        <H1>Vue d&apos;ensemble</H1>


        <ContainerCard className={"mt-20"}>


            {[1,1,1,1,1,1,1,1,1,1,1,1].map((i) => (
                <MyCard
                    key={i}
                    className={'py-14'}>
                    <h2>Un texte un petit peu plus long que d&apos;habitude</h2>
                </MyCard>))}


        </ContainerCard>

    </>;
}
