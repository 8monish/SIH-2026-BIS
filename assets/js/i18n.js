/**
 * BIS Portal & ManakBot AI — Multilingual Support Engine (i18n)
 * Supports 8 Indian languages: English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada.
 * Provides localized text for navigation, chatbot UI, quick action chips, OCR reports, voice speech synthesis, and recognition.
 */

import { PHRASE_DICTIONARY } from './i18n-dictionary.js';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', voice: 'en-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', voice: 'hi-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', voice: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', voice: 'te-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', voice: 'bn-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', voice: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', voice: 'gu-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', voice: 'kn-IN' }
];

const TRANSLATIONS = {
  en: {
    // Portal Navigation & Common
    portalTitle: 'Bureau of Indian Standards',
    tagline: 'National Standards Body of India • मानक: कार्यपालक:',
    navHome: 'Home',
    navVerify: 'e-Verification',
    navStandards: 'Indian Standards',
    navHallmark: 'Hallmarking (AHC)',
    navGrievance: 'Consumer Redressal',
    navLims: 'LIMS Labs',
    navManakBot: 'ManakBot AI',
    helpline: 'Consumer Helpline: 1800-11-0001',
    
    // Chatbot Header & Controls
    botName: 'ManakBot AI Co-Pilot',
    botRole: 'Official Intelligent Assistant • Bureau of Indian Standards',
    botStatus: 'Agentic AI Active',
    voiceReadout: 'Voice Readout',
    clearChat: 'Clear Conversation',
    exportChat: 'Export Transcript',
    closeChat: 'Close Sidebar',
    selectLanguage: 'Language',
    
    // Chatbot Body & Placeholders
    chatPlaceholder: 'Ask ManakBot, upload image to OCR autofill forms, or speak...',
    listening: 'Listening... Speak your query',
    processing: 'Analyzing uploaded file via Optical Character Recognition (OCR)...',
    
    // Quick Action Chips
    chipOverview: 'Portal Overview',
    chipGrievance: 'Auto-Fill Grievance',
    chipGoldCalc: 'Gold Calculator',
    chipVerifyIsi: 'Verify CM/L',
    chipPreviewStandard: 'Preview IS 10500',
    chipLabFee: 'Lab Fee Estimate',
    
    // Welcome Greeting
    welcomeText: `Welcome to the official **ManakBot AI Co-Pilot** of the **Bureau of Indian Standards (BIS)**.\n\nI am your automated agent for standard operations:\n• **📷 Real Vision OCR**: Upload any product label, invoice, or certificate to extract actual details\n• **📝 1-Click Form Autofill**: Uploaded details can be pushed directly to Grievance, Verification, or Standards forms without any manual typing\n• **🌐 Multilingual AI**: Available in 8 Indian languages with voice input & readout\n• **🔍 e-Verification**: Verify 10-digit CM/L, 6-digit HUID, and CRS licences\n• **⚖️ Consumer Grievance**: File official complaints under BIS Act, 2016\n\nSelect an action chip, upload an image/document, or type below to begin.`,
    
    // OCR & Document Intelligence Labels
    ocrTitle: 'Optical Character Recognition (OCR) Inspection Dossier',
    ocrConfidence: 'Extraction Confidence',
    ocrRawText: 'Raw OCR Text Extracted from File',
    ocrProduct: 'Product / Item Name',
    ocrBrand: 'Brand / Manufacturer',
    ocrStandard: 'Applicable Indian Standard (IS Code)',
    ocrLicence: 'Licence / Certification Number',
    ocrPrice: 'Price / MRP / Commercial Value',
    ocrInvoice: 'Invoice / Bill Reference',
    ocrDate: 'Document / Purchase Date',
    ocrRegistryStatus: 'BIS Registry Verification Verdict',
    ocrNotDetected: 'Not detected in file',
    ocrActionsHeading: '🚀 Direct Form Actions & Instant Autofill',
    
    // Form Autofill Action Buttons
    btnAutofillGrievance: '📝 Autofill Consumer Grievance Form',
    btnVerifyLicence: '🔍 Verify Extracted Licence on Portal',
    btnSearchStandard: '📖 Search Extracted IS Standard',
    btnUploadBackend: '💾 Save Document to BIS System',
    
    // Toast & Status Messages
    autofillSuccess: 'Form successfully populated with extracted document details!',
    ocrError: 'Could not detect readable text in image. Please try a clearer picture.',
    uploadSuccess: 'Document registered and saved to BIS Compliance Database!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'Guide me through all services on this portal',
    quickTourResponse: 'Here is the **Official BIS Portal Directory**:\n\n1. **e-Verification Suite**: Authenticate ISI marks (CM/L), Gold HUID, and CRS electronic registrations.\n2. **Indian Standards Catalog**: Search 22,000+ IS specifications and launch in-browser standard clause previews.\n3. **Consumer Grievances**: 4-step complaint registration wizard and statutory gold purity compensation calculator under BIS Act 2016.\n4. **AHC Directory**: Locate recognized Assaying and Hallmarking Centres across states and pincodes.\n5. **LIMS Labs**: Central & regional laboratories network with sample fee estimation.',
    sampleGrievancePrompt: 'How do I file a consumer complaint for a fake or defective ISI helmet?',
    sampleGoldPrompt: 'Calculate gold compensation for 15g of 22K gold tested as 18K',
    sampleVerifyPrompt: 'How do I verify ISI Licence CM/L-8400123456?',
    sampleStandardPrompt: 'Show standard specifications and preview for IS 10500 Drinking Water',
    sampleLimsPrompt: 'How can I estimate lab testing fees for packaged water samples?',
    langSwitchedNotice: 'ManakBot language switched to English! How can I assist you with BIS services today?',
  },
  
  hi: {
    portalTitle: 'भारतीय मानक ब्यूरो',
    tagline: 'भारत का राष्ट्रीय मानक निकाय • मानक: कार्यपालक:',
    navHome: 'होम',
    navVerify: 'ई-सत्यापन',
    navStandards: 'भारतीय मानक',
    navHallmark: 'हॉलमार्किंग (एएचसी)',
    navGrievance: 'उपभोक्ता निवारण',
    navLims: 'लिम्स प्रयोगशालाएं',
    navManakBot: 'मानक-बॉट एआई',
    helpline: 'उपभोक्ता हेल्पलाइन: 1800-11-0001',
    
    botName: 'मानक-बॉट एआई सहायक',
    botRole: 'आधिकारिक कृत्रिम बुद्धिमत्ता सहायक • भारतीय मानक ब्यूरो',
    botStatus: 'एजेंट सक्रिय है',
    voiceReadout: 'ध्वनि पठन',
    clearChat: 'संवाद साफ़ करें',
    exportChat: 'ट्रांसक्रिप्ट निर्यात करें',
    closeChat: 'विंडो बंद करें',
    selectLanguage: 'भाषा चुनें',
    
    chatPlaceholder: 'मानक-बॉट से पूछें, फ़ोटो अपलोड करके फ़ॉर्म भरें, या बोलें...',
    listening: 'सुन रहा हूँ... अपना प्रश्न बोलें',
    processing: 'ऑप्टिकल कैरेक्टर रिकॉग्निशन (OCR) द्वारा फ़ाइल का विश्लेषण हो रहा है...',
    
    chipOverview: 'पोर्टल अवलोकन',
    chipGrievance: 'शिकायत फ़ॉर्म भरें',
    chipGoldCalc: 'स्वर्ण शुद्धता कैलकुलेटर',
    chipVerifyIsi: 'सीएम/एल सत्यापित करें',
    chipPreviewStandard: 'मानक IS 10500 देखें',
    chipLabFee: 'प्रयोगशाला शुल्क अनुमान',
    
    welcomeText: `**भारतीय मानक ब्यूरो (BIS)** के आधिकारिक **मानक-बॉट एआई** में आपका स्वागत है।\n\nमैं आपकी मानक सेवाओं के लिए स्वचालित सहायक हूँ:\n• **📷 वास्तविक विज़न ओसीआर**: उत्पाद लेबल, रसीद या प्रमाणपत्र की फ़ोटो अपलोड करके सटीक जानकारी निकालें\n• **📝 एक-क्लिक फ़ॉर्म ऑटोफ़िल**: निकाले गए विवरण सीधे शिकायत, सत्यापन या मानक फ़ॉर्म में बिना किसी गलती के भरें\n• **🌐 बहुभाषी समर्थन**: आवाज़ में बोलने और सुनने की सुविधा के साथ 8 भारतीय भाषाओं में उपलब्ध\n• **🔍 ई-सत्यापन**: 10-अंकीय सीएम/एल, 6-अंकीय एचयूआईडी और सीआरएस लाइसेंस जांचें\n• **⚖️ उपभोक्ता निवारण**: बीआईएस अधिनियम 2016 के तहत आधिकारिक शिकायत दर्ज करें\n\nशुरू करने के लिए फ़ोटो अपलोड करें या नीचे टाइप करें।`,
    
    ocrTitle: 'ऑप्टिकल कैरेक्टर रिकॉग्निशन (OCR) निरीक्षण रिपोर्ट',
    ocrConfidence: 'सटीकता विश्वास',
    ocrRawText: 'फ़ाइल से प्राप्त मूल ओसीआर टेक्स्ट',
    ocrProduct: 'उत्पाद / वस्तु का नाम',
    ocrBrand: 'ब्रांड / निर्माता',
    ocrStandard: 'लागू भारतीय मानक (IS कोड)',
    ocrLicence: 'लाइसेंस / प्रमाणपत्र संख्या',
    ocrPrice: 'मूल्य / एमआरपी',
    ocrInvoice: 'चालान / रसीद संख्या',
    ocrDate: 'दस्तावेज़ / खरीद तिथि',
    ocrRegistryStatus: 'बीआईएस रजिस्ट्री सत्यापन स्थिति',
    ocrNotDetected: 'फ़ाइल में नहीं पाया गया',
    ocrActionsHeading: '🚀 सीधे फ़ॉर्म ऑटोफ़िल विकल्प',
    
    btnAutofillGrievance: '📝 उपभोक्ता शिकायत फ़ॉर्म में भरें',
    btnVerifyLicence: '🔍 पोर्टल पर लाइसेंस सत्यापित करें',
    btnSearchStandard: '📖 संबंधित भारतीय मानक खोजें',
    btnUploadBackend: '💾 दस्तावेज़ को बीआईएस सिस्टम में सहेजें',
    
    autofillSuccess: 'दस्तावेज़ से प्राप्त विवरण फ़ॉर्म में सफलतापूर्वक भर दिए गए हैं!',
    ocrError: 'छवि में पठनीय पाठ नहीं मिल सका। कृपया अधिक स्पष्ट छवि अपलोड करें।',
    uploadSuccess: 'दस्तावेज़ बीआईएस अनुपालन डेटाबेस में सुरक्षित सहेज लिया गया!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'इस पोर्टल की सभी मुख्य सेवाओं का मार्गदर्शन करें',
    quickTourResponse: '**भारतीय मानक ब्यूरो (BIS) आधिकारिक पोर्टल निर्देशिका**:\n\n1. **ई-सत्यापन सेवा (e-Verification)**: आईएसआई मार्क (CM/L), गोल्ड HUID और सीआरएस पंजीकरण को लाइव सत्यापित करें।\n2. **भारतीय मानक कैटलॉग (Standards Catalog)**: 22,000+ भारतीय मानकों को खोजें और मानकों की धाराओं का पूर्वावलोकन देखें।\n3. **उपभोक्ता शिकायत निवारण (Consumer Grievances)**: 4-चरणीय शिकायत पंजीकरण और बीआईएस अधिनियम 2016 के तहत स्वर्ण शुद्धता मुआवजा कैलकुलेटर।\n4. **हॉलमार्किंग केंद्र (AHC Directory)**: देश भर में मान्यता प्राप्त परख और हॉलमार्किंग केंद्र खोजें।\n5. **लिम्स प्रयोगशालाएं (LIMS Labs)**: परीक्षण शुल्क और समय सीमा अनुमान के साथ केंद्रीय और क्षेत्रीय प्रयोगशाला नेटवर्क।',
    sampleGrievancePrompt: 'नकली या घटिया ISI हेलमेट के खिलाफ उपभोक्ता शिकायत कैसे दर्ज करें?',
    sampleGoldPrompt: '18K पाए गए 15 ग्राम 22K सोने के लिए 2x कानूनी मुआवजे की गणना करें',
    sampleVerifyPrompt: 'ISI लाइसेंस CM/L-8400123456 को कैसे सत्यापित करें?',
    sampleStandardPrompt: 'IS 10500 पेयजल मानक की विशिष्टताएं और पूर्वावलोकन दिखाएं',
    sampleLimsPrompt: 'पैकेज्ड पेयजल परीक्षण के लिए प्रयोगशाला शुल्क का अनुमान कैसे लगाएं?',
    langSwitchedNotice: 'मानक-बॉट एआई की भाषा बदलकर हिन्दी (Hindi) कर दी गई है! मैं आपकी क्या सहायता कर सकता हूँ?',
  },

  ta: {
    portalTitle: 'இந்திய தரநிலைகள் பணியகம்',
    tagline: 'இந்தியாவின் தேசிய தர நிர்ணய அமைப்பு • मानक: कार्यपालक:',
    navHome: 'முகப்பு',
    navVerify: 'மின்-சரிபார்ப்பு',
    navStandards: 'இந்திய தரநிலைகள்',
    navHallmark: 'ஹால்மார்க்கிங்',
    navGrievance: 'நுகர்வோர் குறைதீர்ப்பு',
    navLims: 'லிம்ஸ் ஆய்வகங்கள்',
    navManakBot: 'மணக்பாட் ஏஐ',
    helpline: 'உதவி எண்: 1800-11-0001',
    
    botName: 'மணக்பாட் ஏஐ உதவியாளர்',
    botRole: 'அதிகாரப்பூர்வ ஏஐ உதவியாளர் • இந்திய தரநிலைகள் பணியகம்',
    botStatus: 'செயலில் உள்ளது',
    voiceReadout: 'குரல் வாசிப்பு',
    clearChat: 'அழி',
    exportChat: 'ஏற்றுமதி செய்',
    closeChat: 'மூடு',
    selectLanguage: 'மொழி',
    
    chatPlaceholder: 'மணக்பாட்டிடம் கேளுங்கள், படத்தை பதிவேற்றவும்...',
    listening: 'கேட்கிறது... உங்கள் கேள்வியைக் கூறுங்கள்',
    processing: 'கோப்பிலிருந்து உரை ஸ்கேன் செய்யப்படுகிறது...',
    
    chipOverview: 'போர்டல் கண்ணோட்டம்',
    chipGrievance: 'புகார் படிவம்',
    chipGoldCalc: 'தங்க தூய்மை கணக்கீடு',
    chipVerifyIsi: 'CM/L சரிபார்',
    chipPreviewStandard: 'IS 10500 தரநிலை',
    chipLabFee: 'ஆய்வக கட்டணம்',
    
    welcomeText: `**இந்திய தரநிலைகள் பணியகத்தின் (BIS)** அதிகாரப்பூர்வ **மணக்பாட் ஏஐ** க்கு வரவேற்கிறோம்.\n\n• **📷 நேரடி OCR ஸ்கேனிங்**: தயாரிப்பு படம் அல்லது ரசீதை பதிவேற்றி உண்மையான விவரங்களை பிரித்தெடுக்கவும்\n• **📝 படிவ தானியங்கி நிரப்புதல்**: பிரித்தெடுக்கப்பட்ட விவரங்களை நேரடியாக புகார் அல்லது சரிபார்ப்பு படிவத்தில் பிழையின்றி நிரப்பவும்\n• **🌐 பலமொழி ஆதரவு**: தமிழ் உட்பட 8 இந்திய மொழிகளில் கிடைக்கும்.`,
    
    ocrTitle: 'OCR ஆவண பரிசோதனை அறிக்கை',
    ocrConfidence: 'துல்லியத்தன்மை',
    ocrRawText: 'பிரித்தெடுக்கப்பட்ட அசல் உரை',
    ocrProduct: 'தயாரிப்பு பெயர்',
    ocrBrand: 'பிராண்ட் / உற்பத்தியாளர்',
    ocrStandard: 'பொருந்தும் தரநிலை (IS குறியீடு)',
    ocrLicence: 'உரிம எண் (CM/L / HUID)',
    ocrPrice: 'விலை / MRP',
    ocrInvoice: 'ரசீது எண்',
    ocrDate: 'தேதி',
    ocrRegistryStatus: 'BIS பதிவு சரிபார்ப்பு',
    ocrNotDetected: 'கோப்பில் கண்டறியப்படவில்லை',
    ocrActionsHeading: '🚀 படிவத்தில் நேரடியாக நிரப்பவும்',
    
    btnAutofillGrievance: '📝 நுகர்வோர் புகார் படிவத்தை நிரப்பவும்',
    btnVerifyLicence: '🔍 உரிமத்தை சரிபார்க்கவும்',
    btnSearchStandard: '📖 தரநிலையை தேடவும்',
    btnUploadBackend: '💾 BIS சேமிப்பகத்தில் சேமிக்கவும்',
    
    autofillSuccess: 'படிவம் வெற்றிகரமாக தானாக நிரப்பப்பட்டது!',
    ocrError: 'படத்திலிருந்து உரையைப் படிக்க முடியவில்லை. தெளிவான படத்தை பதிவேற்றவும்.',
    uploadSuccess: 'ஆவணம் வெற்றிகரமாக சேமிக்கப்பட்டது!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'இந்த போர்ட்டலில் உள்ள அனைத்து சேவைகளையும் எனக்கு வழிகாட்டவும்',
    quickTourResponse: '**அதிகாரப்பூர்வ இந்திய தரநிலைகள் பணியகம் (BIS) போர்டல் அடைவு**:\n\n1. **மின்-சரிபார்ப்பு தளம் (e-Verification)**: ISI முத்திரை (CM/L), தங்க HUID மற்றும் CRS மின்னணு பதிவுகளை நேரடியாக சரிபார்க்கவும்.\n2. **இந்திய தரநிலைகள் அட்டவணை (Standards Catalog)**: 22,000+ இந்திய தரநிலைகளை (IS Codes) தேடி உரை விவரங்களை முன்னோட்டம் பார்க்கவும்.\n3. **நுகர்வோர் குறைதீர்ப்பு (Consumer Grievances)**: 4-படி புகார் பதிவு வழிகாட்டி மற்றும் BIS சட்டம் 2016 இன் கீழ் சட்டப்பூர்வ தங்க தூய்மை இழப்பீட்டு கால்குலேட்டர்.\n4. **ஹால்மார்க்கிங் மையங்கள் (AHC Directory)**: நாடு முழுவதும் அங்கீகரிக்கப்பட்ட தங்க பரிசோதனை மற்றும் லேசர் ஹால்மார்க்கிங் மையங்களை கண்டறியவும்.\n5. **லிம்ஸ் ஆய்வகங்கள் (LIMS Labs)**: மாதிரி பரிசோதனை கட்டண மதிப்பீட்டுடன் கூடிய மத்திய மற்றும் பிராந்திய ஆய்வகங்களின் நெட்வொர்க்.',
    sampleGrievancePrompt: 'போலி அல்லது தரமற்ற ISI ஹெல்மெட் குறித்து நுகர்வோர் புகார் செய்வது எப்படி?',
    sampleGoldPrompt: '18K என சோதிக்கப்பட்ட 15 கிராம் 22K தங்கத்திற்கான 2x இழப்பீட்டை கணக்கிடுங்கள்',
    sampleVerifyPrompt: 'ISI உரிமம் CM/L-8400123456 ஐ எவ்வாறு சரிபார்க்கலாம்?',
    sampleStandardPrompt: 'IS 10500 குடிநீர் தரநிலையின் விவரக்குறிப்புகள் மற்றும் முன்னோட்டத்தை காட்டுங்கள்',
    sampleLimsPrompt: 'குடிநீர் மாதிரிகளுக்கான ஆய்வக சோதனை கட்டணத்தை எவ்வாறு கணக்கிடுவது?',
    langSwitchedNotice: 'மணக்பாட் ஏஐ மொழி தமிழுக்கு (Tamil) மாற்றப்பட்டது! இந்திய தரநிலைகள் பணியகத்தின் சேவைகளில் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
  },

  te: {
    portalTitle: 'బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్',
    tagline: 'భారత జాతీయ ప్రమాణాల సంస్థ • मानक: कार्यपालक:',
    navHome: 'హోమ్',
    navVerify: 'ఇ-ధృవీకరణ',
    navStandards: 'భారతీయ ప్రమాణాలు',
    navHallmark: 'హాల్‌మార్కింగ్',
    navGrievance: 'వినియోగదారుల ఫిర్యాదులు',
    navLims: 'లిమ్స్ ప్రయోగశాలలు',
    navManakBot: 'మణక్‌బాట్ AI',
    helpline: 'హెల్ప్‌లైన్: 1800-11-0001',
    
    botName: 'మణక్‌బాట్ AI అసిస్టెంట్',
    botRole: 'అధికారిక AI అసిస్టెంట్ • బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్',
    botStatus: 'క్రియాశీలకంగా ఉంది',
    voiceReadout: 'వాయిస్ రీడౌట్',
    clearChat: 'క్లియర్ చేయండి',
    exportChat: 'ఎగుమతి చేయండి',
    closeChat: 'మూసివేయండి',
    selectLanguage: 'భాష',
    
    chatPlaceholder: 'మణక్‌బాట్‌ని అడగండి లేదా ఫారం నింపడానికి చిత్రాన్ని అప్‌లోడ్ చేయండి...',
    listening: 'వింటున్నాను... మాట్లాడండి',
    processing: 'OCR ద్వారా చిత్రాన్ని విశ్లేషిస్తోంది...',
    
    chipOverview: 'పోర్టల్ అవలోకనం',
    chipGrievance: 'ఫిర్యాదు ఫారమ్ నింపండి',
    chipGoldCalc: 'బంగారు స్వచ్ఛత కాలిక్యులేటర్',
    chipVerifyIsi: 'CM/L తనిఖీ చేయండి',
    chipPreviewStandard: 'IS 10500 ప్రమాణం',
    chipLabFee: 'ల్యాబ్ ఫీజు అంచనా',
    
    welcomeText: `**బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్ (BIS)** అధికారిక **మణక్‌బాట్ AI** కి స్వాగతం.\n\n• **📷 రియల్ OCR**: ఇన్‌వాయిస్ లేదా లేబుల్ చిత్రాన్ని అప్‌లోడ్ చేసి ఖచ్చితమైన వివరాలను పొందండి\n• **📝 ఆటో-ఫిల్ ఫారమ్‌లు**: ఏవైనా లోపాలు లేకుండా నేరుగా ఫిర్యాదు ఫారమ్‌లలో వివరాలను నింపండి\n• **🌐 బహుభాషా మద్దతు**: తెలుగు సహా 8 భాషలలో అందుబాటులో ఉంది.`,
    
    ocrTitle: 'OCR డాక్యుమెంట్ ఇన్స్పెక్షన్ రిపోర్ట్',
    ocrConfidence: 'ఖచ్చితత్వ రేటు',
    ocrRawText: 'గుర్తించిన అసలు వచనం',
    ocrProduct: 'ఉత్పత్తి పేరు',
    ocrBrand: 'బ్రాండ్ / తయారీదారు',
    ocrStandard: 'వర్తించే IS కోడ్',
    ocrLicence: 'లైసెన్స్ సంఖ్య (CM/L / HUID)',
    ocrPrice: 'ధర / MRP',
    ocrInvoice: 'ఇన్వాయిస్ సంఖ్య',
    ocrDate: 'తేదీ',
    ocrRegistryStatus: 'BIS రిజిస్ట్రీ స్థితి',
    ocrNotDetected: 'కనుగొనబడలేదు',
    ocrActionsHeading: '🚀 ఫారమ్‌లలో నేరుగా నింపే చర్యలు',
    
    btnAutofillGrievance: '📝 ఫిర్యాదు ఫారమ్‌ను నింపండి',
    btnVerifyLicence: '🔍 లైసెన్స్‌ను ధృవీకరించండి',
    btnSearchStandard: '📖 ప్రమాణాన్ని శోధించండి',
    btnUploadBackend: '💾 BIS సిస్టమ్‌లో భద్రపరచండి',
    
    autofillSuccess: 'ఫారమ్ విజయవంతంగా ఆటో-ఫిల్ చేయబడింది!',
    ocrError: 'చిత్రంలో స్పష్టమైన వచనం కనుగొనబడలేదు.',
    uploadSuccess: 'డాక్యుమెంట్ సేవ్ చేయబడింది!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'ఈ పోర్టల్‌లోని సేవల గురించి నాకు మార్గదర్శనం చేయండి',
    quickTourResponse: '**బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్ (BIS) అధికారిక పోర్టల్ డైరెక్టరీ**:\n\n1. **ఇ-ధృవీకరణ సూట్ (e-Verification)**: ISI గుర్తులు (CM/L), గోల్డ్ HUID మరియు CRS రిజిస్ట్రేషన్‌లను ధృవీకరించండి.\n2. **భారతీయ ప్రమాణాల కేటలాగ్ (Standards Catalog)**: 22,000+ ప్రమాణాలను శోధించండి మరియు ప్రివ్యూలను చూడండి.\n3. **వినియోగదారుల ఫిర్యాదులు (Consumer Grievances)**: 4-దశల ఫిర్యాదు నమోదు మరియు BIS చట్టం 2016 ప్రకారం బంగారు స్వచ్ఛత పరిహార కాలిక్యులేటర్.\n4. **హాల్‌మార్కింగ్ కేంద్రాలు (AHC Directory)**: గుర్తింపు పొందిన అస్సేయింగ్ మరియు హాల్‌మార్కింగ్ కేంద్రాలను కనుగొనండి.\n5. **లిమ్స్ ల్యాబ్‌లు (LIMS Labs)**: నమూనా పరీక్ష రుసుము అంచనాతో ప్రయోగశాలల నెట్‌వర్క్.',
    sampleGrievancePrompt: 'నకిలీ ISI హెల్మెట్ పై వినియోగదారుల ఫిర్యాదును ఎలా నమోదు చేయాలి?',
    sampleGoldPrompt: '18K గా తేలిన 15 గ్రాముల 22K బంగారానికి పరిహారాన్ని లెక్కించండి',
    sampleVerifyPrompt: 'ISI లైసెన్స్ CM/L-8400123456 ని ఎలా ధృవీకరించాలి?',
    sampleStandardPrompt: 'IS 10500 తాగునీటి ప్రమాణాన్ని ప్రివ్యూ చేయండి',
    sampleLimsPrompt: 'ప్యాకేజ్డ్ నీటి నమూనాల ల్యాబ్ పరీక్ష రుసుమును ఎలా అంచనా వేయాలి?',
    langSwitchedNotice: 'మణక్‌బాట్ భాష తెలుగు (Telugu) కు మార్చబడింది! నేను మీకు ఎలా సహాయపడగలను?',
  },

  bn: {
    portalTitle: 'ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস',
    tagline: 'ভারতের জাতীয় মান সংস্থা • मानक: कार्यपालक:',
    navHome: 'হোম',
    navVerify: 'ই-যাচাইকরণ',
    navStandards: 'ভারতীয় মানক',
    navHallmark: 'হলমার্কিং',
    navGrievance: 'ভোক্তা অভিযোগ',
    navLims: 'লিমস গবেষণাগার',
    navManakBot: 'মানকবট এআই',
    helpline: 'হেল্পলাইন: 1800-11-0001',
    
    botName: 'মানকবট এআই কো-পাইলট',
    botRole: 'অফিসিয়াল এআই সহকারী • ভারতীয় মানক ব্যুরো',
    botStatus: 'সক্রিয় আছে',
    voiceReadout: 'ভয়েস রিডআউট',
    clearChat: 'মুছুন',
    exportChat: 'এক্সপোর্ট',
    closeChat: 'বন্ধ করুন',
    selectLanguage: 'ভাষা',
    
    chatPlaceholder: 'মানকবটকে জিজ্ঞাসা করুন বা ছবি আপলোড করুন...',
    listening: 'শুনছি... বলুন',
    processing: 'OCR দিয়ে নথি বিশ্লেষণ করা হচ্ছে...',
    
    chipOverview: 'পোর্টাল ওভারভিউ',
    chipGrievance: 'অভিযোগ ফর্ম পূরণ',
    chipGoldCalc: 'স্বর্ণ বিশুদ্ধতা ক্যালকুলেটর',
    chipVerifyIsi: 'CM/L যাচাই করুন',
    chipPreviewStandard: 'IS 10500 স্ট্যান্ডার্ড',
    chipLabFee: 'ল্যাব ফি অনুমান',
    
    welcomeText: `**ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস (BIS)**-এর অফিসিয়াল **মানকবট এআই**-এ স্বাগতম।\n\n• **📷 বাস্তব OCR স্ক্যানিং**: লেবেল বা রসিদের ছবি আপলোড করে আসল তথ্য বের করুন\n• **📝 সরাসরি ফর্ম অটো-ফিল**: কোনো ত্রুটি ছাড়াই সরাসরি অভিযোগ বা লাইসেন্স ফর্মে তথ্য পূরণ করুন\n• **🌐 বহুভাষিক সুবিধা**: বাংলা সহ ৮টি ভারতীয় ভাষায় উপলব্ধ।`,
    
    ocrTitle: 'OCR নথি পরিদর্শন রিপোর্ট',
    ocrConfidence: 'নির্ভুলতা',
    ocrRawText: 'সংগৃহীত আসল টেক্সট',
    ocrProduct: 'পণ্যের নাম',
    ocrBrand: 'ব্র্যান্ড / প্রস্তুতকারক',
    ocrStandard: 'প্রযোজ্য ভারতীয় মানক',
    ocrLicence: 'লাইসেন্স নম্বর (CM/L / HUID)',
    ocrPrice: 'মূল্য / MRP',
    ocrInvoice: 'চালান নম্বর',
    ocrDate: 'তারিখ',
    ocrRegistryStatus: 'BIS রেজিস্ট্রি যাচাই',
    ocrNotDetected: 'নথিতে পাওয়া যায়নি',
    ocrActionsHeading: '🚀 সরাসরি ফর্মে পূরণ করার বিকল্প',
    
    btnAutofillGrievance: '📝 ভোক্তা অভিযোগ ফর্মে ভরুন',
    btnVerifyLicence: '🔍 লাইসেন্স যাচাই করুন',
    btnSearchStandard: '📖 স্ট্যান্ডার্ড খুঁজুন',
    btnUploadBackend: '💾 নথিপত্র সেভ করুন',
    
    autofillSuccess: 'ফর্মটি সফলভাবে পূরণ করা হয়েছে!',
    ocrError: 'ছবিতে স্পষ্ট টেক্সট পাওয়া যায়নি।',
    uploadSuccess: 'নথি সফলভাবে সংরক্ষিত হয়েছে!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'এই পোর্টালের সমস্ত পরিষেবা সম্পর্কে আমাকে গাইড করুন',
    quickTourResponse: '**ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস (BIS) অফিসিয়াল পোর্টাল ডিরেক্টরি**:\n\n1. **ই-যাচাইকরণ (e-Verification)**: ISI মার্ক (CM/L), গোল্ড HUID এবং CRS নিবন্ধন যাচাই করুন।\n2. **ভারতীয় মানক ক্যাটালগ (Standards Catalog)**: 22,000+ মানক অনুসন্ধান করুন এবং প্রিভিউ দেখুন।\n3. **ভোক্তা অভিযোগ প্রতিকার (Consumer Grievances)**: 4-পদক্ষেপের অভিযোগ নিবন্ধন এবং BIS আইন 2016-এর অধীনে ক্ষতিপূরণ ক্যালকুলেটর।\n4. **হলমার্কিং কেন্দ্র (AHC Directory)**: স্বীকৃত হলমার্কিং কেন্দ্রগুলি খুঁজুন।\n5. **লিমস ল্যাবস (LIMS Labs)**: পরীক্ষার ফি অনুমান সহ পরীক্ষাগার নেটওয়ার্ক।',
    sampleGrievancePrompt: 'নকল ISI হেলমেটের বিরুদ্ধে কীভাবে অভিযোগ দায়ের করবেন?',
    sampleGoldPrompt: '18K পাওয়া 15 গ্রাম 22K সোনার জন্য ক্ষতিপূরণ গণনা করুন',
    sampleVerifyPrompt: 'ISI লাইসেন্স CM/L-8400123456 কীভাবে যাচাই করবেন?',
    sampleStandardPrompt: 'IS 10500 পানীয় জলের মানকের স্পেসিফিকেশন দেখুন',
    sampleLimsPrompt: 'প্যাকেজড জলের ল্যাব পরীক্ষার ফি কীভাবে অনুমান করবেন?',
    langSwitchedNotice: 'মানক-বট ভাষা বাংলায় (Bengali) পরিবর্তিত হয়েছে! আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
  },

  mr: {
    portalTitle: 'भारतीय मानक ब्युरो',
    tagline: 'भारताची राष्ट्रीय मानक संस्था • मानक: कार्यपालक:',
    navHome: 'मुख्यपृष्ठ',
    navVerify: 'ई-सत्यापन',
    navStandards: 'भारतीय मानके',
    navHallmark: 'हॉलमार्किंग',
    navGrievance: 'ग्राहक तक्रार निवारण',
    navLims: 'लिम्स प्रयोगशाळा',
    navManakBot: 'मानकबॉट एआय',
    helpline: 'हेल्पलाइन: 1800-11-0001',
    
    botName: 'मानकबॉट एआय सहाय्यक',
    botRole: 'अधिकृत एआय सहाय्यक • भारतीय मानक ब्युरो',
    botStatus: 'सक्रिय आहे',
    voiceReadout: 'आवाज वाचन',
    clearChat: 'संवाद साफ करा',
    exportChat: 'एक्सपोर्ट',
    closeChat: 'बंद करा',
    selectLanguage: 'भाषा',
    
    chatPlaceholder: 'मानकबॉटला विचारा किंवा फॉर्म भरण्यासाठी फोटो अपलोड करा...',
    listening: 'ऐकत आहे... बोला',
    processing: 'OCR द्वारे फाईल तपासली जात आहे...',
    
    chipOverview: 'पोर्टल आढावा',
    chipGrievance: 'तक्रार फॉर्म भरा',
    chipGoldCalc: 'सुवर्ण शुद्धता कॅल्क्युलेटर',
    chipVerifyIsi: 'CM/L तपासा',
    chipPreviewStandard: 'IS 10500 मानक पहा',
    chipLabFee: 'लॅब फी अंदाज',
    
    welcomeText: `**भारतीय मानक ब्युरो (BIS)** च्या अधिकृत **मानकबॉट एआय** मध्ये आपले स्वागत आहे.\n\n• **📷 रिअल OCR**: फोटो अपलोड करून अचूक तपशील मिळवा\n• **📝 थेट फॉर्म ऑटो-फिल**: कोणत्याही त्रुटीशिवाय तक्रार किंवा सत्यापन फॉर्ममध्ये माहिती भरा\n• **🌐 बहुभाषिक समर्थन**: मराठीसह ८ भाषांमध्ये उपलब्ध.`,
    
    ocrTitle: 'OCR तपासणी अहवाल',
    ocrConfidence: 'अचूकता',
    ocrRawText: 'स्कॅन केलेला मूळ मजकूर',
    ocrProduct: 'उत्पादनाचे नाव',
    ocrBrand: 'ब्रँड / उत्पादक',
    ocrStandard: 'लागू भारतीय मानक (IS कोड)',
    ocrLicence: 'परवाना क्रमांक (CM/L / HUID)',
    ocrPrice: 'किंमत / MRP',
    ocrInvoice: 'पावती क्रमांक',
    ocrDate: 'तारीख',
    ocrRegistryStatus: 'BIS नोंदणी स्थिती',
    ocrNotDetected: 'आढळले नाही',
    ocrActionsHeading: '🚀 थेट फॉर्म भरण्याचे पर्याय',
    
    btnAutofillGrievance: '📝 ग्राहक तक्रार फॉर्म भरा',
    btnVerifyLicence: '🔍 परवाना सत्यापित करा',
    btnSearchStandard: '📖 मानक शोधा',
    btnUploadBackend: '💾 बीआयएस प्रणालीत जतन करा',
    
    autofillSuccess: 'फॉर्म यशस्वीरीत्या भरला गेला आहे!',
    ocrError: 'प्रतिमेत मजकूर आढळला नाही.',
    uploadSuccess: 'दस्तऐवज सुरक्षित जतन केला!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'या पोर्टलवरील सर्व सेवांबद्दल मला मार्गदर्शन करा',
    quickTourResponse: '**भारतीय मानक ब्युरो (BIS) अधिकृत पोर्टल निर्देशिका**:\n\n1. **ई-सत्यापन सेवा (e-Verification)**: ISI मार्क (CM/L), सुवर्ण HUID आणि CRS नोंदणी थेट तपासा.\n2. **भारतीय मानके कॅटलॉग (Standards Catalog)**: 22,000+ मानके शोधा आणि मसुदा तपासा.\n3. **ग्राहक तक्रार निवारण (Consumer Grievances)**: 4-टप्प्यांची तक्रार नोंदणी आणि BIS कायदा 2016 अंतर्गत भरपाई कॅल्क्युलेटर.\n4. **हॉलमार्किंग केंद्रे (AHC Directory)**: मान्यताप्राप्त हॉलमार्किंग केंद्रे शोधा.\n5. **लिम्स लॅब्स (LIMS Labs)**: चाचणी शुल्क आणि कालावधी अंदाजित करा.',
    sampleGrievancePrompt: 'बनावट किंवा निकृष्ट दर्जाच्या ISI हेल्मेटविरुद्ध तक्रार कशी करावी?',
    sampleGoldPrompt: '18K आढळलेल्या 15 ग्रॅम 22K सोन्यासाठी 2x भरपाईची गणना करा',
    sampleVerifyPrompt: 'ISI परवाना CM/L-8400123456 कसा पडताळायचा?',
    sampleStandardPrompt: 'IS 10500 पिण्याचे पाणी मानक तपशील दाखवा',
    sampleLimsPrompt: 'पाणी नमुन्यांसाठी लॅब चाचणी शुल्काचा अंदाज कसा घ्यावा?',
    langSwitchedNotice: 'मानक-बॉट भाषा मराठी (Marathi) मध्ये बदलली आहे! मी तुम्हाला कशी मदत करू शकतो?',
  },

  gu: {
    portalTitle: 'બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ',
    tagline: 'ભારતની રાષ્ટ્રીય માનક સંસ્થા • मानक: कार्यपालक:',
    navHome: 'મુખ્ય પૃષ્ઠ',
    navVerify: 'ઇ-ચકાસણી',
    navStandards: 'ભારતીય ધોરણો',
    navHallmark: 'હોલમાર્કિંગ',
    navGrievance: 'ગ્રાહક ફરિયાદ નિવારણ',
    navLims: 'લિમ્સ લેબ્સ',
    navManakBot: 'માનકબોટ AI',
    helpline: 'હેલ્પલાઇન: 1800-11-0001',
    
    botName: 'માનકબોટ AI સહાયક',
    botRole: 'સત્તાવાર AI સહાયક • બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ',
    botStatus: 'સક્રિય છે',
    voiceReadout: 'અવાજ વાંચન',
    clearChat: 'ચેટ સાફ કરો',
    exportChat: 'નિકાસ કરો',
    closeChat: 'બંધ કરો',
    selectLanguage: 'ભાષા',
    
    chatPlaceholder: 'માનકબોટને પૂછો અથવા ફોર્મ ભરવા માટે ફોટો અપલોડ કરો...',
    listening: 'સાંભળી રહ્યો છું... બોલો',
    processing: 'OCR દ્વારા ફાઇલ સ્કેન થઈ રહી છે...',
    
    chipOverview: 'પોર્ટલ વિહંગાવલોકન',
    chipGrievance: 'ફરિયાદ ફોર્મ ભરો',
    chipGoldCalc: 'સોનાની શુદ્ધતા કેલ્ક્યુલેટર',
    chipVerifyIsi: 'CM/L ચકાસો',
    chipPreviewStandard: 'IS 10500 ધોરણ',
    chipLabFee: 'લેબ ફી અંદાજ',
    
    welcomeText: `**બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ (BIS)** ના સત્તાવાર **માનકબોટ AI** માં તમારું સ્વાગત છે.\n\n• **📷 રીઅલ OCR**: પ્રોડક્ટ ફોટો અપલોડ કરી સાચી માહિતી મેળવો\n• **📝 ડાયરેક્ટ ફોર્મ ઓટો-ફિલ**: કોઈ પણ ભૂલ વગર સીધા જ ફરિયાદ ફોર્મમાં વિગતો ભરો\n• **🌐 બહુભાષી સપોર્ટ**: ગુજરાતી સહિત 8 ભાષાઓમાં ઉપલબ્ધ.`,
    
    ocrTitle: 'OCR દસ્તાવેજ નિરીક્ષણ અહેવાલ',
    ocrConfidence: 'ચોકસાઈ દર',
    ocrRawText: 'સ્કેન થયેલ અસલ લખાણ',
    ocrProduct: 'પ્રોડક્ટનું નામ',
    ocrBrand: 'બ્રાન્ડ / ઉત્પાદક',
    ocrStandard: 'લાગુ પડતું ધોરણ (IS કોડ)',
    ocrLicence: 'લાઇસન્સ નંબર (CM/L / HUID)',
    ocrPrice: 'કિંમત / MRP',
    ocrInvoice: 'બિલ નંબર',
    ocrDate: 'તારીખ',
    ocrRegistryStatus: 'BIS રજીસ્ટ્રી સ્થિતિ',
    ocrNotDetected: 'ફાઇલમાં મળ્યું નથી',
    ocrActionsHeading: '🚀 સીધા ફોર્મ ભરવાના વિકલ્પો',
    
    btnAutofillGrievance: '📝 ફરિયાદ ફોર્મમાં ભરો',
    btnVerifyLicence: '🔍 લાઇસન્સ ચકાસો',
    btnSearchStandard: '📖 સ્ટાન્ડર્ડ શોધો',
    btnUploadBackend: '💾 BIS ડેટાબેઝમાં સાચવો',
    
    autofillSuccess: 'ફોર્મ સફળતાપૂર્વક ભરાઈ ગયું છે!',
    ocrError: 'ચિત્રમાં લખાણ વાંચી શકાયું નથી.',
    uploadSuccess: 'દસ્તાવેજ સફળતાપૂર્વક સાચવવામાં આવ્યો!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'આ પોર્ટલની તમામ સેવાઓ વિશે મને માર્ગદર્શન આપો',
    quickTourResponse: '**બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ (BIS) સત્તાવાર પોર્ટલ ડિરેક્ટરી**:\n\n1. **ઇ-ચકાસણી (e-Verification)**: ISI માર્ક (CM/L), ગોલ્ડ HUID અને CRS નોંધણી ચકાસો.\n2. **ભારતીય ધોરણો કેટલોગ (Standards Catalog)**: 22,000+ ભારતીય ધોરણો શોધો અને પૂર્વાવલોકન જુઓ.\n3. **ગ્રાહક ફરિયાદ નિવારણ (Consumer Grievances)**: 4-તબક્કાની ફરિયાદ નોંધણી અને BIS કાયદો 2016 હેઠળ વળતર કેલ્ક્યુલેટર.\n4. **હોલમાર્કિંગ કેન્દ્રો (AHC Directory)**: માન્યતા પ્રાપ્ત હોલમાર્કિંગ કેન્દ્રો શોધો.\n5. **લિમ્બ્સ લેબ્સ (LIMS Labs)**: પરીક્ષણ ફી અંદાજ સાથે પ્રયોગશાળા નેટવર્ક.',
    sampleGrievancePrompt: 'નકલી ISI હેલ્મેટ સામે ગ્રાહક ફરિયાદ કેવી રીતે નોંધાવવી?',
    sampleGoldPrompt: '18K મળેલા 15 ગ્રામ 22K સોના માટે 2x વળતરની ગણતરી કરો',
    sampleVerifyPrompt: 'ISI લાઇસન્સ CM/L-8400123456 કેવી રીતે ચકાસવું?',
    sampleStandardPrompt: 'IS 10500 પીવાના પાણીના ધોરણની વિગતો જુઓ',
    sampleLimsPrompt: 'પાણીના નમૂના માટે લેબ પરીક્ષણ ફીનો અંદાજ કેવી રીતે મેળવવો?',
    langSwitchedNotice: 'માનક-બોટ ભાષા ગુજરાતી (Gujarati) માં બદલાઈ ગઈ છે! હું તમને કેવી રીતે મદદ કરી શકું?',
  },

  kn: {
    portalTitle: 'ಬ್ಯೂರೋ ಆಫ್ ಇಂಡಿಯನ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್ಸ್',
    tagline: 'ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಮಾನದಂಡ ಸಂಸ್ಥೆ • मानक: कार्यपालक:',
    navHome: 'ಮುಖಪುಟ',
    navVerify: 'ಇ-ಪರಿಶೀಲನೆ',
    navStandards: 'ಭಾರತೀಯ ಮಾನದಂಡಗಳು',
    navHallmark: 'ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್',
    navGrievance: 'ಗ್ರಾಹಕರ ಕುಂದುಕೊರತೆ',
    navLims: 'ಲಿಮ್ಸ್ ಪ್ರಯೋಗಾಲಯಗಳು',
    navManakBot: 'ಮಾಣಕ್‌ಬಾಟ್ AI',
    helpline: 'ಸಹಾಯವಾಣಿ: 1800-11-0001',
    
    botName: 'ಮಾಣಕ್‌ಬಾಟ್ AI ಸಹಾಯಕ',
    botRole: 'ಅಧಿಕೃತ AI ಸಹಾಯಕ • ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಬ್ಯೂರೋ',
    botStatus: 'ಸಕ್ರಿಯವಾಗಿದೆ',
    voiceReadout: 'ಧ್ವನಿ ಓದುವಿಕೆ',
    clearChat: 'ತೆರವುಗೊಳಿಸಿ',
    exportChat: 'ರಫ್ತು ಮಾಡಿ',
    closeChat: 'ಮುಚ್ಚಿ',
    selectLanguage: 'ಭಾಷೆ',
    
    chatPlaceholder: 'ಮಾಣಕ್‌ಬಾಟ್ ಅನ್ನು ಕೇಳಿ ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ...',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ',
    processing: 'OCR ಮೂಲಕ ಫೈಲ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    
    chipOverview: 'ಪೋರ್ಟಲ್ ಅವಲೋಕನ',
    chipGrievance: 'ದೂರು ನಮೂನೆ ಭರ್ತಿ',
    chipGoldCalc: 'ಚಿನ್ನದ ಶುದ್ಧತೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    chipVerifyIsi: 'CM/L ಪರಿಶೀಲಿಸಿ',
    chipPreviewStandard: 'IS 10500 ಮಾನದಂಡ',
    chipLabFee: 'ಪ್ರಯೋಗಾಲಯ ಶುಲ್ಕ ಅಂದಾಜು',
    
    welcomeText: `**ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಬ್ಯೂರೋ (BIS)** ನ ಅಧಿಕೃತ **ಮಾಣಕ್‌ಬಾಟ್ AI** ಗೆ ಸುಸ್ವಾಗತ.\n\n• **📷 ನಿಜವಾದ OCR**: ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೂಲಕ ನೈಜ ವಿವರಗಳನ್ನು ಹೊರತೆಗೆಯಿರಿ\n• **📝 ನೇರ ನಮೂನೆ ಆಟೋ-ಫಿಲ್**: ಯಾವುದೇ ದೋಷವಿಲ್ಲದೆ ನೇರವಾಗಿ ದೂರು ನಮೂನೆಗಳಲ್ಲಿ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ\n• **🌐 ಬಹುಭಾಷಾ ಬೆಂಬಲ**: ಕನ್ನಡ ಸೇರಿದಂತೆ 8 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ.`,
    
    ocrTitle: 'OCR ದಾಖಲೆ ಪರಿಶೀಲನಾ ವರದಿ',
    ocrConfidence: 'ನಿಖರತೆ',
    ocrRawText: 'ಹೊರತೆಗೆಯಲಾದ ಪಠ್ಯ',
    ocrProduct: 'ಉತ್ಪನ್ನದ ಹೆಸರು',
    ocrBrand: 'ಬ್ರ್ಯಾಂಡ್ / ತಯಾರಕ',
    ocrStandard: 'ಅನ್ವಯವಾಗುವ ಮಾನದಂಡ',
    ocrLicence: 'ಪರವಾನಗಿ ಸಂಖ್ಯೆ (CM/L / HUID)',
    ocrPrice: 'ಬೆಲೆ / MRP',
    ocrInvoice: 'ಬಿಲ್ ಸಂಖ್ಯೆ',
    ocrDate: 'ದಿನಾಂಕ',
    ocrRegistryStatus: 'BIS ನೋಂದಣಿ ಸ್ಥಿತಿ',
    ocrNotDetected: 'ಕಂಡುಬಂದಿಲ್ಲ',
    ocrActionsHeading: '🚀 ನೇರ ನಮೂನೆ ಭರ್ತಿ ಆಯ್ಕೆಗಳು',
    
    btnAutofillGrievance: '📝 ಗ್ರಾಹಕ ದೂರು ನಮೂನೆ ಭರ್ತಿ ಮಾಡಿ',
    btnVerifyLicence: '🔍 ಪರವಾನಗಿ ಪರಿಶೀಲಿಸಿ',
    btnSearchStandard: '📖 ಮಾನದಂಡ ಹುಡುಕಿ',
    btnUploadBackend: '💾 BIS ಸಿಸ್ಟಂನಲ್ಲಿ ಉಳಿಸಿ',
    
    autofillSuccess: 'ನಮೂನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ!',
    ocrError: 'ಚಿತ್ರದಲ್ಲಿ ಸ್ಪಷ್ಟ ಪಠ್ಯ ಕಂಡುಬಂದಿಲ್ಲ.',
    uploadSuccess: 'ದಾಖಲೆ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',

    // Quick Prompts & Switched Notices
    quickTourUserPrompt: 'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಸೇವೆಗಳ ಬಗ್ಗೆ ನನಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿ',
    quickTourResponse: '**ಬ್ಯೂರೋ ಆಫ್ ಇಂಡಿಯನ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್ಸ್ (BIS) ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಡೈರೆಕ್ಟರಿ**:\n\n1. **ಇ-ಪರಿಶೀಲನೆ (e-Verification)**: ISI ಮಾರ್ಕ್ (CM/L), ಗೋಲ್ಡ್ HUID ಮತ್ತು CRS ನೋಂದಣಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.\n2. **ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಕ್ಯಾಟಲಾಗ್ (Standards Catalog)**: 22,000+ ಮಾನದಂಡಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಪೂರ್ವವೀಕ್ಷಣೆ ನೋಡಿ.\n3. **ಗ್ರಾಹಕರ ಕುಂದುಕೊರತೆ ನಿವಾರಣೆ (Consumer Grievances)**: 4-ಹಂತದ ದೂರು ನೋಂದಣಿ ಮತ್ತು BIS ಕಾಯ್ದೆ 2016 ರ ಅಡಿಯಲ್ಲಿ ಪರಿಹಾರ ಕ್ಯಾಲ್ಕುಲೇಟರ್.\n4. **ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ಕೇಂದ್ರಗಳು (AHC Directory)**: ಮಾನ್ಯತೆ ಪಡೆದ ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ.\n5. **ಲಿಮ್ಸ್ ಲ್ಯಾಬ್ಸ್ (LIMS Labs)**: ಮಾದರಿ ಪರೀಕ್ಷಾ ಶುಲ್ಕದ ಅಂದಾಜಿನೊಂದಿಗೆ ಪ್ರಯೋಗಾಲಯಗಳ ಜಾಲ.',
    sampleGrievancePrompt: 'ನಕಲಿ ISI ಹೆಲ್ಮೆಟ್ ವಿರುದ್ಧ ಗ್ರಾಹಕರ ದೂರನ್ನು ಹೇಗೆ ಸಲ್ಲಿಸುವುದು?',
    sampleGoldPrompt: '18K ಎಂದು ಕಂಡುಬಂದ 15 ಗ್ರಾಂ 22K ಚಿನ್ನಕ್ಕೆ 2x ಪರಿಹಾರವನ್ನು ಲೆಕ್ಕಹಾಕಿ',
    sampleVerifyPrompt: 'ISI ಪರವಾನಗಿ CM/L-8400123456 ಅನ್ನು ಪರಿಶೀಲಿಸುವುದು ಹೇಗೆ?',
    sampleStandardPrompt: 'IS 10500 ಕುಡಿಯುವ ನೀರಿನ ಮಾನದಂಡವನ್ನು ಪೂರ್ವವೀಕ್ಷಣೆ ಮಾಡಿ',
    sampleLimsPrompt: 'ನೀರಿನ ಮಾದರಿ ಪರೀಕ್ಷಾ ಶುಲ್ಕವನ್ನು ಹೇಗೆ ಅಂದಾಜು ಮಾಡುವುದು?',
    langSwitchedNotice: 'ಮಾನಕ್-ಬಾಟ್ ಭಾಷೆಯನ್ನು ಕನ್ನಡ (Kannada) ಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
  }
};

