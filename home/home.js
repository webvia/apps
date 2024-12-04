// DATA ==============================================================================================================================================================================================

let sd=[
[`DuckDuckGo`,`duckduckgo.com`,`?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`],
[`Wikipedia`,`duckduckgo.com`,`?q={q}+site:en.wikipedia.org/wiki&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`en.wikipedia.org`],
[`YouTube`,`www.youtube.com`,`results?search_query={q}`],
[`Amazon`,`www.amazon.com`,`s?k={q}`],
[`StockAnalysis`,`stockanalysis.com`,`etf/{q}`],
[`PortfolioVisualizer`,`www.portfoliovisualizer.com`,`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&allocation1_1={qa1}&allocation2_2={qa2}&allocation3_3={qa3}&symbol1={qs1}&symbol2={qs2}&symbol3={qs3}`],
[`StackOverflow`,`duckduckgo.com`,`?q={q}+site:stackoverflow.com/questions&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`,`stackoverflow.com`]
];

let ld=[
[`New`,`www.youtube.com`,`feed/subscriptions`],
[`Watch`,`www.youtube.com`,`playlist?list=WL`],
[`Lists`,`www.youtube.com`,`feed/playlists`],
[`Rumble`,`rumble.com`,`subscriptions`],
[`DuckDuckGo`,`duckduckgo.com`,`https://duckduckgo.com/?kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`],
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

for(let x of sd){ let iu=(x[3]!=null)?x[3]:x[1];  h=h+`<d class="op" onclick="Srch('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${iu}.ico"><t>${x[0]}</t></d>` }

h=h+`
			</d "srch">
			<d id="link" class="opts">`;

for(let x of ld){ let iu=(x[3]!=null)?x[3]:x[1];  h=h+`<d class="op" onclick="Link('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${iu}.ico"><t>${x[0]}</t></d>` }

h=h+`
			</d "link">
		</d "opts">
	</d "cont">
</d "cent">`;

SetIconCharacter('🏠');  SetTitleText('Home');  ModifyContent('add',h,'body','end');  let qi=body.querySelector('#input');

// CSS ===============================================================================================================================================================================================

let css=`
body { background-color: #121212;  color: #F8F8F8; }  d { display: block; }
#cent { display: flex;  flex-direction: row;  flex-wrap: nowrap;  justify-content: center; }
	#cont {  }
		#box { display: flex;  flex-direction: row;  flex-wrap: nowrap;  justify-content: center;  align-items: center; }
			#input { width: 33.33vw;  margin: 2em 0 2em 0;  padding: .5em;  font-size: 1.25em;  font-family: inherit;  border-radius: .333em;  border: none;  outline: 1px solid #DBB2FF; background-color: #23036A;  color: #F8F8F8; }   #input:hover, #input:focus { outline: 2px solid #DBB2FF; }
		#opts {  }
			.opts { display: flex;  flex-direction: column;  flex-wrap: wrap;  row-gap: 1em;  column-gap: 1em; }  #srch { height: 20vh; }  #link { height: 30vh; }
				.op { display: flex;  flex-direction: row;  flex-wrap: nowrap;  align-items: center;  padding: .25em .5em .25em .5em;  font-size: 1.5em;  user-select: none; }
				.op:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 2px solid #DBB2FF;  border-radius: .333em; }
					.op img { width: 1em;  height: 1em; margin-right: .5em }

`;  AddStyleInternal(css);

// FUNC ==============================================================================================================================================================================================

function Srch(u){ if(u==null){return}; let q=qi.value; if(q==null||q==''){return}; q.replace(' ','+').toLowerCase(); 

if(/www\.portfoliovisualizer\.com/.test(u)){ q=q.toUpperCase().split(' ');  let qa1=''; let qa2=''; let qa3=''; let qs1=''; let qs2=''; let qs3='';  if(q.length>0){ qa1='100'; qs1=q[0] }; if(q.length>1){ qa2='100'; qs2=q[1] }; if(q.length>2){ qa3='100'; qs3=q[2] }; 
} /*-if portfoliovisualizer*/

else { u=u.replace('{q}',q); win.open(u) }

} /*-Search*/


function Focus() { qi.focus();  qi.select() };  qi.addEventListener('focus', Focus);  //win.addEventListener('focus', Focus);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Link(u){ win.open(u) }


/* NOTES =============================================================================================================================================================================================

body { background-color: #121212;  color: #F8F8F8; }  d { display: block; }
#wrap { display: flex;  justify-content: center; }
	#cont { width: 33.33vw;  height: 100vh;  display: flex;  flex-direction: column;  flex-wrap: wrap; }  #cont > * { flex: 1 1 1 }
		#box { padding: 2em 0 1.5em 0; }
			#input { width: 96%;  margin: 0;  padding: .5em .5em .5em .5em;  font-size: 1.25em; font-family: inherit;  border-radius: .25em;  border: none;  outline: 1px solid #DBB2FF; background-color: #23036A;  color: #F8F8F8;  }
			#input:hover, #input:focus { outline: 2px solid #DBB2FF; }
		#srchs, #links { font-size: 1.5em; user-select: none;  border-radius: .25em; }  #srchs { outline: 1px solid #DBB2FF;  margin-bottom: 1em; }
			#srchs:hover { outline: 2px solid #DBB2FF; }
			#srchs d, #links d { display: flex;  flex-direction: row;  flex-wrap: nowrap;  align-items: center;  padding: .25em .5em .25em .5em;  }
			#srchs d:hover, #links d:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 2px solid #DBB2FF;  border-radius: .25em; }
			#srchs img, #links img { width: 1em;  height: 1em; }
			#srchs t, #links t { padding-left: .75em; }

====================================================================================================================================================================================================*/
