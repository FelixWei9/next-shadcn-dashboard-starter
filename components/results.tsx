import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface DataItem {
  id: number;
  name: string;
  // Define other properties as per your data structure
}

export function Results() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result: DataItem[] = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-8 md:col-span-8">
        <CardHeader>
          <CardTitle>Recent Analytics</CardTitle>
          <CardDescription>
            You made 265 sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 mt-2">
            <div className="flex items-center">
              {data.length > 0 ? data.map(item => (
                <>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </>
              )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
