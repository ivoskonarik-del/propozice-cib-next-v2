/* CIB v2: video pásy – zdroj až při přiblížení (desktop 16:9 / mobil 4:5), pauza mimo obrazovku */
(function(){
  var B=[].slice.call(document.querySelectorAll('.vband'));if(!B.length||!('IntersectionObserver' in window))return;
  var mob=window.matchMedia('(max-width:991px)').matches;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var b=e.target,v=b.querySelector('video');
    if(e.isIntersecting){
      if(!v.src){v.src=mob?v.dataset.m:v.dataset.d;v.addEventListener('playing',function(){b.classList.add('is-on')},{once:true})}
      var p=v.play();if(p&&p.catch)p.catch(function(){});
    }else if(v.src)v.pause();
  })},{rootMargin:'300px 0px'});
  B.forEach(function(b){io.observe(b)});
})();
