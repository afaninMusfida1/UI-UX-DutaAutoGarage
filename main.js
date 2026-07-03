/**
 * DUTA AUTO GARAGE - Main JavaScript
 * Handles all interactive functionality across all pages
 */

// ============================================================
// NAVIGATION HELPERS
// ============================================================
function navigateTo(page) {
  window.location.href = page;
}

// ============================================================
// TOAST / NOTIFICATION SYSTEM
// ============================================================
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

// ============================================================
// MODAL SYSTEM
// ============================================================
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

// ============================================================
// LANDING PAGE (landing-page.html)
// ============================================================
function initLandingPage() {
  // Nav links
  const navLinks = document.querySelectorAll('.nav-63 .link-67, .nav-63 .link-69, .nav-63 .link-71');
  const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
  navLinks.forEach((link, i) => {
    link.style.cursor = 'pointer';
    link.onclick = () => navigateTo(pages[i]);
  });

  // Booking buttons
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk booking servis...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20booking%20servis%20di%20Duta%20Auto%20Garage', '_blank'), 1000);
    };
  });

  // FAQ accordion
  document.querySelectorAll('.details-163, .details-169, .details-175').forEach(detail => {
    const summary = detail.querySelector('.slot-summary-164, .slot-summary-170, .slot-summary-176');
    if (!summary) return;
    summary.style.cursor = 'pointer';
    const icon = summary.querySelector('img');
    let open = false;
    summary.onclick = () => {
      open = !open;
      if (icon) icon.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      // Show/hide content answer
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

  // WhatsApp links
  document.querySelectorAll('.link-57, .link-59, .link-61, .link-67, .link-69, .link-71').forEach(link => {
    if (link.querySelector && link.querySelector('.text-62')) {
      link.style.cursor = 'pointer';
      link.onclick = () => window.open('https://wa.me/6285713004631', '_blank');
    }
  });
}

// ============================================================
// LAYANAN PAGE (layanan.html)
// ============================================================
function initLayananPage() {
  // Nav
  const nav3 = document.querySelector('.nav-3');
  if (nav3) {
    const links = nav3.querySelectorAll('.link-7, .link-9, .link-11');
    const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
    links.forEach((link, i) => {
      link.style.cursor = 'pointer';
      link.onclick = () => navigateTo(pages[i]);
    });
  }

  // Booking button (nav)
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk reservasi...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20reservasi%20layanan', '_blank'), 1000);
    };
  });

  // WhatsApp konsultasi
  const waLink = document.querySelector('.link-383');
  if (waLink) {
    waLink.style.cursor = 'pointer';
    waLink.onclick = () => window.open('https://wa.me/6285713004631?text=Halo%2C%20saya%20ingin%20konsultasi%20teknis', '_blank');
  }

  // Lihat Layanan Kami
  const lihatLayanan = document.querySelector('.link-387');
  if (lihatLayanan) {
    lihatLayanan.style.cursor = 'pointer';
    lihatLayanan.onclick = () => navigateTo('layanan.html');
  }
}

// ============================================================
// TENTANG KAMI PAGE (tentang-kami.html)
// ============================================================
function initTentangKamiPage() {
  // Nav
  const nav3 = document.querySelector('.nav-3');
  if (nav3) {
    const links = nav3.querySelectorAll('.link-7, .link-9, .link-11');
    const pages = ['landing-page.html', 'layanan.html', 'tentang-kami.html'];
    links.forEach((link, i) => {
      link.style.cursor = 'pointer';
      link.onclick = () => navigateTo(pages[i]);
    });
  }

  // Booking button
  document.querySelectorAll('.property-1-default').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showToast('Mengarahkan ke WhatsApp untuk booking...', 'success');
      setTimeout(() => window.open('https://wa.me/6285713004631', '_blank'), 1000);
    };
  });

  // WhatsApp konsultasi
  const waLink = document.querySelector('.link-163');
  if (waLink) {
    waLink.style.cursor = 'pointer';
    waLink.onclick = () => window.open('https://wa.me/6285713004631', '_blank');
  }

  // Lihat Layanan Kami
  const lihatLayanan = document.querySelector('.link-167');
  if (lihatLayanan) {
    lihatLayanan.style.cursor = 'pointer';
    lihatLayanan.onclick = () => navigateTo('layanan.html');
  }
}

