// ============================================================
// DUTA AUTO GARAGE - Main JavaScript
// ============================================================

function navigateTo(page) {
  window.location.href = page;
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.duta-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'duta-toast';
  toast.style.cssText = `
    position: fixed; top: 24px; right: 24px; z-index: 9999;
    padding: 14px 20px; border-radius: 8px; font-family: Inter, sans-serif;
    font-size: 14px; font-weight: 500; color: #fff;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease; opacity: 1;
    max-width: 320px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function showModal(title, message, onConfirm, confirmText = 'Konfirmasi', cancelText = 'Batal') {
  const existing = document.querySelector('.duta-modal-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'duta-modal-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9998;
    background: rgba(0,0,0,0.6); display: flex;
    align-items: center; justify-content: center;
  `;
  overlay.innerHTML = `
    <div style="background:#1e2a4a; border:1px solid rgba(255,255,255,0.1);
      border-radius:12px; padding:28px 32px; max-width:420px; width:90%;
      font-family:Inter,sans-serif; color:#d9e2ff;">
      <h3 style="color:#ffc880;font-size:18px;margin-bottom:10px;">${title}</h3>
      <p style="color:#d7c3ae;font-size:14px;line-height:1.6;margin-bottom:24px;">${message}</p>
      <div style="display:flex;gap:12px;justify-content:flex-end;">
        <button id="modal-cancel" style="padding:9px 20px;border-radius:6px;
          border:1px solid rgba(255,255,255,0.15);background:transparent;
          color:#d7c3ae;cursor:pointer;font-size:14px;">${cancelText}</button>
        <button id="modal-confirm" style="padding:9px 20px;border-radius:6px;
          border:none;background:#ffc880;color:#664000;cursor:pointer;
          font-size:14px;font-weight:600;">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#modal-cancel').onclick = () => overlay.remove();
  overlay.querySelector('#modal-confirm').onclick = () => { overlay.remove(); if (onConfirm) onConfirm(); };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// ===================== LANDING PAGE =====================
function initLandingPage() {
  const navLinks = document.querySelectorAll('.nav-63 .link-67, .nav-63 .link-69, .nav-63 .link-71');
  const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
  navLinks.forEach((link, i) => {
    link.style.cursor = 'pointer';
    link.onclick = () => navigateTo(pages[i]);
  });
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk booking servis...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20booking%20servis%20di%20Duta%20Auto%20Garage', '_blank'), 1000);
    };
  });
  document.querySelectorAll('.details-163, .details-169, .details-175').forEach(detail => {
    const summary = detail.querySelector('.slot-summary-164, .slot-summary-170, .slot-summary-176');
    if (!summary) return;
    summary.style.cursor = 'pointer';
    const icon = summary.querySelector('img');
    let open = false;
    summary.onclick = () => {
      open = !open;
      if (icon) icon.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      let answer = detail.querySelector('.faq-answer');
      if (!answer && open) {
        answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.style.cssText = 'padding:12px 16px;color:#d7c3ae;font-size:14px;line-height:1.6;';
        const questions = {
          0: 'Kami menggunakan oli merek Castrol, Shell Helix, dan Mobil 1 yang telah terpercaya untuk berbagai jenis kendaraan.',
          1: 'Disarankan membuat janji temu terlebih dahulu agar waktu servis lebih efisien. Namun kami juga menerima kunjungan langsung.',
          2: 'Ya, kami memberikan garansi servis selama 7 hari atau 500 km setelah perbaikan dilakukan.'
        };
        const idx = [...document.querySelectorAll('.details-163, .details-169, .details-175')].indexOf(detail);
        answer.textContent = questions[idx] || 'Silakan hubungi kami untuk informasi lebih lanjut.';
        detail.appendChild(answer);
      } else if (answer) {
        answer.style.display = open ? 'block' : 'none';
      }
    };
  });
  document.querySelectorAll('.link-57, .link-59, .link-61, .link-67, .link-69, .link-71').forEach(link => {
    if (link.querySelector && link.querySelector('.text-62')) {
      link.style.cursor = 'pointer';
      link.onclick = () => window.open('https://wa.me/6285713004631', '_blank');
    }
  });
}

// ===================== LAYANAN PAGE =====================
function initLayananPage() {
  const nav3 = document.querySelector('.nav-3');
  if (nav3) {
    const links = nav3.querySelectorAll('.link-7, .link-9, .link-11');
    const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
    links.forEach((link, i) => {
      link.style.cursor = 'pointer';
      link.onclick = () => navigateTo(pages[i]);
    });
  }
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk reservasi...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20reservasi%20layanan', '_blank'), 1000);
    };
  });
  const waLink = document.querySelector('.link-383');
  if (waLink) {
    waLink.style.cursor = 'pointer';
    waLink.onclick = () => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20konsultasi%20teknis', '_blank');
  }
  const lihatLayanan = document.querySelector('.link-387');
  if (lihatLayanan) {
    lihatLayanan.style.cursor = 'pointer';
    lihatLayanan.onclick = () => navigateTo('layanan.html');
  }
}

// ===================== TENTANG KAMI PAGE =====================
function initTentangKamiPage() {
  const nav3 = document.querySelector('.nav-3');
  if (nav3) {
    const links = nav3.querySelectorAll('.link-7, .link-9, .link-11');
    const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
    links.forEach((link, i) => {
      link.style.cursor = 'pointer';
      link.onclick = () => navigateTo(pages[i]);
    });
  }
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk booking...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631', '_blank'), 1000);
    };
  });
  const waLink = document.querySelector('.link-163');
  if (waLink) {
    waLink.style.cursor = 'pointer';
    waLink.onclick = () => window.open('https://wa.me/6285713004631', '_blank');
  }
  const lihatLayanan = document.querySelector('.link-167');
  if (lihatLayanan) {
    lihatLayanan.style.cursor = 'pointer';
    lihatLayanan.onclick = () => navigateTo('layanan.html');
  }
}

// ============================================================
// "DATABASE" LOKAL PAKAI localStorage - SERVICES
// ============================================================
const SERVICES_KEY = 'duta_garage_services';

function getServices() {
  const data = localStorage.getItem(SERVICES_KEY);
  if (data) return JSON.parse(data);
  const seed = [
    { id: 1, name: 'Service Berkala', category: 'Pemeliharaan', price: 1250000, desc: 'Pemeriksaan menyeluruh dan sistematis, termasuk penggantian oli, penggantian filter, dan diagnostik keselamatan multi-titik.', status: 'ACTIVE' },
    { id: 2, name: 'Engine Tuning', category: 'Tuning', price: 3500000, desc: 'Remapping ECU profesional dan kalibrasi mesin untuk performa maksimal.', status: 'ACTIVE' },
    { id: 3, name: 'Servis Rem', category: 'Perbaikan', price: 850000, desc: 'Penggantian kampas rem, cairan hidrolik, dan pemeriksaan sistem pengereman.', status: 'INACTIVE' },
    { id: 4, name: 'Pemindaian Diagnostik', category: 'Pemeliharaan', price: 450000, desc: 'Diagnosis komputer menyeluruh menggunakan alat scan terbaru.', status: 'ACTIVE' },
    { id: 5, name: 'Perawatan AC', category: 'Pemeliharaan', price: 600000, desc: 'Pengisian ulang freon, pembersihan evaporator, dan filter kabin.', status: 'ACTIVE' },
    { id: 6, name: 'Penyelarasan Roda', category: 'Perbaikan', price: 550000, desc: 'Spooring Laser 3D dan Balancing untuk memastikan presisi kendaraan.', status: 'ACTIVE' }
  ];
  localStorage.setItem(SERVICES_KEY, JSON.stringify(seed));
  return seed;
}

function saveServices(services) {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function formatRupiahShort(num) {
  num = Number(num || 0);
  if (num >= 1000000) return 'Rp ' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'Jt';
  if (num >= 1000) return 'Rp ' + Math.round(num / 1000) + 'rb';
  return 'Rp ' + num;
}

function addService(service) {
  const services = getServices();
  const newId = services.length ? Math.max(...services.map(s => s.id)) + 1 : 1;
  service.id = newId;
  services.push(service);
  saveServices(services);
}

function updateService(id, updated) {
  const services = getServices();
  const idx = services.findIndex(s => s.id === Number(id));
  if (idx !== -1) {
    services[idx] = { ...services[idx], ...updated };
    saveServices(services);
  }
}

function deleteServiceById(id) {
  const services = getServices().filter(s => s.id !== Number(id));
  saveServices(services);
}

function getServiceById(id) {
  return getServices().find(s => s.id === Number(id));
}

// ============================================================
// "DATABASE" LOKAL PAKAI localStorage - PROMOS
// ============================================================
const PROMOS_KEY = 'duta_garage_promos';

function getPromos() {
  const data = localStorage.getItem(PROMOS_KEY);
  if (data) return JSON.parse(data);
  const seed = [
    { id: 1, name: 'Standar', tier: 'STANDARD', price: 750000, desc: 'Perawatan esensial untuk pengguna harian.', benefits: [], active: true, featured: false, expiry: '' },
    { id: 2, name: 'Premium', tier: 'PREMIUM', price: 1850000, desc: 'Penyetelan yang dioptimalkan.', benefits: [], active: true, featured: true, expiry: '2026-12-31' },
    { id: 3, name: 'Luxury', tier: 'LUXURY', price: 4200000, desc: 'Layanan setingkat concierge untuk kendaraan premium.', benefits: [], active: true, featured: false, expiry: '' }
  ];
  localStorage.setItem(PROMOS_KEY, JSON.stringify(seed));
  return seed;
}

function savePromos(promos) {
  localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
}

function addPromo(promo) {
  const promos = getPromos();
  const newId = promos.length ? Math.max(...promos.map(p => p.id)) + 1 : 1;
  promo.id = newId;
  promos.push(promo);
  savePromos(promos);
  return promo;
}

function updatePromo(id, updated) {
  const promos = getPromos();
  const idx = promos.findIndex(p => p.id === Number(id));
  if (idx !== -1) {
    promos[idx] = { ...promos[idx], ...updated };
    savePromos(promos);
  }
}

function deletePromoById(id) {
  const promos = getPromos().filter(p => p.id !== Number(id));
  savePromos(promos);
}

function getPromoById(id) {
  return getPromos().find(p => p.id === Number(id));
}

function tierLabel(tier) {
  const map = { STANDARD: 'STANDAR', PREMIUM: 'PREMIUM', LUXURY: 'LUXURY' };
  return map[tier] || tier;
}

function getServiceCategories() {
  return [...new Set(getServices().map(s => s.category).filter(Boolean))].sort();
}

function populateCategoryFilterOptions(selectEl, selectedValue) {
  if (!selectEl) return;
  const categories = getServiceCategories();
  selectEl.innerHTML = '<option value="">Semua Kategori</option>' +
    categories.map(c => `<option value="${c}">${c}</option>`).join('');
  selectEl.value = selectedValue || '';
}

function renderServiceCards(filterText, categoryFilter) {
  const container = document.getElementById('serviceCardsContainer');
  if (!container) return;
  const all = getServices();
  let services = all;

  if (categoryFilter) {
    services = services.filter(s => s.category === categoryFilter);
  }
  if (filterText) {
    const f = filterText.toLowerCase();
    services = services.filter(s =>
      (s.name || '').toLowerCase().includes(f) ||
      (s.category || '').toLowerCase().includes(f) ||
      (s.status || '').toLowerCase().includes(f)
    );
  }

  // Statistik selalu dihitung dari SELURUH data, bukan hasil filter
  const statTotal = document.getElementById('statTotalLayanan');
  if (statTotal) statTotal.textContent = all.length;
  const statHarga = document.getElementById('statHargaRata');
  if (statHarga) {
    const avg = all.length ? all.reduce((sum, s) => sum + Number(s.price || 0), 0) / all.length : 0;
    statHarga.textContent = formatRupiahShort(avg);
  }
  const statKategori = document.getElementById('statTotalKategori');
  if (statKategori) statKategori.textContent = getServiceCategories().length;

  const wrenchIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjcgNi4zYTQgNCAwIDAwLTUuNCA0LjlMNCAxNi41VjIwaDMuNWw1LjMtNS4zYTQgNCAwIDAwNC45LTUuNGwtMi42IDIuNi0yLTIgMi42LTIuNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==";
  const editIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjUgMy41bDMgM0w3IDE2SDR2LTNsOS41LTkuNXoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==";
  const deleteIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNmgxMk04IDZWNC41QTEuNSAxLjUgMCAwMTkuNSAzaDFBMS41IDEuNSAwIDAxMTIgNC41VjZNNiA2bC43IDkuNEExLjUgMS41IDAgMDA4LjIgMTdoMy42YTEuNSAxLjUgMCAwMDEuNS0xLjZMMTQgNiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4K";

  if (!services.length) {
    container.innerHTML = `<div style="grid-column:1/-1;padding:48px 24px;text-align:center;color:#6b7280;font-size:14px;">Tidak ada layanan yang cocok dengan pencarian/filter.</div>`;
    return;
  }

  container.innerHTML = services.map(s => {
    const isActive = s.status === 'ACTIVE';
    return `
      <div class="service-card-1-65">
        <div class="margin-66">
          <div class="container-67">
            <div class="overlay-border-68"><div class="container-69"><img src="${wrenchIcon}" class="icon-70" alt="icon" /></div></div>
            <div class="${isActive ? 'overlay-border-71' : 'background-border-121'}">
              <p class="text-72"><span class="${isActive ? 'text-rgb-16-185-129' : 'text-rgb-215-195-174'}">${s.status}</span></p>
            </div>
          </div>
        </div>
        <div class="heading-3-margin-73"><div class="heading-3-74"><p class="text-75"><span class="text-rgb-212-228-250">${s.name}</span></p></div></div>
        <div class="margin-76"><div class="container-77"><p class="text-78"><span class="text-rgb-215-195-174">${s.desc}</span></p></div></div>
        <div class="horizontalborder-79">
          <div class="container-80"><div class="container-81"><p class="text-82"><span class="text-rgb-255-203-138">${formatRupiah(s.price)}</span></p></div></div>
          <div class="container-83">
            <div class="button-84" data-id="${s.id}"><div class="container-85"><img src="${editIcon}" class="icon-86" alt="icon" /></div></div>
            <div class="button-87" data-id="${s.id}"><div class="container-88"><img src="${deleteIcon}" class="icon-89" alt="icon" /></div></div>
          </div>
        </div>
      </div>`;
  }).join('');

  container.querySelectorAll('.button-84').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => navigateTo('edit-service.html?id=' + btn.dataset.id);
  });
  container.querySelectorAll('.button-87').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      const id = btn.dataset.id;
      showModal('Hapus Layanan', 'Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan.',
        () => { deleteServiceById(id); renderServiceCards(); showToast('Layanan berhasil dihapus.', 'success'); },
        'Hapus', 'Batal');
    };
  });
}

// ===================== LIST SERVICE PAGE =====================
function initListServicePage() {
  const searchInput = document.getElementById('serviceSearchInput');
  const categorySelect = document.getElementById('serviceCategoryFilter');

  populateCategoryFilterOptions(categorySelect, '');
  renderServiceCards('', '');

  const runFilter = () => {
    renderServiceCards(
      searchInput ? searchInput.value : '',
      categorySelect ? categorySelect.value : ''
    );
  };

  if (searchInput) searchInput.addEventListener('input', runFilter);
  if (categorySelect) categorySelect.addEventListener('change', runFilter);

  const resetBtn = document.getElementById('btnResetFilter');
  if (resetBtn) {
    resetBtn.style.cursor = 'pointer';
    resetBtn.onclick = () => {
      if (searchInput) searchInput.value = '';
      if (categorySelect) categorySelect.value = '';
      renderServiceCards('', '');
      showToast('Filter direset.', 'info');
    };
  }

  const tambahBtn = document.querySelector('.button-17');
  if (tambahBtn) { tambahBtn.style.cursor = 'pointer'; tambahBtn.onclick = () => navigateTo('tambah-service.html'); }
  const loadMoreBtn = document.querySelector('.button-216');
  if (loadMoreBtn) { loadMoreBtn.style.cursor = 'pointer'; loadMoreBtn.onclick = () => showToast('Semua layanan telah dimuat.', 'info'); }
  const kelolaLayananLink = document.querySelector('.link-227');
  if (kelolaLayananLink) { kelolaLayananLink.style.cursor = 'pointer'; kelolaLayananLink.onclick = () => navigateTo('list-service.html'); }
  const kelolaPromoLink = document.querySelector('.link-234');
  if (kelolaPromoLink) { kelolaPromoLink.style.cursor = 'pointer'; kelolaPromoLink.onclick = () => navigateTo('list-promo.html'); }
  const logoutBtn = document.querySelector('.node-240');
  if (logoutBtn) { logoutBtn.style.cursor = 'pointer'; logoutBtn.onclick = () => showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal'); }
}

// ===================== EDIT SERVICE PAGE =====================
function initEditServicePage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const service = id ? getServiceById(id) : null;

  if (service) {
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceCategory').value = service.category;
    document.getElementById('servicePrice').value = service.price;
    document.getElementById('serviceDesc').value = service.desc;
  }

  const simpanBtn = document.getElementById('btnSimpanPerubahan');
  if (simpanBtn) {
    simpanBtn.onclick = () => {
      updateService(id, {
        name: document.getElementById('serviceName').value.trim(),
        category: document.getElementById('serviceCategory').value,
        price: Number(document.getElementById('servicePrice').value.replace(/[^0-9]/g, '')),
        desc: document.getElementById('serviceDesc').value.trim()
      });
      showToast('Perubahan layanan berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1200);
    };
  }
  const batalBtn = document.getElementById('btnBatalkanEdit');
  if (batalBtn) batalBtn.onclick = () => showModal('Batalkan Perubahan', 'Perubahan yang belum disimpan akan hilang. Lanjutkan?', () => navigateTo('list-service.html'), 'Ya, Batalkan', 'Kembali');
}

// ===================== TAMBAH SERVICE PAGE =====================
function initTambahServicePage() {
  const publikasiBtn = document.getElementById('btnSimpanLayanan');
  if (publikasiBtn) {
    publikasiBtn.onclick = () => {
      const name = document.getElementById('serviceName').value.trim();
      const category = document.getElementById('serviceCategory').value;
      const price = document.getElementById('servicePrice').value.replace(/[^0-9]/g, '');
      const desc = document.getElementById('serviceDesc').value.trim();
      if (!name || !price) { showToast('Nama layanan dan harga wajib diisi.', 'error'); return; }
      addService({ name, category, price: Number(price), desc, status: 'ACTIVE' });
      showToast('Layanan baru berhasil ditambahkan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1200);
    };
  }
  const batalBtn = document.getElementById('btnBatalkanLayanan');
  if (batalBtn) batalBtn.onclick = () => navigateTo('list-service.html');
}

// ===================== LIST PROMO PAGE =====================
function renderPromoRows(filterText) {
  const container = document.getElementById('promoTableBody');
  if (!container) return;
  const all = getPromos();
  let promos = all;
  if (filterText) {
    const f = filterText.toLowerCase();
    promos = all.filter(p =>
      p.name.toLowerCase().includes(f) ||
      (p.tier || '').toLowerCase().includes(f) ||
      (p.active ? 'active' : 'inactive').includes(f)
    );
  }

  const statActive = document.getElementById('statActivePromo');
  if (statActive) statActive.textContent = all.filter(p => p.active).length;
  const statRevenue = document.getElementById('statRevenue');
  if (statRevenue) statRevenue.textContent = formatRupiahShort(all.reduce((sum, p) => sum + (p.active ? p.price : 0), 0));

  if (!promos.length) {
    container.innerHTML = `<div style="padding:48px 24px;text-align:center;color:#6b7280;font-size:14px;">Belum ada promosi yang cocok.</div>`;
    return;
  }

  container.innerHTML = promos.map(p => `
    <div class="row-78" data-id="${p.id}">
      <div class="data-79">
        <div class="overlay-80"><div class="container-81" style="font-size:18px;">🏷️</div></div>
        <div class="container-83">
          <div class="container-84" style="display:flex;align-items:center;gap:8px;">
            <p class="text-85" style="margin:0;"><span>${p.name}</span></p>
            ${p.featured ? '<span class="background-113"><span class="text-114">POPULAR</span></span>' : ''}
          </div>
          <div class="container-86"><p class="text-87"><span>${p.desc || ''}</span></p></div>
        </div>
      </div>
      <div class="data-88"><div class="background-89"><p class="text-90"><span>${tierLabel(p.tier)}</span></p></div></div>
      <div class="data-91"><p class="text-92"><span>${formatRupiah(p.price)}</span></p></div>
      <div class="data-93">
        <div class="overlay-94" style="background:${p.active ? 'rgba(34,197,94,0.1)' : 'rgba(239,99,99,0.1)'};">
          <div class="background-95" style="background:${p.active ? '#4ade80' : '#ef6363'};"></div>
          <p class="text-96" style="color:${p.active ? '#4ade80' : '#ef6363'};"><span>${p.active ? 'Active' : 'Inactive'}</span></p>
        </div>
      </div>
      <div class="data-97">
        <div class="button-98 promo-edit-btn" data-id="${p.id}" title="Edit"><span>✏️</span></div>
        <div class="button-101 promo-delete-btn" data-id="${p.id}" title="Hapus"><span>🗑️</span></div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.promo-edit-btn').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => navigateTo('edit-promo.html?id=' + btn.dataset.id);
  });
  container.querySelectorAll('.promo-delete-btn').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      const id = btn.dataset.id;
      showModal('Hapus Promo', 'Apakah Anda yakin ingin menghapus promo ini? Tindakan ini tidak dapat dibatalkan.',
        () => {
          deletePromoById(id);
          renderPromoRows(document.getElementById('promoSearchInput') ? document.getElementById('promoSearchInput').value : '');
          showToast('Promo berhasil dihapus.', 'success');
        },
        'Hapus', 'Batal');
    };
  });
}

