// DATA ==============================================================================================================================================================================================

let items=[
/*Name	Menu	Domain	Path	Search	*/
[`DuckDuckGo`,	``,	`duckduckgo.com`,	``,	`{dom}/?q={qry}`,	],
[`YouTube`,	`+`,	`www.youtube.com`,	``,	``,	],
[`New`,	`-`,	`www.youtube.com`,	`feed/subscriptions`,	``,	],
[`Watch`,	`-`,	`www.youtube.com`,	`playlist?list=WL`,	``,	],
[`Lists`,	`-`,	`www.youtube.com`,	`feed/playlists`,	``,	],
[`Channels`,	`-`,	`www.youtube.com`,	`feed/channels`,	``,	],
[`Search`,	`=`,	`www.youtube.com`,	``,	`{dom}/results?search_query={qry}`,	],
[`DailyMail`,	``,	`www.dailymail.co.uk`,	`ushome/index.html`,	`{dgs}{dom}`,	],
[`Wikipedia`,	``,	`en.wikipedia.org`,	``,	`{dgs}{dom}/wiki`,	],
[`TradingView`,	``,	`www.tradingview.com`,	`chart/4uKzkaDw/`,	``,	],
[`Weather`,	``,	`www.accuweather.com`,	`en/us/johnson-city/37604/weather-forecast/331088`,	``,	],
[`Rumble`,	``,	`rumble.com`,	`subscriptions`,	`{dom}/search/all?q={qry}`,	],
[`Odysee`,	``,	`odysee.com`,	`$/playlists`,	`{dom}/$/search?q={qry}`,	],
[`Amazon`,	``,	`www.amazon.com`,	`hz/wishlist/ls/`,	`{dom}/s?k={qry}`,	],
[`Feedly`,	``,	`feedly.com`,	``,	``,	],
[`CNBC`,	``,	`www.cnbc.com`,	`#~~`,	`{dgs}{dom}`,	],
[`ZeroHedge`,	``,	`www.zerohedge.com`,	`markets#~~`,	`{dgs}{dom}`,	],
[`M1 Finance`,	``,	`dashboard.m1.com`,	`d/home`,	``,	],
[`42 Macro`,	``,	`app.42macro.com`,	`dashboard`,	``,	],
[`ProtonMail`,	``,	`mail.proton.me`,	``,	``,	],
[`StockAnalysis`,	``,	`stockanalysis.com`,	``,	`{dom}/etf/{qry}`,	],
[`PortfolioVis`,	``,	`www.portfoliovisualizer.com`,	``,	`{dom}/backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true{qry}`,	],
[`StackOverflow`,	``,	`stackoverflow.com`,	``,	`{dgs}{dom}/questions`,	],
[`Mozilla`,	``,	`developer.mozilla.org`,	``,	`{dgs}{dom}/en-US/docs`,	],
];

// HTML ==============================================================================================================================================================================================

function Items(){ let h=``;  for(const x of items){ let n=x[0]/*name*/; let m=x[1]/*menu*/; let d=x[2]/*domain*/; let p=x[3]/*path*/; let s=x[4].replace('{dom}',d).replace('{dgs}','duckduckgo.com/?q={qry}+site:')/*search*/;   let ico=`<img icon src="https://external-content.duckduckgo.com/ip3/${d}.ico">`;
/*item-go:*/      if(m===''){ h=`${h}<button item onclick="Go('${d}','${p}','${s}')" title="${d}/${p}">${ico}<x>${n}</x></button item>`;  continue }
/*menu-open:*/    if(m==='+'){ h=`${h}<button item onclick="OpenMenu$()">${ico}<x>${n} ▾</x></button item><dialog menu onclick="CloseMenu$()">`;  continue }
/*menu-item-go:*/ if(m==='-'||m==='='){ h=`${h}<button item onclick="Go('${d}','${p}','${s}')" title="${d}/${p}">${ico}<x>${n}</x></button item>${(m==='=')?`</dialog menu>`:``}`;  continue }
}/*-for*/  return h }/*-List*/

function HTML(){ let h=`
<x content>
  <x top><x time id="time"></x time><form method="dialog" onsubmit="Go('duckduckgo.com','','duckduckgo.com/?q={qry}')"><input query id="query" type="search" enterkeyhint="search" placeholder="search"/></form><x date id="date"></x date></x top>
  <x items><button item onclick="window.open()" title="NewTab"><img icon src="https://external-content.duckduckgo.com/ip3/earth.google.com.ico"><x>NewTab</x></button item>${Items()}</x items>
</x content>
`;  SetHTML$('add',h,'body','end') }  HTML();

// CSS ===============================================================================================================================================================================================

