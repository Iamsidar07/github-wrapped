import {
  ProfileCard,
  StatCard,
  SummaryCard,
} from "@/components/github-wrapper-cards";
import { LanguageDistributionCard } from "@/components/language-card";
import { config } from "@/config";
import { Activity, GitBranch, Users, Books, Flame, Code } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function getGithubWrapped(username) {
  const res = await fetch(`${config.backendUri}/github-wrapped/${username}`);
  const data = await res.json();
  console.log("got data: ", data.insights.languages_and_technologies);
  return data;
}

export default async function GithubWrapped({ params }) {
  const { username } = await params;
  const data = await getGithubWrapped(username);
  const { profile, insights, summary } = data;

  return (
    <div className="z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto pt-32">
      <div className="col-span-3">
        <ProfileCard profile={profile} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 w-full col-span-3">
        <StatCard
          title="Total Commits"
          value={insights.total_commits}
          icon={GitBranch}
        />

        <StatCard
          title="Total Followers"
          value={profile.followers}
          icon={Users}
        />

        <StatCard
          title="Total Followers"
          value={profile.followers}
          icon={Users}
        />
      </div>

      <LanguageDistributionCard
        languages={data.insights.languages_and_technologies}
      />

      <div className="col-span-3">
        <SummaryCard
          title="Your 2024 Highlights"
          content={
            <div className="space-y-4">
              <Markdown remarkPlugins={[remarkGfm]} className="prose">
                {data.summary}
              </Markdown>
            </div>
          }
        />
      </div>
    </div>
  );
}