const LANG_STORAGE_KEY = 'bis_preferred_language';
let currentLang = 'en';

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      currentLang = saved;
    }
  } catch (_) {}
}

export function getCurrentLanguage() {
  return currentLang;
}

export function getVoiceLanguage(langCode = currentLang) {
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  return langObj ? langObj.voice : 'en-IN';
}

export function t(key, langCode = currentLang) {
  const dict = TRANSLATIONS[langCode] || TRANSLATIONS.en;
  return dict[key] !== undefined ? dict[key] : (TRANSLATIONS.en[key] || key);
}

// Pre-sorted dictionary keys by length descending for optimal substring matching
const SORTED_DICTIONARY_KEYS = typeof PHRASE_DICTIONARY !== 'undefined'
  ? Object.keys(PHRASE_DICTIONARY).sort((a, b) => b.length - a.length)
  : [];

export function setLanguage(langCode) {
  if (!SUPPORTED_LANGUAGES.some(l => l.code === langCode)) {
    langCode = 'en';
  }
  currentLang = langCode;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, langCode);
  } catch (_) {}

  // Update HTML lang attribute
  if (typeof document !== 'undefined') {
    document.documentElement.lang = langCode;
    updatePageDOMTranslations();
    updateLanguageControls(langCode);
  }

  // Dispatch global event for ManakBot AI & other listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bis_language_changed', {
      detail: { lang: langCode, translations: TRANSLATIONS[langCode] || TRANSLATIONS.en }
    }));
  }
}

