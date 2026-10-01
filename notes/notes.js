// >> CSS
function CSS(){ let css=`
#notes { position:fixed;  z-index:1;  top:0; right:calc(100vw - 180px); bottom:0; left:0; }
.note { width:calc(100vw - 180px);  padding:8px;  font:16px monospace; }  .note:focus { outline:none; }

#bar { position:fixed;  z-index:2;  left:calc(100vw - 180px); right:0; top:0; bottom:0;  background:rgba(128,128,128,.32);  user-select:none; }
#bar_tabs>input { display:none; }  
#bar_tabs>input+label { text-align:center;  cursor:pointer;  background:rgba(128,128,128,.32);   padding: 4px 0 4px 0; }  
#bar_tabs>input:checked+label { background:rgba(128,128,128,0); }  
.btt { display: block; float: left; width: 45px; }
.btc { display: none; float: left; }  
#btt1:checked~#btc1, #btt2:checked~#btc2, #btt3:checked~#btc3, #btt4:checked~#btc4 { display: block; }
#find_form { padding: 8px 0px 16px 4px; }
#find_form buttonbutton, #find_form textarea, #find_form select { display: block;  width: 100%; }  textarea { resize: none; }  textarea:focus { outline: none; }

#find { position:fixed;  z-index:2;  top:calc(100vh - 200px); right:180px; bottom:0; left:0;  border-top: 1px solid gray;  background:rgba(128,128,128,.08); }
#find_bar { background:rgba(128,128,128,.32); padding: 4px 8px 4px 8px; }  
#find_results { height:100%; }
`;  SetStyleInternal$(css) }  CSS();

// =======================================================================================================================================================================
// >> HTML
function HTML(){ let h=`
<div id="notes"><div class="note" id="note1" contenteditable="true" tabindex="0">notes</div note></div notes>

<div id="bar"><div id="bar_tabs">
  <input id="btt1" name="btt" type="radio" checked /><label for="btt1" class="btt" title="Notes  alt+1">📒</label>
  <input id="btt2" name="btt" type="radio"         /><label for="btt2" class="btt" title="Edit  alt+2">📝</label>
  <input id="btt3" name="btt" type="radio"         /><label for="btt3" class="btt" title="Find  alt+3">🔍</label>
  <input id="btt4" name="btt" type="radio"         /><label for="btt4" class="btt" title="Settings  alt+4">🔅</label>
  <div id="btc1" class="btc">notes</div>
  <div id="btc2" class="btc">Insert:[Alt+I+x]<br>- Title[H1]<br>- Section[Hx]<br>- Table[B]<br>- List[L]<br>- Media[M]<br>- Link[K]<br>- Line[R]<br>- Format[F]<br>- Value-Unit/Calc[V]<br>- Text[-]
  </div>
  <div id="btc3" class="btc">
    <div id="find_form">
      <button>Find All</button><textarea></textarea><button>Replace With</button><textarea></textarea>
      <select><option>In Selection</option><option>In This Note</option><option>In All Notes</option></select>
      <select><option>Normal Mode</option><option>Extended Mode</option><option>Regex Mode</option></select>
      <button>Reset</button>
    </div find_form>
    <div id="find_notes">notes with matches</div find_notes>
  </div>
  <div id="btc4" class="btc">settings</div>
</div bar_tabs></div bar>

<div id="find">
  <div id="find_bar">27 matches in this note<button style="float:right;" title="Close">✖</button></div find_bar>
  <div id="find_results">results</div find_results>
</div find>
`;  SetHTML$( { action:'add', content1:h, content2:body, position:'end' } ) }  HTML();  SetIconCharacter$('📒');  SetTitleText$('Notes');

// Elements
let notes=body.querySelector('#notes');  let note=body.querySelector('#notes>:first-child');
let bar=body.querySelector('#bar');  let fr=body.querySelector('#find_results');
let tab1=body.querySelector('#btt1'); let tab2=body.querySelector('#btt2'); let tab3=body.querySelector('#btt3'); let tab4=body.querySelector('#btt4'); 
let find=body.querySelector('#find'); let find_text=body.querySelector('#find_text'); let repl_text=body.querySelector('#repl_text');

