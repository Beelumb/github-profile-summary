

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  email: string;
  company: string | null; // GitHub allows null values
  followers: number;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  created_at: string;
}

export interface ContributionData {
  total: {
    [year: string]: number; // e.g., "2024": 500
  };
  contributions: Array<{
    date: string; // "2024-01-01"
    count: number; // 5
    level: number; // 0-4 (color intensity)
  }>;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
  };
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string ;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  topics: string[];
}

