import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TS EAMCET 2026 Rank Predictor — Results Out Today!",
  description: "Predict your Telangana EAMCET rank free. Based on 2024-2026 official data.",
  keywords: "free AP EAMCET rank predictor 2026, TS EAMCET rank predictor 2026, eamcet rank from marks, no login no registration, instant rank prediction, AP EAPCET 2026 rank estimator, TS EAPCET rank calculator free",
};

export default function TSEamcetRankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
