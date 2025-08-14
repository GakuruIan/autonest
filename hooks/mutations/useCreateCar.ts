import { useMutation, useQueryClient } from "@tanstack/react-query";

// services
import { createCar } from "@/services/Cars";

// keys
import { queryKeys } from "@/lib/queryKeys";

export const useCreatCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCar,
    mutationKey: queryKeys.cars,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cars });
    },
  });
};
