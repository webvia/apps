// DATA ==============================================================================================================================================================================================
let dg=`kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`;

let links=[
[`DuckDuckGo`,	``,	`duckduckgo.com`,	`?${dg}`,	``	],
[`YouTube`,	`+`,	`www.youtube.com`,	``,	``	],
[`New`,	`-`,	`www.youtube.com`,	`feed/subscriptions`,	``	],
[`Watch`,	`-`,	`www.youtube.com`,	`playlist?list=WL`,	``	],
[`Lists`,	`=`,	`www.youtube.com`,	`feed/playlists`,	``	],
[`Rumble`,	``,	`rumble.com`,	`subscriptions`,	``	],
[`Odysee`,	``,	`odysee.com`,	`$/following`,	``	],
[`DailyMail`,	``,	`www.dailymail.co.uk`,	`ushome/index.html`,	``	],
[`Feedly`,	``,	`feedly.com`,	``,	``	],
[`CNBC`,	``,	`www.cnbc.com`,	`#~~`,	``	],
[`ZeroHedge`,	``,	`www.zerohedge.com`,	`markets#~~`,	``	],
[`TradingView`,	``,	`www.tradingview.com`,	`chart/4uKzkaDw/`,	``	],
[`M1 Finance`,	``,	`dashboard.m1.com`,	``,	``	],
[`Weather`,	``,	`weather.com`,	`weather/tenday/l/f9eb3032c181663e18886051520a802768705b1d5a5027452b85c95a97985bb2`,	``	],
[`Amazon`,	``,	`www.amazon.com`,	`hz/wishlist/ls/`,	``	],
[`Proton`,	``,	`mail.proton.me`,	``,	``	]
];

let searches=[
[`DuckDuckGo`,	``,	`duckduckgo.com`,	`?q={q}&${dg}`,	``	],
[`Wikipedia`,	``,	`duckduckgo.com`,	`?q={q}+site:en.wikipedia.org/wiki&${dg}`,	`en.wikipedia.org`	],
[`YouTube`,	``,	`www.youtube.com`,	`results?search_query={q}`,	``	],
[`Amazon`,	``,	`www.amazon.com`,	`s?k={q}`,	``	],
[`StockAnalysis`,	``,	`stockanalysis.com`,	`etf/{q}`,	``	],
[`PortfolioVis`,	``,	`www.portfoliovisualizer.com`,	`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true{q}`,	``	],
[`StackOverflow`,	``,	`duckduckgo.com`,	`?q={q}+site:stackoverflow.com/questions&${dg}`,	`stackoverflow.com`	],
[`DailyMail`,	``,	`duckduckgo.com`,	`?q={q}+site:www.dailymail.co.uk&${dg}`,	`www.dailymail.co.uk`	]
];

// HTML ==============================================================================================================================================================================================

function HTML(){ let h=`<x content><x items link_items>${Items(links)}</x link_items><x query_wrap><form method="dialog" onsubmit="Go('https://duckduckgo.com/?q={q}&${dg}')"><input query_input id="query_input" type="text" placeholder="search"/></form></x query_wrap><x items search_items>${Items(searches)}</x search_items></x content>`;  ModifyContent('add',h,'body','end') }  HTML();


function Items(items){ let h=``;  for(let i of items){ let n=i[0]/*name*/; let m=i[1]/*menu*/; let d=i[2]/*domain*/; let p=i[3]/*path*/; let a=i[4]/*alticon*/; 
  /*item:*/ if(m==''){ h=`${h}<button item onclick="Go('https://${d}/${p}')" title="${d}/${p}"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!='')?a:d}.ico"><x>${n}</x></button item>`;  continue }
  /*itemmenu:*/ if(m=='+'){ h=`${h}<button item onclick="OpenMenu()"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!='')?a:d}.ico"><x>${n} ▾</x></button item><dialog menu onclick="CloseMenu()">`;  continue }
  /*menuitem:*/ if(m=='-'||m=='='){ h=`${h}<button item onclick="Go('https://${d}/${p}')" title="${d}/${p}"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!='')?a:d}.ico"><x>${n}</x></button item>${(m=='=')?`</dialog menu>`:``}`;  continue }
} /*-for*/  return h } /*-Items*/


// CSS ===============================================================================================================================================================================================

