import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ContributionData, GitHubRepo } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateYearsAgo = (dateString: string): number => {
  if (!dateString) return 0;

  const joinDate = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - joinDate.getFullYear();

  // Adjust if the anniversary hasn't happened yet this year
  const monthDiff = now.getMonth() - joinDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < joinDate.getDate())
  ) {
    years--;
  }

  return years;
};

// Helper to group daily data into Quarters (Q1, Q2, Q3, Q4)
// You can place this in src/lib/utils.ts or inside UserPage.tsx

export const groupDataByQuarter = (data: ContributionData | undefined) => {
  if (!data || !data.contributions) return [];

  const quarters: Record<string, number> = {};

  // 1. Sum up all contributions into quarters
  data.contributions.forEach((day) => {
    const date = new Date(day.date);
    const year = date.getFullYear();
    // Get quarter (0-2 => Q1, 3-5 => Q2, etc.)
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const key = `${year}-Q${quarter}`;

    if (!quarters[key]) {
      quarters[key] = 0;
    }
    quarters[key] += day.count;
  });

  // 2. Convert to Array for Recharts and Sort Chronologically
  return Object.entries(quarters)
    .map(([key, value]) => ({
      name: key, // e.g., "2020-Q1" (Used for XAxis)
      commits: value, // e.g., 150 (Used for Area dataKey)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getReposPerLanguage = (repos: GitHubRepo[]) => {
  const languages: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  return Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Take top 5 languages
};

export const getStarsPerLanguage = (repos: GitHubRepo[]) => {
  const stats: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language && repo.stargazers_count > 0) {
      stats[repo.language] =
        (stats[repo.language] || 0) + repo.stargazers_count;
    }
  });

  return Object.entries(stats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
};

export const getMostStarredRepos = (repos: GitHubRepo[]) => {
  return repos
    .filter((repo) => repo.stargazers_count > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      value: repo.stargazers_count,
    }));
};

export const getLargestRepos = (repos: GitHubRepo[]) => {
  return repos
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      value: repo.size / 1000, // Size is in KB by default from GitHub
    }));
};
