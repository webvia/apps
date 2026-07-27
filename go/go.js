Go();  function Go(){ let s=prms.get('s')+hash;  if(s==''){ return };  // http://localhost/apps/github/apps/app.html?app=go&s=$(CURRENT_WORD)

if(s.startsWith('_')){ GoTo(`en.wikipedia.org/wiki/Category:${s.substring(1)}`);  return };  if(!s.includes('__')){ GoTo(`en.wikipedia.org/wiki/${s}`);  return };

let i={
/* Wikiped Search */  'wp_q'     : `en.wikipedia.org/w/index.php?search={%v}`,
/* Youtube Video  */  'yt'       : `www.youtube.com/watch?v={%v}`,
/* Youtube Plist  */  'yt_p'     : `www.youtube.com/playlist?list={%v}`,
/* Youtube Chan   */  'yt_c'     : `www.youtube.com/@{%v}/videos`,
/* Youtube Ch Pls */  'yt_cp'    : `www.youtube.com/@{%v}/playlists`,
/* Youtube Ch Rel */  'yt_cr'    : `www.youtube.com/@{%v}/releases`,
/* Youtube Search */  'yt_q'     : `www.youtube.com/results?search_query={%v}`,
/* Amazon Product */  'am'       : `www.amazon.com/dp/{%v}`,
/* Amazon Store   */  'am_s'     : `www.amazon.com/stores/page/{%v}`,
/* Amazon Search  */  'am_q'     : `www.amazon.com/s?k={%v}`,
/* Duckdg Image   */  'dg_i'     : `external-content.duckduckgo.com/iu/?u=https://{%v}`,
/* Duckdg Search  */  'dg_q'     : `duckduckgo.com/?q={%v}`,
/* Dailym Article */  'dm'       : `www.dailymail.com/news/article-{%v}`,
/* Cinemaholic    */  'ch'       : `thecinemaholic.com/{%v}`,
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