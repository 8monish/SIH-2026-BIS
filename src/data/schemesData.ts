import { CertificationScheme } from '../types/bis';

export const BIS_SCHEMES_DATABASE: CertificationScheme[] = [
  {
    id: 'Scheme-I',
    name: 'ISI Mark Certification Scheme',
    badge: 'ISI Standard Mark',
    shortDescription: 'Product certification scheme where BIS license allows manufacturers to apply the prestigious ISI mark after factory audit and lab compliance.',
    detailedProcess: [
      'Submission of online application on Manakonline portal with Form-V',
      'Factory audit by BIS inspecting officer to verify manufacturing & in-house lab facilities',
      'Drawing of independent samples for testing at BIS Central/Regional/Recognized labs',
      'Grant of License (GoL) upon satisfactory test report and audit clearance',
      'Issuance of CML (Certificate of Manufacturing License) & continuous market surveillance'
    ],
    governingRegulation: 'BIS (Conformity Assessment) Regulations, 2018 - Scheme I',
    targetAudience: 'Domestic manufacturers of consumer, construction, safety, food & mechanical products',
    keyDocumentsRequired: [
      'Factory registration / MSME Udyam Certificate',
      'Manufacturing machinery list with capacity',
      'Testing equipment list with valid calibration certificates',
      'Plant layout and in-house laboratory setup diagram',
      'Consent to Operate (CTO) from State Pollution Control Board'
    ],
    timelineDaysAvg: 35
  },
  {
    id: 'Scheme-II',
    name: 'Compulsory Registration Scheme (CRS)',
    badge: 'CRS Self-Declaration Mark',
    shortDescription: 'Registration scheme for Electronic and IT goods based on self-declaration of conformity backed by testing in BIS-recognized labs.',
    detailedProcess: [
      'Sample testing at BIS-recognized NABL laboratory in India',
      'Receipt of compliant Test Report (TR) issued within 90 days',
      'Submission of online application on BIS CRS portal (crsbis.in)',
      'Scrutiny of test reports, brand authorization letter, and affidavits by BIS',
      'Grant of Registration (R-number) and permission to affix the standard CRS label'
    ],
    governingRegulation: 'Electronics and IT Goods (Requirement for Compulsory Registration) Orders',
    targetAudience: 'Domestic and International IT, Electronics, Solar & Battery manufacturers',
    keyDocumentsRequired: [
      'Original Test Report (TR) from BIS recognized laboratory',
      'Brand / Trademark Registration Certificate',
      'Authorization Letter from Brand Owner (if applicant is manufacturer)',
      'Affidavit / Undertaking for compliance and market surveillance',
      'Authorized Indian Representative (AIR) appointment for foreign brands'
    ],
    timelineDaysAvg: 18
  },
  {
    id: 'Scheme-IV',
    name: 'Foreign Manufacturers Certification Scheme (FMCS)',
    badge: 'FMCS License',
    shortDescription: 'Certification scheme granting ISI mark licenses to overseas manufacturers exporting regulated goods into India.',
    detailedProcess: [
      'Application submission with FMCD division at BIS Headquarters, New Delhi',
      'Appointment of Authorized Indian Representative (AIR) residing in India',
      'Technical scrutiny and cost estimate for overseas inspection visit',
      'Physical factory audit of foreign manufacturing facility by BIS technical team',
      'Sample collection & testing in BIS laboratories in India followed by Grant of License'
    ],
    governingRegulation: 'BIS Act 2016 & FMCS Guidelines',
    targetAudience: 'Overseas manufacturers exporting products subject to mandatory Indian Standards',
    keyDocumentsRequired: [
      'Overseas factory registration & business license',
      'Process flow chart and quality control manual',
      'Authorized Indian Representative (AIR) agreement & KYC',
      'List of in-house testing equipment with calibration',
      'Proof of overseas inspection fee payment'
    ],
    timelineDaysAvg: 90
  },
  {
    id: 'Scheme-V',
    name: 'Hallmarking Scheme for Precious Metals',
    badge: 'BIS Hallmarking (HUID)',
    shortDescription: 'Certification of purity and fineness of gold and silver jewellery / artefacts with unique 6-digit HUID laser marking.',
    detailedProcess: [
      'Registration of Jeweller on Manakonline portal (instant online grant)',
      'Sending jewellery articles to BIS Recognized Assaying and Hallmarking Centre (AHC)',
      'Assaying via XRF non-destructive scan and Fire Assay cupellation (IS 1418)',
      'Laser engraving of BIS logo, fineness mark (e.g. 22K916), and unique 6-digit HUID code',
      'Upload of hallmarked item data into central BIS national registry'
    ],
    governingRegulation: 'Hallmarking of Gold Jewellery and Gold Artefacts Order',
    targetAudience: 'Jewellers, artisans, retail showrooms & gold bullion refiners',
    keyDocumentsRequired: [
      'GST Registration Certificate of Jeweller',
      'Proof of showroom / sales establishment address',
      'PAN card and Aadhaar of proprietor / authorized signatory',
      'Annual turnover declaration'
    ],
    timelineDaysAvg: 2
  },
  {
    id: 'Eco-Mark',
    name: 'Eco Mark Scheme',
    badge: 'Eco Mark Label',
    shortDescription: 'Ecolabeling scheme for environment-friendly products meeting strict sustainability and low environmental impact criteria.',
    detailedProcess: [
      'Verification of compliance with base Indian Standard (e.g. IS 10500, IS 1489)',
      'Testing for eco-criteria (biodegradability, recyclable packaging, zero toxic emissions)',
      'Environmental audit and verification of hazardous substance minimization',
      'Grant of Eco Mark license alongside standard ISI mark'
    ],
    governingRegulation: 'Eco-Mark Notification Scheme / MoEFCC & BIS',
    targetAudience: 'Manufacturers of soaps, paints, paper, packaging, and eco-friendly products',
    keyDocumentsRequired: [
      'Valid ISI Mark license for base product',
      'Environmental clearance and consent from Central/State PCB',
      'Laboratory test report on ecological parameters (RoHS/VOC/Biodegradability)',
      'Recyclable packaging declaration'
    ],
    timelineDaysAvg: 40
  }
];
