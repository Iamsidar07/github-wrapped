const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { google } = require("@ai-sdk/google");
const { generateText } = require("ai");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose schema and model
const githubWrappedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    insights: { type: Object, required: true },
    summary: { type: String, required: true },
    profile: { type: Object, required: true },
  },
  { timestaps: true },
);

const GithubWrapped = mongoose.model("GithubWrapped", githubWrappedSchema);

// GitHub User Data Fetcher
const getGithubUserData = async (username) => {
  try {
    const userData = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    const reposData = await axios.get(
      `https://api.github.com/users/${username}/repos`,
    );
    return { userData: userData.data, reposData: reposData.data };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
};

// Function to fetch commit history for a repository
const getCommitHistory = async (username, repoName) => {
  try {
    console.log("getting commit history for ", username, repoName);
    const commits = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}/commits`,
    );
    console.log("got commit history: ", commits.data);
    return commits.data;
  } catch (error) {
    console.error("Error fetching commit history:", error);
    return [];
    // throw error;
  }
};

// Function to generate commit trends based on commit history
const generateCommitTrends = (commits) => {
  const commitFrequency = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  commits.forEach((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    const dayOfWeek = commitDate.toLocaleString("en-us", { weekday: "long" });
    commitFrequency[dayOfWeek]++;
  });

  return commitFrequency;
};

// Function to generate GitHub Wrapped insights
const generateGithubWrappedInsights = async (username, reposData) => {
  const languages = [];
  const commitTrends = {};
  let totalCommits = 0;

  for (const repo of reposData) {
    if (repo.language && !languages.includes(repo.language)) {
      languages.push(repo.language);
    }
    const commits = await getCommitHistory(username, repo.name);
    commitTrends[repo.name] = generateCommitTrends(commits);
    totalCommits += commits.length;
  }

  const insights = {
    activity_timing_patterns: commitTrends,
    languages_and_technologies: languages.map((language) => ({
      language: language,
      usage_percentage:
        (reposData.filter((repo) => repo.language === language).length /
          reposData.length) *
        100,
    })),
    total_commits: totalCommits,
  };

  return insights;
};

// Generate Pattern Recognition using OpenAI
const generatePatternRecognitionWithOpenAI = async (reposData) => {
  const filteredReposData = reposData.filter((repo) => repo.language);

  const reposSummary = filteredReposData.map((repo) => {
    return {
      name: repo.name,
      language: repo.language,
      created_at: repo.created_at,
      size: repo.size,
    };
  });

  const prompt = `
  Given the following repository data, analyze the user's GitHub activity patterns and trends:
  ${JSON.stringify(reposSummary)}

  What patterns can you detect in their activity? Please provide insights on:
  1. Which languages are most frequently used by the user?
  2. What are the activity trends based on repository creation?
  3. Are there any notable periods of increased activity?
  4. Any other interesting patterns in their GitHub behavior?

  Do not include an introductory statement like "Based on the provided data". Just return the insights directly
  `;

  try {
    const result = await generateText({
      model: google("gemini-1.5-flash"),
      maxTokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a GitHub activity and behavior analyst. Your task is to process GitHub repository data and provide detailed insights about a user's activity patterns. You should look for trends, patterns, and key statistics based on repository data, such as programming language usage, repository creation dates, activity frequency, and any other behaviors that stand out. Your insights should be clear, concise, and insightful, identifying any notable patterns in the user's development activity. Please answer the following questions based on the provided data:\n\n1. Which programming languages are most frequently used by the user?\n2. What are the activity trends based on repository creation dates?\n3. Are there periods of increased activity or any bursts of repository creation?\n4. Any other interesting patterns in the user's behavior or preferences?",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return result.text;
  } catch (error) {
    console.error("Error generating pattern recognition with OpenAI:", error);
    throw error;
  }
};

// New route for pattern recognition insights using OpenAI
app.get("/github-wrapped/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const result = await GithubWrapped.findOne({ username });
    if (result) return res.json(result);
    const { reposData, userData } = await getGithubUserData(username);
    const insights = await generateGithubWrappedInsights(username, reposData);
    const summary = await generatePatternRecognitionWithOpenAI(reposData);
    const wrappedData = new GithubWrapped({
      username,
      insights,
      summary,
      profile: userData,
    });

    await wrappedData.save();

    res.json({
      username,
      insights,
      summary,
      profile: userData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate GitHub Wrapped insights" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
