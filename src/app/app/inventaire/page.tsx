import H1 from "@/components/app/h1";
import MyCard from "@/components/my-card";
import ContainerCard from "@/components/app/container-card";

export default function Inventaire() {

    return <>
        <H1>Inventaire</H1>


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
