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

import Image from "next/image";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3 border-b dark:border-b-neutral-600/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {/* <div className="relative size-5 mr-2"></div> */}
              <Image src="/logo.svg" alt="logo" width={18} height={18} />
              <p className="dark:text-neutral-300 text-sm font-poppins ml-1.5">
                AutoNest
              </p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="no-scrollbar">
        {NavLinks.map((menuitems) => (
          <SidebarGroup key={menuitems.label}>
            <SidebarGroupLabel className="font-poppins text-sm  tracking-wide">
              {menuitems.label}
            </SidebarGroupLabel>
            <Separator className="mb-2" />
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
