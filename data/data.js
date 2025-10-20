// Data ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let item_kitchen_html=`Kitchen.. <button onclick="SetItem$('bedrooms')">to Bedrooms</button>`;

$.data={
	datasets:{
		'dataset':{
			nodesets:{
				'nodeset':{
					nodes:{
						'home':{ id:`home`, name:`Home`, icon:`🏠`, items:`?`, nodes:{
							'kitchen':{ id:`kitchen`, name:`Kitchen`, icon:`🍴`, items:`?`, nodes:{}, },
							'bedrooms':{ id:`bedrooms`, name:`Bedrooms`, icon:`🌙`, items:`?`, nodes:{
								'guest':{ id:`guest`, name:`Guest`, icon:`🛌`, items:`?`, nodes:{}, },
								'master':{ id:`master`, name:`Master`, icon:`🛌`, items:`?`, nodes:{
									'bath':{ id:`bath`, name:`Bath`, icon:`🛌`, items:`?`, nodes:{}, },
									'closet':{ id:`closet`, name:`Closet`, icon:`🛌`, items:`?`, nodes:{}, },
								}, },
							}, },
						}, },
					},
				},
			},
			itemsets:{
				'itemset':{
					items:{
						'sink':{ id:`sink`, parent:`bath`, name:`Sink`, icon:`🏠`, content:`Sink..`, },
						'shower':{ id:`shower`, parent:`bath`, name:`Shower`, icon:`🌙`, content:`Shower..`, },
						'dresser':{ id:`dresser`, parent:`closet`, name:`Dresser`, icon:`🛌`, content:`Dresser..`, },
						'shelves':{ id:`shelves`, parent:`closet`, name:`Shelves`, icon:`🛌`, content:`Shelves..`, },
					},
				},
			},
		},
	},
};

// Init ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SetIconCharacter$('🧮');  SetTitleText$('Data');  SetLayout$();  

let nodes=$.data.datasets['dataset'].nodesets['nodeset'];  let key_prm=prms.get('key');  SetCont$(key_prm);

// Cont ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetCont$(key_str){ SetURL$( { action:'history.replaceState', url:href, params:[ { key:'key', value:key_str } ] } );  key_prm=prms.get('key');  let tree_html='';

let nks=key_str.split('~~')[0];  let nki=key_str.split('~~')[1];  let nka=nks.split('--');  nka.shift();  let n=nodes;  let current_node={};  let tree_item_type='';

/*current,parents*/
for( let i=0, len=nka.length; i<len; i++ ){ n=n.nodes[nka[i]];  let nkc=`--${nka.slice(0,i).join('--')}`;
  if( i===len-1 ){ current_node=n;
    tree_html=`${tree_html}<button tree_item tree_item_current onclick="SetCont$('${nkc}')"><x tree_icon>${n.icon}</x tree_icon><x tree_name>${n.name}</x tree_name></button>`;
  }
  else{ 
    tree_html=`${tree_html}<button tree_item tree_item_parent onclick="SetCont$('${nkc}')"><x tree_icon>${n.icon}</x tree_icon><x tree_name>${n.name}</x tree_name></button>`;
  } /*-if parent or current*/
}; /*-for parents,current*/

/*children*/
if( HasValue$(current_node.nodes) ){ for( let [key, value] of Object.entries(current_node.nodes) ){ let cn=value;
    tree_html=`${tree_html}<button tree_item tree_item_child onclick="SetCont$('${cn.key}')"><x tree_icon>${cn.icon}</x tree_icon><x tree_name>${cn.name}</x tree_name></button>`;
  }; /*-for children*/
}; /*-if has children*/


/*siblings*/


SetHTML$({ action:'replace-inner', content1:'#layout_tree', content2:tree_html });

return;


tree_html=`<nav tree_nav><x tree_bar>
<button tree_bar_button title="Up to Top Level" onclick="SetCont$('${items$[0][it_id_i]}')">⏫️</button>
<button tree_bar_button title="Up One Level" onclick="SetCont$('${it_par}')">🔼</button>
<button tree_bar_button title="Tree View" onclick="SetCont$('${it_par}')">↘️</button>
<button tree_bar_button title="List View" onclick="SetCont$('${it_par}')">⬇️</button>
</x tree_bar><x tree_items>${tree_html}</x tree_items></nav tree_nav>`;  

SetHTML$({ action:'replace-inner', content1:'#layout_tree', content2:tree_html });


// Path ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let path_pars_html='';  let path_items_html='';  let path_sep_html=`<x path_sep>🞂</x path_sep>`;
for(let x of it_par_is){ let it_x=items$[x];  path_pars_html=`${path_pars_html}<button path_item_parent path_item onclick="SetItem$('${it_x[it_id_i]}')"><x path_icon>${it_x[it_icon_i]}</x path_icon><x path_name>${it_x[it_name_i]}</x path_name></button>${path_sep_html}` } /*-for x parents*/
path_items_html=`<button path_item_current path_item><x path_icon>${it_icon}</x path_icon><x path_name>${it_name}</x path_name></button>`;
let path_html=`<nav path_nav><x path_items>${path_pars_html}${path_items_html}</x path_items></nav path_nav>`;  
SetHTML$({ action:'replace-inner', content1:'#layout_path', content2:`${path_html}` });


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//let list_data=[ { key:`1`, name:`hello` }, { key:`2`, name:`world`}, ];
//let list_item_html=`<div><span>{%name}</span></div>`;
//let list_container='#layout_list';
//let list_css=``;


