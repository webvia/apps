onerror=(message,source,lineno,colno,error)=>{ let err=`${message}  [ ${source} > ${lineno}-${colno} ]`;  alert(err) }

let $={/*svc-vars*/}; let win,hist,navn,clip,lang,  doc,root,head,title,icon,base,body,h1,  cli_hgt,cli_wid,  loc,href,prot,ref,host,dom,path,srch,prms,hash,  app_url,app_js;
let _={/*app-vars*/};  

// PreLoad ===========================================================================================================================================================================================

PreLoad(); function PreLoad(){
win=window; hist=win.history; navn=win.navigation; clip=navigator.clipboard; lang=navigator.language; doc=win.document; root=doc.documentElement; title=doc.title; head=doc.head; body=doc.body;
loc=doc.location; href=loc.href; prot=loc.protocol+'://'; host=loc.host; path=loc.pathname; srch=loc.search; prms=new URLSearchParams(srch); hash=loc.hash;
ref=href.replace(/^.+\/\/www\.|.+\/\//,''); dom=ref.substring(0,ref.indexOf('/')); dom=dom.substring(0,dom.lastIndexOf('.')); //href(ref)=prot/host(dom)/path/?srch&prms#hash
app_url=prms.get('app'); app_js=app_url+'.js';  icon=head.querySelector('#app_icon');  base=head.querySelector('#app_base').setAttribute('href',app_url+'/'); 
cli_hgt=root.clientHeight; cli_wid=root.clientWidth;  
doc.querySelector('noscript').remove();
SetStyleInternal(` body { margin: unset;  font-family: sans-serif; }  button { all: unset;  user-select: none;  cursor: pointer; }  table { border-collapse: collapse; } `, 'apps_style'); 
if(app_url!==null){ SetTitleText(app_url); SetIconCharacter(`🔳`); SetScriptExternal(app_js,'app_script') } else{ SetTitleText(`App not specified`); SetIconCharacter(`⛔️`); body.insertAdjacentHTML('beforeend',`App not specified.`) }; 
} /*-PreLoad*/  /*DOMContentLoaded*/


// Functions =========================================================================================================================================================================================

function SetTitleText(txt){ doc.title=txt }
function SetIconURL(url){ icon.href=url }
function SetIconCharacter(chr){ icon.href=`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%22-.1em%22 y=%22.9em%22 font-size=%2280%22>${chr}</text></svg>` }
function SetStyleInline(css,elem){ elem.style=css }
function SetStyleInternal(css,id){ let e=doc.createElement('style'); e.textContent=css; e.id=id; head.append(e) }
function SetStyleExternal(url,id){ let e=doc.createElement('link'); e.rel='stylesheet'; e.href=url; e.id=id; head.append(e) }
function SetScriptExternal(url,id){ let e=doc.createElement('script'); e.src=url; e.id=id; e.defer=true; head.append(e) }
function SetModules(modules){} // tree, etc ...  let components=(o.components!=null)?o.components:null;
function log(msg){ console.log(msg) }  function dir(obj){ console.dir(obj) }


// SetHTML -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetHTML(a,c1,c2,p,d){ if(a==null){return}
  else if(a==='add'){ c1=DatafyHTML(c1,d);  c1=ConvertHTML(c1);  c2=doc.querySelectorAll(c2);  for(const c2n of c2){ let c1c=c1.cloneNode(true);  InsertHTML(c1c, c2n, p) } }
  else if(a==='copy'){ c1=doc.querySelectorAll(c1);  c1=MergeHTML(c1);  c2=doc.querySelectorAll(c2);  for(const c2n of c2){ let c1c=c1.cloneNode(true);  InsertHTML(c1c, c2n, p) } }
  else if(a==='move'){ c1=doc.querySelectorAll(c1);  c2=doc.querySelector(c2);  for(const c1n of c1){ InsertHTML(c1n, c2, p) } }
  else if(a==='remove'){ c1=doc.querySelectorAll(c1);  for(const c1n of c1){ c1n.replaceWith() } }
  else if(a==='remove-inner'){ c1=doc.querySelectorAll(c1);  for(const c1n of c1){ c1n.replaceChildren() } }
  else if(a==='replace'){ c1=doc.querySelectorAll(c1);  c2=DatafyHTML(c2,p);  c2=ConvertHTML(c2);  for(const c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceWith(c2c) } }
  else if(a==='replace-inner'){ c1=doc.querySelectorAll(c1);  c2=DatafyHTML(c2,p);  c2=ConvertHTML(c2);  for(const c1n of c1){ let c2c=c2.cloneNode(true);  c1n.replaceChildren(c2c) } }
} /*-SetHTML*/

