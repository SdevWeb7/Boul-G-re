
interface ResetPasswordTemplateEmailProps {
    token: string;
}

export const ResetPasswordTemplateEmail: React.FC<Readonly<ResetPasswordTemplateEmailProps>> = ({token}) => (
    <div>
        <h1>Vous avez demandé à réinitialiser votre mot de passe.</h1>
        <a href={`${process.env.CANONICAL_URL}/auth/reset-password/reset?token=${token}`}>Cliquez ici pour réinitialiser votre mot de passe</a>
    </div>
);