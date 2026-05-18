export type ExamType = 'ap-eapcet' | 'tg-eapcet'
export type StreamType = 'engineering' | 'agri-pharmacy'
export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface APInput {
  exam: 'ap-eapcet'
  marks: number
  stream: StreamType
  interGroupMarks?: number  // MPC or BiPC group marks out of 600
  inter1Marks?: number      // Inter 1st year group marks (auto-sum mode)
  inter2Marks?: number      // Inter 2nd year group marks (auto-sum mode)
}

export interface TGInput {
  exam: 'tg-eapcet'
  marks: number
  stream: StreamType
}

export type PredictorInput = APInput | TGInput

export interface PredictorResult {
  predictedRankMin: number
  predictedRankLikely: number
  predictedRankMax: number
  confidence: ConfidenceLevel
  meritScore: number
  meritScoreMax: number
  hasIPE: boolean
  assumptions: string[]
  warnings: string[]
  collegeTier: string
  collegeExamples: string[]
  formulaUsed: string
  dataSource: string
}

// AP 2026 band table
const AP_BANDS = [
  { marksMin: 150, marksMax: 160, rankMin: 1,     rankMax: 1000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 140, marksMax: 149, rankMin: 1001,  rankMax: 1500,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 130, marksMax: 139, rankMin: 1501,  rankMax: 2000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 120, marksMax: 129, rankMin: 2001,  rankMax: 4000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 110, marksMax: 119, rankMin: 4001,  rankMax: 6000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 100, marksMax: 109, rankMin: 6001,  rankMax: 8000,  confidence: 'medium' as ConfidenceLevel },
  { marksMin: 90,  marksMax: 99,  rankMin: 8001,  rankMax: 12000, confidence: 'medium' as ConfidenceLevel },
  { marksMin: 80,  marksMax: 89,  rankMin: 12001, rankMax: 18000, confidence: 'medium' as ConfidenceLevel },
  { marksMin: 70,  marksMax: 79,  rankMin: 18001, rankMax: 25000, confidence: 'medium' as ConfidenceLevel },
  { marksMin: 60,  marksMax: 69,  rankMin: 25001, rankMax: 40000, confidence: 'low' as ConfidenceLevel },
  { marksMin: 50,  marksMax: 59,  rankMin: 40001, rankMax: 65000, confidence: 'low' as ConfidenceLevel },
  { marksMin: 40,  marksMax: 49,  rankMin: 65001, rankMax: 95000, confidence: 'low' as ConfidenceLevel },
  { marksMin: 0,   marksMax: 39,  rankMin: 95001, rankMax: 180000,confidence: 'low' as ConfidenceLevel },
]

// TG 2026 band table (official 2025 normalized marks vs rank data)
const TG_BANDS = [
  { marksMin: 155, marksMax: 160, rankMin: 1,      rankMax: 50,    confidence: 'high' as ConfidenceLevel },
  { marksMin: 150, marksMax: 154, rankMin: 51,     rankMax: 200,   confidence: 'high' as ConfidenceLevel },
  { marksMin: 145, marksMax: 149, rankMin: 201,    rankMax: 500,   confidence: 'high' as ConfidenceLevel },
  { marksMin: 140, marksMax: 144, rankMin: 501,    rankMax: 800,   confidence: 'high' as ConfidenceLevel },
  { marksMin: 130, marksMax: 139, rankMin: 801,    rankMax: 2000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 120, marksMax: 129, rankMin: 2001,   rankMax: 4000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 110, marksMax: 119, rankMin: 4001,   rankMax: 6000,  confidence: 'high' as ConfidenceLevel },
  { marksMin: 100, marksMax: 109, rankMin: 6001,   rankMax: 10000, confidence: 'high' as ConfidenceLevel },
  { marksMin: 90,  marksMax: 99,  rankMin: 10001,  rankMax: 18000, confidence: 'high' as ConfidenceLevel },
  { marksMin: 80,  marksMax: 89,  rankMin: 18001,  rankMax: 26130, confidence: 'high' as ConfidenceLevel },
  { marksMin: 70,  marksMax: 79,  rankMin: 26131,  rankMax: 61040, confidence: 'medium' as ConfidenceLevel },
  { marksMin: 60,  marksMax: 69,  rankMin: 61041,  rankMax: 92270, confidence: 'medium' as ConfidenceLevel },
  { marksMin: 50,  marksMax: 59,  rankMin: 92271,  rankMax: 240290,confidence: 'low' as ConfidenceLevel },
  { marksMin: 40,  marksMax: 49,  rankMin: 240291, rankMax: 441210,confidence: 'low' as ConfidenceLevel },
  { marksMin: 0,   marksMax: 39,  rankMin: 441211, rankMax: 600000,confidence: 'low' as ConfidenceLevel },
]

function safeNumber(val: unknown): number | null {
  const n = Number(String(val).trim())
  return Number.isFinite(n) ? n : null
}

