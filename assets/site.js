(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.menu-label').textContent = 'Menu';
    if (restoreFocus) toggle.focus();
  };
  if (toggle && navigation) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    const desktop = matchMedia('(min-width:681px)');
    desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
  }

  const form = document.querySelector('#project-brief');
  if (!form) return;
  document.querySelector('.contact-draft').hidden = false;
  const status = document.querySelector('#brief-status');
  const copyButton = document.querySelector('#copy-brief');
  const serviceField = form.elements.namedItem('service');
  const requestedService = new URLSearchParams(location.search).get('service');
  if ([...serviceField.options].some(option => option.value === requestedService)) serviceField.value = requestedService;
  const getBrief = () => {
    const fields = new FormData(form);
    return {
      subject: `Let's talk about ${fields.get('service')} — ${fields.get('company') || fields.get('name')}`,
      body: `Hi Root Dynamics,\n\n${fields.get('message')}\n\nName: ${fields.get('name')}\nEmail: ${fields.get('email')}\nCompany: ${fields.get('company') || 'Not provided'}\nInterested in: ${fields.get('service')}`
    };
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const brief = getBrief();
    const uri = `mailto:contact@root-dynamics.com?subject=${encodeURIComponent(brief.subject)}&body=${encodeURIComponent(brief.body)}`;
    status.textContent = 'Your email app will open with your draft. Review it and send it there. If it does not open, use “Copy my brief” below.';
    window.location.href = uri;
  });
  copyButton.addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const brief = getBrief();
    try {
      await navigator.clipboard.writeText(`To: contact@root-dynamics.com\nSubject: ${brief.subject}\n\n${brief.body}`);
      status.textContent = 'Brief copied. Paste it into your email and send it to contact@root-dynamics.com.';
    } catch {
      status.textContent = 'Clipboard access is unavailable. You can copy your message from the field above and email contact@root-dynamics.com.';
    }
  });
})();
