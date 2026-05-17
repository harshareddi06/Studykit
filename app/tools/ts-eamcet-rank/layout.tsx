import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TS EAMCET 2026 Rank Predictor — Results Out Today!",
  description: "Predict your Telangana EAMCET rank free. Based on 2024-2026 official data.",
};

export default function TSEamcetRankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