// =======================================================================================================================================================================
// Events
let note_focus=false;  note.onfocus=(ev)=>{ note_focus=true };  note.onblur=(ev)=>{ note_focus=false };
doc.onselectionchange=(ev)=>{ if(note_focus){ GetSel(ev) } };

// =======================================================================================================================================================================
// >> Selection   https://developer.mozilla.org/en-US/docs/Web/API/Selection
let sel, sel_type/*None|Caret|Range*/, node, node_name, txt;

function GetSel(ev){ sel=doc.getSelection();  sel_type=sel.type;  node=sel.anchorNode;  if(node.nodeType!=Node.ELEMENT_NODE){ node=node.parentNode };  node_name=node.nodeName;  txt=sel.toString();  fr.innerHTML=sel; }

function FocusNote() { note.focus() }

// =======================================================================================================================================================================
// >> Keyboard
let alt_key=false;  let keys='';  note.onkeydown=(ev)=>{ if(alt_key){ ev.preventDefault() } };
note.onkeyup=(ev)=>{ let key=ev.key;  if(key=='Alt'){ ev.preventDefault();  if(alt_key){ alt_key=false;  keys='';  return };  alt_key=true;  return };  if(key=='Enter' && alt_key==true ){ ev.preventDefault();  let key_func=key_funcs[keys];  if(key_func!=undefined){ win[key_func]() };  alt_key=false;  keys='';  return };  if(alt_key){ ev.preventDefault();  keys=keys+key;  return } };

let key_funcs={ 'ih1':`InsH1`, 'ih2':`InsH2` }; 

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Elements  Insert[Alt+i+x]  Delete[Alt+d+x]  Edit[Alt+e] : media, link, line
  - Heading h : <h2-h6> nested,indented,exp/col,auto-line above.    (arro:2BC8,squa:2BC0,diam:2BC1,pent:2B1F,hexa:2B22,octa:2BC3,circ:2BC4)
  - Table   t : ins[ITRAr]:row-up/dn,col-lf/rt , move:row-up/dn,col-lf/rt , del:row[TDR]/col[TDC] , col-align-tog[TA]  col-sort-tog[TS]
  - List    l : <ul/ol><li>  type(plain|bullet|number)  TogList-tl,Sort
  - Image   i : <img>,   Media[m]: <svg>[s],<video>[v],<audio>[a],<canvas>[c],<map>[m],...  A:Resize,Delete
  - Link    k : <a> (text+href), type(jump|file|url)  A:Open,Edit,Del
  - Divider d : <hr> style, thickness  (Divider/Line/Rule)
  - Format  f : <span style=""> bold(ctrl+b)[b], italic(i)[i], underline(u)[u], small[m], strike[k], sub[], super[p], color[c], highlight/bg[h], clear[d]
  - Value   v : Num-Unit/Calc

> Text: enter:hardbreak(div), shift-enter:softbreak(br), WrapTog[W], LinesCommasTog[C], SortCommaList(cur-line)/SortLinesAsc/SortLinesDec[S], RemoveDuplicateLines(incl-empty)[D], ReverseLineOrder[R], UPPERCASE[U]/lowercase[L]/Proper Case[P]

- del: 'X':DelElem(); 'T':DelTable(); 'R':DelRow(); 'C':DelCol();
- sort: 'ArrowUp':SortTable('asc'); 'ArrowDown':SortTable('dec'); 
- ins: tbl/list/line row,col 'ArrowUp':InsRow(ibb); 'ArrowDown':InsRow(iae); 'ArrowLeft':InsCol(ibb); 'ArrowRight':InsCol(iae); 
- move: tbl,list,line row,col 'ArrowUp':MovUp(); 'ArrowDown':MovDn(); 'ArrowLeft':MovLf(); 'ArrowRight':MovRt(); 
xxx
------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// >> Menus --------------------------------------------------------------------------------------------------------------------------------------------------------------

