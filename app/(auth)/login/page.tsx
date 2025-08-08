"use client";
import React, { useState, useEffect } from "react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// clerk

//toast
import { toast } from "sonner";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loaders/Loader";

import Spinner from "@/components/ui/Loaders/Spinner";

// clerk
import { useSignIn, useUser } from "@clerk/nextjs";

// routing
import { useRouter } from "next/navigation";

//validation schema
const loginSchema = z.object({
  email: z
    .email("Invalid email, Please enter a valid Email")
    .max(50, "Email cannot exceed 50 characters.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)."
    ),
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoaded: isSignLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();

  const isLoaded = isSignLoaded && isUserLoaded;

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!isLoaded) {
    return <Spinner />;
  }

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    setIsLoading(true);
    return toast.promise(
      (async () => {
        try {
          const signInAttempt = await signIn.create({
            identifier: email,
            password,
          });

          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.replace("/cars");
          } else {
            throw new Error("Sign-in requires further verification.");
          }
        } catch (error: any) {
          throw new Error(
            error?.errors?.[0]?.longMessage || error.message || "Login failed"
          );
        } finally {
          setIsLoading(false);
        }
      })(),
      {
        loading: "Signing in...",
        success: "Login successful!",
        error: (err: Error) => err.message,
        position: "top-center",
      }
    );
  };

  return (
    <div className="w-full max-w-md px-2 md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3 mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center justify-between">
                    Enter the email you used to sign up.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-3 mb-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm text-right dark:text-neutral-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full text-sm font-semibold tracking-wider"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-x-3">
                <Spinner size="xs" variant="button" />
                <p className=" ">Signing in...</p>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:dark:hover:text-gray-300 text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4 mt-8">
        Dont have an account{" "}
        <Link href="/register" className="underline underline-offset-4 ml-2">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
