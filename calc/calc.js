SetTitleText$('Calc');  SetIconCharacter$('🔢');

let css=`/* ta=text_area, ca=calc_area, ch=col_head, rh=row_head, cc=col_calc, rc=row_calc, cv=col_valu */ 
body { margin: 0; padding: 1em; background-color: #121212; color: #F8F8F8; font-size: 1.5em; font-family: monospace }  table { border-collapse: collapse }  td { padding: .25em 1em .25em 1em }
[ch],[rh] { font-weight: bold }  [cc],[rc] { font-weight: bold; color: #DBB2FF; background-color: #EEEEEE }  [cv] {  }  [v0] { font-weight: bold; color: #DBB2FF }
[ta] { display: block; resize: none; width: 99%; height: 4em; font-size: 1em; font-family: monospace; margin-bottom: 1em; padding: .5em }  [ta]:focus { outline: none }  [ca] {  }
[ba] { margin-bottom: 1em }  [bt] { padding: .25em .5em .25em .5em }`;  SetStyleInternal$(css);

// Page ==================================================================================================================================================================

let htm=`<textarea ta id="ta" autofocus></textarea ta>${(ua_type!=='desktop')?`<div ba><button bt onclick="Calc()">Calc</button bt>|<button bt onclick="Tab()">Tab</button bt>|<button bt onclick="Reset()">Reset</button bt></div ba>`:``}<div ca></div ca>`;  SetHTML$( { action:'add', content1:htm, content2:body, position:'end' } );

let ta=body.querySelector('[ta]');  let ca=body.querySelector('[ca]');

// Events ================================================================================================================================================================

win.addEventListener('focus', Focus);  ta.addEventListener('keydown', KeyDown);  ta.addEventListener('paste', Paste);

// Keyboard ==============================================================================================================================================================

let keys_funcs={ 'Tab':`TabKey`, 'Delete':`DeleteKey`, '=':`EqualsKey` };  let keys_keys=Object.keys(keys_funcs);
function KeyDown(ev){ if(ev.altKey||ev.ctrlKey||ev.shiftKey || !keys_keys.includes(ev.key) ){return};  ev.preventDefault();  win.addEventListener('keyup',KeyUp) }
function KeyUp(ev){ win.removeEventListener('keyup',KeyUp);  let kf=keys_funcs[ev.key];  if(kf===undefined){return}; ev.preventDefault();  win[kf]() }
function TabKey(){ Tab() }   function DeleteKey(){ Reset() }   function EqualsKey(){ Calc() }

// Misc ==================================================================================================================================================================

function Focus(){ ta.focus() }

function Reset(){ ta.value='';  ca.innerHTML='';  Focus() }

function Tab(){ let s=ta.selectionStart;  let e=ta.selectionEnd;  let v=ta.value; ta.value=v.substring(0,s)+'\t'+v.substring(e);  ta.selectionStart=ta.selectionEnd=s+1 }

function Paste(){ setTimeout(()=>{ Clean() },1) }

function Clean(){ let d=ta.value;  if(d==''){return};  d=d.replace(/^[\s]*/,'').replace(/[\s]*$/,'').replace(/[\, ]*/g,'');  ta.value=d }

// Calc ==================================================================================================================================================================

