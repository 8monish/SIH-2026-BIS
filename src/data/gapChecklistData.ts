import { GapChecklistItem } from '../types/bis';

export const GAP_ASSESSMENT_CHECKLIST: GapChecklistItem[] = [
  {
    id: 'gap-doc-1',
    category: 'Documentation',
    question: 'Do you possess a valid Factory License, Udyam Registration (for MSMEs), and State Pollution Control Board Consent (CTO)?',
    helpText: 'BIS requires proof of legal establishment and environmental clearances before scheduling a physical audit.',
    weight: 15
  },
  {
    id: 'gap-doc-2',
    category: 'Documentation',
    question: 'Is your Scheme of Inspection and Testing (SIT) and Quality Manual prepared as per the specific Indian Standard?',
    helpText: 'The SIT outlines the frequency of testing raw materials, in-process goods, and final finished products.',
    weight: 15
  },
  {
    id: 'gap-lab-1',
    category: 'Testing Equipment',
    question: 'Do you have an in-house testing laboratory equipped with all test apparatus required by the standard?',
    helpText: 'Routine and type tests specified under the product standard must be testable within the factory premises.',
    weight: 20
  },
  {
    id: 'gap-lab-2',
    category: 'Testing Equipment',
    question: 'Are all test instruments calibrated by an NABL-accredited calibration laboratory within their valid calibration cycle?',
    helpText: 'BIS inspecting auditors will review calibration certificates with traceability to national standards (NPL).',
    weight: 15
  },
  {
    id: 'gap-staff-1',
    category: 'Quality Personnel',
    question: 'Do you have a qualified Quality Control In-Charge / Chemist / Microbiologist holding relevant technical degrees?',
    helpText: 'BIS requires dedicated technical personnel competent in running the specific IS testing protocols.',
    weight: 15
  },
  {
    id: 'gap-trace-1',
    category: 'Traceability',
    question: 'Do you maintain batch-wise manufacturing records, raw material test certificates (MTC), and reject logs?',
    helpText: 'Complete backward and forward traceability from raw batch to finished serialized unit is mandatory.',
    weight: 10
  },
  {
    id: 'gap-fac-1',
    category: 'Factory Premises',
    question: 'Are raw material storage, production line, quarantine area, and finished goods warehouse clearly demarcated?',
    helpText: 'Segregation prevents accidental mixing of non-conforming or un-tested products with certified stock.',
    weight: 10
  }
];
