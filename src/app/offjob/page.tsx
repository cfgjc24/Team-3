"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Users,
  ShoppingCart,
  Link,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 15,
    timeFrame: "10:00 AM - 11:30 AM",
    location: "Westside Community Center",
    email: "alice.j@email.com",
    notes:
      "Experiencing anxiety due to academic pressure and social media influence.",
  },
  {
    id: 2,
    name: "Bobby Smith",
    age: 12,
    timeFrame: "1:00 PM - 2:30 PM",
    location: "Eastside Youth Center",
    email: "bobby.s@email.com",
    notes: "Dealing with bullying issues at school and low self-esteem.",
  },
  //   {
  //     id: 3,
  //     name: "Charlie Brown",
  //     age: 17,
  //     timeFrame: "3:00 PM - 4:30 PM",
  //     location: "Downtown Counseling Office",
  //     email: "charlie.b@email.com",
  //     notes: "Struggling with depression and family conflicts."
  //   },
];

const quickLinks = [
  {
    id: 1,
    title: "Calendar",
    url: "http://localhost:3000/calendar",
    icon: Calendar,
  },
  { id: 2, title: "Team Chat", url: "https://zoom.us/join", icon: Users },
  {
    id: 3,
    title: "Supplies",
    url: "https://www.amazon.com",
    icon: ShoppingCart,
  },
  { id: 4, title: "Resources", url: "https://www.example.com", icon: Link },
];

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClientClick = (clientId: number) => {
    router.push(`/onjobPage?clientId=${clientId}`);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {formatDate(currentDate)}
          </CardTitle>
        </CardHeader>
      </Card>

      <main className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Today's Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card
                key={client.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => handleClientClick(client.id)}
              >
                <CardContent className="flex flex-col space-y-4 p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {client.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Age: {client.age}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      {client.timeFrame}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      {client.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4" />
                      {client.email}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {client.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-4 space-y-2"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <link.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{link.title}</span>
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