/**
 * Updates text on language toggle buttons and syncs all dropdown selectors
 */
export function updateLanguageControls(targetLang = currentLang) {
  const isHindi = targetLang === 'hi';
  
  // 1. Primary Toggle Button text
  const toggleBtn = document.getElementById('btn-toggle-lang');
  const toggleText = document.getElementById('lang-switch-text');
  
  if (toggleText) {
    toggleText.textContent = isHindi ? 'English' : 'हिंदी';
  } else if (toggleBtn) {
    toggleBtn.innerHTML = `<span>🌐</span><span>${isHindi ? 'English' : 'हिंदी'}</span>`;
  }
  if (toggleBtn) {
    toggleBtn.title = isHindi ? 'Switch to English' : 'हिंदी में बदलें (Switch to Hindi)';
    toggleBtn.setAttribute('aria-label', isHindi ? 'Switch to English' : 'हिंदी में बदलें');
  }

  // 2. Secondary topbar links (.lang-toggle / .lang-toggle-btn)
  document.querySelectorAll('.lang-toggle, .lang-toggle-btn, #subpage-lang-toggle').forEach(el => {
    if (el.tagName.toLowerCase() === 'button' || el.id === 'subpage-lang-toggle' || el.classList.contains('lang-toggle-btn')) {
      el.textContent = isHindi ? 'English' : 'हिन्दी';
      el.title = isHindi ? 'Switch to English' : 'Switch to Hindi';
    }
  });

  // 3. Anchor tags inside .lang-switch
  document.querySelectorAll('.lang-switch a').forEach(a => {
    a.textContent = isHindi ? ' English ' : ' हिंदी ';
  });

  // 4. Synchronize all select elements
  document.querySelectorAll('.bis-lang-select, .chatbot-lang-select').forEach(sel => {
    if (sel.value !== targetLang) {
      sel.value = targetLang;
    }
  });
}

