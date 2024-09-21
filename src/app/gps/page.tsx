"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LocationComponent from "@/components/location";

export default function GPSPage() {
  const [location, setLocation] = useState<string | null>(null);

  const handleLocationUpdate = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Link href="/onjobPage" passHref>
        <Button variant="ghost" className="self-start mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>
      <main className="flex-grow flex flex-col gap-6 items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">GPS Location</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LocationComponent onLocationUpdate={handleLocationUpdate} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
