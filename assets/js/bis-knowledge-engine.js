/**
 * BIS Portal & ManakBot AI — Intelligent Deep Domain Knowledge Engine
 * 
 * Accurately answers exact user queries across specific dimensions:
 * - Specific Indian Standards & Products (Water, Helmets, Gold, Cement, Concrete, Steel, Toys, Batteries, Cables, Electronics)
 * - Specific Aspects: Fees, Document Checklists, Validity/Renewals, Mandatory QCO Laws, Penalties,
 *   Office Addresses/Helplines, How to Verify, Lab Testing/TAT, MSME Concessions, Foreign Importers (FMCS), and Grievances.
 * - Supports English (EN), Tamil (TA), and Hindi (HI).
 */

import { t } from './i18n.js';

export const BIS_OFFICES = {
  headquarters: {
    name: 'BIS Headquarters (Manak Bhavan)',
    address: '9 Bahadur Shah Zafar Marg, New Delhi - 110002',
    phone: '011-2323 0131 / 2323 3375',
    email: 'info@bis.gov.in / complaints@bis.gov.in',
    helpline: '1800-11-0001 (Toll-Free, Mon-Fri 9:00 AM - 5:30 PM)'
  },
  chennai: {
    name: 'Southern Regional Office (SRO Chennai)',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
    phone: '044-2254 1216 / 2254 1442 / 2254 2519',
    email: 'sro@bis.gov.in'
  },
  coimbatore: {
    name: 'Coimbatore Branch Office (CBBO)',
    address: '3rd Floor, Maruthi Towers, Cowley Brown Road, R.S. Puram, Coimbatore - 641002',
    phone: '0422-247 2368 / 247 2369',
    email: 'cbbo@bis.gov.in'
  },
  madurai: {
    name: 'Madurai Branch Office (MDBO)',
    address: 'Meenakshi Towers, 1st Floor, Bypass Road, Madurai - 625016',
    phone: '0452-238 2881',
    email: 'mdbo@bis.gov.in'
  },
  bangalore: {
    name: 'Bangalore Branch Office (BNBO)',
    address: 'Peenya Industrial Area, 1st Stage, Bangalore - 560058',
    phone: '080-2839 4955',
    email: 'bnbo@bis.gov.in'
  },
  mumbai: {
    name: 'Western Regional Office (WRO Mumbai)',
    address: 'Manakalaya, E9, MIDC, Andheri (East), Mumbai - 400093',
    phone: '022-2832 9295 / 2832 7858',
    email: 'wro@bis.gov.in'
  },
  kolkata: {
    name: 'Eastern Regional Office (ERO Kolkata)',
    address: '1/14 C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
    phone: '033-2355 3243 / 2355 5084',
    email: 'ero@bis.gov.in'
  }
};

/**
 * Main Answer Dispatcher — Resolves the exact question with high precision
 */
export function resolveExactBISQuery(query, lang = 'en') {
  const q = (query || '').toLowerCase().trim();

  // 1. Office Locations & Contact Numbers
  if (
    q.includes('office') || q.includes('branch') || q.includes('address') || q.includes('where is') ||
    q.includes('contact') || q.includes('phone') || q.includes('helpline') || q.includes('toll-free') ||
    q.includes('chennai') || q.includes('coimbatore') || q.includes('madurai') || q.includes('taramani') ||
    q.includes('அலுவலகம்') || q.includes('முகவரி') || q.includes('எங்கு உள்ளது') || q.includes('சென்னை') ||
    q.includes('கோவை') || q.includes('உதவி எண்') || q.includes('தொடர்பு') || q.includes('कार्यालय') ||
    q.includes('पता') || q.includes('हेल्पलाइन')
  ) {
    return answerOfficeAndContact(q, lang);
  }

  // 2. Validity & Renewal of Licence (How many years, validity, expiry, renewal)
  if (
    q.includes('validity') || q.includes('how long') || q.includes('how many years') || q.includes('duration') ||
    q.includes('renew') || q.includes('renewal') || q.includes('expire') || q.includes('expiry') ||
    q.includes('செல்லுபடி') || q.includes('எத்தனை ஆண்டு') || q.includes('புதுப்பித்தல்') || q.includes('காலாவதி') ||
    q.includes('கால அவகாசம்') || q.includes('वैधता') || q.includes('नवीनीकरण') || q.includes('कितने साल')
  ) {
    return answerLicenceValidityAndRenewal(q, lang);
  }

  // 3. Document Checklists & Requirements to Apply
  if (
    q.includes('document') || q.includes('papers') || q.includes('requirement') || q.includes('prerequisite') ||
    q.includes('what are the requirements') || q.includes('apply for') || q.includes('checklist') ||
    q.includes('ஆவணங்கள்') || q.includes('சான்றிதழ்') || q.includes('தேவைப்படும் ஆவணங்கள்') || q.includes('விண்ணப்பிக்க என்ன வேண்டும்') ||
    q.includes('दस्तावेज') || q.includes('कागजात') || q.includes('आवेदन हेतु दस्तावेज')
  ) {
    return answerDocumentRequirements(q, lang);
  }

  // 4. Penalties, Fines, Jail & Legal Consequences
  if (
    q.includes('penalty') || q.includes('fine') || q.includes('punishment') || q.includes('jail') ||
    q.includes('prison') || q.includes('seize') || q.includes('raid') || q.includes('illegal') ||
    q.includes('consequence') || q.includes('தண்டனை') || q.includes('அபராதம்') || q.includes('சிறை') ||
    q.includes('பறிமுதல்') || q.includes('சட்ட நடவடிக்கை') || q.includes('सजा') || q.includes('जुर्माना') ||
    q.includes('जेल') || q.includes('कानूनी कार्रवाई')
  ) {
    return answerLegalPenalties(q, lang);
  }

  // 5. Fees & Costs Breakdown (Application fee, testing charges, marking fees)
  if (
    q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('charge') || q.includes('rate') ||
    q.includes('how much') || q.includes('கட்டணம்') || q.includes('விலை') || q.includes('செலவு') ||
    q.includes('எவ்வளவு கட்டணம்') || q.includes('शुल्क') || q.includes('फीस') || q.includes('खर्च') ||
    q.includes('लागत')
  ) {
    return answerFeesAndCosts(q, lang);
  }

  // 6. MSME & Startup Fee Concessions
  if (
    q.includes('msme') || q.includes('concession') || q.includes('subsidy') || q.includes('discount') ||
    q.includes('small enterprise') || q.includes('udyam') || q.includes('women') ||
    q.includes('குறுந்தொழில்') || q.includes('சிறு தொழில்') || q.includes('சலுகை') || q.includes('மகளிர்') ||
    q.includes('உத்யம்') || q.includes('एमएसएमई') || q.includes('छूट') || q.includes('सब्सिडी')
  ) {
    return answerMSMEConcessions(q, lang);
  }

  // 7. Mandatory Status & QCO Orders (Is it mandatory, compulsory, required by law)
  if (
    q.includes('mandatory') || q.includes('compulsory') || q.includes('is it required') || q.includes('qco') ||
    q.includes('order') || q.includes('notification') || q.includes('required by law') ||
    q.includes('கட்டாயமா') || q.includes('அவசியமா') || q.includes('சட்டப்படி கட்டாயம்') || q.includes('விதி') ||
    q.includes('தேவையா') || q.includes('अनिवार्य') || q.includes('ज़रूरी') || q.includes('लागू')
  ) {
    return answerMandatoryQCOStatus(q, lang);
  }

  // 8. Foreign Manufacturers & Imports (FMCS)
  if (
    q.includes('foreign') || q.includes('import') || q.includes('china') || q.includes('overseas') ||
    q.includes('export to india') || q.includes('fmcs') || q.includes('air') ||
    q.includes('வெளிநாட்டு') || q.includes('இறக்குமதி') || q.includes('சீனா') || q.includes('विदेश') ||
    q.includes('आयात') || q.includes('विदेशी निर्माता')
  ) {
    return answerFMCSForeignCertification(q, lang);
  }

  // 9. How to Verify Authenticity (Step by step how to check licence/HUID)
  if (
    q.includes('how to verify') || q.includes('how to check') || q.includes('how can i verify') ||
    q.includes('authenticate') || q.includes('how do i know if genuine') ||
    q.includes('சரிபார்ப்பது எப்படி') || q.includes('எப்படி சரிபார்க்க வேண்டும்') || q.includes('உண்மையானதா என அறிய') ||
    q.includes('सत्यापित कैसे करें') || q.includes('जांच कैसे करें') || q.includes('असली या नकली')
  ) {
    return answerHowToVerify(q, lang);
  }

  // 10. Lab Testing, Parameters & Turnaround Time (LIMS)
  if (
    q.includes('turnaround') || q.includes('tat') || q.includes('testing time') || q.includes('sample size') ||
    q.includes('how long test take') || q.includes('laboratory test') || q.includes('testing parameter') ||
    q.includes('மாதிரி அளவு') || q.includes('சோதனை காலம்') || q.includes('ஆய்வக பரிசோதனை') ||
    q.includes('परीक्षण समय') || q.includes('सैंपल साइज')
  ) {
    return answerLabTestingDetails(q, lang);
  }

  // 11. Filing Grievances & Redressal Steps
  if (
    q.includes('how to file complaint') || q.includes('how to complain') || q.includes('file a grievance') ||
    q.includes('report fake') || q.includes('cheat') || q.includes('புகார் செய்வது எப்படி') ||
    q.includes('புகார் பதிவு செய்வது எப்படி') || q.includes('மோசடி புகார்') || q.includes('शिकायत कैसे दर्ज करें') ||
    q.includes('शिकायत करने की प्रक्रिया')
  ) {
    return answerHowToFileComplaint(q, lang);
  }

  // 12. Gold Hallmarking, 6-digit HUID & Purity Compensation
  if (
    q.includes('huid') || q.includes('hallmark') || q.includes('gold purity') || q.includes('carat') ||
    q.includes('karat') || q.includes('22k') || q.includes('916') || q.includes('தங்கம்') ||
    q.includes('ஹால்மார்க்') || q.includes('காரட்') || q.includes('தூய்மை') || q.includes('சோனா') ||
    q.includes('हॉलमार्क') || q.includes('कैरेट')
  ) {
    return answerGoldHallmarkingDeep(q, lang);
  }

  // 13. Specific Product Standards (Water, Helmet, Cement, Concrete, Steel, Toys, Batteries)
  if (
    q.includes('water') || q.includes('10500') || q.includes('14543') || q.includes('helmet') || q.includes('4151') ||
    q.includes('cement') || q.includes('269') || q.includes('concrete') || q.includes('456') ||
    q.includes('steel') || q.includes('tmt') || q.includes('1786') || q.includes('toy') || q.includes('9873') ||
    q.includes('battery') || q.includes('16046') || q.includes('plug') || q.includes('socket') || q.includes('1293') ||
    q.includes('தண்ணீர்') || q.includes('குடிநீர்') || q.includes('ஹெல்மெட்') || q.includes('சிமெண்ட்') ||
    q.includes('கான்கிரீட்') || q.includes('பொம்மை') || q.includes('பேட்டரி') || q.includes('पानी') ||
    q.includes('हेलमेट') || q.includes('सीमेंट') || q.includes('खिलौने')
  ) {
    return answerProductStandardDeep(q, lang);
  }

  // Default intelligent BIS domain guidance
  return answerGeneralBISConsultation(q, lang);
}

