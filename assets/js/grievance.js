/**
 * BIS Portal — Consumer Grievance Redressal & Compensation Module
 * Step-by-step complaint registration wizard, live status tracker, and compensation calculator.
 */

const MOCK_GRIEVANCE_TIMELINE = {
  'BIS-GR-2026-1048': {
    id: 'BIS-GR-2026-1048',
    category: 'Misuse of ISI Mark (Substandard Packaged Drinking Water)',
    complainant: 'Rahul Sharma (Delhi)',
    dateFiled: '18 Aug 2026',
    branchOffice: 'Delhi Branch Office-I (DBO-I), New Delhi',
    officer: 'Shri V. K. Gupta, Scientist-D / Joint Director',
    status: 'Investigation Complete — Legal Action Initiated',
    currentStep: 4,
    timeline: [
      { step: 1, title: 'Complaint Registered', date: '18 Aug 2026, 11:20 AM', desc: 'Grievance received via e-BIS Portal and acknowledged.' },
      { step: 2, title: 'Assigned to Regional Branch', date: '19 Aug 2026, 02:45 PM', desc: 'Assigned to DBO-I Enforcement Team for preliminary inquiry.' },
      { step: 3, title: 'Surveillance Raid & Sample Seizure', date: '22 Aug 2026, 04:00 PM', desc: 'Surveillance conducted at retailer premises. 40 bottles seized and sent to Central Laboratory, Sahibabad.' },
      { step: 4, title: 'Lab Test Failure & Show-Cause Notice', date: '28 Aug 2026, 10:15 AM', desc: 'Test report confirmed failure to meet IS 14543. Prosecution notice served under Section 29 of BIS Act, 2016.' },
      { step: 5, title: 'Final Redressal & Closure', date: 'Pending Hearing', desc: 'Court proceedings in progress. Consumer compensation file sent for approval.' }
    ]
  },
  'BIS-GR-2026-9214': {
    id: 'BIS-GR-2026-9214',
    category: 'Gold Hallmarking Under-caratage (Purity Shortage)',
    complainant: 'Priya Sundaram (Chennai)',
    dateFiled: '10 Aug 2026',
    branchOffice: 'Chennai Regional Office (CRO), Southern Region',
    officer: 'Smt. R. Meenakshi, Scientist-E / Director',
    status: 'Resolved — Compensation Awarded to Consumer',
    currentStep: 5,
    timeline: [
      { step: 1, title: 'Complaint Registered', date: '10 Aug 2026, 09:15 AM', desc: 'Grievance lodged with gold invoice and assay report copy.' },
      { step: 2, title: 'Assigned to Hallmarking Officer', date: '11 Aug 2026, 11:30 AM', desc: 'Branch Hallmarking cell registered formal dispute under Regulation 11.' },
      { step: 3, title: 'Confirmatory Fire Assay Testing', date: '14 Aug 2026, 03:00 PM', desc: 'BIS Referral Lab tested article: found 20.2K against marked 22K (IS 1417 shortfall).' },
      { step: 4, title: 'Jeweller Penalized', date: '20 Aug 2026, 01:00 PM', desc: 'Penalty imposed on jeweller. Mandatory rectification order issued.' },
      { step: 5, title: 'Compensation Disbursed', date: '25 Aug 2026, 05:00 PM', desc: '₹34,800 statutory compensation (2x purity difference + lab fee) credited to complainant.' }
    ]
  }
};

// Persistent Grievance Database Cache (localStorage + Backend API Sync)
if (typeof window !== 'undefined') {
  const storedGrievances = localStorage.getItem('bis_grievance_records');
  if (storedGrievances) {
    try {
      Object.assign(MOCK_GRIEVANCE_TIMELINE, JSON.parse(storedGrievances));
    } catch (e) {
      console.error('Error loading stored grievances:', e);
    }
  }
}