let h=``;  let list_props=list_items[0];  list_items.shift();
for(let [i,x] of list_items.entries()){ let hi=list_item_html;  for(let [j,y] of list_props.entries()){ hi=hi.replace('%{'+y+'}', x[j]) } /*-for j*/  h=h+hi } /*-for i*/
h=list_wrap_html.replace('%{}', h);
SetHTML$({ action:'replace-inner', content1:'#'+list_container_id, content2:h });
let list_style_id='app_'+list_container_id+'_style';  if(head.querySelector('#'+list_style_id)===null){ SetStyleInternal$(list_css, list_style_id) };


// SetList$(list_items, list_wrap_html, list_item_html, list_container_id, list_css);
//SetHTML$({ action:'replace-inner', content1:list_container, content2:list_item_html, position:'end', data:list_data });


}; /*-SetCont$*/


// Layout --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SetLayout$(){ 

let lay_html=`
<div id="layout_page">
  <header id="layout_header"><div>HEADER</div></header layout_header>
  <div id="layout_middle">
    <div id="layout_left"><div id="layout_tree"></div layout_tree></div layout_left>
    <div id="layout_center">
      <div id="layout_top"><div id="layout_path"></div layout_path></div layout_top>
      <main id="layout_main"><div id="layout_list"></div layout_list><div id="layout_cont">   <button onclick="SetCont$('--home--bedrooms--master--closet~~shelves')">hi</button>    </div layout_cont></main layout_main>
      <div id="layout_bottom"><div>BOTTOM</div></div layout_bottom>
    </div layout_center>
    <aside id="layout_right"><div>RIGHT</div></aside layout_right>
  </div layout_middle>
  <footer id="layout_footer"><div>FOOTER</div></footer layout_header>
</div layout_page>
`;  SetHTML$({ action:'add', content1:lay_html, content2:'body', position:'end' });

let lay_css=` 
#layout_page { display: flex;  flex-flow: column nowrap;  justify-content: center;  width: 100%; }
  #layout_header, #layout_middle, #layout_footer { }
  #layout_middle { display: flex;  flex-flow: row nowrap; }
    #layout_left, #layout_center, #layout_right { }   #layout_left>#layout_tree { }
    #layout_center { display: flex;  flex-flow: column nowrap;  flex-basis: 100%; }
      #layout_top, #layout_main, #layout_bottom { }   #layout_top>#layout_path { }
      #layout_main { }   #layout_cont { padding: 1em; }

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

[path_nav] { display: flex;  flex-flow: row wrap;  background-color: #202020;  border-bottom: 1px solid #808080; width: 100%; }
[path_items] { display: flex;  flex-flow: row nowrap;  justify-content: center; }
[path_item] { display: flex;  flex-flow: row nowrap;  padding: .5em 1em .5em 1em;  font-size: 1em; }
[path_item]:hover { background-color: #303030; }
[path_icon] { margin-right: .5em; }
[path_sep] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  user-select: none;  padding: 0 .5em 0 .5em;  color: #808080; }

`;  SetStyleInternal$(lay_css,'apps_layout_style');

} /*-SetLayout$*/

/* NOTES =============================================================================================================================================================================================

> Structure
    UI/Page/View
      Container - parent for component
        Component - premade|custom   (apps.component.items)
          Wrap - functionality for items | NoItems
            Items/List
              GroupWrap > Items
              Separator
              Item/Content - template+props


> Items:  Tree/Path > List > Item > Props/Cont [ name:value ]    type determines target/content   add|replace items of same type
    Item-Prop:  id, type, parent(id), items(query|ref), content(html/text,query|ref), name, icon,  custom...
      Prop-Types:  string, query, ref


> Data :  let data = new Map( [ [ 'obj~path~parent~id', { parent, id, name, icon, type, content, ... } ] , [ ... ] ] );


> Query:  js-boolean-expression    !!( ( name=='Bob' && age>=18) || /US/g.test(address) && isEmployed==true )
   - Group:  ( )  //  Join:  And( && ) , Or( || )  //  Condition:  Property + Operator + Value  //  Operators:  Any( ===  !==  ??-nullish)  ,  String( /rex/.test(str) )  ,  Number( >  <  >=  <= )  ,  Array ( a.includes(s), a.some/every(f) )  //  Datatypes:  String, Number, Boolean, Null, Undefined  //  String Formats( '$$bool:true', bool, css, date, html, id, js, json, null, num, qry, ref, regx, str, url )


> Path: Type_RootId/Type_AncestorId/Type_ParentId/Type_ThisId

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ref$:{ url,object,path,query,  target(path in $.data),  action(get |add(bef|beg|end|aft) |replace/in |remove/in),  id, type=data }
if no url or object, $.data assumed.  query on set of objects with same parent.  

let data_ref=`{ "url":"http://localhost/apps/github/apps/data/data.json", "path":"dataset_1.(data$.)nodes.home.nodes.kitchen.items", "query":"{{id}}==='sink'||{{id}}==='oven'" }`;
let data_ref=`{ "object":"_.my_data", "path":"data.nodes.home.nodes.kitchen.items", "query":"{{id}}==='sink'||{{id}}==='oven'" }`;

// https://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string


====================================================================================================================================================================================================*/