// ── 1. OFFICES & CONTACTS ──
function answerOfficeAndContact(q, lang) {
  let locationKey = 'headquarters';
  if (q.includes('chennai') || q.includes('taramani') || q.includes('சென்னை') || q.includes('चेन्नई')) locationKey = 'chennai';
  else if (q.includes('coimbatore') || q.includes('கோவை') || q.includes('कोयंबटूर')) locationKey = 'coimbatore';
  else if (q.includes('madurai') || q.includes('மதுரை') || q.includes('मदुरै')) locationKey = 'madurai';
  else if (q.includes('mumbai') || q.includes('மும்பை') || q.includes('मुंबई')) locationKey = 'mumbai';
  else if (q.includes('kolkata') || q.includes('கொல்கத்தா') || q.includes('कोलकाता')) locationKey = 'kolkata';
  else if (q.includes('bangalore') || q.includes('பெங்களூர்') || q.includes('बैंगलोर')) locationKey = 'bangalore';

  const office = BIS_OFFICES[locationKey] || BIS_OFFICES.chennai;

  let text = '';
  if (lang === 'ta') {
    text = `🏢 **BIS அலுவலக முகவரி மற்றும் தொடர்பு விவரங்கள் (${office.name})**:\n\n• **அலுவலகம்**: ${office.name}\n• **முகவரி**: ${office.address}\n• **தொலைபேசி**: ${office.phone}\n• **மின்னஞ்சல்**: ${office.email}\n• **தேசிய நுகர்வோர் உதவி எண்**: **1800-11-0001** (கட்டணமில்லா சேவை)\n\n**அலுவலக வேலை நேரம்**: திங்கள் முதல் வெள்ளி வரை, காலை 9:00 மணி முதல் மாலை 5:30 மணி வரை. பொது மக்கள் உரிமம், பரிசோதனை மற்றும் புகார்களுக்கு நேரடியாக அணுகலாம்.`;
  } else if (lang === 'hi') {
    text = `🏢 **बीआईएस कार्यालय का पता एवं संपर्क विवरण (${office.name})**:\n\n• **कार्यालय**: ${office.name}\n• **पता**: ${office.address}\n• **फ़ोन**: ${office.phone}\n• **ईमेल**: ${office.email}\n• **राष्ट्रीय उपभोक्ता हेल्पलाइन**: **1800-11-0001** (टोल-फ्री)\n\n**कार्य समय**: सोमवार से शुक्रवार, सुबह 9:00 बजे से शाम 5:30 बजे तक।`;
  } else {
    text = `🏢 **Bureau of Indian Standards Office & Contact Details (${office.name})**:\n\n• **Office**: ${office.name}\n• **Address**: ${office.address}\n• **Telephone**: ${office.phone}\n• **Email**: ${office.email}\n• **National Toll-Free Helpline**: **1800-11-0001**\n\n**Working Hours**: Monday to Friday, 9:00 AM to 5:30 PM (Closed on Saturday & Sunday).`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'சென்னை மண்டல அலுவலகம்' : 'Chennai Regional Office',
      lang === 'ta' ? 'உதவி எண் 1800-11-0001' : 'National Helpline 1800-11-0001',
      lang === 'ta' ? 'புகார் பதிவு செய்' : 'File Consumer Grievance'
    ],
    actions: [
      { text: '📍 ' + (lang === 'ta' ? 'அலுவலகங்கள் அடைவு' : 'BIS Offices Directory'), url: 'hallmarking-centres.html' },
      { text: '📝 ' + (lang === 'ta' ? 'நுகர்வோர் புகார் தளம்' : 'Grievance Redressal'), url: 'grievance-redressal.html' }
    ]
  };
}

