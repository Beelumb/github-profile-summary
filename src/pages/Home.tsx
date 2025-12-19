import React, { useState } from "react";
import { useGitHubUser } from "@/hooks/useGitHubUser";
import { useNavigate } from "react-router";

export default function Home() {
  const [userName, setUserName] = useState("");
  const cleanName = userName.trim()
  const navigate = useNavigate();
  const { refetch, isFetching, error } = useGitHubUser(cleanName, {
    enabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) return;
    const result = await refetch();

    if (result.status === "success") {
      navigate(`/user/${cleanName}`);
    }
  };

  return (
    <div className=" flex flex-col justify-center mx-auto mt-8 px-4 lg:mt-16">
      <h1 className="mx-auto mb-5 text-4xl">Enter GitHub UseName</h1>
      <div className="flex justify-center mx-auto flex-col">
        <form onSubmit={handleSubmit} className="">
          <input
            id="User"
            type="text"
            value={userName}
            onChange={handleInputChange}
            placeholder="ex. 'tipsy'"
            className={`border rounded-sm px-3 py-2 bg-white text-primary ${
              error ? "border-red-500" : "border-border"
            }`}
          />
          <button
            type="submit"
            disabled={isFetching}
            className="ml-2 cursor-pointer border rounded-sm px-3 py-2"
          >
           {isFetching ? "Checking..." : "Find"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-2">User not found or API error.</p>
        )}{" "}
      </div>
    </div>
  );
}
