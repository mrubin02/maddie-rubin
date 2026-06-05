// fallback script to ensure the top-right "Maddie Rubin" is cursive
(function(){
  function wrapTextNodes(el, re){
    for(var i=0;i<el.childNodes.length;i++){
      var n = el.childNodes[i];
      if(n.nodeType === Node.TEXT_NODE){
        var matches = n.nodeValue.match(re);
        if(matches){
          var tmp = document.createElement('span');
          tmp.innerHTML = n.nodeValue.replace(re, function(m){ return '<span class="maddie-cursive">'+m+'</span>'; });
          el.replaceChild(tmp, n);
        }
      } else if(n.nodeType === Node.ELEMENT_NODE){
        wrapTextNodes(n, re);
      }
    }
  }
  function applyCursive(){
    var header = document.getElementById('atIdViewHeader');
    if(!header) return false;
    var re = /Maddie\s*Rubin/ig;
    // prefer anchors
    var anchors = header.querySelectorAll('a');
    var did=false;
    anchors.forEach(function(a){
      if(re.test(a.textContent||a.innerText||'')){
        wrapTextNodes(a, re); did=true;
      }
    });
    if(did) return true;
    // else search any element inside header
    var elms = header.querySelectorAll('*');
    for(var i=0;i<elms.length;i++){
      var e = elms[i];
      if(re.test(e.textContent||e.innerText||'')){
        wrapTextNodes(e, re); did=true; break;
      }
    }
    return did;
  }
  // Observe mutations to catch dynamic changes
  var obs = new MutationObserver(function(){ applyCursive(); });
  obs.observe(document.documentElement || document.body, { childList:true, subtree:true, characterData:true });
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(applyCursive, 50); setTimeout(applyCursive, 400); });
  // try immediately
  try{ applyCursive(); }catch(e){}
})();

// DOM cursor: remove trail and render a bleedable DOM cursor (pointer-events:none so clicks pass through)
(function(){
  try{ document.querySelectorAll('.cursor-trail-item').forEach(e=>e.remove()); }catch(e){}
  // ensure body doesn't hide native cursor while we render DOM cursor
  try{ var css = document.createElement('style'); css.id='dom-cursor-css'; css.textContent = 'body{cursor:none !important} .cursor-trail-item{display:none !important} #dom-cursor{position:fixed;left:0;top:0;width:160px;height:160px;background-image:url("/About/user-cursor-with-pointer.png");background-size:contain;background-repeat:no-repeat;background-position:center;transform:translate(-50%,-50%);pointer-events:none;z-index:2147483647;will-change:transform;}'; document.head.appendChild(css); }catch(e){}
  var cursor = document.createElement('div'); cursor.id='dom-cursor'; document.documentElement.appendChild(cursor);
  function move(e){ cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
  window.addEventListener('mousemove', move, {passive:true});
  window.addEventListener('mouseleave', function(){ cursor.style.display='none'; });
  window.addEventListener('mouseenter', function(){ cursor.style.display='block'; });
})();