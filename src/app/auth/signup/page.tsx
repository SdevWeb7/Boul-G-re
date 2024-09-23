import AuthForm from "@/components/auth/auth-form";
import Main from "@/components/main";
import H1 from "@/components/h1";

export default function Page() {
    return <Main>

            <H1 className={'mb-20'}>Inscription</H1>


            <AuthForm formType="signUp" />


        </Main>;
}