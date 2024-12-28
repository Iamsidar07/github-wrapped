import React from "react";
import {
  Activity,
  GitBranch,
  Users,
  Books,
  Flame,
  Code,
  Link,
  Calendar,
  Github,
} from "lucide-react";

export const StatCard = ({ title, value, icon: Icon, className = "" }) => (
  <div className="bg-white p-6 transition-shadow border shadow-sm w-full">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <Icon className="w-5 h-5 text-brand-default" />
    </div>
    <p className="text-2xl font-semibold text-gray-700">{value}</p>
  </div>
);

export const SummaryCard = ({ title, content }) => (
  <div className="bg-white p-6 transition-shadow border border-t-4 border-t-accent-green  shadow-sm ">
    <div className="flex items-center gap-2 mb-4">
      {/* <Books className="w-5 h-5 text-brand-default" /> */}
      <h3 className="text-gray-700 font-medium">{title}</h3>
    </div>
    <div className="text-gray-600 space-y-2">{content}</div>
  </div>
);

export const ProfileCard = ({ profile }) => (
  <div className="bg-white p-6 transition-shadow border border-t-4 border-t-brand-default shadow-sm">
    <div className="flex items-center gap-4 mb-6">
      <img
        src={profile.avatar_url}
        alt={profile.name}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h2 className="text-2xl font-semibold text-accent">{profile.name}</h2>
        <p className="text-text-light-muted">@{profile.login}</p>
      </div>
    </div>
    <div className="space-y-2 text-gray-600">
      {profile.bio && <p>{profile.bio}</p>}
      {profile.location && (
        <p className="flex items-center gap-2">
          <span className="text-gray-400">📍</span> {profile.location}
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <p className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-fainter text-brand-default text-sm">
          <Link className="w-3 h-3" />
          <a
            href={profile.blog}
            className="text-brand-default hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </p>
        <p className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-fainter text-brand-default text-sm">
          <Calendar className="w-3 h-3" />
          Joined in {new Date(profile.created_at).getFullYear()}
        </p>
        <p className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-fainter text-brand-default text-sm">
          <Github className="w-3 h-3" />
          {profile.public_repos} Repos
        </p>
      </div>
    </div>
  </div>
);
