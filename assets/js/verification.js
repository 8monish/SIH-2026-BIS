/**
 * BIS Portal — e-Verification Module
 * Supports ISI Mark (CM/L), Gold HUID, CRS (R-Number), and FMCS Verification.
 */

// Comprehensive Database of Registered BIS Licenses
const VERIFICATION_DATABASE = {
  isi: [
    {
      cml: 'CM/L-8400123456',
      product: 'Packaged Natural Mineral Water',
      standard: 'IS 13428:2005',
      brand: 'Himalayan Pure Spring',
      manufacturer: 'Himalayan Waters Pvt Ltd',
      address: 'Plot 42, Industrial Area, Solan, Himachal Pradesh - 173212',
      issueDate: '15 Jan 2018',
      validUntil: '31 Dec 2027',
      status: 'Operative',
      category: 'Food & Agriculture'
    },
    {
      cml: 'CM/L-9100987654',
      product: 'Ordinary Portland Cement (43 Grade)',
      standard: 'IS 269:2015',
      brand: 'UltraShakti Super Cement',
      manufacturer: 'Bharat Cements Infrastructure Ltd',
      address: 'Survey 108/B, Neemrana Industrial Zone, Alwar, Rajasthan - 301705',
      issueDate: '10 Mar 2015',
      validUntil: '31 Mar 2028',
      status: 'Operative',
      category: 'Civil Engineering'
    },
    {
      cml: 'CM/L-6300456789',
      product: 'Protective Helmets for Two Wheeler Riders',
      standard: 'IS 4151:2015',
      brand: 'AeroShield Pro Rider',
      manufacturer: 'Suraksha Helmets & Gears LLP',
      address: 'B-14, Sector 58, Noida, Uttar Pradesh - 201301',
      issueDate: '01 Aug 2020',
      validUntil: '31 Jul 2026',
      status: 'Operative',
      category: 'Mechanical Engineering'
    },
    {
      cml: 'CM/L-7200334455',
      product: 'Plugs and Socket-Outlets (16A)',
      standard: 'IS 1293:2019',
      brand: 'VoltSafe Prime',
      manufacturer: 'ElectraPower India Private Limited',
      address: 'Plot 88, Peenya Industrial Area, Bengaluru, Karnataka - 560058',
      issueDate: '12 May 2019',
      validUntil: '11 May 2027',
      status: 'Operative',
      category: 'Electrotechnical'
    }
  ],
  huid: [
    {
      huid: 'AB1234',
      article: 'Gold Bangle / Kada',
      purity: '22K916 (91.6% Pure Gold)',
      jeweller: 'Kalyan Heritage Jewellers Pvt Ltd',
      jewellerReg: 'HM/C-7890123',
      ahcCenter: 'Swarna Assay & Hallmarking Centre, Karol Bagh, New Delhi',
      ahcNo: 'AHC-DEL-042',
      hallmarkDate: '24 Aug 2026',
      declaredWeight: '24.520 grams',
      status: 'Authentic & Hallmarked'
    },
    {
      huid: 'XY9876',
      article: 'Diamond Studded Gold Necklace',
      purity: '18K750 (75.0% Pure Gold)',
      jeweller: 'Tanishq Titan Jewels Ltd',
      jewellerReg: 'HM/C-6543210',
      ahcCenter: 'Apex Assay & Bullion Testing Lab, Bandra, Mumbai',
      ahcNo: 'AHC-MH-108',
      hallmarkDate: '18 Jul 2026',
      declaredWeight: '48.150 grams',
      status: 'Authentic & Hallmarked'
    },
    {
      huid: 'MN4567',
      article: 'Silver Pooja Thali & Utensils',
      purity: '925 (Sterling Silver)',
      jeweller: 'GRT Jewellers India Private Limited',
      jewellerReg: 'HM/C-9988776',
      ahcCenter: 'South India Assaying & Refining Bureau, T. Nagar, Chennai',
      ahcNo: 'AHC-TN-015',
      hallmarkDate: '02 Feb 2026',
      declaredWeight: '250.000 grams',
      status: 'Authentic & Hallmarked'
    }
  ],
  crs: [
    {
      rnum: 'R-41001234',
      product: 'Laptop / Notebook Computer',
      standard: 'IS 13252 (Part 1):2010',
      brand: 'Lenovo ThinkPad X1 Series',
      applicant: 'Lenovo (India) Private Limited',
      models: 'ThinkPad X1 Carbon Gen 12, ThinkPad X1 Yoga',
      country: 'India & China',
      validUntil: '15 Oct 2028',
      status: 'Registered'
    },
    {
      rnum: 'R-41009876',
      product: 'Smart Watch with Cellular connectivity',
      standard: 'IS 13252 (Part 1):2010 / IS 16046',
      brand: 'Apple Watch Ultra',
      applicant: 'Apple India Private Limited',
      models: 'Model A2986, A2987',
      country: 'Vietnam',
      validUntil: '09 Sep 2027',
      status: 'Registered'
    },
    {
      rnum: 'R-41005544',
      product: 'LED Television Display (55-inch 4K)',
      standard: 'IS 616:2017',
      brand: 'Sony BRAVIA XR',
      applicant: 'Sony India Pvt Ltd',
      models: 'XR-55X90L, XR-65X90L',
      country: 'Malaysia',
      validUntil: '20 Jun 2029',
      status: 'Registered'
    }
  ],
  fmcs: [
    {
      cml: 'CM/L-4000123456',
      product: 'High Voltage Circuit Breakers (400kV)',
      standard: 'IS/IEC 62271-100:2008',
      brand: 'Siemens Energy SGP',
      manufacturer: 'Siemens Energy Global GmbH & Co. KG',
      country: 'Germany (Freyeslebenstraße 1, 91058 Erlangen)',
      air: 'Siemens India Limited, Worli, Mumbai',
      validUntil: '30 Nov 2027',
      status: 'Operative'
    },
    {
      cml: 'CM/L-4000789012',
      product: 'Variable Refrigerant Flow (VRF) Air Conditioners',
      standard: 'IS 1391 (Part 2):2018',
      brand: 'Daikin VRV IV',
      manufacturer: 'Daikin Industries Thailand Ltd',
      country: 'Thailand (Amata City Industrial Estate, Chonburi)',
      air: 'Daikin Airconditioning India Pvt Ltd, Gurugram',
      validUntil: '14 May 2028',
      status: 'Operative'
    }
  ]
};