/**
 * Traverses the DOM non-destructively and localizes text nodes and attributes.
 * Caches original English text in _i18nOriginal so switching back to 'en' is 100% lossless.
 */
export function updatePageDOMTranslations() {
  if (typeof document === 'undefined') return;
  const lang = currentLang;

  // 1. Walk and translate DOM text nodes
  const root = document.body || document.documentElement;
  if (root) {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'template', 'iframe', 'svg', 'code', 'pre'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('#btn-toggle-lang, #topbar-lang-container, .bis-lang-select, .bis-lang-btn, .chatbot-lang-select')) {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue;
          if (!text || !text.trim()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (const node of textNodes) {
      if (node._i18nOriginal === undefined) {
        node._i18nOriginal = node.nodeValue;
      }

      if (lang === 'en') {
        if (node.nodeValue !== node._i18nOriginal) {
          node.nodeValue = node._i18nOriginal;
        }
        continue;
      }

      const original = node._i18nOriginal;
      const trimmed = original.trim();

      // Direct exact match
      if (PHRASE_DICTIONARY[trimmed]) {
        const trans = PHRASE_DICTIONARY[trimmed][lang] || PHRASE_DICTIONARY[trimmed].hi;
        if (trans && trans !== trimmed) {
          node.nodeValue = original.replace(trimmed, trans);
          continue;
        }
      }

      // Substring match for compound sentences
      let replaced = original;
      let changed = false;
      for (const key of SORTED_DICTIONARY_KEYS) {
        if (key.length >= 3 && replaced.includes(key)) {
          const transObj = PHRASE_DICTIONARY[key];
          const trans = transObj[lang] || transObj.hi;
          if (trans && trans !== key) {
            replaced = replaced.replaceAll(key, trans);
            changed = true;
          }
        }
      }
      if (changed) {
        node.nodeValue = replaced;
      }
    }
  }

  // 2. Translate attributes: title, placeholder, aria-label
  const attrElements = document.querySelectorAll('input, textarea, [title], [aria-label]');
  attrElements.forEach(el => {
    if (el.closest('#btn-toggle-lang, #topbar-lang-container, .bis-lang-select, .bis-lang-btn, .chatbot-lang-select')) {
      return;
    }
    for (const attr of ['placeholder', 'title', 'aria-label']) {
      const val = el.getAttribute(attr);
      if (!val || !val.trim()) continue;
      const cacheKey = `_i18nOrig_${attr}`;
      if (el[cacheKey] === undefined) {
        el[cacheKey] = val;
      }
      if (lang === 'en') {
        el.setAttribute(attr, el[cacheKey]);
        continue;
      }
      let orig = el[cacheKey];
      const trimmed = orig.trim();
      if (PHRASE_DICTIONARY[trimmed]) {
        const trans = PHRASE_DICTIONARY[trimmed][lang] || PHRASE_DICTIONARY[trimmed].hi;
        if (trans) {
          el.setAttribute(attr, orig.replace(trimmed, trans));
          continue;
        }
      }
      let replaced = orig;
      for (const key of SORTED_DICTIONARY_KEYS) {
        if (key.length >= 3 && replaced.includes(key)) {
          const transObj = PHRASE_DICTIONARY[key];
          const trans = transObj[lang] || transObj.hi;
          if (trans && trans !== key) {
            replaced = replaced.replaceAll(key, trans);
          }
        }
      }
      el.setAttribute(attr, replaced);
    }
  });

  // 3. Topbar helpline
  const helplineSpan = document.querySelector('.topbar-right span');
  if (helplineSpan && helplineSpan.innerHTML.includes('1800-11-0001')) {
    helplineSpan.innerHTML = t('helpline', lang).replace('1800-11-0001', '<strong>1800-11-0001</strong>');
  }

  // 4. Chatbot inputs
  const botInput = document.querySelector('.chatbot-input');
  if (botInput) botInput.placeholder = t('chatPlaceholder', lang);

  const studioInput = document.getElementById('studio-chat-input');
  if (studioInput) studioInput.placeholder = t('chatPlaceholder', lang);

  // 5. Update toggle controls
  updateLanguageControls(lang);
}

/**
 * Initializes click handlers on language toggle buttons, preventing external redirection.
 */
export function initLanguageToggleButtons() {
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextLang = currentLang === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
  };

  const btn = document.getElementById('btn-toggle-lang');
  if (btn) {
    btn.removeEventListener('click', handleToggle);
    btn.addEventListener('click', handleToggle);
  }

  // Intercept any .lang-switch a to permanently eliminate external redirect
  document.querySelectorAll('.lang-switch a').forEach(a => {
    a.removeAttribute('href');
    a.setAttribute('role', 'button');
    a.setAttribute('tabindex', '0');
    a.style.cursor = 'pointer';
    a.removeEventListener('click', handleToggle);
    a.addEventListener('click', handleToggle);
    a.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleToggle(e);
      }
    });
  });

  // Secondary topbar buttons
  document.querySelectorAll('#subpage-lang-toggle, .lang-toggle-btn').forEach(el => {
    el.removeEventListener('click', handleToggle);
    el.addEventListener('click', handleToggle);
  });

  updateLanguageControls(currentLang);
}

