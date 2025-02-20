SetIconCharacter('🌳');  SetTitleText('Tree');  

// ITEMS ==============================================================================================================================================================================================

let item_horse_html=`Kitchen.. <button onclick="SetItem('bedrooms')">to Bedrooms</button>`;

$nav_items=[
[`id`,	`parent`,	`name`,	`icon`,	`type`,	`content`,	],
[`home`,	``,	`Home`,	`🏠`,	`page`,	`Home..`,	],
[`bedrooms`,	`home`,	`Bedrooms`,	`🌙`,	`folder`,	`Bedrooms..`,	],
[`master`,	`bedrooms`,	`Master`,	`🛌`,	`folder`,	`Master..`,	],
[`bath`,	`master`,	`Bath`,	`🛌`,	`folder`,	`Bath..`,	],
[`closet`,	`master`,	`Closet`,	`🛌`,	`folder`,	`Closet..`,	],
[`guest`,	`bedrooms`,	`Guest`,	`🛌`,	`page`,	`Guest..`,	],
[`kitchen`,	`home`,	`Kitchen`,	`🍴`,	`page`,	`${item_horse_html}`,	],
];


AddLayout();
AddItems();
AddTree();
AddPath();


/* NOTES =============================================================================================================================================================================================


nav_items > list_items > cont_items


content - query/fetch/variable


direction-row|col
wrap|nowrap
scroll|noscroll
template-elems/layout
align-

====================================================================================================================================================================================================*/
