import { useMutation, useQueryClient } from "@tanstack/react-query";

// services
import { RemoveItemFromCart } from "@/services/Cart";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RemoveItemFromCart(id),
    mutationKey: queryKeys.cart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
};
