Go();  function Go(){ let s=prms.get('s')+hash;  if(s==''){ return };  // http://localhost/apps/github/apps/app.html?app=go&s=$(CURRENT_WORD)   s=shorthand

if(s.startsWith('_')){ GoTo(`en.wikipedia.org/wiki/Category:${s.substring(1)}`);  return };  if(!s.includes('__')){ GoTo(`en.wikipedia.org/wiki/${s}`);  return };

let i={
/* Wikiped Search */  'w_q'      : `en.wikipedia.org/w/index.php?search={%v}`,
/* Youtube Video  */  'yt_v'     : `www.youtube.com/watch?v={%v}`,
/* Youtube Plist  */  'yt_p'     : `www.youtube.com/playlist?list={%v}`,
/* Youtube Chan   */  'yt_c'     : `www.youtube.com/@{%v}/videos`,
/* Youtube Ch Pls */  'yt_cp'    : `www.youtube.com/@{%v}/playlists`,
/* Youtube Ch Rel */  'yt_cr'    : `www.youtube.com/@{%v}/releases`,
/* Youtube Search */  'yt_q'     : `www.youtube.com/results?search_query={%v}`,
/* Amazon Product */  'amz_p'    : `www.amazon.com/dp/{%v}`,
/* Amazon Store   */  'amz_s'    : `www.amazon.com/stores/page/{%v}`,
/* Amazon Search  */  'amz_q'    : `www.amazon.com/s?k={%v}`,
/* Duckdg Image   */  'ddg_i'    : `external-content.duckduckgo.com/iu/?u=https://{%v}`,
/* Duckdg Search  */  'ddg_q'    : `duckduckgo.com/?q={%v}`,
/* Dailym Article */  'dm'       : `www.dailymail.com/news/article-{%v}#~`,
/* Mozdev Api     */  'api'      : `developer.mozilla.org/en-US/docs/Web/API/{%v}`,
/* Mozdev Js      */  'js'       : `developer.mozilla.org/en-US/docs/Web/JavaScript/{%v}`,
/* Mozdev Ref     */  'js_ref'   : `developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/{%v}`,
/* Mozdev Guide   */  'js_guide' : `developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/{%v}`,
/* Mozdev Html    */  'html'     : `developer.mozilla.org/en-US/docs/Web/HTML/{%v}`,
/* Mozdev Css     */  'css'      : `developer.mozilla.org/en-US/docs/Web/CSS/{%v}`,
/* Mozdev Learn   */  'learn'    : `developer.mozilla.org/en-US/docs/Learn/{%v}`,
/* X User         */  'x'        : `x.com/{%v}`
};

s=s.split('__');  let k=s[0];  let v=s[1];  GoTo( i[k].replace('{%v}',v) ) }/*-Go*/

function GoTo(u){ location.replace(`https://${u}`) }

/* Notes =================================================================================================================================================================


========================================================================================================================================================================*/