const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', () => nav.classList.remove('open'));

const answerButtons = document.querySelectorAll('.answers button');
const quizFeedback = document.querySelector('.quiz-feedback');
const quizReset = document.querySelector('.quiz-reset');

answerButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('correct') || button.classList.contains('incorrect')) return;

    answerButtons.forEach(item => {
      item.disabled = true;
      item.classList.remove('active');
    });

    const correctAnswer = document.querySelector('.answers button[data-correct="true"]');
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
      quizFeedback.className = 'quiz-feedback feedback-correct';
      quizFeedback.innerHTML = '<b>Correct!</b> A habit moves through cue, craving, response, and reward.';
    } else {
      button.classList.add('incorrect');
      correctAnswer.classList.add('correct');
      quizFeedback.className = 'quiz-feedback feedback-incorrect';
      quizFeedback.innerHTML = '<b>Not quite.</b> The correct answer is A: cue → craving → response → reward.';
    }
    quizReset.disabled = false;
  });
});

quizReset.addEventListener('click', () => {
  answerButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove('active', 'correct', 'incorrect');
  });
  quizFeedback.className = 'quiz-feedback';
  quizFeedback.textContent = 'Choose an answer to see how active recall works.';
  quizReset.disabled = true;
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

const revealSections = document.querySelectorAll('#why, .science .split, #how, .dark .two-col, #survey .survey-card, .join-card, #contact');
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