function getCollegeInfo(exam: ExamType, rank: number) {
  if (exam === 'tg-eapcet') {
    if (rank <= 5000)  return { tier: 'Top Government Colleges', examples: ['JNTUH Hyderabad', 'Osmania University', 'CBIT Hyderabad', 'VNR VJIET'] }
    if (rank <= 20000) return { tier: 'Tier-1 Private Colleges', examples: ['GRIET', 'Vasavi College of Engineering', 'CVR College of Engineering', 'MVSR Engineering'] }
    if (rank <= 80000) return { tier: 'Good Private Colleges (Convenor Quota)', examples: ['Various private colleges under DOST counseling'] }
    return { tier: 'Private Colleges — Management Quota likely needed', examples: ['Many private colleges have management quota seats available'] }
  } else {
    if (rank <= 3000)  return { tier: 'Top Government / Autonomous Colleges', examples: ['JNTU Anantapur', 'AU College of Engineering Vizag', 'IIIT Sri City', 'RGUKT'] }
    if (rank <= 10000) return { tier: 'Tier-1 Private Colleges', examples: ['VIT-AP University', 'KL University', 'SRM University AP', 'Amrita Vishwa Vidyapeetham'] }
    if (rank <= 50000) return { tier: 'Good Private Colleges (Convenor Quota)', examples: ['Various AP private colleges under APSCHE counseling'] }
    return { tier: 'Private Colleges — Management Quota likely needed', examples: ['Management quota seats available at various AP colleges'] }
  }
}

export function predictRank(input: PredictorInput): PredictorResult | null {
  const marks = safeNumber(input.marks)
  if (marks === null || marks < 0 || marks > 160) return null

  const assumptions: string[] = []
  const warnings: string[] = []
  let meritScore = marks
  let hasIPE = false
  let bandLookupScore = marks

  if (input.exam === 'ap-eapcet') {
    // Try to get IPE group marks
    let interGroupMarks: number | null = null

    if ('interGroupMarks' in input && input.interGroupMarks !== undefined) {
      interGroupMarks = safeNumber(input.interGroupMarks)
    } else if ('inter1Marks' in input && 'inter2Marks' in input &&
               input.inter1Marks !== undefined && input.inter2Marks !== undefined) {
      const i1 = safeNumber(input.inter1Marks)
      const i2 = safeNumber(input.inter2Marks)
      if (i1 !== null && i2 !== null) {
        interGroupMarks = i1 + i2  // combined out of 600
      }
    }

    if (interGroupMarks !== null && interGroupMarks >= 0 && interGroupMarks <= 600) {
      // Official formula: (EAPCET/160 × 75) + (IPE/600 × 25)
      const eapcetComponent = (marks / 160) * 75
      const ipeComponent = (interGroupMarks / 600) * 25
      meritScore = eapcetComponent + ipeComponent
      bandLookupScore = (meritScore / 100) * 160  // convert back to 160 scale for band lookup
      hasIPE = true
      assumptions.push(`Official AP formula: (${marks}/160 × 75) + (${interGroupMarks}/600 × 25) = ${meritScore.toFixed(2)} merit score`)
      assumptions.push('75% EAPCET normalized marks + 25% Inter group subject marks')
    } else {
      warnings.push('⚠️ Inter/IPE group marks not provided — rank range is wider than actual')
      warnings.push('Add your MPC/BiPC group marks for a more accurate prediction')
      assumptions.push('Marks-only estimate — official AP formula requires IPE marks for accuracy')
      // Widen the band significantly without IPE
      bandLookupScore = marks
    }

    assumptions.push('Source: AP EAPCET 2026 Official Instruction Booklet V4 (APSCHE/JNTU Kakinada)')
  } else {
    assumptions.push('TG EAPCET 2026: rank based 100% on normalized entrance marks')
    assumptions.push('IPE/Intermediate marks have NO effect on TG EAPCET rank')
    assumptions.push('Source: TG EAPCET 2026 Official Booklet + 2025 Normalized Marks vs Rank data')
    meritScore = marks
  }

  // Find band
  const bands = input.exam === 'ap-eapcet' ? AP_BANDS : TG_BANDS
  const band = bands.find(b => bandLookupScore >= b.marksMin && bandLookupScore <= b.marksMax)
  if (!band) return null

  // Apply uncertainty based on confidence + whether IPE was provided
  const baseUncertainty = band.confidence === 'high' ? 0.08 : band.confidence === 'medium' ? 0.18 : 0.30
  const ipeUncertainty = (input.exam === 'ap-eapcet' && !hasIPE) ? 0.20 : 0
  const totalUncertainty = baseUncertainty + ipeUncertainty

  const likely = Math.round((band.rankMin + band.rankMax) / 2)
  const adjustedMin = Math.max(1, Math.round(band.rankMin * (1 - totalUncertainty * 0.4)))
  const adjustedMax = Math.round(band.rankMax * (1 + totalUncertainty))

  if (marks < 50) warnings.push('Low score band has very high rank uncertainty')
  warnings.push('Final rank depends on official normalization and total candidates appearing')

  const college = getCollegeInfo(input.exam, likely)

  return {
    predictedRankMin: adjustedMin,
    predictedRankLikely: likely,
    predictedRankMax: adjustedMax,
    confidence: hasIPE ? band.confidence : 'low',
    meritScore: Math.round(meritScore * 100) / 100,
    meritScoreMax: input.exam === 'ap-eapcet' ? 100 : 160,
    hasIPE,
    assumptions,
    warnings,
    collegeTier: college.tier,
    collegeExamples: college.examples,
    formulaUsed: input.exam === 'ap-eapcet'
      ? '(EAPCET marks / 160 × 75) + (Inter group marks / 600 × 25)'
      : '100% normalized EAPCET marks',
    dataSource: input.exam === 'ap-eapcet'
      ? 'AP EAPCET 2026 Official Booklet (APSCHE/JNTU Kakinada)'
      : 'TG EAPCET 2026 Official Booklet + 2025 Normalized Marks vs Rank',
  }
}
