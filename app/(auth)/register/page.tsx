"use client";
import React, { useEffect, useState } from "react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// clerk
import { useSignUp, useUser } from "@clerk/nextjs";

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
} from "@/components/ui/form";

import Spinner from "@/components/ui/Loaders/Spinner";
import Loader from "@/components/ui/Loaders/Loader";
import Verification from "@/components/ui/Verification/Verification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// linking
import Link from "next/link";
// routing
import { useRouter } from "next/navigation";

//validation schema
const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username cannot be more than 20 characters")
      .regex(
        /^[a-zA-Z][a-zA-Z0-9_]*$/,
        "Username must start with a letter and contain only letters, numbers, and underscores."
      ),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Page = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [verifing, setVerifing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router, isLoaded]);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const { username, email, password } = values;
    if (!isLoaded) return;

    return toast.promise(
      (async () => {
        await signUp.create({
          username,
          emailAddress: email,
          password,
        });

        // send user verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setVerifing(true);
        setIsLoading(false);
      })(),
      {
        loading: "Creating account...",
        success: "Account created successfully",
        error: "An error has occurred",
        position: "top-left",
      }
    );
  };

  if (verifing) {
    return <Verification />;
  }

  if (!isLoaded) {
    return <Spinner />;
  }
  return (
    <div className="w-full max-w-md px-2 md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3 mb-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="e.g John Doe"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
          </div>

          <div className="grid gap-3 mb-6">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Confirm Password
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
          </div>

          <Button className="font-medium w-full">
            {isLoading ? (
              <div className="flex items-center gap-x-3">
                <Spinner
                  size="xs"
                  variant="button"
                  classname="dark:text-neutral-400 dark:fill-neutral-600"
                />
                <p className=" ">Signing up...</p>
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:dark:hover:text-gray-300 text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4 mt-8">
        Have an account{" "}
        <Link href="/login" className="underline underline-offset-4 ml-2">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Page;
