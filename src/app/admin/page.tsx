"use client";

import React from "react";
import {
  Bell,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className="w-64 bg-card border-r font-semibold"
        style={{ color: "#5b91f5" }}
      >
        <div className="p-6" style={{ color: "#5b91f5" }}>
          <h2 className="text-2xl font-semibold" style={{ color: "#5b91f5" }}>
            Admin Dashboard
          </h2>
        </div>
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard
              className="mr-2 h-4 w-4 text-2xl font-semibold"
              style={{ color: "#5b91f5" }}
            />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>

          <Link href="/calendar" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>

            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[300px] mr-auto"
            />
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <img
                    className="rounded-full"
                    src="/api/placeholder/100/100"
                    alt="User avatar"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6 ">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* CURRENT CLIENT BASE */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold flex flex-col items-center text-center w-full">
                  Current Client Base
                </CardTitle>

                {/* <CardTitle className="text-sm font-medium">
                  Clients on the wl
                </CardTitle> */}

                <svg
                  xmlns=""
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="" />
                </svg>
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold flex flex-col items-center text-center"
                  style={{ color: "#5b91f5" }}
                >
                  150 Clients on Hold
                </div>
                <p className="text-xs text-muted-foreground flex flex-col items-center text-center font-bold">
                  +15% from last month
                </p>

                {/*
               <div className="text-2xl font-bold">179 Current Clients</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
                    */}
              </CardContent>
            </Card>

            {/* CURRENT WAITLIST BASE */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold flex flex-col items-center text-center w-full">
                  Current Waitlist Amount
                </CardTitle>

                {/* <CardTitle className="text-sm font-medium">
                  Clients on the 
                </CardTitle> */}

                <svg
                  xmlns=""
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="" />
                </svg>
              </CardHeader>

              <CardContent className="text-sm font-bold flex flex-col items-center text-center w-full">
                <div
                  className="text-2xl font-bold flex flex-col items-center text-center"
                  style={{ color: "#5b91f5" }}
                >
                  50 Clients on Hold
                </div>
                <p className="text-xs text-muted-foreground ">
                  +5% from last month
                </p>

                {/*
               <div className="text-2xl font-bold">179 Current Clients</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
                    */}
              </CardContent>
            </Card>

            {/* CURRENTLY IN THE FIELD */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold flex flex-col items-center text-center w-full">
                  Active Field Staff
                </CardTitle>

                {/* <CardTitle className="text-sm font-medium">
                  Clients on the 
                </CardTitle> */}

                <svg
                  xmlns=""
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="" />
                </svg>
              </CardHeader>

              <CardContent className="text-sm font-bold flex flex-col items-center text-center w-full">
                <div
                  className="text-2xl font-bold flex flex-col items-center text-center"
                  style={{ color: "#5b91f5" }}
                >
                  20 Providers On-Site
                </div>
                <p className="text-xs text-muted-foreground ">
                  +5% from last month
                </p>

                {/*
               <div className="text-2xl font-bold">179 Current Clients</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
                    */}
              </CardContent>
            </Card>

            {/* NUMBER OF VISITS COMPLETED THIS WEEK */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold flex flex-col items-center text-center w-full">
                  Completed This Week
                </CardTitle>

                {/* <CardTitle className="text-sm font-medium">
                  Clients on the 
                </CardTitle> */}

                <svg
                  xmlns=""
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="" />
                </svg>
              </CardHeader>

              <CardContent className="text-sm font-bold flex flex-col items-center text-center w-full">
                <div
                  className="text-2xl font-bold flex flex-col items-center text-center"
                  style={{ color: "#5b91f5" }}
                >
                  12 Visits Completed
                </div>
                <p className="text-xs text-muted-foreground font-bold">
                  3 Scheduled Visits Left
                </p>

                {/*
               <div className="text-2xl font-bold">179 Current Clients</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
                    */}
              </CardContent>
            </Card>

            {/* ... (other cards remain unchanged) ... */}
          </div>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle style={{ color: "#5b91f5" }}>
                Providers in the Field
              </CardTitle>
              <CardDescription style={{ color: "#5b91f5" }}>
                Breakdown of the Information:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="text-xs text-muted-foreground font-bold "
                        style={{ color: "#5b91f5" }}
                      >
                        Name
                      </TableHead>
                      <TableHead
                        className="text-xs text-muted-foreground font-bold"
                        style={{ color: "#5b91f5" }}
                      >
                        Phone
                      </TableHead>
                      <TableHead
                        className="text-xs text-muted-foreground font-bold"
                        style={{ color: "#5b91f5" }}
                      >
                        Case
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(3)].map((_, i) => (
                      <TableRow>
                        <TableCell>John Doe</TableCell>

                        <TableCell>60373029</TableCell>
                        <TableCell>
                          ${(Math.random() * 1000).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