// Menu Open -------------------------------------------------------------------------------------------
function MenuOpen(menu) { MenuCloseAll(); for (let mu_cmd of mu_cmds) { mu_cmd.style.display='block' };   // cmd_file_open.disabled=true;
switch(menu) { case'file':MenuOpenFile();break; case'insert':MenuOpenInsert();break; case'edit':MenuOpenEdit();break; case'tools':MenuOpenTools();break; case'headings':MenuOpenHeadings();break; }
let pop = event.target.nextElementSibling; pop.style.display='flex'; mu_bgd.style.display='block'; 
}
// file menu ---------------------------------------
function MenuOpenFile() {  }
// insert menu -------------------------------------
function MenuOpenInsert() { 
if(node.closest('table,ul,h2,a,img')!=null) { cmd_ins_heading.style.display='none'; cmd_ins_list.style.display='none'; cmd_ins_line.style.display='none'; cmd_ins_table.style.display='none'; }
if(node.closest('table')==null) { cmd_ins_tbl_row_above.style.display='none'; cmd_ins_tbl_row_below.style.display='none'; cmd_ins_tbl_col_left.style.display='none'; cmd_ins_tbl_col_right.style.display='none'; }
if(node.closest('th')!=null) { cmd_ins_link.style.display='none'; cmd_ins_image.style.display='none'; cmd_ins_tbl_row_above.style.display='none'; cmd_ins_tbl_row_below.style.display='none'; cmd_move_tbl_row_up.style.display='none'; cmd_move_tbl_row_down.style.display='none'; }
}
// edit menu ---------------------------------------
function MenuOpenEdit() { 
if(node.className=='note') { cmd_move_tbl_row_up.style.display='none'; cmd_move_tbl_row_down.style.display='none'; cmd_move_tbl_col_left.style.display='none'; cmd_move_tbl_col_right.style.display='none'; cmd_del_tbl_row.style.display='none'; cmd_del_tbl_col.style.display='none'; cmd_tog_tbl_head.style.display='none'; }
}
// tools menu --------------------------------------
function MenuOpenTools() {  }
// headings menu -----------------------------------
let headings = [];
function MenuOpenHeadings() { mu_pop_headings.innerHTML = '';  headings = note.querySelectorAll('h2');  if(headings.length==0) { mu_pop_headings.insertAdjacentHTML(ibe, '<button class="mu_cmd" onclick="MenuClick()">(no headings)</button>'); return }
for (i=0; i < headings.length; i++) { let h = '<button class="mu_cmd" onclick="MenuClick();GoHeading('+i+')">'+headings[i].textContent+'</button>';  mu_pop_headings.insertAdjacentHTML(ibe, h) } } // MenuOpenHeadings
function GoHeading(i) { headings[i].scrollIntoView() }

// Menu More -------------------------------------------------------------------------------------------
function MenuEsc() { if(event.key != 'Escape'){return}; MenuClose() }
function MenuOut() { MenuClose() }
function MenuClick() { MenuClose() }
function MenuClose() { MenuCloseAll(); SetSel() }  function MenuCloseAll() { for (let mu_pop of mu_pops) { mu_pop.style.display='none' }; mu_bgd.style.display='none' }

function TabClick() { MenuClose() }

// >> ====================================================================================================================================================================
// >> Edit : Insert, etc

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - Table
function InsTable() { if(node_name!='DIV'){return};  let h = '<table><tbody><tr><td>A1</td><td>B1</td></tr><tr><td>A2</td><td>B2</td></tr></tbody></table>';  Ins(h) }
function DelTable() { Del('table') }
// head
function TogHead() { let tbody = node.closest('tbody'); if(tbody == null){return}; let row = tbody.firstChild; let bef = row.innerHTML; let aft = ''; if (row.firstChild.nodeName == 'TH') { aft = bef.replaceAll('th>','td>') } else { aft = bef.replaceAll('td>','th>') } row.innerHTML = aft }