// ── 2. LICENCE VALIDITY & RENEWAL ──
function answerLicenceValidityAndRenewal(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `⏳ **ISI முத்திரை உரிமத்தின் செல்லுபடியாகும் காலம் மற்றும் புதுப்பித்தல் (Validity & Renewal)**:\n\n1. **ஆரம்ப செல்லுபடி காலம்**: புதிய ISI (CM/L) உரிமம் ஆரம்பத்தில் **1 அல்லது 2 ஆண்டுகளுக்கு** வழங்கப்படுகிறது.\n2. **புதுப்பித்தல் காலம்**: உரிய காலத்தில் விண்ணப்பித்தால், ஒரே நேரத்தில் **1 முதல் 5 ஆண்டுகள் வரை** உரிமத்தை புதுப்பித்துக் கொள்ளலாம்.\n3. **விண்ணப்பிக்கும் காலக்கெடு**: உரிமம் காலாவதியாவதற்கு **குறைந்தது 30 நாட்களுக்கு முன்** [Manakonline போர்ட்டலில்](https://www.manakonline.in) ஆன்லைன் மூலம் புதுப்பித்தல் விண்ணப்பம் (Form-II) சமர்ப்பிக்க வேண்டும்.\n4. **தேவையானவை**: உற்பத்தி அளவுகள், மார்க்கிங் கட்டண கணக்கு விவரங்கள் (Marking Fee Reconciliation) மற்றும் தணிக்கை இணக்க அறிக்கை.\n5. **தாமதக் கட்டணம்**: காலாவதி தேதிக்கு பின் விண்ணப்பித்தால் தாமதக் கட்டணம் (Late Fee) விதிக்கப்படும்.`;
  } else if (lang === 'hi') {
    text = `⏳ **आईएसआई मार्क लाइसेंस की वैधता एवं नवीनीकरण (Validity & Renewal)**:\n\n1. **प्रारंभिक वैधता**: नया आईएसआई (CM/L) लाइसेंस प्रारंभिक रूप से **1 या 2 वर्ष** के लिए जारी किया जाता है।\n2. **नवीनीकरण**: समय पर आवेदन करने पर लाइसेंस को एक बार में **1 से 5 वर्ष** तक के लिए नवीनीकृत किया जा सकता है।\n3. **आवेदन समय सीमा**: लाइसेंस समाप्त होने से **कम से कम 30 दिन पहले** [Manakonline](https://www.manakonline.in) पर फॉर्म-2 जमा करना अनिवार्य है।\n4. **आवश्यकताएँ**: उत्पादन मात्रा, मार्किंग शुल्क समाधान और नियमित कारखाना ऑडिट रिपोर्ट।`;
  } else {
    text = `⏳ **BIS Licence Validity & Renewal Regulations (Scheme-I)**:\n\n1. **Initial Grant Validity**: Newly granted ISI Mark (CM/L) licences are valid for **1 or 2 years** initially.\n2. **Renewal Period**: Licences can be renewed for **up to 5 years at a time**, provided manufacturing performance and fee payments are compliant.\n3. **Application Window**: Renewal applications (Form-II) must be filed on the [Manakonline Portal](https://www.manakonline.in) **at least 30 days prior** to the expiry date.\n4. **Prerequisites**: Submission of actual production figures, marking fee reconciliation, and a clean audit surveillance record.\n5. **Late Renewal**: Applications received after expiry incur statutory late fees and risk temporary operational suspension.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'உரிம கட்டண விவரங்கள்' : 'Licence Fee Structure',
      lang === 'ta' ? 'CM/L உரிமத்தை சரிபார்' : 'Verify CM/L Licence',
      lang === 'ta' ? 'உற்பத்தியாளர் விண்ணப்ப படிவம்' : 'Manufacturer Application'
    ],
    actions: [
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification Suite'), url: 'verify-licence.html' },
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'), url: 'standards-search.html' }
    ]
  };
}

// ── 3. DOCUMENT REQUIREMENTS ──
function answerDocumentRequirements(q, lang) {
  let targetProduct = 'உற்பத்தி தயாரிப்புகள்';
  if (q.includes('water') || q.includes('தண்ணீர்')) targetProduct = lang === 'ta' ? 'பாட்டிலடைக்கப்பட்ட குடிநீர் (IS 14543)' : 'Packaged Drinking Water (IS 14543)';
  else if (q.includes('helmet') || q.includes('ஹெல்மெட்')) targetProduct = lang === 'ta' ? 'இருசக்கர வாகன ஹெல்மெட் (IS 4151)' : 'Protective Helmets (IS 4151)';
  else if (q.includes('cement') || q.includes('சிமெண்ட்')) targetProduct = lang === 'ta' ? 'சிமெண்ட் (IS 269)' : 'Portland Cement (IS 269)';
  else if (q.includes('gold') || q.includes('தங்கம்')) targetProduct = lang === 'ta' ? 'தங்க நகை ஹால்மார்க்கிங் (IS 1417)' : 'Gold Jewellery Hallmarking (IS 1417)';

  let text = '';
  if (lang === 'ta') {
    text = `📋 **BIS ISI உரிமம் பெற தேவையான முக்கிய ஆவணங்கள் பட்டியல் (${targetProduct})**:\n\n1. **தொழிற்சாலை வளாக சான்று**: சொந்த இடத்திற்கான பத்திரம் அல்லது பதிவு செய்யப்பட்ட வாடகை/குத்தகை ஒப்பந்தம் (Factory Lease Deed/Rent Agreement).\n2. **வணிக பதிவு ஆவணங்கள்**: நிறுவன ஜிஎஸ்டி (GST Certificate) மற்றும் கூட்டு நிறுவன பத்திரம் / MOA & AOA.\n3. **இயந்திரங்கள் பட்டியல்**: தொழிற்சாலையில் உள்ள உற்பத்தி இயந்திரங்களின் பட்டியல் மற்றும் உற்பத்தி திறன் விவரம்.\n4. **உள்-ஆய்வக உபகரணங்கள் (In-House Lab)**: தரநிலைக்கு (IS Code) தேவையான சோதனை உபகரணங்களின் பட்டியல் மற்றும் அளவீட்டு சான்றிதழ்கள் (Calibration Certificates).\n5. **தொழிற்சாலை வரைபடம்**: ஆலை தளவமைப்பு திட்டம் (Factory Layout Plan) மற்றும் உற்பத்தி செயல்முறை விளக்க வரைபடம் (Process Flowchart).\n6. **தரக்கட்டுப்பாட்டு ஊழியர்கள்**: தகுதிவாய்ந்த சோதனை பொறியாளரின் கல்வி சான்றிதழ் மற்றும் அனுபவ கடிதம்.\n7. **MSME உத்யம் சான்றிதழ்**: 50% கட்டண சலுகை பெற (இருப்பின்).\n8. **அங்கீகரிக்கப்பட்ட சோதனை அறிக்கை**: எளிமைப்படுத்தப்பட்ட திட்டத்திற்கு (Simplified Scheme) NABL/BIS ஆய்வக சோதனை அறிக்கை.`;
  } else if (lang === 'hi') {
    text = `📋 **बीआईएस आईएसआई मार्क लाइसेंस हेतु आवश्यक दस्तावेजों की सूची**:\n\n1. **कारखाना परिसर प्रमाण**: लीज डीड, किराया समझौता या स्वामित्व दस्तावेज।\n2. **जीएसटी एवं व्यवसाय प्रमाण**: जीएसटी पंजीकरण प्रमाणपत्र एवं कंपनी रजिस्ट्रेशन।\n3. **मशीनरी सूची**: विनिर्माण मशीनों की सूची एवं संयंत्र क्षमता विवरण।\n4. **इन-हाउस परीक्षण लैब**: अनिवार्य परीक्षण उपकरणों की सूची एवं कैलिब्रेशन प्रमाणपत्र।\n5. **प्लांट लेआउट एवं फ्लोचार्ट**: कारखाना लेआउट योजना एवं प्रक्रिया प्रवाह चार्ट।\n6. **गुणवत्ता नियंत्रण कर्मी**: योग्य परीक्षण कर्मियों की डिग्री एवं नियुक्ति पत्र।\n7. **एमएसएमई उद्यम पंजीकरण**: 50% शुल्क छूट प्राप्त करने हेतु।`;
  } else {
    text = `📋 **Comprehensive Document Checklist for BIS Licence (Scheme-I ISI Mark)**:\n\n1. **Premises Ownership Proof**: Registered Lease Deed, Rent Agreement, or Property Tax Receipt.\n2. **Business Registrations**: Active GSTIN Certificate, Partnership Deed / Certificate of Incorporation (MoA & AoA).\n3. **Machinery & Plant Inventory**: Complete list of installed manufacturing machinery with rated capacity.\n4. **In-House Testing Laboratory Setup**: Comprehensive list of test equipment matching the Scheme of Testing and Inspection (STI) with valid calibration certificates.\n5. **Process Flow & Plant Layout**: Factory layout layout diagram highlighting manufacturing and testing zones, plus production flowchart.\n6. **Competent Quality Personnel**: Appointment letters and qualification degrees of qualified testing personnel.\n7. **Udyam MSME Certificate**: Required to claim 50% application fee and 20% marking fee concessions.\n8. **Independent Test Report**: Pre-testing report from an accredited BIS/NABL lab (for Simplified Procedure).`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'விண்ணப்ப கட்டண விவரம்' : 'Application Fees & Costs',
      lang === 'ta' ? 'உற்பத்தியாளர் விண்ணப்ப வழிமுறை' : 'Start Manufacturer Roadmap',
      lang === 'ta' ? 'MSME கட்டண சலுகை' : 'MSME 50% Concessions'
    ],
    actions: [
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'), url: 'standards-search.html' },
      { text: '🧪 ' + (lang === 'ta' ? 'லிம்ஸ் ஆய்வக அடைவு' : 'LIMS Lab Network'), url: 'lims-lab-directory.html' }
    ]
  };
}

// ── 4. LEGAL PENALTIES ──
function answerLegalPenalties(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `⚖️ **போலி அல்லது தரமற்ற ISI / ஹால்மார்க் பயன்பாட்டிற்கான சட்டப்பூர்வ தண்டனைகள் (BIS Act, 2016)**:\n\nஇந்திய தரநிலைகள் பணியக சட்டம் 2016 இன் கீழ், போலி அல்லது அங்கீகாரமற்ற முறையில் தர முத்திரைகளை பயன்படுத்துவது ஜாமீனில் வெளிவர முடியாத கடுமையான குற்றமாகும்:\n\n1. **பிரிவு 28 & 29 (போலி ISI பயன்பாடு)**:\n   - **சிறைத்தண்டனை**: 2 ஆண்டுகள் வரை கடுமையான சிறைத்தண்டனை.\n   - **அபராதம்**: குறைந்தபட்சம் **₹2,00,000**, அதிகபட்சம் **₹5,00,000 வரை அல்லது பறிமுதல் செய்யப்பட்ட சரக்கின் மதிப்பை விட 10 மடங்கு** அபராதம்.\n2. **சரக்குகள் பறிமுதல் (Search & Seizure)**: BIS அமலாக்க அதிகாரிகள் ஆலைகள் மற்றும் கடைகளில் திடீர் சோதனை நடத்தி போலிப் பொருட்களை நேரடியாக பறிமுதல் செய்வார்கள்.\n3. **தங்க நகை தூய்மை குறைவு (பிரிவு 14)**: ஹால்மார்க் செய்யப்பட்ட தங்கம் ஆய்வில் தூய்மை குறைவு என கண்டறியப்பட்டால், நுகர்வோருக்கு **தூய்மை பற்றாக்குறைக்கு 2 மடங்கு நிதி இழப்பீடு** மற்றும் ₹500 பரிசோதனை கட்டணத்தை நகைக்கடைக்காரர் சட்டப்படி வழங்க வேண்டும்.\n4. **இயக்குநர்கள் மீதான வழக்கு**: நிறுவனத்தின் பொறுப்பான நிர்வாகிகள் மற்றும் இயக்குநர்கள் மீது தனிப்பட்ட முறையில் குற்றவியல் வழக்கு பாயும்.`;
  } else if (lang === 'hi') {
    text = `⚖️ **बीआईएस अधिनियम 2016 के तहत गैर-मानक एवं नकली उत्पादों पर वैधानिक दंड**:\n\n1. **धारा 28 एवं 29 (नकली आईएसआई मार्क का दुरुपयोग)**:\n   - **कारावास**: 2 वर्ष तक का कठोर कारावास।\n   - **जुर्माना**: न्यूनतम **₹2,00,000**, जो बढ़कर **₹5,00,000 या जब्त किए गए सामान के मूल्य का 10 गुना** तक हो सकता है।\n2. **स्टॉक जब्ती**: बीआईएस अधिकारियों को बिना वारंट गोदामों और दुकानों पर छापेमारी कर गैर-मानक माल जब्त करने का अधिकार है।\n3. **स्वर्ण आभूषण शुद्धता (धारा 14)**: शुद्धता में कमी पाए जाने पर उपभोक्ता को **शुद्धता कमी का 2 गुना मुआवजा** एवं परख शुल्क वापसी देय है।`;
  } else {
    text = `⚖️ **Statutory Penalties for Counterfeiting & QCO Violations (BIS Act, 2016)**:\n\nUnder **Sections 28 & 29 of the BIS Act, 2016**, manufacturing, stocking, or selling products with counterfeit Standard Marks or violating Quality Control Orders carries severe penalties:\n\n1. **Imprisonment**: Up to **2 years imprisonment** for directors, proprietors, and authorized representatives.\n2. **Monetary Penalties**: A statutory fine of **at least ₹2,00,000**, which may extend up to **₹5,00,000 or 10 times the value** of goods manufactured or sold.\n3. **Seizure & Plant Closure**: Designated Enforcement Officers are empowered to conduct surprise search operations and seize counterfeit inventory on the spot.\n4. **Gold Hallmarking Default (Section 14)**: Consumers are legally entitled to **2x the value of the purity shortfall** plus refund of the ₹500 assaying fee.\n5. **Public Blacklisting**: Cancellation of CM/L licence and publication in national gazettes.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'நுகர்வோர் புகார் பதிவு செய்' : 'File Consumer Grievance',
      lang === 'ta' ? 'தங்க 2x இழப்பீட்டு கால்குலேட்டர்' : 'Gold 2x Calculator',
      lang === 'ta' ? 'CM/L உரிமத்தை சரிபார்' : 'Verify CM/L Licence'
    ],
    actions: [
      { text: '📝 ' + (lang === 'ta' ? 'புகார் பதிவு படிவம்' : 'Grievance Form'), url: 'grievance-redressal.html' },
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html' }
    ]
  };
}

