SetIconCharacter('🏠');  SetTitleText('Home');

let css=`
body { background-color: #121212;  color: #F8F8F8; }  d { display: block; }
#wrap { display: flex;  justify-content: center; }
	#cont { width: 33.33vw; }
		#box { padding: 2em 0 1.5em 0; }
			#input { width: 96%;  margin: 0;  padding: .5em .5em .5em .5em;  font-size: 1.25em; font-family: inherit;  border-radius: .25em;  border: none;  outline: 1px solid #DBB2FF; background-color: #23036A;  color: #F8F8F8;  }
			#input:hover, #input:focus { outline: 2px solid #DBB2FF; }
		#srchs, #links { font-size: 1.5em; user-select: none;  border-radius: .25em; }  #srchs { outline: 1px solid #DBB2FF; }
			#srchs:hover { outline: 2px solid #DBB2FF; }
			#srchs d, #links d { display: flex;  flex-direction: row;  flex-wrap: nowrap;  align-items: center;  padding: .25em .5em .25em .5em;  }
			#srchs d:hover, #links d:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 2px solid #DBB2FF;  border-radius: .25em; }
			#srchs img, #links img { width: 1em;  height: 1em; }
			#srchs t, #links t { padding-left: .75em; }
`;  AddStyleInternal(css);

// ===================================================================================================================================================================================================

let ss=[
[`DuckDuckGo`,`duckduckgo.com`,`?q={q}&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`],
[`Wikipedia`,`duckduckgo.com`,`?q={q}+site:en.wikipedia.org/wiki&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`],
[`YouTube`,`www.youtube.com`,`results?search_query={q}`],
[`Amazon`,`www.amazon.com`,`s?k={q}`],
[`StockAnalysis`,`stockanalysis.com`,`etf/{q}`],
[`PortfolioVisualizer`,`www.portfoliovisualizer.com`,`backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&allocation1_1={qa1}&allocation2_2={qa2}&allocation3_3={qa3}&symbol1={qs1}&symbol2={qs2}&symbol3={qs3}`],
[`StackOverflow`,`duckduckgo.com`,`?q={q}+site:stackoverflow.com/questions&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`]
];
let sh='';
for(let x of ss){ sh=sh+`<d onclick="Search('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${x[1]}.ico"><t>${x[0]}</t></d>` }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let ls=[
[`YT New`,`www.youtube.com`,`feed/subscriptions`],
[`YT Later`,`www.youtube.com`,`playlist?list=WL`],
[`YT Lists`,`www.youtube.com`,`feed/playlists`],
[`Rumble`,`rumble.com`,`subscriptions`],
[`DuckDuckGo`,`duckduckgo.com`,`https://duckduckgo.com/?kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=p&kae=d&kw=s&k1=-1`],
[`DailyMail`,`www.dailymail.co.uk`,`ushome/index.html`],
[`Feedly`,`feedly.com`,`i/collection/content/user/d1063c98-1dba-4ed5-bd64-401aef96eb8d/category/global.all`],
[`CNBC`,`www.cnbc.com`,``],
[`TradingView`,`www.tradingview.com`,`chart/4uKzkaDw/`],
[`M1`,`dashboard.m1.com`,`d/invest/portfolio`],
[`Weather`,`weather.com`,`weather/tenday/l/f9eb3032c181663e18886051520a802768705b1d5a5027452b85c95a97985bb2`],
[`Amazon`,`www.amazon.com`,`hz/wishlist/ls/20Q8SU4QH5BZX`],
[`ZeroHedge`,`www.zerohedge.com`,`markets`],
[`Proton`,`mail.proton.me`,``]
];
let lh='';
for(let x of ls){ lh=lh+`<d onclick="Link('https://${x[1]}/${x[2]}')"><img src="https://external-content.duckduckgo.com/ip3/${x[1]}.ico"><t>${x[0]}</t></d>` }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let html=`
<d id="wrap">
	<d id="cont">
		<d id="box">
			<form method="dialog" onsubmit="Search(dg+qx)"><input id="input"/></form>
		</d "box">
		<d id="srchs">{sh}</d "srchs">
		<d id="links">{lh}</d "links">
	</d "cont">
</d "wrap">
`;  

html=html.replace('{sh}',sh);  html=html.replace('{lh}',lh);

ModifyContent('add',html,'body','end');

// ===================================================================================================================================================================================================

let qi=body.querySelector('#input');


function Search(u){ if(u==null){return}; let q=qi.value; if(q==null||q==''){return}; q.replace(' ','+').toLowerCase(); 

if(/www\.portfoliovisualizer\.com/.test(u)){ q=q.toUpperCase().split(' ');  let qa1=''; let qa2=''; let qa3=''; let qs1=''; let qs2=''; let qs3='';  if(q.length>0){ qa1='100'; qs1=q[0] }; if(q.length>1){ qa2='100'; qs2=q[1] }; if(q.length>2){ qa3='100'; qs3=q[2] }; 
} /*-if portfoliovisualizer*/

else { u=u.replace('{q}',q); win.open(u) }

} /*-Search*/

function Focus() { qi.focus();  qi.select() };  win.addEventListener('focus', Focus);  qi.addEventListener('focus', Focus);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Link(u){ win.open(u) }

/* Notes =============================================================================================================================================================================================



====================================================================================================================================================================================================*/
