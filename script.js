const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', () => nav.classList.remove('open'));

document.querySelectorAll('.answers button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.answers button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelector('#quiz-count').addEventListener('change', event => {
  document.querySelector('#question-total').textContent = event.target.value;
});

async function submitForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.className = 'form-status';
  status.textContent = '';

  try {
    const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error('Submission failed');
    form.reset();
    status.classList.add('success');
    status.textContent = form.id === 'join-form'
      ? '✓ You’re on the MVP test list.'
      : '✓ Thanks — your message has been sent.';
  } catch (error) {
    status.classList.add('form-error');
    status.textContent = 'Something went wrong. Please email support@bookreadle.com directly.';
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

document.querySelector('#join-form').addEventListener('submit', submitForm);
document.querySelector('#contact-form').addEventListener('submit', submitForm);

const revealSections = document.querySelectorAll('#why, .science .split, #how, .dark .two-col, .join-card, #contact');
revealSections.forEach(section => section.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealSections.forEach(section => revealObserver.observe(section));

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tiltCard.addEventListener('pointermove', event => {
    const bounds = tiltCard.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  tiltCard.addEventListener('pointerleave', () => { tiltCard.style.transform = ''; });
}
