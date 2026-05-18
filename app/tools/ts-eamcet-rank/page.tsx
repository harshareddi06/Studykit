import type { Metadata } from 'next'
import TSEamcetClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "TS EAMCET Rank Predictor 2026 — Free TG EAPCET Rank Estimator | StudyKit",
  description: "Free TS EAMCET 2026 rank predictor. Based on official TG EAPCET 2026 booklet. No IPE marks needed. No login. Instant results with college predictions.",
  keywords: "TS EAMCET rank predictor 2026, TG EAPCET rank estimator free, TS EAMCET marks vs rank 2026, Telangana EAMCET rank calculator, TG EAPCET no IPE rank"
}

export default function TSEamcetRankPredictor() {
  return <TSEamcetClientPage />
}
