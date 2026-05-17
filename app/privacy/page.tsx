import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StudyKit",
  description: "Privacy policy for StudyKit. Learn how we handle your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
        <p>Last updated: May 2026</p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Data Collection</h2>
        <p>StudyKit is built with privacy in mind. We do not collect, store, or process any personal data from our users. You do not need to create an account or log in to use our tools.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Cookies and Local Storage</h2>
        <p>We do not use tracking cookies. The only information we store in your browser&apos;s local storage is your display theme preference (light or dark mode) to enhance your user experience.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Third-Party Advertising</h2>
        <p>In the future, we may use Google AdSense or similar third-party advertising networks to show ads on StudyKit. These third parties may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings.</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions or concerns about our privacy policy, please contact us at: <a href="mailto:contact@studykit.in" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact@studykit.in</a></p>
      </div>
    </div>
  );
}
