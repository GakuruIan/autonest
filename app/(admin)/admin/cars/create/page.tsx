"use client";
import React, { useEffect, useState } from "react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  StepOneSchema,
  StepTwoSchema,
  StepThreeSchema,
  StepFourSchema,
} from "@/utils/zodSchema";

type Step1 = z.infer<typeof StepOneSchema>;
type Step2 = z.infer<typeof StepTwoSchema>;
type Step3 = z.infer<typeof StepThreeSchema>;
type Step4 = z.infer<typeof StepFourSchema>;

type CarFormStepData = Step1 | Step2 | Step3 | Step4;

// icons
import { ArrowRight, ArrowLeft } from "lucide-react";

// mutations
import { useCreatCar } from "@/hooks/mutations/useCreateCar";

// utils functions
import { CarSchema, getValidationSchema } from "@/utils/zodSchema";

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

// routing
import { useRouter } from "next/navigation";

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
  const { isLoaded, isSignedIn } = useUser();

  const createCarMutation = useCreatCar();

  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const schema = React.useMemo(() => {
    return getValidationSchema(currentStep + 1);
  }, [currentStep]);

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      brand: undefined,
      model: "",
      category: undefined,
      thumbnail: undefined as File | undefined,
      photos: [] as File[],
      year: "",
      in_stock: false,
      features: [] as string[],
      description: "",
      rating: "",
      price: "",
      engine: "",
      seating_capacity: "",
      mileage: "",
      fuel_type: undefined,
      transmission: undefined,
    },
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentStepNumber = currentStep + 1;

    try {
      const stepSchema = getValidationSchema(currentStepNumber);
      const stepFields = Object.keys(stepSchema.shape);

      const isValid = await form.trigger(stepFields as any);

      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      } else {
        console.log("Form errors:", form.formState.errors);
        toast.error("Please fix the errors before proceeding");
      }
    } catch (error) {
      console.error("Step validation error:", error);
      toast.error("Something went wrong during validation");
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<CarFormStepData> = async (
    values: CarSchema
  ) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("brand", values.brand);
      formData.append("model", values.model);
      formData.append("category", values.category);
      formData.append("year", values.year);
      formData.append("price", values.price.toString());
      formData.append("description", values.description);
      formData.append("in_stock", values.in_stock.toString());
      formData.append("rating", values.rating.toString());

      const specifications = {
        engine: values.engine,
        transmission: values.transmission,
        fuel_type: values.fuel_type,
        mileage: values.mileage,
        seating_capacity: parseInt(values.seating_capacity),
      };
      formData.append("specifications", JSON.stringify(specifications));

      formData.append("features", JSON.stringify(values.features));

      // Files for thumbnail and photos
      if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail);
      }

      values.photos.forEach((photo: File) => {
        if (photo instanceof File) {
          formData.append("photos", photo);
        }
      });

      await createCarMutation.mutateAsync(formData);

      toast.success("Success", { description: "Car added successfully" });
    } catch (error) {
      console.log(error);
      toast.error("Error", { description: "Could not add car" });
    } finally {
      setIsLoading(false);
    }
  };

  const isReviewStep = currentStep === 4;

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
    <div className="flex items-start justify-center p-2 md:p-4 w-full max-w-2xl  mx-auto">
      <div className="w-full">
        <div className="flex items-start md:items-center justify-between">
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            {renderStepContent()}
            <div className="flex items-center justify-between mt-4 w-full">
              {currentStep > 0 && (
                <Button type="button" onClick={handleBack} variant="outline">
                  <ArrowLeft size={16} className="" />
                  Back
                </Button>
              )}

              {isReviewStep ? (
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
