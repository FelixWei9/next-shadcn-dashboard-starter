'use client';
import { RecentSales } from '@/components/recent-sales';
import { Results } from '@/components/results';

import { Button } from '@/components/ui/button';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Radar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function page() {
  const router = useRouter();

  return (
    <div className="wrapper">
      <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
        {/* <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md"> */}
        <h1 className="heading">AI Mock Interview</h1>
        <main className="flex-1 overflow-hidden pt-4">
          <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Hi, Welcome 👋
                </h2>
                <div className="hidden items-center space-x-2 md:flex">
                  <Button onClick={() => router.push('dashboard/questions?categories=science&limit=3&type=multiple&difficulty=medium')}><Radar className="mr-2 h-4 w-4" /> Start</Button>
                  <Button variant={"destructive"} onClick={() => signOut()} > Log out</Button>
                </div>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Resume</TabsTrigger>
                  <TabsTrigger value="analytics">
                    Analytics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <RecentSales />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <Results />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
