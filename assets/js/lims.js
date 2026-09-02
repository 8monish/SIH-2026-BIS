/**
 * BIS Portal — Laboratory Information Management System (LIMS) & Testing Portal
 * Lab directories, testing scope by product category, and sample testing fee estimator.
 */

const BIS_LABS_DATABASE = [
  {
    code: 'BIS-CL-01',
    name: 'BIS Central Laboratory (CL)',
    type: 'Central Apex Laboratory',
    location: 'Sahibabad, Ghaziabad (National Capital Region)',
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP - 201010',
    contact: '+91 120 4177100 | cl@bis.gov.in',
    departments: ['Chemical Lab', 'Microbiological Lab', 'Electrical & Electronics Lab', 'Mechanical Testing Lab', 'Civil & Building Materials Lab'],
    nablAccreditation: 'NABL TC-5012 (ISO/IEC 17025:2017)',
    highlight: 'Apex referral laboratory equipped with automated mass spectrometers and high-voltage impulse generators.'
  },
  {
    code: 'BIS-WRL-02',
    name: 'BIS Western Regional Laboratory (WRL)',
    type: 'Regional Laboratory',
    location: 'Andheri East, Mumbai, Maharashtra',
    address: 'Manakalaya, E-9, MIDC, Behind Marol Telephone Exchange, Andheri (East), Mumbai - 400093',
    contact: '+91 22 28329295 | wrl@bis.gov.in',
    departments: ['Chemical Testing', 'Gold & Silver Assaying', 'Electrical Appliances Safety', 'Plastics & Rubber Testing'],
    nablAccreditation: 'NABL TC-5104 (ISO/IEC 17025:2017)',
    highlight: 'High-throughput facility for electronic appliances, consumer durables, and gold hallmarking verification.'
  },
  {
    code: 'BIS-SRL-03',
    name: 'BIS Southern Regional Laboratory (SRL)',
    type: 'Regional Laboratory',
    location: 'Taramani, Chennai, Tamil Nadu',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
    contact: '+91 44 22541442 | srl@bis.gov.in',
    departments: ['Mechanical Testing (Pipes/Pumps)', 'Food & Agriculture Testing', 'Textiles & PPE Testing', 'Chemical Testing'],
    nablAccreditation: 'NABL TC-5219 (ISO/IEC 17025:2017)',
    highlight: 'Advanced testing facility for agricultural submersible pumps, HDPE/PVC piping systems, and packaged water.'
  },
  {
    code: 'BIS-ERL-04',
    name: 'BIS Eastern Regional Laboratory (ERL)',
    type: 'Regional Laboratory',
    location: 'Salt Lake City, Kolkata, West Bengal',
    address: '1/14, C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
    contact: '+91 33 23207080 | erl@bis.gov.in',
    departments: ['Metallurgical & Steel Testing', 'Jute & Textile Lab', 'Chemical Lab', 'Electrical Cables Testing'],
    nablAccreditation: 'NABL TC-5340 (ISO/IEC 17025:2017)',
    highlight: 'Specialized metallurgical laboratory for heavy structural steel, galvanized iron sheets, and mining cables.'
  },
  {
    code: 'BIS-NRL-05',
    name: 'BIS Northern Regional Laboratory (NRL)',
    type: 'Regional Laboratory',
    location: 'Mohali, Punjab / Chandigarh Tricity',
    address: 'Plot No. 4-A, Sector 27-B, Madhya Marg, Chandigarh - 160019',
    contact: '+91 172 2650206 | nrl@bis.gov.in',
    departments: ['Pesticide & Agrochemical Residue Lab', 'Cement & Concrete Testing', 'Food Testing Lab'],
    nablAccreditation: 'NABL TC-5412 (ISO/IEC 17025:2017)',
    highlight: 'State-of-the-art chromatographic testing for pesticide residues and organic food contaminants.'
  }
];

