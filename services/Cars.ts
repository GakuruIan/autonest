import { api } from "@/lib/axios";

interface filtersProps {
  category?: string | null;
  sort?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
}
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

export const FetchCars = async (filters: filtersProps) => {
  try {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    const res = await api.get("/cars", {
      params: Object.fromEntries(params),
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

export const FetchSuggestions = async (search: string) => {
  try {
    const res = await api.get("/cars/suggestions", {
      params: { search },
    });

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetching featured cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const AddToWishList = async (carId: string) => {
  try {
    const res = await api.post("/wishlist", { carId });

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Saving to wishlist error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while adding car to wishlist");
  }
};

export const FetchWishList = async () => {
  try {
    const res = await api.get("/wishlist");

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetching your wishlist error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while fetching your wishlist");
  }
};

export const RemoveFromWishlist = async (id: string) => {
  try {
    const res = await api.delete(`/wishlist/${id}`);

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Deleting your wishlist error error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while deleting car from wishlist");
  }
};
