// components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// clerk
import { UserButton } from "@clerk/nextjs";

// routing
import Link from "next/link";

// links
import { NavLinks } from "@/constants/navlinks";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

import Image from "next/image";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      <SidebarHeader className="py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="relative size-8">
                <Image src="/logo.svg" alt="logo" fill />
              </div>
              <p className="text-sm font-poppins">AutoNest</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>

      <SidebarContent className="no-scrollbar">
        {NavLinks.map((menuitems) => (
          <SidebarGroup key={menuitems.label}>
            <SidebarGroupLabel className="font-poppins-semibold text-sm  tracking-tight">
              {menuitems.label}
            </SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu>
                {menuitems.links.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link href={item.url} className="flex items-center">
                        <item.icon
                          size={17}
                          className="text-gray-600 dark:text-neutral-300 "
                        />
                        <p className="text-gray-700 tracking-wide text-sm font-poppins-light  ml-2 dark:text-neutral-300">
                          {item.title}
                        </p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="py-4">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
