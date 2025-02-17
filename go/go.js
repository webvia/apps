SetIconCharacter('🚀');  SetTitleText('Go');  let q=prms.get('q');

window.onload=function(){ if(q==null){ return }; Go() }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Go(){ 

if(q.startsWith('_')) { q=q.substring(1);  GoTo(`en.wikipedia.org/wiki/Category:${q}`);  return };  if(!q.includes('__')){ GoTo(`en.wikipedia.org/wiki/${q}`);  return }; 

let s=q.substring(0,q.indexOf('_')).toLowerCase();  let t=q.substring(q.indexOf('_')+1,q.indexOf('__')).toLowerCase();  if(t=='_'){ t='' };  let v=q.substring(q.indexOf('__')+2);  let u='';  if(s===''){ return }  /* q=query, s=site, t=type, u=url, v=value */   // http://localhost/apps/apps.html?app=go&q=$(CURRENT_WORD)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Wikipedia  [ w ]
else if(s=='w'){ u=`en.wikipedia.org/`;  if(t=='q'){ u=`${u}w/index.php?search=${v}` } }

// YouTube  [ yt _ video, playlist, channel ]
else if(s=='yt'){ u=`www.youtube.com/`;  if(t=='v'){ u=`${u}watch?v=${v}` }  else if(t=='p'){ u=`${u}playlist?list=${v}` }  else if(t=='c'){ u=`${u}@${v}` }  else{ u=`${u}results?search_query=${v}` } }

// Amazon  [ amz _ product, store ]
else if(s=='amz'){ u=`www.amazon.com/`;  if(t=='p'){ u=`${u}dp/${v}` }  else if(t=='s'){ u=`${u}stores/page/${v}` }  else{ u=`${u}s?k=${v}` } }

// DuckDuckGo  [ ddg ]   \ddg__hello+world
else if(s=='ddg'){ u=`duckduckgo.com/`;  u=`${u}?q=${v}` }

// Mozilla  [ api|moz _ js, js_ref, js_guide, html, css ]
else if(s=='api'||s=='moz'){ u=`developer.mozilla.org/en-US/docs/`;  if(t==''){ u=`${u}Web/API/${v}` }  else if(t=='js'){ u=`${u}Web/JavaScript/${v}` }  else if(t=='js_ref'){ u=`${u}Web/JavaScript/Reference/${v}` }  else if(t=='js_guide'){ u=`${u}Web/JavaScript/Guide/${v}` }  else if(t=='html'){ u=`${u}Web/HTML/${v}` }  else if(t=='css'){ u=`${u}Web/CSS/${v}` }  else if(t=='learn'){ u=`${u}Learn/${v}` } }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function GoTo(u){ location.replace(`https://${u}`) }  GoTo(u) }

/* Notes =============================================================================================================================================================================================



====================================================================================================================================================================================================*/
