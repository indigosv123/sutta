const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.background = '#ffffff';
    header.style.border = '1px solid black';
  } else {
    header.style.background = 'transparent';
    header.style.border = '1px solid transparent';
  }
});

const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.testimonial-card');
const cardWidth = 560 + 24;
let current = 0;
let startX = 0;
let startOffset = 0;
let isDragging = false;

track.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  const matrix = new DOMMatrix(getComputedStyle(track).transform);
  startOffset = matrix.m41;
  track.style.transition = 'none';
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  track.style.transform = `translateX(${startOffset + diff}px)`;
});

document.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = 'transform 0.4s ease';
  const diff = startX - e.clientX;
  if (diff > 50)       goTo(current + 1);
  else if (diff < -50) goTo(current - 1);
  else                 goTo(current);
});

function goTo(index) {
  current = ((index % cards.length) + cards.length) % cards.length;
  const offset = (track.parentElement.offsetWidth / 2) - (560 / 2) - (current * cardWidth);
  track.style.transform = `translateX(${offset}px)`;
  cards.forEach((c, i) => c.classList.toggle('active', i === current));
}

document.addEventListener('DOMContentLoaded', () => {
  goTo(0);
});