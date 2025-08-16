import * as z from "zod";

const allowedMimeTypes = ["image/jpeg", "image/png"];

export const StepOneSchema = z.object({
  brand: z.enum(["toyota", "mazda", "nissan", "honda"], "Select a car brand"),
  model: z
    .string()
    .min(1, "Car model is required")
    .max(30, "Car model cannot be more than 30 characters")
    .trim(),
  category: z.enum(
    ["sedan", "suv", "hatchback", "luxury"],
    "Car category is required"
  ),
  year: z.string().min(1, "Car year of manufacture is required").trim(),
  in_stock: z.boolean(),
});

export const StepTwoSchema = z.object({
  price: z.coerce
    .number("Please enter a valid number")
    .min(1, "Car price is required"),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "Car Thumbnail is required",
    })
    .refine((file) => file && allowedMimeTypes.includes(file.type), {
      message: "Only .jpeg, .jpg, and .png files are allowed",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    }),
  photos: z
    .array(z.instanceof(File))
    .nonempty("Please upload atleast one photo")
    .refine(
      (files) => files.every((file) => allowedMimeTypes.includes(file.type)),
      {
        message: "Only .jpeg, .jpg, and .png files are allowed",
      }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be less than 10MB",
    }),
});

export const StepThreeSchema = z.object({
  engine: z
    .string()
    .trim()
    .min(2, "Engine description is too short")
    .max(50, "Engine description is too long")
    .regex(
      /^(\d+(\.\d+)?L|\d+cc|Electric)(\s+[a-zA-Z0-9\-]+)*$/,
      "Enter a valid engine (e.g., 2.0L Turbo, 1500cc, Electric Motor)"
    ),
  transmission: z.enum(
    ["cvt", "manual", "automatic"],
    "Select a valid transmission type"
  ),

  fuel_type: z.enum(
    ["petrol", "diesel", "hybrid", "electric"],
    "Select a valid fuel type"
  ),

  mileage: z
    .string()
    .trim()
    .regex(
      /^\d+(\.\d+)?\s?(km\/l|mpg)$/,
      "Enter mileage in km/l or mpg (e.g., 15 km/l)"
    ),

  seating_capacity: z
    .string()
    .trim()
    .regex(/^\d+$/, "Seating capacity must be a whole number")
    .refine(
      (val) => Number(val) > 0 && Number(val) <= 20,
      "Seating capacity must be between 1 and 20"
    ),
});

export const StepFourSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  features: z.array(z.string()).min(3, "You must select at least 3 interests"),
  description: z
    .string()
    .min(1, "Car description is required")
    .max(200, "Car description cannot be more than 200 characters")
    .trim(),
});

export const FullCarSchema = StepOneSchema.merge(StepTwoSchema)
  .merge(StepThreeSchema)
  .merge(StepFourSchema);

export const PrismaCarSchema = z.object({
  brand: z.enum(["toyota", "mazda", "nissan", "honda"]),
  model: z.string().min(1).max(30).trim(),
  category: z.enum(["sedan", "suv", "hatchback", "luxury"]),
  year: z.string().min(1).trim(),
  price: z.number().min(1),
  specifications: z.object({
    engine: z.string().min(2).max(50),
    transmission: z.enum(["cvt", "manual", "automatic"]),
    fuel_type: z.enum(["petrol", "diesel", "hybrid", "electric"]),
    mileage: z.string().regex(/^\d+(\.\d+)?\s?(km\/l|mpg)$/),
    seating_capacity: z.number().min(1).max(20),
  }),
  features: z.array(z.string()).min(3),
  description: z.string().min(1).max(200).trim(),
  in_stock: z.boolean(),
  rating: z.number().min(1).max(5),
  thumbnail: z.instanceof(File),
  photos: z.array(z.instanceof(File)).min(1),
});

export const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return StepOneSchema;
    case 2:
      return StepTwoSchema;
    case 3:
      return StepThreeSchema;
    case 4:
      return StepFourSchema;
    default:
      return FullCarSchema;
    // throw new Error(`Invalid  step: ${step}`);
  }
};

export type CarSchema = z.infer<typeof FullCarSchema>;
