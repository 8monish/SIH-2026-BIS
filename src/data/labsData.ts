import { TestingLab } from '../types/bis';

export const BIS_LABS_DATABASE: TestingLab[] = [
  {
    id: 'lab-cl-sahibabad',
    name: 'BIS Central Laboratory (CL)',
    labType: 'BIS Central Lab',
    city: 'Sahibabad (Ghaziabad)',
    state: 'Uttar Pradesh (NCR)',
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP - 201010',
    email: 'cl@bis.gov.in',
    phone: '+91-120-4177100',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 13252 (Part 1):2010', 'IS 16046 (Part 2):2018', 'IS 4151:2015', 'IS 1489 (Part 1):2015', 'IS 1786:2008', 'IS 9873 (Part 1):2019', 'IS 15885 (Part 2/Sec 13):2012'],
    turnaroundDays: 14,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-wrol-mumbai',
    name: 'BIS Western Regional Office Laboratory (WROL)',
    labType: 'BIS Regional Lab',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Manakalaya, E9, MIDC, Behind Marol Telephone Exchange, Andheri (East), Mumbai - 400093',
    email: 'wrol@bis.gov.in',
    phone: '+91-22-28329295',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 1417:2016', 'IS 13252 (Part 1):2010', 'IS 4151:2015', 'IS 1786:2008'],
    turnaroundDays: 12,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-srol-chennai',
    name: 'BIS Southern Regional Office Laboratory (SROL)',
    labType: 'BIS Regional Lab',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
    email: 'srol@bis.gov.in',
    phone: '+91-44-22541442',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 16046 (Part 2):2018', 'IS 13252 (Part 1):2010', 'IS 15885 (Part 2/Sec 13):2012'],
    turnaroundDays: 14,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-erol-kolkata',
    name: 'BIS Eastern Regional Office Laboratory (EROL)',
    labType: 'BIS Regional Lab',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '1/14 C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
    email: 'erol@bis.gov.in',
    phone: '+91-33-23207085',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 1489 (Part 1):2015', 'IS 1786:2008', 'IS 9873 (Part 1):2019'],
    turnaroundDays: 15,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-nrol-mohali',
    name: 'BIS Northern Regional Office Laboratory (NROL)',
    labType: 'BIS Regional Lab',
    city: 'Mohali / Chandigarh',
    state: 'Punjab',
    address: 'Plot No. 4A, Sector 27-B, Madhya Marg, Chandigarh - 160019',
    email: 'nrol@bis.gov.in',
    phone: '+91-172-2650206',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 4151:2015', 'IS 1489 (Part 1):2015'],
    turnaroundDays: 12,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-tuv-bengaluru',
    name: 'TUV Rheinland India (NABL & BIS Recognized Lab)',
    labType: 'NABL Accredited Recognized',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '27/B, 2nd Cross Road, Electronic City Phase 1, Hosur Road, Bengaluru - 560100',
    email: 'info-india@tuv.com',
    phone: '+91-80-46498000',
    recognizedStandards: ['IS 13252 (Part 1):2010', 'IS 16046 (Part 2):2018', 'IS 15885 (Part 2/Sec 13):2012'],
    turnaroundDays: 10,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-sgs-gurugram',
    name: 'SGS India Testing Services (NABL Accredited)',
    labType: 'NABL Accredited Recognized',
    city: 'Gurugram',
    state: 'Haryana',
    address: 'Plot No. 250, Udyog Vihar Phase IV, Gurugram - 122015',
    email: 'in.cts.gurgaon@sgs.com',
    phone: '+91-124-6060070',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 9873 (Part 1):2019'],
    turnaroundDays: 8,
    isSampleDropoffCenter: true
  },
  {
    id: 'lab-shriram-delhi',
    name: 'Shriram Institute for Industrial Research (SIIR)',
    labType: 'NABL Accredited Recognized',
    city: 'New Delhi',
    state: 'Delhi',
    address: '19, University Road, Delhi - 110007',
    email: 'customercare@shriraminstitute.org',
    phone: '+91-11-27667267',
    recognizedStandards: ['IS 10500:2012', 'IS 14543:2004', 'IS 1489 (Part 1):2015', 'IS 1786:2008'],
    turnaroundDays: 9,
    isSampleDropoffCenter: true
  }
];