export function initLIMS() {
  const labListContainer = document.getElementById('lims-labs-container');

  if (labListContainer) {
    labListContainer.innerHTML = BIS_LABS_DATABASE.map(lab => `
      <div class="card p-6 reveal active hover-lift" style="border: 1px solid var(--color-border);">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span class="badge badge-primary">${lab.type}</span>
          <span class="badge badge-success font-mono text-xs">${lab.nablAccreditation}</span>
        </div>
        <h3 class="text-lg font-bold text-primary mb-1">${lab.name}</h3>
        <p class="text-xs text-muted mb-3 font-semibold">${lab.location}</p>
        <p class="text-xs text-muted mb-4" style="line-height: 1.5;">${lab.address}</p>

        <div class="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span class="text-xs text-primary font-bold block mb-1">Testing Divisions:</span>
          <div class="flex flex-wrap gap-1">
            ${lab.departments.map(d => `<span class="badge badge-primary" style="font-size: 10px;">${d}</span>`).join('')}
          </div>
        </div>

        <p class="text-xs text-muted mb-4" style="font-style: italic;">"${lab.highlight}"</p>

        <div class="pt-3 flex items-center justify-between text-xs text-muted" style="border-top: 1px solid var(--color-border);">
          <span>Phone: ${lab.contact}</span>
          <span class="font-mono text-accent font-bold">${lab.code}</span>
        </div>
      </div>
    `).join('');
  }

  // Sample Testing Fee Estimator
  const estimatorBtn = document.getElementById('btn-calc-testing-fee');
  if (estimatorBtn) {
    estimatorBtn.addEventListener('click', () => {
      const category = document.getElementById('test-product-category')?.value;
      const sampleCount = parseInt(document.getElementById('test-sample-qty')?.value || 1, 10);
      const isUrgent = document.getElementById('test-tat-urgency')?.checked;

      let baseFee = 4500;
      let standardName = 'IS Standard Compliance';
      let turnaroundDays = 14;

      switch(category) {
        case 'water':
          baseFee = 8500;
          standardName = 'IS 14543 / IS 13428 (Complete Chemical + Microbiological Parameters)';
          turnaroundDays = 10;
          break;
        case 'cement':
          baseFee = 6200;
          standardName = 'IS 269 / IS 1489 (Compressive Strength & Setting Time)';
          turnaroundDays = 28; // Standard 28-day curing
          break;
        case 'electronics':
          baseFee = 14500;
          standardName = 'IS 13252 (Electrical Safety, Creepage & Thermal Endurance)';
          turnaroundDays = 15;
          break;
        case 'helmet':
          baseFee = 9000;
          standardName = 'IS 4151 (Impact Attenuation & Retention Rigidity)';
          turnaroundDays = 7;
          break;
        case 'gold':
          baseFee = 1500;
          standardName = 'IS 1417 (Fire Assay + XRF Multi-point Verification)';
          turnaroundDays = 2;
          break;
        case 'steel':
          baseFee = 7800;
          standardName = 'IS 1786 / IS 2062 (Tensile, Bend & Spectrometric Chemical Test)';
          turnaroundDays = 5;
          break;
      }

      if (isUrgent) {
        baseFee = baseFee * 1.5;
        turnaroundDays = Math.max(Math.round(turnaroundDays * 0.6), 1);
      }

      const totalFee = baseFee * sampleCount;
      const gstAmount = Math.round(totalFee * 0.18);
      const finalAmount = totalFee + gstAmount;

      const resultContainer = document.getElementById('estimator-result-box');
      if (resultContainer) {
        resultContainer.innerHTML = `
          <div class="p-6 rounded-xl mt-4" style="background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%); border: 1.5px solid var(--color-primary);">
            <div class="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2" style="border-bottom: 1px dashed rgba(0,48,130,0.2);">
              <span class="badge badge-primary">TEST ESTIMATION BREAKDOWN</span>
              <span class="text-xs font-bold text-success">Estimated TAT: ${turnaroundDays} Working Days</span>
            </div>

            <div class="text-xs text-muted mb-2">Standard Protocol: <strong class="text-primary">${standardName}</strong></div>

            <div class="grid grid-2 gap-4 my-4">
              <div class="p-3 bg-white rounded-lg border border-gray-100">
                <span class="text-xs text-muted block">Testing Charges (${sampleCount} sample${sampleCount > 1 ? 's' : ''})</span>
                <strong class="text-base text-primary">₹${totalFee.toLocaleString('en-IN')}</strong>
              </div>
              <div class="p-3 bg-white rounded-lg border border-gray-100">
                <span class="text-xs text-muted block">Applicable GST (18%)</span>
                <strong class="text-base text-muted">₹${gstAmount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2">
              <span class="text-sm font-bold text-primary">Total Estimated Fee:</span>
              <span class="text-2xl font-extrabold text-accent">₹${finalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        `;
      }
    });
  }
}