function ConvertHTML(c){ if(typeof c!=='string'){ return c }  let t=doc.createElement('template');  t.innerHTML=c;  f=t.content;  t.remove();  return f }
function MergeHTML(c){ let f=new DocumentFragment();  for(const n of c){ f.append(n.cloneNode(true)) };  return f }
function InsertHTML(c,n,p){ if(p==='before'){ n.before(c) } else if(p==='begin'){ n.prepend(c) } else if(p==='end'){ n.append(c) } else if(p==='after'){ n.after(c) } }
function DatafyHTML(c,d){ if(d==null){ return c }  c=c.replaceAll('\${','${');  let cd='';  for(const di of d){ let ci=c;  for(const dp in di){ let re=new RegExp(`\\$\\{${dp}\\}`,'g');  ci=ci.replace(re, di[dp]) }  cd=cd+ci }  return cd }


// Dialog --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function OpenDialog(content,type,title,submitButton,closeButton){ // <button onclick="OpenDialog('<div>hi</div>','modal','Save','Cancel')">dialog</button>  // \moz_html__Element/dialog  
let header=`<header id="dlg_top" style="text-align:right"><button id="dlg_button_close_top" onclick="CloseDialog()" autofocus>❌️</button></header>`;
let footer=(submitButton==null)?``:`<footer id="dlg_bottom" style="text-align:right"><button id="dlg_button_close" onclick="CloseDialog()">${closeButton}</button><button id="dlg_button_submit" formmethod="dialog">${submitButton}</button></footer>`;
let h=`<dialog id="dlg" style="margin-top:0"><form id="dlg_form">${header}<article id="dlg_content">${content}</article>${footer}</form></dialog>`;
body.insertAdjacentHTML('beforeend',h); SetStyleInternal(` #dlg::backdrop { opacity: .5; } `); let d=doc.querySelector("#dlg");  if(type==='modal'){ d.showModal() } else{ d.show() }
} /*-OpenDialog*/   function CloseDialog(data){ let d=doc.querySelector("#dlg"); d.close(); d.remove() }


// Menu ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function OpenMenu(menuSelector){ let btn=body.querySelector('button:focus'); let mnu_sel=(menuSelector!=null)?menuSelector:'button:focus+dialog'; let mnu=body.querySelector(mnu_sel); let btn_rect=btn.getBoundingClientRect(); let btn_lft=btn_rect.left; let btn_bot=btn_rect.bottom; let btn_below_hgt=cli_hgt-btn_bot; let btn_rht_wid=cli_wid-btn_lft;  let mnu_sty=mnu.style; mnu_sty.padding='unset'; mnu_sty.maxHeight=`${cli_hgt-16}px`; mnu_sty.maxWidth=`${cli_wid-16}px`;  mnu.showModal(); mnu.focus();  let mnu_rect=mnu.getBoundingClientRect(); let mnu_hgt=mnu_rect.height; let mnu_wid=mnu_rect.width;  if(mnu_hgt<btn_below_hgt){mnu_sty.marginTop=`${btn_bot}px`}else{mnu_sty.marginBottom=`${8}px`} if(mnu_wid<btn_rht_wid){mnu_sty.marginLeft=`${btn_lft}px`}else{mnu_sty.marginRight=`${8}px`}
} /*-OpenMenu*/   function CloseMenu(){ let mnu=body.querySelector('dialog:focus-within');  mnu.close() }


