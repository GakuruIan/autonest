"use client";
import React, { useEffect } from "react";

// components
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/Appsidebar";
import Topbar from "@/components/Topbar/Topbar";

import { useUser } from "@clerk/nextjs";

// loader
import Loader from "@/components/ui/Loaders/Loader";

// router
import { useRouter } from "next/navigation";

import { toast } from "sonner";

/*
TODO:
  Add Car editting
  add checkout and stripe payment
*/

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login");
    }

    if (user?.publicMetadata.role !== "admin") {
      toast.warning("Unauthorized access", {
        description:
          "You are trying to access information you have no access to",
      });
      router.replace("/");
    }
  }, [user, isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="dark:bg-neutral-900">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
