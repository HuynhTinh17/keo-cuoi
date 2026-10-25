// Menu mobile
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? '×' : '☰';
  });
}

// FAQ (chỉ chạy ở trang có FAQ)
document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('span:last-child').textContent = open ? '−' : '＋';
  });
});

// Form liên hệ (chỉ chạy ở trang lien-he)
const leadForm = document.getElementById('leadForm');
const formMsg = document.getElementById('formSuccess');

if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('button[type="submit"]');
    const oldHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Đang gửi...';

    const show = (ok, text) => {
      formMsg.style.display = 'block';
      formMsg.style.background = ok ? '#e8f0df' : '#f8e0da';
      formMsg.style.color = ok ? '#36522b' : '#8e402e';
      formMsg.textContent = text;
      formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    try {
      const res = await fetch('api/submit-lead.php', {
        method: 'POST',
        body: new FormData(leadForm)
      });
      const data = await res.json();
      show(data.ok, data.message);
      if (data.ok) leadForm.reset();
    } catch (err) {
      show(false, 'Không gửi được, bạn thử lại sau nhé.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = oldHtml;
    }
  });
}