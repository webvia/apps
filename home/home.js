// DATA ==============================================================================================================================================================================================

let links=[
[`DuckDuckGo`,`duckduckgo.com`,`https://duckduckgo.com/?kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`],
[`New`,`www.youtube.com`,`feed/subscriptions`],
[`Watch`,`www.youtube.com`,`playlist?list=WL`],
[`Lists`,`www.youtube.com`,`feed/playlists`],
[`Rumble`,`rumble.com`,`subscriptions`],
[`Odysee`,`odysee.com`,`$/following`],
[`DailyMail`,`www.dailymail.co.uk`,`ushome/index.html`],
[`Feedly`,`feedly.com`,``],
[`CNBC`,`www.cnbc.com`,`#~~`],
[`ZeroHedge`,`www.zerohedge.com`,`markets#~~`],
[`TradingView`,`www.tradingview.com`,`chart/4uKzkaDw/`],
[`M1 Invest`,`dashboard.m1.com`,``],
[`Weather`,`weather.com`,`weather/tenday/l/f9eb3032c181663e18886051520a802768705b1d5a5027452b85c95a97985bb2`],
[`Amazon`,`www.amazon.com`,`hz/wishlist/ls/20Q8SU4QH5BZX`],
[`Proton`,`mail.proton.me`,``],
];

let searches=[
[`DuckDuckGo`,`duckduckgo.com`,`?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`],
[`Wikipedia`,`duckduckgo.com`,`?q={q}+site:en.wikipedia.org/wiki&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`en.wikipedia.org`],
[`YouTube`,`www.youtube.com`,`results?search_query={q}`],
[`Amazon`,`www.amazon.com`,`s?k={q}`],
[`StockAnalysis`,`stockanalysis.com`,`etf/{q}`],
[`PortfolioVis`,`www.portfoliovisualizer.com`,`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&allocation1_1={qa1}&allocation2_2={qa2}&allocation3_3={qa3}&symbol1={qs1}&symbol2={qs2}&symbol3={qs3}`],
[`StackOverflow`,`duckduckgo.com`,`?q={q}+site:stackoverflow.com/questions&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`stackoverflow.com`],
];

// HTML ==============================================================================================================================================================================================

let h=``;
h=h+`<x center><x content><x items links>`;  for(let i of links){ Items(i) }
h=h+`</x links><x query><form method="dialog" onsubmit="Search('https://duckduckgo.com/?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1')"><input input id="input"/></form></x query><x items searches>`;  for(let i of searches){ Items(i) }
h=h+`</x searches></x content></x center>`;  ModifyContent('add',h,'body','end');

function Items(i) { let func=(i[2].includes('{'))?'Search':'Link';  let img=(i[3]!=null)?i[3]:i[1];  h=h+`<x item onclick="${func}('https://${i[1]}/${i[2]}')" title="${i[1]}/${i[2]}"><img icon src="https://external-content.duckduckgo.com/ip3/${img}.ico"><x>${i[0]}</x></x>`
} /*-Items*/

// CSS ===============================================================================================================================================================================================
//def: row nowrap
let css=`body { background-color: #121212;  color: #F8F8F8; }
[center] { display: flex;  flex-flow: row nowrap;  justify-content: center; }
[content] { display: flex;  flex-flow: column nowrap;  justify-content: center;  max-width: 75vw;  max-height: 80vh }
	[items] { display: flex;  flex-flow: row wrap;  justify-content: left; }
		[item] { display: flex;  flex-flow: row nowrap;  align-items: center;  min-width: 8em;  padding: .5em 1em .5em 1em;  font-size: 1.5em;  user-select: none; }
		[item]:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 1px solid #DBB2FF;  border-radius: .333em; }
			[icon] { width: 1em;  height: 1em; margin-right: .5em }
	[query] { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center; }
		[input] { width: 33.33vw;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .33em;  border: none;  outline: 1px solid #DBB2FF; background-color: #212121;  color: #F8F8F8; }   [input]:hover, [input]:focus { outline: 2px solid #DBB2FF; }
	[links] { padding-top: 1em;  padding-bottom: 2em;  border-bottom: 2px solid #DBB2FF;  margin-bottom: 3em; }
	[searches] { padding-top: 1em;  margin-top: .5em; }
`;  AddStyleInternal(css);

// FUNC ==============================================================================================================================================================================================

SetIconCharacter('⭐️');  SetTitleText('Home');  let qi=body.querySelector('#input');  qi.addEventListener('focus', Focus);  qi.addEventListener('keydown', KeyDown);

function Search(u){ this.blur(); if(u==null){return}; let q=qi.value; if(q==null||q==''){return}; q.replace(' ','+').toLowerCase();  

if(/www\.portfoliovisualizer\.com/.test(u)){ q=q.toUpperCase().split(' ');  let qa1=''; let qa2=''; let qa3=''; let qs1=''; let qs2=''; let qs3='';  if(q.length>0){ qa1='100'; qs1=q[0] }; if(q.length>1){ qa2='100'; qs2=q[1] }; if(q.length>2){ qa3='100'; qs3=q[2] }; 

} /*-if portfoliovisualizer*/  else { u=u.replace('{q}',q); win.open(u) }
} /*-Search*/

function Link(u){ this.blur(); win.open(u); }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Focus() { qi.focus();  qi.select() };  //win.addEventListener('focus', Focus);

function KeyDown(ev){ let key=ev.key;
  if(key=='Tab'){ ev.preventDefault(); qi.setRangeText('\t',this.selectionStart,this.selectionEnd,'end') }  /* insert tab */
  else if(key=='='){ ev.preventDefault(); Calc() }  /* run calc */
  else if(key=='Delete'){ ev.preventDefault(); Reset() }  /* clear data */
}

function Calc(){ let v=qi.value; let c=eval(v); qi.value=`${v} = ${c}`;  }

function Reset(){ qi.value='';  Focus() }

/* NOTES =============================================================================================================================================================================================

====================================================================================================================================================================================================*/
