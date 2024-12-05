// DATA ==============================================================================================================================================================================================

let so=[
[`DuckDuckGo`,`duckduckgo.com`,`?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`],
[`Wikipedia`,`duckduckgo.com`,`?q={q}+site:en.wikipedia.org/wiki&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`en.wikipedia.org`],
[`YouTube`,`www.youtube.com`,`results?search_query={q}`],
[`Amazon`,`www.amazon.com`,`s?k={q}`],
[`StockAnalysis`,`stockanalysis.com`,`etf/{q}`],
[`PortfolioVis`,`www.portfoliovisualizer.com`,`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&allocation1_1={qa1}&allocation2_2={qa2}&allocation3_3={qa3}&symbol1={qs1}&symbol2={qs2}&symbol3={qs3}`],
[`StackOverflow`,`duckduckgo.com`,`?q={q}+site:stackoverflow.com/questions&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`stackoverflow.com`]
];

let lo=[
[`DuckDuckGo`,`duckduckgo.com`,`https://duckduckgo.com/?kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`],
[`New`,`www.youtube.com`,`feed/subscriptions`],
[`Watch`,`www.youtube.com`,`playlist?list=WL`],
[`Lists`,`www.youtube.com`,`feed/playlists`],
[`Rumble`,`rumble.com`,`subscriptions`],
[`Odysee`,`odysee.com`,`$/following`],
[`DailyMail`,`www.dailymail.co.uk`,`ushome/index.html`],
[`Feedly`,`feedly.com`,`i/collection/content/user/d1063c98-1dba-4ed5-bd64-401aef96eb8d/category/global.all`],
[`CNBC`,`www.cnbc.com`,``],
[`ZeroHedge`,`www.zerohedge.com`,`markets`],
[`TradingView`,`www.tradingview.com`,`chart/4uKzkaDw/`],
[`M1 Invest`,`dashboard.m1.com`,`d/invest/portfolio`],
[`Weather`,`weather.com`,`weather/tenday/l/f9eb3032c181663e18886051520a802768705b1d5a5027452b85c95a97985bb2`],
[`Amazon`,`www.amazon.com`,`hz/wishlist/ls/20Q8SU4QH5BZX`],
[`Proton`,`mail.proton.me`,``]
];

// HTML ==============================================================================================================================================================================================

let h=`
<d id="cent">
	<d id="cont">
		<d id="box"><form method="dialog" onsubmit="Srch('https://duckduckgo.com/?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1')"><input id="input"/></form></d "box">
		<d id="opts">
			<d id="srch" class="opts">`;

for(let x of so){ let iu=(x[3]!=null)?x[3]:x[1];  h=h+`<d class="op" onclick="Srch('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${iu}.ico"><t>${x[0]}</t></d>` }

h=h+`
			</d "srch">
			<d id="sep"></d "sep">
			<d id="link" class="opts">`;

for(let x of lo){ let iu=(x[3]!=null)?x[3]:x[1];  h=h+`<d class="op" onclick="Link('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${iu}.ico"><t>${x[0]}</t></d>` }

h=h+`
			</d "link">
		</d "opts">
	</d "cont">
</d "cent">`;

SetIconCharacter('🚀');  SetTitleText('Go');  ModifyContent('add',h,'body','end');  let qi=body.querySelector('#input');

// CSS ===============================================================================================================================================================================================
// def: row nowrap
let css=`
body { background-color: #121212;  color: #F8F8F8; }  d { display: block; }
#cent { display: flex;  flex-flow: row nowrap;  justify-content: center;  height: 100vh; }
	#cont {  }
		#box { display: flex;  flex-flow: row nowrap;  justify-content: center;  align-items: center; }
			#input { width: 33.33vw;  margin: 1.5em 0 1.5em 0;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .333em;  border: none;  outline: 1px solid #DBB2FF; background-color: #23036A;  color: #F8F8F8; }   #input:hover, #input:focus { outline: 2px solid #DBB2FF; }
		#opts { display: flex;  flex-flow: column nowrap; }
			.opts { display: flex;  flex-flow: column wrap; }  #srch { height: 20vh; }  #link { height: 30vh; }
				.op { display: flex;  flex-flow: row nowrap;  align-items: center;  padding: .5em 1em .5em 1em;  font-size: 1.5em;  user-select: none;  border-left: 2px solid #DBB2FF; }
				.op:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 1px solid #DBB2FF;  border-radius: .333em; }
					.op img { width: 1em;  height: 1em; margin-right: .5em }
#sep { border-bottom: 2px solid #DBB2FF;  margin: 1.5em 0 1.5em 0; }

`;  AddStyleInternal(css);

// FUNC ==============================================================================================================================================================================================

function Srch(u){ if(u==null){return}; let q=qi.value; if(q==null||q==''){return}; q.replace(' ','+').toLowerCase();  

if(/www\.portfoliovisualizer\.com/.test(u)){ q=q.toUpperCase().split(' ');  let qa1=''; let qa2=''; let qa3=''; let qs1=''; let qs2=''; let qs3='';  if(q.length>0){ qa1='100'; qs1=q[0] }; if(q.length>1){ qa2='100'; qs2=q[1] }; if(q.length>2){ qa3='100'; qs3=q[2] }; 

} /*-if portfoliovisualizer*/  else { u=u.replace('{q}',q); win.open(u) }
} /*-Search*/

function Link(u){ win.open(u) }

function Focus() { qi.focus();  qi.select() };  qi.addEventListener('focus', Focus);  //win.addEventListener('focus', Focus);

/* NOTES =============================================================================================================================================================================================


====================================================================================================================================================================================================*/
