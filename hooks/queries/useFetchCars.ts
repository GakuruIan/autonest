import { useQuery } from "@tanstack/react-query";

// services
import { FetchCars } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useFetchCars = (category?: string) => {
  return useQuery({
    queryFn: () => FetchCars(category),
    queryKey: [queryKeys.cars, category],
  });
};