// Tree Items ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let $tree_items;  let ti_id, ti_par, ti_type, ti_name, ti_icon, ti_cont;  let ti_id_i, ti_par_i, ti_type_i, ti_name_i, ti_icon_i, ti_cont_i;  let ti_i, ti_par_is, ti_sib_is, ti_chi_is;  let ti_i_i, ti_par_is_i, ti_sib_is_i, ti_chi_is_i; 


function SetTreeItems(ti_id_start){ let ti=$tree_items[0];  

ti.push('ti_i');  ti.push('ti_par_is');  ti.push('ti_sib_is');  ti.push('ti_chi_is');  $tree_items.shift();  

ti_id_i=ti.indexOf('id'); ti_par_i=ti.indexOf('parent'); ti_type_i=ti.indexOf('type'); ti_name_i=ti.indexOf('name'); ti_icon_i=ti.indexOf('icon'); ti_cont_i=ti.indexOf('content');  
ti_i_i=ti.indexOf('ti_i');  ti_par_is_i=ti.indexOf('ti_par_is');  ti_sib_is_i=ti.indexOf('ti_sib_is');  ti_chi_is_i=ti.indexOf('ti_chi_is'); 

for(const [i,x] of $tree_items.entries()){ let ti_id_x=x[ti_id_i];  let ti_par_x=x[ti_par_i];  x.push(null, [],[],[]);  x[ti_i_i]=i;  let ti_par_is_x=x[ti_par_is_i];  let ti_sib_is_x=x[ti_sib_is_i];  let ti_chi_is_x=x[ti_chi_is_i];
  for(const [j,y] of $tree_items.entries()){ let ti_id_y=y[ti_id_i];  let ti_par_y=y[ti_par_i];  let ti_par_is_y=y[ti_par_is_i];  if(ti_par_x===ti_id_y){ ti_par_is_x.push(ti_par_is_y,j) };  if(ti_par_x===ti_par_y){ ti_sib_is_x.push(j) };  if(ti_id_x===ti_par_y){ ti_chi_is_x.push(j) };
  } /*-for j*/
  x[ti_par_is_i]=ti_par_is_x.flat(Infinity);
} /*-for i*/

let ti_id_prm=prms.get('item');  ti_id = (ti_id_prm!=null) ? ti_id_prm : (ti_id_start!=null && ti_id_start!='') ? ti_id_start : $tree_items[0][ti_id_i];

SetTreeItem(ti_id);

} /*-SetTreeItems*/


function SetTreeItem(ti_id_new){ let ti;
for(const [i,x] of $tree_items.entries()){ if(ti_id_new===x[ti_id_i]){ ti=x;  ti_i=i;  break } };
ti_id=ti[ti_id_i]; ti_par=ti[ti_par_i]; ti_type=ti[ti_type_i]; ti_name=ti[ti_name_i]; ti_icon=ti[ti_icon_i]; ti_cont=ti[ti_cont_i]; ti_par_is=ti[ti_par_is_i]; ti_sib_is=ti[ti_sib_is_i]; ti_chi_is=ti[ti_chi_is_i]; 
SetTree(); SetPath(); SetItemContent();
} /*-SetTreeItem*/


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetList(list_items, list_wrap_html, list_item_html, list_container_id, list_css){  let h=``;  let list_props=list_items[0];  list_items.shift();
for(const [i,x] of list_items.entries()){ let hi=list_item_html;  for(const [j,y] of list_props.entries()){ hi=hi.replace('%{'+y+'}', x[j]) } /*-for j*/  h=h+hi } /*-for i*/
h=list_wrap_html.replace('%{}', h);
SetHTML('replace-inner','#'+list_container_id, h);
let list_style_id='app_'+list_container_id+'_style';  if(head.querySelector('#'+list_style_id)===null){ SetStyleInternal(list_css, list_style_id) };
} /*-SetList*/


// Tree ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetTree(){ let tree_pars_html='';  let tree_items_html='';

for(const x of ti_par_is){ let ti_x=$tree_items[x];  tree_pars_html=`${tree_pars_html}<button tree_item_parent tree_item onclick="SetTreeItem('${ti_x[ti_id_i]}')"><x tree_icon>${ti_x[ti_icon_i]}</x tree_icon><x tree_name>${ti_x[ti_name_i]}</x tree_name></button>` } /*-for x parents*/

