import type { Metadata } from 'next'
import APEamcetClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "AP EAMCET Rank Predictor 2026 — Free AP EAPCET Rank Estimator with IPE | StudyKit",
  description: "Free AP EAPCET 2026 rank predictor using official formula: 75% EAPCET marks + 25% IPE group marks. No login. Instant results. Based on official APSCHE 2026 booklet data.",
  keywords: "AP EAMCET rank predictor 2026, AP EAPCET rank estimator free, AP EAMCET marks vs rank 2026, AP EAPCET IPE weightage, free rank calculator no login, APSCHE rank predictor"
}

export default function APEamcetRankPredictor() {
  return <APEamcetClientPage />
}
