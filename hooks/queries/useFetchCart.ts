import { useQuery } from "@tanstack/react-query";

// services
import { FetchCart } from "@/services/Cart";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useFetchCart = () => {
  return useQuery({
    queryFn: FetchCart,
    queryKey: queryKeys.cart,
  });
};