function CSS(){ let css=` 
[content] { display: flex;  flex-flow: column nowrap;  justify-content: center;  margin: .5em 2em 0 2em }
  [items] { display: flex;  flex-flow: row wrap;  justify-content: left;  padding: 1em }
    [item] { display: flex;  flex-flow: row nowrap;  align-items: center;  width: 8em;  padding: .5em 1em .5em 1em;  font-size: 1.5rem;  border-radius: .33em; }  [item]:hover { background-color: #23036A;  color: #DBB2FF;  outline: 1px solid #DBB2FF; }
      [icon] { width: 1em;  height: 1em;  margin-right: .5em }
  [top] { display: grid;  grid-template-columns: 1fr auto 1fr;  padding: 1em 0 1em 0; }
    [time],[date] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  color: #DBB2FF;  user-select: none; }
      [time] { font-size: 2.7rem; }  [date] { font-size: 2.3rem; }
    [query] { width: 30em;  padding: .5em;  font-size: 1.25rem;  font-family: inherit;  border-radius: .33em;  border: none;  outline: 1px solid #DBB2FF; background-color: #212121;  color: #F8F8F8; }   [query]:hover, [query]:focus { outline: 2px solid #DBB2FF; }
  [menu] { flex-flow: column nowrap;  outline: 1px solid #DBB2FF;  border-radius: .33em; }
`;  SetStyleInternal$(css) }  CSS();

// FUNC ==============================================================================================================================================================================================

let qi=body.querySelector('#query');  let recall='';  SetIconCharacter$('⭐️');  SetTitleText$('Home');  

function Go(d,p,s){ let qv=qi.value.toLowerCase();  recall=qv;  qi.value='';  if(qv===null||qv===''){ let link=`https://${d}/${p}`;  win.open(link);  return };  if(s===''){ return };
  if(d==='www.portfoliovisualizer.com'){ let qu=``;  let qs=qv.split(' ');  if(qs.length>0){ qu=qu+`&symbol1=${qs[0]}&allocation1_1=100` };  if(qs.length>1){ qu=qu+`&symbol2=${qs[1]}&allocation2_2=100` };  if(qs.length>2){ qu=qu+`&symbol3=${qs[2]}&allocation3_3=100` };  qv=qu; }
  qv.replace(' ','+').toLowerCase();  s=`https://${s}`.replace('{qry}',qv);  win.open(s); 
}/*-Go*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if(agent_is_linux$){ qi.addEventListener('input', Key) } else{ qi.addEventListener('keydown', Key) };

function Key(ev){ let k=null;  if(agent_is_linux$){ k=ev.data } else{ k=ev.key }    // let k=qi.value.substr(qi.selectionStart-1,1);  

               if(!HasValue$(k)){return}  
/*recal*/ else if(k==='?'){ ev.preventDefault();  qi.value=recall;  qi.select() }
/*calc*/  else if(k==='='){ ev.preventDefault();  let v=qi.value.replace('=','');  let c=eval(v);  qi.value=`${v} = ${c}` }
/*tab*/   else if(k==='Tab'){ ev.preventDefault();  qi.setRangeText('\t',this.selectionStart,this.selectionEnd,'end') }
/*clear*/ else if(k==='Delete'){ ev.preventDefault();  qi.value='';  qi.select() }
}/*-Key*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let time_el=body.querySelector('#time'); setInterval(Time_,20000); Time_(); function Time_(){ time_el.textContent=new Intl.DateTimeFormat(lang,{hour:'numeric',minute:'2-digit'}).format(new Date()).split(' ')[0] }

let date_el=body.querySelector('#date'); setInterval(Date_,600000); Date_(); function Date_(){ date_el.textContent=new Intl.DateTimeFormat(lang,{weekday:'short',month:'short',day:'numeric'}).format(new Date()) }

/* NOTES =============================================================================================================================================================================================


  function Key(ev){ let k=null;  if(ev.keyCode!==229){ k=ev.key } else{ k=qi.value.substr(qi.selectionStart-1,1) };  


function AddDateTime$(x){ 
let f=x.format;  
let e=body.querySelector(x.element);  
let i=x.interval;  
setInterval( function(){ e.textContent=new Intl.DateTimeFormat(lang,f).format(new Date()) } , i ); 
}/-AddDateTime/
AddDateTime$( [ { format:{ hour:'numeric', minute:'2-digit' }, element:'#time', interval:30000 } , { format:{ weekday:'short', month:'short', day:'numeric' }, element:'#date', interval:600000 }  ] );



https://www.portfoliovisualizer.com/backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&symbol1=voo&allocation1_1=100

====================================================================================================================================================================================================*/
