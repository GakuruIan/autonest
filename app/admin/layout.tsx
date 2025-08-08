import React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/Appsidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <>
        <SidebarTrigger />
        <main>{children}</main>
      </>
    </SidebarProvider>
  );
};

export default layout;
