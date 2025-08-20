window.onerror=(message,source,linenum,colnum,error)=>{ let err=`${message}  [ ${source} > ${linenum}-${colnum} ]`;  alert(err);  return true }

let $={/*svc-vars*/};  $.data={};  let win,hist,navn,clip,lang,agent,  doc,root,head,title,icon,base,body,h1,  cli_hgt,cli_wid,  loc,href,prot,ref,host,dom,path,srch,prms,hash,  app_url,app_js;
let _={/*app-vars*/};  

// Utils =============================================================================================================================================================================================

// PreLoad ===========================================================================================================================================================================================

PreLoad$(); function PreLoad$(){
win=window; hist=win.history; navn=win.navigation; clip=navigator.clipboard; lang=navigator.language; agent=navigator.userAgent; doc=win.document; root=doc.documentElement; title=doc.title; head=doc.head; body=doc.body;
loc=doc.location; href=loc.href; prot=loc.protocol+'://'; host=loc.host; path=loc.pathname; srch=loc.search; prms=new URLSearchParams(srch); hash=loc.hash;
ref=href.replace(/^.+\/\/www\.|.+\/\//,''); dom=ref.substring(0,ref.indexOf('/')); dom=dom.substring(0,dom.lastIndexOf('.')); //href(ref)=prot/host(dom)/path/?srch&prms#hash
app_url=prms.get('app'); app_js=app_url+'.js';  icon=head.querySelector('#app_icon');  base=head.querySelector('#app_base').setAttribute('href',app_url+'/'); 
cli_hgt=root.clientHeight; cli_wid=root.clientWidth;  
doc.querySelector('noscript').remove();
SetStyleInternal$(` body { margin: unset;  font-family: sans-serif; }  button { all: unset;  user-select: none;  cursor: pointer; }  table { border-collapse: collapse; } `, 'apps_style'); 
if(app_url!==null){ SetTitleText$(app_url); SetIconCharacter$(`🔳`); SetScriptExternal$(app_js,'app_script') } else{ SetTitleText$(`App not specified`); SetIconCharacter$(`⛔️`); body.insertAdjacentHTML('beforeend',`App not specified.`) }; 
} /*-PreLoad*/  /*DOMContentLoaded*/

// Functions =========================================================================================================================================================================================

function SetTitleText$(txt){ doc.title=txt }
function SetIconURL$(url){ icon.href=url }
function SetIconCharacter$(chr){ icon.href=`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%22-.1em%22 y=%22.9em%22 font-size=%2280%22>${chr}</text></svg>` }
function SetStyleInline$(css,elem){ elem.style=css }
function SetStyleInternal$(css,id){ let e=doc.createElement('style'); e.textContent=css; e.id=id; head.append(e) }
function SetStyleExternal$(url,id){ let e=doc.createElement('link'); e.rel='stylesheet'; e.href=url; e.id=id; head.append(e) }
function SetScriptExternal$(url,id){ let e=doc.createElement('script'); e.src=url; e.id=id; e.defer=true; head.append(e) }
function SetModules$(modules){} // tree, etc ...  let components=(o.components!=null)?o.components:null;
function NodeHasChildren$(node){ return (typeof node === 'object') && (typeof node.children !== 'undefined') && (node.children.length > 0) }
function log(msg){ console.log(msg) }  function dir(obj){ console.dir(obj) }
function HasValue$(x){ return ![undefined,null,{},[],''].includes(x) }  function IsNotNull$(x){ return ![undefined,null].includes(x) }  function IsDefined$(x){ return x!==undefined }  function IsJSON$(x){ return /^\s*(\{|\[)/.test(x) }

// HTML ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetHTML$(a,c1,c2,p,d){ if(a==null){return}
  else if(a==='add'){ c1=DatafyHTML$(c1,d);  c1=ConvertHTML$(c1);  c2=doc.querySelectorAll(c2);  for(const c2n of c2){ let c1c=c1.cloneNode(true);  InsertHTML$(c1c, c2n, p) } }
  else if(a==='copy'){ c1=doc.querySelectorAll(c1);  c1=MergeHTML$(c1);  c2=doc.querySelectorAll(c2);  for(const c2n of c2){ let c1c=c1.cloneNode(true);  InsertHTML$(c1c, c2n, p) } }
  else if(a==='move'){ c1=doc.querySelectorAll(c1);  c2=doc.querySelector(c2);  for(const c1n of c1){ InsertHTML$(c1n, c2, p) } }
  else if(a==='remove'){ c1=doc.querySelectorAll(c1);  for(const c1n of c1){ c1n.replaceWith() } }
  else if(a==='remove-inner'){ c1=doc.querySelectorAll(c1);  for(const c1n of c1){ c1n.replaceChildren() } }
  else if(a==='replace'){ c1=doc.querySelectorAll(c1);  c2=DatafyHTML$(c2,p);  c2=ConvertHTML$(c2);  for(const c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceWith(c2c) } }
  else if(a==='replace-inner'){ c1=doc.querySelectorAll(c1);  c2=DatafyHTML$(c2,p);  c2=ConvertHTML$(c2);  for(const c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceChildren(c2c) } }
} /*-SetHTML$*/

function ConvertHTML$(c){ if(typeof c!=='string'){ return c }  let t=doc.createElement('template');  t.innerHTML=c;  f=t.content;  t.remove();  return f }
function MergeHTML$(c){ let f=new DocumentFragment();  for(const n of c){ f.append(n.cloneNode(true)) };  return f }
function InsertHTML$(c,n,p){ if(p==='before'){ n.before(c) } else if(p==='begin'){ n.prepend(c) } else if(p==='end'){ n.append(c) } else if(p==='after'){ n.after(c) } }
function DatafyHTML$(c,d){ if(d==null){ return c }  c=c.replaceAll('\${','${');  let cd='';  for(const di of d){ let ci=c;  for(const dp in di){ let re=new RegExp(`\\$\\{${dp}\\}`,'g');  ci=ci.replace(re, di[dp]) }  cd=cd+ci }  return cd }

// Dialog --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function OpenDialog$(content,type,title,submitButton,closeButton){ // <button onclick="OpenDialog('<div>hi</div>','modal','Save','Cancel')">dialog</button>  // \moz_html__Element/dialog  
let header=`<header id="dlg_top" style="text-align:right"><button id="dlg_button_close_top" onclick="CloseDialog$()" autofocus>❌️</button></header>`;
let footer=(submitButton==null)?``:`<footer id="dlg_bottom" style="text-align:right"><button id="dlg_button_close" onclick="CloseDialog$()">${closeButton}</button><button id="dlg_button_submit" formmethod="dialog">${submitButton}</button></footer>`;
let h=`<dialog id="dlg" style="margin-top:0"><form id="dlg_form">${header}<article id="dlg_content">${content}</article>${footer}</form></dialog>`;
body.insertAdjacentHTML('beforeend',h); SetStyleInternal$(` #dlg::backdrop { opacity: .5; } `); let d=doc.querySelector("#dlg");  if(type==='modal'){ d.showModal() } else{ d.show() }
} /*-OpenDialog$*/   function CloseDialog$(data){ let d=doc.querySelector("#dlg"); d.close(); d.remove() }

// Menu ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function OpenMenu$(menuSelector){ let btn=body.querySelector('button:focus'); let mnu_sel=(menuSelector!=null)?menuSelector:'button:focus+dialog'; let mnu=body.querySelector(mnu_sel); let btn_rect=btn.getBoundingClientRect(); let btn_lft=btn_rect.left; let btn_bot=btn_rect.bottom; let btn_below_hgt=cli_hgt-btn_bot; let btn_rht_wid=cli_wid-btn_lft;  let mnu_sty=mnu.style; mnu_sty.padding='unset'; mnu_sty.maxHeight=`${cli_hgt-16}px`; mnu_sty.maxWidth=`${cli_wid-16}px`;  mnu.showModal(); mnu.focus();  let mnu_rect=mnu.getBoundingClientRect(); let mnu_hgt=mnu_rect.height; let mnu_wid=mnu_rect.width;  if(mnu_hgt<btn_below_hgt){mnu_sty.marginTop=`${btn_bot}px`}else{mnu_sty.marginBottom=`${8}px`} if(mnu_wid<btn_rht_wid){mnu_sty.marginLeft=`${btn_lft}px`}else{mnu_sty.marginRight=`${8}px`}
} /*-OpenMenu$*/   function CloseMenu$(){ let mnu=body.querySelector('dialog:focus-within');  mnu.close() }

