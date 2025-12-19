import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/githubService";

export const useGitHubUser = (
  username: string,
  config?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    enabled: config?.enabled ?? !!username,
    retry: false,
  });
};