// insert row,col
function InsRow(bef_aft) { let tr = node.closest('tr'); if(tr == null || tr.firstChild.nodeName=='TH'){return}; let h = ''; let c = tr.childNodes.length; for (i=0; i < c; i++) { h=h+'<td><br></td>' } h='<tr>'+h+'</tr>';  tr.insertAdjacentHTML(bef_aft, h) }
function InsCol(bef_aft) { let td = node.closest('td,th'); if(td == null){return}; let h = ''; let i = NodeIndex(td); let tbody = node.closest('tbody'); let rows = tbody.childNodes; for (let row of rows) { let cells = row.childNodes; let cell = cells[i]; if(cell.nodeName=='TH') { h = '<th>?<br></th>' } else { h = '<td><br></td>' } cell.insertAdjacentHTML(bef_aft, h) } }

// delete row,col
function DelRow() { Del('tr') }
function DelCol() { let td = node.closest('td,th'); if(td == null){return} let i = NodeIndex(td); let tbody = node.closest('tbody'); let rows = tbody.children; for (let row of rows) { let cells = row.children; let cell = cells[i]; cell.remove() } }

// move row,col
function MovRow(dir) { let tr = node.closest('tr'); if(tr.firstChild.nodeName=='TH'){return} if(dir=='up') { let sib = tr.previousSibling; if(sib.firstChild.nodeName=='TH'){return} tr.after(sib); } else { let sib = tr.nextSibling; if(sib==null){return} tr.before(sib); } }
function MovCol(dir) { let td = node.closest('td,th'); if(td == null){return} let i = NodeIndex(td); let tbody = node.closest('tbody'); let rows = tbody.children; for (let row of rows) { let cells = row.children; let cell = cells[i]; if(dir=='lf') { let sib = cell.previousSibling; if(sib==null){return} cell.after(sib) } else { let sib = cell.nextSibling; if(sib==null){return} cell.before(sib) } } }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - List
function InsList() { if(node_name!='DIV'){return};  let h = '<ul style="list-style-type:disc"><li>Item1</li><li>Item2</li></ul>';  Ins(h) }

function DelList() { Del('ul') }

function MovLI(dir) { let li = node.closest('li');  if(dir=='up') { let sib = li.previousSibling;  if(sib==null){return};  li.after(sib) } else { let sib = li.nextSibling;  if(sib==null){return};  li.before(sib) } }

function TogList() { let list = node.closest('ul');  if(list == null){return};  let s = list.getAttribute('style');  let ls = 'list-style-type:';  if(s==ls+'disc'){list.setAttribute('style',ls+'decimal')} else if(s==ls+'decimal'){list.setAttribute('style',ls+'none')} else if(s==ls+'none'){list.setAttribute('style',ls+'disc')} }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - Line
function InsLine() { if(node_name!='DIV'){return}  let h = '<hr>';  Ins(h) }
function DelLine() { Del('hr') }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - Heading
function InsH2() { if(node_name!='DIV'){return};  h = '<h2>Heading</h2>';  Ins(h) }
function DelH() { Del('h2') }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - Link
function InsLink() { let h = '<a href="http://link_url" title="http://link_url" target="_blank">'+sel.toString()+'</a>';  let link = Ins(h);  link.addEventListener('click',DoLinkClick) }

function DelLink() { Del('a') }

let link, link_href, link_title, link_dialog, link_input; 

function AddLinksClick() { let links = notes.querySelectorAll('a');  for (let lnk of links) { lnk.addEventListener('click',DoLinkClick) } }  AddLinksClick();

