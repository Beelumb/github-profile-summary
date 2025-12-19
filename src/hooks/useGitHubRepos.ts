import { useQuery } from "@tanstack/react-query";
import { fetchUserRepos } from "@/services/githubService";

export const useGitHubRepos = (username: string) => {
  return useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchUserRepos(username),
    enabled: !!username,
  });
};