function initListPromoPage() {
  renderPromoRows('');
  const tambahBtn = document.getElementById('btnTambahPromo');
  if (tambahBtn) { tambahBtn.style.cursor = 'pointer'; tambahBtn.onclick = () => navigateTo('tambah-promo.html'); }
  const searchInput = document.getElementById('promoSearchInput');
  if (searchInput) { searchInput.addEventListener('input', () => renderPromoRows(searchInput.value)); }
  const kelolaLayananLink = document.getElementById('navKelolaLayanan');
  if (kelolaLayananLink) { kelolaLayananLink.style.cursor = 'pointer'; kelolaLayananLink.onclick = () => navigateTo('list-service.html'); }
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) { logoutBtn.style.cursor = 'pointer'; logoutBtn.onclick = () => showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal'); }
}

// ===================== TAMBAH PROMO PAGE =====================
function wireBenefitRemoval(row) {
  const removeBtn = row.querySelector('.icon-btn');
  if (removeBtn) {
    removeBtn.onclick = () => {
      const container = document.getElementById('benefitsContainer');
      if (container && container.children.length <= 1) {
        row.querySelector('.benefit-input').value = '';
        return;
      }
      row.remove();
    };
  }
}

function initTambahPromoPage() {
  document.querySelectorAll('#benefitsContainer .benefit-row').forEach(wireBenefitRemoval);

  const addFeatureBtn = document.getElementById('btnAddFeature');
  if (addFeatureBtn) {
    addFeatureBtn.style.cursor = 'pointer';
    addFeatureBtn.onclick = () => {
      const container = document.getElementById('benefitsContainer');
      if (!container) return;
      const row = document.createElement('div');
      row.className = 'benefit-row';
      row.innerHTML = `
        <input type="text" class="benefit-input" placeholder="Add a key benefit point...">
        <div class="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        </div>`;
      container.appendChild(row);
      wireBenefitRemoval(row);
    };
  }

  const bannerUpload = document.getElementById('promoBannerDropzone');
  if (bannerUpload) {
    bannerUpload.style.cursor = 'pointer';
    bannerUpload.onclick = () => showToast('Catatan: banner gambar belum didukung di penyimpanan lokal (localStorage).', 'info');
  }

  const toggleActive = document.getElementById('toggleActive');
  if (toggleActive) {
    toggleActive.style.cursor = 'pointer';
    toggleActive.onclick = () => toggleActive.classList.toggle('on');
  }
  const toggleFeatured = document.getElementById('toggleFeatured');
  if (toggleFeatured) {
    toggleFeatured.style.cursor = 'pointer';
    toggleFeatured.onclick = () => toggleFeatured.classList.toggle('on');
  }

  const batalBtn = document.getElementById('btnBatalPromo');
  if (batalBtn) {
    batalBtn.onclick = () => {
      showModal('Batalkan', 'Semua data yang diisi akan hilang. Lanjutkan?',
        () => navigateTo('list-promo.html'), 'Ya, Batalkan', 'Kembali');
    };
  }

  const simpanBtn = document.getElementById('btnSimpanPromo');
  if (simpanBtn) {
    simpanBtn.onclick = () => {
      const name = document.getElementById('promoName').value.trim();
      const tier = document.getElementById('promoTier').value;
      const priceRaw = document.getElementById('promoPrice').value.replace(/[^0-9]/g, '');
      const desc = document.getElementById('promoDesc') ? document.getElementById('promoDesc').value.trim() : '';
      const benefits = [...document.querySelectorAll('#benefitsContainer .benefit-input')]
        .map(i => i.value.trim()).filter(Boolean);
      const active = toggleActive ? toggleActive.classList.contains('on') : true;
      const featured = toggleFeatured ? toggleFeatured.classList.contains('on') : false;
      const expiry = document.getElementById('promoExpiry') ? document.getElementById('promoExpiry').value : '';

      if (!name || !priceRaw) {
        showToast('Nama promo dan harga wajib diisi.', 'error');
        return;
      }

      addPromo({ name, tier, price: Number(priceRaw), desc, benefits, active, featured, expiry });
      showToast('Promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-promo.html'), 1200);
    };
  }
}

