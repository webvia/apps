// Vars ==============================================================================================================================================================================================

let win=window; let hist=win.history; let clip=win.navigator.clipboard; let doc=win.document; let loc=doc.location; let title=doc.title; let head=doc.head; let body=doc.body;
let href=loc.href; let prot=loc.protocol+'://'; let host=loc.host; let path=loc.pathname; let srch=loc.search; let params=new URLSearchParams(srch); let hash=loc.hash; /*href=prot://host/path/?srch(prms)#hash*/
let app_u=params.get('app'); let app_j=app_u+'.js';  
let icon=head.querySelector('#app_icon');  let base=head.querySelector('#app_base').setAttribute('href',app_u+'/');  doc.querySelector('noscript').remove();

// Setup =============================================================================================================================================================================================

win.onerror=(message,source,lineno,colno,error) => { let msg=message.substring(message.indexOf(':')+2);  let src=source.substring(source.lastIndexOf('/')+1);  let err=`${msg}  [ ${src} > ${lineno}-${colno} ]`;  alert(err) };

if(app_u!==null){ SetTitleText(app_u); SetIconCharacter(`🔳`); AddScriptExternal(app_j) } else{ SetTitleText(`App not specified`); SetIconCharacter(`⛔️`); body.insertAdjacentHTML('beforeend',`App not specified.`) } 

// Functions =========================================================================================================================================================================================

function SetTitleText(txt){ doc.title=txt }
function SetIconURL(url){ icon.href=url }
function SetIconCharacter(chr){ icon.href=`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%22-.1em%22 y=%22.9em%22 font-size=%2280%22>${chr}</text></svg>` }
function AddStyleInline(elem,css){ elem.style=css }
function AddStyleInternal(css){ let e=doc.createElement('style'); e.textContent=css; head.append(e) }
function AddStyleExternal(url){ let e=doc.createElement('link'); e.rel='stylesheet'; e.href=url; head.append(e) }
function AddScriptExternal(url){ let e=doc.createElement('script'); e.src=url; e.defer=true; head.append(e) }
function log(msg){ console.log(msg) }  function dir(obj){ console.dir(obj) }

// ModifyContent -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ModifyContent(a,c1,c2,p,d){ 
     if(a=='move'){ c1=doc.querySelectorAll(c1);  c2=doc.querySelector(c2);  for(let c1n of c1){ InsertContent(c1n, c2, p) } }
else if(a=='copy'){ c1=doc.querySelectorAll(c1);  c1=MergeContent(c1);  c2=doc.querySelectorAll(c2);  for(let c2n of c2){ let c1c=c1.cloneNode(true);  InsertContent(c1c, c2n, p) } }
else if(a=='add'){ c1=DatafyContent(c1,d);  c1=ConvertContent(c1);  c2=doc.querySelectorAll(c2);  for(let c2n of c2){ let c1c=c1.cloneNode(true);  InsertContent(c1c, c2n, p) } }
else if(a=='replace'){ c1=doc.querySelectorAll(c1);  c2=DatafyContent(c2,p);  c2=ConvertContent(c2);  for(let c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceWith(c2c) } }
else if(a=='replace-inner'){ c1=doc.querySelectorAll(c1);  c2=DatafyContent(c2,p);  c2=ConvertContent(c2);  for(let c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceChildren(c2c) } }
else if(a=='remove'){ c1=doc.querySelectorAll(c1);  for(let c1n of c1){ c1n.replaceWith() } }
else if(a=='remove-inner'){ c1=doc.querySelectorAll(c1);  for(let c1n of c1){ c1n.replaceChildren() } }
}
function ConvertContent(c){ if(typeof c!=='string'){ return c }  let t=doc.createElement('template');  t.innerHTML=c;  f=t.content;  t.remove();  return f }
function MergeContent(c){ let f=new DocumentFragment();  for(let n of c){ f.append(n.cloneNode(true)) };  return f }
function InsertContent(c,n,p){ if(p=='before'){ n.before(c) } else if(p=='begin'){ n.prepend(c) } else if(p=='end'){ n.append(c) } else if(p=='after'){ n.after(c) } }
function DatafyContent(c,d){ if(d===undefined){ return c }  c=c.replaceAll('\${','${');  let cd='';  for(let di of d){ let ci=c;  for(let dp in di){ let re=new RegExp(`\\$\\{${dp}\\}`,'g');  ci=ci.replace(re, di[dp]) }  cd=cd+ci }  return cd }

/* Notes =============================================================================================================================================================================================


--------------------------------------------------------------------------------------------------------------

// ACTION ___________  CONTENT-1 __ CONTENT-2 ___ POS __ DATA     Position:before|begin|end|after|self|inner
// move                what:sels    where:sel     pos    ----
// copy                what:sels    where:sels    pos    ????
// add                 what:h|n     where:sels    pos    data     '\${x}'
// replace             what:sels    with:h|n      dat    data
// replace-inner       what:sels    with:h|n      dat    data
// remove              what:sels    ----------    ---    ----
// remove-inner        what:sels    ----------    ---    ----

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Variables, Events/Listeners/Keyboard, Fetch/Push, Clipboard, Selection, Location/URL, CSS
HTML/DOM, Dialog, Form, H1-6, List/Tree, Media, Table(sort), Template
Data/Storage: Storage_API, Cookie_Store_API, Web_Storage_API, IndexedDB_API, File_System_Access_API, File_API, Cache

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function addHTMLExternal(url,selector,position) { let u=url; let s=selector; let p=position; if(u==null){return}; if(s==null){s='body'}; if(p==null){p='beforeend'};
  if(u.startsWith('https://')||u.startsWith('http://')){ u=`${u}` } else if(u.startsWith('//')){ u=`https:${u}` } else if(u.startsWith('/')){ u=`${app_u}${u}` };
  try { let r = await fetch(u); 
    if (r.ok) { let t = await r.text(); if(t.indexOf('<body>')!=-1){ t=t.split('<body>')[1].split('</body>')[0] }; let e=doc.querySelector(s); e.insertAdjacentHTML(p,t) }
    else { throw new Error(`${r.status}`) } } catch (err) { console.error(`Fetch Error: ${err.message}`) } }
async function addHTMLExternalIndex(){ await addHTMLExternal(app_h); addScriptExternal(app_j) } addHTMLExternalIndex();   let app_h=`${app_u}/${app_u}.html`; 
async function addExtHTMLMore(){ await addExtHTML('/more.html','#index','beforeend'); let more=doc.querySelector('#more'); console.log(more.textContent); } addExtHTMLMore();

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function HTMLifyContent(c){ if(!c.startsWith('>(')){ return c }  return c } // end HTMLifyContent
find first ')'  >  find prev '('  >  find prev-prev '(' or ','  >  get 'elem' between prev-prev '(' or ',' and next '(' or '['  >  replace 'elem' with '<elem>'  >  replace ')' with '</elem>'  >  REPEAT
let c = `>( <form>[id=f1] ( <fieldset>[class=fa fb] ( <input>[type=text] , <select>[id=s1 ; name=s1n ; disabled] ) <textarea> ( {text} ) ) <div> , <p> ( {text} ) )<`;
Summary:  '>( e[ a=v ; a ] ( e , e ) e ( { t } ) )<'
Element Abbreviations/Expansions:  a-a, div-d, span-s, table-t, ul/ol
Attribute Abbreviation:  alt/a, class/c, data-/d, disabled/di, form/f, hidden-hi, href-h, id/i, label/l, media/m, name/n, src/s, style/st, title/t, type/ty, value/v

====================================================================================================================================================================================================*/
