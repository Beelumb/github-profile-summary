import axios from "axios";
import type { GitHubUser, ContributionData } from "@/types/types";

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchUserContributions = async (
  username: string
): Promise<ContributionData> => {
  // This free API returns the full contribution history (years and days)
  const response = await axios.get(
    `https://github-contributions-api.jogruber.de/v4/${username}`
  );
  return response.data;
};

export const fetchUserRepos = async (username: string) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );

  return response.data;
};

// In src/services/githubService.ts

export const fetchUserReadMe = async (username: string) => {
  try {
    // We request the README from the specific "profile repository" (username/username)
    // The header 'Accept: application/vnd.github.raw' tells GitHub:
    // "Don't give me JSON metadata, just give me the raw markdown text."
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${username}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw",
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    // If 404, it means the user has no profile README (or no repo named <username>)
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};
