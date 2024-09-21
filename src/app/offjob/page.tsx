"use client";
import { useState } from "react";
import { Calendar, Users, ShoppingCart, Link } from "lucide-react";

const appointments = [
  { id: 1, title: "Dentist Appointment", date: "2024-09-21", time: "10:00 AM" },
  { id: 2, title: "Team Meeting", date: "2024-09-22", time: "2:00 PM" },
  { id: 3, title: "Grocery Shopping", date: "2024-09-23", time: "11:30 AM" },
];

const quickLinks = [
  {
    id: 1,
    title: "Google Calendar",
    url: "https://calendar.google.com",
    icon: Calendar,
  },
  { id: 2, title: "Zoom Meetings", url: "https://zoom.us/join", icon: Users },
  { id: 3, title: "Amazon", url: "https://www.amazon.com", icon: ShoppingCart },
  { id: 4, title: "LinkedIn", url: "https://www.linkedin.com", icon: Link },
];

export default function OffJob() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Format Date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">
          {formatDate(currentDate)}
        </h1>
      </header>

      <main>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold">{appointment.title}</h3>
                <p className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <link.icon className="w-6 h-6 text-blue-500" />
                <span className="font-medium">{link.title}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
