/* Skill Forge — shared UI details */
(function(){
  function init(){
    // 1. scroll progress
    var pb=document.createElement('div'); pb.id='scrollProgress'; document.body.appendChild(pb);
    // 8. back-to-top
    var bt=document.createElement('button'); bt.id='backTop'; bt.type='button'; bt.setAttribute('aria-label','Наверх');
    bt.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(bt);
    if(document.querySelector('.donate-fab') && window.innerWidth>640){ bt.style.bottom='82px'; }
    bt.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
    // 6. status ticker under nav
    var nav=document.querySelector('.nav');
    if(nav && !document.querySelector('.site-ticker')){
      var items=[
        '<span class="lv">● LIVE</span> PMWC 2026 — мировой кубок',
        '<b>12 480</b> игроков онлайн',
        'Новый патч <b>4.6</b> «Midnight Blood Hunter»',
        'Средний отклик — <b>4 мин</b>',
        '<span class="lv">●</span> 328 в поиске отряда',
        'Гайд недели: <b>контроль отдачи</b>'
      ];
      var strip=items.join('<span style="opacity:.5"> • </span>')+'<span style="opacity:.5"> • </span>';
      var grp='<span>'+strip+'</span>';
      var tk=document.createElement('div'); tk.className='site-ticker';
      tk.innerHTML='<div class="tk">'+grp+grp+'</div>';
      nav.insertAdjacentElement('afterend', tk);
    }
    // 4. magnetic glow follows cursor on primary buttons
    document.querySelectorAll('.btn-primary,.donate-fab').forEach(function(b){
      b.addEventListener('pointermove',function(e){ var r=b.getBoundingClientRect(); b.style.setProperty('--mx',(e.clientX-r.left)+'px'); b.style.setProperty('--my',(e.clientY-r.top)+'px'); },{passive:true});
    });
    // 7. NEW badge on the news nav link
    var nl=Array.prototype.slice.call(document.querySelectorAll('.nav-links a')).filter(function(a){ return /news\.html/i.test(a.getAttribute('href')||'') || /новости/i.test(a.textContent); })[0];
    if(nl && !nl.querySelector('.sf-badge')){ nl.insertAdjacentHTML('beforeend',' <span class="sf-badge new">NEW</span>'); }

    // scroll handler (rAF-throttled)
    var de=document.documentElement, ticking=false;
    function upd(){
      var st=de.scrollTop||document.body.scrollTop||0;
      var max=de.scrollHeight-de.clientHeight;
      pb.style.width=(max>0?(st/max*100):0)+'%';
      bt.classList.toggle('on', st>400);
      ticking=false;
    }
    window.addEventListener('scroll',function(){ if(!ticking){ticking=true; requestAnimationFrame(upd);} },{passive:true});
    window.addEventListener('resize',function(){ if(!ticking){ticking=true; requestAnimationFrame(upd);} },{passive:true});
    upd();
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