/* Notes =============================================================================================================================================================================================

> Platform:  Variables, Components, Events/Listeners/Keyboard, Data-Fetch/Push, Clipboard, Selection, Location/URL, CSS, Displays  ...

> Components
Layout+
Navigation
  Panel/Drawer/Sidebar - slide-out|over
  Tree+ - hier, items
  Menu+ - actions, context
  Breadcrumb/Path+ -  sep-styles: chevron, slash/, gls>,  (derived from nav/tree)
List/Items+ - items, cards, repeat    types: col-wrap, row-wrap, v-list, table
  Pagination-nav - subset of list
  Table - items, rows
Item/Edit - metadata:  id, type_id, parent_ids, date_created, date_modified,  ... data:  name, title, hi,...
   item types:  type_definition(item), folder(grouping), container(folder as file), search(query), versions, reference(shortcut), ... file(gen/doc/img/aud/vid/etc)
  TabBar/Tabs - nav, views, subset of item
  Accordion/Expander - summary>detail
  Content/Main/Article - in-array, in-var, fetch
Dialog+ - messages, input - head(icon, title, close),  main(cont, data), foot(actions),  styles-size/position/type,  behaviors-modal/movable/resizable
Form: controls, input, select/picker
Misc: button, icon, badge, progress, tag, ..
----
Data/Storage:  Storage_API, Cookie_Store_API, Web_Storage_API, IndexedDB_API, File_System_Access_API, File_API, Cache
Displays:  @media screen and (max-width: 767px) { ... }   @media screen and (min-width: 768px) { ... }    <=480 - 481-767 - 768-1024 - 1025-1280 - 1281=<

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

async function addHTMLExternal(url,selector,position) { let u=url; let s=selector; let p=position; if(u===null){return}; if(s===null){s='body'}; if(p===null){p='beforeend'};
  if(u.startsWith('https://')||u.startsWith('http://')){ u=`${u}` } else if(u.startsWith('//')){ u=`https:${u}` } else if(u.startsWith('/')){ u=`${app_url}${u}` };
  try { let r = await fetch(u); 
    if (r.ok) { let t = await r.text(); if(t.indexOf('<body>')!=-1){ t=t.split('<body>')[1].split('</body>')[0] }; let e=doc.querySelector(s); e.insertAdjacentHTML(p,t) }
    else { throw new Error(`${r.status}`) } } catch (err) { console.error(`Fetch Error: ${err.message}`) } }
async function addHTMLExternalIndex(){ await addHTMLExternal(app_h); addScriptExternal(app_js) } addHTMLExternalIndex();   let app_h=`${app_url}/${app_url}.html`; 
async function addExtHTMLMore(){ await addExtHTML('/more.html','#index','beforeend'); let more=doc.querySelector('#more'); console.log(more.textContent) } addExtHTMLMore();

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function HTMLifyContent(c){ if(!c.startsWith('>(')){ return c }  return c } // end HTMLifyContent
find first ')'  >  find prev '('  >  find prev-prev '(' or ','  >  get 'elem' between prev-prev '(' or ',' and next '(' or '['  >  replace 'elem' with '<elem>'  >  replace ')' with '</elem>'  >  REPEAT
let c = `>( <form>[id=f1] ( <fieldset>[class=fa fb] ( <input>[type=text] , <select>[id=s1 ; name=s1n ; disabled] ) <textarea> ( {text} ) ) <div> , <p> ( {text} ) )<`;
Summary:  '>( e[ a=v ; a ] ( e , e ) e ( { t } ) )<'
Element Abbreviations/Expansions:  a-a, div-d, span-s, table-t, ul/ol
Attribute Abbreviation:  alt/a, class/c, data-/d, disabled/di, form/f, hidden-hi, href-h, id/i, label/l, media/m, name/n, src/s, style/st, title/t, type/ty, value/v

====================================================================================================================================================================================================*/
