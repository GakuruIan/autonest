"use client";
import React from "react";

// clerk
import { useSignUp } from "@clerk/nextjs";

// zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// router
import { useRouter } from "next/navigation";

import Spinner from "@/components/ui/Loaders/Spinner";
import { Button } from "../button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time code must be 6 characters.",
  }),
});

const Verification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showResendBtn, setShowResendBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setSendingCode] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleResendCode = () => {
    setSendingCode(true);
    return toast.promise(
      (async () => {
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setSendingCode(false);
        setShowResendBtn(false);
      })(),
      {
        loading: "Resending code...",
        success: "Verification code successfully",
        error: "An error has occurred",
        position: "top-center",
      }
    );
  };

  const handleVerification = async (values: z.infer<typeof formSchema>) => {
    const { code } = values;
    setIsLoading(true);
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        // toaster
        toast.success("Success", {
          description: "Your account has being verified ",
        });

        // router
        router.push("/cars");
      } else {
        toast("An error occurred", {
          description: JSON.stringify(signUpAttempt, null, 2),
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error: unknown) {
      if (error?.errors[0]?.code === "verification_expired") {
        setShowResendBtn(true);
        return toast("Vefication code Expired", {
          description: error?.errors[0]?.longMessage,
        });
      }

      toast("An error occurred", {
        description: JSON.stringify(error?.errors[0]?.longMessage, null, 2),
      });
      console.error("Error:", JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerification)} className="">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base  font-normal dark:text-white ">
                    Verification Code
                  </FormLabel>

                  <FormControl className="w-full ">
                    <div className="">
                      <InputOTP maxLength={6} {...field} className="">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!showResendBtn && (
              <>
                <FormDescription className="text-sm font-normal my-4  font-saira">
                  Please enter the code sent to the Email Address your provided
                </FormDescription>

                <Button
                  variant="default"
                  disabled={isLoading}
                  className="w-full font-semibold tracking-wide "
                >
                  {isLoading ? (
                    <div className="flex items-center gap-x-3">
                      <Spinner size="xs" variant="button" />
                      <p className=" ">Verifing...</p>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </>
            )}
          </form>
        </Form>
        {/*  */}
      </div>

      {showResendBtn && (
        <div className="mt-2">
          <p className="text-sm dark:text-gray-400 text-gray-500 mb-2">
            Get new Code
          </p>
          <Button variant={"outline"} onClick={handleResendCode}>
            Resend code
          </Button>
        </div>
      )}
    </div>
  );
};

export default Verification;
