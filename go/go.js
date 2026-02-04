Go();  function Go(){ let s=prms.get('s')+hash;  if(s==''){ return };  // http://localhost/apps/github/apps/app.html?app=go&s=$(CURRENT_WORD)   s=shorthand

if(s.startsWith('_')){ GoTo(`en.wikipedia.org/wiki/Category:${s.substring(1)}`);  return };  if(!s.includes('__')){ GoTo(`en.wikipedia.org/wiki/${s}`);  return };

let i={
'w_q'      : `en.wikipedia.org/w/index.php?search={%v}`,
'yt_v'     : `www.youtube.com/watch?v={%v}`,
'yt_p'     : `www.youtube.com/playlist?list={%v}`,
'yt_c'     : `www.youtube.com/@{%v}/videos`,
'yt_cp'    : `www.youtube.com/@{%v}/playlists`,
'yt_cr'    : `www.youtube.com/@{%v}/releases`,
'yt_q'     : `www.youtube.com/results?search_query={%v}`,
'amz_p'    : `www.amazon.com/dp/{%v}`,
'amz_s'    : `www.amazon.com/stores/page/{%v}`,
'amz_q'    : `www.amazon.com/s?k={%v}`,
'ddg_i'    : `external-content.duckduckgo.com/iu/?u=https://{%v}`,
'ddg_q'    : `duckduckgo.com/?q={%v}`,
'dm'       : `www.dailymail.co.uk/news/article-{%v}.html#~`,
'api'      : `developer.mozilla.org/en-US/docs/Web/API/{%v}`,
'js'       : `developer.mozilla.org/en-US/docs/Web/JavaScript/{%v}`,
'js_ref'   : `developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/{%v}`,
'js_guide' : `developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/{%v}`,
'html'     : `developer.mozilla.org/en-US/docs/Web/HTML/{%v}`,
'css'      : `developer.mozilla.org/en-US/docs/Web/CSS/{%v}`,
'learn'    : `developer.mozilla.org/en-US/docs/Learn/{%v}`,
'x'        : `x.com/{%v}`
};

s=s.split('__');  let k=s[0];  let v=s[1];  GoTo( i[k].replace('{%v}',v) ) };  function GoTo(u){ location.replace(`https://${u}`) }

/* Notes =================================================================================================================================================================================


========================================================================================================================================================================================*/