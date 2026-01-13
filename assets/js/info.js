// info.js — slider depoimentos
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-slider]');
  if(!root) return;

  const track = root.querySelector('[data-track]');
  const dotsWrap = root.querySelector('[data-dots]');
  const prevBtn = root.querySelector('[data-prev]');
  const nextBtn = root.querySelector('[data-next]');
  const cards = Array.from(track.querySelectorAll('.t-card'));
  if(!track || !dotsWrap || cards.length === 0) return;

  // dots
  dotsWrap.innerHTML = cards.map((_, i) =>
    `<button class="t-dot" type="button" aria-label="Ir para depoimento ${i+1}" ${i===0 ? 'aria-current="true"' : ''}></button>`
  ).join('');
  const dots = Array.from(dotsWrap.querySelectorAll('.t-dot'));

  function cardStep(){
    const rect = cards[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).gap || '12') || 12;
    return rect.width + gap;
  }

  function setActiveDot(){
    const step = cardStep();
    const idx = Math.round(track.scrollLeft / step);
    dots.forEach((d,i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'));
  }

  function scrollToIndex(i){
    const step = cardStep();
    track.scrollTo({ left: step * i, behavior: 'smooth' });
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToIndex(i)));

  if(prevBtn) prevBtn.addEventListener('click', () => {
    const step = cardStep();
    track.scrollBy({ left: -step, behavior: 'smooth' });
  });

  if(nextBtn) nextBtn.addEventListener('click', () => {
    const step = cardStep();
    track.scrollBy({ left: step, behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(setActiveDot);
  }, { passive:true });

  // inicial
  setActiveDot();
});
