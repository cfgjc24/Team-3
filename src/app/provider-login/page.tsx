"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProviderLoginForm = () => {
  const router = useRouter();

  // useState hooks to manage form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    router.push("/offjob");
    event.preventDefault();

    // Make sure email and password are available
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const serverResponse = await fetch("http://localhost:4000/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Use the state value for email
          password: password, // Use the state value for password
          userType: "admin",
        }),
      });

      const responseData = await serverResponse.json();
      console.log(responseData);

      if (responseData) {
        router.push("/offjob");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Lodestar Children's Services</CardTitle>
        <CardDescription className="text-sm">
          Enter your credentials to access the Provider panel.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email} // Link the input to the email state
                onChange={(e) => setEmail(e.target.value)} // Update state when input changes
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password} // Link the input to the password state
                onChange={(e) => setPassword(e.target.value)} // Update state when input changes
                required
                className="h-10"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full h-10" type="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProviderLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProviderLoginForm />
    </div>
  );
};

export default ProviderLogin;
