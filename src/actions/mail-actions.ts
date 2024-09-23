"use server";

import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';
import {auth} from "@/lib/auth-no-edge";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendEmail() {
    const session = await auth();
    if (!session?.user?.email) return {error: 'Veuillez vous connecter pour demander de l\'aide'};


    const {data, error} = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ["veustyle93310@gmail.com"],
        subject: 'Demande d\'aide',
        react: EmailTemplate({fromUserEmail: session.user.email}),
    });

    return {data, error};
};