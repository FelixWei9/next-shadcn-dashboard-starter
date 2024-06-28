import Providers from '@/components/layout/providers';
import ModalProvider from "@/components/modals/modal-provider";
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Poppins } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} overflow-hidden`}>
        <NextTopLoader />
        <Providers session={session}>
          <ModalProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