// ── 5. FEES AND COSTS ──
function answerFeesAndCosts(q, lang) {
  let targetProduct = 'Scheme-I ISI Mark';
  let appFee = '₹1,000';
  let annualFee = '₹10,000';
  let markingFee = 'Unit rate as per gazette';
  let labTestFee = '₹15,000 - ₹25,000';

  if (q.includes('water') || q.includes('தண்ணீர்') || q.includes('குடிநீர்')) {
    targetProduct = lang === 'ta' ? 'பாட்டிலடைக்கப்பட்ட குடிநீர் (IS 14543)' : 'Packaged Water (IS 14543)';
    markingFee = '₹35 per 10,000 Litres (Min: ₹85,000/yr)';
    labTestFee = '₹18,000 - ₹24,000 per sample';
  } else if (q.includes('helmet') || q.includes('ஹெல்மெட்')) {
    targetProduct = lang === 'ta' ? 'இருசக்கர வாகன ஹெல்மெட் (IS 4151)' : 'Two-Wheeler Helmets (IS 4151)';
    markingFee = '₹7.50 per unit (Min: ₹65,000/yr)';
    labTestFee = '₹12,000 - ₹18,000';
  } else if (q.includes('cement') || q.includes('சிமெண்ட்')) {
    targetProduct = lang === 'ta' ? 'போர்ட்லேண்ட் சிமெண்ட் (IS 269)' : 'Portland Cement (IS 269)';
    markingFee = '₹1.50 per Metric Tonne';
    labTestFee = '₹15,000 - ₹22,000';
  } else if (q.includes('gold') || q.includes('தங்கம்')) {
    targetProduct = lang === 'ta' ? 'தங்க நகை ஹால்மார்க்கிங் (IS 1417)' : 'Gold Hallmarking (IS 1417)';
    appFee = '₹0 for small jewellers';
    markingFee = '₹45 + GST per gold article (₹35 for silver)';
    labTestFee = 'Touchstone/XRF Assay: ₹500';
  }

  let text = '';
  if (lang === 'ta') {
    text = `💰 **BIS உரிமம் மற்றும் ஆய்வு கட்டண விவரங்கள் (${targetProduct})**:\n\n1. **விண்ணப்பக் கட்டணம் (Application Fee)**: **${appFee}** (MSME உத்யம் சான்றிதழ் உள்ளவர்களுக்கு 50% சலுகை: ₹500).\n2. **ஆண்டு உரிமக் கட்டணம் (Annual License Fee)**: **${annualFee}**.\n3. **தொழிற்சாலை ஆய்வு கட்டணம் (Audit Fee)**: ஒரு தொழில்நுட்ப அதிகாரிக்கு ஒரு நாளுக்கு ₹7,000 + பயணச் செலவுகள்.\n4. **முத்திரை கட்டணம் (Marking Fee)**: **${markingFee}**.\n5. **ஆய்வக மாதிரி சோதனை கட்டணம் (Lab Testing Fee)**: **${labTestFee}** (பொருளின் தன்மையைப் பொறுத்து மாறுபடும்).\n6. **MSME சலுகை**: சிறு மற்றும் குறுந்தொழில் முனைவோர் மற்றும் மகளிர் தொழில் நிறுவனங்களுக்கு விண்ணப்ப கட்டணத்தில் **50% சலுகையும்**, குறைந்தபட்ச மார்க்கிங் கட்டணத்தில் **20% சலுகையும்** வழங்கப்படுகிறது.`;
  } else if (lang === 'hi') {
    text = `💰 **बीआईएस लाइसेंस एवं परीक्षण शुल्क संरचना (${targetProduct})**:\n\n1. **आवेदन शुल्क**: **${appFee}** (सूक्ष्म उद्यमों हेतु 50% छूट: ₹500)।\n2. **वार्षिक लाइसेंस शुल्क**: **${annualFee}**।\n3. **निरीक्षण शुल्क**: ₹7,000 प्रति मानव-दिवस।\n4. **मार्किंग शुल्क**: **${markingFee}**।\n5. **लैब परीक्षण शुल्क**: **${labTestFee}**।\n6. **एमएसएमई लाभ**: आवेदन शुल्क पर **50% छूट** और वार्षिक न्यूनतम मार्किंग शुल्क पर **20% छूट**।`;
  } else {
    text = `💰 **Official BIS Fee Structure Breakdown (${targetProduct})**:\n\n1. **Application Fee**: **${appFee}** (50% concession for Micro & Women Enterprises = ₹500).\n2. **Annual Licence Fee**: **${annualFee}** per operative year.\n3. **Factory Audit & Inspection Fee**: ₹7,000 per officer per man-day plus TA/DA.\n4. **Marking Fee (Royalty)**: **${markingFee}**.\n5. **Independent Laboratory Testing**: **${labTestFee}** depending on standard clauses.\n6. **MSME & Women Entrepreneur Concessions**: 50% reduction on application fee and 20% discount on minimum marking fee with valid Udyam certificate.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'MSME 50% கட்டண சலுகை' : 'MSME Fee Concession',
      lang === 'ta' ? 'ஆய்வக சோதனை கட்டண விவரம்' : 'Lab Testing Directory',
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'
    ],
    actions: [
      { text: '🧪 ' + (lang === 'ta' ? 'லிம்ஸ் கட்டண மதிப்பீடு' : 'LIMS Fee Estimator'), url: 'lims-lab-directory.html' },
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Search'), url: 'standards-search.html' }
    ]
  };
}

// ── 6. MSME CONCESSIONS ──
function answerMSMEConcessions(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `🌟 **சிறு, குறு மற்றும் நடுத்தர தொழில் நிறுவனங்களுக்கான (MSME) BIS கட்டண சலுகைகள்**:\n\nஇந்திய அரசு மற்றும் BIS, உள்நாட்டு உற்பத்தியை ஊக்குவிக்க **உத்யம் பதிவு (Udyam Registration)** கொண்ட நிறுவனங்களுக்கு சிறப்பு சலுகைகளை வழங்குகிறது:\n\n1. **விண்ணப்ப கட்டணத்தில் 50% சலுகை**: புதிய உரிம விண்ணப்ப கட்டணம் ₹1,000 லிருந்து **₹500 ஆக குறைக்கப்படுகிறது**.\n2. **மார்க்கிங் கட்டணத்தில் 20% தள்ளுபடி**: ஆண்டு குறைந்தபட்ச முத்திரை கட்டணத்தில் (Minimum Marking Fee) **20% நேரடி தள்ளுபடி** வழங்கப்படுகிறது.\n3. **மகளிர் தொழில்முனைவோர் (Women Entrepreneurs)**: 100% பெண்கள் நிர்வகிக்கும் நிறுவனங்களுக்கு சிறப்பு முன்னுரிமை தணிக்கை மற்றும் கட்டண சலுகைகள் உண்டு.\n4. **DPIIT ஸ்டார்ட்அப் நிறுவனங்கள்**: ஸ்டார்ட்அப் இந்தியா திட்டத்தின் கீழ் அங்கீகரிக்கப்பட்ட ஸ்டார்ட்அப் நிறுவனங்களுக்கு விரைவான பரிசீலனை (Fast-Track Processing) வழங்கப்படுகிறது.\n\n**விண்ணப்பிக்கும் முறை**: [Manakonline போர்ட்டலில்](https://www.manakonline.in) விண்ணப்பிக்கும் போது செல்லுபடியாகும் உத்யம் சான்றிதழை இணைத்தால் சலுகை தானாக கணக்கிடப்படும்.`;
  } else if (lang === 'hi') {
    text = `🌟 **एमएसएमई एवं महिला उद्यमियों हेतु बीआईएस शुल्क छूट योजना**:\n\n1. **आवेदन शुल्क में 50% छूट**: ₹1,000 का शुल्क घटकर मात्र **₹500** हो जाता है।\n2. **मार्किंग शुल्क में 20% की छूट**: वार्षिक न्यूनतम मार्किंग शुल्क पर **20% सीधी छूट** मिलती है।\n3. **महिला उद्यमी एवं स्टार्टअप**: प्राथमिकता के आधार पर ऑडिट स्लॉट आवंटन एवं तेज प्रक्रिया।\n4. **आवश्यकता**: वैध **उद्यम पंजीकरण प्रमाणपत्र (Udyam Registration)** होना अनिवार्य है।`;
  } else {
    text = `🌟 **BIS Fee Concessions for MSMEs & Women Entrepreneurs**:\n\nTo foster quality manufacturing under the *Make in India* mission, BIS extends significant fee reductions to entities holding a valid **Udyam Registration Certificate**:\n\n1. **50% Application Fee Concession**: Application fee is reduced from ₹1,000 down to **₹500** for Micro Enterprises.\n2. **20% Marking Fee Reduction**: A direct **20% discount** on the statutory minimum marking fee payable annually under Scheme-I.\n3. **Women-Led Enterprises**: Special priority processing and dedicated guidance desks for 100% women-owned micro-units.\n4. **DPIIT Recognized Startups**: Fast-track technical evaluation and priority lab testing slot scheduling.\n\n**How to Claim**: Simply upload your Udyam Certificate during online Form-I submission on [Manakonline Portal](https://www.manakonline.in).`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'விண்ணப்ப ஆவணங்கள் பட்டியல்' : 'Document Checklist',
      lang === 'ta' ? 'உரிம கட்டண விவரம்' : 'Licence Fee Structure',
      lang === 'ta' ? 'உற்பத்தியாளர் வழிமுறை' : 'Manufacturer Roadmap'
    ],
    actions: [
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'), url: 'standards-search.html' },
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html' }
    ]
  };
}

