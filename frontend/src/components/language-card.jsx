"use client";
import { motion } from "framer-motion";
const languageColors = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
};
export const LanguageDistributionCard = ({ languages, className }) => {
  // Sort languages by percentage in descending order
  const sortedLanguages = [...languages].sort(
    (a, b) => b.usage_percentage - a.usage_percentage,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full col-span-3"
    >
      <div className="bg-white shadow-sm border border-t-4 border-t-accent-purple-dark  p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>🔤</span> Language Distribution
          </h2>
        </div>

        <div className="space-y-4">
          {sortedLanguages.map((lang, index) => (
            <div key={lang.language} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">
                  {lang.language}
                </span>
                <span className="text-gray-500">
                  {lang.usage_percentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: languageColors[lang.language] || "#666",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.usage_percentage}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ opacity: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Based on your public repository analysis
          </p>
        </div>
      </div>
    </motion.div>
  );
};