for(const x of ti_sib_is){ let ti_x=$tree_items[x]; 
  let tree_ti_cur=(ti_i===ti_x[ti_i_i])?'tree_ti_cur':''; 
  let tree_ti_top=(ti_x[ti_par_i]==='')?'tree_ti_top':''; 
  tree_items_html=`${tree_items_html}<button tree_item_sibling ${tree_ti_top} ${tree_ti_cur} tree_item onclick="SetTreeItem('${ti_x[ti_id_i]}')"><x tree_icon>${ti_x[ti_icon_i]}</x tree_icon><x tree_name>${ti_x[ti_name_i]}</x tree_name></button>`;
  if(ti_i===ti_x[ti_i_i]){
    for(const y of ti_chi_is){ let ti_y=$tree_items[y];  tree_items_html=`${tree_items_html}<button tree_item_child tree_item onclick="SetTreeItem('${ti_y[ti_id_i]}')"><x tree_icon>${ti_y[ti_icon_i]}</x tree_icon><x tree_name>${ti_y[ti_name_i]}</x tree_name></button>` } /*-for y childs*/
  } /*-if*/
} /*-for x siblings*/

let tree_html=`<nav tree_nav><x tree_bar>
<button tree_bar_button title="Up to Top Level" onclick="SetTreeItem('${$tree_items[0][ti_id_i]}')">⏫️</button>
<button tree_bar_button title="Up One Level" onclick="SetTreeItem('${ti_par}')">🔼</button>
<button tree_bar_button title="Tree View" onclick="SetTreeItem('${ti_par}')">↘️</button>
<button tree_bar_button title="List View" onclick="SetTreeItem('${ti_par}')">⬇️</button>

</x tree_bar><x tree_items>${tree_pars_html}${tree_items_html}</x tree_items></nav tree_nav>`;  

SetHTML('replace-inner', '#layout_tree', tree_html);

let css=`
[tree_nav] { display: flex;  flex-flow: column nowrap;  align-items: stretch;  width: 250px;  height: 100vh;  bottom: 0;  background-color: #202020;  border-right: 1px solid #808080;  }

[tree_bar] { display: flex;  flex-flow: row nowrap;  border-bottom: 1px solid #808080; }
[tree_bar_button] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  padding: .5em .75em .5em .75em; }
[tree_bar_button]:hover { background-color: #303030; }

[tree_items] { display: flex;  flex-flow: column nowrap;  align-items: stretch; }

[tree_item] { display: flex;  flex-flow: row nowrap;  padding: .5em 0em .5em 0em;  font-size: 1em; }
[tree_item]:hover { background-color: #303030; }
[tree_icon] { margin-right: .5em; }

[tree_item_child]  { padding-left: 3.5em; }
[tree_item_sibling] , [tree_item_top]~[tree_item_child] { padding-left: 2em; }
[tree_item_parent] , [tree_item_top] { padding-left: .5em;  border-left: 4px inset #606060; }
[tree_item_current] { font-weight: bold;  background-color: #404040; }
`;
if(head.querySelector('#apps_tree_style')===null){ SetStyleInternal(css, 'apps_tree_style') };

} /*-SetTree*/


// Path ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetPath(){ let path_pars_html='';  let path_items_html='';  let path_sep_html=`<x path_sep>🞂</x path_sep>`;
for(const x of ti_par_is){ let ti_x=$tree_items[x];  path_pars_html=`${path_pars_html}<button path_item_parent path_item onclick="SetTreeItem('${ti_x[ti_id_i]}')"><x path_icon>${ti_x[ti_icon_i]}</x path_icon><x path_name>${ti_x[ti_name_i]}</x path_name></button>${path_sep_html}` } /*-for x parents*/
path_items_html=`<button path_item_current path_item><x path_icon>${ti_icon}</x path_icon><x path_name>${ti_name}</x path_name></button>`;
let path_html=`<nav path_nav><x path_items>${path_pars_html}${path_items_html}</x path_items></nav path_nav>`;  
SetHTML('replace-inner', '#layout_path', `${path_html}`);

