import type { GitHubRepo } from "@/types/types";

// Simple color map for common languages to pop against the dark theme
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Rust: "#dea584",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
};

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const langColor = LANGUAGE_COLORS[repo.language] || "#cccccc";
  const updatedDate = new Date(repo.updated_at).toLocaleDateString();

  return (
    <div className="flex flex-col h-full p-6 bg-card/40 hover:bg-card/60 border border-border rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 group">
      {/* Header: Name & Stars */}
      <div className="flex justify-between items-start mb-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-foreground group-hover:text-primary transition-colors truncate pr-2"
        >
          {repo.name}
        </a>
        <div className="flex item-center text-muted-foreground text-sm whitespace-nowrap">
          <i className="bi bi-star-fill text-yellow-500 mr-1.5 text-[12px]"></i>
          {repo.stargazers_count}
        </div>
      </div>

      {/* Description*/}
      <p className="text-muted-foreground text-sm mb-6 line-clamp-6 grow">
        {repo.description || "No description provided."}
      </p>

      {/* Footer: Tech Stack & Meta*/}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </div>
          )}
          <div className="flex items-center">
            <i className="bi bi-diagram-2 mr-1.5"></i>
            {repo.forks_count}
          </div>
        </div>
        <span className="opacity-70">{updatedDate}</span>
      </div>
    </div>
  );
}
