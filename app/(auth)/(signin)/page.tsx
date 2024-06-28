import { Metadata } from 'next';
import UserAuthForm from '@/app/(auth)/(signin)/user-auth-form';
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <main className="wrapper">
      <div className="bg-white p-3 shadow-md w-full md:w-[90%] lg:w-[70%] max-w-4xl rounded-md">
        <h1 className="heading">Welcome to AI Mock Interview</h1>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-10 gap-4">
          <div className="relative h-full">
            <Image
              src={"/logo.png"}
              alt="banner-image"
              priority
              width={500}
              height={500}
              className="object-cover object-center"
            />
          </div>
        <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
          <h2 className="text-center tracking-wide text-lg md:text-xl lg:text-2xl font-bold">
            Quiz Settings
          </h2>
          <UserAuthForm />
        </div>
        </div>
      </div>
    </main>
  );
}