// ===================== EDIT PROMO PAGE =====================
function initEditPromoPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const promo = id ? getPromoById(id) : null;

  if (!promo) {
    showToast('Promo tidak ditemukan.', 'error');
  } else {
    document.getElementById('promoName').value = promo.name;
    document.getElementById('promoPrice').value = formatRupiah(promo.price);
    document.getElementById('promoTier').value = promo.tier;
    if (document.getElementById('promoDesc')) document.getElementById('promoDesc').value = promo.desc || '';
    const activeToggle = document.getElementById('activeToggle');
    if (activeToggle) activeToggle.checked = !!promo.active;
    if (document.getElementById('promoExpiry')) document.getElementById('promoExpiry').value = promo.expiry || '';
  }

  const form = document.getElementById('editPromoForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('promoName').value.trim();
      const tier = document.getElementById('promoTier').value;
      const priceRaw = document.getElementById('promoPrice').value.replace(/[^0-9]/g, '');
      const desc = document.getElementById('promoDesc') ? document.getElementById('promoDesc').value.trim() : '';
      const active = document.getElementById('activeToggle') ? document.getElementById('activeToggle').checked : true;
      const expiry = document.getElementById('promoExpiry') ? document.getElementById('promoExpiry').value : '';

      if (!name || !priceRaw) {
        showToast('Nama promo dan harga wajib diisi.', 'error');
        return;
      }

      updatePromo(id, { name, tier, price: Number(priceRaw), desc, active, expiry });
      showToast('Perubahan promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-promo.html'), 1200);
    });
  }

  const batalBtn = document.getElementById('btnBatalEditPromo');
  if (batalBtn) {
    batalBtn.onclick = () => {
      showModal('Batalkan Perubahan', 'Perubahan yang belum disimpan akan hilang. Lanjutkan?',
        () => navigateTo('list-promo.html'), 'Ya, Batalkan', 'Kembali');
    };
  }
}

