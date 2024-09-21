'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, X, ClipboardList } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LocationComponent from "@/components/location";

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
    const recipients = ["dlm352@cornell.edu", "thediegomarques@gmail.com"];
    const emailTemplate = `
      Subject: Emergency Alert - Childcare Volunteer Session
      An emergency alert has been triggered during a Childcare Volunteer Session.
      Please respond immediately.
      Location: ${location || "Unknown Location"}
      This is an automated message. Do not reply.
    `;
    try {
      await sendEmails(recipients, emailTemplate);
      console.log("Emergency alert sent!");
      setAlertSent(true);
    } catch (error) {
      console.error("Failed to send emergency alert:", error);
    }
  };

  const handleEndSession = () => {
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
            <CardTitle className="text-2xl font-bold">Provider Toolkit 🛠️</CardTitle>
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