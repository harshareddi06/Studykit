import Link from "next/link";
import { Activity, Calculator, ArrowRight, GraduationCap, Calendar, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            Smarter tools for your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              academic journey
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-600 dark:text-gray-400">
            Take the guesswork out of your admissions. Use our accurate, data-driven rank predictors for NEET and EAMCET to plan your future with confidence. <span className="font-semibold text-indigo-600 dark:text-indigo-400">100% Free — No mobile number verification required.</span>
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link href="#tools" className="btn-primary flex items-center gap-2 px-6 py-3 text-base">
              Explore Tools <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Essential Toolkit</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to predict your rank
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl sm:mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* NEET Tool Card */}
              <Link href="/tools/neet-rank" className="card group relative overflow-hidden p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/30 p-3 ring-1 ring-indigo-200 dark:ring-indigo-800">
                    <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">NEET Predictor</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex-1 mb-8">
                  Predict your All India Rank (AIR) and check out expected college tiers based on previous years&apos; cutoffs.
                </p>
                <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors">
                  Try it out <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>

              {/* TS EAMCET Tool Card */}
              <Link href="/tools/ts-eamcet-rank" className="card group relative overflow-hidden p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-cyan-50 dark:bg-cyan-900/30 p-3 ring-1 ring-cyan-200 dark:ring-cyan-800">
                    <Calculator className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">TS EAMCET Predictor</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex-1 mb-8">
                  Estimate your TS EAPCET rank for Engineering and Agriculture/Pharmacy streams based on 2024-2025 data.
                </p>
                <div className="flex items-center text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                  Try it out <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>

              {/* AP EAMCET Tool Card */}
              <Link href="/tools/ap-eamcet-rank" className="card group relative overflow-hidden p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3 ring-1 ring-blue-200 dark:ring-blue-800">
                    <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AP EAMCET Predictor</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex-1 mb-8">
                  Estimate your AP EAPCET rank with our advanced calculator that considers your 25% IPE weightage.
                </p>
                <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors">
                  Try it out <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-12">
            <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Future Updates</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Coming Soon to StudyKit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "College Predictor (EAMCET)",
                desc: "Find colleges you can get based on your rank",
                icon: <GraduationCap className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              },
              {
                title: "JEE Rank Predictor",
                desc: "Predict your JEE Main rank",
                icon: <Activity className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              },
              {
                title: "CGPA Calculator",
                desc: "Calculate your semester GPA",
                icon: <Calculator className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              },
              {
                title: "Attendance Calculator",
                desc: "Check if you can skip more classes",
                icon: <Calendar className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              },
              {
                title: "Scholarship Finder",
                desc: "Find scholarships you are eligible for",
                icon: <Award className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              }
            ].map((tool, i) => (
              <div key={i} className="card relative overflow-hidden p-6 flex flex-col opacity-50 grayscale select-none border border-gray-200 dark:border-gray-700">
                <div className="absolute top-4 right-4 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold px-2.5 py-1 rounded-full ring-1 ring-purple-200 dark:ring-purple-800">
                  Coming Soon
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2 ring-1 ring-gray-200 dark:ring-gray-700">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-20">{tool.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