function DoLinkClick(event) { event.preventDefault();  link = event.currentTarget;  link_href = link.href;  link_title = link.title; 

if((event.ctrlKey && event.altKey)) {return}  if(!(event.ctrlKey || event.altKey)) {return}  if (event.ctrlKey) { window.open(link_href); return }  if (event.altKey) {  }

let h = '<dialog id="link-dialog" class="dialog_modal"><div><button onclick="window.open(\''+link_href+'\');link_dialog.close()">Open Link</button></div><div><label for"link-input">URL:&nbsp;&nbsp;</label><input id="link-input" type="url" value="'+link_href+'" onfocus="this.select()" required autofocus></div><div><button onclick="link.href=link_input.value;link_dialog.close()">Save</button>&nbsp;&nbsp;<button>Delete</button>&nbsp;&nbsp;<button onclick="link_dialog.close()">Cancel</button></div></dialog>';
body.insertAdjacentHTML(ibe, h); link_dialog = body.querySelector('#link-dialog'); link_dialog.addEventListener('close',EditLinkClose); link_dialog.addEventListener('cancel',EditLinkClose); 

link_input=body.querySelector('#link-input');  link_dialog.showModal() }

function EditLinkClose() { link_dialog.remove();  link.focus() }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// >> - Media/Image/etc
function InsImage() { let h = '<img src="http://image_url">';  let image = Ins(h);  image.addEventListener('click',DoImagesClick) }
function DelImage() { Del('img') }

let image, image_src, image_dialog, image_input; 

function ListenImagesClick() { let images = notes.querySelectorAll('img');  for (let image of images) { image.addEventListener('click',DoImagesClick) } }  ListenImagesClick();

function DoImagesClick(event) { event.preventDefault();  image = event.currentTarget;  image_src = image.src;
let h = '<dialog id="image-dialog" class="dialog_modal"><div><label for"image-input">URL:&nbsp;&nbsp;</label><input id="image-input" type="url" value="'+image_src+'" onfocus="this.select()" required autofocus></div><div><button onclick="image.src=image_input.value;image_dialog.close();image_dialog.remove()">Save</button>&nbsp;&nbsp;<button onclick="image.remove();image_dialog.close();image_dialog.remove()">Delete</button>&nbsp;&nbsp;<button onclick="image_dialog.close();image_dialog.remove()">Cancel</button></div></dialog>';
body.insertAdjacentHTML(ibe, h); image_dialog = body.querySelector('#image-dialog'); image_input=body.querySelector('#image-input'); image_dialog.showModal() }

// >> ====================================================================================================================================================================
// >> Sort : Lines, List, Table
function SortTable(dir) {  // https://www.tutorialspoint.com/how-to-sort-an-html-table-using-javascript
let tbody=node.closest('tbody'); if(tbody==null){return} let row1=tbody.firstChild; let hasHead; if (row1.firstChild.nodeName=='TH') { hasHead=true } else { hasHead=false }
let cell=node.closest('td,th'); if(cell==null){return} let col=NodeIndex(cell);
let rows, sorted, i, x, y, sortFlag;  sorted=true;
while (sorted) { sorted=false;
rows = tbody.childNodes; if(hasHead==true) { i=1 } else { i=0 }
for (i; i < rows.length-1; i++) { sortFlag=false;
x=rows[i].childNodes[col]; y=rows[i+1].childNodes[col];
if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) { sortFlag=true; break; }
} // for
if (sortFlag) { rows[i].parentNode.insertBefore(rows[i+1], rows[i]); sorted=true; }
} // while
} //

// =======================================================================================================================================================================
// >> Find & Replace       (wrap-around. find/replace all. upr-match-upr/low-match-both)
function FindOpen() { menus.style.display='none'; tabs.style.display='none'; find.style.display='flex'; }
function FindClose() { find.style.display='none'; menus.style.display='flex'; tabs.style.display='flex'; }

function Replace() {
let find_str=find_text.value; let repl_str=repl_text.value;
let re=new RegExp(find_str, "gi"); //pattern for keyword
let re0=new RegExp("[>][^><]*[><]", "gi"); //pattern to get textnode
note.innerHTML=note.innerHTML.replace(re0, function (text) { return text.replace(re, '$&') }); log(note.innerHTML);
}

