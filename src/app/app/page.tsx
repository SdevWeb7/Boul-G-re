import H1 from "@/components/h1";
import CustomToaster from "@/components/custom-toaster";

type AppHomeProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default function AppHome({searchParams}: AppHomeProps) {

    return <>
        <CustomToaster searchParams={searchParams}/>

        <H1 className={'text-center mt-8 text-4xl font-bold font-bodoniXT tracking-wider'}>
            Vue d&apos;ensemble
        </H1>


        <div className="flex flex-wrap transition justify-center mt-20 gap-5 mx-2">


            {[1,1,1,1,1,1,1,1,1,1,1,1].map((i) => <div key={i} className={'flex items-center justify-center font-merriweather p-4 bg-white max-w-60 rounded-xl shadow'}>
                    <h2>Un texte un petit peu plus long que d&apos;habitude</h2>
                </div>)}
        </div>


                </>;
            }
