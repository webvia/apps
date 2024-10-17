SetIconCharacter('🏠');  SetTitleText('Home');

let html=`

<d id="wrap">
	<d id="cont">
		<d id="box">
			<form method="dialog" onsubmit="Go(dg1+qx+dg2)"><input id="input"/></form>
		</d "box">
		<d id="links">
			<d onclick="Go(dg1+qx+dg2)"><img src="img/dg256.png"><t>DuckDuckGo</t></d>
			<d onclick="Go(dg1+qx+dgwp+dg2)"><img src="img/wp48.png"><t>Wikipedia</t></d>
			<d onclick="Go(yt+qx)"><img src="img/yt48.png"><t>YouTube</t></d>
			<d onclick="Go(az+qx)"><img src="img/az190.png"><t>Amazon</t></d>
			<d onclick="Go(sa+qx)"><img src="img/sa32.png"><t>StockAnalysis</t></d>
			<d onclick="PV()"><img src="img/pv48.png"><t>PortfolioVisualizer</t></d>
			<d onclick="Go(dg1+qx+dgso+dg2)"><img src="img/so158.png"><t>StackOverflow</t></d>
		</d "links">
	</d "cont">
</d "wrap">

`;  ModifyContent('add',html,'body','end');

// ===================================================================================================================================================================================================

let css=`

body { background-color: #121212;  color: #F8F8F8; }  d { display: block; }
#wrap { display: flex;  justify-content: center; }
	#cont { width: 33.33vw; }
		#box { padding: 2em 0 1.5em 0; }
			#input { width: 96%;  margin: 0;  padding: .5em .5em .5em .5em;  font-size: 1.25em; font-family: inherit;  border-radius: .25em;  border: none;  outline: 1px solid #DBB2FF; background-color: #23036A;  color: #F8F8F8;  }
			#input:hover, #input:focus { outline: 2px solid #DBB2FF; }
		#links { font-size: 1.5em; user-select: none;  border-radius: .25em;  outline: 1px solid #DBB2FF; }
			#links:hover { outline: 2px solid #DBB2FF; }
			#links d { display: flex;  flex-direction: row;  flex-wrap: nowrap;  align-items: center;  padding: .25em .5em .25em .5em;  }
			#links d:hover { background-color: #23036A;  color: #DBB2FF;  cursor: pointer;  outline: 2px solid #DBB2FF;  border-radius: .25em; }
			#links img { width: 1em;  height: 1em; }
			#links t { padding-left: .75em; }

`;  AddStyleInternal(css);

// ===================================================================================================================================================================================================

let qi=body.querySelector('#input');

let qx=`{q}`;

let dg1=`https://duckduckgo.com/?q=`;  let dg2=`&kl=us-en&kp=-2&kz=-1&kav=1&kn=1&kd=-1&kg=g&kae=d&kw=s&k1=-1`;

let dgwp=`+site:en.wikipedia.org/wiki`;
let dgso=`+site:stackoverflow.com/questions`;

let yt=`https://www.youtube.com/results?search_query=`;
let sa=`https://stockanalysis.com/etf/`;
let az=`https://www.amazon.com/s?k=`;

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Go(u){ if(u==null){return}; let q=qi.value; if(q==null||q==''){return}; q.replace(' ','+').toLowerCase(); u=u.replace('{q}',q); win.open(u); Reset() }


function PV(){ let q=qi.value;  if(q==null||q==''){return};  q=q.toUpperCase().split(' ');  let qa1=''; let qa2=''; let qa3=''; let qs1=''; let qs2=''; let qs3='';  if(q.length>0){ qa1='100'; qs1=q[0] }; if(q.length>1){ qa2='100'; qs2=q[1] }; if(q.length>2){ qa3='100'; qs3=q[2] }; win.open(`https://www.portfoliovisualizer.com/backtest-portfolio?s=y&startYear=&endYear=&includeYTD=true&allocation1_1=${qa1}&allocation2_2=${qa2}&allocation3_3=${qa3}&symbol1=${qs1}&symbol2=${qs2}&symbol3=${qs3}`); Reset() }


function Reset(){ qi.value=''; qi.blur(); }


win.addEventListener('focus',OnWinFocus);  function OnWinFocus(){ qi.blur() };
win.addEventListener('blur',OnWinBlur);  function OnWinBlur(){ qi.blur() };


/* Notes =============================================================================================================================================================================================



====================================================================================================================================================================================================*/
