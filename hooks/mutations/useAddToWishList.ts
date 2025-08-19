import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

// service function
import { AddToWishList } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useAddToWishList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddToWishList,
    mutationKey: queryKeys.wishlist,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.wishlist }),
        queryClient.invalidateQueries({ queryKey: queryKeys.cars }),
      ]);

      toast.success("Car added successfully to wishlist", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("An error occurred", {
        description: "Failed to add to wishlist",
      });
    },
  });
};
