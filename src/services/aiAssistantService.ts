import { IndianStandard, CitedSource, SuggestedAction, ChatMessage } from '../types/bis';
import { BIS_STANDARDS_DATABASE } from '../data/standardsData';
import { BIS_SCHEMES_DATABASE } from '../data/schemesData';
import { BIS_LABS_DATABASE } from '../data/labsData';
import { queryGemini } from './geminiClient';

interface RAGResponse {
  answer: string;
  citations: CitedSource[];
  suggestedActions: SuggestedAction[];
  highlightedStandard?: IndianStandard;
}

export class AIAssistantService {
  /**
   * Search knowledge base and construct grounded RAG response
   */
  public static async processQuery(query: string, history: ChatMessage[] = []): Promise<RAGResponse> {
    const qLower = query.toLowerCase().trim();

    // 1. Identify best matching Indian Standard
    let bestStandard: IndianStandard | null = null;
    let maxScore = 0;

    for (const std of BIS_STANDARDS_DATABASE) {
      let score = 0;
      if (qLower.includes(std.isNumber.toLowerCase())) score += 10;
      if (qLower.includes(std.productName.toLowerCase())) score += 8;
      if (qLower.includes(std.title.toLowerCase())) score += 6;
      if (std.substitutesOrKeywords.some(kw => qLower.includes(kw.toLowerCase()))) score += 5;
      if (qLower.includes(std.category.toLowerCase())) score += 2;

      if (score > maxScore) {
        maxScore = score;
        bestStandard = std;
      }
    }

    // 2. Identify relevant Scheme
    const matchedScheme = BIS_SCHEMES_DATABASE.find(s => 
      qLower.includes(s.id.toLowerCase()) || 
      qLower.includes(s.name.toLowerCase()) || 
      (bestStandard && s.id === bestStandard.scheme)
    );

    // 3. Relevant Labs
    const relevantLabs = bestStandard 
      ? BIS_LABS_DATABASE.filter(lab => lab.recognizedStandards.includes(bestStandard!.isNumber))
      : BIS_LABS_DATABASE.slice(0, 3);

    // 4. Try Live Gemini if available
    const geminiContext = bestStandard
      ? `Retrieved BIS context: Standard ${bestStandard.isNumber} - ${bestStandard.title}. Scheme: ${bestStandard.scheme}. Mandatory: ${bestStandard.isMandatory}. Key tests: ${bestStandard.requiredTests.join(', ')}.`
      : 'General BIS Standards & Conformity Assessment Knowledge Base.';
    
    const liveGeminiAnswer = await queryGemini(query, geminiContext);

    if (liveGeminiAnswer) {
      const citations = this.generateCitations(bestStandard, matchedScheme);
      const actions = this.generateActions(bestStandard);
      return {
        answer: liveGeminiAnswer,
        citations,
        suggestedActions: actions,
        highlightedStandard: bestStandard || undefined,
      };
    }

    // 5. Intelligent Rule & Knowledge-Grounded RAG Response Generator
    return this.synthesizeKnowledgeResponse(query, qLower, bestStandard, matchedScheme, relevantLabs);
  }

