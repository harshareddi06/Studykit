import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AP EAMCET 2026 Rank Predictor — Results Out Today!",
  description: "Predict your AP EAMCET 2026 rank with IPE weightage. Free tool based on previous year data.",
};

export default function APEamcetRankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
