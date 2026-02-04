// ITEMS =================================================================================================================================================================================

let items=[
/*Name	Menu	Domain	Path	Search	Icon	*/
[`New Tab`,	`?`,	``,	`window.open()`,	``,	`earth.google.com`,	],
[`DuckDuckGo`,	`.`,	`duckduckgo.com`,	``,	`{dom}/?q={qry}`,	``,	],
[`YouTube`,	`+`,	`www.youtube.com`,	``,	``,	``,	],
[`New`,	`-`,	`www.youtube.com`,	`feed/subscriptions`,	``,	``,	],
[`Watch`,	`-`,	`www.youtube.com`,	`playlist?list=WL`,	``,	``,	],
[`Lists`,	`-`,	`www.youtube.com`,	`feed/playlists`,	``,	``,	],
[`Channels`,	`-`,	`www.youtube.com`,	`feed/channels`,	``,	``,	],
[`Search`,	`=`,	`www.youtube.com`,	``,	`{dom}/results?search_query={qry}`,	``,	],
[`DailyMail`,	`.`,	`www.dailymail.co.uk`,	`ushome/index.html`,	`{dgs}{dom}`,	``,	],
[`Wikipedia`,	`.`,	`en.wikipedia.org`,	``,	`{dgs}{dom}/wiki`,	``,	],
[`Weather`,	`.`,	`www.accuweather.com`,	`en/us/johnson-city/37604/weather-forecast/331088`,	``,	``,	],
[`Amazon`,	`.`,	`www.amazon.com`,	`hz/wishlist/ls/`,	`{dom}/s?k={qry}`,	``,	],
[`CNBC`,	`.`,	`www.cnbc.com`,	`#~~`,	`{dgs}{dom}`,	``,	],
[`TradingView`,	`.`,	`www.tradingview.com`,	`chart/4uKzkaDw/`,	``,	``,	],
[`M1 Finance`,	`.`,	`dashboard.m1.com`,	`d/home`,	``,	``,	],
[`Fidelity`,	`.`,	`digital.fidelity.com`,	`ftgw/digital/portfolio/positions`,	``,	``,	],
[`42 Macro`,	`.`,	`app.42macro.com`,	`signals`,	``,	``,	],
[`StockAnalysis`,	`.`,	`stockanalysis.com`,	``,	`{dom}/etf/{qry}`,	``,	],
[`PortfolioVis`,	`.`,	`www.portfoliovisualizer.com`,	``,	`{dom}/backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&rebalanceType=1{qry}`,	``,	],
[`Rumble`,	`.`,	`rumble.com`,	`subscriptions`,	`{dom}/search/all?q={qry}`,	``,	],
[`Odysee`,	`.`,	`odysee.com`,	`$/playlists`,	`{dom}/$/search?q={qry}`,	``,	],
[`Feedly`,	`.`,	`feedly.com`,	``,	``,	``,	],
[`ProtonMail`,	`.`,	`mail.proton.me`,	``,	``,	``,	],
[`StackOverflow`,	`.`,	`stackoverflow.com`,	``,	`{dgs}{dom}/questions`,	``,	],
[`Mozilla`,	`.`,	`developer.mozilla.org`,	``,	`{dgs}{dom}/en-US/docs`,	``,	],
[`Calculator`,	`.`,	`webvia.github.io`,	`apps/app.html?app=calc`,	``,	`www.calculator.net`,	],
[`Calendar`,	`.`,	`calendar.google.com`,	`calendar/u/0/r`,	``,	``,	],
];

// HTML ==================================================================================================================================================================================

function Items(){ let h=``;  for(const x of items){ let n=x[0]/*name*/; let m=x[1]/*menu*/; let d=x[2]/*domain*/; let p=x[3]/*path*/; let s=x[4].replace('{dom}',d).replace('{dgs}','duckduckgo.com/?q={qry}+site:')/*search*/;  let i=x[5]/*icon*/;  let ico=`<img ico src="https://external-content.duckduckgo.com/ip3/${i!==''?i:d}.ico">`;
  if(m==='?'){ h=`${h}<button item onclick="Evaluate$('${p}')">${ico}<x>${n}</x></button item>`;  continue }
  if(m==='+'){ h=`${h}<button item onclick="OpenMenu$()">${ico}<x>${n} ▾</x></button item><dialog menu onclick="CloseMenu$()">`;  continue }
  if(/\.|\-|\=/.test(m)){ h=`${h}<button item onclick="Go('${d}','${p}','${s}')" title="${d}/${p}">${ico}<x>${n}</x></button item>${(m==='=')?`</dialog menu>`:``}`;  continue }
}/*-for*/  return h }/*-Items*/

