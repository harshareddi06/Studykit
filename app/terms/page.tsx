import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StudyKit",
  description: "Terms of Service for StudyKit. Please read these terms carefully before using our tools.",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
        <p>Last updated: May 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using StudyKit, you accept and agree to be bound by these Terms of Service. All tools provided on this website are free to use.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Nature of Services</h2>
        <p>The tools and calculators on StudyKit, including the NEET and EAMCET rank predictors, are designed for estimation purposes only. They are based on historical data and trends.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. No Affiliation</h2>
        <p>StudyKit is an independent project. We are <strong>not affiliated with</strong>, endorsed by, or connected to the National Testing Agency (NTA), TS/AP State Council of Higher Education (SCHE), or any other government or official educational body.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. No Warranties</h2>
        <p>The estimated results provided by our tools are not guaranteed to match official results. StudyKit makes no warranties or representations regarding the accuracy, completeness, or reliability of any tool. You use the site and its tools entirely at your own risk.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Contact</h2>
        <p>For any inquiries regarding these terms, please contact: <a href="mailto:contact@studykit.in" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact@studykit.in</a></p>
      </div>
    </div>
  );
}
