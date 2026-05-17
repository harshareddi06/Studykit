import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AP EAMCET 2026 Rank Predictor — Results Out Today!",
  description: "Predict your AP EAMCET 2026 rank with IPE weightage. Free tool based on previous year data.",
  keywords: "free AP EAMCET rank predictor 2026, TS EAMCET rank predictor 2026, eamcet rank from marks, no login no registration, instant rank prediction, AP EAPCET 2026 rank estimator, TS EAPCET rank calculator free",
};

export default function APEamcetRankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
