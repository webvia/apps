
// Tree ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let item_kitchen_html=`Kitchen.. <button onclick="SetItem('bedrooms')">to Bedrooms</button>`;

$tree_items=[
[`id`,	`parent`,	`name`,	`icon`,	`type`,	`content`,	],
[`home`,	``,	`Home`,	`🏠`,	`page`,	`Home..`,	],
[`bedrooms`,	`home`,	`Bedrooms`,	`🌙`,	`folder`,	`Bedrooms..`,	],
[`master`,	`bedrooms`,	`Master`,	`🛌`,	`folder`,	`Master..`,	],
[`bath`,	`master`,	`Bath`,	`🛌`,	`folder`,	`Bath..`,	],
[`closet`,	`master`,	`Closet`,	`🛌`,	`folder`,	`Closet..`,	],
[`guest`,	`bedrooms`,	`Guest`,	`🛌`,	`page`,	`Guest..`,	],
[`kitchen`,	`home`,	`Kitchen`,	`🍴`,	`page`,	`${item_kitchen_html}`,	],
];


// List ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let list_items=[
[`id`,	`parent`,	`name`,	`icon`,	`type`,	`content`,	],
[`home`,	``,	`Home`,	`🏠`,	`page`,	`Home..`,	],
[`bedrooms`,	`home`,	`Bedrooms`,	`🌙`,	`folder`,	`Bedrooms..`,	],
[`master`,	`bedrooms`,	`Master`,	`🛌`,	`folder`,	`Master..`,	],
[`bath`,	`master`,	`Bath`,	`🛌`,	`folder`,	`Bath..`,	],
[`closet`,	`master`,	`Closet`,	`🛌`,	`folder`,	`Closet..`,	],
[`guest`,	`bedrooms`,	`Guest`,	`🛌`,	`page`,	`Guest..`,	],
[`kitchen`,	`home`,	`Kitchen`,	`🍴`,	`page`,	`Kitchen..`,	],
];
let list_wrap_html=`<div>Items</div><div>%{}</div>`;
let list_item_html=`<div><span>%{name}</span></div>`;
let list_container_id='layout_list';
let list_css=``;


// Functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SetIconCharacter('🌳');  SetTitleText('Tree');  
SetLayout();
SetTreeItems();
SetTree();
SetPath();
SetList(list_items, list_wrap_html, list_item_html, list_container_id, list_css);


/* NOTES =============================================================================================================================================================================================


====================================================================================================================================================================================================*/
