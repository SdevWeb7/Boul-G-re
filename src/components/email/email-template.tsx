
interface EmailTemplateProps {
    fromUserEmail: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({fromUserEmail}) => (
    <div>
        <h1>{fromUserEmail} demande de l&apos;aide.</h1>
    </div>
);