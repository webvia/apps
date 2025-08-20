// Utils =============================================================================================================================================================================================

function RenameObject$(obj,old_key,new_key){ obj[new_key]=obj[old_key]; delete obj[old_key]; }   // ?  Object.assign(obj,{[new_key]:obj[old_key]}); delete obj[old_key];
function EncodeHTML$(s){ return s.replace(/[\&\<\>\"\'\/\\\=\`]/gim, function(s){ return `&#${s.charCodeAt(0)};` } ) }  // EncodeHTML$('\&\<\>\"\'\/\\\=\`'); // EscapeString$(s){ " ' ` \  \t }
function DecodeHTML$(s){ return s.replace(/&#\d+;/gim, function(s){ return String.fromCharCode(s.match(/\d+/gim)[0]) } ) }  // DecodeHTML$('&#38;&#60;&#62;&#34;&#39;&#47;&#92;&#61;&#96;');
function RemoveArrayDuplicates$(x){ x=[...new Set(x)]; return x }
function Evaluate$(s){ let f=new Function(`return ${s}`); let r=f(); return r } // Evaluate string as function
function ParseJSON$(x){ if(typeof x==='string'){ x=JSON.parse(x) }; return x }
function Function$(x){ x=ParseJSON$(x); window[x.function](x) } // call function from JSON-string or JS-object
async function Fetch$(x){ x=ParseJSON$(x);  if( !HasValue$(x.url) ){ return x };  let r=await fetch(x.url);  if(r.ok){ let d=await r.text();  if(IsJSON$(d)){ d=ParseJSON$(d) };  x.data=d;  Function$(x) } }

// Data ==============================================================================================================================================================================================

_.my_data = { meta: { tree_prop:["nodes"], list_prop:["items"], item_prop:[], cont_prop:[] },/*meta$*/  data: { nodes: {
  home:     { id:`home`,	name:`Home`,	icon:`🏠`,	type:`page`,	content:`Home..`,	nodes: {
    bedrooms: { id:`bedrooms`,	name:`Bedrooms`,	icon:`🌙`,	type:`folder`,	content:`Bedrooms..`,	nodes: {
      master:   { id:`master`,	name:`Master`,	icon:`🛌`,	type:`folder`,	content:`Master..`,	nodes: {
        bath:     { id:`bath`,	name:`Bath`,	icon:`🛌`,	type:`folder`,	content:`Bath..`,	},
        closet:   { id:`closet`,	name:`Closet`,	icon:`🛌`,	type:`folder`,	content:`Closet..`,	},
      guest:    { id:`guest`,	name:`Guest`,	icon:`🛌`,	type:`page`,	content:`Guest..`,	},
      },/*nodes*/  },/*master*/
    },/*nodes*/  },/*bedrooms*/
    kitchen:  { id:`kitchen`,	name:`Kitchen`,	icon:`🍴`,	type:`page`,	content:`Kitchen..`,	items: {
      sink: { id:`sink`,	name:`Sink`,	icon:`🍴`,	type:`page`,	content:`Sink..`,	},
      oven: { id:`oven`,	name:`Oven`,	icon:`🍴`,	type:`folder`,	content:`Oven..`,	},
      fridge:   { id:`fridge`,	name:`Fridge`,	icon:`🍴`,	type:`folder`,	content:`Fridge..`,	},
    },/*items*/  },/*kitchen*/
  },/*nodes*/  },/*home*/
},/*nodes*/  },/*data*/  };/*my_data*/  // item_path:  _.my_data.data.nodes.home.nodes.kitchen.items.sink.content

// ref$:{ url,object,path,query,  target(path in $.data),  action(get |add(bef|beg|end|aft) |replace/in |remove/in),  id, type=data }
//          if no url or object, $.data assumed.  query on set of objects with same parent.  

// let data_ref=`{ "url":"http://localhost/apps/github/apps/data/data.json", "path":"dataset_1.(data$.)nodes.home.nodes.kitchen.items", "query":"{{id}}==='sink'||{{id}}==='oven'" }`;
let data_ref=`{ "object":"_.my_data", "path":"data.nodes.home.nodes.kitchen.items", "query":"{{id}}==='sink'||{{id}}==='oven'" }`;

// SetData -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SetData$(data_ref);
function SetData$(x){ x=ParseJSON$(x);  let u=x.url; let o=x.object; let p=x.path; let q=x.query;  let i=x.id; let t=x.type; let a=x.action; 
// URL ---------------------------------------------------------------------------------------------
if( HasValue$(u) && !HasValue$(x.data) ){ x.function='SetData$';  Fetch$(x);  return x };  delete x.function;
// Object ------------------------------------------------------------------------------------------
if( HasValue$(o) ){ let od;  if( !HasValue$(x.data) ){ x.data=ParseJSON$(eval(`${o}`)); od=structuredClone(x.data) };  x.object_data=od };  
// Path --------------------------------------------------------------------------------------------
if( HasValue$(p) ){ let pd;  if( HasValue$(x.object_data) ){ pd=structuredClone(x.object_data) }  else{ pd=structuredClone(x.data) };  let pa=p.split('.');  for( let pai of pa ){ pd=pd[pai] };  x.path_data=pd };
// Query -------------------------------------------------------------------------------------------
if( HasValue$(q) && ( HasValue$(x.path_data) || HasValue$(x.data) ) ){ let qd;  if( HasValue$(x.path_data) ){ qd=structuredClone(x.path_data) } else{ qd=structuredClone(x.data) };  let qpka=q.match(/\{\{.+?\}\}/g);  qpka=RemoveArrayDuplicates$(qpka);
  for( let [ik,iv] of Object.entries(qd) ){ let iq=q;
    for( let qpki in qpka ){
      for( let [pk,pv] of Object.entries(iv) ){ let qpk=`\{\{${pk}\}\}`; if(qpka[qpki]===qpk){ iq=iq.replaceAll( qpk, typeof pv==='string'?`'${pv}'`:pv ) } }/*-for props*/
      if( Evaluate$(iq)===false ){ delete qd[ik] }
    }/*-for q keys*/
  }/*-for items*/
  x.query_data=qd };

// UseData -----------------------------------------------------------------------------------------
console.log(x);
//UseData$(x)
}/*-SetData$*/  //let item_prm=prms.get('item');  item_path = (item_prm!=null) ? item_prm : item_path;

//function UseData$(x){ x=ParseJSON$(x);  /* SetTree$();  SetPath$();  SetList$();  SetContent$(); */  }


// Interface =========================================================================================================================================================================================

// Tree ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function AddTreeNodeHTML$(n){ let ns=n.nodes;  let h='';  if(IsNotNull$(n)){ return h }


`nodes: {`




return h;
}



// path to nodes
function SetTree$(data_obj){ let tree_pars_html='';  let tree_items_html='';   //  [ path/parent > selected + siblings > children ]   // for (const [key, val] of Object.entries(obj)) { }

for(const x of it_par_is){ let it_x=items$[x];  tree_pars_html=`${tree_pars_html}<button tree_item_parent tree_item onclick="SetData$('${it_x[it_id_i]}')"><x tree_icon>${it_x[it_icon_i]}</x tree_icon><x tree_name>${it_x[it_name_i]}</x tree_name></button>` } /*-for x parents*/

for(const x of it_sib_is){ let it_x=items$[x]; 
  let tree_it_cur=(it_i===it_x[it_i_i])?'tree_it_cur':''; 
  let tree_it_top=(it_x[it_par_i]==='')?'tree_it_top':''; 
  tree_items_html=`${tree_items_html}<button tree_item_sibling ${tree_it_top} ${tree_it_cur} tree_item onclick="SetData$('${it_x[it_id_i]}')"><x tree_icon>${it_x[it_icon_i]}</x tree_icon><x tree_name>${it_x[it_name_i]}</x tree_name></button>`;
  if(it_i===it_x[it_i_i]){
    for(const y of it_chi_is){ let it_y=items$[y];  tree_items_html=`${tree_items_html}<button tree_item_child tree_item onclick="SetData$('${it_y[it_id_i]}')"><x tree_icon>${it_y[it_icon_i]}</x tree_icon><x tree_name>${it_y[it_name_i]}</x tree_name></button>` } /*-for y childs*/
  } /*-if*/
} /*-for x siblings*/

let tree_html=`<nav tree_nav><x tree_bar>
<button tree_bar_button title="Up to Top Level" onclick="SetData$('${items$[0][it_id_i]}')">⏫️</button>
<button tree_bar_button title="Up One Level" onclick="SetData$('${it_par}')">🔼</button>
<button tree_bar_button title="Tree View" onclick="SetData$('${it_par}')">↘️</button>
<button tree_bar_button title="List View" onclick="SetData$('${it_par}')">⬇️</button>

</x tree_bar><x tree_items>${tree_pars_html}${tree_items_html}</x tree_items></nav tree_nav>`;  

SetHTML$('replace-inner', '#layout_tree', tree_html);

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
if(head.querySelector('#apps_tree_style')===null){ SetStyleInternal$(css, 'apps_tree_style') };

} /*-SetTree$*/

// Path ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetPath$(){ let path_pars_html='';  let path_items_html='';  let path_sep_html=`<x path_sep>🞂</x path_sep>`;
for(const x of it_par_is){ let it_x=items$[x];  path_pars_html=`${path_pars_html}<button path_item_parent path_item onclick="SetData$('${it_x[it_id_i]}')"><x path_icon>${it_x[it_icon_i]}</x path_icon><x path_name>${it_x[it_name_i]}</x path_name></button>${path_sep_html}` } /*-for x parents*/
path_items_html=`<button path_item_current path_item><x path_icon>${it_icon}</x path_icon><x path_name>${it_name}</x path_name></button>`;
let path_html=`<nav path_nav><x path_items>${path_pars_html}${path_items_html}</x path_items></nav path_nav>`;  
SetHTML$('replace-inner', '#layout_path', `${path_html}`);

let css=`
[path_nav] { display: flex;  flex-flow: row wrap;  background-color: #202020;  border-bottom: 1px solid #808080; width: 100%; }
[path_items] { display: flex;  flex-flow: row nowrap;  justify-content: center; }
[path_item] { display: flex;  flex-flow: row nowrap;  padding: .5em 1em .5em 1em;  font-size: 1em; }
[path_item]:hover { background-color: #303030; }
[path_icon] { margin-right: .5em; }
[path_sep] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  user-select: none;  padding: 0 .5em 0 .5em;  color: #808080; }
`;
if(head.querySelector('#apps_path_style')===null){ SetStyleInternal$(css, 'apps_path_style') };

} /*-SetPath$*/


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetList$(list_items, list_wrap_html, list_item_html, list_container_id, list_css){  let h=``;  let list_props=list_items[0];  list_items.shift();
for(const [i,x] of list_items.entries()){ let hi=list_item_html;  for(const [j,y] of list_props.entries()){ hi=hi.replace('%{'+y+'}', x[j]) } /*-for j*/  h=h+hi } /*-for i*/
h=list_wrap_html.replace('%{}', h);
SetHTML$('replace-inner','#'+list_container_id, h);
let list_style_id='app_'+list_container_id+'_style';  if(head.querySelector('#'+list_style_id)===null){ SetStyleInternal$(list_css, list_style_id) };
} /*-SetList$*/

// let list_wrap_html=`<div>Items</div><div>%{}</div>`;
// let list_item_html=`<div><span>%{name}</span></div>`;
// let list_container_id='layout_list';
// let list_css=``;


// Content -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetContent$(cont){ SetHTML$('replace-inner', '#layout_cont', `${cont}`) }


// Layout --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetLayout$(){ 

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
`;  SetHTML$('add',lay_html,'body','end');

let lay_css=` 
#layout_page { display: flex;  flex-flow: column nowrap;  justify-content: center;  width: 100%; }
  #layout_header, #layout_middle, #layout_footer { }
  #layout_middle { display: flex;  flex-flow: row nowrap; }
    #layout_left, #layout_center, #layout_right { }   #layout_left>#layout_tree { }
    #layout_center { display: flex;  flex-flow: column nowrap;  flex-basis: 100%; }
      #layout_top, #layout_main, #layout_bottom { }   #layout_top>#layout_path { }
      #layout_main { }   #layout_cont { padding: 1em; }
`;  SetStyleInternal$(lay_css,'apps_layout_style');

} /*-SetLayout$*/

// Functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SetIconCharacter$('🧮');  SetTitleText$('Data');  //SetLayout$();


/* NOTES =============================================================================================================================================================================================

> Data Reference
  - Query:  js-boolean-expression    !!( ( name=='Bob' && age>=18) || /US/g.test(address) && isEmployed==true )
     - Group:  ( )  //  Join:  And( && ) , Or( || )  //  Condition:  Property + Operator + Value  //  Operators:  Any( ===  !==  ??-nullish)  ,  String( /rex/.test(str) )  ,  Number( >  <  >=  <= )  ,  Array ( a.includes(s), a.some/every(f) )  //  Datatypes:  String, Number, Boolean, Null, Undefined  //  String Formats( '$$bool:true', bool, css, date, html, id, js, json, null, num, qry, ref, regx, str, url )


Tree/Nodes/Path > List/Items > Item-Props/Cont [ name:value ]  ,  type determines target/content  ,  add|replace items of same type  ,  object_ids:(replace - with __ and . with $$)

UI/Page/View
  Container - parent for component
    Component - premade|custom   (apps.component.items)
      Wrap - functionality for items | NoItems
        Items/List
          GroupWrap > Items
          Separator
          Item/Content - template+props


Path: Type_RootId/Type_AncestorId/Type_ParentId/Type_ThisId


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

====================================================================================================================================================================================================*/
