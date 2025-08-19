import { useQuery } from "@tanstack/react-query";

// services
import { FetchCars } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

interface filtersProps {
  category?: string | null;
  sort?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
}

export const useFetchCars = (filters: filtersProps) => {
  return useQuery({
    queryFn: () => FetchCars(filters),
    queryKey: [...queryKeys.cars, filters],
  });
};
