"use client";

import { useState } from "react";
import { Calculator, AlertCircle, HelpCircle, Loader2, GraduationCap, Share2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { predictRank, PredictorResult, StreamType } from "@/lib/predictRank";
import apData from "@/data/ap-2026.json";

export default function APEamcetClientPage() {
  const [stream, setStream] = useState<StreamType>("engineering");
  const [score, setScore] = useState<number | "">("");
  const [inter1, setInter1] = useState<number | "">("");
  const [inter2, setInter2] = useState<number | "">("");
  const [showIPEInfo, setShowIPEInfo] = useState(false);
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<PredictorResult | null>(null);

  const totalIPE = (typeof inter1 === 'number' ? inter1 : 0) + (typeof inter2 === 'number' ? inter2 : 0);
  const hasIPEInput = typeof inter1 === 'number' || typeof inter2 === 'number';

  const calculateRank = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof score !== "number" || score < 0 || score > 160) return;

    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const res = predictRank({
        exam: "ap-eapcet",
        marks: score,
        stream,
        ...(typeof inter1 === 'number' ? { inter1Marks: inter1 } : {}),
        ...(typeof inter2 === 'number' ? { inter2Marks: inter2 } : {})
      });

      setResult(res);
      setIsCalculating(false);
    }, 1500);
  };

  const getCollegeTierForTable = (rankMax: number) => {
    if (rankMax <= 3000) return "Top Govt / Tier-1";
    if (rankMax <= 10000) return "Tier-1 Private";
    if (rankMax <= 50000) return "Good Private (Convenor)";
    return "Private (Management likely)";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-900/30 p-3 ring-1 ring-cyan-200 dark:ring-cyan-800 mb-4">
          <Calculator className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">AP EAMCET Rank Predictor 2026</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Estimate your AP EAPCET rank based on official 2026 formula (75% + 25%).</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>✅ Free — No login needed</span>
          <span className="hidden sm:inline">•</span>
          <span>✅ Official 75%+25% formula</span>
          <span className="hidden sm:inline">•</span>
          <span>✅ Based on latest APSCHE data</span>
        </div>
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
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="engineering">MPC - Engineering</option>
                  <option value="agri-pharmacy">BiPC - Agriculture & Pharmacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AP EAPCET Marks (0-160) *
                </label>
                <input
                  type="number"
                  id="score"
                  min="0"
                  max="160"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. 110"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Intermediate Group Marks (Optional but recommended)
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="inter1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {stream === 'engineering' 
                        ? "Inter 1st Year Marks (Maths + Physics + Chemistry, out of 300)"
                        : "Inter 1st Year Marks (Botany + Zoology + Physics + Chemistry, out of 300)"}
                    </label>
                    <input
                      type="number"
                      id="inter1"
                      min="0"
                      max="300"
                      value={inter1}
                      onChange={(e) => setInter1(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 280"
                    />
                  </div>

                  <div>
                    <label htmlFor="inter2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {stream === 'engineering' 
                        ? "Inter 2nd Year Marks (Maths + Physics + Chemistry, out of 300)"
                        : "Inter 2nd Year Marks (Botany + Zoology + Physics + Chemistry, out of 300)"}
                    </label>
                    <input
                      type="number"
                      id="inter2"
                      min="0"
                      max="300"
                      value={inter2}
                      onChange={(e) => setInter2(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 290"
                    />
                  </div>
                  
                  {hasIPEInput && (
                    <div className="text-sm font-medium text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-md border border-cyan-100 dark:border-cyan-800/50">
                      Total IPE Group Marks: {totalIPE} / 600
                    </div>
                  )}

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setShowIPEInfo(!showIPEInfo)}
                      className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      Why do IPE marks matter? {showIPEInfo ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </button>
                    {showIPEInfo && (
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                        AP EAPCET 2026 officially uses 75% EAPCET + 25% Inter group marks formula. Adding your marks gives a more accurate prediction.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isCalculating}
                className="w-full rounded-md bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
              <Loader2 className="h-12 w-12 text-cyan-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">Analyzing AP EAPCET trends...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="card p-8 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/40 dark:to-gray-900 border border-cyan-100 dark:border-cyan-800 rounded-xl text-center shadow-md relative overflow-hidden">
                {!result.hasIPE ? (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    MEDIUM Confidence
                  </div>
                ) : (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${result.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                    {result.confidence} Confidence
                  </div>
                )}
                
                <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">Estimated Rank Range</h2>
                
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

                {!result.hasIPE && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-4">
                    Add IPE marks for better accuracy
                  </p>
                )}

                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 py-2 px-4 rounded-lg inline-block">
                  Merit score: <span className="font-bold text-cyan-600 dark:text-cyan-400">{result.meritScore}</span> / 100
                </div>

                <div className="mt-6 text-left border-t border-cyan-100 dark:border-cyan-900/50 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Calculation Breakdown & Warnings</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {result.assumptions.map((a, i) => <li key={i} className="flex gap-2"><Info className="h-4 w-4 text-cyan-500 shrink-0" /> {a}</li>)}
                    {result.warnings.map((w, i) => <li key={i} className="flex gap-2"><AlertCircle className="h-4 w-4 text-orange-500 shrink-0" /> {w}</li>)}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-cyan-100 dark:border-cyan-900/50">
                  <a 
                    href={`https://wa.me/?text=I just predicted my AP EAPCET 2026 rank! Check your rank using the official 75% + 25% IPE formula for free here: https://studykit.vercel.app/tools/ap-eamcet-rank`}
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">AP EAMCET Marks vs Rank 2026 Table</h3>
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
                  {apData.engineering.map((band, i) => (
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
              <HelpCircle className="h-6 w-6 text-cyan-500" /> Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">1. Does AP EAPCET 2026 include Intermediate/IPE marks in rank calculation?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Yes. The official AP EAPCET 2026 instruction booklet by JNTU Kakinada confirms ranking uses 75% normalized AP EAPCET marks + 25% Intermediate group subject marks (MPC or BiPC). This was a COVID-era exception in 2022 when IPE was temporarily removed; the official formula has since reverted to including IPE.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">2. Which Inter marks are used — total or group subjects only?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Only group subject marks are used — not total Intermediate marks. For Engineering (MPC): Maths, Physics, Chemistry marks. For Agriculture/Pharmacy (BiPC): Botany, Zoology, Physics, Chemistry marks. The maximum for each year is 300 marks, totaling 600 across both years.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">3. What is the AP EAPCET 2026 official rank formula?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Merit Score = (Normalized EAPCET Marks / 160 × 75) + (Inter Group Marks / 600 × 25). For example: EAPCET = 130, Inter group = 540 → Merit = (130/160×75) + (540/600×25) = 60.94 + 22.50 = 83.44 out of 100.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">4. Does category (OBC/SC/ST) affect my AP EAPCET rank?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No. Category does NOT change your statewide AP EAPCET rank. All candidates are ranked on the same merit formula. Category only affects which reserved seats you can compete for during APSCHE counseling and seat allotment.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">5. Are ranks based on raw marks or normalized marks?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Normalized marks. Since AP EAPCET runs across multiple sessions on different days, normalization adjusts for difficulty differences between sessions. Your raw marks are converted to normalized marks before rank calculation.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">6. How accurate is this predictor?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  High accuracy for scores above 100 marks when IPE marks are provided. For scores below 70 or without IPE input, the range is wider due to candidate distribution uncertainty. This tool uses official AP EAPCET 2025-2026 data and the official rank formula.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">7. Is this an official APSCHE tool?</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No. This is an independent estimation tool. Official ranks are published by APSCHE after the exam. Always refer to cets.apsche.ap.gov.in for official results.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-center">
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Disclaimer</p>
            <p>This tool estimates your AP EAPCET 2026 rank using the official formula (75% EAPCET + 25% IPE) and historical marks-vs-rank data. It is not affiliated with APSCHE, JNTU Kakinada, or any government authority. Final ranks depend on official normalization, total candidates, and published merit lists. Source: AP EAPCET 2026 Official Instruction Booklet V4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
