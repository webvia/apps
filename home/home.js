// DATA ==============================================================================================================================================================================================
let dg=`kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`;

let link_list=[
/*Name	Menu	 Domain	 Path	AltIcon	*/
[`DuckDuckGo`,	``,	`duckduckgo.com`,	`?${dg}`,	``,	],
[`YouTube`,	`+`,	`www.youtube.com`,	``,	``,	],
[`New`,	`-`,	`www.youtube.com`,	`feed/subscriptions`,	``,	],
[`Watch`,	`-`,	`www.youtube.com`,	`playlist?list=WL`,	``,	],
[`Lists`,	`=`,	`www.youtube.com`,	`feed/playlists`,	``,	],
[`Rumble`,	``,	`rumble.com`,	`subscriptions`,	``,	],
[`Odysee`,	``,	`odysee.com`,	`$/following`,	``,	],
[`DailyMail`,	``,	`www.dailymail.co.uk`,	`ushome/index.html`,	``,	],
[`Feedly`,	``,	`feedly.com`,	``,	``,	],
[`CNBC`,	``,	`www.cnbc.com`,	`#~~`,	``,	],
[`ZeroHedge`,	``,	`www.zerohedge.com`,	`markets#~~`,	``,	],
[`TradingView`,	``,	`www.tradingview.com`,	`chart/4uKzkaDw/`,	``,	],
[`M1 Finance`,	``,	`dashboard.m1.com`,	``,	``,	],
[`Weather`,	``,	`www.accuweather.com`,	`en/us/johnson-city/37604/weather-forecast/331088`,	``,	],
[`Amazon`,	``,	`www.amazon.com`,	`hz/wishlist/ls/`,	``,	],
[`ProtonMail`,	``,	`mail.proton.me`,	``,	``,	],
];


let search_list=[
[`DuckDuckGo`,	``,	`duckduckgo.com`,	`?q={q}&${dg}`,	``,	],
[`Wikipedia`,	``,	`duckduckgo.com`,	`?q={q}+site:en.wikipedia.org/wiki&${dg}`,	`en.wikipedia.org`,	],
[`YouTube`,	``,	`www.youtube.com`,	`results?search_query={q}`,	``,	],
[`Amazon`,	``,	`www.amazon.com`,	`s?k={q}`,	``,	],
[`StockAnalysis`,	``,	`stockanalysis.com`,	`etf/{q}`,	``,	],
[`PortfolioVis`,	``,	`www.portfoliovisualizer.com`,	`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true{q}`,	``,	],
[`StackOverflow`,	``,	`duckduckgo.com`,	`?q={q}+site:stackoverflow.com/questions&${dg}`,	`stackoverflow.com`,	],
[`DailyMail`,	``,	`duckduckgo.com`,	`?q={q}+site:www.dailymail.co.uk&${dg}`,	`www.dailymail.co.uk`,	],
];

// HTML ==============================================================================================================================================================================================

function List(list){ let h=``;  for(const x of list){ let n=x[0]/*name*/; let m=x[1]/*menu*/; let d=x[2]/*domain*/; let p=x[3]/*path*/; let a=x[4]/*alticon*/; 
  /*item-go:*/ if(m===''){ h=`${h}<button litem onclick="Go('https://${d}/${p}')" title="${d}/${p}"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!=='')?a:d}.ico"><x>${n}</x></button litem>`;  continue }
  /*menu-open:*/ if(m==='+'){ h=`${h}<button litem onclick="OpenMenu()"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!=='')?a:d}.ico"><x>${n} ▾</x></button litem><dialog menu onclick="CloseMenu()">`;  continue }
  /*menu-item-go:*/ if(m==='-'||m==='='){ h=`${h}<button litem onclick="Go('https://${d}/${p}')" title="${d}/${p}"><img icon src="https://external-content.duckduckgo.com/ip3/${(a!=='')?a:d}.ico"><x>${n}</x></button litem>${(m==='=')?`</dialog menu>`:``}`;  continue }  } /*-for*/  return h } /*-Items*/