// ── 7. MANDATORY QCO STATUS ──
function answerMandatoryQCOStatus(q, lang) {
  let product = 'பொருட்கள்';
  let isCode = 'IS தரநிலை';
  let status = 'கட்டாயமானது (Mandatory)';

  if (q.includes('helmet') || q.includes('ஹெல்மெட்')) {
    product = lang === 'ta' ? 'இருசக்கர வாகன ஹெல்மெட்' : 'Two-Wheeler Helmets';
    isCode = 'IS 4151:2020';
  } else if (q.includes('water') || q.includes('தண்ணீர்') || q.includes('குடிநீர்')) {
    product = lang === 'ta' ? 'பாட்டிலடைக்கப்பட்ட குடிநீர்' : 'Packaged Drinking Water';
    isCode = 'IS 14543 / IS 10500';
  } else if (q.includes('gold') || q.includes('தங்கம்')) {
    product = lang === 'ta' ? 'தங்க நகைகள்' : 'Gold Jewellery';
    isCode = 'IS 1417 (HUID)';
  } else if (q.includes('toy') || q.includes('பொம்மை')) {
    product = lang === 'ta' ? 'குழந்தைகள் பொம்மைகள்' : 'Children Toys';
    isCode = 'IS 9873 / IS 15644';
  } else if (q.includes('cement') || q.includes('சிமெண்ட்')) {
    product = lang === 'ta' ? 'போர்ட்லேண்ட் சிமெண்ட்' : 'Portland Cement';
    isCode = 'IS 269 / IS 1489';
  }

  let text = '';
  if (lang === 'ta') {
    text = `🚨 **${product} தயாரிப்பிற்கு BIS சான்றிதழ் கட்டாயமா? (Mandatory QCO Status)**:\n\n**ஆம், சட்டப்பூர்வமாக 100% கட்டாயமாகும்!**\n\n• **பொருந்தும் தரநிலை**: **${isCode}**\n• **தரக்கட்டுப்பாட்டு ஆணை (QCO)**: மத்திய அரசின் வர்த்தக அமைச்சகம் மற்றும் நுகர்வோர் விவகாரங்கள் அமைச்சகத்தின் தரக்கட்டுப்பாட்டு உத்தரவின்படி, இந்த தயாரிப்பை செல்லுபடியாகும் BIS உரிமம் இல்லாமல் இந்தியாவில் தயாரிப்பதோ, இறக்குமதி செய்வதோ அல்லது விற்பனை செய்வதோ சட்டப்படி குற்றமாகும்.\n• **மீறினால் நடவடிக்கை**: BIS சட்டம் 2016 (பிரிவு 29) இன் கீழ் உரிமமில்லாத விற்பனைக்கு **2 ஆண்டுகள் வரை சிறைத்தண்டனை மற்றும் ₹2 லட்சம் முதல் சரக்கு மதிப்பை விட 10 மடங்கு வரை அபராதம்** விதிக்கப்படும்.`;
  } else if (lang === 'hi') {
    text = `🚨 **क्या ${product} के लिए बीआईएस प्रमाणन अनिवार्य है? (Mandatory QCO)**:\n\n**हाँ, यह कानूनी रूप से 100% अनिवार्य है!**\n\n• **लागू मानक**: **${isCode}**\n• **गुणवत्ता नियंत्रण आदेश (QCO)**: बिना वैध आईएसआई मार्क या बीआईएस लाइसेंस के इसका निर्माण, आयात या बिक्री करना बीआईएस अधिनियम 2016 के तहत दंडनीय अपराध है।\n• **दंड**: उल्लंघन करने पर **2 वर्ष तक का कारावास एवं न्यूनतम ₹2,00,000 जुर्माना**।`;
  } else {
    text = `🚨 **Is BIS Certification Mandatory for ${product}? (Mandatory QCO Status)**:\n\n**YES, it is 100% MANDATORY by Law!**\n\n• **Applicable Standard**: **${isCode}**\n• **Quality Control Order (QCO)**: Under mandatory QCO notifications issued by the Government of India, no person or entity shall manufacture, import, distribute, or sell this product without bearing a valid BIS Standard Mark.\n• **Penalties for Violation**: Non-compliance is punishable under **Section 29 of the BIS Act, 2016** with up to **2 years imprisonment** and fines starting at **₹2,00,000 up to 10 times the value** of goods produced/sold, plus immediate seizure of inventory.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'சட்டப்பூர்வ தண்டனைகள்' : 'Penalties & Legal Actions',
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents',
      lang === 'ta' ? 'உரிமத்தை சரிபார்க்கவும்' : 'Verify a Licence'
    ],
    actions: [
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'), url: 'standards-search.html' },
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html' }
    ]
  };
}

// ── 8. FOREIGN MANUFACTURERS (FMCS) ──
function answerFMCSForeignCertification(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `🌐 **வெளிநாட்டு உற்பத்தியாளர்களுக்கான BIS சான்றிதழ் திட்டம் (FMCS - Scheme IV)**:\n\nஇந்தியாவுக்கு வெளியே அமைந்துள்ள உற்பத்தி ஆலைகள் ISI முத்திரை உரிமம் பெற பின்வரும் நடைமுறைகளை பின்பற்ற வேண்டும்:\n\n1. **அங்கீகரிக்கப்பட்ட இந்திய பிரதிநிதி (AIR)**: வெளிநாட்டு நிறுவனம் இந்தியாவில் வசிக்கும் ஒரு இந்திய குடிமகனையோ அல்லது பதிவு செய்யப்பட்ட நிறுவனத்தையோ AIR ஆக நியமிக்க வேண்டும்.\n2. **விண்ணப்பம்**: Manakonline FMCS போர்டலில் ஆலை வரைபடம், இயந்திரங்கள் மற்றும் இந்திய சோதனை வழிகாட்டி படிவங்களை சமர்ப்பிக்க வேண்டும்.\n3. **BIS அதிகாரி நேரடி ஆய்வு**: BIS தொழில்நுட்ப அதிகாரிகள் வெளிநாட்டு ஆலைக்கு நேரில் சென்று தொழிற்சாலை தணிக்கை செய்து மாதிரிகளை எடுப்பார்கள் (விமான மற்றும் தங்குமிட செலவுகள் விண்ணப்பதாரரால் ஏற்கப்பட வேண்டும்).\n4. **இந்தியாவில் மாதிரி பரிசோதனை**: எடுக்கப்பட்ட மாதிரிகள் இந்தியாவில் உள்ள BIS/NABL ஆய்வகத்தில் பரிசோதிக்கப்படும்.\n5. **உரிம எண்**: வெற்றிகரமான தணிக்கைக்குப் பிறகு **CM/L-4XXXXXXX** என தொடங்கும் 10-இலக்க FMCS உரிமம் வழங்கப்படும்.`;
  } else if (lang === 'hi') {
    text = `🌐 **विदेशी निर्माताओं के लिए बीआईएस प्रमाणन योजना (FMCS - Scheme IV)**:\n\n1. **अधिकृत भारतीय प्रतिनिधि (AIR)**: भारत में स्थित एक अधिकृत प्रतिनिधि नियुक्त करना अनिवार्य है।\n2. **विदेशी संयंत्र ऑडिट**: बीआईएस तकनीकी अधिकारी द्वारा विदेशी कारखाने का ऑन-साइट भौतिक निरीक्षण।\n3. **भारत में लैब परीक्षण**: स्वतंत्र नमूने भारत की मान्यता प्राप्त प्रयोगशालाओं में जांचे जाते हैं।\n4. **लाइसेंस संख्या**: अनुमोदन पर **CM/L-4XXXXXXX** लाइसेंस प्रदान किया जाता है।`;
  } else {
    text = `🌐 **Foreign Manufacturers Certification Scheme (FMCS — Scheme IV)**:\n\nManufacturing units located outside India wishing to export products under mandatory QCOs to India must obtain a BIS Licence:\n\n1. **Authorized Indian Representative (AIR)**: The foreign manufacturer must nominate an Indian resident or registered Indian entity as their AIR to act as a legal guarantor.\n2. **Digital Application**: File on the Manakonline FMCS portal with factory layout, test apparatus calibration, and process flowcharts.\n3. **Physical Factory Inspection Abroad**: BIS Technical Officers conduct an on-site audit of the overseas plant and draw verification samples.\n4. **Testing in India**: Seized samples are dispatched under customs bond to BIS/NABL accredited laboratories in India.\n5. **Grant of Licence**: On compliance, a 10-digit **CM/L-4XXXXXXX** licence is granted, publicly verifiable on our portal.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents',
      lang === 'ta' ? 'FMCS உரிமத்தை சரிபார்' : 'Verify FMCS Licence',
      lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'
    ],
    actions: [
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html?type=fmcs' },
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அடைவு' : 'Standards Catalog'), url: 'standards-search.html' }
    ]
  };
}

