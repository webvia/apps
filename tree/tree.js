
// Items ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let items$;  let it_id, it_par, it_type, it_name, it_icon, it_cont;  let it_i, it_par_ids, it_sib_ids, it_chi_ids;


function SetItems$(it_id_start){ 

for(const [i,x] of items$.entries()){ let it_id_x=x.id;  let it_par_x=x.parent;  let it_par_is_x=x[it_par_is_i];  let it_sib_is_x=x[it_sib_is_i];  let it_chi_is_x=x[it_chi_is_i];
  for(const [j,y] of items$.entries()){ let it_id_y=y[it_id_i];  let it_par_y=y[it_par_i];  let it_par_is_y=y[it_par_is_i];  if(it_par_x===it_id_y){ it_par_is_x.push(it_par_is_y,j) };  if(it_par_x===it_par_y){ it_sib_is_x.push(j) };  if(it_id_x===it_par_y){ it_chi_is_x.push(j) };
  } /*-for j*/
  x[it_par_is_i]=it_par_is_x.flat(Infinity);
} /*-for i*/

let it_id_prm=prms.get('item');  it_id = (it_id_prm!=null) ? it_id_prm : (it_id_start!=null && it_id_start!='') ? it_id_start : items$[0][it_id_i];

SetItem$(it_id);

} /*-SetItems$*/


function SetItem$(it_id_new){ let it;
for(const [i,x] of items$.entries()){ if(it_id_new===x[it_id_i]){ it=x;  it_i=i;  break } };
it_id=it[it_id_i]; it_par=it[it_par_i]; it_type=it[it_type_i]; it_name=it[it_name_i]; it_icon=it[it_icon_i]; it_cont=it[it_cont_i]; it_par_is=it[it_par_is_i]; it_sib_is=it[it_sib_is_i]; it_chi_is=it[it_chi_is_i]; 
SetTree$(); SetPath$(); SetContent$();
} /*-SetItem$*/


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetList$(list_items, list_wrap_html, list_item_html, list_container_id, list_css){  let h=``;  let list_props=list_items[0];  list_items.shift();
for(const [i,x] of list_items.entries()){ let hi=list_item_html;  for(const [j,y] of list_props.entries()){ hi=hi.replace('%{'+y+'}', x[j]) } /*-for j*/  h=h+hi } /*-for i*/
h=list_wrap_html.replace('%{}', h);
SetHTML$('replace-inner','#'+list_container_id, h);
let list_style_id='app_'+list_container_id+'_style';  if(head.querySelector('#'+list_style_id)===null){ SetStyleInternal$(list_css, list_style_id) };
} /*-SetList$*/


// Tree ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetTree$(){ let tree_pars_html='';  let tree_items_html='';

for(const x of it_par_is){ let it_x=items$[x];  tree_pars_html=`${tree_pars_html}<button tree_item_parent tree_item onclick="SetItem$('${it_x[it_id_i]}')"><x tree_icon>${it_x[it_icon_i]}</x tree_icon><x tree_name>${it_x[it_name_i]}</x tree_name></button>` } /*-for x parents*/

for(const x of it_sib_is){ let it_x=items$[x]; 
  let tree_it_cur=(it_i===it_x[it_i_i])?'tree_it_cur':''; 
  let tree_it_top=(it_x[it_par_i]==='')?'tree_it_top':''; 
  tree_items_html=`${tree_items_html}<button tree_item_sibling ${tree_it_top} ${tree_it_cur} tree_item onclick="SetItem$('${it_x[it_id_i]}')"><x tree_icon>${it_x[it_icon_i]}</x tree_icon><x tree_name>${it_x[it_name_i]}</x tree_name></button>`;
  if(it_i===it_x[it_i_i]){
    for(const y of it_chi_is){ let it_y=items$[y];  tree_items_html=`${tree_items_html}<button tree_item_child tree_item onclick="SetItem$('${it_y[it_id_i]}')"><x tree_icon>${it_y[it_icon_i]}</x tree_icon><x tree_name>${it_y[it_name_i]}</x tree_name></button>` } /*-for y childs*/
  } /*-if*/
} /*-for x siblings*/

