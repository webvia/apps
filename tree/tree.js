SetIconCharacter('🌳');  SetTitleText('Tree');  

// HTML ==============================================================================================================================================================================================

function HTML(){ let body_html=`<div id="page_wrap"><div id="tree_wrap"></div><div id="cont_wrap"></div></div>`;  ModifyContent('add',body_html,'body','end') }  HTML();

// ITEMS ==============================================================================================================================================================================================

let item_horse_html=`Kitchen.. <button onclick="SetItem('bedrooms')">to Bedrooms</button>`;

$items=[
[`id`,	`parent`,	`name`,	`icon`,	`type`,	`content`,	],
[`home`,	``,	`Home`,	`🏠`,	`page`,	`Home..`,	],
[`bedrooms`,	`home`,	`Bedrooms`,	`🌙`,	`folder`,	`Bedrooms..`,	],
[`master`,	`bedrooms`,	`Master`,	`🛌`,	`folder`,	`Master..`,	],
[`bath`,	`master`,	`Bath`,	`🛌`,	`folder`,	`Bath..`,	],
[`closet`,	`master`,	`Closet`,	`🛌`,	`folder`,	`Closet..`,	],
[`guest`,	`bedrooms`,	`Guest`,	`🛌`,	`page`,	`Guest..`,	],
[`kitchen`,	`home`,	`Kitchen`,	`🍴`,	`page`,	`${item_horse_html}`,	],
];

AddItems( { item_id:'home', components:['tree_nav','content'] } );

// CSS ===============================================================================================================================================================================================

function CSS(){ let css=` 
#page_wrap { display: flex;  flex-flow: row wrap; }
#tree_wrap { }
#cont_wrap { padding: 1em; }
`;  AddStyleInternal(css) }  CSS();

/* NOTES =============================================================================================================================================================================================



====================================================================================================================================================================================================*/
