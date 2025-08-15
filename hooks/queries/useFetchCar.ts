import { useQuery } from "@tanstack/react-query";

// services
import { FetchCar } from "@/services/Cars";

export const useFetchCar = (id: string | undefined) => {
  return useQuery({
    queryFn: () => FetchCar(id),
    queryKey: ["car", id],
    enabled: !!id,
  });
};