export function initGrievance() {
  // ── 1. Wizard Navigation ──
  let currentStep = 1;
  const totalSteps = 4;

  const nextBtn = document.getElementById('btn-wizard-next');
  const prevBtn = document.getElementById('btn-wizard-prev');
  const submitBtn = document.getElementById('btn-wizard-submit');
  const progressBars = document.querySelectorAll('.wizard-step-indicator');
  const stepPanels = document.querySelectorAll('.wizard-step-panel');

  function updateWizardUI() {
    stepPanels.forEach(panel => {
      const stepNum = parseInt(panel.getAttribute('data-step'), 10);
      panel.classList.toggle('active', stepNum === currentStep);
    });

    progressBars.forEach(bar => {
      const stepNum = parseInt(bar.getAttribute('data-step'), 10);
      bar.classList.toggle('active', stepNum === currentStep);
      bar.classList.toggle('completed', stepNum < currentStep);
    });

    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep(currentStep)) {
        currentStep = Math.min(currentStep + 1, totalSteps);
        updateWizardUI();
        document.getElementById('complaint-wizard-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentStep = Math.max(currentStep - 1, 1);
      updateWizardUI();
      document.getElementById('complaint-wizard-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function validateCurrentStep(step) {
    if (step === 1) {
      const name = document.getElementById('complainant-name')?.value.trim();
      const phone = document.getElementById('complainant-phone')?.value.trim();
      if (!name || !phone || phone.length < 10) {
        alert('Please enter your full name and a valid 10-digit mobile number.');
        return false;
      }
    } else if (step === 2) {
      const category = document.getElementById('complaint-category')?.value;
      const details = document.getElementById('complaint-details')?.value.trim();
      if (!category || !details) {
        alert('Please select a complaint category and provide a brief description of the incident.');
        return false;
      }
    } else if (step === 3) {
      const product = document.getElementById('complaint-product-name')?.value.trim();
      const seller = document.getElementById('complaint-seller-name')?.value.trim();
      if (!product || !seller) {
        alert('Please enter the product name and seller / store details.');
        return false;
      }
    }
    return true;
  }

  // Handle Form Submission
  const form = document.getElementById('grievance-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCurrentStep(4)) return;

      const newId = `BIS-GR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const complainantName = document.getElementById('complainant-name')?.value || 'Citizen';
      const category = document.getElementById('complaint-category')?.value || 'Quality Dispute';

      // Save to mock database
      MOCK_GRIEVANCE_TIMELINE[newId] = {
        id: newId,
        category: category,
        complainant: complainantName,
        dateFiled: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        branchOffice: 'Designated Regional Branch Office',
        officer: 'Assigned Scientist / Inspection Officer',
        status: 'Registered — Under Active Surveillance',
        currentStep: 1,
        timeline: [
          { step: 1, title: 'Complaint Registered', date: 'Just Now', desc: 'Grievance submitted successfully. Docket registered on central BIS vigilance server.' },
          { step: 2, title: 'Branch Office Allocation', date: 'Estimated within 24 hours', desc: 'Case will be forwarded to respective State Branch Enforcement Officer.' },
          { step: 3, title: 'Sample Testing & Surveillance', date: 'Pending', desc: 'Surveillance audit and laboratory compliance inspection.' },
          { step: 4, title: 'Notice / Legal Action', date: 'Pending', desc: 'Action under BIS Act 2016 if non-compliance is verified.' },
          { step: 5, title: 'Final Redressal', date: 'Pending', desc: 'Resolution & consumer communication.' }
        ]
      };

      // Save to localStorage persistent browser database
      try {
        localStorage.setItem('bis_grievance_records', JSON.stringify(MOCK_GRIEVANCE_TIMELINE));
      } catch (e) {
        console.error('Error saving grievance to browser database:', e);
      }

      // Sync to FastAPI Mongo Backend API if online
      fetch('http://localhost:8000/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(MOCK_GRIEVANCE_TIMELINE[newId])
      }).catch(() => {
        // Safe offline fallback: Stored in browser database (localStorage)
      });

      // Show Success Modal / Card
      const wizardContainer = document.getElementById('complaint-wizard-card');
      if (wizardContainer) {
        wizardContainer.innerHTML = `
          <div class="card p-8 text-center reveal active" style="border: 2px solid var(--color-success); background: #f0fdf4;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-success); color: white; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px auto; box-shadow: 0 4px 16px rgba(16,185,129,0.4);">✓</div>
            <h3 class="text-2xl font-bold text-primary mb-2">Grievance Registered Successfully!</h3>
            <p class="text-muted text-sm mb-4">Your complaint has been formally logged with the Bureau of Indian Standards Vigilance & Enforcement Wing.</p>

            <div class="p-4 bg-white rounded-xl border border-gray-200 inline-block mb-6" style="box-shadow: var(--shadow-sm);">
              <span class="text-xs text-muted block mb-1">YOUR UNIQUE GRIEVANCE DOCKET NUMBER</span>
              <strong class="text-2xl font-extrabold text-accent" id="generated-docket-id">${newId}</strong>
            </div>

            <div class="flex justify-center gap-3 flex-wrap">
              <button class="btn btn-primary" id="btn-track-new-complaint" data-id="${newId}">Track Status Now</button>
              <button class="btn btn-outline" onclick="window.print()">Print Acknowledgement</button>
            </div>
          </div>
        `;

        document.getElementById('btn-track-new-complaint')?.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          const trackInput = document.getElementById('track-docket-input');
          if (trackInput) trackInput.value = id;
          renderGrievanceStatus(id);
        });
      }
    });
  }

  // ── 2. Grievance Status Tracker ──
  const trackBtn = document.getElementById('btn-track-submit');
  const trackInput = document.getElementById('track-docket-input');
  const statusContainer = document.getElementById('grievance-status-results');
  const sampleTrackBtns = document.querySelectorAll('.sample-docket-btn');

  sampleTrackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (trackInput) trackInput.value = id;
      renderGrievanceStatus(id);
    });
  });

  if (trackBtn && trackInput) {
    trackBtn.addEventListener('click', () => {
      const query = trackInput.value.trim().toUpperCase();
      if (!query) {
        alert('Please enter your Grievance Docket Number (e.g. BIS-GR-2026-1048).');
        return;
      }
      renderGrievanceStatus(query);
    });

    trackInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') trackBtn.click();
    });
  }

  function renderGrievanceStatus(docketId) {
    if (!statusContainer) return;

    const data = MOCK_GRIEVANCE_TIMELINE[docketId];

    if (!data) {
      statusContainer.innerHTML = `
        <div class="card p-6 text-center text-muted">
          <p class="mb-2">Docket ID <strong>${docketId}</strong> was not found in active records.</p>
          <p class="text-xs">Try sample dockets: <a href="javascript:void(0)" class="sample-docket-btn text-accent font-bold" data-id="BIS-GR-2026-1048">BIS-GR-2026-1048</a> or <a href="javascript:void(0)" class="sample-docket-btn text-accent font-bold" data-id="BIS-GR-2026-9214">BIS-GR-2026-9214</a></p>
        </div>
      `;
      statusContainer.querySelector('.sample-docket-btn')?.addEventListener('click', (e) => {
        renderGrievanceStatus(e.target.getAttribute('data-id'));
      });
      return;
    }

    statusContainer.innerHTML = `
      <div class="card p-6 reveal active" style="border: 2px solid var(--color-primary); background: #ffffff;">
        <div class="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3" style="border-bottom: 1px solid var(--color-border);">
          <div>
            <span class="badge badge-primary mb-1">DOCKET ID: ${data.id}</span>
            <h3 class="text-lg font-bold text-primary">${data.category}</h3>
            <span class="text-xs text-muted">Complainant: ${data.complainant} | Date Filed: ${data.dateFiled}</span>
          </div>
          <div class="text-right">
            <span class="badge badge-success">${data.status}</span>
            <div class="text-xs text-muted mt-1">${data.branchOffice}</div>
          </div>
        </div>

        <h4 class="text-sm font-bold text-primary mb-4">Live Investigation Stepper Timeline</h4>
        <div class="grievance-timeline">
          ${data.timeline.map((item, idx) => `
            <div class="timeline-item ${item.step <= data.currentStep ? 'completed' : ''} ${item.step === data.currentStep ? 'current' : ''}">
              <div class="timeline-dot">${item.step <= data.currentStep ? '✓' : item.step}</div>
              <div class="timeline-content">
                <div class="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <strong class="text-sm text-primary">${item.title}</strong>
                  <span class="text-xs text-muted font-medium">${item.date}</span>
                </div>
                <p class="text-xs text-muted">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    statusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── 3. Hallmarking Compensation Calculator ──
  const calcBtn = document.getElementById('btn-calc-compensation');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const weight = parseFloat(document.getElementById('calc-weight')?.value || 0);
      const claimedKarat = parseFloat(document.getElementById('calc-claimed-karat')?.value || 22);
      const actualKarat = parseFloat(document.getElementById('calc-actual-karat')?.value || 20);
      const goldRate = parseFloat(document.getElementById('calc-gold-rate')?.value || 7200); // Rate per gram

      if (weight <= 0) {
        alert('Please enter a valid weight in grams.');
        return;
      }

      if (actualKarat >= claimedKarat) {
        alert('Actual tested purity must be less than claimed purity to compute compensation.');
        return;
      }

      // Calculation:
      // Purity difference = (Claimed Purity - Actual Purity) / 24
      // Value shortfall = weight * goldRate * ((claimedKarat - actualKarat) / 24)
      // Statutory Compensation = 2 * value shortfall + lab assay fee (₹500 standard)
      const purityDiffRatio = (claimedKarat - actualKarat) / 24;
      const shortfallValue = weight * goldRate * purityDiffRatio;
      const compensationAmount = Math.round((2 * shortfallValue) + 500);

      const resultBox = document.getElementById('compensation-result-box');
      if (resultBox) {
        resultBox.innerHTML = `
          <div class="p-4 rounded-xl mt-4" style="background: rgba(242, 101, 34, 0.1); border: 1.5px solid var(--color-accent);">
            <div class="text-xs text-muted mb-1">ESTIMATED STATUTORY COMPENSATION AS PER BIS ACT 2016:</div>
            <div class="text-3xl font-extrabold text-accent mb-2">₹${compensationAmount.toLocaleString('en-IN')}</div>
            <div class="text-xs text-muted" style="line-height: 1.5;">
              • Value of Gold Shortfall: ₹${Math.round(shortfallValue).toLocaleString('en-IN')}<br>
              • Statutory Multiplier: <strong>2x Penalty on Shortfall</strong><br>
              • Mandatory Assaying Fee Refund: ₹500
            </div>
          </div>
        `;
      }
    });
  }

  // ── 4. Officer / Admin Vigilance Console ──
  initAdminConsole();

  function initAdminConsole() {
    const toggleBtn = document.getElementById('btn-toggle-admin-login');
    const loginBox = document.getElementById('admin-login-box');
    const queueView = document.getElementById('admin-queue-view');
    const submitLoginBtn = document.getElementById('btn-admin-submit-login');
    const logoutBtn = document.getElementById('btn-admin-logout');
    const tableWrap = document.getElementById('admin-dockets-table-wrap');

    let isAdminLoggedIn = false;

    if (toggleBtn && loginBox) {
      toggleBtn.addEventListener('click', () => {
        if (isAdminLoggedIn) return;
        loginBox.style.display = loginBox.style.display === 'none' ? 'block' : 'none';
      });
    }

    if (submitLoginBtn) {
      submitLoginBtn.addEventListener('click', () => {
        const id = document.getElementById('admin-user-id')?.value?.trim();
        const pin = document.getElementById('admin-user-pin')?.value?.trim();

        if ((id === 'admin@bis.gov.in' || id === 'BIS-OFFICER-DBO1') && (pin === 'bis2026' || pin === 'admin123')) {
          isAdminLoggedIn = true;
          loginBox.style.display = 'none';
          if (toggleBtn) toggleBtn.style.display = 'none';
          if (queueView) queueView.style.display = 'block';
          renderAdminDocketsTable();
        } else {
          alert('Invalid Officer Credentials. Use demo: admin@bis.gov.in / bis2026');
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        isAdminLoggedIn = false;
        if (queueView) queueView.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.style.display = 'inline-flex';
          const statusText = document.getElementById('admin-auth-status-text');
          if (statusText) statusText.textContent = 'Officer Login';
        }
      });
    }

    function renderAdminDocketsTable() {
      if (!tableWrap) return;

      const dockets = Object.values(MOCK_GRIEVANCE_TIMELINE);

      tableWrap.innerHTML = `
        <table class="table w-full text-xs" style="border-collapse: collapse;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 8px;">Docket ID</th>
              <th style="padding: 8px;">Complainant</th>
              <th style="padding: 8px;">Category</th>
              <th style="padding: 8px;">Current Status</th>
              <th style="padding: 8px;">Stage</th>
              <th style="padding: 8px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${dockets.map(d => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px; font-weight: 700; color: #003082;">${d.id}</td>
                <td style="padding: 8px;">${d.complainant}</td>
                <td style="padding: 8px; max-width: 180px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${d.category}</td>
                <td style="padding: 8px;"><span class="badge ${d.currentStep >= 5 ? 'badge-success' : 'badge-primary'}">${d.status}</span></td>
                <td style="padding: 8px; font-weight: bold;">Step ${d.currentStep} of 5</td>
                <td style="padding: 8px; text-align: right;">
                  <button class="btn btn-primary btn-sm btn-advance-stage" data-id="${d.id}" style="font-size: 10px; padding: 3px 8px;">
                    ${d.currentStep < 5 ? 'Advance Stage →' : 'Completed ✓'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      tableWrap.querySelectorAll('.btn-advance-stage').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const docId = e.currentTarget.getAttribute('data-id');
          const target = MOCK_GRIEVANCE_TIMELINE[docId];
          if (target && target.currentStep < 5) {
            target.currentStep += 1;
            if (target.currentStep === 2) target.status = 'Allocated to Enforcement Officer';
            if (target.currentStep === 3) target.status = 'Surveillance Raid & Sample Seizure';
            if (target.currentStep === 4) target.status = 'Lab Test Failure & Show-Cause Notice';
            if (target.currentStep === 5) target.status = 'Resolved — Compensation Awarded';

            try {
              localStorage.setItem('bis_grievance_records', JSON.stringify(MOCK_GRIEVANCE_TIMELINE));
            } catch(err) {}

            renderAdminDocketsTable();

            // If currently tracking this docket in status card, re-render
            const trackInput = document.getElementById('track-docket-input');
            if (trackInput && trackInput.value.trim().toUpperCase() === docId) {
              renderGrievanceStatus(docId);
            }
          }
        });
      });
    }
  }
}
