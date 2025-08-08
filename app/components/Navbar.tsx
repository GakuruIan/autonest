"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { UserButton } from "@clerk/nextjs";

// components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

// icons
import { Search, ShoppingCart, MenuIcon } from "lucide-react";

// routing
import Link from "next/link";

import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setisAdmin(user?.publicMetadata?.role === "admin");
    }
  }, [isLoaded, user]);

  return (
    <div className="border-b z-10 backdrop-blur-md bg-white/30 dark:bg-neutral-900/30 border-gray-200 sticky top-0 dark:border-neutral-600/40 py-4 w-full">
      <div className="flex items-center justify-between container mx-auto md:px-0 px-2">
        {/* logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <p className="text-base font-bebas tracking-wide hidden md:block">
            Autonest
          </p>
        </div>

        <nav className="hidden md:flex  items-center  justify-between">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6 ">
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-neutral-300"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/cars"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-neutral-300"
                >
                  All Cars
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid w-[400px] gap-4 md:w-[400px] md:grid-cols-2 lg:w-[600px]">
                  <Link
                    href="/cars?category=suv"
                    className="flex items-center gap-3 rounded-md hover:bg-muted p-2 transition-colors"
                  >
                    <Image
                      src="/images/categories/suv.png"
                      alt="SUV"
                      className="size-28 object-contain"
                      width="100"
                      height="100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold mb-1">SUV</span>
                      <span className="text-xs text-muted-foreground">
                        Spacious and family-friendly
                      </span>
                    </div>
                  </Link>

                  {/* Sedan */}
                  <Link
                    href="/cars?category=sedan"
                    className="flex items-center gap-3 rounded-md hover:bg-muted p-2 transition-colors"
                  >
                    <Image
                      src="/images/categories/sedan.png"
                      alt="Sedan"
                      className="size-28 object-contain"
                      width="100"
                      height="100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold mb-1">Sedan</span>
                      <span className="text-xs text-muted-foreground">
                        Comfortable and fuel-efficient
                      </span>
                    </div>
                  </Link>

                  {/* Hatchback */}
                  <Link
                    href="/cars?category=hatchback"
                    className="flex items-center gap-3 rounded-md hover:bg-muted p-2 transition-colors"
                  >
                    <Image
                      src="/images/categories/hatchback.png"
                      alt="Hatchback"
                      className="size-28 object-contain"
                      width="100"
                      height="100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold mb-1">
                        Hatchback
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Compact and city-friendly
                      </span>
                    </div>
                  </Link>

                  {/* Luxury */}
                  <Link
                    href="/cars?category=luxury"
                    className="flex items-center gap-3 rounded-md hover:bg-muted p-2 transition-colors"
                  >
                    <Image
                      src="/images/categories/luxury.png"
                      alt="Luxury"
                      className="size-28 object-contain"
                      width="100"
                      height="100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold mb-1 ">
                        Luxury
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Premium comfort and performance
                      </span>
                    </div>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-neutral-300"
                >
                  About
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-neutral-300"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="link">
            <Search />
          </Button>

          <div className="ml-2">
            <ThemeToggle />
          </div>

          {isSignedIn ? (
            <div className="flex items-center gap-x-2">
              <Link href="/cart">
                <Button variant="link">
                  <ShoppingCart />
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm hover:underline dark:text-neutral-300 mx-2"
              >
                Login
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm hover:underline dark:text-neutral-300 mx-2"
                >
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <div className="flex items-center space-x-1">
            <Button variant="link">
              <Search />
            </Button>
            <ThemeToggle />
            {isSignedIn ? (
              <div className="flex items-center gap-x-2">
                <Link href="/cart">
                  <Button variant="link">
                    <ShoppingCart />
                  </Button>
                </Link>
                <UserButton />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm hover:underline dark:text-neutral-300 mx-2"
                >
                  Login
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm hover:underline dark:text-neutral-300 mx-2"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-4 space-y-2 ">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="block text-base mt-6 dark:hover:text-neutral-300 hover:text-gray-400"
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/cars"
                  className="block text-base dark:hover:text-neutral-300 hover:text-gray-400"
                >
                  All Cars
                </Link>
              </SheetClose>
              <div className="">
                <p className="text-base font-medium mb-4 dark:hover:text-neutral-400 hover:cursor-pointer hover:text-gray-400">
                  Categories
                </p>
                <div className="mt-1 pl-2 flex flex-col gap-y-5">
                  <Link
                    href="/cars?category=suv"
                    className="text-muted-foreground hover:text-gray-300 dark:hover:text-neutral-400"
                  >
                    SUV
                  </Link>
                  <Link
                    href="/cars?category=sedan"
                    className="text-muted-foreground hover:text-gray-300 dark:hover:text-neutral-400"
                  >
                    Sedan
                  </Link>
                  <Link
                    href="/cars?category=hatchback"
                    className="text-muted-foreground hover:text-gray-300 dark:hover:text-neutral-400"
                  >
                    Hatchback
                  </Link>
                  <Link
                    href="/cars?category=luxury"
                    className="text-muted-foreground hover:text-gray-300 dark:hover:text-neutral-300"
                  >
                    Luxury
                  </Link>
                </div>
              </div>
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="dark:hover:text-neutral-400 hover:text-gray-400"
                >
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="dark:hover:text-neutral-400 hover:text-gray-400"
                >
                  Contact
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="dark:hover:text-neutral-400 hover:text-gray-400"
                >
                  Cart
                </Link>
              </SheetClose>

              {isSignedIn && (
                <SheetClose asChild>
                  <Link
                    href="/profile"
                    className="dark:hover:text-neutral-400 hover:text-gray-400"
                  >
                    My Profile
                  </Link>
                </SheetClose>
              )}

              <SheetFooter>
                {isSignedIn ? (
                  <Button variant="outline" className="w-full">
                    Logout
                  </Button>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link href="/login">Login</Link>
                    </SheetClose>
                  </>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