/**
 * Injects a lightweight, accessible multilingual selector into target containers
 */
export function renderLanguageSelector(containerId = 'topbar-lang-container') {
  if (typeof document === 'undefined') return null;

  const containers = typeof containerId === 'string'
    ? Array.from(document.querySelectorAll(`#${containerId}, .${containerId}`))
    : [containerId].filter(Boolean);

  containers.forEach(container => {
    let selector = container.querySelector('.bis-lang-select');
    if (!selector) {
      selector = document.createElement('select');
      selector.className = 'bis-lang-select';
      selector.setAttribute('aria-label', 'Select Portal Language');
      selector.innerHTML = SUPPORTED_LANGUAGES.map(l => 
        `<option value="${l.code}">${l.native} (${l.code.toUpperCase()})</option>`
      ).join('');

      selector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });

      container.innerHTML = '';
      container.appendChild(selector);
    } else {
      selector.value = currentLang;
    }
  });
}

/**
 * Localized RAG Knowledge Base Generator
 * Returns rich structured responses in the user's selected language.
 */
export function getLocalizedRAGResponse(intent, data = {}, langCode = currentLang) {
  const lang = TRANSLATIONS[langCode] ? langCode : 'en';

  if (intent === 'guide_tour') {
    return {
      text: t('quickTourResponse', lang),
      suggestions: [
        t('chipGrievance', lang),
        t('chipVerifyIsi', lang),
        t('chipPreviewStandard', lang),
        t('chipLabFee', lang)
      ],
      actions: [
        { text: '📝 ' + t('navGrievance', lang), url: 'grievance-redressal.html' },
        { text: '🔍 ' + t('navVerify', lang), url: 'verify-licence.html' },
        { text: '📖 ' + t('navStandards', lang), url: 'standards-search.html' },
        { text: '🧪 ' + t('navLims', lang), url: 'lims-lab-directory.html' }
      ]
    };
  }

  if (intent === 'grievance') {
    const product = data.product || (lang === 'ta' ? 'இரண்டு சக்கர வாகன ஹெல்மெட்' : (lang === 'hi' ? 'दुपहिया वाहन सुरक्षा हेलमेट' : 'Protective Helmet'));
    const category = data.category || (lang === 'ta' ? 'போலி ISI முத்திரை (தரமற்ற தயாரிப்பு)' : (lang === 'hi' ? 'आईएसआई मार्क का दुरुपयोग (घटिया उत्पाद)' : 'Misuse of ISI Mark (Substandard Product)'));
    const details = data.details || (lang === 'ta' ? 'வாங்கிய பொருளில் போலி ISI முத்திரை உள்ளது. சாதாரண பயன்பாட்டில் பழுதடைந்தது.' : (lang === 'hi' ? 'दोषपूर्ण/नकली आईएसआई मार्क के साथ खरीदा गया उत्पाद। सामान्य उपयोग में टूट गया।' : 'Product purchased with defective/counterfeit ISI mark.'));

    let text = '';
    if (lang === 'ta') {
      text = `**BIS நுகர்வோர் குறைதீர்ப்பு — புகார் வரைவு தயாராக உள்ளது**:\n\n**BIS சட்டம், 2016 (பிரிவு 29)** இன் கீழ், போலி அல்லது தரமற்ற ISI முத்திரையுடன் பொருட்களை தயாரிப்பது அல்லது விற்பது **2 ஆண்டுகள் வரை சிறைத்தண்டனை மற்றும் ₹2,00,000 அபராதம்** விதிக்கத்தக்க குற்றமாகும்.\n\nஉங்கள் கேள்வியிலிருந்து எடுக்கப்பட்ட விவரங்கள்:\n• **புகார்தாரர்**: ${data.name || 'நுகர்வோர்'} (${data.phone || 'தொலைபேசி வழங்கப்படவில்லை'})\n• **தயாரிப்பு**: ${product}\n• **வகை**: ${category}\n• **விற்பனையாளர்**: ${data.seller || 'விற்பனையாளர் / கடை'}\n• **விவரம்**: ${details}\n\nஇந்த விவரங்களுடன் **நுகர்வோர் குறைதீர்ப்பு படிவத்தை** நேரடியாக திறக்க கீழே கிளிக் செய்யவும்.`;
    } else if (lang === 'hi') {
      text = `**बीआईएस उपभोक्ता शिकायत — शिकायत मसौदा तैयार है**:\n\n**बीआईएस अधिनियम, 2016 (धारा 29)** के तहत, नकली या गैर-मानक आईएसआई मार्क वाले उत्पादों का निर्माण या बिक्री करने पर **2 साल तक का कारावास और ₹2,00,000 का जुर्माना** हो सकता है।\n\nआपके प्रश्न से प्राप्त विवरण:\n• **शिकायतकर्ता**: ${data.name || 'नागरिक'} (${data.phone || 'फ़ोन नंबर नहीं दिया गया'})\n• **उत्पाद**: ${product}\n• **श्रेणी**: ${category}\n• **विक्रेता**: ${data.seller || 'विक्रेता / डीलर'}\n• **मुद्दा**: ${details}\n\nइन विवरणों के साथ **उपभोक्ता शिकायत पोर्टल** खोलने के लिए नीचे क्लिक करें।`;
    } else {
      text = `**BIS Consumer Grievance — Complaint Draft Prepared**:\n\nUnder **BIS Act, 2016 (Section 29)**, manufacturing or marketing goods with counterfeit ISI marks carries up to **2 years imprisonment and ₹2,00,000 penalty**.\n\nCaptured Details:\n• **Complainant**: ${data.name || 'Citizen'} (${data.phone || 'Phone not provided'})\n• **Product**: ${product}\n• **Category**: ${category}\n• **Seller**: ${data.seller || 'Vendor / Retailer'}\n• **Issue**: ${details}\n\nClick below to open the **Consumer Grievance Portal** pre-filled.`;
    }

    const prefillUrl = data.prefillUrl || `grievance-redressal.html?product=${encodeURIComponent(product)}&category=${encodeURIComponent(category)}&details=${encodeURIComponent(details)}&seller=${encodeURIComponent(data.seller || '')}&price=${encodeURIComponent(data.price || '1500')}`;

    return {
      text,
      suggestions: [
        lang === 'ta' ? '10-இலக்க CM/L சரிபார்' : (lang === 'hi' ? '10-अंकीय CM/L जांचें' : 'Verify 10-digit CM/L'),
        lang === 'ta' ? 'தங்க 2x இழப்பீட்டு கால்குலேட்டர்' : (lang === 'hi' ? 'स्वर्ण 2x कैलकुलेटर' : 'Gold 2x Calculator'),
        lang === 'ta' ? 'புகார் நிலையை அறியவும்' : (lang === 'hi' ? 'शिकायत ट्रैक करें' : 'Track Grievance Docket')
      ],
      actions: [
        { text: t('btnAutofillGrievance', lang), url: prefillUrl },
        { text: t('btnVerifyLicence', lang), url: 'verify-licence.html' }
      ]
    };
  }

  if (intent === 'gold') {
    let text = '';
    if (lang === 'ta') {
      text = `**BIS தங்க ஹால்மார்க்கிங் மற்றும் சட்டப்பூர்வ இழப்பீடு**:\n\n• **கட்டாய 3 முத்திரைகள்**: BIS முக்கோண லோகோ, தூய்மை தரம் (எ.கா. 22K916), மற்றும் 6-இலக்க தனித்துவ **HUID** குறியீடு.\n• **சட்டப்பூர்வ இழப்பீடு (BIS சட்டம் 2016, பிரிவு 14)**: ஹால்மார்க் செய்யப்பட்ட தங்கம் சோதனையில் தூய்மை குறைவு என நிரூபிக்கப்பட்டால், நுகர்வோருக்கு **தூய்மை பற்றாக்குறைக்கு 2 மடங்கு நிதி இழப்பீடு** மற்றும் ₹500 பரிசோதனை கட்டணம் திரும்ப வழங்கப்படும்.\n\nஉங்கள் இழப்பீட்டை துல்லியமாக கணக்கிட அல்லது 6-இலக்க HUID ஐ சரிபார்க்க கீழே கிளிக் செய்யவும்:`;
    } else if (lang === 'hi') {
      text = `**बीआईएस स्वर्ण हॉलमार्किंग और वैधानिक मुआवजा**:\n\n• **3 अनिवार्य चिह्न**: बीआईएस त्रिकोण लोगो, शुद्धता ग्रेड (उदा. 22K916), और 6-अंकीय अद्वितीय **HUID** कोड।\n• **वैधानिक मुआवजा (बीआईएस अधिनियम 2016, धारा 14)**: यदि हॉलमार्क वाले सोने की शुद्धता जांच में कम पाई जाती है, तो उपभोक्ता **शुद्धता कमी के 2 गुना मूल्य का मुआवजा** और ₹500 परख शुल्क वापसी पाने का हकदार है।\n\nसटीक मुआवजे की गणना करने या HUID सत्यापित करने के लिए नीचे क्लिक करें:`;
    } else {
      text = `**BIS Gold Hallmarking & Statutory Compensation**:\n\n• **Mandatory 3 Marks**: BIS Standard Logo, Purity (e.g. 22K916), and 6-digit alphanumeric **HUID**.\n• **Statutory Compensation (BIS Act 2016, Section 14)**: If hallmarked gold fails assay tests, the consumer is legally entitled to **2x the purity shortfall** plus refund of the ₹500 assaying fee.\n\nClick below to calculate your exact compensation or authenticate a 6-digit HUID:`;
    }

    const goldUrl = data.goldUrl || `grievance-redressal.html?weight=${encodeURIComponent(data.weight || '15')}&claimed=${encodeURIComponent(data.claimed || '22')}&tested=${encodeURIComponent(data.tested || '18')}&rate=${encodeURIComponent(data.rate || '7200')}#gold-calc-section`;

    return {
      text,
      suggestions: [
        lang === 'ta' ? '6-இலக்க HUID சரிபார்' : (lang === 'hi' ? '6-अंकीय HUID जांचें' : 'Verify 6-digit HUID'),
        lang === 'ta' ? 'ஹால்மார்க்கிங் மையங்கள்' : (lang === 'hi' ? 'हॉलमार्किंग केंद्र खोजें' : 'Locate Hallmarking Centres'),
        lang === 'ta' ? 'தங்க புகார் பதிவு செய்' : (lang === 'hi' ? 'स्वर्ण शिकायत दर्ज करें' : 'File Gold Complaint')
      ],
      actions: [
        { text: '⚖️ ' + t('chipGoldCalc', lang), url: goldUrl },
        { text: t('btnVerifyLicence', lang), url: 'verify-licence.html?type=huid' }
      ]
    };
  }

  if (intent === 'verify') {
    const code = data.code || 'CM/L-8400123456';
    const type = data.type || 'isi';
    let text = '';
    if (lang === 'ta') {
      text = `**BIS மின்-சரிபார்ப்பு பதிவேடு**:\n\n• **ISI முத்திரை (CM/L)**: 10-இலக்க உரிம எண் (எ.கா. \`CM/L-8400123456\`)\n• **தங்க ஹால்மார்க் (HUID)**: 6-இலக்க குறியீடு (எ.கா. \`AB1234\`)\n• **CRS எலக்ட்ரானிக்ஸ்**: 8-இலக்க R-எண் (எ.கா. \`R-41001234\`)\n\nதேசிய தரவுத்தளத்தில் **${code}** உரிமத்தை உடனடியாக சரிபார்க்க கீழே கிளிக் செய்யவும்:`;
    } else if (lang === 'hi') {
      text = `**बीआईएस ई-सत्यापन रजिस्ट्री**:\n\n• **आईएसआई मार्क (CM/L)**: 10-अंकीय लाइसेंस प्रारूप (उदा. \`CM/L-8400123456\`)\n• **स्वर्ण हॉलमार्क (HUID)**: 6-अंकीय कोड (उदा. \`AB1234\`)\n• **सीआरएस इलेक्ट्रॉनिक्स**: 8-अंकीय R-संख्या (उदा. \`R-41001234\`)\n\nलाइव राष्ट्रीय डेटाबेस में **${code}** को तुरंत सत्यापित करने के लिए नीचे क्लिक करें:`;
    } else {
      text = `**BIS e-Verification Registry**:\n\n• **ISI Mark (CM/L)**: 10-digit licence format e.g. \`CM/L-8400123456\`\n• **Gold Hallmark (HUID)**: 6-digit alphanumeric code e.g. \`AB1234\`\n• **CRS Electronics**: 8-digit R-number e.g. \`R-41001234\`\n\nClick below to instantly verify **${code}** in the live national database:`;
    }

    const verifyUrl = data.verifyUrl || `verify-licence.html?type=${encodeURIComponent(type)}&code=${encodeURIComponent(code)}`;

    return {
      text,
      suggestions: [
        `CM/L-8400123456`,
        `AB1234 (HUID)`,
        `R-41001234 (CRS)`
      ],
      actions: [
        { text: `🔍 ${code} ` + (lang === 'ta' ? 'சரிபார்க்கவும்' : (lang === 'hi' ? 'सत्यापित करें' : 'Verify')), url: verifyUrl },
        { text: t('navVerify', lang), url: 'verify-licence.html' }
      ]
    };
  }

  if (intent === 'standards') {
    const isCode = data.isCode || 'IS 10500';
    let text = '';
    if (lang === 'ta') {
      text = `**இந்திய தரநிலைகள் அட்டவணை (IS Codes)**:\n\nதரநிலை **${isCode}** தேசிய தரக் கட்டுப்பாட்டு உத்தரவுகளின் (QCO) கீழ் கட்டாய பாதுகாப்பு தேவைகள் மற்றும் தரக்கட்டுப்பாட்டு நடைமுறைகளை குறிப்பிடுகிறது.\n\nதரநிலையை தேடி முழு விவரங்களை முன்னோட்டம் பார்க்க கீழே கிளிக் செய்யவும்:`;
    } else if (lang === 'hi') {
      text = `**भारतीय मानक कैटलॉग (IS Codes)**:\n\nमानक **${isCode}** राष्ट्रीय गुणवत्ता नियंत्रण आदेशों (QCO) के तहत अनिवार्य सुरक्षा आवश्यकताओं और गुणवत्ता परीक्षण प्रक्रियाओं को निर्दिष्ट करता है।\n\nपूर्ण मानक विवरण देखने के लिए नीचे क्लिक करें:`;
    } else {
      text = `**Indian Standards Catalog (IS Codes)**:\n\nStandard **${isCode}** specifies mandatory safety requirements and quality control testing procedures enforced under national Quality Control Orders (QCOs).\n\nClick below to search the catalog and view full standard details:`;
    }

    const stdUrl = data.stdUrl || `standards-search.html?q=${encodeURIComponent(isCode)}`;

    return {
      text,
      suggestions: [`${isCode}`, 'IS 456', 'IS 4151', 'IS 1417'],
      actions: [
        { text: `📖 ${isCode} ` + (lang === 'ta' ? 'முன்னோட்டம்' : (lang === 'hi' ? 'पूर्वावलोकन' : 'Preview')), url: stdUrl },
        { text: t('navStandards', lang), url: 'standards-search.html' }
      ]
    };
  }

  if (intent === 'lims') {
    let text = '';
    if (lang === 'ta') {
      text = `**BIS லிம்ஸ் ஆய்வக நெட்வொர்க்**:\n\n• **முக்கிய ஆய்வகங்கள்**: மத்திய ஆய்வகம் (சாஹிபாபாத்), மேற்கு (மும்பை), தெற்கு (சென்னை), கிழக்கு (கொல்கத்தா), வடக்கு (சண்டிகர்).\n• **பங்களிப்பு ஆய்வகங்கள்**: 300+ NABL அங்கீகாரம் பெற்ற சோதனை மையங்கள்.\n\nஉங்கள் மாதிரி சோதனைக்கான கட்டணம் மற்றும் கால அளவை கணக்கிடலாம்.`;
    } else if (lang === 'hi') {
      text = `**बीआईएस लिम्स प्रयोगशाला नेटवर्क**:\n\n• **शीर्ष क्षेत्रीय प्रयोगशालाएं**: केंद्रीय प्रयोगशाला (साहिबाबाद), पश्चिमी (मुंबई), दक्षिणी (चेन्नई), पूर्वी (कोलकाता), उत्तरी (चंडीगढ़)।\n• **साझेदार प्रयोगशालाएं**: 300+ NABL मान्यता प्राप्त परीक्षण सुविधाएं।\n\nहम आपके उत्पाद नमूने के लिए अनुमानित परीक्षण शुल्क और समय सीमा की गणना कर सकते हैं।`;
    } else {
      text = `**BIS LIMS Laboratory Network**:\n\n• **Apex Regional Labs**: Central Lab (Sahibabad), Western (Mumbai), Southern (Chennai), Eastern (Kolkata), Northern (Chandigarh).\n• **Partner Labs**: 300+ NABL accredited testing facilities.\n\nCalculate the estimated testing fee and turnaround time (TAT) for your product sample.`;
    }

    return {
      text,
      suggestions: [
        lang === 'ta' ? 'குடிநீர் சோதனை கட்டணம்' : (lang === 'hi' ? 'पेयजल परीक्षण शुल्क' : 'Estimate Water Testing Fee'),
        lang === 'ta' ? 'சிமெண்ட் சோதனை கட்டணம்' : (lang === 'hi' ? 'सीमेंट परीक्षण शुल्क' : 'Estimate Cement Testing Fee'),
        lang === 'ta' ? 'எலக்ட்ரானிக்ஸ் சோதனை கட்டணம்' : (lang === 'hi' ? 'इलेक्ट्रॉनिक्स परीक्षण शुल्क' : 'Estimate Electronics Fee')
      ],
      actions: [{ text: '🧪 ' + t('navLims', lang), url: 'lims-lab-directory.html' }]
    };
  }

  if (intent === 'roadmap') {
    let text = '';
    if (lang === 'ta') {
      text = `**அதிகாரப்பூர்வ இந்திய தரநிலைகள் பணியகம் (BIS) செயல்பாட்டு வரைபடங்கள்**:\n\nஉங்கள் தேவைக்கேற்ப தொடக்கம் முதல் இறுதி வரையிலான வழிகாட்டி:\n\n---\n\n### 🏭 **வழிமுறை 1: உற்பத்தியாளர் ISI முத்திரை (CM/L) பெறுதல்**\n1. **தரநிலையை கண்டறிதல்**: தயாரிப்புக்கான IS குறியீட்டை [தரநிலைகள் அட்டவணையில்](standards-search.html) கண்டறியவும்.\n2. **தொழிற்சாலை சோதனை அமைப்பு (STI)**: ஆய்வக உபகரணங்களை நிறுவி அளவீடு செய்யவும்.\n3. **முன்-ஆய்வக சோதனை**: [லிம்ஸ் அடைவில்](lims-lab-directory.html) அங்கீகரிக்கப்பட்ட ஆய்வகத்தை கண்டறிந்து கட்டணங்களை மதிப்பிடவும்.\n4. **விண்ணப்பம் சமர்ப்பித்தல்**: [Manakonline போர்ட்டலில்](https://www.manakonline.in) ஆன்லைன் விண்ணப்பத்தை தாக்கல் செய்யவும்.\n5. **அதிகாரி ஆய்வு**: BIS தொழில்நுட்ப அதிகாரி தொழிற்சாலை ஆய்வு மேற்கொள்வார்.\n6. **உரிமம் வழங்குதல்**: வெற்றிகரமான சரிபார்ப்பிற்குப் பிறகு 10-இலக்க **CM/L** உரிமம் வழங்கப்படும்.\n\n---\n\n### 🛡️ **வழிமுறை 2: நுகர்வோர் குறைதீர்ப்பு மற்றும் புகார் பதிவு**\n1. **உரிமத்தை சரிபார்க்கவும்**: [மின்-சரிபார்ப்பு தளத்தில்](verify-licence.html) CM/L அல்லது HUID ஐ சரிபார்க்கவும்.\n2. **ஆதாரங்களை திரட்டவும்**: தவறான பொருள், ரசீது மற்றும் லேபிள் புகைப்படங்களை எடுக்கவும்.\n3. **புகார் பதிவு**: [நுகர்வோர் குறைதீர்ப்பு தளத்தில்](grievance-redressal.html) 4-படி வழிகாட்டியை பூர்த்தி செய்து டிராக்கிங் டோக்கனைப் பெறவும்.\n4. **சோதனை மற்றும் பறிமுதல்**: BIS அதிகாரிகள் சந்தை சோதனைகளை நடத்தி தரமற்ற பொருட்களை பறிமுதல் செய்வார்கள்.\n5. **இழப்பீடு**: இழப்பீடு அல்லது மாற்றுப் பொருள் வழங்கப்படும் வரை கண்காணிக்கவும்.\n\n---\n\n### 💍 **வழிமுறை 3: தங்க நகை தூய்மை மற்றும் 2x இழப்பீடு**\n1. **3 முத்திரைகளை சரிபார்க்கவும்**: BIS லோகோ, தூய்மை தரம் மற்றும் 6-இலக்க HUID.\n2. **தனிப்பட்ட சோதனை**: அங்கீகரிக்கப்பட்ட [ஹால்மார்க்கிங் மையத்தில்](hallmarking-centres.html) தூய்மையை சோதிக்கவும்.\n3. **சட்டப்பூர்வ இழப்பீட்டு கணக்கீடு**: [தங்க கால்குலேட்டரில்](grievance-redressal.html#gold-calc-section) **2 மடங்கு இழப்பீடு** மற்றும் ₹500 திரும்பப்பெறுதலை கணக்கிடவும்.\n4. **கோரிக்கை தாக்கல்**: சான்றிதழுடன் இழப்பீட்டு கோரிக்கையை சமர்ப்பிக்கவும்.`;
    } else if (lang === 'hi') {
      text = `**भारतीय मानक ब्यूरो (BIS) आधिकारिक परिचालन रोडमैप**:\n\nआपकी आवश्यकता के अनुसार शुरुआत से अंत तक मार्गदर्शन:\n\n---\n\n### 🏭 **रोडमैप 1: निर्माता आईएसआई मार्क (CM/L) प्रमाणन**\n1. **मानक पहचान**: लागू मानक को [मानक कैटलॉग](standards-search.html) में खोजें।\n2. **इन-हाउस परीक्षण सेटअप**: परीक्षण और निरीक्षण योजना (STI) के अनुसार संयंत्र सुसज्जित करें।\n3. **लैब परीक्षण**: [लिम्स डायरेक्टरी](lims-lab-directory.html) में परीक्षण शुल्क का अनुमान लगाएं।\n4. **डिजिटल आवेदन**: [Manakonline](https://www.manakonline.in) पर फॉर्म-1 जमा करें।\n5. **कारखाना ऑडिट**: बीआईएस तकनीकी अधिकारी द्वारा संयंत्र सत्यापन।\n6. **लाइसेंस प्राप्ति**: 10-अंकीय आधिकारिक **CM/L** लाइसेंस प्राप्त करें।\n\n---\n\n### 🛡️ **रोडमैप 2: उपभोक्ता शिकायत और निवारण**\n1. **प्रमाणिकता जांच**: [ई-सत्यापन](verify-licence.html) पर CM/L या HUID सत्यापित करें।\n2. **सबूत जुटाएं**: घटिया वस्तु और बिल का फोटो लें।\n3. **शिकायत दर्ज करें**: [उपभोक्ता निवारण](grievance-redressal.html) पर 4-चरणीय फॉर्म भरें।\n4. **छापेमारी**: बीआईएस अधिकारियों द्वारा गैर-मानक स्टॉक जब्त किया जाता है।\n5. **मुआवजा**: राहत मिलने तक वास्तविक समय में ट्रैक करें।\n\n---\n\n### 💍 **रोडमैप 3: स्वर्ण आभूषण शुद्धता और 2x मुआवजा**\n1. **3 चिह्न जांचें**: बीआईएस लोगो, शुद्धता और 6-अंकीय HUID।\n2. **परख केंद्र**: [हॉलमार्किंग केंद्र](hallmarking-centres.html) में स्वतंत्र जांच कराएं।\n3. **मुआवजा गणना**: [स्वर्ण कैलकुलेटर](grievance-redressal.html#gold-calc-section) पर **2 गुना मुआवजा** निकालें।\n4. **दावा पेश करें**: वैधानिक वसूली के लिए प्रमाण पत्र जमा करें।`;
    } else {
      text = `**Official Bureau of Indian Standards (BIS) Operational Roadmaps**:\n\nHere is your step-by-step guidance from start to finish based on your requirement:\n\n---\n\n### 🏭 **Roadmap 1: Manufacturer ISI Mark Certification (From Scratch)**\n1. **Standard Identification**: Search your product on our [Standards Catalog](standards-search.html) for the applicable IS Code.\n2. **In-House Testing Setup**: Equip your factory according to the Scheme of Testing and Inspection (STI).\n3. **Pre-Commissioning Lab Benchmark**: Locate an accredited lab on the [LIMS Directory](lims-lab-directory.html).\n4. **Digital Application**: File on [Manakonline Portal](https://www.manakonline.in).\n5. **Factory Audit**: BIS Technical Officer conducts on-site factory verification.\n6. **Grant of 10-Digit CM/L Licence**: Receive your official verifiable licence.\n\n---\n\n### 🛡️ **Roadmap 2: Consumer Grievance & Substandard Product Redressal**\n1. **Authenticate Label**: Check the 10-digit CM/L or 6-digit HUID on [e-Verification](verify-licence.html).\n2. **Gather Evidence**: Photograph defective item, invoice, and label markings.\n3. **File Grievance**: Complete the 4-step wizard on [Consumer Redressal](grievance-redressal.html).\n4. **Surveillance & Raid**: BIS Enforcement Officers execute market raids under Section 28 & 29.\n5. **Redressal & Refund**: Track live progress until compensation is disbursed.\n\n---\n\n### 💍 **Roadmap 3: Gold Jewellery Purity Verification & 2x Compensation**\n1. **Check 3 Hallmarks**: BIS Logo, Purity (e.g. 22K916), and 6-digit HUID.\n2. **Independent Assaying**: Test at a recognized [Assaying & Hallmarking Centre](hallmarking-centres.html).\n3. **Calculate Statutory Compensation**: Enter weights on the [Gold Calculator](grievance-redressal.html#gold-calc-section) for **2x shortfall penalty** + ₹500 fee refund.\n4. **File Claim**: Submit assay certificate for recovery.`;
    }

    return {
      text,
      suggestions: [
        lang === 'ta' ? 'உற்பத்தியாளர் வழிமுறை' : (lang === 'hi' ? 'निर्माता रोडमैप' : 'Start Manufacturer Roadmap'),
        lang === 'ta' ? 'புகார் பதிவு செய்' : (lang === 'hi' ? 'शिकायत दर्ज करें' : 'File Consumer Grievance'),
        lang === 'ta' ? '6-இலக்க HUID சரிபார்' : (lang === 'hi' ? 'HUID सत्यापित करें' : 'Verify 6-digit HUID'),
        t('chipPreviewStandard', lang)
      ],
      actions: [
        { text: '🔍 ' + t('navVerify', lang), url: 'verify-licence.html' },
        { text: '📖 ' + t('navStandards', lang), url: 'standards-search.html' },
        { text: '📝 ' + t('navGrievance', lang), url: 'grievance-redressal.html' }
      ]
    };
  }

  if (intent === 'inspection') {
    let text = '';
    if (lang === 'ta') {
      text = `🔍 **சட்டப்பூர்வ தயாரிப்பு பரிசோதனை மற்றும் உண்மைத்தன்மை வழிகாட்டி**:\n\nதுல்லியமாக பரிசோதனை செய்ய:\n1. **📷 படம் / ஆவணத்தை பதிவேற்றவும்**: கேமரா அல்லது பின் ஐகானை கிளிக் செய்து தயாரிப்பு லேபிள் அல்லது ரசீதை ஸ்கேன் செய்யவும்.\n2. **அசல் OCR பிரித்தெடுத்தல்**: லேபிளிலிருந்து 10-இலக்க CM/L, 6-இலக்க HUID அல்லது CRS பதிவை தானாக எடுத்து BIS தரவுத்தளத்தில் சரிபார்க்கிறோம்.\n3. **1-கிளிக் தானியங்கி படிவம்**: பெறப்பட்ட உண்மையான விவரங்களை நேரடியாக புகார் அல்லது சரிபார்ப்பு படிவத்தில் உடனடியாக நிரப்பலாம்.`;
    } else if (lang === 'hi') {
      text = `🔍 **उत्पाद प्रमाणिकता एवं वैधानिक निरीक्षण मार्गदर्शिका**:\n\nसटीक निरीक्षण के लिए:\n1. **📷 फ़ोटो / दस्तावेज़ अपलोड करें**: उत्पाद लेबल, आईएसआई मार्क या बिल स्कैन करने के लिए कैमरा या पिन आइकन पर क्लिक करें।\n2. **वास्तविक OCR निष्कर्षण**: लेबल से 10-अंकीय CM/L, 6-अंकीय HUID या CRS लाइसेंस को सीधे निकालकर बीआईएस डेटाबेस में जांचा जाता है।\n3. **1-क्लिक ऑटोफ़िल**: प्राप्त वास्तविक विवरणों को सीधे शिकायत या सत्यापन फ़ॉर्म में बिना किसी टाइपिंग के भरें।`;
    } else {
      text = `🔍 **Statutory Product Inspection & Authenticity Guide**:\n\nTo perform an accurate inspection without guesswork:\n1. **📷 Upload Image / Document**: Click the camera/paperclip icon to scan the product label, hallmark, or invoice with our **Real Vision OCR** engine.\n2. **Verified Registry Lookup**: We extract the exact 10-digit CM/L, 6-digit HUID, or CRS registration and check it against the live BIS database.\n3. **1-Click Form Autofill**: Push verified details directly into the **Consumer Grievance Portal** or **e-Verification Suite** with zero manual typing.`;
    }

    return {
      text,
      suggestions: [
        lang === 'ta' ? 'படத்தை பதிவேற்றி தானாக நிரப்பவும்' : (lang === 'hi' ? 'फ़ोटो अपलोड करें' : 'Upload Image to Autofill'),
        t('chipVerifyIsi', lang),
        t('chipGrievance', lang)
      ],
      actions: [
        { text: '🔍 ' + t('navVerify', lang), url: 'verify-licence.html' },
        { text: '📝 ' + t('navGrievance', lang), url: 'grievance-redressal.html' },
        { text: '📖 ' + t('navStandards', lang), url: 'standards-search.html' }
      ]
    };
  }

  // General fallback
  let text = '';
  if (lang === 'ta') {
    text = `**இந்திய தரநிலைகள் பணியகம் (BIS) வழிகாட்டுதல்**:\n\n**"${data.query || 'BIS'}"** தொடர்பான தகவல்:\n\n• **BIS முதன்மை பணிகள்**: ISI முத்திரை சான்றிதழ், தங்க ஹால்மார்க்கிங் (HUID), மின்னணு பதிவு (CRS), மற்றும் LIMS ஆய்வக சோதனை ஆகியவற்றை BIS நிர்வகிக்கிறது.\n• **சரிபார்ப்பு மற்றும் தரநிலைகள்**: கீழேயுள்ள இணைப்புகள் மூலம் உரிமங்களை சரிபார்க்கலாம் அல்லது தரநிலைகளை தேடலாம்.`;
  } else if (lang === 'hi') {
    text = `**भारतीय मानक ब्यूरो (BIS) मार्गदर्शन**:\n\n**"${data.query || 'BIS'}"** के संबंध में:\n\n• **बीआईएस मुख्य कार्य**: बीआईएस उत्पाद प्रमाणन (आईएसआई मार्क), स्वर्ण हॉलमार्किंग (HUID), इलेक्ट्रॉनिक्स पंजीकरण (CRS) और LIMS प्रयोगशाला परीक्षण का प्रबंधन करता है।\n• **सत्यापन एवं मानक**: आप नीचे दिए गए शॉर्टकट का उपयोग करके लाइसेंस सत्यापित कर सकते हैं या मानक खोज सकते हैं।`;
  } else {
    text = `**Bureau of Indian Standards (BIS) Guidance**:\n\nRegarding **"${data.query || 'BIS'}"**:\n\n• **BIS Core Functions**: BIS is responsible for Product Certification (ISI Mark), Gold & Silver Hallmarking (HUID), Compulsory Electronics Registration (CRS), and LIMS Laboratory Testing.\n• **Verification & Standards**: You can query the e-Verification suite or Standards Catalog using the shortcuts below.`;
  }

  return {
    text,
    suggestions: [t('chipVerifyIsi', lang), t('chipPreviewStandard', lang), t('chipGrievance', lang)],
    actions: [
      { text: '🔍 ' + t('navVerify', lang), url: 'verify-licence.html' },
      { text: '📖 ' + t('navStandards', lang), url: 'standards-search.html' },
      { text: '📝 ' + t('navGrievance', lang), url: 'grievance-redressal.html' }
    ]
  };
}
