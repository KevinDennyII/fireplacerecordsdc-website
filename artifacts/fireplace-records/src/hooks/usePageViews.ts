import { useQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "@/config/runtime";

type PageViewsResponse = {
  count: number;
};

const API_BASE = getApiBaseUrl();

export function usePageViews() {
  const pageViewsQuery = useQuery<number>({
    queryKey: ["page-views"],
    queryFn: async () => {
      const incrementResponse = await fetch(`${API_BASE}/api/page-views`, { method: "POST" });
      if (incrementResponse.ok) {
        const incrementData = (await incrementResponse.json()) as PageViewsResponse;
        return incrementData.count;
      }

      const fallbackResponse = await fetch(`${API_BASE}/api/page-views`);
      if (!fallbackResponse.ok) {
        throw new Error("Unable to retrieve page view count.");
      }

      const fallbackData = (await fallbackResponse.json()) as PageViewsResponse;
      return fallbackData.count;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  return pageViewsQuery.data ?? null;
}
