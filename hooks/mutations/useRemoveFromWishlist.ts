import { useMutation, useQueryClient } from "@tanstack/react-query";

// query keys
import { queryKeys } from "@/lib/queryKeys";

// service
import { RemoveFromWishlist } from "@/services/Cars";
import { toast } from "sonner";

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RemoveFromWishlist,
    mutationKey: queryKeys.wishlist,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.wishlist }),
        queryClient.invalidateQueries({ queryKey: queryKeys.cars }),
      ]);

      toast.success("Car removed from wishlist successfully");
    },
    onError: () => {
      toast.error("Failed to removed car from wishlist");
    },
  });
};
