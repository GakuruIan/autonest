"use client";
import React, { useEffect, useState } from "react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// clerk
import { useSignIn, useAuth } from "@clerk/nextjs";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loaders/Loader";
import PasswordOTP from "@/components/ui/Verification/PasswordOTP";
import Spinner from "@/components/ui/Loaders/Spinner";

// toaster
import { toast } from "sonner";

// icons
import { GalleryVerticalEnd } from "lucide-react";

//routing
import Link from "next/link";
import { useRouter } from "next/navigation";

const emailSchema = z.object({
  email: z
    .email("Invalid email, Please enter a valid Email")
    .max(50, "Email cannot exceed 50 characters.")
    .min(1, "Email is required."),
});

const Page = () => {
  const [showOTP, setShowOTP] = useState(false);

  const { isLoaded: isSigninLoaded, signIn } = useSignIn();

  const { isLoaded: isUserLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  const isLoaded = isSigninLoaded && isUserLoaded;

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    const { email } = values;

    if (!isLoaded) return;

    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        toast.success("Password reset code sent to your email");
        setShowOTP(true);
      })
      .catch((error) => {
        if (error?.errors[0]?.code === "verification_expired") {
          return toast("Vefication code Expired", {
            description: error?.errors[0]?.longMessage,
          });
        }

        toast("An error occurred", {
          description: JSON.stringify(error?.errors[0]?.longMessage, null, 2),
        });

        console.error("Error:", JSON.stringify(error, null, 2));
      });
  };

  // form submitting status
  const isSubmitting = form.formState.isSubmitting;

  if (showOTP) {
    return <PasswordOTP />;
  }

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-md px-2 md:px-0">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
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
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We&apos;ll send you a link to reset your password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full text-sm font-semibold tracking-wider"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-x-3">
                      <Spinner size="xs" variant="button" />
                      <p className=" ">Sending link...</p>
                    </div>
                  ) : (
                    "Get reset code"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