function CSS(){ let css=` body { margin-top: 0vh; } button { all: unset; }
[content] { display: flex;  flex-flow: column wrap;  justify-content: center;  margin: .5em 2em 0 2em }
  [items] { display: flex;  flex-flow: row wrap;  justify-content: left;  padding: 1em }
    [item] { display: flex;  flex-flow: row nowrap;  align-items: center;  width: 8em;  padding: .5em 1em .5em 1em;  font-size: 1.5em;  user-select: none;  cursor: pointer;  border-radius: .33em; }
    [item]:hover { background-color: #23036A;  color: #DBB2FF;  outline: 1px solid #DBB2FF; }
      [icon] { width: 1em;  height: 1em;  margin-right: .5em }
  [link_items] { border-bottom: 2px solid #DBB2FF;  margin: 0 0 3em 0; }
  [query_wrap] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center; }
    [query_input] { width: 30em;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .33em;  border: none;  outline: 1px solid #DBB2FF; background-color: #212121;  color: #F8F8F8; }   [queryinput]:hover, [queryinput]:focus { outline: 2px solid #DBB2FF; }
  [search_items] { margin-top: .5em; }
  [menu] { flex-flow: column nowrap;  outline: 1px solid #DBB2FF;  border-radius: .33em; }
`;  AddStyleInternal(css) }  CSS();

// FUNC ==============================================================================================================================================================================================

SetIconCharacter('⭐️');  SetTitleText('Home');  let qi=body.querySelector('#query_input');  qi.addEventListener('focus', Focus);  qi.addEventListener('keydown', KeyDown);  qi.addEventListener('input', Input);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Go(u){ if(u==null){return};  if(!u.includes('{')){ win.open(u); return }; let q=qi.value;  if(q==null||q==''){return};  q.replace(' ','+').toLowerCase();  
  if(/www\.portfoliovisualizer\.com/.test(u)){ let qu=``;  let qs=q.split(' ');  if(qs.length>0){ qu=qu+`&symbol1=${qs[0]}&allocation1_1=100` };  if(qs.length>1){ qu=qu+`&symbol2=${qs[1]}&allocation2_2=100` };  if(qs.length>2){ qu=qu+`&symbol3=${qs[2]}&allocation3_3=100` };  q=qu; }
  u=u.replace('{q}',q);  win.open(u);
} /*-Go*/


function KeyDown(){ let k=event.key;
  /* insert tab */  if(k=='Tab'){ event.preventDefault();  qi.setRangeText('\t',this.selectionStart,this.selectionEnd,'end') }
  /* run calc   */  else if(k=='='){ event.preventDefault();  Calc() }
  /* clear inp  */  else if(k=='Delete'){ event.preventDefault();  Reset() }
}

function Input(){ event.target.value = event.target.value.toLowerCase() }

function Focus(){ qi.focus();  qi.select() }

function Calc(){ let v=qi.value;  let c=eval(v);  qi.value=`${v} = ${c}` }

function Reset(){ qi.value='';  Focus() }

/* NOTES =============================================================================================================================================================================================

menu.style.marginTop=event.pageY+'px';  menu.style.marginLeft=event.pageX+'px';  


// margin: auto;
// width: fit-content;
// height: fit-content;
// max-width: calc(100% - 2em - 6px);
// max-height: calc(100% - 2em - 6px);



[menu] {
  padding: 0;
  outline: 1px solid #DBB2FF;
  border-radius: .33em;
}
dialog:modal {
  overlay: auto !important;
}
dialog:-internal-dialog-in-top-layer {
  position: fixed;
  inset-block-start: 0px;
  inset-block-end: 0px;
?  max-width: calc(100% - 2em - 6px);
?  max-height: calc(100% - 2em - 6px);
  user-select: text;
  visibility: visible;
  overflow: auto;
}
dialog[open] {
  display: block;
}
dialog {
  -display: none;
  -position: absolute;
  inset-inline-start: 0px;
  inset-inline-end: 0px;
?  width: fit-content;
?  height: fit-content;
  background-color: canvas;
  color: canvastext;
*  margin: auto;
  border-width: initial;
  border-style: solid;
  border-color: initial;
  border-image: initial;
  -padding: 1em;
}
dialog:-internal-dialog-in-top-layer::backdrop {
  position: fixed;
  inset: 0px;
  background: rgba(0, 0, 0, 0.1);
}


====================================================================================================================================================================================================*/
