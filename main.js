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
// "DATABASE" LOKAL PAKAI localStorage
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
  return 'Rp ' + Number(num).toLocaleString('id-ID');
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

function renderServiceCards() {
  const container = document.getElementById('serviceCardsContainer');
  if (!container) return;
  const services = getServices();
  const wrenchIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjcgNi4zYTQgNCAwIDAwLTUuNCA0LjlMNCAxNi41VjIwaDMuNWw1LjMtNS4zYTQgNCAwIDAwNC45LTUuNGwtMi42IDIuNi0yLTIgMi42LTIuNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==";
  const editIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjUgMy41bDMgM0w3IDE2SDR2LTNsOS41LTkuNXoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==";
  const deleteIcon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNmgxMk04IDZWNC41QTEuNSAxLjUgMCAwMTkuNSAzaDFBMS41IDEuNSAwIDAxMTIgNC41VjZNNiA2bC43IDkuNEExLjUgMS41IDAgMDA4LjIgMTdoMy42YTEuNSAxLjUgMCAwMDEuNS0xLjZMMTQgNiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4K";

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
  renderServiceCards();
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

// ===================== TAMBAH PROMO PAGE =====================
function initTambahPromoPage() {
  const addFeatureBtn = document.querySelector('.button-75');
  if (addFeatureBtn) {
    addFeatureBtn.style.cursor = 'pointer';
    addFeatureBtn.onclick = () => {
      const container = document.querySelector('.container-60');
      if (!container) return;
      const newFeature = document.createElement('div');
      newFeature.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:8px;';
      newFeature.innerHTML = `
        <div style="flex:1;padding:10px 14px;background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);border-radius:6px;cursor:text;">
          <p style="color:#6b7280;font-size:14px;">Add a key benefit point...</p>
        </div>
        <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;
          background:rgba(239,68,68,0.15);border-radius:6px;cursor:pointer;"
          onclick="this.parentElement.remove();showToast('Fitur dihapus.','info')">
          <span style="color:#ef4444;font-size:18px;">×</span>
        </div>
      `;
      container.appendChild(newFeature);
      showToast('Field fitur baru ditambahkan.', 'success');
    };
  }
  const bannerUpload = document.querySelector('.background-border-85');
  if (bannerUpload) {
    bannerUpload.style.cursor = 'pointer';
    bannerUpload.onclick = () => showToast('Pilih file gambar banner (PNG/JPG, 1200x600px).', 'info');
  }
  const toggleActive = document.querySelector('.label-107');
  if (toggleActive) {
    toggleActive.style.cursor = 'pointer';
    let activeOn = false;
    toggleActive.onclick = () => {
      activeOn = !activeOn;
      const bg = toggleActive.querySelector('.background-108');
      if (bg) bg.style.background = activeOn ? '#10b981' : '';
      showToast(activeOn ? 'Status aktif: Visible to all users.' : 'Status dinonaktifkan.', 'info');
    };
  }
  const toggleFeatured = document.querySelector('.label-116');
  if (toggleFeatured) {
    toggleFeatured.style.cursor = 'pointer';
    let featuredOn = false;
    toggleFeatured.onclick = () => {
      featuredOn = !featuredOn;
      const bg = toggleFeatured.querySelector('.background-117');
      if (bg) bg.style.background = featuredOn ? '#ffc880' : '';
      showToast(featuredOn ? 'Promo ditandai sebagai Featured.' : 'Featured promo dinonaktifkan.', 'info');
    };
  }
  const batalBtn = document.querySelector('.button-138');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan', 'Semua data yang diisi akan direset. Lanjutkan?',
        () => { showToast('Form direset.', 'info'); }, 'Ya, Reset', 'Kembali');
    };
  }
  const simpanBtn = document.querySelector('.button-140');
  if (simpanBtn) {
    simpanBtn.style.cursor = 'pointer';
    simpanBtn.onclick = () => {
      showToast('Promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }
  const kelolaLayananLink = document.querySelector('.link-153');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-160');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('list-promo.html');
  }
  const logoutBtn = document.querySelector('.node-166');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }
}

// ===================== EDIT PROMO PAGE =====================
function initEditPromoPage() {
  const addFeatureBtn = document.querySelector('.button-75');
  if (addFeatureBtn) {
    addFeatureBtn.style.cursor = 'pointer';
    addFeatureBtn.onclick = () => {
      const container = document.querySelector('.container-60');
      if (!container) return;
      const newFeature = document.createElement('div');
      newFeature.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:8px;';
      newFeature.innerHTML = `
        <div style="flex:1;padding:10px 14px;background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);border-radius:6px;cursor:text;">
          <p style="color:#6b7280;font-size:14px;">Add a key benefit point...</p>
        </div>
        <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;
          background:rgba(239,68,68,0.15);border-radius:6px;cursor:pointer;"
          onclick="this.parentElement.remove();showToast('Fitur dihapus.','info')">
          <span style="color:#ef4444;font-size:18px;">×</span>
        </div>
      `;
      container.appendChild(newFeature);
      showToast('Field fitur baru ditambahkan.', 'success');
    };
  }
  document.querySelectorAll('.button-65, .button-72').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      const parent = btn.closest('.container-61, .container-68');
      if (parent) { parent.remove(); showToast('Fitur dihapus.', 'info'); }
    };
  });
  const bannerUpload = document.querySelector('.background-border-85');
  if (bannerUpload) {
    bannerUpload.style.cursor = 'pointer';
    bannerUpload.onclick = () => showToast('Pilih file gambar banner (PNG/JPG, 1200x600px).', 'info');
  }
  const toggleActive = document.querySelector('.label-107');
  if (toggleActive) {
    toggleActive.style.cursor = 'pointer';
    let activeOn = true;
    toggleActive.onclick = () => {
      activeOn = !activeOn;
      const bg = toggleActive.querySelector('.background-108');
      if (bg) bg.style.background = activeOn ? '#10b981' : '';
      showToast(activeOn ? 'Status aktif diaktifkan.' : 'Status dinonaktifkan.', 'info');
    };
  }
  const toggleFeatured = document.querySelector('.label-116');
  if (toggleFeatured) {
    toggleFeatured.style.cursor = 'pointer';
    let featuredOn = false;
    toggleFeatured.onclick = () => {
      featuredOn = !featuredOn;
      const bg = toggleFeatured.querySelector('.background-117');
      if (bg) bg.style.background = featuredOn ? '#ffc880' : '';
      showToast(featuredOn ? 'Promo ditandai sebagai Featured.' : 'Featured promo dinonaktifkan.', 'info');
    };
  }
  const batalBtn = document.querySelector('.button-138');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan Perubahan', 'Perubahan yang belum disimpan akan hilang. Lanjutkan?',
        () => navigateTo('list-service.html'), 'Ya, Batalkan', 'Kembali');
    };
  }
  const simpanBtn = document.querySelector('.button-140');
  if (simpanBtn) {
    simpanBtn.style.cursor = 'pointer';
    simpanBtn.onclick = () => {
      showToast('Perubahan promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }
  const kelolaLayananLink = document.querySelector('.link-153');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-160');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('list-promo.html');
  }
  const logoutBtn = document.querySelector('.node-166');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
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

// ===================== RESET PASSWORD PAGE (diperbaiki) =====================
function initResetPasswordPage() {
  // PERBAIKAN: selector .button-26 diubah menjadi #resetBtn
  const kirimBtn = document.querySelector('#resetBtn');
  if (kirimBtn) {
    kirimBtn.style.cursor = 'pointer';
    kirimBtn.onclick = () => {
      const email = document.getElementById('email')?.value || '';
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