// ── 9. HOW TO VERIFY ──
function answerHowToVerify(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `🔍 **உரிமம் அல்லது தயாரிப்பு உண்மைத்தன்மையை சரிபார்க்கும் எளிய 3 வழிகள் (How to Verify)**:\n\n1. **10-இலக்க ISI உரிமம் (CM/L)**:\n   - தயாரிப்பு லேபிளில் உள்ள ISI முத்திரைக்கு கீழே உள்ள **CM/L-XXXXXXXXXX** (10 இலக்கங்கள்) எண்ணை குறித்துக் கொள்ளுங்கள்.\n   - எங்கள் [மின்-சரிபார்ப்பு தளத்தில்](verify-licence.html) அல்லது **BIS CARE மொபைல் செயலியில்** அந்த எண்ணை உள்ளிட்டு சரிபார்க்கவும்.\n   - தயாரிப்பு பெயர், பிராண்ட், உற்பத்தியாளர் பெயர், மற்றும் உரிமத்தின் நிலை **'செயலில் உள்ளது' (OPERATIVE)** என இருப்பதை உறுதி செய்யவும்.\n\n2. **தங்க நகை 6-இலக்க HUID குறியீடு**:\n   - தங்க நகையில் லேசரால் பொறிக்கப்பட்ட 6-இலக்க எண்ணெழுத்து குறியீட்டை (எ.கா. \`AB1234\`) குறித்துக் கொள்ளுங்கள்.\n   - BIS CARE செயலியில் **'Verify HUID'** பகுதியில் உள்ளிட்டால், நகை வகை, எடை, ஹால்மார்க் செய்யப்பட்ட தேதி மற்றும் மையம் திரையில் தோன்றும்.\n\n3. **மின்னணு சாதனங்கள் (CRS R-எண்)**:\n   - லேப்டாப், பேட்டரி, அடாப்டர்களில் உள்ள 8-இலக்க **R-XXXXXXXX** எண்ணை சரிபார்க்கலாம்.`;
  } else if (lang === 'hi') {
    text = `🔍 **बीआईएस लाइसेंस एवं प्रमाणिकता जांचने की विधि (How to Verify)**:\n\n1. **आईएसआई लाइसेंस (CM/L)**: उत्पाद पर आईएसआई मार्क के नीचे 10-अंकीय **CM/L-XXXXXXXXXX** नंबर देखें और [ई-सत्यापन](verify-licence.html) पोर्टल पर जांचें।\n2. **स्वर्ण हॉलमार्क (HUID)**: आभूषण पर 6-अंकीय अल्फ़ान्यूमेरिक **HUID** कोड देखें और BIS CARE ऐप में दर्ज कर शुद्धता सत्यापित करें।\n3. **इलेक्ट्रॉनिक्स (CRS)**: 8-अंकीय **R-संख्या** को पोर्टल पर सत्यापित करें।`;
  } else {
    text = `🔍 **Step-by-Step Licence & Authenticity Verification Guide**:\n\n1. **ISI Mark Certification (CM/L)**:\n   - Locate the 10-digit **CM/L-XXXXXXXXXX** licence number printed immediately below the ISI triangle logo.\n   - Open our [e-Verification Suite](verify-licence.html) or the **BIS CARE App** and enter the 10 digits.\n   - Verify that the licensee name, brand name, factory address, and status show as **'OPERATIVE'**.\n\n2. **Gold Jewellery 6-Digit HUID**:\n   - Inspect the 3 mandatory hallmarks (BIS Logo, Purity e.g. 22K916, and 6-digit laser-engraved HUID e.g. \`AB1234\`).\n   - In the BIS CARE App, navigate to **'Verify HUID'** to see the jeweller name, article type, and hallmarking date.\n\n3. **Electronics CRS Registrations**:\n   - Locate the 8-digit **R-XXXXXXXX** registration code and verify it in the CRS directory.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'இப்போதே CM/L சரிபார்க்கவும்' : 'Verify CM/L Now',
      lang === 'ta' ? 'HUID குறியீட்டை சரிபார்க்கவும்' : 'Verify HUID Now',
      lang === 'ta' ? 'போலி பொருள் புகார் பதிவு' : 'Report Fake Mark'
    ],
    actions: [
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு தளம்' : 'e-Verification Portal'), url: 'verify-licence.html' },
      { text: '📝 ' + (lang === 'ta' ? 'நுகர்வோர் குறைதீர்ப்பு' : 'Grievance Portal'), url: 'grievance-redressal.html' }
    ]
  };
}

// ── 10. LAB TESTING & LIMS ──
function answerLabTestingDetails(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `🧪 **BIS லிம்ஸ் ஆய்வக சோதனை மற்றும் மாதிரி வழிகாட்டுதல் (LIMS Labs & TAT)**:\n\n1. **ஆய்வக நெட்வொர்க்**: மத்திய ஆய்வகம் (சாஹிபாபாத்), தெற்கு மண்டல ஆய்வகம் (சென்னை, தரமணி), மேற்கு (மும்பை), கிழக்கு (கொல்கத்தா), வடக்கு (சண்டிகர்) மற்றும் 300+ NABL அங்கீகாரம் பெற்ற ஆய்வகங்கள்.\n2. **சோதனை கால அளவு (Turnaround Time)**:\n   - **குடிநீர் (IS 10500 / IS 14543)**: நுண்ணுயிரியல் மற்றும் பூச்சிக்கொல்லி எச்ச பரிசோதனைக்கு **3 முதல் 4 வாரங்கள்**.\n   - **சிமெண்ட் (IS 269)**: 28 நாட்கள் அழுத்த வலிமை (Compressive Strength) சோதனைக்கு **30 முதல் 35 நாட்கள்**.\n   - **ஹெல்மெட் (IS 4151)**: தாக்க உறிஞ்சுதல் மற்றும் தக்கவைப்பு சோதனைக்கு **2 வாரங்கள்**.\n3. **மாதிரி அனுப்பும் முறை**: மாதிரிகள் உற்பத்தியாளர் முன்னிலையில் சீலிடப்பட்டு LIMS போர்டல் டிராக்கிங் பார்கோடுடன் ஆய்வகத்திற்கு அனுப்பப்படும்.`;
  } else if (lang === 'hi') {
    text = `🧪 **बीआईएस लिम्स प्रयोगशाला परीक्षण एवं समय सीमा (LIMS Labs & TAT)**:\n\n1. **क्षेत्रीय प्रयोगशालाएं**: केंद्रीय लैब (साहिबाबाद), दक्षिणी लैब (चेन्नई), पश्चिमी (मुंबई), पूर्वी (कोलकाता) और 300+ मान्यता प्राप्त एनएबीएल प्रयोगशालाएं।\n2. **परीक्षण समय सीमा**:\n   - पेयजल: **3 से 4 सप्ताह**।\n   - सीमेंट (28-दिवसीय शक्ति): **30 से 35 दिन**।\n   - हेलमेट: **2 सप्ताह**।\n3. **प्रक्रिया**: लिम्स पोर्टल पर ऑनलाइन ट्रैकिंग बारकोड के साथ सैंपल जमा होते हैं।`;
  } else {
    text = `🧪 **BIS Laboratory Testing Protocol & Turnaround Times (LIMS Network)**:\n\n1. **Apex Laboratories**: Central Laboratory (CL Sahibabad), Southern Regional Laboratory (SRL Chennai, Taramani), Western (Mumbai), Eastern (Kolkata), Northern (Chandigarh), supplemented by 300+ NABL accredited partner labs.\n2. **Estimated Turnaround Times (TAT)**:\n   - **Drinking Water (IS 10500/14543)**: ~**3 to 4 weeks** (due to 7-day microbiological culturing and GC-MS/MS pesticide scans).\n   - **Portland Cement (IS 269)**: ~**30 to 35 days** (requires standard 28-day compressive strength cure).\n   - **Helmets (IS 4151)**: ~**2 weeks** for mechanical drop impact and retention rig tests.\n3. **Sample Custody**: Samples are counter-sealed by BIS Technical Officers and tracked digitally end-to-end via LIMS Barcodes.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'ஆய்வக கட்டண மதிப்பீடு' : 'Estimate Lab Fees',
      lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Search',
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'
    ],
    actions: [
      { text: '🧪 ' + (lang === 'ta' ? 'லிம்ஸ் அடைவு' : 'LIMS Lab Directory'), url: 'lims-lab-directory.html' },
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள்' : 'Standards Catalog'), url: 'standards-search.html' }
    ]
  };
}

