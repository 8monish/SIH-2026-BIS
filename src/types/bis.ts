export type StandardCategory = 
  | 'Electronics & IT'
  | 'Food & Agriculture'
  | 'Chemicals & Petrochemicals'
  | 'Civil & Construction'
  | 'Mechanical & Automotive'
  | 'Gold & Silver Hallmarking'
  | 'Medical Equipment'
  | 'Textiles & Footwear';

export type CertificationSchemeCode = 
  | 'Scheme-I'    // ISI Mark
  | 'Scheme-II'   // Compulsory Registration Scheme (CRS)
  | 'Scheme-IV'   // Foreign Manufacturers Certification Scheme (FMCS)
  | 'Scheme-V'    // Hallmarking
  | 'Eco-Mark';   // Eco Mark

export interface StandardClause {
  clauseNumber: string;
  title: string;
  description: string;
  mandatoryTest: boolean;
}

export interface IndianStandard {
  id: string;
  isNumber: string;            // e.g. "IS 10500:2012"
  title: string;               // e.g. "Drinking Water Specification"
  productName: string;         // e.g. "Packaged Drinking Water"
  category: StandardCategory;
  scheme: CertificationSchemeCode;
  isMandatory: boolean;
  qcoNotificationNumber?: string;
  ministry?: string;
  scopeSummary: string;
  keyClauses: StandardClause[];
  requiredTests: string[];
  sampleSize: string;
  turnaroundTimeWeeks: number;
  applicationFeeINR: number;
  annualLicenseFeeINR: number;
  markingFeeFormula: string;
  applicableToMSME: boolean;
  substitutesOrKeywords: string[];
}

export interface TestingLab {
  id: string;
  name: string;
  labType: 'BIS Central Lab' | 'BIS Regional Lab' | 'BIS Branch Lab' | 'NABL Accredited Recognized';
  city: string;
  state: string;
  address: string;
  email: string;
  phone: string;
  recognizedStandards: string[]; // List of IS numbers
  turnaroundDays: number;
  isSampleDropoffCenter: boolean;
}

export interface CertificationScheme {
  id: CertificationSchemeCode;
  name: string;
  badge: string;
  shortDescription: string;
  detailedProcess: string[];
  governingRegulation: string;
  targetAudience: string;
  keyDocumentsRequired: string[];
  timelineDaysAvg: number;
}

export interface CitedSource {
  id: string;
  title: string;
  documentType: 'Indian Standard' | 'QCO Gazette' | 'BIS Guidelines' | 'Testing Protocol';
  referenceNumber: string;
  clauseOrSection?: string;
  snippet: string;
  officialUrl?: string;
}

export interface SuggestedAction {
  id: string;
  label: string;
  actionType: 'open_standard' | 'open_lab' | 'open_roadmap' | 'open_gap_test' | 'run_query';
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  citations?: CitedSource[];
  suggestedActions?: SuggestedAction[];
  highlightedStandard?: IndianStandard;
}

export interface GapChecklistItem {
  id: string;
  category: 'Documentation' | 'Testing Equipment' | 'Quality Personnel' | 'Factory Premises' | 'Traceability';
  question: string;
  helpText: string;
  weight: number;
}

export interface GapAssessmentResult {
  score: number; // 0 to 100
  readinessLevel: 'Ready for Audit' | 'Minor Gaps (1-2 Weeks)' | 'Moderate Gaps (1 Month)' | 'Substantial Preparation Needed';
  strengths: string[];
  missingItems: string[];
  estimatedPreparationWeeks: number;
  recommendedSteps: string[];
}
