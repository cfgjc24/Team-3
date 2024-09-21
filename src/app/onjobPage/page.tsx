"use client";

import LocationComponent from "@/components/location";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, X } from "lucide-react";

export default function Home() {
  const handleRecordMeeting = () => {
    console.log("Meeting recording started.");
  };

  const handleEmergencyAlert = () => {
    console.log("Emergency alert sent!");
  };

  const handleEndSession = () => {
    console.log("Session ended.");
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow flex flex-col gap-6 items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Childcare Volunteer Session</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LocationComponent />
            <Button 
              onClick={handleRecordMeeting} 
              className="w-full h-16 text-lg font-semibold"
              variant="default"
            >
              <FileText className="mr-2 h-6 w-6" /> Record Meeting
            </Button>
            <Button 
              onClick={handleEmergencyAlert} 
              variant="destructive" 
              className="w-full h-16 text-lg font-semibold"
            >
              <AlertCircle className="mr-2 h-6 w-6" /> Emergency Alert
            </Button>
            <Button 
              onClick={handleEndSession} 
              variant="secondary" 
              className="w-full h-16 text-lg font-semibold"
            >
              <X className="mr-2 h-6 w-6" /> End Session
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}