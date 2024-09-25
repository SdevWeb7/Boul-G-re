import H1 from "@/components/h1";
import CustomToaster from "@/components/custom-toaster";
import Link from "next/link";
import Main from "@/components/main";


type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Home({searchParams}: HomeProps) {


  return <Main className={'flex flex-col justify-around items-center px-2 relative bg-transparent'}>
      <H1 className={'max450:text-xl text-center text-4xl'}><span className={'max450:text-6xl font-bakery text-9xl'}>Boulanger Pro</span><br/>Gestionnaire de boulangerie patisserie.</H1>

      <p className={'text-center text-2xl max450:text-xl'}>Veuillez vous connecter afin d&apos;accéder au service.</p>

      <Link href="/app" className={'bg-primary-dark text-primary-light py-3 px-6 rounded-sm text-3xl cursor-pointer'}>Se connecter</Link>



      <div className={'absolute bg-beige bg-home bottom-0 left-0 right-0 h-[50%] z-[-1]'}/>
      <div className={'absolute bg-primary-light top-0 left-0 right-0 h-[100%] z-[-2]'}/>


      <CustomToaster searchParams={searchParams}/>
  </Main>;
}
