import { useQuery } from "@tanstack/react-query";
import { fetchUserContributions } from "@/services/githubService";
import { groupDataByQuarter } from "@/lib/utils";


export const useGitHubContributions = (username: string ) => {
    return useQuery({
        queryKey: ["contributions" , username ],
        queryFn:() => fetchUserContributions(username),
        select:(data) => groupDataByQuarter(data),
        enabled: !!username,
    })
}