function HTML(){ let h=`<x content><x list link_list><button litem onclick="window.open()" title="NewTab"><img icon src="https://external-content.duckduckgo.com/ip3/earth.google.com.ico"><x>NewTab</x></button litem>${List(link_list)}</x link_list><x middle><x time id="time"></x time><form method="dialog" onsubmit="Go('https://duckduckgo.com/?q={q}&${dg}')"><input query id="query" type="text" placeholder="search"/></form><x end></x end></x middle><x list search_list>${List(search_list)}</x search_list></x content>`;  ModifyContent('add',h,'body','end') }  HTML();

// CSS ===============================================================================================================================================================================================

function CSS(){ let css=` 
[content] { display: flex;  flex-flow: column nowrap;  justify-content: center;  margin: .5em 2em 0 2em }
  [list] { display: flex;  flex-flow: row wrap;  justify-content: left;  padding: 1em }
    [litem] { display: flex;  flex-flow: row nowrap;  align-items: center;  width: 8em;  padding: .5em 1em .5em 1em;  font-size: 1.5em;  border-radius: .33em; }  [litem]:hover { background-color: #23036A;  color: #DBB2FF;  outline: 1px solid #DBB2FF; }
      [icon] { width: 1em;  height: 1em;  margin-right: .5em }
  [middle] { display: grid;  grid-template-columns: 1fr auto 1fr;  padding: 3em 0 .5em 0;  border-top: 2px solid #DBB2FF; }
    [time] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  font-size: 2.75em;  color: #DBB2FF;  user-select: none; }
    [query] { width: 30em;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .33em;  border: none;  outline: 1px solid #DBB2FF; background-color: #212121;  color: #F8F8F8; }   [query]:hover, [query]:focus { outline: 2px solid #DBB2FF; }
  [menu] { flex-flow: column nowrap;  outline: 1px solid #DBB2FF;  border-radius: .33em; }
`;  AddStyleInternal(css) }  CSS();

// FUNC ==============================================================================================================================================================================================

SetIconCharacter('⭐️');  SetTitleText('Home');  let qi=body.querySelector('#query');  qi.addEventListener('focus', Focus);  qi.addEventListener('keydown', KeyDown);  qi.addEventListener('input', Input);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Go(u){ if(u===null){return};
  if(!u.includes('{')){ win.open(u); return }; let qv=qi.value;  if(qv===null||qv===''){return};  qv.replace(' ','+').toLowerCase();  
  if(/www\.portfoliovisualizer\.com/.test(u)){ let qu=``;  let qs=qv.split(' ');  if(qs.length>0){ qu=qu+`&symbol1=${qs[0]}&allocation1_1=100` };  if(qs.length>1){ qu=qu+`&symbol2=${qs[1]}&allocation2_2=100` };  if(qs.length>2){ qu=qu+`&symbol3=${qs[2]}&allocation3_3=100` };  qv=qu; }
  u=u.replace('{q}',qv);  win.open(u)  }

function KeyDown(){ let k=event.key;
  /*tab*/   if(k==='Tab'){ event.preventDefault();  qi.setRangeText('\t',this.selectionStart,this.selectionEnd,'end') }
  /*calc*/  else if(k==='='){ event.preventDefault();  Calc() }
  /*clear*/ else if(k==='Delete'){ event.preventDefault();  Clear() }  }

function Input(){ qi.value=qi.value.toLowerCase() }
function Focus(){ qi.focus();  qi.select() }
function Calc(){ let v=qi.value;  let c=eval(v);  qi.value=`${v} = ${c}` }
function Clear(){ qi.value='';  Focus() }

let time=body.querySelector('#time'); setInterval(Time,10000); Time(); function Time(){ time.textContent=new Intl.DateTimeFormat(lang,{hour:'numeric',minute:'2-digit'}).format(new Date()).split(' ')[0] }

/* NOTES =============================================================================================================================================================================================


====================================================================================================================================================================================================*/