// ── 11. HOW TO FILE COMPLAINT ──
function answerHowToFileComplaint(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `📝 **போலி அல்லது தரமற்ற பொருட்கள் குறித்து BIS இல் புகார் செய்வது எப்படி? (4 எளிய படிகள்)**:\n\n1. **படி 1: ஆதாரங்களை திரட்டுங்கள்**:\n   - வாங்கிய ரசீது / பில் (Invoice/Cash Memo).\n   - தயாரிப்பு, பேக்கேஜிங் மற்றும் போலி ISI/HUID முத்திரையின் தெளிவான புகைப்படங்கள்.\n   - விற்பனையாளர் மற்றும் கடையின் பெயர் மற்றும் முகவரி.\n2. **படி 2: புகார் பதிவு செய்தல்**:\n   - எங்கள் [நுகர்வோர் குறைதீர்ப்பு தளத்தில்](grievance-redressal.html) அல்லது **BIS CARE மொபைல் செயலியில்** 'Complaints' பகுதியை திறக்கவும்.\n   - விவரங்களை பூர்த்தி செய்து ஆதாரங்களை பதிவேற்றவும்.\n3. **படி 3: டிராக்கிங் டோக்கன் பெறல்**:\n   - விண்ணப்பித்தவுடன் 16-இலக்க கண்காணிப்பு டோக்கன் எண் (எ.கா. \`BIS-GR-2026-1048\`) வழங்கப்படும்.\n4. **படி 4: அமலாக்கத்துறை சோதனை**:\n   - BIS தொழில்நுட்ப மற்றும் அமலாக்க அதிகாரிகள் சம்பந்தப்பட்ட கடை அல்லது தொழிற்சாலையில் திடீர் சோதனை நடத்தி போலிப் பொருட்களை பறிமுதல் செய்து சட்ட நடவடிக்கை எடுப்பார்கள்.`;
  } else if (lang === 'hi') {
    text = `📝 **घटिया या नकली उत्पादों की बीआईएस में शिकायत कैसे दर्ज करें? (4 चरण)**:\n\n1. **सबूत जुटाएं**: खरीद का पक्का बिल, उत्पाद एवं नकली मुहर की तस्वीरें।\n2. **पोर्टल पर जाएं**: [उपभोक्ता शिकायत पोर्टल](grievance-redressal.html) या BIS CARE ऐप खोलें।\n3. **फॉर्म भरें**: विवरण दर्ज करें और तत्काल 16-अंकीय ट्रैकिंग टोकन प्राप्त करें।\n4. **कार्रवाई**: बीआईएस अधिकारी छापेमारी कर दोषी विक्रेता के खिलाफ कानूनी कार्रवाई करते हैं।`;
  } else {
    text = `📝 **Step-by-Step Consumer Grievance Registration Procedure**:\n\n1. **Step 1: Gather Evidence**:\n   - Keep tax invoice/purchase receipt and clear photographs of the substandard product and counterfeit mark.\n   - Note seller name, shop address, and brand.\n2. **Step 2: Submit Complaint**:\n   - Open our [Consumer Grievance Portal](grievance-redressal.html) or the **BIS CARE App** ('Complaints' section).\n   - Complete the 4-step wizard with complainant and seller details.\n3. **Step 3: Instant Docket ID**:\n   - Receive a unique 16-character tracking identifier (e.g. \`BIS-GR-2026-1048\`).\n4. **Step 4: Enforcement & Raid**:\n   - BIS Enforcement Officers execute surprise market raids, seize non-compliant inventory under Section 28/29, and pursue criminal prosecution.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'இப்போதே புகார் பதிவு செய்ய' : 'File Grievance Now',
      lang === 'ta' ? 'தங்க தூய்மை இழப்பீடு' : 'Gold 2x Compensation',
      lang === 'ta' ? 'உரிமத்தை சரிபார்க்கவும்' : 'Verify CM/L Licence'
    ],
    actions: [
      { text: '📝 ' + (lang === 'ta' ? 'புகார் பதிவு படிவம்' : 'Grievance Form'), url: 'grievance-redressal.html' },
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html' }
    ]
  };
}

// ── 12. GOLD HALLMARKING DEEP ──
function answerGoldHallmarkingDeep(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `💍 **தங்க நகை ஹால்மார்க்கிங் மற்றும் 6-இலக்க HUID விதிகள் (IS 1417)**:\n\n1. **கட்டாய 3 முத்திரைகள்**:\n   - **BIS முக்கோண லோகோ** (Standard Mark).\n   - **தூய்மை தரம்**: 24K (995), 22K (916), 18K (750), அல்லது 14K (585).\n   - **6-இலக்க HUID குறியீடு**: ஒவ்வொரு நகைக்கும் தனித்தனியாக லேசரால் பொறிக்கப்படும் தனித்துவ குறியீடு.\n2. **ஹால்மார்க்கிங் கட்டணம்**: ஒரு தங்க நகைக்கு **₹45 + GST** (வெள்ளி நகைக்கு ₹35 + GST).\n3. **சட்டப்பூர்வ 2x இழப்பீடு (பிரிவு 14)**:\n   - நுகர்வோர் வாங்கிய நகையில் தூய்மை குறைவு ஏற்பட்டால், அங்கீகரிக்கப்பட்ட ஹால்மார்க்கிங் மையத்தில் சோதித்து **தூய்மை பற்றாக்குறைக்கு 2 மடங்கு நிதி இழப்பீடு** மற்றும் ₹500 பரிசோதனை கட்டணத்தை திரும்பப் பெறலாம்.\n4. **HUID சரிபார்ப்பு**: BIS CARE செயலியில் 6-இலக்க குறியீட்டை உள்ளிட்டு உண்மைத்தன்மையை உடனடியாக சரிபார்க்கலாம்.`;
  } else if (lang === 'hi') {
    text = `💍 **स्वर्ण हॉलमार्किंग एवं 6-अंकीय HUID के अनिवार्य नियम (IS 1417)**:\n\n1. **3 अनिवार्य मुहरें**: बीआईएस लोगो, शुद्धता ग्रेड (24K, 22K916, 18K750, 14K) और 6-अंकीय अद्वितीय **HUID**।\n2. **हॉलमार्किंग शुल्क**: मात्र **₹45 + GST प्रति वस्तु**।\n3. **2x कानूनी मुआवजा**: शुद्धता में कमी मिलने पर **शुद्धता अंतर का 2 गुना मुआवजा** और ₹500 परख शुल्क वापसी।\n4. **सत्यापन**: BIS CARE ऐप पर 6-अंकीय कोड डालकर तुरंत जांचें।`;
  } else {
    text = `💍 **Mandatory Gold Hallmarking & 6-Digit HUID Regulatory Blueprint (IS 1417:2016)**:\n\n1. **The 3 Mandatory Hallmark Symbols**:\n   - **BIS Triangular Standard Logo**.\n   - **Purity & Fineness**: Stamped as **24K (995)**, **22K (916)**, **18K (750)**, or **14K (585)**.\n   - **6-Digit Alphanumeric HUID**: Laser-engraved unique traceable serial code generated via Manakonline.\n2. **Statutory Assaying Charges**: Fixed at **₹45 + GST per gold article** (₹35 + GST for silver).\n3. **Statutory 2x Compensation (Section 14 BIS Act 2016)**:\n   - If tested gold falls short of the hallmarked purity grade, the consumer is legally entitled to **2x the value shortfall** plus full refund of the ₹500 testing fee.\n4. **Verification**: Enter the 6-character HUID on our [e-Verification Suite](verify-licence.html?type=huid) or the official BIS CARE App.`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'தங்க 2x இழப்பீட்டு கால்குலேட்டர்' : 'Gold 2x Calculator',
      lang === 'ta' ? 'HUID குறியீட்டை சரிபார்' : 'Verify 6-digit HUID',
      lang === 'ta' ? 'ஹால்மார்க்கிங் மையங்கள் எங்குள்ளது?' : 'Find Hallmarking Centres'
    ],
    actions: [
      { text: '⚖️ ' + (lang === 'ta' ? 'தங்க இழப்பீட்டு கால்குலேட்டர்' : 'Gold Calculator'), url: 'grievance-redressal.html#gold-calc-section' },
      { text: '📍 ' + (lang === 'ta' ? 'ஹால்மார்க்கிங் மையங்கள்' : 'AHC Centres'), url: 'hallmarking-centres.html' }
    ]
  };
}

// ── 13. SPECIFIC PRODUCT DEEP DIVE ──
function answerProductStandardDeep(q, lang) {
  let isCode = 'IS 10500';
  let name = 'Drinking Water';
  let nameTa = 'குடிநீர்';
  let details = 'Physical, chemical, heavy metals, and coliform tests.';
  let detailsTa = 'இயற்பியல், ரசாயன, கன உலோகங்கள் மற்றும் நுண்ணுயிரியல் பரிசோதனைகள்.';

  if (q.includes('water') || q.includes('தண்ணீர்') || q.includes('குடிநீர்')) {
    isCode = 'IS 10500 / IS 14543';
    name = 'Packaged & Drinking Water';
    nameTa = 'பாட்டிலடைக்கப்பட்ட குடிநீர்';
    details = 'Turbidity, pH, TDS, Heavy Metals (Pb, As, Cd), E. coli, Pseudomonas, and 20+ Pesticide residues.';
    detailsTa = 'pH மதிப்பு, கடினத்தன்மை, கன உலோகங்கள் (ஈயம், ஆர்சனிக்), E. coli பாக்டீரியா மற்றும் 20+ பூச்சிக்கொல்லி எச்சங்கள்.';
  } else if (q.includes('helmet') || q.includes('ஹெல்மெட்')) {
    isCode = 'IS 4151:2020';
    name = 'Protective Helmets for Two-Wheelers';
    nameTa = 'இருசக்கர வாகன பாதுகாப்பு ஹெல்மெட்';
    details = 'Impact attenuation test, dynamic retention system test, audibility test, and chin-strap rig test.';
    detailsTa = 'தாக்க உறிஞ்சுதல் சோதனை (Impact Test), ஸ்ட்ராப் தக்கவைப்பு சோதனை, மற்றும் பார்வை கோண சோதனை.';
  } else if (q.includes('cement') || q.includes('சிமெண்ட்')) {
    isCode = 'IS 269:2015';
    name = 'Ordinary Portland Cement (43 Grade)';
    nameTa = 'போர்ட்லேண்ட் சிமெண்ட் 43 கிரேடு';
    details = 'Fineness by Blaine apparatus, sound testing by Le-Chatelier, setting time (initial min 30 min), and 28-day compressive strength.';
    detailsTa = 'செட்டிங் நேரம் (Setting Time), நுணுக்க சோதனை, மற்றும் 28-நாள் அழுத்த வலிமை (Compressive Strength) சோதனை.';
  } else if (q.includes('concrete') || q.includes('கான்கிரீட்')) {
    isCode = 'IS 456:2000';
    name = 'Plain and Reinforced Concrete';
    nameTa = 'சாதாரண மற்றும் வலுவூட்டப்பட்ட கான்கிரீட்';
    details = 'Slump test, cube compressive strength at 7 & 28 days, water-cement ratio benchmarking, and durability clauses.';
    detailsTa = 'ஸ்லம்ப் சோதனை (Slump Test), க்யூப் அழுத்த வலிமை சோதனை மற்றும் நீர்-சிமெண்ட் விகித விவரக்குறிப்புகள்.';
  } else if (q.includes('toy') || q.includes('பொம்மை')) {
    isCode = 'IS 9873 (Parts 1-9)';
    name = 'Safety of Children Toys';
    nameTa = 'குழந்தைகள் பொம்மைகளின் பாதுகாப்பு';
    details = 'Mechanical & physical safety (sharp edges, small parts choke hazard), flammability, and heavy metals toxicity (lead, phthalates).';
    detailsTa = 'கூர்மையான விளிம்புகள் சோதனை, தீப்பற்றாத தன்மை மற்றும் நச்சு ரசாயனங்கள் (ஈயம், தாலேட்டுகள்) இல்லாமை.';
  } else if (q.includes('battery') || q.includes('பேட்டரி')) {
    isCode = 'IS 16046 (Part 1 & 2)';
    name = 'Secondary Lithium Cells & Batteries (CRS)';
    nameTa = 'லித்தியம்-அயன் பேட்டரிகள் மற்றும் செல்கள் (CRS)';
    details = 'External short-circuit, overcharge safety, continuous charging, vibration, mechanical shock, and thermal abuse tests.';
    detailsTa = 'ஷார்ட் சர்க்யூட் பாதுகாப்பு, அதிக சார்ஜ் பாதுகாப்பு மற்றும் வெப்ப தாங்குதல் சோதனைகள்.';
  }

  let text = '';
  if (lang === 'ta') {
    text = `📋 **${nameTa} (${isCode}) — அதிகாரப்பூர்வ BIS தரநிலை விவரக்குறிப்புகள்**:\n\n• **தரநிலை எண்**: **${isCode}**\n• **கட்டாய நிலை**: மத்திய அரசின் தரக்கட்டுப்பாட்டு உத்தரவின் (QCO) கீழ் **கட்டாய சான்றிதழ்** பெற வேண்டும்.\n• **முக்கிய பரிசோதனைகள்**: ${detailsTa}\n• **ஆய்வக மாதிரி அளவு**: அதிகாரப்பூர்வ STI வழிகாட்டுதலின்படி சீலிடப்பட்ட உற்பத்தி மாதிரி.\n• **சான்றிதழ் முறை**: Scheme-I (ISI Mark) அல்லது Scheme-II (CRS Registrations).\n\nமுழு தரநிலை ஆவணத்தை முன்னோட்டம் பார்க்க அல்லது அங்கீகரிக்கப்பட்ட ஆய்வகங்களை கண்டறிய கீழே கிளிக் செய்யவும்.`;
  } else if (lang === 'hi') {
    text = `📋 **${name} (${isCode}) — आधिकारिक बीआईएस मानक विनिर्देश**:\n\n• **मानक संख्या**: **${isCode}**\n• **अनिवार्य स्थिति**: केंद्र सरकार के क्यूसीओ (QCO) के तहत **अनिवार्य प्रमाणन**।\n• **प्रमुख परीक्षण**: ${details}\n• **प्रमाणन योजना**: Scheme-I (ISI Mark) / Scheme-II (CRS)।`;
  } else {
    text = `📋 **Statutory Standard Specifications: ${name} (${isCode})**:\n\n• **Standard Code**: \`${isCode}\`\n• **Mandatory Status**: **Compulsory by Law** under National Quality Control Orders (QCO).\n• **Critical Testing Protocols**: ${details}\n• **Certification Scheme**: Scheme-I (ISI Mark Licence) or Scheme-II (CRS Electronic Registration).\n• **Audit Inspection**: Compliance with the official Scheme of Testing & Inspection (STI).\n\nClick below to preview the clause breakdown or locate recognized testing laboratories:`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? `முழு தரநிலை ${isCode}` : `View Standard ${isCode}`,
      lang === 'ta' ? 'ஆய்வக சோதனை கட்டணம்' : 'Lab Testing Fees',
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'
    ],
    actions: [
      { text: `📖 ${isCode} ` + (lang === 'ta' ? 'முன்னோட்டம்' : 'Standard Preview'), url: `standards-search.html?q=${encodeURIComponent(isCode.split('/')[0].trim())}` },
      { text: '🧪 ' + (lang === 'ta' ? 'ஆய்வக அடைவு' : 'LIMS Labs'), url: 'lims-lab-directory.html' }
    ]
  };
}

