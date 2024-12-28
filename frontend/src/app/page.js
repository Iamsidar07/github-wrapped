"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import axiosClient from "@/lib/axios";

const GitHubWrapped = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    // make request
    startTransition(async () => {
      await axiosClient.get(`/github-wrapped/${username}`);
      setUsername("")
      router.push(`/${username}`);
    });
  };

  return (
    <div className="z-10 w-full pt-32">
      {/* Learn More Banner */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-xl mt-8 flex justify-center">
        <a
          href="https://x.com/iamsidar07"
          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-brand-fainter text-accent transition-colors"
        >
          Looking for frontend developer →
        </a>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl tracking-tight">
          Your <span className="text-brand-default">GitHub</span> Wrapped
        </h1>

        <p className="text-gray-600">
          Exa-powered AI analyzes your GitHub profile and gives you your 2024
          recap
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your GitHub Username"
            className="w-full px-4 py-3 border border-gray-200 focus:border-brand-default focus:ring-2 focus:ring-brand-faint focus:outline-none transition-colors"
          />

          <button
            disabled={isPending}
            type="submit"
            className="w-full py-3 px-4 bg-brand-default text-white hover:bg-brand-dark transition-colors font-medium disabled:bg-brand-muted"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl mx-auto p-8 space-y-4">
        <a
          href="https://x.com/iamsidar07"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white py-3 px-4 rounded-lg text-center hover:bg-gray-900 transition-colors"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Follow me on Twitter</span>
          </div>
        </a>

        <div className="text-center text-text-light-muted text-sm">
          This app is built by{" "}
          <a
            href="https://x.com/iamsidar07"
            className="text-brand-default hover:underline"
          >
            @iamsidar07
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default GitHubWrapped;
