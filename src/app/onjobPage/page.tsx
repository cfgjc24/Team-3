"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, X, ClipboardList } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LocationComponent from "@/components/location";
import axios from 'axios';


// Mock function to simulate sending emails
const sendEmails = (recipients: string[], template: string) => {
  console.log(`Sending email to ${recipients.join(", ")}`);
  console.log(`Email content: ${template}`);
  return Promise.resolve(); // Simulating an async operation
};

export default function Home() {
  const [alertSent, setAlertSent] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const handleLocationUpdate = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleRecordMeeting = () => {
    console.log("Meeting recording started.");
    window.location.href = "/record";
  };

  const handleEmergencyAlert = async () => {
    try {
      // Set up the request config
      const config = {
        method: 'post', // Change to POST request
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/api/email', // Ensure you use http://
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        data: {
          message: "This is an emergency alert.", // Example payload
          alertType: "emergency",
          timestamp: new Date().toISOString(), // Include a timestamp
        },
      };
  
      // Make the request
      const response = await axios.request(config);
  
      // Log the response data
      console.log('Emergency alert sent successfully:', response.data);
    } catch (error) {
      // Log any error that occurs during the request
      console.error('Error sending emergency alert:', error.message);
    }
  };
  
  

  const handleEndSession = () => {
    window.location.href = "/offjob";
    console.log("Session ended.");
  };

  const handleSignForm = () => {
    // Navigate to the form page
    window.location.href = "/form";
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow flex flex-col gap-6 items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Provider Toolkit 🛠️
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LocationComponent onLocationUpdate={handleLocationUpdate} />
            <Button
              onClick={handleRecordMeeting}
              className="w-full h-16 text-lg font-semibold"
              variant="default"
            >
              <FileText className="mr-2 h-6 w-6" /> Record Meeting
            </Button>
            <Button
              onClick={handleSignForm}
              variant="default"
              className="w-full h-16 text-lg font-semibold"
            >
              <ClipboardList className="mr-2 h-6 w-6" /> Sign Form
            </Button>
            <Button
              onClick={handleEmergencyAlert}
              variant="destructive"
              className="w-full h-16 text-lg font-semibold"
              disabled={alertSent}
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
        {alertSent && (
          <Alert variant="destructive" className="mt-4 w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Emergency Alert Sent</AlertTitle>
            <AlertDescription>
              An emergency alert has been sent to the designated contacts.
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
