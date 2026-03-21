import { useMutation, useQuery } from "@tanstack/react-query";
import type { BouquetRecord } from "../backend.d";
import { useActor } from "./useActor";

export function useGetBouquet(id: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<BouquetRecord | null>({
    queryKey: ["bouquet", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getBouquet(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetRecentBouquets(limit: number) {
  const { actor, isFetching } = useActor();
  return useQuery<BouquetRecord[]>({
    queryKey: ["recentBouquets", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentBouquets(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBouquet() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      flowers,
      greenery,
      message,
      imageKey,
    }: {
      flowers: string[];
      greenery: string[];
      message: string;
      imageKey: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBouquet(flowers, greenery, message, imageKey);
    },
  });
}
