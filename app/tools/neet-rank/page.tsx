"use client";

import { useState } from "react";
import { Activity, AlertCircle } from "lucide-react";

export default function NeetRankPredictor() {
  const [score, setScore] = useState<number | "">("");
  const [category, setCategory] = useState("General");
  const [predictedRank, setPredictedRank] = useState<{ min: number; max: number } | null>(null);

  const calculateRank = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof score !== "number" || score < 0 || score > 720) return;

    // Approximate logic based on historical data
    let baseMin = 1;
    let baseMax = 1;

    if (score >= 700) { baseMin = 1; baseMax = 200; }
    else if (score >= 650) { baseMin = 200; baseMax = 5000; }
    else if (score >= 600) { baseMin = 5000; baseMax = 25000; }
    else if (score >= 500) { baseMin = 25000; baseMax = 80000; }
    else if (score >= 400) { baseMin = 80000; baseMax = 200000; }
    else if (score >= 300) { baseMin = 200000; baseMax = 400000; }
    else if (score >= 200) { baseMin = 400000; baseMax = 700000; }
    else { baseMin = 700000; baseMax = 1000000; }

    setPredictedRank({ min: baseMin, max: baseMax });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3 ring-1 ring-indigo-200 dark:ring-indigo-800 mb-4">
          <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">NEET Rank Predictor</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Estimate your All India Rank (AIR) based on your NEET score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card p-6">
            <form onSubmit={calculateRank} className="space-y-6">
              <div>
                <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NEET Score (out of 720)
                </label>
                <input
                  type="number"
                  id="score"
                  min="0"
                  max="720"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                  className="input-field"
                  placeholder="e.g. 650"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="General">General / UR</option>
                  <option value="OBC">OBC</option>
                  <option value="EWS">EWS</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Predict Rank
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          {predictedRank ? (
            <div className="card p-8 bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900 text-center">
              <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Estimated Rank Range</h2>
              <div className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
                {predictedRank.min.toLocaleString()} - {predictedRank.max.toLocaleString()}
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" /> This is an estimate based on historical data.
              </p>
            </div>
          ) : (
            <div className="card p-8 flex items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400">
              Enter your score to see your estimated rank
            </div>
          )}

          <div className="card p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Historical Score vs Rank Trends</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estimated Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expected College Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">700 - 720</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">1 - 200</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Top AIIMS / JIPMER</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">650 - 699</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">200 - 5,000</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Top Govt. Medical Colleges</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">600 - 649</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">5,000 - 25,000</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">State Govt. Colleges</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">500 - 599</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">25,000 - 80,000</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Private / Deemed (High Tier)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">400 - 499</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">80,000 - 2,00,000</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Private Colleges (Mid Tier)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  <strong>Disclaimer:</strong> This tool provides an estimate based on trends from previous years. The actual rank may vary depending on the difficulty of the paper and the performance of all candidates in the current year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
