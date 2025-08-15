import { useQuery } from "@tanstack/react-query";

// services
import { FetchCars } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useFetchCars = () => {
  return useQuery({
    queryFn: FetchCars,
    queryKey: queryKeys.cars,
  });
};
