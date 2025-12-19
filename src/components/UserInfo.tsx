import type { GitHubUser } from "@/types/types";
import { calculateYearsAgo } from "@/lib/utils";
import { useParams } from "react-router";
import { useGitHubContributions } from "@/hooks/useGitHubContributions";
import { useState, useEffect, useRef } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function UserInfo({ userData }: { userData: GitHubUser }) {
  const { username } = useParams<{ username: string }>();

  const { data: chartData } = useGitHubContributions(username || "");

  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper function to measure width
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateWidth);
    
  }, [chartData]); 

  return (
    <div className="mt-8 flex justify-between">
      <div className="flex ">
        <div className="flex ">
          <img
            src={userData.avatar_url}
            width={175}
            className="rounded object-cover"
          />
        </div>
        <div className="ml-5 flex flex-col justify-between text-[18px]">
          <p>
            <i className="bi bi-person-fill"> </i>
            {userData.name} ({userData.login})
          </p>
          <p>
            <i className="bi bi-stack"></i> {userData.public_repos} Public repos
          </p>
          <p>
            <i className="bi bi-clock"></i> Joined GitHub{" "}
            {calculateYearsAgo(userData.created_at)}{" "}
            {calculateYearsAgo(userData.created_at) === 1 ? "year" : "years"}{" "}
            ago{" "}
          </p>
          {userData.company ? (
            <p>
              <i className="bi bi-building"></i> {userData.company}
            </p>
          ) : (
            <p>
              <i className="bi bi-people-fill"></i> {userData.followers}{" "}
              {userData.followers === 1 ? "follower" : "followers"}
            </p>
          )}
          <p>
            <i className="bi bi-box-arrow-up-right"></i>{" "}
            <a
              href={userData.html_url}
              target={"blank"}
              className="text-secondary"
            >
              View profile on GitHub
            </a>
          </p>
        </div>
      </div>

      {chartData ? (
        <div 
          ref={containerRef} 
          className="w-[50%] h-[175px] hidden md:block"
          style={{ marginLeft: "20px" }}
        >
          {chartWidth > 0 ? (
            <AreaChart
              width={chartWidth}
              height={175}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" hide={false} tick={{ fontSize: 12 }} />

              <YAxis
                width={40}
                interval="preserveStartEnd"
                orientation="right"
                label={{
                  angle: -90,
                  position: "insideRight",
                  style: { textAnchor: "middle" },
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />

              <Area
                type="monotone"
                dataKey="commits"
                stroke="#3b82f6"
                fill="#3a0ca3"
                strokeWidth={2}
                dot={{ r: 3, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
               Loading activity...
            </div>
          )}
        </div>
      ) : (
        <p> No commits data...</p>
      )}
    </div>
  );
}