// ============================================================
// LIST SERVICE PAGE (list-service.html)
// ============================================================
function initListServicePage() {
  // Tambah Layanan Baru button
  const tambahBtn = document.querySelector('.button-17');
  if (tambahBtn) {
    tambahBtn.style.cursor = 'pointer';
    tambahBtn.onclick = () => navigateTo('tambah-service.html');
  }

  // Edit buttons (icon pencil - button-84, 109, 134, 159, 184, 209)
  const editBtns = document.querySelectorAll('.button-84, .button-109, .button-134, .button-159, .button-184, .button-209');
  editBtns.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => navigateTo('edit-service.html');
  });

  // Delete buttons (trash icon - button-87, 112, 137, 162, 187, 212)
  const deleteBtns = document.querySelectorAll('.button-87, .button-112, .button-137, .button-162, .button-187, .button-212');
  deleteBtns.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      showModal(
        'Hapus Layanan',
        'Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan.',
        () => showToast('Layanan berhasil dihapus.', 'success'),
        'Hapus',
        'Batal'
      );
    };
  });

  // Load more button
  const loadMoreBtn = document.querySelector('.button-216');
  if (loadMoreBtn) {
    loadMoreBtn.style.cursor = 'pointer';
    loadMoreBtn.onclick = () => showToast('Semua layanan telah dimuat.', 'info');
  }

  // Sidebar navigation
  const kelolaLayananLink = document.querySelector('.link-227');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-234');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('tambah-promo.html');
  }

  // Logout
  const logoutBtn = document.querySelector('.node-240');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }

  // Search input
  const searchInput = document.querySelector('.input-49');
  if (searchInput) {
    searchInput.style.cursor = 'text';
    searchInput.onclick = () => {
      const placeholder = searchInput.querySelector('p');
      if (placeholder) placeholder.style.opacity = '0.3';
    };
  }
}

// ============================================================
// EDIT SERVICE PAGE (edit-service.html)
// ============================================================
function initEditServicePage() {
  // Simpan Perubahan button
  const simpanBtn = document.querySelector('.button-76');
  if (simpanBtn) {
    simpanBtn.style.cursor = 'pointer';
    simpanBtn.onclick = () => {
      showToast('Perubahan layanan berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }

  // Batalkan button
  const batalBtn = document.querySelector('.button-79');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan Perubahan', 'Perubahan yang belum disimpan akan hilang. Lanjutkan?',
        () => navigateTo('list-service.html'), 'Ya, Batalkan', 'Kembali');
    };
  }

  // File upload area
  const uploadArea = document.querySelector('.border-91');
  if (uploadArea) {
    uploadArea.style.cursor = 'pointer';
    uploadArea.onclick = () => showToast('Pilih file gambar untuk diunggah.', 'info');
  }

  // Sidebar
  const kelolaLayananLink = document.querySelector('.link-109');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-116');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('tambah-promo.html');
  }

  // Logout
  const logoutBtn = document.querySelector('.node-122');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }
}

// ============================================================
// TAMBAH SERVICE PAGE (tambah-service.html)
// ============================================================
function initTambahServicePage() {
  // Publikasikan button
  const publikasiBtn = document.querySelector('.button-85');
  if (publikasiBtn) {
    publikasiBtn.style.cursor = 'pointer';
    publikasiBtn.onclick = () => {
      showToast('Layanan baru berhasil dipublikasikan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }

  // Batal button
  const batalBtn = document.querySelector('.button-87');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan', 'Data yang sudah diisi akan hilang. Lanjutkan?',
        () => navigateTo('list-service.html'), 'Ya, Batal', 'Kembali');
    };
  }

  // File upload area
  const uploadArea = document.querySelector('.overlay-border-47');
  if (uploadArea) {
    uploadArea.style.cursor = 'pointer';
    uploadArea.onclick = () => showToast('Pilih file gambar untuk diunggah (PNG, JPG, maks. 10MB).', 'info');
  }

  // Sidebar
  const kelolaLayananLink = document.querySelector('.link-115');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-122');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('tambah-promo.html');
  }

  // Logout
  const logoutBtn = document.querySelector('.node-128');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }
}

// ============================================================
// TAMBAH PROMO PAGE (tambah-promo.html)
// ============================================================
function initTambahPromoPage() {
  // Add Another Feature button
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

  // Banner upload area
  const bannerUpload = document.querySelector('.background-border-85');
  if (bannerUpload) {
    bannerUpload.style.cursor = 'pointer';
    bannerUpload.onclick = () => showToast('Pilih file gambar banner (PNG/JPG, 1200x600px).', 'info');
  }

  // Toggle Active Status
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

  // Toggle Featured Promo
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

  // Batalkan Perubahan button
  const batalBtn = document.querySelector('.button-138');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan', 'Semua data yang diisi akan direset. Lanjutkan?',
        () => { showToast('Form direset.', 'info'); }, 'Ya, Reset', 'Kembali');
    };
  }

  // Simpan button
  const simpanBtn = document.querySelector('.button-140');
  if (simpanBtn) {
    simpanBtn.style.cursor = 'pointer';
    simpanBtn.onclick = () => {
      showToast('Promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }

  // Sidebar navigation
  const kelolaLayananLink = document.querySelector('.link-153');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-160');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('tambah-promo.html');
  }

  // Logout
  const logoutBtn = document.querySelector('.node-166');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }
}

