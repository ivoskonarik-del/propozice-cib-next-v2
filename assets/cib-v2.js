/* CIB v2: video pásy – zdroj až při přiblížení (desktop 16:9 / mobil 4:5), pauza mimo obrazovku */
(function(){
  var B=[].slice.call(document.querySelectorAll('.vband'));if(!B.length||!('IntersectionObserver' in window))return;
  var mob=window.matchMedia('(max-width:991px)').matches;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var b=e.target,v=b.querySelector('video');
    if(e.isIntersecting){
      if(!v.src){v.src=mob?(v.dataset.mh&&v.canPlayType('video/mp4; codecs="hvc1.1.6.L123.B0"')==='probably'?v.dataset.mh:v.dataset.m):v.dataset.d;v.addEventListener('playing',function(){b.classList.add('is-on')},{once:true})}
      var p=v.play();if(p&&p.catch)p.catch(function(){});
    }else if(v.src)v.pause();
  })},{rootMargin:'300px 0px'});
  B.forEach(function(b){io.observe(b)});
})();
/* CIB v2: dlaždice Balabenky a V33 – po najetí myší krátké video zevnitř (jen zařízení s myší) */
(function(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  var A=document.querySelector('link[href*="cib-v2.css"]');if(!A)return;var AP=A.getAttribute('href').replace(/cib-v2\.css.*$/,'');
  var M={'/nemovitosti/balabenka/':'tile-bal.mp4','/nemovitosti/vodickova-33/':'tile-v33.mp4'};
  [].forEach.call(document.querySelectorAll('.fp-list > a'),function(a){
    var h=a.getAttribute('href')||'',k=Object.keys(M).filter(function(x){return h.slice(-x.length)===x})[0];if(!k)return;
    var w=a.querySelector('.fp-photo-wrap');if(!w)return;
    var v=document.createElement('video');v.className='fp-hv';v.muted=true;v.loop=true;v.playsInline=true;v.preload='none';v.setAttribute('aria-hidden','true');w.appendChild(v);
    a.addEventListener('mouseenter',function(){if(!v.src)v.src=AP+M[k];var p=v.play();if(p&&p.catch)p.catch(function(){});w.classList.add('is-hv')});
    a.addEventListener('mouseleave',function(){w.classList.remove('is-hv');setTimeout(function(){if(!w.classList.contains('is-hv'))v.pause()},500)});
  });
})();
/* CIB v2: popisek v heru podle toho, co je právě v záběru (kapitoly z v2_smycka.py) */
(function(){
  var v=document.getElementById('cib-hero-video'),ch=v&&v.dataset.chapters&&JSON.parse(v.dataset.chapters);if(!ch)return;
  var box=document.querySelector('#content-slider .slider-content-inner');if(!box)return;
  var lab=box.querySelector('.slider-offices-label'),a=box.querySelector('.slider-office-list a');if(!lab||!a)return;
  var B=(a.getAttribute('href')||'').replace(/(\/propozice-cib-next[^/]*\/).*/,'$1');
  var P={balabenka:['Kanceláře · Praha 9','Balabenka Office Building','nemovitosti/balabenka/'],v33:['Kanceláře · Praha 1','Residence Vodičkova 33','nemovitosti/vodickova-33/'],
    suites:['Apartmány · Praha 1','Vodičkova Luxury Suites','nemovitosti/vodickova-luxury-suites/'],ess:['Stáje · Lichoceves','Emma Sophia Stables','staje/emma-sophia-stables/'],
    lich:['Development · Lichoceves','Obec v zahradě','development/lichoceves/'],liberec:['Správa bytů · Liberecko','Byty Liberec a Hrádek','nemovitosti/sprava-bytu-liberec/']};
  var cur='';box.classList.add('v2-cap');
  function tick(){
    var t=v.currentTime,k=ch[0][1];for(var i=0;i<ch.length;i++)if(t>=ch[i][0])k=ch[i][1];
    if(k!==cur&&P[k]){cur=k;box.classList.add('is-sw');setTimeout(function(){var p=P[cur];lab.textContent=p[0];a.firstChild.nodeValue=p[1]+' ';a.setAttribute('href',B+p[2]);box.classList.remove('is-sw')},260)}
  }
  setInterval(tick,250);
})();