  private static synthesizeKnowledgeResponse(
    originalQuery: string,
    q: string,
    standard: IndianStandard | null,
    scheme: any,
    labs: any[]
  ): RAGResponse {
    const citations: CitedSource[] = [];
    const suggestedActions: SuggestedAction[] = [];

    // Specific Intent: MSME Fee Concession
    if (q.includes('msme') || q.includes('concession') || q.includes('subsidy') || q.includes('discount') || q.includes('women')) {
      citations.push({
        id: 'cit-msme-1',
        title: 'BIS Guidelines on Fee Concessions for MSMEs and Women Entrepreneurs',
        documentType: 'BIS Guidelines',
        referenceNumber: 'CMD-1/Concessions/2023',
        snippet: 'Micro and Small Enterprises (MSEs) and Women-led enterprises are entitled to a 20% to 50% concession on application fee, annual license fee, and marking fee under Scheme-I.',
        officialUrl: 'https://www.bis.gov.in'
      });

      suggestedActions.push(
        { id: 'act-gap', label: 'Run MSME Readiness Assessment', actionType: 'open_gap_test' },
        { id: 'act-road', label: 'View 5-Phase Roadmap', actionType: 'open_roadmap' }
      );

      const answer = `### 🌟 BIS Concessions for MSMEs & Women Entrepreneurs

The Bureau of Indian Standards offers substantial fee concessions to promote quality compliance among **Micro, Small, and Medium Enterprises (MSMEs)**:

1. **Fee Reductions**:
   - **Application Fee**: Up to **50% concession** for Micro Enterprises and Women Entrepreneurs.
   - **Annual License Fee & Minimum Marking Fee**: **20% discount** applicable across major Scheme-I ISI products.
   - **Startup Exemption**: Recognized DPIIT Startups benefit from fast-track processing and priority laboratory slot allocation.

2. **Eligibility Criteria**:
   - Valid **Udyam Registration Certificate** indicating Micro/Small status.
   - Manufacturing unit located in India with active GST registration.

3. **Key Benefit**:
   - Reduces the initial capital outlay required for in-house laboratory setup and third-party laboratory verification.`;

      return { answer, citations, suggestedActions };
    }

    // Specific Intent: Hallmarking
    if (q.includes('hallmark') || q.includes('gold') || q.includes('huid') || q.includes('silver') || q.includes('jewel')) {
      const is1417 = BIS_STANDARDS_DATABASE.find(s => s.id === 'is-1417');
      citations.push({
        id: 'cit-huid-1',
        title: 'Hallmarking of Gold Jewellery and Artefacts Order (IS 1417:2016)',
        documentType: 'QCO Gazette',
        referenceNumber: 'S.O. 121(E) / Gazette of India',
        clauseOrSection: 'Clause 6.2 (HUID System)',
        snippet: 'Every gold jewellery article sold by a registered jeweller must bear: 1) BIS Logo, 2) Purity in Karat & Fineness (e.g. 22K916), 3) 6-digit alphanumeric HUID code.',
        officialUrl: 'https://manakonline.in'
      });

      suggestedActions.push(
        { id: 'act-std-huid', label: 'Inspect IS 1417 Specifications', actionType: 'open_standard', payload: 'is-1417' },
        { id: 'act-labs-huid', label: 'Locate Assaying & Hallmarking Centres (AHC)', actionType: 'open_lab' }
      );

      const answer = `### 💍 Mandatory Gold Hallmarking & 6-Digit HUID Process

Under **IS 1417:2016** and the **Hallmarking Order (Scheme-V)**, sale of gold jewellery without hallmark is strictly prohibited in notified districts across India.

#### 📌 The 3 Mandatory Hallmark Symbols:
1. **BIS Standard Logo**: Official triangular mark of quality.
2. **Purity & Fineness**: Stamped as **24K (995)**, **22K (916)**, **18K (750)**, or **14K (585)**.
3. **6-Digit HUID (Hallmark Unique Identification)**: A unique laser-engraved alphanumeric code generated via the Manakonline portal for full traceability.

#### ⚙️ Assaying & Certification Workflow:
1. **Jeweller Registration**: Instant online registration on Manakonline with zero government fee for small jewellers.
2. **Dispatch to AHC**: Send batch samples to a BIS-Recognized Assaying & Hallmarking Centre.
3. **Testing**: Tested via XRF scan and Fire Assay (*IS 1418* cupellation).
4. **Laser Engraving**: HUID laser engraved at ₹45 + GST per piece.`;

      return { answer, citations, suggestedActions, highlightedStandard: is1417 };
    }

    // Standard Match Found
    if (standard) {
      citations.push({
        id: `cit-${standard.id}`,
        title: `${standard.isNumber}: ${standard.title}`,
        documentType: 'Indian Standard',
        referenceNumber: standard.isNumber,
        clauseOrSection: standard.keyClauses.map(c => c.clauseNumber).join(', '),
        snippet: `${standard.scopeSummary} Mandatory status: ${standard.isMandatory ? 'Yes (QCO Order ' + standard.qcoNotificationNumber + ')' : 'Voluntary'}.`,
        officialUrl: 'https://www.services.bis.gov.in'
      });

      if (standard.qcoNotificationNumber) {
        citations.push({
          id: `cit-qco-${standard.id}`,
          title: `Quality Control Order: ${standard.qcoNotificationNumber}`,
          documentType: 'QCO Gazette',
          referenceNumber: standard.qcoNotificationNumber,
          snippet: `Issued by ${standard.ministry || 'Government of India'}. Mandates compulsory conformity assessment and standard marking.`,
          officialUrl: 'https://egazette.gov.in'
        });
      }

      suggestedActions.push(
        { id: `act-std-${standard.id}`, label: `View ${standard.isNumber} Full Standard`, actionType: 'open_standard', payload: standard.id },
        { id: `act-lab-${standard.id}`, label: 'Find Testing Labs for this Standard', actionType: 'open_lab', payload: standard.isNumber },
        { id: `act-road-${standard.id}`, label: 'View 5-Phase Certification Roadmap', actionType: 'open_roadmap' },
        { id: `act-gap-${standard.id}`, label: 'Check Audit Readiness Checklist', actionType: 'open_gap_test' }
      );

      const isSchemeCRS = standard.scheme === 'Scheme-II';
      const answer = `### 📋 Compliance Blueprint: ${standard.productName} (${standard.isNumber})

For **${standard.productName}**, conformity to **${standard.isNumber}** is **${standard.isMandatory ? 'MANDATORY by Law' : 'Voluntary'}** under **${standard.scheme}** (${isSchemeCRS ? 'Compulsory Registration Scheme' : 'ISI Mark Scheme'}).

---

#### 🔍 1. Scope & Governance
- **Standard**: \`${standard.isNumber}\` — *${standard.title}*
- **Regulatory Order**: ${standard.qcoNotificationNumber || 'Standard BIS Conformity Order'}
- **Responsible Ministry**: ${standard.ministry || 'Ministry of Consumer Affairs'}

#### 🧪 2. Critical Testing Parameters
${standard.requiredTests.map((t, idx) => `${idx + 1}. **${t}**`).join('\n')}

#### 📑 3. Key Standard Clauses
${standard.keyClauses.map(c => `• **${c.clauseNumber} (${c.title})**: ${c.description}`).join('\n')}

#### ⏱️ 4. Timeline, Samples & Cost Estimates
- **Required Sample Size**: ${standard.sampleSize}
- **Testing Turnaround**: ~${standard.turnaroundTimeWeeks} weeks in accredited laboratories
- **Application Fee**: ₹${standard.applicationFeeINR.toLocaleString('en-IN')}
- **Annual License Fee**: ₹${standard.annualLicenseFeeINR.toLocaleString('en-IN')}
- **Marking Fee**: ${standard.markingFeeFormula}

#### 🔬 5. Recognized Testing Facilities
Available at **${labs.length > 0 ? labs.map(l => l.name).join(', ') : 'BIS Central Laboratory (CL Sahibabad) & NABL accredited labs'}**.`;

      return { answer, citations, suggestedActions, highlightedStandard: standard };
    }

    // Fallback: General BIS Guidance
    citations.push({
      id: 'cit-gen-1',
      title: 'Bureau of Indian Standards Act, 2016 & Conformity Assessment Regulations 2018',
      documentType: 'BIS Guidelines',
      referenceNumber: 'BIS Act 2016 (Act No. 11 of 2016)',
      snippet: 'Governs the national standards body of India, harmonization of standards, grant of standard marks (ISI, CRS, Hallmarking), and laboratory testing accreditation.',
      officialUrl: 'https://bis.gov.in'
    });

    suggestedActions.push(
      { id: 'act-gen-search', label: 'Explore Indian Standards Directory', actionType: 'open_standard' },
      { id: 'act-gen-roadmap', label: 'View 5-Phase Certification Roadmap', actionType: 'open_roadmap' },
      { id: 'act-gen-labs', label: 'Find Testing Labs Across India', actionType: 'open_lab' }
    );

    const answer = `### 🇮🇳 Bureau of Indian Standards (BIS) Assistant

I can guide you on any Indian Standard (IS), mandatory Quality Control Order (QCO), or certification pathway.

#### 💡 How I can assist you:
1. **Identify Applicable Standard**: Type any product name (e.g. *"Packaged water"*, *"Lithium batteries"*, *"Helmets"*, *"TMT Rebar"*, *"LED Drivers"*).
2. **Certification Schemes**: Guidance on **Scheme-I (ISI Mark)**, **Scheme-II (CRS)**, **Scheme-IV (FMCS)**, and **Scheme-V (Hallmarking)**.
3. **Mandatory Testing**: Step-by-step test parameters, sample sizes, and lab turnaround estimates.
4. **Accredited Labs**: Discover BIS Central, Regional, and NABL recognized testing centers.
5. **MSME Readiness**: Evaluate your manufacturing & testing gap analysis before audit.

*Select a quick prompt below or type your specific product query to begin!*`;

    return { answer, citations, suggestedActions };
  }