let css=`
[path_nav] { display: flex;  flex-flow: row wrap;  background-color: #202020;  border-bottom: 1px solid #808080; width: 100%; }
[path_items] { display: flex;  flex-flow: row nowrap;  justify-content: center; }
[path_item] { display: flex;  flex-flow: row nowrap;  padding: .5em 1em .5em 1em;  font-size: 1em; }
[path_item]:hover { background-color: #303030; }
[path_icon] { margin-right: .5em; }
[path_sep] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  user-select: none;  padding: 0 .5em 0 .5em;  color: #808080; }
`;
if(head.querySelector('#apps_path_style')===null){ SetStyleInternal(css, 'apps_path_style') };

} /*-SetPath*/


// Content -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetItemContent(){ SetHTML('replace-inner', '#layout_cont', `${ti_cont}`) }


// Layout --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetLayout(){ 

let lay_html=`
<div id="layout_page">
  <header id="layout_header"><div>HEADER</div></header layout_header>
  <div id="layout_middle">
    <div id="layout_left"><div id="layout_tree"></div layout_tree></div layout_left>
    <div id="layout_center">
      <div id="layout_top"><div id="layout_path"></div layout_path></div layout_top>
      <main id="layout_main"><div id="layout_list"></div layout_list><div id="layout_cont"></div layout_cont></main layout_main>
      <div id="layout_bottom"><div>BOTTOM</div></div layout_bottom>
    </div layout_center>
    <aside id="layout_right"><div>RIGHT</div></aside layout_right>
  </div layout_middle>
  <footer id="layout_footer"><div>FOOTER</div></footer layout_header>
</div layout_page>
`;  SetHTML('add',lay_html,'body','end');

let lay_css=` 
#layout_page { display: flex;  flex-flow: column nowrap;  justify-content: center;  width: 100%; }
  #layout_header, #layout_middle, #layout_footer { }
  #layout_middle { display: flex;  flex-flow: row nowrap; }
    #layout_left, #layout_center, #layout_right { }   #layout_left>#layout_tree { }
    #layout_center { display: flex;  flex-flow: column nowrap;  flex-basis: 100%; }
      #layout_top, #layout_main, #layout_bottom { }   #layout_top>#layout_path { }
      #layout_main { }   #layout_cont { padding: 1em; }
`;  SetStyleInternal(lay_css,'apps_layout_style');

} /*-SetLayout*/


/* Notes =============================================================================================================================================================================================

model - data
control - data transform/io/mapping
view - ui component - premade/custom




Tree/Path/List   Type determines Target   tree_items(ti) > list_items(li) > cont_items(ci)   list [ item(id) { key/name : value } ]
Content/Properties  content - query/fetch/variable




direction-row|col
wrap|nowrap
scroll|noscroll
align-
style-size/border/outline/back/color

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Platform:  Variables, Components, Events/Listeners/Keyboard, Data-Fetch/Push, Clipboard, Selection, Location/URL, CSS, Displays  ...

> Components
Layout+
Navigation
  Panel/Drawer/Sidebar - slide-out|over
  Tree+ - hier, items
  Menu+ - actions, context
  Breadcrumb/Path+ -  sep-styles: chevron, slash/, gls>, 
List/Items - items, cards, repeat    types: col-wrap, row-wrap, v-list, table
  Pagination-nav - subset of list
  Table - items, rows
Item/Edit - metadata:  id, type_id, parent_ids, date_created, date_modified,  ... data:  name, title, hi,...
   item types:  type_definition(item), folder(grouping), container(folder as file), search(query), versions, reference(shortcut), ... file(gen/doc/img/aud/vid/etc)
  TabBar/Tabs - nav, views, subset of item
  Accordion/Expander - summary>detail
  Content/Main/Article - in-array, in-var, fetch
Dialog+ - messages, input - head(icon, title, close)  main(cont, data), foot(actions),  styles-size/position/type,  behaviors-modal/movable/resizable
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
