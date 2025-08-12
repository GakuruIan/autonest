"use client";
import React, { useState } from "react";

// icons
import { ArrowRight, ArrowLeft } from "lucide-react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// clerk
import { useUser } from "@clerk/nextjs";

// shadcn components
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// custom components
import Specification from "./FormComponents/Specification";
import Features from "./FormComponents/Features";
import Review from "./FormComponents/Review";
import Loader from "@/components/ui/Loaders/Loader";
import Spinner from "@/components/ui/Loaders/Spinner";
import BasicInformation from "./FormComponents/BasicInformation";
import PricingImage from "./FormComponents/PricingImage";

const steps = [
  {
    id: 1,
    title: "Basic car Details",
    description: "Start with the key identifiers for this car listing.",
  },
  {
    id: 2,
    title: "Pricing & Images",
    description: "Help us understand your education level and goals.",
  },
  {
    id: 3,
    title: "Technical Specifications",
    description:
      "Provide detailed specs to help buyers make informed decisions.",
  },
  {
    id: 4,
    title: "Features & Description",
    description: "Highlight what makes this car special.",
  },
  {
    id: 5,
    title: "Review and Submit",
    description: "Check your details before completing.",
  },
];

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const schema = React.useMemo(() => {
  //     return getValidationSchema(currentStep + 1);
  //   }, [currentStep]);

  const handleNext = async () => {
    const currentStepNumber = currentStep + 1;

    setCurrentStep(currentStep + 1);

    // try {
    //   const stepSchema = getValidationSchema(currentStepNumber);
    //   const stepFields = Object.keys(stepSchema.shape);

    //   const isValid = await form.trigger(stepFields as any);

    //   if (isValid) {
    //     if (currentStep < steps.length - 1) {
    //       setCurrentStep(currentStep + 1);
    //     }
    //   } else {
    //     console.log("Form errors:", form.formState.errors);
    //     toast.error("Please fix the errors before proceeding");
    //   }
    // } catch (error) {
    //   console.error("Step validation error:", error);

    //   const isValid = await form.trigger();
    //   if (isValid && currentStep < steps.length - 1) {
    //     setCurrentStep(currentStep + 1);
    //   } else {
    //     toast.error("Please fix the errors before proceeding");
    //   }
    // }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  if (!isLoaded) {
    return <Loader />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInformation form={form} />;
      case 1:
        return <PricingImage form={form} />;
      case 2:
        return <Specification form={form.control} />;
      case 3:
        return <Features form={form} />;
      case 4:
        return <Review form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start justify-center p-4 w-full max-w-2xl  mx-auto">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h6 className="mb-2 text-3xl">{steps[currentStep]?.title}</h6>
            <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4">
              {steps[currentStep]?.description}
            </p>
          </div>

          <div className="">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form>{renderStepContent()}</form>

          <div className="flex items-center justify-between mt-4 w-full">
            {currentStep > 0 && (
              <Button type="button" onClick={handleBack} variant="outline">
                <ArrowLeft size={16} className="" />
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                type="submit"
                className="flex justify-end"
                variant="default"
              >
                {isLoading ? (
                  <div className="flex items-center gap-x-3">
                    <Spinner size="xs" variant="button" />
                    <p className=" ">Submitting...</p>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            ) : (
              <Button
                type="button"
                className="flex justify-end"
                onClick={handleNext}
                variant="default"
              >
                Next
                <ArrowRight />
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
