import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { FetchWishList } from "@/services/Cars";

export const useFetchWishList = () => {
  return useQuery({
    queryFn: FetchWishList,
    queryKey: queryKeys.wishlist,
  });
};
