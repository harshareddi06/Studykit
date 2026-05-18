import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpen, GraduationCap } from 'lucide-react';
import apData from '@/data/ap-2025.json';
import tgData from '@/data/tg-2025.json';

export const metadata: Metadata = {
  title: "AP & TS EAMCET Marks vs Rank 2026 — Complete Analysis | StudyKit",
  description: "Detailed marks vs rank analysis for AP EAPCET and TS EAMCET 2026. Understand normalization, category impacts, and see complete historical tables.",
  keywords: "eamcet marks vs rank 2026, ap eamcet marks vs rank, ts eamcet marks vs rank, eamcet 2026 analysis, eamcet normalisation"
};

export default function EamcetMarksVsRankPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
          AP & TS EAMCET Marks vs Rank 2026 — Complete Analysis
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A comprehensive breakdown of how your EAMCET marks translate to ranks in 2026, based on the latest 2025 official data trends and normalization rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card p-6 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/40 dark:to-gray-900 border border-cyan-100 dark:border-cyan-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            AP EAMCET Predictor
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Predict your AP rank accurately using the official 75% EAMCET + 25% IPE formula.
          </p>
          <Link href="/tools/ap-eamcet-rank" className="inline-flex items-center text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
            Try AP Predictor <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="card p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-gray-900 border border-indigo-100 dark:border-indigo-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            TS EAMCET Predictor
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Predict your TG EAPCET rank based on the new 100% entrance mark weightage rule.
          </p>
          <Link href="/tools/ts-eamcet-rank" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            Try TS Predictor <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="prose prose-cyan dark:prose-invert max-w-none space-y-10">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2">
            <BookOpen className="h-6 w-6 text-gray-400" />
            Understanding Normalization
          </h2>
          <p>
            Because the EAMCET exams are conducted across multiple sessions over several days, the difficulty level of the question paper may vary from session to session. To ensure no student is disadvantaged by a harder paper, the authorities use a statistical process called <strong>Normalization</strong>.
          </p>
          <p>
            Normalization adjusts the raw marks of a student by considering the average performance of the top 0.1% students in their session compared to the overall top 0.1% students across all sessions. This means your final rank is based on your <em>normalized marks</em>, not your raw marks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AP EAPCET 2026: Marks vs Rank Trend</h2>
          <p>
            For Andhra Pradesh, the official ranking still includes <strong>25% weightage for Intermediate (IPE) marks</strong> and 75% for EAMCET marks. The table below shows the expected rank ranges based on 2025 official patterns.
          </p>
          
          <div className="overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left m-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">Marks Range (out of 160)</th>
                  <th className="px-4 py-3">Expected Rank Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {apData.engineering.map((band, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{band.marksMin} - {band.marksMax}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{band.rankMin.toLocaleString()} - {band.rankMax.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TS EAMCET (TG EAPCET) 2026: Marks vs Rank Trend</h2>
          <p>
            In Telangana, the 25% IPE weightage has been <strong>completely removed</strong>. Your rank is based 100% on your normalized EAMCET marks. This has led to a significant shift in rank distributions compared to earlier years.
          </p>
          
          <div className="overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left m-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">Normalized Marks Range</th>
                  <th className="px-4 py-3">Expected Rank Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {tgData.engineering.map((band, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{band.marksMin} - {band.marksMax}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{band.rankMin.toLocaleString()} - {band.rankMax.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2024 vs 2025: The Rank Shift</h2>
          <p>
            One of the most crucial observations from recent EAMCET data is the <strong>&quot;Rank Shift&quot;</strong> phenomenon. 
            Particularly in Telangana, where IPE weightage was removed, students with similar raw marks in 2025 secured significantly different ranks compared to 2024. 
          </p>
          <p>
            Generally, the removal of IPE weightage means the competition purely rests on entrance day performance. This caused tighter clustering at the top—meaning a difference of just 1 or 2 marks could slide your rank by several hundreds in the 120+ score range, and by several thousands in the 60-80 score range.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-2">
            <GraduationCap className="h-6 w-6 text-gray-400" />
            Category and Counseling Impact
          </h2>
          <p>
            A common misconception is that your reservation category (SC, ST, BC, EWS) changes your actual EAMCET rank. <strong>It does not.</strong> 
          </p>
          <p>
            Your rank is generated purely on the state-wide merit list based on your normalized marks. However, your category becomes crucial during <strong>Counseling and Seat Allotment</strong>. A student with a rank of 50,000 in the general category might not secure a seat in a top-tier college, but a student with the same rank in a reserved category might easily secure a seat due to the category-specific seat matrix.
          </p>
          <p>
            Therefore, while our predictor tools give you the raw rank, they also estimate your college tier taking your category into conceptual account to provide realistic expectations.
          </p>
        </section>

      </div>
    </div>
  );
}
