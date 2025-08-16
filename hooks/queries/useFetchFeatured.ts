import { useQuery } from "@tanstack/react-query";

// services
import { FetchFeatured } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useFetchFeaturedCars = () => {
  return useQuery({
    queryFn: FetchFeatured,
    queryKey: queryKeys.cars,
  });
};
