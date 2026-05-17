import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET Rank Predictor",
  description: "Predict your All India Rank (AIR) and check out expected college tiers based on previous years' cutoffs.",
};

export default function NeetRankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
