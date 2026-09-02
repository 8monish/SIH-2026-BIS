import { IndianStandard } from '../types/bis';

export const BIS_STANDARDS_DATABASE: IndianStandard[] = [
  {
    id: 'is-10500',
    isNumber: 'IS 10500:2012',
    title: 'Drinking Water Specification (Second Revision)',
    productName: 'Drinking Water & Municipal Water Supplies',
    category: 'Food & Agriculture',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'S.O. 1298(E) / MoAFW',
    ministry: 'Ministry of Jal Shakti / FSSAI',
    scopeSummary: 'Prescribes physical, chemical, and bacteriological requirements, sampling methods, and tests for drinking water supplied to consumers.',
    keyClauses: [
      { clauseNumber: 'Clause 4.1', title: 'Physical Characteristics', description: 'Turbidity (max 1 NTU), pH (6.5 to 8.5), Total Dissolved Solids (max 500 mg/L).', mandatoryTest: true },
      { clauseNumber: 'Clause 4.2', title: 'Chemical & Toxic Substances', description: 'Lead (max 0.01 mg/L), Arsenic (max 0.01 mg/L), Fluoride (max 1.0 mg/L), Nitrate (max 45 mg/L).', mandatoryTest: true },
      { clauseNumber: 'Clause 4.3', title: 'Bacteriological Quality', description: 'E. coli or thermotolerant coliform bacteria must NOT be detectable in any 100 ml sample.', mandatoryTest: true },
      { clauseNumber: 'Clause 5.1', title: 'Packaging and Marking', description: 'Marking with Standard Mark (ISI) after certification is granted.', mandatoryTest: true }
    ],
    requiredTests: [
      'Turbidity and pH Value Test',
      'Total Hardness as CaCO3',
      'Heavy Metals Analysis (ICP-MS for Pb, As, Cd)',
      'Membrane Filtration Coliform Count',
      'Pesticide Residue Limits (GC-MS/MS)'
    ],
    sampleSize: '5 Litres in sterilized glass/food-grade HDPE containers + 100 ml microbiological sample',
    turnaroundTimeWeeks: 3,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 10000,
    markingFeeFormula: 'Unit rate: ₹35 per 10,000 Litres packaged',
    applicableToMSME: true,
    substitutesOrKeywords: ['water', 'drinking water', 'tap water', 'borewell', 'water purifier', 'municipal water']
  },
  {
    id: 'is-14543',
    isNumber: 'IS 14543:2004',
    title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water)',
    productName: 'Packaged Drinking Water (Bottled & Jar Water)',
    category: 'Food & Agriculture',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'F. No. 1(10)2020-FSSAI / S.O. 245(E)',
    ministry: 'Ministry of Consumer Affairs & FSSAI',
    scopeSummary: 'Mandatory standard for processing, filling, sealing, and testing packaged drinking water in bottles, pouches, and 20L jars.',
    keyClauses: [
      { clauseNumber: 'Clause 3.2', title: 'Treatment Requirements', description: 'Water shall be subjected to treatments including filtration, aeration, reverse osmosis, and disinfection (UV/Ozonation).', mandatoryTest: true },
      { clauseNumber: 'Clause 5.2', title: 'Microbiological Safety', description: 'Total viable colony count at 20-22°C and 37°C, absence of coliforms, Faecal streptococci, Pseudomonas aeruginosa, and Yeast/Mould.', mandatoryTest: true },
      { clauseNumber: 'Clause 5.3', title: 'Radioactive Residues & Pesticides', description: 'Individual pesticide residue shall not exceed 0.0001 mg/l and total pesticides max 0.0005 mg/l.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.1', title: 'In-house Lab Facilities', description: 'Manufacturer must possess mandatory in-house microbiological and physical-chemical testing laboratory.', mandatoryTest: true }
    ],
    requiredTests: [
      'Microbiological Screening (Pseudomonas aeruginosa, Coliforms)',
      'Pesticide Residues (Organochlorine & Organophosphorus)',
      'Radioactive Residues (Alpha & Beta activity)',
      'Shelf-life Accelerated Degradation Testing'
    ],
    sampleSize: '30 Bottles of 1 Litre or 15 Jars of 20 Litres drawn from 3 distinct production batches',
    turnaroundTimeWeeks: 4,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 10000,
    markingFeeFormula: '₹95,000 minimum or ₹0.15 per 1000 Litres',
    applicableToMSME: true,
    substitutesOrKeywords: ['packaged water', 'bottled water', 'mineral water', 'ro plant', 'water jar', 'bisleri', 'aquafina']
  },
  {
    id: 'is-13252-1',
    isNumber: 'IS 13252 (Part 1):2010',
    title: 'Information Technology Equipment - Safety (General Requirements)',
    productName: 'Laptops, Tablets, Routers, Mobile Phones, Printers & Power Adapters',
    category: 'Electronics & IT',
    scheme: 'Scheme-II',
    isMandatory: true,
    qcoNotificationNumber: 'MeitY Electronics and IT Goods (Requirement for Compulsory Registration) Order',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    scopeSummary: 'Applicable to mains-powered or battery-powered information technology equipment, including business electrical equipment and telecom terminal equipment.',
    keyClauses: [
      { clauseNumber: 'Clause 1.5', title: 'Components & Insulation', description: 'Safety insulation, creepage distances, and clearance for components carrying hazardous voltages.', mandatoryTest: true },
      { clauseNumber: 'Clause 2.1', title: 'Protection from Electric Shock', description: 'Accessibility of live parts, test finger probing, and discharge of stored energy.', mandatoryTest: true },
      { clauseNumber: 'Clause 4.5', title: 'Thermal & Fire Safety', description: 'Temperature rise limits during normal and abnormal operating conditions to prevent ignition.', mandatoryTest: true },
      { clauseNumber: 'Clause 5.1', title: 'Touch Current and Protective Conductor Current', description: 'Touch current limits (< 0.25 mA for Class II equipment).', mandatoryTest: true }
    ],
    requiredTests: [
      'Electric Shock & Dielectric Breakdown Test',
      'Temperature Rise & Thermal Stress (Fluke Data Logger)',
      'Drop & Mechanical Impact Testing (Spring Hammer 0.5J)',
      'Flame Retardancy & Glow Wire Test (UL 94 / IEC 60695)'
    ],
    sampleSize: '2 finished representative units + 1 sealed power adapter unit',
    turnaroundTimeWeeks: 3,
    applicationFeeINR: 2000,
    annualLicenseFeeINR: 20000,
    markingFeeFormula: 'Self-declaration CRS logo registration with standard R-number',
    applicableToMSME: true,
    substitutesOrKeywords: ['laptop', 'tablet', 'mobile phone', 'router', 'adapter', 'charger', 'computer', 'smart watch', 'crs', 'meity']
  },
  {
    id: 'is-16046-2',
    isNumber: 'IS 16046 (Part 2):2018',
    title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)',
    productName: 'Lithium-ion Batteries, EV Battery Packs & Powerbanks',
    category: 'Electronics & IT',
    scheme: 'Scheme-II',
    isMandatory: true,
    qcoNotificationNumber: 'S.O. 1827(E) MeitY Notification',
    ministry: 'Ministry of Electronics and IT / MoRTH',
    scopeSummary: 'Safety requirements for portable sealed secondary lithium cells, and for batteries made from them, for use in portable and automotive applications.',
    keyClauses: [
      { clauseNumber: 'Clause 7.2.1', title: 'Continuous Charging at Constant Voltage', description: 'Ensures safety and thermal stability during prolonged overcharging.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.3.2', title: 'External Short-Circuit Test', description: 'Short circuit applied at 55°C until cell cools or vents safely without fire or explosion.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.3.3', title: 'Free Fall & Mechanical Shock', description: 'Dropped from 1.0 m height onto concrete surface in multiple orientations.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.3.6', title: 'Crush & Nail Penetration Test', description: 'Simulates mechanical crash or puncture integrity of the cell pack.', mandatoryTest: true }
    ],
    requiredTests: [
      'Overcharge Protection & Thermal Runaway Test',
      'External Short Circuit (55°C)',
      'Drop & Vibration Endurance Test (MIL-STD-810G compliant)',
      'Thermal Abuse Chamber (130°C for 10 min)'
    ],
    sampleSize: '25 cells and 10 battery packs with BMS circuitry',
    turnaroundTimeWeeks: 4,
    applicationFeeINR: 2000,
    annualLicenseFeeINR: 25000,
    markingFeeFormula: 'CRS Registration R-Number per battery family',
    applicableToMSME: true,
    substitutesOrKeywords: ['lithium', 'li-ion', 'battery', 'ev battery', 'powerbank', 'bms', 'cell', 'electric vehicle battery']
  },
  {
    id: 'is-4151',
    isNumber: 'IS 4151:2015',
    title: 'Protective Helmets for Two-Wheeler Motorcyclists',
    productName: 'Two-Wheeler Helmets & Head Protection',
    category: 'Mechanical & Automotive',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'S.O. 3822(E) / MoRTH Helmets (Quality Control) Order',
    ministry: 'Ministry of Road Transport and Highways (MoRTH)',
    scopeSummary: 'Specifies constructional, dimensional, performance, and testing requirements for helmets intended for two-wheeler motorcyclists across India.',
    keyClauses: [
      { clauseNumber: 'Clause 6.1', title: 'Impact Absorption Test', description: 'Drop test at 7.5 m/s onto flat and hemispherical steel anvils; peak headform acceleration must not exceed 300g.', mandatoryTest: true },
      { clauseNumber: 'Clause 6.2', title: 'Retention System & Chin Strap Strength', description: 'Dynamic load test ensuring chin strap elongation and buckle slippage are within limits.', mandatoryTest: true },
      { clauseNumber: 'Clause 6.3', title: 'Visor Optical & Scratch Resistance', description: 'Light transmission minimum 85%, scratch resistance, and no shatter on high-velocity projectile impact.', mandatoryTest: true },
      { clauseNumber: 'Clause 8.1', title: 'ISI Marking & Weight Limits', description: 'Helmet weight must not exceed 1.2 kg and must display permanent ISI embossed mark.', mandatoryTest: true }
    ],
    requiredTests: [
      'Impact Attenuation Drop Test with Tri-axial Accelerometer',
      'Retention System Dynamic Elongation Test',
      'Visor Luminous Transmittance & Haze Test',
      'Conditioning (High Temp 50°C, Low Temp -10°C, Water Immersion)'
    ],
    sampleSize: '12 finished helmets across all size ranges (Small, Medium, Large)',
    turnaroundTimeWeeks: 3,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 15000,
    markingFeeFormula: '₹2.50 per certified helmet manufactured',
    applicableToMSME: true,
    substitutesOrKeywords: ['helmet', 'two wheeler helmet', 'bike helmet', 'headgear', 'morth', 'rider safety']
  },
  {
    id: 'is-1417',
    isNumber: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking',
    productName: 'Gold Jewellery & Artefacts (Hallmarking)',
    category: 'Gold & Silver Hallmarking',
    scheme: 'Scheme-V',
    isMandatory: true,
    qcoNotificationNumber: 'Hallmarking of Gold Jewellery Order 2020 (S.O. 121(E))',
    ministry: 'Ministry of Consumer Affairs, Food and Public Distribution',
    scopeSummary: 'Mandatory hallmarking system specifying purity grades (14K, 18K, 20K, 22K, 23K, 24K) and 6-digit alphanumeric HUID marking.',
    keyClauses: [
      { clauseNumber: 'Clause 4.1', title: 'Purity Grades & Fineness', description: '24K (995+ fineness), 22K (916 fineness), 18K (750 fineness), 14K (585 fineness).', mandatoryTest: true },
      { clauseNumber: 'Clause 5.1', title: 'Assaying & Fire Assay Test', description: 'Cupellation (fire assay) method for gold determination as per IS 1418.', mandatoryTest: true },
      { clauseNumber: 'Clause 6.2', title: 'HUID Laser Marking', description: 'Laser engraving of BIS Logo, Fineness mark, and 6-digit unique HUID code generated via portal.', mandatoryTest: true }
    ],
    requiredTests: [
      'Fire Assay / Cupellation Test (IS 1418)',
      'X-Ray Fluorescence (XRF) Non-destructive Composition Scan',
      'Density and Touchstone Preliminary Check'
    ],
    sampleSize: 'Representative batch sample assayed at BIS Recognized Assaying & Hallmarking Centre (AHC)',
    turnaroundTimeWeeks: 1,
    applicationFeeINR: 0,
    annualLicenseFeeINR: 7500,
    markingFeeFormula: '₹45 per gold article marked at AHC centre',
    applicableToMSME: true,
    substitutesOrKeywords: ['gold', 'jewellery', 'hallmark', 'huid', '22k', '18k', 'gold bar', 'ornaments', 'silver', 'assaying']
  },
  {
    id: 'is-1489-1',
    isNumber: 'IS 1489 (Part 1):2015',
    title: 'Portland Pozzolana Cement - Specification (Fly Ash Based)',
    productName: 'PPC Cement & Construction Binders',
    category: 'Civil & Construction',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'Cement (Quality Control) Order, 2003 / DPIIT',
    ministry: 'Ministry of Commerce & Industry (DPIIT)',
    scopeSummary: 'Covers manufacture and physical/chemical requirements of fly ash based Portland pozzolana cement for structural concrete and masonry.',
    keyClauses: [
      { clauseNumber: 'Clause 6.1', title: 'Chemical Requirements', description: 'Insoluble residue max 4.0%, Magnesia max 6.0%, Sulphuric anhydride (SO3) max 3.5%.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.1', title: 'Compressive Strength', description: '72h >= 16 MPa, 168h >= 22 MPa, 672h (28 days) >= 33 MPa.', mandatoryTest: true },
      { clauseNumber: 'Clause 7.2', title: 'Setting Time & Soundness', description: 'Initial setting time >= 30 min, Final <= 600 min. Le-Chatelier expansion <= 10 mm.', mandatoryTest: true }
    ],
    requiredTests: [
      'Compressive Strength (Vibration Machine & Mortar Cubes)',
      'Le-Chatelier Soundness & Autoclave Expansion',
      'Initial & Final Setting Time by Vicat Apparatus',
      'Fly Ash Percentage Verification via Selective Dissolution'
    ],
    sampleSize: '15 kg sealed composite sample from 3 consecutive silos/packing runs',
    turnaroundTimeWeeks: 5,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 25000,
    markingFeeFormula: '₹14 per metric tonne of PPC produced',
    applicableToMSME: true,
    substitutesOrKeywords: ['cement', 'ppc cement', 'construction', 'concrete', 'building material', 'fly ash cement']
  },
  {
    id: 'is-15885-2-13',
    isNumber: 'IS 15885 (Part 2/Sec 13):2012',
    title: 'Safety of Lamp Controlgear (Electronic Controlgear for LED Modules)',
    productName: 'LED Drivers & SMPS Power Supplies for Lighting',
    category: 'Electronics & IT',
    scheme: 'Scheme-II',
    isMandatory: true,
    qcoNotificationNumber: 'MeitY Electronics QCO Phase 2',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    scopeSummary: 'Safety and performance requirements for d.c. or a.c. supplied electronic controlgear for LED modules used in consumer and commercial lighting.',
    keyClauses: [
      { clauseNumber: 'Clause 8.1', title: 'Protection Against Electric Shock', description: 'Enclosure protection, insulation resistance (> 2 MΩ at 500V DC).', mandatoryTest: true },
      { clauseNumber: 'Clause 12.1', title: 'Thermal Endurance & Heating', description: 'Winding temperature limits (tw) and maximum case temperature (tc).', mandatoryTest: true },
      { clauseNumber: 'Clause 14.1', title: 'Fault Condition Testing', description: 'Output short circuit, open circuit, and component failure simulation.', mandatoryTest: true }
    ],
    requiredTests: [
      'Insulation Resistance & High Voltage Dielectric Test (1.5 kV)',
      'Case Temperature tc Thermal Cycling',
      'Overload and Output Short Circuit Safety',
      'Surge Immunity Test (2 kV to 4 kV)'
    ],
    sampleSize: '3 representative drivers with complete circuit diagrams and BOM',
    turnaroundTimeWeeks: 2,
    applicationFeeINR: 2000,
    annualLicenseFeeINR: 18000,
    markingFeeFormula: 'Self-declaration CRS logo registration with R-number',
    applicableToMSME: true,
    substitutesOrKeywords: ['led driver', 'smps', 'power supply', 'lighting driver', 'led bulb driver', 'lamp controlgear']
  },
  {
    id: 'is-1786',
    isNumber: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
    productName: 'TMT Steel Bars (Fe 415, Fe 500, Fe 550, Fe 600)',
    category: 'Civil & Construction',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'Steel and Steel Products (Quality Control) Order / Ministry of Steel',
    ministry: 'Ministry of Steel',
    scopeSummary: 'Specifies manufacturing processes, chemical compositions, tensile properties, bend test, and rib geometry for TMT rebar used in reinforced concrete.',
    keyClauses: [
      { clauseNumber: 'Clause 4.2', title: 'Chemical Composition', description: 'Carbon max 0.25-0.30%, Sulphur max 0.045%, Phosphorus max 0.045%, S+P max 0.085%.', mandatoryTest: true },
      { clauseNumber: 'Clause 8.1', title: 'Tensile & Proof Stress', description: '0.2% proof stress / yield stress, Tensile strength to Yield ratio (TS/YS >= 1.12 for Fe 500D).', mandatoryTest: true },
      { clauseNumber: 'Clause 9.1', title: 'Bend & Rebend Test', description: '180° cold bend around mandrel without transverse rupture or cracking.', mandatoryTest: true }
    ],
    requiredTests: [
      'Universal Testing Machine (UTM) Tensile & Yield Stress',
      'Bend & Rebend Cold Mandrel Test',
      'Optical Emission Spectrometry (OES) Chemical Analysis',
      'Rib Height, Pitch & Projected Area Verification'
    ],
    sampleSize: '6 test pieces of 1 metre length per heat/batch diameter',
    turnaroundTimeWeeks: 3,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 30000,
    markingFeeFormula: '₹12 per metric tonne produced',
    applicableToMSME: true,
    substitutesOrKeywords: ['tmt bar', 'steel rebar', 'reinforcement steel', 'fe 500', 'fe 550d', 'steel rod', 'construction steel']
  },
  {
    id: 'is-9873-1',
    isNumber: 'IS 9873 (Part 1):2019',
    title: 'Safety of Toys - Mechanical and Physical Properties',
    productName: 'Children Toys & Electronic Playthings',
    category: 'Mechanical & Automotive',
    scheme: 'Scheme-I',
    isMandatory: true,
    qcoNotificationNumber: 'Toys (Quality Control) Order, 2020 / DPIIT',
    ministry: 'Ministry of Commerce & Industry (DPIIT)',
    scopeSummary: 'Safety requirements for toys intended for use by children under 14 years of age to prevent choking, sharp edges, and pinch hazards.',
    keyClauses: [
      { clauseNumber: 'Clause 4.1', title: 'Small Parts Cylinder Test', description: 'Any toy intended for children under 36 months must not contain parts fitting into small parts cylinder (choking hazard).', mandatoryTest: true },
      { clauseNumber: 'Clause 4.7', title: 'Sharp Edges and Points', description: 'No accessible sharp edges or sharp points capable of causing cuts or punctures.', mandatoryTest: true },
      { clauseNumber: 'Clause 4.18', title: 'Acoustic Sound Pressure', description: 'Peak sound level max 85 dB for close-to-the-ear toys.', mandatoryTest: true }
    ],
    requiredTests: [
      'Small Parts Cylinder Aspiration Check',
      'Drop, Impact and Torque Mechanical Safety Test',
      'Heavy Metals Migration Analysis (Pb, Cd, Hg, Cr via ICP-OES)',
      'Flammability and Burning Rate (IS 9873 Part 2)'
    ],
    sampleSize: '6 identical finished retail packaged toy samples',
    turnaroundTimeWeeks: 2,
    applicationFeeINR: 1000,
    annualLicenseFeeINR: 10000,
    markingFeeFormula: '₹0.50 per certified toy unit marked',
    applicableToMSME: true,
    substitutesOrKeywords: ['toys', 'kids toys', 'plastic toys', 'educational toys', 'dolls', 'action figures', 'toy car']
  }
];
