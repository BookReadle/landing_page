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

function success(form, message) {
  form.innerHTML = `<div class="success">✓ ${message}</div>`;
}

document.querySelector('#join-form').addEventListener('submit', event => {
  event.preventDefault();
  success(event.currentTarget, "You're on the MVP test list.");
});

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  success(event.currentTarget, "Thanks — your message is ready to connect to a form service.");
});

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