// ── 14. GENERAL BIS GUIDANCE ──
function answerGeneralBISConsultation(q, lang) {
  let text = '';
  if (lang === 'ta') {
    text = `💡 **இந்திய தரநிலைகள் பணியகம் (BIS) உதவியாளர் — உங்கள் கேள்விக்கான நேரடி வழிகாட்டுதல்**:\n\nஉங்கள் கேள்வி குறித்து துல்லியமான விவரங்களை அறிய பின்வரும் வழிகளைப் பயன்படுத்தலாம்:\n\n1. **உரிமம் சரிபார்க்க**: 10-இலக்க CM/L எண் அல்லது 6-இலக்க HUID குறியீட்டை உள்ளிட்டால் உடனடியாக அதன் செல்லுபடியை அறியலாம்.\n2. **கட்டண விவரங்கள்**: நீங்கள் தயாரிக்க விரும்பும் தயாரிப்பின் பெயரை குறிப்பிட்டால் (எ.கா. 'குடிநீர் கட்டணம்', 'ஹெல்மெட் கட்டணம்'), விண்ணப்ப மற்றும் ஆய்வு கட்டணங்களை அறியலாம்.\n3. **தரநிலைகள் தேடல்**: 22,000+ இந்திய தரநிலைகளில் உங்கள் தயாரிப்புக்கான IS குறியீட்டை தேடலாம்.\n4. **நுகர்வோர் புகார்**: தரமற்ற அல்லது போலி ISI பொருட்கள் குறித்து 4-படி வழிகாட்டி மூலம் புகார் செய்யலாம்.\n\nகீழே உள்ள தலைப்புகளில் ஒன்றை தேர்வு செய்யவும் அல்லது தயாரிப்பின் பெயரை உள்ளிடவும்.`;
  } else if (lang === 'hi') {
    text = `💡 **भारतीय मानक ब्यूरो (BIS) सहायक — सीधा मार्गदर्शन**:\n\n• **लाइसेंस सत्यापन**: 10-अंकीय CM/L या 6-अंकीय HUID दर्ज करें।\n• **शुल्क एवं मानक**: उत्पाद का नाम लिखें (उदा. 'पेयजल फीस', 'सीमेंट मानक')।\n• **उपभोक्ता शिकायत**: घटिया वस्तु के विरुद्ध शिकायत दर्ज करें।`;
  } else {
    text = `💡 **Bureau of Indian Standards (BIS) Co-Pilot — Direct Consultation**:\n\nI can assist you with precise, grounded statutory details regarding:\n\n1. **Product Certification (ISI Mark)**: Application fees, required in-house test equipment, and Scheme-I licensing.\n2. **Gold Hallmarking (6-digit HUID)**: Mandatory 3 marks, ₹45 assay fees, and statutory 2x compensation under Section 14.\n3. **Search Indian Standards**: Clause previews and mandatory test procedures across 22,000+ IS Codes.\n4. **Consumer Grievances**: How to file official complaints, legal penalties up to 2 years jail under Section 29, and docket tracking.\n5. **MSME Concessions**: 50% application fee and 20% marking fee waivers with Udyam certificates.\n\n*Type your specific product name or question to get an exact answer.*`;
  }

  return {
    text,
    suggestions: [
      lang === 'ta' ? 'விண்ணப்ப கட்டண விவரங்கள்' : 'Application Fees & Costs',
      lang === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents Checklist',
      lang === 'ta' ? 'உரிமத்தை சரிபார்க்கவும்' : 'Verify CM/L Licence',
      lang === 'ta' ? 'தங்க நகை ஹால்மார்க்கிங்' : 'Gold 6-digit HUID'
    ],
    actions: [
      { text: '🔍 ' + (lang === 'ta' ? 'மின்-சரிபார்ப்பு' : 'e-Verification'), url: 'verify-licence.html' },
      { text: '📖 ' + (lang === 'ta' ? 'தரநிலைகள் அட்டவணை' : 'Standards Catalog'), url: 'standards-search.html' },
      { text: '📝 ' + (lang === 'ta' ? 'நுகர்வோர் குறைதீர்ப்பு' : 'Grievance Portal'), url: 'grievance-redressal.html' }
    ]
  };
}
