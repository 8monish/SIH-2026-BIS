/**
 * BIS Portal — Standards Search & Interactive Reader Module
 * Instant search, division filtering, QCO tagging, and document previewer.
 */

const STANDARDS_CATALOG = [
  {
    code: 'IS 10500:2012',
    title: 'Drinking Water — Specification (Second Revision)',
    division: 'Civil Engineering',
    divisionCode: 'CED',
    isQCO: true,
    pages: 18,
    year: 2012,
    reaffirmed: 2023,
    abstract: 'Prescribes the essential quality parameters, chemical characteristics, bacteriological tolerance limits, and toxic metal limits for potable drinking water supplied to citizens across India.',
    scope: 'This standard specifies requirements and methods of sampling and test for drinking water suitable for human consumption.',
    sections: ['1. Scope', '2. Normative References', '3. Terminology', '4. Requirements & Limits (Table 1 & 2)', '5. Sampling & Testing Procedures', '6. Quality Assurance']
  },
  {
    code: 'IS 456:2000',
    title: 'Plain and Reinforced Concrete — Code of Practice (Fourth Revision)',
    division: 'Civil Engineering',
    divisionCode: 'CED',
    isQCO: true,
    pages: 114,
    year: 2000,
    reaffirmed: 2026,
    abstract: 'National standard for the design and construction of plain and reinforced concrete structures in buildings, bridges, and critical public infrastructure in India.',
    scope: 'Covers general structural use of plain and reinforced concrete in buildings and civil engineering works.',
    sections: ['1. Scope', '2. Materials, Workmanship, Inspection and Testing', '3. General Design Considerations', '4. Structural Design (Limit State Method)', '5. Annexures A-H']
  },
  {
    code: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Fifth Revision)',
    division: 'Chemical',
    divisionCode: 'CHD',
    isQCO: true,
    pages: 12,
    year: 2016,
    reaffirmed: 2024,
    abstract: 'Specifies the purity grades (24K, 23K, 22K, 20K, 18K, 14K), sampling, assaying methods, and mandatory Hallmark Unique Identification (HUID) laser marking protocols.',
    scope: 'This standard specifies the fineness (purity in parts per thousand) of gold jewellery and artefacts and requirements for hallmarking.',
    sections: ['1. Scope', '2. Fineness Grades', '3. Assaying Methods (Fire Assay)', '4. Marking & HUID Protocols', '5. Sampling Methods']
  },
  {
    code: 'IS 4151:2015',
    title: 'Protective Helmets for Two Wheeler Riders — Specification (Fourth Revision)',
    division: 'Mechanical Engineering',
    divisionCode: 'MED',
    isQCO: true,
    pages: 36,
    year: 2015,
    reaffirmed: 2025,
    abstract: 'Mandatory standard specifying the construction, impact absorption, penetration resistance, chin strap retention, and optical visor clarity for two-wheeler motorcycle helmets.',
    scope: 'Covers the requirements for protective helmets for everyday drivers and passengers of two-wheeled motor vehicles.',
    sections: ['1. Scope', '2. Constructional Requirements', '3. Impact Attenuation Test', '4. Retention System & Dynamic Test', '5. Visor Optical Requirements', '6. Marking & ISI Certification']
  },
  {
    code: 'IS 1293:2019',
    title: 'Plugs and Socket-Outlets of Rated Voltage up to and including 250 Volts and Rated Current up to and including 16 Amperes',
    division: 'Electrotechnical',
    divisionCode: 'ETD',
    isQCO: true,
    pages: 48,
    year: 2019,
    reaffirmed: 2024,
    abstract: 'Establishes technical dimensions, thermal resistance, fire retardancy, and insulation safety requirements for domestic and commercial electrical plugs and socket outlets.',
    scope: 'Applies to plugs and fixed or portable socket-outlets for a.c. only, with or without earthing contact.',
    sections: ['1. Scope & Definitions', '2. Standard Ratings', '3. Classification', '4. Mechanical Strength & Dimensions', '5. Temperature Rise Tests', '6. Creepage Distances']
  },
  {
    code: 'IS 14543:2016',
    title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification',
    division: 'Food & Agriculture',
    divisionCode: 'FAD',
    isQCO: true,
    pages: 24,
    year: 2016,
    reaffirmed: 2025,
    abstract: 'Prescribes mandatory microbiological, physical, and chemical standards for purified and bottled drinking water, including mandatory ISI certification scheme requirements.',
    scope: 'Prescribes the requirements and methods of test for packaged drinking water other than mineral water.',
    sections: ['1. Scope', '2. Treatment Processes Allowed', '3. Hygiene & Packaging', '4. Microbiological Requirements (Table 3)', '5. Labelling & Shelf Life']
  },
  {
    code: 'IS 16046 (Part 2):2018',
    title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)',
    division: 'Electrotechnical',
    divisionCode: 'ETD',
    isQCO: true,
    pages: 32,
    year: 2018,
    reaffirmed: 2026,
    abstract: 'Mandatory standard under CRS for rechargeable lithium-ion battery cells and packs used in smartphones, laptops, energy storage systems, and electric vehicles.',
    scope: 'Specifies requirements and tests for the safe operation of portable secondary lithium cells and batteries.',
    sections: ['1. Scope', '2. Normative References', '3. Safety Considerations', '4. Type Tests (Thermal, Overcharge, Short Circuit)', '5. Information for Safety & Marking']
  },
  {
    code: 'IS 16289:2020',
    title: 'Medical Face Masks — Specification',
    division: 'Medical Equipment & Hospital Planning',
    divisionCode: 'MHD',
    isQCO: false,
    pages: 16,
    year: 2020,
    reaffirmed: 2025,
    abstract: 'Specifies manufacturing, bacterial filtration efficiency (BFE > 95% / 98%), breathability (differential pressure), and splash resistance for surgical and medical masks.',
    scope: 'Specifies construction, design, performance requirements and test methods for medical face masks.',
    sections: ['1. Scope', '2. Classification (Class 1, 2, 3)', '3. Bacterial Filtration Efficiency (BFE)', '4. Splash Resistance Test', '5. Biocompatibility & Packaging']
  }
];

