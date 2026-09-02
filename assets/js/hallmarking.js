/**
 * BIS Portal — Assaying & Hallmarking Centres (AHC) & Jeweller Directory
 * Search by State, District, Pincode, and Recognition details.
 */

const AHC_DATABASE = [
  {
    code: 'AHC-DEL-042',
    name: 'Swarna Assay & Hallmarking Bureau',
    state: 'Delhi',
    district: 'Central Delhi',
    city: 'Karol Bagh',
    pincode: '110005',
    address: 'Building 24, 2nd Floor, Bank Street, Karol Bagh, New Delhi',
    phone: '+91 11 28751234',
    email: 'delhi042@swarna-assay.in',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking', 'Silver Assay (Potentiometric)'],
    capacity: '4,500 articles/day'
  },
  {
    code: 'AHC-MH-108',
    name: 'Apex Bullion Testing & Assay Lab',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Bandra West',
    pincode: '400050',
    address: 'Unit 402, Trade Plaza, Hill Road, Bandra West, Mumbai',
    phone: '+91 22 26405678',
    email: 'info@apexassaymumbai.com',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking', 'Bullion Bar Refining'],
    capacity: '6,000 articles/day'
  },
  {
    code: 'AHC-TN-015',
    name: 'South India Assaying & Refining Bureau',
    state: 'Tamil Nadu',
    district: 'Chennai',
    city: 'T. Nagar',
    pincode: '600017',
    address: '72, Usman Road, Near Panagal Park, T. Nagar, Chennai',
    phone: '+91 44 24348899',
    email: 'chennai015@siarb.org',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking', 'Silver Hallmarking'],
    capacity: '5,200 articles/day'
  },
  {
    code: 'AHC-KA-067',
    name: 'Bengaluru Gold Assay & Laser Centre',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Commercial Street',
    pincode: '560001',
    address: '15/1, Kamaraj Road Cross, Commercial Street, Bengaluru',
    phone: '+91 80 25587744',
    email: 'support@blrgoldassay.com',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking'],
    capacity: '3,800 articles/day'
  },
  {
    code: 'AHC-GJ-089',
    name: 'Gujarat Bullion Assaying Network',
    state: 'Gujarat',
    district: 'Ahmedabad',
    city: 'Manek Chowk',
    pincode: '380001',
    address: 'Shreeji Complex, 1st Floor, Manek Chowk, Ahmedabad',
    phone: '+91 79 22149900',
    email: 'contact@gujaratbullionlab.in',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking', 'Silver Touchstone Test'],
    capacity: '7,500 articles/day'
  },
  {
    code: 'AHC-WB-033',
    name: 'Eastern India Precious Metals Testing Bureau',
    state: 'West Bengal',
    district: 'Kolkata',
    city: 'Bowbazar',
    pincode: '700012',
    address: '88, Bepin Behari Ganguly Street, Bowbazar, Kolkata',
    phone: '+91 33 22376655',
    email: 'kolkata033@preciousmetals.in',
    status: 'Recognized & Active',
    capabilities: ['Fire Assay (Gold)', 'XRF Spectrometry', 'Laser HUID Marking', 'Silver Hallmarking'],
    capacity: '4,000 articles/day'
  }
];

export function initHallmarking() {
  const searchInput = document.getElementById('ahc-search-input');
  const stateSelect = document.getElementById('ahc-state-filter');
  const resultsContainer = document.getElementById('ahc-list-container');
  const countDisplay = document.getElementById('ahc-count');

  function renderAHCCenters() {
    if (!resultsContainer) return;

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const state = stateSelect ? stateSelect.value : 'all';

    const filtered = AHC_DATABASE.filter(item => {
      const matchQuery = !query ||
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.district.toLowerCase().includes(query) ||
        item.pincode.includes(query) ||
        item.code.toLowerCase().includes(query);

      const matchState = state === 'all' || item.state.toLowerCase() === state.toLowerCase();

      return matchQuery && matchState;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${AHC_DATABASE.length} Assaying & Hallmarking Centres`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="card p-8 text-center text-muted col-span-full">
          <div class="flex items-center justify-center mb-2 text-primary">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h4 class="text-primary font-bold mb-2">No Hallmarking Centres Found</h4>
          <p class="text-xs text-muted">Try selecting another State or clearing your search term.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="card p-6 reveal active hover-lift" style="border: 1px solid var(--color-border); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
            <span class="badge badge-success">${item.status}</span>
            <span class="badge badge-primary font-mono">${item.code}</span>
          </div>
          <h3 class="text-base font-bold text-primary mb-1">${item.name}</h3>
          <p class="text-xs text-muted mb-3">${item.address}</p>
          <div class="text-xs mb-3">
            <strong class="text-text">${item.city}, ${item.district}, ${item.state} - ${item.pincode}</strong>
          </div>
          <div class="mb-4">
            <span class="text-xs text-muted block mb-1 font-semibold">Testing & Marking Capabilities:</span>
            <div class="flex flex-wrap gap-1">
              ${item.capabilities.map(c => `<span class="badge badge-primary text-xs" style="font-size: 10px;">${c}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3" style="border-top: 1px solid var(--color-border);">
          <div class="flex items-center justify-between text-xs text-muted mb-3">
            <span>Capacity: <strong>${item.capacity}</strong></span>
            <span>Phone: ${item.phone}</span>
          </div>
          <a href="verify-licence.html" class="btn btn-outline btn-sm w-full">Verify Article HUID from this Lab →</a>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderAHCCenters);
  if (stateSelect) stateSelect.addEventListener('change', renderAHCCenters);

  renderAHCCenters();
}