// ============================================================
// EDIT PROMO PAGE (edit-promo.html)
// ============================================================
function initEditPromoPage() {
  // Add Another Feature button
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

  // Delete feature buttons
  document.querySelectorAll('.button-65, .button-72').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      const parent = btn.closest('.container-61, .container-68');
      if (parent) { parent.remove(); showToast('Fitur dihapus.', 'info'); }
    };
  });

  // Banner upload area
  const bannerUpload = document.querySelector('.background-border-85');
  if (bannerUpload) {
    bannerUpload.style.cursor = 'pointer';
    bannerUpload.onclick = () => showToast('Pilih file gambar banner (PNG/JPG, 1200x600px).', 'info');
  }

  // Toggle Active Status
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

  // Toggle Featured Promo
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

  // Batalkan Perubahan button
  const batalBtn = document.querySelector('.button-138');
  if (batalBtn) {
    batalBtn.style.cursor = 'pointer';
    batalBtn.onclick = () => {
      showModal('Batalkan Perubahan', 'Perubahan yang belum disimpan akan hilang. Lanjutkan?',
        () => navigateTo('list-service.html'), 'Ya, Batalkan', 'Kembali');
    };
  }

  // Simpan Perubahan button
  const simpanBtn = document.querySelector('.button-140');
  if (simpanBtn) {
    simpanBtn.style.cursor = 'pointer';
    simpanBtn.onclick = () => {
      showToast('Perubahan promosi berhasil disimpan!', 'success');
      setTimeout(() => navigateTo('list-service.html'), 1500);
    };
  }

  // Sidebar navigation
  const kelolaLayananLink = document.querySelector('.link-153');
  if (kelolaLayananLink) {
    kelolaLayananLink.style.cursor = 'pointer';
    kelolaLayananLink.onclick = () => navigateTo('list-service.html');
  }
  const kelolaPromoLink = document.querySelector('.link-160');
  if (kelolaPromoLink) {
    kelolaPromoLink.style.cursor = 'pointer';
    kelolaPromoLink.onclick = () => navigateTo('tambah-promo.html');
  }

  // Logout
  const logoutBtn = document.querySelector('.node-166');
  if (logoutBtn) {
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.onclick = () => {
      showModal('Logout', 'Apakah Anda yakin ingin keluar?', () => navigateTo('login.html'), 'Logout', 'Batal');
    };
  }
}

// ============================================================
// LOGIN PAGE (login.html)
// ============================================================
function initLoginPage() {
  // Login button
  const loginBtn = document.querySelector('.login-button-42');
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

  // Toggle password visibility
  const togglePwd = document.querySelector('.button-35');
  if (togglePwd) {
    togglePwd.style.cursor = 'pointer';
    let shown = false;
    togglePwd.onclick = () => {
      shown = !shown;
      const pwdText = document.querySelector('.text-34 span');
      if (pwdText) pwdText.textContent = shown ? 'password123' : '••••••••';
    };
  }

  // Forgot password link
  const forgotLink = document.querySelector('.link-29');
  if (forgotLink) {
    forgotLink.style.cursor = 'pointer';
    forgotLink.onclick = () => navigateTo('reset-password.html');
  }

  // Register link
  const registerLink = document.querySelector('.link-47');
  if (registerLink) {
    registerLink.style.cursor = 'pointer';
    registerLink.onclick = () => navigateTo('register.html');
  }

  // Remember me checkbox
  const rememberMe = document.querySelector('.remember-me-38');
  if (rememberMe) {
    rememberMe.style.cursor = 'pointer';
    let checked = false;
    const checkbox = rememberMe.querySelector('.input-39');
    rememberMe.onclick = () => {
      checked = !checked;
      if (checkbox) {
        checkbox.style.background = checked ? '#ffc880' : '';
        checkbox.style.border = checked ? '2px solid #ffc880' : '2px solid rgba(215,195,174,0.3)';
      }
    };
  }
}

// ============================================================
// REGISTER PAGE (register.html)
// ============================================================
function initRegisterPage() {
  // Create account button
  const createBtn = document.querySelector('.primary-cta-button-77');
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

  // Toggle password visibility
  const togglePwd = document.querySelector('.button-65');
  if (togglePwd) {
    togglePwd.style.cursor = 'pointer';
    let shown = false;
    togglePwd.onclick = () => {
      shown = !shown;
      const pwdText = document.querySelector('.text-64 span');
      if (pwdText) pwdText.textContent = shown ? 'password123' : '••••••••';
    };
  }

  // Login link
  const loginLink = document.querySelector('.footer-bottom-links-80');
  if (loginLink) {
    const loginSpan = loginLink.querySelector('span');
    if (loginSpan && loginSpan.textContent.trim() === 'Login') {
      loginSpan.style.cursor = 'pointer';
      loginSpan.onclick = () => navigateTo('login.html');
    }
  }
}

// ============================================================
// RESET PASSWORD PAGE (reset-password.html)
// ============================================================
function initResetPasswordPage() {
  // Kirim Tautan Reset button
  const kirimBtn = document.querySelector('.button-26');
  if (kirimBtn) {
    kirimBtn.style.cursor = 'pointer';
    kirimBtn.onclick = () => {
      showToast('Tautan reset password telah dikirim ke email Anda.', 'success');
      setTimeout(() => navigateTo('login.html'), 2000);
    };
  }

  // Kembali ke Login link
  const backLink = document.querySelector('.link-33');
  if (backLink) {
    backLink.style.cursor = 'pointer';
    backLink.onclick = () => navigateTo('login.html');
  }
}

// ============================================================
// AUTO-DETECT AND INITIALIZE
// ============================================================
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
