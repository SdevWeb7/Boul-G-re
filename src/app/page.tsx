import H1 from "@/components/h1";
import CustomToaster from "@/components/custom-toaster";
import Link from "next/link";


type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Home({searchParams}: HomeProps) {


  return <>
      <H1>Bienvenue sur votre application de gestion de boulangerie</H1>


      <Link href="/app">Accéder</Link>
      <CustomToaster searchParams={searchParams} />
  </>;
}