// ===================== LOGIN PAGE =====================
function initLoginPage() {
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.style.cursor = 'pointer';
    loginBtn.onclick = () => {
      showToast('Memverifikasi kredensial...', 'info');
      setTimeout(() => {
        showToast('Login berhasil! Selamat datang, Admin.', 'success');
        setTimeout(() => navigateTo('list-service.html'), 1000);
      }, 1000);
    };
  }
  const togglePwd = document.querySelector('.toggle-password');
  if (togglePwd) {
    togglePwd.style.cursor = 'pointer';
    let shown = false;
    togglePwd.onclick = () => {
      shown = !shown;
      const pwdInput = document.getElementById('password');
      if (pwdInput) pwdInput.type = shown ? 'text' : 'password';
    };
  }
  const forgotLink = document.querySelector('.forgot-link');
  if (forgotLink) {
    forgotLink.style.cursor = 'pointer';
    forgotLink.onclick = () => navigateTo('reset-password.html');
  }
  const registerLink = document.querySelector('.signup-link a');
  if (registerLink) {
    registerLink.style.cursor = 'pointer';
    registerLink.onclick = () => navigateTo('register.html');
  }
  const rememberMe = document.querySelector('.checkbox-group input[type="checkbox"]');
  if (rememberMe) {
    rememberMe.style.cursor = 'pointer';
  }
}

