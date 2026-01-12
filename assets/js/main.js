window.dataLayer = window.dataLayer || [];

  // helper
  function dlPush(eventName, payload){
    window.dataLayer.push(Object.assign({ event: eventName }, payload || {}));
  }

  // Track clicks (CTA + nav + qualquer coisa com data-track)
  document.addEventListener('click', function(e){
    const el = e.target.closest('[data-track]');
    if(!el) return;

    const kind = el.getAttribute('data-track');

    if(kind === 'cta_whatsapp'){
      dlPush('cta_click', {
        cta_name: 'whatsapp',
        cta_location: el.getAttribute('data-cta-location') || 'unknown',
        link_url: el.href
      });
      return;
    }

    if(kind === 'nav_click'){
      dlPush('nav_click', {
        nav_item: el.getAttribute('data-nav') || el.textContent.trim()
      });
      return;
    }

    // fallback genérico
    dlPush('element_click', {
      element_type: kind,
      element_text: (el.textContent || '').trim().slice(0, 60),
      link_url: el.href || null
    });
  });

  // Scroll depth (25/50/75/90)
  (function(){
    const marks = [25,50,75,90];
    const fired = new Set();

    function onScroll(){
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      if(scrollHeight <= 0) return;

      const pct = Math.round((scrollTop / scrollHeight) * 100);

      marks.forEach(m => {
        if(pct >= m && !fired.has(m)){
          fired.add(m);
          dlPush('scroll_depth', { percent: m });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive:true });
  })();
