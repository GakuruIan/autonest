import { useMutation, useQueryClient } from "@tanstack/react-query";

// service
import { DeleteCar } from "@/services/Cars";

// query keys
import { queryKeys } from "@/lib/queryKeys";

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteCar(id),
    mutationKey: queryKeys.cars,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cars });
    },
  });
};
