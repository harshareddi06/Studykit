import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                StudyKit
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 max-w-xs">
              Empowering students with accurate tools and calculators for better academic planning.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Tools</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/tools/neet-rank" className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      NEET Rank Predictor
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/ts-eamcet-rank" className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      TS EAMCET Predictor
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/ap-eamcet-rank" className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      AP EAMCET Predictor
                    </Link>
                  </li>
                  <li>
                    <span className="text-sm leading-6 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                      JEE Rank Predictor <span className="text-[10px] ml-1 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">Soon</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-sm leading-6 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                      CGPA Calculator <span className="text-[10px] ml-1 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">Soon</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-sm leading-6 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                      Scholarship Finder <span className="text-[10px] ml-1 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">Soon</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} StudyKit.in. All rights reserved. Not affiliated with NTA or TS/AP SCHE.
          </p>
        </div>
      </div>
    </footer>
  );
}
