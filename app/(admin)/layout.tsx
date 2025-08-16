import React from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/Appsidebar";
import Topbar from "@/components/Topbar/Topbar";

/*
TODO:
  Add Car editting and deleting
  add admin route protection
  add checkout and stripe payment
*/

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

export default layout;
