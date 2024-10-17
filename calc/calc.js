SetTitleText('Calc'); SetIconCharacter('🔢');

/* Style ========================================================================================================================================================================================== */
let css=` /* ch=col_head, rh=row_head, cc=col_calc, rc=row_calc, cv=col_valu */ 
body { margin: 0; padding: 0; background-color: #121212; color: #F8F8F8; font-size: 1.25em; font-family: monospace; }  table { border-collapse: collapse; }  td { padding: .25em 1em .25em 1em }
[pb] { position: fixed; z-index:-1; width: 100vw; height: 100vh; } [pc] { margin: 1em; }
[ch],[rh] { font-weight: bold; }  [cc],[rc] { font-weight: bold; color: #DBB2FF; background-color: #EEEEEE }  [cv] {  }  [v0] { font-weight: bold; color: #DBB2FF; }
[ta] { display: block; width: 99%; height: 4em; font-size: 1em; font-family: monospace; margin-bottom: 1em; padding: .5em; }  [ta]:focus { outline: none; }  [ca] {  }
`;  AddStyleInternal(css);

/* Page =========================================================================================================================================================================================== */
let h=`<div pb></div><div pc><textarea ta autofocus></textarea><div ca></div></div>`;  ModifyContent('add',h,'body','end');  //body.insertAdjacentHTML('beforeend',h);  

let ta=body.querySelector('[ta]');  let ca=body.querySelector('[ca]');  let pb=body.querySelector('[pb]');

function Clip(t){ t=Clean(t);  if(/^[^\d\(\.\-\+]/.test(t)){return};  ta.value=t;  Paste() };  clip.readText().then((t) => ( Clip(t) ))

function Focus(ev) { ta.focus();  ta.select() };  win.addEventListener('focus', Focus);  ta.addEventListener('focus', Focus);  pb.addEventListener('click', Focus);

function Paste(ev){ setTimeout(()=>{ Calc(); Focus(); }, 100) };  ta.addEventListener('paste', Paste);

function KeyDown(ev){ let key=ev.key;
  if(key=='Tab'){ ev.preventDefault(); ta.setRangeText('\t',this.selectionStart,this.selectionEnd,'end'); return };  /* insert tab */
  if(key=='='){ ev.preventDefault(); Focus(); Calc(); return }  /* run calc */
  if(key=='Delete'){ ev.preventDefault(); ta.value=''; ca.innerHTML=''; return }  /* clear data */
};  ta.addEventListener('keydown', KeyDown);

function Clean(t){ t=t.replace(/^[\s]*/,'').replace(/[\s]*$/,'').replace(/[ ]*/g,''); return t }

/* Calc =========================================================================================================================================================================================== */
function Calc(ev) { let d=''; let cols=0; let hc=``; let hr=``; let vals1=[]; let vals2=[]; let calcs1={}; let calcs2={}; 

d=ta.value;  d=Clean(d);  if(d==''){return};  if(/[\n][^\t]/.test(d)){ cols=1 };  if(/[\t]/.test(d)){ cols=2 };

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if(cols==0){ d=d.replace(/[\s]/g,'');  let v0=eval(d);  hc=`<span>${d}</span> = <span v0>${v0}</span>` }   if(cols==1||cols==2){ d=d.replace(/[^\d\.\-\n\t]/g,'');  d=d.split('\n') }

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if(cols==1) { for(let r of d){ let v1=Number(r);  vals1.push(v1); }   calcs1=Calcs(vals1); 

hc=`<table>
<tr><td rh>Tot</td><td cc>${calcs1.tot}</td></tr>
<tr><td rh>Avg</td><td cc>${calcs1.avg}</td></tr>
<tr><td rh>Max</td><td cc>${calcs1.max}</td></tr>
<tr><td rh>Min</td><td cc>${calcs1.min}</td></tr>
<tr><td rh>Dif</td><td cc>${calcs1.dif}</td></tr>
<tr><td rh>Mid</td><td cc>${calcs1.mid}</td></tr>
</table>` } /*-if*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if(cols==2) { for(let r of d){ let v=r.split('\t');  let v1=Number(v[0]);  let v2=Number(v[1]);  vals1.push(v1);  vals2.push(v2);  let pctof=Round((v2/v1)*100);  let pctchg=Round(((v2-v1)/v1)*100);

hr=`${hr}<tr><td rh>&nbsp;</td><td cv>${v1}</td><td cv>${v2}</td><td rc>${pctof}</td><td rc>${pctchg}</td></tr>` } /*-for*/  calcs1=Calcs(vals1);  calcs2=Calcs(vals2); 

hc=`<table>
<tr><td rh>Tot</td><td cc>${calcs1.tot}</td><td cc>${calcs2.tot}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td rh>Avg</td><td cc>${calcs1.avg}</td><td cc>${calcs2.avg}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td rh>Max</td><td cc>${calcs1.max}</td><td cc>${calcs2.max}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td rh>Min</td><td cc>${calcs1.min}</td><td cc>${calcs2.min}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td rh>Dif</td><td cc>${calcs1.dif}</td><td cc>${calcs2.dif}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td rh>Mid</td><td cc>${calcs1.mid}</td><td cc>${calcs2.mid}</td><td ch>% Of</td><td ch>% Chg</td></tr>
${hr}</table>` } /*-if*/

ca.innerHTML='';  ca.insertAdjacentHTML('beforeend',hc) }  /* -Calc */

/* Func =========================================================================================================================================================================================== */

function Calcs(col) { let srt=col.slice(0); srt.sort((a,b) => a-b);  let cnt=col.length;  let tot=col.reduce((a,b) => a+b, 0);  let avg=tot/cnt;  let max=srt[cnt-1];  let min=srt[0];  let dif=max-min;  let mid=(dif/2)+min;  return { cnt:Round(cnt), tot:Round(tot), avg:Round(avg), mid:Round(mid), max:Round(max), min:Round(min), dif:Round(dif) } }  /* end Calcs */

function Round(num) { return Math.round(num*1000)/1000 }  /* https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */

/* Notes =============================================================================================================================================================================================

  1 	   4   
  2  	  5   
  3   	 6   

=================================================================================================================================================================================================== */
