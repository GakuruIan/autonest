import { api } from "@/lib/axios";

export const AddToCart = async (carId: string) => {
  try {
    const res = await api.post("/cart", { carId });

    return res.data?.success;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetch cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const FetchCart = async () => {
  try {
    const res = await api.get("/cart");

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetch cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};

export const RemoveItemFromCart = async (id: string) => {
  try {
    const res = await api.delete(`/cart/cartitem/${id}`);

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Fetch cars error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating car");
  }
};
