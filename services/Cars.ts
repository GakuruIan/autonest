import { api } from "@/lib/axios";

// type CarData = Omit<
//   Car,
//   "id" | "createdAt" | "updatedAt" | "owner" | "thumbnailId" | "ownerId"
// >;

// Adding car to database
export const createCar = async (data: FormData): Promise<void> => {
  try {
    const res = await api.post("/cars", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data?.success) {
      throw new Error(res.data?.error || "Failed to create car");
    }

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Create car error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const FetchCars = async (category?: string) => {
  try {
    const res = await api.get("/cars", {
      params: category ? { category } : {},
    });

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetch cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const FetchCar = async (id: string | undefined) => {
  try {
    const res = await api.get(`/cars/${id}`);

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetch cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const FetchFeatured = async () => {
  try {
    const res = await api.get(`/cars/featured`);

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetching featured cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const DeleteCar = async (id: string) => {
  try {
    const res = await api.delete(`/cars/${id}`);

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetching featured cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};
