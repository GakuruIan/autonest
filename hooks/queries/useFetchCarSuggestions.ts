import { useQuery } from "@tanstack/react-query";

// query keys
import { queryKeys } from "@/lib/queryKeys";

import { FetchSuggestions } from "@/services/Cars";

export const useFetchCarSuggestions = (search: string) => {
  return useQuery({
    queryFn: () => FetchSuggestions(search),
    queryKey: [queryKeys.cars, search],
    enabled: !!search,
  });
};