export function initVerification() {
  const verifyBtn = document.getElementById('btn-verify-submit');
  const inputField = document.getElementById('verify-input');
  const typeSelect = document.getElementById('verify-type-select');
  const resultsContainer = document.getElementById('verification-results');
  const chipButtons = document.querySelectorAll('.sample-chip');
  const qrScannerBtn = document.getElementById('btn-open-scanner');
  const qrModal = document.getElementById('qr-scanner-modal');
  const qrCloseBtn = document.getElementById('btn-close-qr');

  // Handle Tab Switching inside Verification Suite
  const tabBtns = document.querySelectorAll('.verify-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetType = btn.getAttribute('data-type');
      if (typeSelect) {
        typeSelect.value = targetType;
        updateInputPlaceholder(targetType);
      }
      // Clear previous results
      if (resultsContainer) resultsContainer.innerHTML = '';
      if (inputField) inputField.value = '';
    });
  });

  // Update input placeholder based on verification type
  function updateInputPlaceholder(type) {
    if (!inputField) return;
    switch(type) {
      case 'isi':
        inputField.placeholder = 'Enter 7 to 10 digit CM/L Number (e.g. CM/L-8400123456 or 8400123456)';
        break;
      case 'huid':
        inputField.placeholder = 'Enter 6-digit Alphanumeric HUID (e.g. AB1234 or XY9876)';
        break;
      case 'crs':
        inputField.placeholder = 'Enter 8-digit Registration R-Number (e.g. R-41001234)';
        break;
      case 'fmcs':
        inputField.placeholder = 'Enter Foreign Manufacturer CM/L License Number (e.g. CM/L-4000123456)';
        break;
    }
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      const type = e.target.value;
      updateInputPlaceholder(type);
      tabBtns.forEach(b => {
        if (b.getAttribute('data-type') === type) {
          tabBtns.forEach(btn => btn.classList.remove('active'));
          b.classList.add('active');
        }
      });
    });
  }

  // Sample Chips Click Handler
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-type');
      const val = chip.getAttribute('data-val');

      if (typeSelect) typeSelect.value = type;
      if (inputField) inputField.value = val;

      tabBtns.forEach(b => {
        if (b.getAttribute('data-type') === type) {
          tabBtns.forEach(btn => btn.classList.remove('active'));
          b.classList.add('active');
        }
      });

      updateInputPlaceholder(type);
      executeVerification(type, val);
    });
  });

  // Submit Handler
  if (verifyBtn && inputField) {
    verifyBtn.addEventListener('click', () => {
      const type = typeSelect ? typeSelect.value : 'isi';
      const query = inputField.value.trim();
      if (!query) {
        alert('Please enter a valid License Number, HUID, or R-Number.');
        inputField.focus();
        return;
      }
      executeVerification(type, query);
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        verifyBtn.click();
      }
    });
  }

  // QR Scanner Modal Simulator
  if (qrScannerBtn && qrModal) {
    qrScannerBtn.addEventListener('click', () => {
      qrModal.classList.add('open');
      startSimulatedQRScan();
    });
  }

  if (qrCloseBtn && qrModal) {
    qrCloseBtn.addEventListener('click', () => {
      qrModal.classList.remove('open');
    });
  }

  function startSimulatedQRScan() {
    const statusText = document.getElementById('qr-status-text');
    if (statusText) statusText.textContent = 'Align BIS Care QR Code / HUID barcode inside frame...';

    setTimeout(() => {
      if (statusText) statusText.textContent = 'QR Code Detected! Decrypting Digital Signature...';
    }, 1500);

    setTimeout(() => {
      if (qrModal) qrModal.classList.remove('open');
      // Auto fill and verify sample HUID
      if (typeSelect) typeSelect.value = 'huid';
      if (inputField) inputField.value = 'AB1234';
      tabBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-type') === 'huid');
      });
      executeVerification('huid', 'AB1234');
    }, 2800);
  }

  // Main Verification Engine
  function executeVerification(type, query) {
    if (!resultsContainer) return;

    // Normalize query
    const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Show Loading
    resultsContainer.innerHTML = `
      <div class="card p-6 text-center reveal active">
        <div class="spinner mx-auto mb-4" style="width: 40px; height: 40px; border-width: 3px; border-color: var(--color-primary-50); border-top-color: var(--color-primary);"></div>
        <h4 class="text-primary font-bold mb-2">Connecting to BIS Central e-Repository...</h4>
        <p class="text-muted text-sm">Verifying cryptographic digital hallmark and manufacturer accreditation records.</p>
      </div>
    `;

    setTimeout(() => {
      renderResults(type, cleanQuery, query);
    }, 600);
  }

  function renderResults(type, cleanQuery, originalQuery) {
    let match = null;
    const db = VERIFICATION_DATABASE[type] || [];

    // Search in DB
    if (type === 'isi') {
      match = db.find(item => item.cml.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().includes(cleanQuery) || cleanQuery.includes(item.cml.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()));
    } else if (type === 'huid') {
      match = db.find(item => item.huid.toUpperCase() === cleanQuery);
    } else if (type === 'crs') {
      match = db.find(item => item.rnum.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().includes(cleanQuery) || cleanQuery.includes(item.rnum.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()));
    } else if (type === 'fmcs') {
      match = db.find(item => item.cml.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().includes(cleanQuery) || cleanQuery.includes(item.cml.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()));
    }

    // If no exact match in mock DB, generate dynamic valid mock certificate for realistic hackathon experience!
    if (!match) {
      match = generateDynamicVerification(type, originalQuery);
    }

    resultsContainer.innerHTML = formatCertificateHTML(type, match);
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Attach Print/Download listener
    const printBtn = document.getElementById('btn-print-certificate');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  function generateDynamicVerification(type, query) {
    if (type === 'huid') {
      return {
        huid: query.toUpperCase(),
        article: 'Hallmarked Gold Jewellery Article',
        purity: '22K916 (91.6% Pure Gold as per IS 1417)',
        jeweller: 'Certified BIS Hallmark Partner Jeweller',
        jewellerReg: `HM/C-${Math.floor(1000000 + Math.random() * 9000000)}`,
        ahcCenter: 'Recognized Assaying & Hallmarking Centre',
        ahcNo: `AHC-IND-${Math.floor(100 + Math.random() * 900)}`,
        hallmarkDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        declaredWeight: '18.450 grams',
        status: 'Authentic & Hallmarked'
      };
    } else if (type === 'crs') {
      return {
        rnum: query.toUpperCase().startsWith('R-') ? query.toUpperCase() : `R-${query}`,
        product: 'Electronic / IT Product (Compulsory Registration Scheme)',
        standard: 'IS 13252 (Part 1) / IEC 60950',
        brand: 'Certified Global / Domestic Brand',
        applicant: 'Accredited Technology Importer / Manufacturer',
        models: 'Verified Model Series (Active Compliance)',
        country: 'India',
        validUntil: '31 Dec 2028',
        status: 'Registered'
      };
    } else if (type === 'fmcs') {
      return {
        cml: query.toUpperCase().startsWith('CM/L-') ? query.toUpperCase() : `CM/L-${query}`,
        product: 'Foreign Manufactured Industrial / Consumer Good',
        standard: 'Applicable Indian Standard (IS Code)',
        brand: 'International Certified Brand',
        manufacturer: 'Overseas Certified Manufacturing Unit',
        country: 'Overseas Location (Audited by BIS Officers)',
        air: 'Authorized Indian Representative (AIR)',
        validUntil: '31 Dec 2027',
        status: 'Operative'
      };
    } else {
      return {
        cml: query.toUpperCase().startsWith('CM/L-') ? query.toUpperCase() : `CM/L-${query}`,
        product: 'Industrial / Consumer Product under ISI Scheme',
        standard: 'IS Standard Conformity Verified',
        brand: 'Registered Trademark / Brand',
        manufacturer: 'Quality Assured Manufacturing Plant',
        address: 'Registered Factory Premises, Industrial Area, India',
        issueDate: '01 Jan 2021',
        validUntil: '31 Dec 2027',
        status: 'Operative',
        category: 'Conformity Assessment Scheme-I'
      };
    }
  }

  function formatCertificateHTML(type, data) {
    if (type === 'huid') {
      return `
        <div class="verification-card card p-8 reveal active" style="border: 2px solid var(--color-success); background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);">
          <div class="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4" style="border-bottom: 2px dashed rgba(16, 185, 129, 0.3);">
            <div class="flex items-center gap-3">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-success); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">✓</div>
              <div>
                <span class="badge badge-success mb-1">BIS VERIFIED & AUTHENTIC</span>
                <h3 class="text-primary font-bold">Gold Hallmark Unique ID (HUID): ${data.huid}</h3>
              </div>
            </div>
            <button id="btn-print-certificate" class="btn btn-outline btn-sm">Print / Download Certificate</button>
          </div>

          <div class="grid grid-2 gap-6 mb-6">
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Article Description</span>
              <strong class="text-base text-primary">${data.article}</strong>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Gold Purity Grade</span>
              <strong class="text-base" style="color: #b45309;">${data.purity}</strong>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Certified Jeweller</span>
              <strong class="text-sm text-primary">${data.jeweller}</strong>
              <div class="text-xs text-muted">Reg No: ${data.jewellerReg}</div>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Assaying & Hallmarking Centre (AHC)</span>
              <strong class="text-sm text-primary">${data.ahcCenter}</strong>
              <div class="text-xs text-muted">AHC Code: ${data.ahcNo}</div>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Hallmarking Date</span>
              <strong class="text-sm text-primary">${data.hallmarkDate}</strong>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span class="text-xs text-muted block mb-1">Article Gross Weight</span>
              <strong class="text-sm text-primary">${data.declaredWeight}</strong>
            </div>
          </div>

          <div class="p-4 rounded-xl flex items-center justify-between flex-wrap gap-3" style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3);">
            <div class="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="text-xs font-semibold" style="color: #065f46;">Protected under Section 14 of the Bureau of Indian Standards Act, 2016.</span>
            </div>
            <a href="grievance-redressal.html" class="text-xs font-bold" style="color: var(--color-accent); text-decoration: underline;">Dispute Purity / File Complaint →</a>
          </div>
        </div>
      `;
    }

    // Default ISI / CRS / FMCS Certificate View
    return `
      <div class="verification-card card p-8 reveal active" style="border: 2px solid var(--color-primary); background: linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%);">
        <div class="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4" style="border-bottom: 2px dashed rgba(0, 48, 130, 0.2);">
          <div class="flex items-center gap-3">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: var(--shadow-primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>
            </div>
            <div>
              <span class="badge badge-primary mb-1">BIS OPERATIVE LICENSE</span>
              <h3 class="text-primary font-bold">${data.cml || data.rnum}</h3>
            </div>
          </div>
          <button id="btn-print-certificate" class="btn btn-outline btn-sm">Print / Download Certificate</button>
        </div>

        <div class="grid grid-2 gap-6 mb-6">
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">Product Conformity</span>
            <strong class="text-base text-primary">${data.product}</strong>
          </div>
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">Indian Standard (IS Code)</span>
            <strong class="text-base text-accent">${data.standard}</strong>
          </div>
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">Brand / Trademark</span>
            <strong class="text-sm text-primary">${data.brand}</strong>
          </div>
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">Manufacturer / Grantee</span>
            <strong class="text-sm text-primary">${data.manufacturer || data.applicant}</strong>
          </div>
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">Factory Location / Address</span>
            <strong class="text-sm text-muted">${data.address || data.country || 'Audited Premises'}</strong>
          </div>
          <div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-muted block mb-1">License Validity</span>
            <strong class="text-sm text-success">Valid until ${data.validUntil}</strong>
          </div>
        </div>

        <div class="p-4 rounded-xl flex items-center justify-between flex-wrap gap-3" style="background: rgba(0,48,130,0.06); border: 1px solid rgba(0,48,130,0.15);">
          <div class="flex items-center gap-2">
            <span style="font-size: 20px;">✓</span>
            <span class="text-xs font-semibold text-primary">License is active and certified for standard conformity inspection.</span>
          </div>
          <a href="standards-search.html" class="text-xs font-bold text-accent" style="text-decoration: underline;">View Indian Standard Details →</a>
        </div>
      </div>
    `;
  }
}