let tree_html=`<nav tree_nav><x tree_bar>
<button tree_bar_button title="Up to Top Level" onclick="SetItem$('${items$[0][it_id_i]}')">⏫️</button>
<button tree_bar_button title="Up One Level" onclick="SetItem$('${it_par}')">🔼</button>
<button tree_bar_button title="Tree View" onclick="SetItem$('${it_par}')">↘️</button>
<button tree_bar_button title="List View" onclick="SetItem$('${it_par}')">⬇️</button>

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
for(const x of it_par_is){ let it_x=items$[x];  path_pars_html=`${path_pars_html}<button path_item_parent path_item onclick="SetItem$('${it_x[it_id_i]}')"><x path_icon>${it_x[it_icon_i]}</x path_icon><x path_name>${it_x[it_name_i]}</x path_name></button>${path_sep_html}` } /*-for x parents*/
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


// Content -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetContent$(){ SetHTML$('replace-inner', '#layout_cont', `${it_cont}`) }


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


// Tree ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let item_kitchen_html=`Kitchen.. <button onclick="SetItem$('bedrooms')">to Bedrooms</button>`;

items$=[
{ id:`home`,	parent:``,	name:`Home`,	icon:`🏠`,	type:`page`,	content:`Home..`,	},
{ id:`bedrooms`,	parent:`home`,	name:`Bedrooms`,	icon:`🌙`,	type:`folder`,	content:`Bedrooms..`,	},
{ id:`master`,	parent:`bedrooms`,	name:`Master`,	icon:`🛌`,	type:`folder`,	content:`Master..`,	},
{ id:`bath`,	parent:`master`,	name:`Bath`,	icon:`🛌`,	type:`folder`,	content:`Bath..`,	},
{ id:`closet`,	parent:`master`,	name:`Closet`,	icon:`🛌`,	type:`folder`,	content:`Closet..`,	},
{ id:`guest`,	parent:`bedrooms`,	name:`Guest`,	icon:`🛌`,	type:`page`,	content:`Guest..`,	},
{ id:`kitchen`,	parent:`home`,	name:`Kitchen`,	icon:`🍴`,	type:`page`,	content:`${item_kitchen_html}`,	},
];


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let list_items=[
{ id:`home`,	parent:``,	name:`Home`,	icon:`🏠`,	type:`page`,	content:`Home..`,	},
{ id:`bedrooms`,	parent:`home`,	name:`Bedrooms`,	icon:`🌙`,	type:`folder`,	content:`Bedrooms..`,	},
{ id:`master`,	parent:`bedrooms`,	name:`Master`,	icon:`🛌`,	type:`folder`,	content:`Master..`,	},
{ id:`bath`,	parent:`master`,	name:`Bath`,	icon:`🛌`,	type:`folder`,	content:`Bath..`,	},
{ id:`closet`,	parent:`master`,	name:`Closet`,	icon:`🛌`,	type:`folder`,	content:`Closet..`,	},
{ id:`guest`,	parent:`bedrooms`,	name:`Guest`,	icon:`🛌`,	type:`page`,	content:`Guest..`,	},
{ id:`kitchen`,	parent:`home`,	name:`Kitchen`,	icon:`🍴`,	type:`page`,	content:`Kitchen`,	},
];

let list_wrap_html=`<div>Items</div><div>%{}</div>`;
let list_item_html=`<div><span>%{name}</span></div>`;
let list_container_id='layout_list';
let list_css=``;


// Functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SetIconCharacter$('🌳');  SetTitleText$('Tree');  

SetLayout$();

SetItems$();
SetTree$();
SetPath$();
SetList$(list_items, list_wrap_html, list_item_html, list_container_id, list_css);


/* NOTES =============================================================================================================================================================================================

Tree/Path > List/Items > Item > Props/Cont [ name:value ]    type determines target/content   add|replace items of same type

Item-Props:  type, id, parent(id), items(query|ref), content(html/text,query|ref), name, icon,  custom...    value-types:  obj,arr , str,num,bool,null , query,ref,url , html,text

let args = { dataset_id: "<dataset_id>", action: "add|delete|replace" };  SetData$( args );  function SetData$( { dataset_id, action } );

let data$ = { <dataset_id>: { nodes$: { <node_id>: { type$:"", id$:"", nodes$:{}, items$:{}, item$:{}, cont$:{} } } } };

let data_prop_val = data$.<dataset_id>.data.<type__id>.<property>;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Control - Data transform/io/mapping

UI/Page/View
  Container - parent for component
    Component - premade|custom   (apps.component.items)
      Wrap - functionality for items | NoItems
        Items/List
          GroupWrap > Items
          Separator
          Item/Content - template+props

====================================================================================================================================================================================================*/
