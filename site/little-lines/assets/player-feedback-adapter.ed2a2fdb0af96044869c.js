(()=>{'use strict';
const feedback=globalThis.AxiomsPlayerFeedback;
if(!feedback)return;
const badge=document.getElementById('ll-build-id');
const compact=text=>String(text||'').replace(/\s+/g,' ').trim();
function collectState(){
  const openPanels=[...document.querySelectorAll('.panel.open')].map(panel=>panel.id||'panel');
  const status=document.querySelector('.statuscard');
  const fatal=document.getElementById('fatal');
  const visibleFatal=fatal&&getComputedStyle(fatal).display!=='none';
  return {
    buildLabel:compact(badge?.textContent)||'unknown',
    sourceRevision:badge?.dataset?.sourceRevision||'unknown',
    openPanels,
    cleanView:document.body.classList.contains('clean')?'on':'off',
    rendererQuality:compact(document.getElementById('quality')?.textContent)||'unknown',
    status:compact(status?.textContent)||'—',
    routeItems:document.querySelectorAll('.routeitem').length,
    fatalError:visibleFatal?compact(fatal.textContent):'none'
  };
}
feedback.installFeedbackButton({
  game:'Little Lines',site:'little-lines',host:document.body,id:'playerFeedbackBtn',buildInfoUrl:false,
  build:compact(badge?.textContent)||undefined,getState:collectState
});
})();