function Calc(){  Clean();  let d=ta.value;  if(d==''){return};  let vals1=[]; let vals2=[]; let calcs1={}; let calcs2={};  let hc=``; let hr=``;  ca.innerHTML='';  

// Convert  val-met~imp --------------------------------------------------------------------------------------------------------------------------------------------------
if(/[\~]/.test(d)){  d=d.split('\n');
let units={ 'km~mi':`0.621371`, 'm~ft':`3.28084`, 'cm~in':`0.39`, 'mm~in':`0.039`, 'l~qt':`1.057`, 'l~gl':`0.264`, 'ml~cp':`0.0042`, 'ml~oz':`0.0338`, 'c~f':`1.8+32`, 'kg~t':`0.0011`, 'kg~lb':`2.20462`, 'g~oz':`0.035`, 'g~lb':`0.002205`, 'mg~oz':`0.000035` };
for(let r of d){  let uv=r.split('-')[0];  let uu=r.split('-')[1];  let vv=units[uu];  let vu=r.split('~')[1]; 
hr=`${hr}<tr><td hr>${r}</td><td cc>${eval(uv*vv)} ${vu}</td></tr>` };  hc=`<table>${hr}</table>`; 
ca.insertAdjacentHTML('beforeend',hc);  return }

// Formula ---------------------------------------------------------------------------------------------------------------------------------------------------------------
if(/[\+\-\*\/]/.test(d)){  d=d.split('\n');  for(let r of d){ hr=`${hr}<tr><td hr>${r}</td><td cc>${eval(r)}</td></tr>` };  hc=`<table>${hr}</table>`; 
ca.insertAdjacentHTML('beforeend',hc);  return }

// Change ----------------------------------------------------------------------------------------------------------------------------------------------------------------
if(/[\t]/.test(d)){  d=d.split('\n');  for(let r of d){ let v=r.split('\t');  let v1=Number(v[0]);  let v2=Number(v[1]);  let rc=Calcs([v1,v2]);  let pctof=Round((v2/v1)*100);  let pctch=Round(((v2-v1)/v1)*100);  vals1.push(v1);  vals2.push(v2);  calcs1=Calcs(vals1);  calcs2=Calcs(vals2); 
hr=`${hr}<tr><td rh>&nbsp;</td><td cv>${v1}</td><td cv>${v2}</td><td rc>${rc.tot}</td><td rc>${rc.dif}</td><td rc>${rc.min}</td><td rc>${rc.max}</td><td rc>${rc.mid}</td><td rc>${rc.avg}</td><td rc>${pctof}</td><td rc>${pctch}</td></tr>` }
hc=`<table><tr><td rh>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td ch>Tot</td><td ch>Dif</td><td ch>Min</td><td ch>Max</td><td ch>Mid</td><td ch>Avg</td><td ch>% Of</td><td ch>% Ch</td></tr>
${hr}<tr><td rh>Tot</td><td cc>${calcs1.tot}</td><td cc>${calcs2.tot}</td></tr><tr><td rh>Dif</td><td cc>${calcs1.dif}</td><td cc>${calcs2.dif}</td></tr><tr><td rh>Min</td><td cc>${calcs1.min}</td><td cc>${calcs2.min}</td></tr><tr><td rh>Max</td><td cc>${calcs1.max}</td><td cc>${calcs2.max}</td></tr><tr><td rh>Mid</td><td cc>${calcs1.mid}</td><td cc>${calcs2.mid}</td></tr><tr><td rh>Avg</td><td cc>${calcs1.avg}</td><td cc>${calcs2.avg}</td></tr></table>`;
ca.insertAdjacentHTML('beforeend',hc);  return }

// Column ----------------------------------------------------------------------------------------------------------------------------------------------------------------
if(d!==''){  d=d.split('\n');  for(let r of d){ let v1=Number(r);  vals1.push(v1); }   calcs1=Calcs(vals1); 
hc=`<table><tr><td rh>Tot</td><td cc>${calcs1.tot}</td></tr><tr><td rh>Dif</td><td cc>${calcs1.dif}</td></tr><tr><td rh>Min</td><td cc>${calcs1.min}</td></tr><tr><td rh>Max</td><td cc>${calcs1.max}</td></tr><tr><td rh>Mid</td><td cc>${calcs1.mid}</td></tr><tr><td rh>Avg</td><td cc>${calcs1.avg}</td></tr></table>`;
ca.insertAdjacentHTML('beforeend',hc);  return }

} /* -Calc */

// Funcs =================================================================================================================================================================

function Calcs(col) { let srt=col.slice(0); srt.sort((a,b) => a-b);  let cnt=col.length;  let tot=col.reduce((a,b) => a+b, 0);  let avg=tot/cnt;  let max=srt[cnt-1];  let min=srt[0];  let dif=max-min;  let mid=(dif/2)+min;  return { cnt:Round(cnt), tot:Round(tot), avg:Round(avg), mid:Round(mid), max:Round(max), min:Round(min), dif:Round(dif) } }

function Round(num) { return Math.round(num*1000)/1000 }

/* Notes =================================================================================================================================================================

function Clip(t){ t=Clean(t);  if(/^[^\d\(\.\-\+]/.test(t)){return};  ta.value=t;  Paste() };  clip.readText().then((t) => ( Clip(t) ))

======================================================================================================================================================================= */