function HTML(){ let h=`<x content><x top><x time id="time"></x time><form method="dialog" onsubmit="Go('duckduckgo.com','','duckduckgo.com/?q={qry}')"><input query id="query" type="search" enterkeyhint="search" placeholder="search" autocapitalize="off"/></form><x date id="date"></x date></x top><x items>${Items()}</x items></x content>`;
  SetHTML$( { action:'add', content1:h, content2:body, position:'end' } ) }  HTML();

// CSS ===================================================================================================================================================================================

function CSS(){ let css=` 
[content] { display: flex;  flex-flow: column nowrap;  justify-content: center;  margin: .5em 2em 0 2em }
  [items] { display: flex;  flex-flow: row wrap;  justify-content: left;  padding: 1em }
    [item] { display: flex;  flex-flow: row nowrap;  align-items: center;  width: 8em;  padding: .5em 1em .5em 1em;  font-size: 1.5em;  border-radius: .33em; }  [item]:hover { background-color: #23036A;  color: #DBB2FF;  outline: 1px solid #DBB2FF; }
      [ico] { width: 1em;  height: 1em;  margin-right: .5em }
  [top] { display: grid;  grid-template-columns: 1fr auto 1fr;  padding: 1em 0 1em 0; }
    [time],[date] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center;  color: #DBB2FF;  user-select: none; }
      [time] { font-size: 2.7em; }  [date] { font-size: 2.3em; }
    [query] { width: 30em;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .33em;  border: none;  outline: 1px solid #DBB2FF; background-color: #212121;  color: #F8F8F8; }   [query]:hover, [query]:focus { outline: 2px solid #DBB2FF; }
  [menu] { flex-flow: column nowrap;  outline: 1px solid #DBB2FF;  border-radius: .33em; }
`;  SetStyleInternal$(css) }  CSS();

// FUNC ==================================================================================================================================================================================

let qi=body.querySelector('#query');  qi.addEventListener('input', Key);  let recall='';  SetIconCharacter$('⭐️');  SetTitleText$('Home');  

function Key(){ let ev=event;  let k=ev.data;  if(!['?','=','!'].includes(k)){return};  ev.preventDefault();  if(k===''){return}
/* ? recall */  else if(k==='?'){ qi.value=recall;  qi.select() }
/* = calc   */  else if(k==='='){ let v=qi.value.replace('=','');  let c=Evaluate$(v);  qi.value=`${v} = ${c}` }
/* ! clear  */  else if(k==='!'){ qi.value='';  qi.select() }
}/*-Key*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Go(d,p,s){ let qv=qi.value;  recall=qv;  qi.value='';  if(qv===null||qv===''){ win.open(`https://${d}/${p}`);  return };  if(s===''){return};  let u=``;  
  if( d==='www.portfoliovisualizer.com' ){ let px=qv.split(' ');  if(px.length>3){return};  let sn=0;  let an=0;  
    for( let i=0; i<px.length; i++ ){ let pi=px[i];  an=an+1;
      if(pi.includes('/')){ let py=pi.split('/');  for( let j=0; j<py.length; j++ ){ let pj=py[j].split('-');  sn=sn+1;
        u=`${u}&symbol${sn}=${pj[0].toUpperCase()}&allocation${sn}_${an}=${pj[1]}`;
      }}/*-j*/
      else{ sn=sn+1;  u=`${u}&symbol${sn}=${pi.toUpperCase()}&allocation${sn}_${an}=100` }/*-not j*/
    }/*-i*/
  qv=u; }/*-pv*/
  win.open(`https://${s}`.replace('{qry}',qv.replace(' ','+')));
}/*-Go*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let time_el=body.querySelector('#time'); setInterval(Time_,20000); Time_(); function Time_(){ time_el.textContent=new Intl.DateTimeFormat(lang,{hour:'numeric',minute:'2-digit'}).format(new Date()).split(' ')[0] }

let date_el=body.querySelector('#date'); setInterval(Date_,600000); Date_(); function Date_(){ date_el.textContent=new Intl.DateTimeFormat(lang,{weekday:'short',month:'short',day:'numeric'}).format(new Date()) }

/* NOTES =================================================================================================================================================================================

> DateTime (broken) :  function AddDateTime$(x){ let f=x.format;  let e=body.querySelector(x.element);  let i=x.interval;  setInterval( function(){ e.textContent=new Intl.DateTimeFormat(lang,f).format(new Date()) } , i ); }/-AddDateTime/   AddDateTime$( [ { format:{ hour:'numeric', minute:'2-digit' }, element:'#time', interval:30000 } , { format:{ weekday:'short', month:'short', day:'numeric' }, element:'#date', interval:600000 }  ] );

========================================================================================================================================================================================*/