// ===================== REGISTER PAGE =====================
function initRegisterPage() {
  const createBtn = document.querySelector('#registerBtn');
  if (createBtn) {
    createBtn.style.cursor = 'pointer';
    createBtn.onclick = () => {
      showToast('Membuat akun baru...', 'info');
      setTimeout(() => {
        showToast('Akun berhasil dibuat! Silakan login.', 'success');
        setTimeout(() => navigateTo('login.html'), 1200);
      }, 1200);
    };
  }
  const togglePwd = document.querySelector('.eye');
  if (togglePwd) {
    togglePwd.style.cursor = 'pointer';
    let shown = false;
    togglePwd.onclick = () => {
      shown = !shown;
      const pwdInput = document.getElementById('pwd');
      if (pwdInput) pwdInput.type = shown ? 'text' : 'password';
    };
  }
  const loginLink = document.querySelector('.signin a');
  if (loginLink) {
    loginLink.style.cursor = 'pointer';
    loginLink.onclick = () => navigateTo('login.html');
  }
}

// ===================== RESET PASSWORD PAGE =====================
function initResetPasswordPage() {
  const kirimBtn = document.querySelector('#resetBtn');
  if (kirimBtn) {
    kirimBtn.style.cursor = 'pointer';
    kirimBtn.onclick = () => {
      const email = document.getElementById('email') ? document.getElementById('email').value : '';
      showToast(`Tautan reset password telah dikirim ke ${email || 'email Anda'}.`, 'success');
      setTimeout(() => navigateTo('login.html'), 2000);
    };
  }
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.style.cursor = 'pointer';
    backLink.onclick = () => navigateTo('login.html');
  }
}

// ===================== AUTO DETECT PAGE =====================
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split('/').pop();

  if (page === 'landing-page.html' || page === '' || page === 'index.html') {
    initLandingPage();
  } else if (page === 'layanan.html') {
    initLayananPage();
  } else if (page === 'tentang-kami.html') {
    initTentangKamiPage();
  } else if (page === 'list-service.html') {
    initListServicePage();
  } else if (page === 'edit-service.html') {
    initEditServicePage();
  } else if (page === 'tambah-service.html') {
    initTambahServicePage();
  } else if (page === 'list-promo.html') {
    initListPromoPage();
  } else if (page === 'tambah-promo.html') {
    initTambahPromoPage();
  } else if (page === 'edit-promo.html') {
    initEditPromoPage();
  } else if (page === 'login.html') {
    initLoginPage();
  } else if (page === 'register.html') {
    initRegisterPage();
  } else if (page === 'reset-password.html') {
    initResetPasswordPage();
  }
});