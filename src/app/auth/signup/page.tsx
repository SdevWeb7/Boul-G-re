import AuthForm from "@/components/auth/auth-form";
import Main from "@/components/main";
import H1Auth from "@/components/auth/h1-auth";
import BackToRootBtn from "@/components/back-to-root-btn";

export default function Page() {


    return <Main>

            <H1Auth>Inscription</H1Auth>


            <AuthForm formType="signUp" />


            <BackToRootBtn />

        </Main>;
}