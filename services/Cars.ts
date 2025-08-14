import { api } from "@/lib/axios";
import { Car } from "@prisma/client";

type CarData = Omit<
  Car,
  "id" | "createdAt" | "updatedAt" | "owner" | "thumbnailId" | "ownerId"
>;

// Adding car to database
export const createCar = async (data: CarData): Promise<void> => {
  try {
    const res = await api.post("/cars/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data?.success) {
      throw new Error(res.data?.error || "Failed to create car");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Create car error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};
