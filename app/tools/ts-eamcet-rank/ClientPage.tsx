"use client";

import { useState } from "react";
import { Calculator, AlertCircle, HelpCircle, Loader2, GraduationCap, Share2, Info } from "lucide-react";
import { predictRank, PredictorResult, StreamType } from "@/lib/predictRank";
import tgData from "@/data/tg-2026.json";

export default function TSEamcetClientPage() {
  const [stream, setStream] = useState<StreamType>("engineering");
  const [score, setScore] = useState<number | "">("");
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<PredictorResult | null>(null);

  const calculateRank = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof score !== "number" || score < 0 || score > 160) return;

    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const res = predictRank({
        exam: "tg-eapcet",
        marks: score,
        stream
      });

      setResult(res);
      setIsCalculating(false);
    }, 1500);
  };

  const getCollegeTierForTable = (rankMax: number) => {
    if (rankMax <= 5000) return "Top Govt / Tier-1";
    if (rankMax <= 20000) return "Tier-1 Private";
    if (rankMax <= 80000) return "Good Private (Convenor)";
    return "Private (Management likely)";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3 ring-1 ring-indigo-200 dark:ring-indigo-800 mb-4">
          <Calculator className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">TS EAMCET Rank Predictor 2026</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Estimate your TG EAPCET rank based on official 2026 normalized data.</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>✅ Free — No login needed</span>
          <span className="hidden sm:inline">•</span>
          <span>✅ 100% Entrance Marks</span>
          <span className="hidden sm:inline">•</span>
          <span>✅ Based on 2026 rules</span>
        </div>
      </div>

      <div className="mb-8 p-4 rounded-xl border border-green-200 bg-green-50 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 font-medium text-center">
        ✅ TG EAPCET 2026 uses 100% normalized marks only. No Intermediate/IPE marks needed.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card p-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
            <form onSubmit={calculateRank} className="space-y-6">
              <div>
                <label htmlFor="stream" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stream *
                </label>
                <select
                  id="stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value as StreamType)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="engineering">MPC - Engineering</option>
                  <option value="agri-pharmacy">BiPC - Agriculture & Pharmacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  TG EAPCET Marks (0-160) *
                </label>
                <input
                  type="number"
                  id="score"
                  min="0"
                  max="160"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 110"
                />
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/50 text-xs text-indigo-700 dark:text-indigo-300 flex gap-2">
                <Info className="h-4 w-4 shrink-0" />
                <p>Tie-breaking order: Mathematics marks → Physics marks → Age (older candidate gets better rank)</p>
              </div>

              <button 
                type="submit" 
                disabled={isCalculating}
                className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isCalculating && <Loader2 className="h-4 w-4 animate-spin" />}
                {isCalculating ? "Calculating..." : "Predict Rank"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          {isCalculating ? (
            <div className="card p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">Analyzing TG EAPCET trends...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="card p-8 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-gray-900 border border-indigo-100 dark:border-indigo-800 rounded-xl text-center shadow-md relative overflow-hidden">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${result.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                  {result.confidence} Confidence
                </div>
                
                <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">Estimated Rank Range</h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best Case</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.predictedRankMin.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-indigo-500 uppercase font-bold tracking-wider mb-1">Most Likely</div>
                    <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{result.predictedRankLikely.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Worst Case</div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.predictedRankMax.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 py-2 px-4 rounded-lg inline-block">
                  Merit score: <span className="font-bold text-indigo-600 dark:text-indigo-400">{result.meritScore}</span> / 160
                </div>

                <div className="mt-6 text-left border-t border-indigo-100 dark:border-indigo-900/50 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Calculation Breakdown & Warnings</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {result.assumptions.map((a, i) => <li key={i} className="flex gap-2"><Info className="h-4 w-4 text-indigo-500 shrink-0" /> {a}</li>)}
                    {result.warnings.map((w, i) => <li key={i} className="flex gap-2"><AlertCircle className="h-4 w-4 text-orange-500 shrink-0" /> {w}</li>)}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-indigo-100 dark:border-indigo-900/50">
                  <a 
                    href={`https://wa.me/?text=I just predicted my TG EAPCET 2026 rank! Check your rank instantly for free here: https://studykit.vercel.app/tools/ts-eamcet-rank`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800"
                  >
                    <Share2 className="h-4 w-4" /> Share on WhatsApp
                  </a>
                </div>
              </div>

              <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-500" /> College Prospects
                </h3>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-4 border border-indigo-100 dark:border-indigo-800">
                  <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Expected Tier:</span>
                  <p className="font-bold text-indigo-900 dark:text-indigo-100">{result.collegeTier}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {result.collegeExamples.map((college, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-700">
                      {college}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center min-h-[300px] text-gray-500 dark:text-gray-400 text-center">
              <div>
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Enter your marks and stream to see your estimated rank</p>
              </div>
            </div>
          )}

          <div className="card p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">TS EAMCET Marks vs Rank 2026 Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3">EAPCET Marks</th>
                    <th className="px-4 py-3">Expected Rank Range</th>
                    <th className="px-4 py-3">Confidence</th>
                    <th className="px-4 py-3">Likely Colleges</th>
                  </tr>
                </thead>
                <tbody>
                  {tgData.engineering.map((band, i) => (
                    <tr key={i} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{band.marksMin} - {band.marksMax}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{band.rankMin.toLocaleString()} - {band.rankMax.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${band.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : band.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                          {band.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                        {getCollegeTierForTable(band.rankMax)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-indigo-500" /> Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">1. Does TG EAPCET consider IPE or Intermediate marks?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No. TG EAPCET 2026 rank is based entirely on your normalized entrance test marks out of 160. The 25% IPE weightage was officially discontinued. Your Intermediate marks have zero impact on your TG EAPCET rank.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">2. What is the official TG EAPCET rank formula?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your rank is calculated using 100% of your normalized TG EAPCET marks. No other academic scores are included.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">3. Does category (OBC/SC/ST) affect my TG EAPCET rank?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No. Category does NOT change your statewide TG EAPCET rank. All candidates are ranked on the same merit list. Category only affects which reserved seats you can compete for during TGCHE counseling and seat allotment.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">4. Are ranks based on raw marks or normalized marks?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Normalized marks. Since TG EAPCET runs across multiple sessions on different days, normalization adjusts for difficulty differences between sessions. Your raw marks are converted to normalized marks before rank calculation.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">5. How accurate is this predictor?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  High accuracy for scores above 100 marks. For scores below 70, the range is wider due to candidate distribution uncertainty. This tool uses official TG EAPCET data and the official rank formula.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">6. Is this an official TGCHE tool?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No. This is an independent estimation tool. Official ranks are published by TGCHE after the exam. Always refer to the official portal for results.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-center">
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Disclaimer</p>
            <p>This tool estimates your TG EAPCET 2026 rank using the official formula (100% EAPCET) and historical marks-vs-rank data. It is not affiliated with TGCHE, JNTUH, or any government authority. Final ranks depend on official normalization, total candidates, and published merit lists. Source: TG EAPCET 2026 Official Booklet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
