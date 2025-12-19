import { useQuery } from "@tanstack/react-query";
import { fetchUserReadMe } from "@/services/githubService";

export const useUserReadMe = (username: string) => {
  return useQuery({
    queryKey: ["readme", username],
    queryFn: () => fetchUserReadMe(username),
    enabled: !!username,
    retry: false,
  });
};