  private static generateCitations(standard: IndianStandard | null, scheme: any): CitedSource[] {
    const citations: CitedSource[] = [];
    if (standard) {
      citations.push({
        id: `cit-${standard.id}`,
        title: `${standard.isNumber}: ${standard.title}`,
        documentType: 'Indian Standard',
        referenceNumber: standard.isNumber,
        snippet: standard.scopeSummary,
        officialUrl: 'https://www.services.bis.gov.in'
      });
    }
    return citations;
  }

  private static generateActions(standard: IndianStandard | null): SuggestedAction[] {
    const actions: SuggestedAction[] = [];
    if (standard) {
      actions.push({ id: `act-${standard.id}`, label: `View ${standard.isNumber}`, actionType: 'open_standard', payload: standard.id });
      actions.push({ id: `act-lab-${standard.id}`, label: 'Find Testing Labs', actionType: 'open_lab', payload: standard.isNumber });
      actions.push({ id: 'act-road', label: 'View Roadmap', actionType: 'open_roadmap' });
    } else {
      actions.push({ id: 'act-road', label: 'View 5-Phase Roadmap', actionType: 'open_roadmap' });
      actions.push({ id: 'act-labs', label: 'Explore Testing Labs', actionType: 'open_lab' });
    }
    return actions;
  }
}
