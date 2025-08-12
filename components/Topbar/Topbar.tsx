"use client";

import React from "react";

// icons
import { Search, BellDot } from "lucide-react";

// components
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ThemeToggle } from "../theme-toggle";

const Topbar = () => {
  return (
    <header className="flex sticky top-0 z-10 dark:bg-neutral-900 h-16 shrink-0 items-center justify-between pr-3 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-3">
        <button>
          <Search size={17} />
        </button>
        <BellDot size={17} />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Topbar;
