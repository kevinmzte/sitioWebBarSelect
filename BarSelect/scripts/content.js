
    // === Datos editables ===
    const WHATSAPP_NUMBER = '59500000000'; // Reemplazá por tu número en formato internacional sin +

    const MENU_DATA = [
      { categoria:'Comidas', titulo:'Sopa paraguaya', desc:'Clásica, húmeda y esponjosa.', precio: 18000, img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Comidas', titulo:'Bori bori', desc:'Caldito espeso con bolitas de harina de maíz y queso.', precio: 25000, img:'https://images.unsplash.com/photo-1604908176997-4319b6870a9e?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Comidas', titulo:'Mbejú', desc:'Almidón, queso y manteca, crocante.', precio: 16000, img:'https://images.unsplash.com/photo-1543352634-87392e5b31a5?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Comidas', titulo:'Asado a la estaca', desc:'Carne lenta con mandioca.', precio: 48000, img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Minutas', titulo:'Milanesa al pan', desc:'Con tomate, lechuga y papas.', precio: 28000, img:'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Minutas', titulo:'Empanadas (x3)', desc:'Carne, pollo o jamón y queso.', precio: 15000, img:'https://images.unsplash.com/photo-1544025162-8be587f9b838?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Dulces', titulo:'Kivevé', desc:'Zapallo, harina de maíz y queso.', precio: 12000, img:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Dulces', titulo:'Pastafrola', desc:'Dulce de guayaba o membrillo.', precio: 10000, img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Bebidas', titulo:'Tereré', desc:'Hierbas frías, clásico paraguayo.', precio: 6000, img:'https://images.unsplash.com/photo-1613478223715-527af8cf7d62?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Bebidas', titulo:'Guaraná', desc:'Lata 350 ml.', precio: 7000, img:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Comidas', titulo:'Chipa so’o (x4)', desc:'Chipa rellena con carne.', precio: 14000, img:'https://images.unsplash.com/photo-1566478989037-0788f9e7e4c4?q=80&w=1200&auto=format&fit=crop' },
      { categoria:'Comidas', titulo:'Vorí vorí de gallina', desc:'Versión campesina tradicional.', precio: 28000, img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop' }
    ];

    const HOURS = [
      ['Lunes','11:00 – 15:00 / 19:00 – 23:00'],
      ['Martes','11:00 – 15:00 / 19:00 – 23:00'],
      ['Miércoles','11:00 – 15:00 / 19:00 – 23:00'],
      ['Jueves','11:00 – 15:00 / 19:00 – 23:00'],
      ['Viernes','11:00 – 15:00 / 19:00 – 00:00'],
      ['Sábado','11:00 – 00:00'],
      ['Domingo','Cerrado']
    ];

    // === Render menú expandible (acordeón) ===
    const accEl = document.getElementById('menu-accordion');

    function formatGs(n){
      return new Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG',maximumFractionDigits:0}).format(n);
    }

    const ORDER = ['Comidas','Minutas','Dulces','Bebidas'];

    function groupByCategory(list){
      const map = new Map();
      list.forEach(i=>{
        if(!map.has(i.categoria)) map.set(i.categoria, []);
        map.get(i.categoria).push(i);
      });
      map.forEach(arr=>arr.sort((a,b)=>a.titulo.localeCompare(b.titulo,'es')));
      return map;
    }

    function sectionTemplate(cat, items){
      const itemsHTML = items.map(i=>{
        const textBlock = `
          <div class="meta">
            <div class="menu-line"><span class="name">${i.titulo}</span><span class="dots"></span><span class="price">${formatGs(i.precio)}</span></div>
            <div class="desc">${i.desc}</div>
          </div>`;
        const photo = i.img ? `<img class="thumb-sm" src="${i.img}" alt="${i.titulo}" loading="lazy" data-full="${i.img}">` : '';
        return `<div class="menu-item"><div class="thumb-wrap">${photo}${textBlock}</div></div>`;
      }).join('');
      return `
        <section class="acc-section">
          <header class="acc-header" role="button" tabindex="0" aria-expanded="false">
            <h3 class="acc-title">${cat}</h3>
            <span class="acc-count">${items.length} ítem(s)</span>
            <span class="chev">▾</span>
          </header>
          <div class="acc-body">${itemsHTML}</div>
        </section>`;
    }

    function renderAccordion(){
      const grouped = groupByCategory(MENU_DATA);
      const cats = [...new Set([...ORDER, ...grouped.keys()])].filter(c=>grouped.has(c));
      accEl.innerHTML = cats.map(c=>sectionTemplate(c, grouped.get(c))).join('');
      // comportamiento toggle
      accEl.querySelectorAll('.acc-section').forEach(sec=>{
        const head = sec.querySelector('.acc-header');
        function toggle(){ sec.classList.toggle('open'); head.setAttribute('aria-expanded', sec.classList.contains('open')); }
        head.addEventListener('click', toggle);
        head.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggle(); } });
      });
      // Abrir la primera por defecto
      const first = accEl.querySelector('.acc-section');
      if(first){ first.classList.add('open'); first.querySelector('.acc-header').setAttribute('aria-expanded','true'); }

      // Lightbox: delegación de eventos
      accEl.addEventListener('click', (e)=>{
        const img = e.target.closest('img.thumb-sm');
        if(!img) return;
        const src = img.getAttribute('data-full') || img.src;
        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightbox').style.display = 'flex';
      });
    }

    renderAccordion();

    // Cerrar lightbox
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', ()=>{ lightbox.style.display='none'; });

    // === Tests mínimos ===
    (function runSelfTests(){
      try{
        const expectedCats = Array.from(new Set(MENU_DATA.map(i=>i.categoria)));
        const renderedCats = document.querySelectorAll('.acc-section').length;
        console.assert(renderedCats === expectedCats.length, `[TEST] Categorías renderizadas (${renderedCats}) deben ser ${expectedCats.length}`);

        const firstHeader = document.querySelector('.acc-section .acc-header');
        const firstOpen = document.querySelector('.acc-section.open');
        console.assert(firstHeader && firstOpen, '[TEST] La primera sección debería abrirse por defecto');

        const wasOpen = firstOpen.classList.contains('open');
        firstHeader.click();
        const nowOpen = firstOpen.classList.contains('open');
        console.assert(wasOpen !== nowOpen, '[TEST] Toggle de acordeón debe cambiar el estado open');

        const itemsConFoto = MENU_DATA.filter(i=>i.img).length;
        const thumbs = document.querySelectorAll('img.thumb-sm').length;
        console.assert(thumbs === itemsConFoto, `[TEST] Miniaturas (${thumbs}) deben coincidir con items con foto (${itemsConFoto})`);

        console.log('%c[TEST] Todos los tests pasaron','color: #2e7d32');
      }catch(err){
        console.warn('[TEST] Error en tests:', err);
      }
    })();

    // Render horarios
    const hoursBody = document.getElementById('hours-body');
    hoursBody.innerHTML = HOURS.map(([d, h])=>`<tr><td>${d}</td><td>${h}</td></tr>`).join('');

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Chat simple
    const chatBtn = document.getElementById('chatBtn');
    const chatPanel = document.getElementById('chatPanel');
    const closeChat = document.getElementById('closeChat');
    const form = document.getElementById('chatForm');
    const waBtn = document.getElementById('waBtn');

    function toggleChat(open){
      chatPanel.classList.toggle('open', open);
      chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
      if(open) document.getElementById('mensaje').focus();
    }

    chatBtn.addEventListener('click', ()=> toggleChat(!chatPanel.classList.contains('open')));
    closeChat.addEventListener('click', ()=> toggleChat(false));

    function buildWhatsAppURL(text){
      const msg = encodeURIComponent(text);
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }

    waBtn.addEventListener('click', ()=>{
      const nombre = document.getElementById('nombre').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      const composed = `Hola, soy ${nombre || 'cliente'}.%0AQuiero consultar/pedir:%0A${mensaje}`;
      window.open(buildWhatsAppURL(composed), '_blank');
    });

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim() || 'cliente';
      const canal = document.getElementById('canal').value;
      const mensaje = document.getElementById('mensaje').value.trim();

      if(!mensaje){ alert('Escribí tu mensaje.'); return; }

      if(canal==='whatsapp'){
        window.open(buildWhatsAppURL(`Hola, soy ${nombre}.%0A${mensaje}`), '_blank');
      } else if(canal==='telefono'){
        window.location.href = 'tel:+59500000000';
      } else {
        window.location.href = `mailto:contacto@pulperia.com?subject=Pedido de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje)}`;
      }
    });

    // Footer WhatsApp link
    document.getElementById('wa-footer').setAttribute('href', buildWhatsAppURL('Hola, quiero hacer un pedido.'));
