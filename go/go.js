SetIconCharacter('🚀');  SetTitleText('Go');  let q=prms.get('q');

window.onload=function(){ if(q===null){ return }; Go() }

// ===================================================================================================================================================================================================

function Go(){ if(!q.includes('__')){ GoTo(`en.wikipedia.org/wiki/${q}`); return }  /* q=query, s=site, t=type, u=url, v=value */   // http://localhost/apps/apps.html?app=go&q=$(CURRENT_WORD)

let s=q.substring(0,q.indexOf('_')).toLowerCase();  let t=q.substring(q.indexOf('_')+1,q.indexOf('__')).toLowerCase();  if(t=='_'){ t='' };  let v=q.substring(q.indexOf('__')+2);  let u='';  if(s==''){ return }

// ===================================================================================================================================================================================================

// Wikipedia  [ ''|cat ]   \cat__Lists
else if(s=='cat'){ u=`en.wikipedia.org/`;  if(s=='cat'){ u=`${u}wiki/Category:${v}` }  else if(s=='w'||s=='wik'||s=='wiki'){ u=`${u}w/index.php?search=${v}` } }

// YouTube  [ yt : v|video, pl, ch ]
else if(s=='yt'){ u=`www.youtube.com/`;  if(t=='v'||t=='vid'||t=='video'){ u=`${u}watch?v=${v}` }  else if(t=='pl'||t=='playlist'){ u=`${u}playlist?list=${v}` }  else if(t=='ch'||t=='channel'){ u=`${u}@${v}` }  else{ u=`${u}results?search_query=${v}` } }

// Amazon  [ amz : prod, store ]
else if(s=='amz'){ u=`www.amazon.com/`;  if(t=='p'|t=='prod'||t=='product'){ u=`${u}dp/${v}` }  else if(t=='st'||t=='store'){ u=`${u}stores/page/${v}` }  else{ u=`${u}s?k=${v}` } }

// DuckDuckGo  [ ddg ]   \ddg__hello+world
else if(s=='ddg'){ u=`duckduckgo.com/`;  u=`${u}?q=${v}` }

// Mozilla  [ api|moz : js, js_ref, js_guide, html, css ]
else if(s=='api'||s=='moz'){ u=`developer.mozilla.org/en-US/docs/`;  if(t==''){ u=`${u}Web/API/${v}` }  else if(t=='js'){ u=`${u}Web/JavaScript/${v}` }  else if(t=='js_ref'){ u=`${u}Web/JavaScript/Reference/${v}` }  else if(t=='js_guide'){ u=`${u}Web/JavaScript/Guide/${v}` }  else if(t=='html'){ u=`${u}Web/HTML/${v}` }  else if(t=='css'){ u=`${u}Web/CSS/${v}` }  else if(t=='learn'){ u=`${u}Learn/${v}` } }

// X-Twitter  [ x ]   \x__elonmusk
else if(s=='x'){ u=`x.com/`;  u=`${u}${v}` }

// ===================================================================================================================================================================================================

function GoTo(u){ location.replace(`https://${u}`) }  GoTo(u) }


/* Notes =============================================================================================================================================================================================



====================================================================================================================================================================================================*/