/*
https://stackoverflow.com/questions/5983681/simple-javascript-find-and-replace
https://web.archive.org/web/20210616180407/https://j11y.io/javascript/find-and-replace-text-with-javascript/
https://stackoverflow.com/questions/18643766/find-and-replace-specific-text-characters-across-a-document-with-js
*/

// =======================================================================================================================================================================
// >> Misc  functions
function Ins(h) { let e = doc.createElement('x'); e.innerHTML = h; e = e.childNodes[0]; rng.insertNode(e); return e }
function Del(s) { let e = node.closest(s); if (e == null) {return}  e.remove(); return e }
function MovUp() { if (node.closest('tr') != null) { MovRow('up'); return }  if (node.closest('li') != null) { MovLI('up'); return } }
function MovDn() { if (node.closest('tr') != null) { MovRow('dn'); return }  if (node.closest('li') != null) { MovLI('dn'); return } }
function MovLf() { if (node.closest('tr') != null) { MovCol('lf'); return } }
function MovRt() { if (node.closest('tr') != null) { MovCol('rt'); return } }
function NodeIndex(e) { let i = Array.prototype.indexOf.call(e.parentNode.childNodes, e); return i }
function LogPath() { let e = node; let path = e.nodeName; while ( e.parentNode != note ) { let parent = e.parentNode; path = path + '-' + parent.nodeName; e = parent } console.log(path); }
function log(v) { console.log(v) }
function MarkModified() { let note_e = event.target; let i = NodeIndex(note_e); tabs.children[i].insertAdjacentHTML(iab,'<span class="tab_mod">*</span>'); note_e.removeEventListener('input', MarkModified); }
function ShowNote(i) { for (let x of notes.children) { x.style.display = 'none' }; notes.children[i].style.display = 'block'; note = notes.children[i] }

function Tab1(){ tab1.checked=true }  function Tab2(){ tab2.checked=true }  function Tab3(){ tab3.checked=true }  function Tab4(){ tab4.checked=true }


// >> ====================================================================================================================================================================
// >> Files
let files = [];
// Open --------------------------------------------
async function FileOpen() { 
const options = { startIn: 'documents', types: [ { description: 'HTML', accept: { 'text/html': ['.html'] } } ], excludeAcceptAllOption: true, multiple: true }; 
files = await window.showOpenFilePicker(options); 
for (let i=0; i < files.length; i++) { 
let file = files[i];  let file_name = file.name;  let file_name_short = file_name.substring(0,file_name.length-5); 
const file_get = await file.getFile();  const file_text = await file_get.text(); 
notes.insertAdjacentHTML('beforeend', '<div class="note" contenteditable="true">'+file_text+'</div>'); 
let notes_children = notes.children;  let i_str = i.toString();  let note_e = notes_children[i];  note_e.addEventListener('input', MarkModified); 
tabs.insertAdjacentHTML('beforeend', '<button class="tab" onclick="ShowNote('+i_str+')">'+file_name_short+'</button>'); 
} // end for
ShowNote(0); 
}
// New ---------------------------------------------
async function FileNew() { 
const options = { startIn: 'documents', suggestedName: 'Untitled.html', types: [ { description: 'HTML', accept: { 'text/html': ['.html'], }, }, ], excludeAcceptAllOption: true, multiple: false }; 
let file = await window.showSaveFilePicker(options);  files.push(file); 
let file_name = file.name; let file_name_short = file_name.substring(0,file_name.length-5);
notes.insertAdjacentHTML('beforeend', '<div class="note" contenteditable="true">New Note</div>'); 
let notes_children = notes.children;  let i = notes_children.length-1; let i_str = i.toString();  let note_e = notes_children[i]; 
note_e.addEventListener('input', MarkModified); 
tabs.insertAdjacentHTML(ibe, '<button class="tab" onclick="ShowNote('+i_str+')">'+file_name_short+'</button>');
ShowNote(i);
}
// Save --------------------------------------------
async function FileSave() { for (let i=0; i < files.length; i++) { FileSaveI(i); } }
async function FileSaveI(i) { 
let tab = tabs.children[i];  let tab_mod = tab.querySelector('span.tab_mod');
if (tab_mod != null) { tab_mod.remove();
let note_e = notes.children[i];  note_e.addEventListener('input', MarkModified);  let note_h = note_e.innerHTML;  let file = files[i];
const file_write = await file.createWritable(); await file_write.write(note_h); await file_write.close(); 
} // end if
}
// Close -------------------------------------------
function FileClose() { 
let i = NodeIndex(note);  let tab = tabs.children[i];  let tab_mod = tab.querySelector('span.tab_mod');
if (tab_mod != null) { let conf = confirm('OK to save and close. Cancel to close without saving.'); if(conf==true) { FileSaveI(i) } }
tabs.children[i].remove(); 
files.splice(i,1); 
note.remove(); 
if(files.length == 0) {return}
note = notes.children[0]; tab = tabs.children[0];  ShowNote(0);
}


