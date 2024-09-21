"use client";
import * as React from "react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Form1() {
  const router = useRouter();
  const [formData, setFormData] = useState({ /* form fields */ });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form 1 submitted:", formData);
    // Redirect or provide feedback as needed
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans">
      <main className="flex-grow flex flex-col gap-6 items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Form 1</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Your form fields here */}
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
