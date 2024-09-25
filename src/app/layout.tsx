import type { Metadata } from "next";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Boulanger Pro",
  description: "Gestionnaire de boulangerie patisserie professionnel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`font-merriweather antialiased flex min-h-screen overflow-x-hidden`}>

        {children}

        <Toaster />


      </body>
    </html>
  );
}