/* >> ====================================================================================================================================================================
>> Spec / etc

> Sidebar : thin, expand on hover
  - Files :  New/Open/Close/Delete/Name/SaveAll, drag-drop reorder. remember:current/open/recent. filename:&name=<title>(-=sp)/<nanoid>.x
  - Outline : from headings. drag/drop reorder/promote/demote. exp/col. filter
  - Toolbar : Insert, Format, LineActions, 

__________________________________________________________________________________________________________________________________________________________________________


<br><table><tbody><tr><th>A</th><th>B</th><th>C</th></tr><tr><td>3</td><td>X</td><td>P</td></tr><tr><td>2</td><td>Y</td><td>D</td></tr><tr><td>1</td><td>Z</td><td>Q</td></tr></tbody></table><br>
<br><ul><li>Item1</li><li>Item2</li></ul><br>
<br><h2>Heading</h2><br>
<br><a href="http://link_url" title="http://link_url" target="_blank">Link</a><br>


//async function VerifyPermission(file) { const options = { mode: 'readwrite' }; if (await file.queryPermission(options) === 'granted') { return true } if (await file.requestPermission(options) === 'granted') { return true } return false }  if(VerifyPermission(file) == false)  { alert('The file editing permission menus. be allowed for this site.'); files = []; return };


.note { z-index: 0; position: fixed; top: 24px; right: 0; bottom: 0; left: 0; overflow-y: scroll; font-family: monospace; font-size: 16px; caret-color: #00FF38; padding: .5em; margin: 0; border: 0; outline: 0 } 
.note img { min-height: 1em; min-width: 1em }  .note img:hover { cursor: pointer }
.note a {  }  .note a:hover { cursor: pointer }
.note table { max-width: 98vw; font-size: 16px; border-collapse: collapse; border-top: 1.5px solid gray; border-bottom: 1.5px solid gray }
  .note th { overflow-wrap: anywhere; text-align: left; vertical-align: top; padding-right: 1em; border-bottom: 1.5px solid gray }   .note tr:nth-child(odd) { background-color: gray }
  .note td { overflow-wrap: anywhere; text-align: left; vertical-align: top; padding-right: 1em; border-bottom: 0.5px solid gray }
.note ul { margin: 0; padding-inline-start: 24px }
.note hr { height: 1; background-color: gray; border: none }
.note h2, .note h3 { border-top: 1px solid gray; font-weight: bold; margin-block-start: 0; margin-block-end: 0; margin-inline-start: 0; margin-inline-end: 0; margin-top: 1em; padding: .25em 0 .75em 0  }
  .note h2 { font-size: 1.33em }   .note h3 { font-size: 1.17em }

======================================================================================================================================================================= */