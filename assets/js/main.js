(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => { nav?.classList.remove('open'); document.body.classList.remove('menu-open'); menuButton?.setAttribute('aria-expanded','false'); };
  menuButton?.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); document.body.classList.toggle('menu-open', open); menuButton.setAttribute('aria-expanded', String(open)); });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Để kết nối Google Apps Script/API thật, thay chuỗi rỗng bên dưới bằng endpoint.
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzzQaEvq5aBP9TEaUfFjqpWn8txNpqS_xZ8LyssUR_2_H0GZFR0isUYRtyihTpFHXSZCw/exec';
  const form = document.getElementById('lead-form');
  const status = document.getElementById('form-status');
  const setStatus = (message, type) => { status.textContent = message; status.className = `form-status show ${type}`; };
  const showError = (input, message) => { input.setAttribute('aria-invalid', message ? 'true' : 'false'); const error = document.getElementById(`${input.id}-error`); if (error) error.textContent = message; };
  const validPhone = value => /^(?:\+?84|0)(?:\d[\s.-]?){8,10}$/.test(value.trim());
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const name = form.elements.name; const phone = form.elements.phone; const submit = form.querySelector('button[type="submit"]');
    showError(name, name.value.trim().length < 2 ? 'Vui lòng nhập họ và tên.' : '');
    showError(phone, !validPhone(phone.value) ? 'Vui lòng nhập số điện thoại hợp lệ.' : '');
    if (name.getAttribute('aria-invalid') === 'true' || phone.getAttribute('aria-invalid') === 'true') { setStatus('Vui lòng kiểm tra lại các trường được đánh dấu.', 'fail'); form.querySelector('[aria-invalid="true"]')?.focus(); return; }
    submit.disabled = true; submit.textContent = 'Đang gửi thông tin…'; setStatus('Đang chuẩn bị yêu cầu tư vấn của bạn…', 'info');
    try {
      if (!FORM_ENDPOINT) { await new Promise(resolve => setTimeout(resolve, 650)); setStatus('Form đang ở chế độ demo nên thông tin chưa được gửi lên máy chủ. Vui lòng gọi 0922 396 033 hoặc cấu hình endpoint trong assets/js/main.js.', 'info'); return; }
      const response = await fetch(FORM_ENDPOINT, { method:'POST', redirect:'follow', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (!result.ok) throw new Error(result.message || 'Save failed');
      setStatus('Cảm ơn bạn! FACESEO đã nhận thông tin và sẽ liên hệ sớm.', 'success'); form.reset();
    } catch { setStatus('Chưa thể gửi thông tin. Vui lòng thử lại hoặc gọi 0922 396 033.', 'fail'); }
    finally { submit.disabled = false; submit.textContent = 'Gửi yêu cầu tư vấn'; }
  });
})();
