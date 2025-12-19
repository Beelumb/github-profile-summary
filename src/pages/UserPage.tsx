import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useGitHubUser } from "@/hooks/useGitHubUser";
import Divider from "@/components/Divider";
import RepoCard from "@/components/RepoCard";
import { useMemo } from "react";
import LanguagePie from "@/components/LanguagePie";

import {
  getReposPerLanguage,
  getStarsPerLanguage,
  getLargestRepos,
} from "@/lib/utils";

import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useUserReadMe } from "@/hooks/useUserReadMe";
import UserInfo from "@/components/UserInfo";

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const userQuery = useGitHubUser(username || "");

  const { data: readMeData } = useUserReadMe(username || "");
  const { data: repos, isPending } = useGitHubRepos(username || "");

  const topRepos = useMemo(() => {
    return repos
      ? [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)
      : [];
  }, [repos]);

  const langData = useMemo(
    () => (repos ? getReposPerLanguage(repos) : []),
    [repos]
  );
  const starData = useMemo(
    () => (repos ? getStarsPerLanguage(repos) : []),
    [repos]
  );
  const largestRepoData = useMemo(
    () => (repos ? getLargestRepos(repos) : []),
    [repos]
  );

  if (isPending || !repos) return <div>Loading charts...</div>;

  if (userQuery.isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (userQuery.error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Error loading user.</p>
        <Link to="/" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  const userData = userQuery.data;

  return (
    <>
      <UserInfo userData={userData} />

      <Divider />

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0 ">
        {/* Chart 1: Repos per Language */}
        {langData.length > 0 && (
          <LanguagePie title="Repos per Language" data={langData} />
        )}

        {/* Chart 2: Largest Repos (MB)*/}
        {largestRepoData.length > 0 && (
          <LanguagePie title="Largest Repos (MB)" data={largestRepoData} />
        )}

        {/* Chart 3: Stars per language */}
        {starData.length > 0 && (
          <LanguagePie title="Stars per Language" data={starData} />
        )}
      </div>

      {topRepos.length > 0 && (
        <>
          <Divider />

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">
              <i className="bi bi-trophy-fill mr-2 text-yellow-500"></i>
              Top Repositories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRepos.map((repo: any) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={`https://github.com/${userData.login}?tab=repositories`}
                target="_blank"
                className="inline-block px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all text-sm font-semibold"
              >
                View All Repositories
              </a>
            </div>
          </div>
        </>
      )}

      <Divider />

      {readMeData && (
        <>
          <div className="mt-10 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <i className="bi bi-markdown mr-2"></i>
              Profile README
            </h3>
            <div className=" markdown-content p-6 bg-card/50 rounded-xl border border-border max-w-4xl mx-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {readMeData}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </>
  );
}
