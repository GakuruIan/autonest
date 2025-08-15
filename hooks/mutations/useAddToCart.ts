import { useMutation, useQueryClient } from "@tanstack/react-query";

// services
import { AddToCart } from "@/services/Cart";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddToCart,
    mutationKey: queryKeys.cart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
};