export function initStandards() {
  const searchInput = document.getElementById('standards-search-input');
  const divisionSelect = document.getElementById('standards-division-filter');
  const qcoCheckbox = document.getElementById('standards-qco-filter');
  const resultsContainer = document.getElementById('standards-list-container');
  const countDisplay = document.getElementById('standards-count');
  const modal = document.getElementById('standard-preview-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');

  // Check URL param for instant query
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q');
  if (initialQuery && searchInput) {
    searchInput.value = decodeURIComponent(initialQuery);
  }

  // Filter & Render
  function filterAndRender() {
    if (!resultsContainer) return;

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const division = divisionSelect ? divisionSelect.value : 'all';
    const qcoOnly = qcoCheckbox ? qcoCheckbox.checked : false;

    const filtered = STANDARDS_CATALOG.filter(item => {
      const matchQuery = !query ||
        item.code.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.abstract.toLowerCase().includes(query) ||
        item.division.toLowerCase().includes(query);

      const matchDivision = division === 'all' || item.divisionCode === division;
      const matchQco = !qcoOnly || item.isQCO === true;

      return matchQuery && matchDivision && matchQco;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${STANDARDS_CATALOG.length} Indian Standards`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="card p-8 text-center">
          <div class="flex items-center justify-center mb-2 text-primary">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h4 class="text-primary font-bold mb-2">No Standards Found</h4>
          <p class="text-muted text-sm mb-4">No matching Indian Standards were found for your search criteria.</p>
          <button id="btn-reset-filters" class="btn btn-outline btn-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          if (divisionSelect) divisionSelect.value = 'all';
          if (qcoCheckbox) qcoCheckbox.checked = false;
          filterAndRender();
        });
      }
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="card p-6 reveal active hover-lift" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
            <span class="badge ${item.isQCO ? 'badge-new' : 'badge-primary'}">${item.isQCO ? 'MANDATORY QCO' : 'VOLUNTARY'}</span>
            <span class="text-xs text-muted font-medium">${item.division} (${item.divisionCode})</span>
          </div>
          <h3 class="text-lg font-bold text-primary mb-1">${item.code}</h3>
          <h4 class="text-sm font-semibold text-text mb-3">${item.title}</h4>
          <p class="text-xs text-muted mb-4" style="line-height: 1.6;">${item.abstract}</p>
        </div>

        <div>
          <div class="flex items-center justify-between text-xs text-muted mb-4 pt-3" style="border-top: 1px solid var(--color-border);">
            <span>${item.pages} Pages</span>
            <span>Reaffirmed: ${item.reaffirmed}</span>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm w-full btn-preview-standard" data-code="${item.code}">Read Standard Free</button>
            <button class="btn btn-outline btn-sm btn-bookmark" data-code="${item.code}" title="Bookmark">Save</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach preview click listeners
    document.querySelectorAll('.btn-preview-standard').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        openStandardPreview(code);
      });
    });

    // Attach bookmark click listeners
    document.querySelectorAll('.btn-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-code');
        toggleBookmark(code, btn);
      });
    });
  }

  // Event Listeners for Filters
  if (searchInput) searchInput.addEventListener('input', filterAndRender);
  if (divisionSelect) divisionSelect.addEventListener('change', filterAndRender);
  if (qcoCheckbox) qcoCheckbox.addEventListener('change', filterAndRender);

  // Quick Division Chips
  document.querySelectorAll('.division-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const divCode = chip.getAttribute('data-div');
      if (divisionSelect) divisionSelect.value = divCode;
      document.querySelectorAll('.division-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterAndRender();
    });
  });

  // Open Document Modal Previewer
  function openStandardPreview(code) {
    const item = STANDARDS_CATALOG.find(s => s.code === code);
    if (!item || !modal) return;

    const modalTitle = document.getElementById('modal-doc-title');
    const modalCode = document.getElementById('modal-doc-code');
    const modalScope = document.getElementById('modal-doc-scope');
    const modalAbstract = document.getElementById('modal-doc-abstract');
    const modalToc = document.getElementById('modal-doc-toc');

    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCode) modalCode.textContent = item.code;
    if (modalScope) modalScope.textContent = item.scope;
    if (modalAbstract) modalAbstract.textContent = item.abstract;
    if (modalToc) {
      modalToc.innerHTML = item.sections.map(sec => `
        <li class="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer text-xs text-primary font-medium">
          ${sec}
        </li>
      `).join('');
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Bookmark Helper
  function toggleBookmark(code, btn) {
    let bookmarks = JSON.parse(localStorage.getItem('bis_bookmarks') || '[]');
    if (bookmarks.includes(code)) {
      bookmarks = bookmarks.filter(c => c !== code);
      btn.style.color = '';
      btn.textContent = 'Save';
    } else {
      bookmarks.push(code);
      btn.style.color = 'var(--color-accent)';
      btn.textContent = 'Saved';
    }
    localStorage.setItem('bis_bookmarks', JSON.stringify(bookmarks));
  }

  // Initial Filter Render
  filterAndRender();

  // Async Fetch Backend API Standards (from FastAPI backend)
  async function loadBackendStandards() {
    try {
      const res = await fetch('http://localhost:8000/api/standards', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const backendItems = await res.json();
        if (Array.isArray(backendItems)) {
          backendItems.forEach(item => {
            const code = item.standard_number || item.code;
            if (code && !STANDARDS_CATALOG.some(s => s.code === code)) {
              STANDARDS_CATALOG.push({
                code: code,
                title: item.title || 'Indian Standard Specification',
                division: item.product_category || 'General',
                divisionCode: 'CED',
                isQCO: Boolean(item.certification_required),
                pages: 24,
                year: 2024,
                reaffirmed: 2026,
                abstract: item.title ? `Official Indian Standard for ${item.title}` : 'Prescribes technical specifications, quality control procedures, and testing methods.',
                scope: `Covers requirements and test methods specified under ${code}.`,
                sections: ['1. Scope', '2. Specifications & Limits', '3. Sampling & Test Methods', '4. Quality Assurance & Certification']
              });
            }
          });
          filterAndRender();
        }
      }
    } catch (err) {
      // Backend offline/optional - graceful fallback
    }
  }

  loadBackendStandards();
}
