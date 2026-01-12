(function(){
    const slider = document.querySelector('[data-slider]');
    if(!slider) return;

    const track = slider.querySelector('[data-track]');
    const btnPrev = slider.querySelector('[data-prev]');
    const btnNext = slider.querySelector('[data-next]');
    const dotsWrap = slider.querySelector('[data-dots]');
    const cards = Array.from(track.children);

    // cria dots
    const dots = cards.map((_, i) => {
      const b = document.createElement('button');
      b.className = 't-dot';
      b.type = 'button';
      b.setAttribute('aria-label', `Ir para depoimento ${i+1}`);
      b.addEventListener('click', () => scrollToIndex(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function currentIndex(){
      const left = track.scrollLeft;
      const w = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
      return Math.round(left / w);
    }

    function setActiveDot(i){
      dots.forEach((d, idx) => d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
    }

    function scrollToIndex(i){
      const card = cards[i];
      if(!card) return;
      const x = card.offsetLeft;
      track.scrollTo({ left: x, behavior: 'smooth' });
      setActiveDot(i);
    }

    function step(dir){
      const i = currentIndex();
      const next = Math.max(0, Math.min(cards.length - 1, i + dir));
      scrollToIndex(next);
    }

    btnPrev && btnPrev.addEventListener('click', () => step(-1));
    btnNext && btnNext.addEventListener('click', () => step(1));

    // atualiza dots ao arrastar (scroll)
    let raf = null;
    track.addEventListener('scroll', () => {
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActiveDot(currentIndex()));
    }, { passive:true });

    // swipe: já funciona pelo scroll; isso aqui melhora “snapping” em alguns aparelhos
    let isDown = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if(!isDown) return;
      const dx = e.clientX - startX;
      track.scrollLeft = startLeft - dx;
    });
    track.addEventListener('pointerup', () => {
      isDown = false;
      // "snap" para o card mais próximo
      scrollToIndex(currentIndex());
    });

    // inicial
    setActiveDot(0);
  })();
