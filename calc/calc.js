SetTitleText$('Calc'); SetIconCharacter$('🔢');

let css=` /* ta=text_area, ca=calc_area, ch=col_head, rh=row_head, cc=col_calc, rc=row_calc, cv=col_valu */ 
body { margin: 0; padding: 1.25em; background-color: #121212; color: #F8F8F8; font-size: 1.5em; font-family: monospace; }  table { border-collapse: collapse; }  td { padding: .25em 1em .25em 1em }
[ch],[rh] { font-weight: bold; }  [cc],[rc] { font-weight: bold; color: #DBB2FF; background-color: #EEEEEE }  [cv] {  }  [v0] { font-weight: bold; color: #DBB2FF; }
[ta] { display: block; resize: none; width: 99%; height: 4em; font-size: 1em; font-family: monospace; margin-bottom: 1em; padding: .5em; }  [ta]:focus { outline: none; }  [ca] {  }
`;  SetStyleInternal$(css);

// Page ==================================================================================================================================================================================

let h=`<textarea ta id="ta" autofocus></textarea ta><div ca></div ca>`;  SetHTML$( { action:'add', content1:h, content2:body, position:'end' } );

let ta=body.querySelector('[ta]');  let ca=body.querySelector('[ca]');

// Events ================================================================================================================================================================================

win.addEventListener('focus', FocusEvt);   ta.addEventListener('keydown', KeyDownEvt);   ta.addEventListener('paste', PasteEvt);

// Keyboard ==============================================================================================================================================================================

function KeyDownEvt(ev){ if(ev.altKey||ev.ctrlKey||ev.shiftKey){return};  let keys={ 'Tab':`TabKey`, 'Delete':`DeleteKey`, '=':`EqualsKey` };  let kf=keys[ev.key];  if(kf===undefined){return};  ev.preventDefault();  win[kf]() }

function TabKey(){ Tab() }   function DeleteKey(){ Reset() }   function EqualsKey(){ Calc() }

// Functions =============================================================================================================================================================================

function FocusEvt() { ta.focus() }  // ta.select()

function PasteEvt(){ setTimeout(()=>{ Clean() },1) }

function Reset(){ ta.value=''; ca.innerHTML='';  FocusEvt() }

function Clean(){ let d=ta.value;  if(d==''){return};  d=d.replace(/^[\s]*/,'').replace(/[\s]*$/,'').replace(/[\, ]*/g,'');  ta.value=d;  FocusEvt() }

function Tab(){ let v=ta.value; let s=ta.selectionStart; let e=ta.selectionEnd;  ta.value=v.substring(0,s)+'\t'+v.substring(e);  ta.selectionStart=ta.selectionEnd=s+1; }

// Calc ==================================================================================================================================================================================

function Calc() { Clean();  let cols=0; let hc=``; let hr=``; let vals1=[]; let vals2=[]; let calcs1={}; let calcs2={}; 

let d=ta.value;  if(d==''){return};  if(/[\n][^\t]/.test(d)){ cols=1 };  if(/[\t]/.test(d)){ cols=2 };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if(cols==0){ d=d.replace(/[\s]/g,'');  let v0=eval(d);  hc=`<span>${d}</span> = <span v0>${v0}</span>` }

if(cols>0){ d=d.replace(/[^\d\.\-\n\t]/g,'');  d=d.split('\n') }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if(cols==1) { for(let r of d){ let v1=Number(r);  vals1.push(v1); }   calcs1=Calcs(vals1); 

hc=`<table><tr><td rh>Tot</td><td cc>${calcs1.tot}</td></tr><tr><td rh>Dif</td><td cc>${calcs1.dif}</td></tr><tr><td rh>Min</td><td cc>${calcs1.min}</td></tr><tr><td rh>Max</td><td cc>${calcs1.max}</td></tr><tr><td rh>Mid</td><td cc>${calcs1.mid}</td></tr><tr><td rh>Avg</td><td cc>${calcs1.avg}</td></tr></table>` } /*-if cols==1*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if(cols==2) { for(let r of d){ let v=r.split('\t');  let v1=Number(v[0]);  let v2=Number(v[1]);  let rc=Calcs([v1,v2]);  let pctof=Round((v2/v1)*100);  let pctch=Round(((v2-v1)/v1)*100);  vals1.push(v1);  vals2.push(v2);  calcs1=Calcs(vals1);  calcs2=Calcs(vals2); 

hr=`${hr}<tr><td rh>&nbsp;</td><td cv>${v1}</td><td cv>${v2}</td><td rc>${rc.tot}</td><td rc>${rc.dif}</td><td rc>${rc.min}</td><td rc>${rc.max}</td><td rc>${rc.mid}</td><td rc>${rc.avg}</td><td rc>${pctof}</td><td rc>${pctch}</td></tr>` } /*-for*/  

hc=`<table><tr><td rh>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td ch>Tot</td><td ch>Dif</td><td ch>Min</td><td ch>Max</td><td ch>Mid</td><td ch>Avg</td><td ch>% Of</td><td ch>% Ch</td></tr>
${hr}<tr><td rh>Tot</td><td cc>${calcs1.tot}</td><td cc>${calcs2.tot}</td></tr><tr><td rh>Dif</td><td cc>${calcs1.dif}</td><td cc>${calcs2.dif}</td></tr><tr><td rh>Min</td><td cc>${calcs1.min}</td><td cc>${calcs2.min}</td></tr><tr><td rh>Max</td><td cc>${calcs1.max}</td><td cc>${calcs2.max}</td></tr><tr><td rh>Mid</td><td cc>${calcs1.mid}</td><td cc>${calcs2.mid}</td></tr><tr><td rh>Avg</td><td cc>${calcs1.avg}</td><td cc>${calcs2.avg}</td></tr></table>`;

} /*-if cols==2*/

ca.innerHTML='';  ca.insertAdjacentHTML('beforeend',hc) }  /* -Calc */

// Func ==================================================================================================================================================================================

function Calcs(col) { let srt=col.slice(0); srt.sort((a,b) => a-b);  let cnt=col.length;  let tot=col.reduce((a,b) => a+b, 0);  let avg=tot/cnt;  let max=srt[cnt-1];  let min=srt[0];  let dif=max-min;  let mid=(dif/2)+min;  return { cnt:Round(cnt), tot:Round(tot), avg:Round(avg), mid:Round(mid), max:Round(max), min:Round(min), dif:Round(dif) } }  /* end Calcs */

function Round(num) { return Math.round(num*1000)/1000 }  /* https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */

/* Notes =================================================================================================================================================================================

  1,000 	   4   
  2.3  	  5   
  3   	 6   


function Clip(t){ t=Clean(t);  if(/^[^\d\(\.\-\+]/.test(t)){return};  ta.value=t;  Paste() };  clip.readText().then((t) => ( Clip(t) ))

======================================================================================================================================================================================= */