{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const r2=x=>Math.round(x*100)/100;
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ---------- reference data
const ICON={eng:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/>',cs:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',sci:'<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',life:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',health:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',soc:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 14.2c3 0 6 1.6 6 4.8"/>',biz:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',law:'<path d="M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',hum:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 10h5"/>',rel:'<path d="M7 4h11a2 2 0 0 1 0 4H7zM7 4a2 2 0 0 0 0 4v10a2 2 0 0 0 2 2h10V8M10 12h6M10 15h6"/>',arts:'<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-1.2-1-1.5-1-2.6 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'};
const TOP={cs:['Computer science & data','מחשבים ונתונים','#2f55d4'],eng:['Engineering','הנדסה','#f97316'],sci:['Math, physics & chemistry','מדעים מדויקים','#7c3aed'],life:['Life & brain sciences','מדעי החיים והמוח','#16a34a'],health:['Medicine & health','רפואה ובריאות','#e11d48'],soc:['Social sciences & education','מדעי החברה וחינוך','#0891b2'],biz:['Business & management','ניהול ועסקים','#ca8a04'],law:['Law & criminology','משפטים וקרימינולוגיה','#64748b'],hum:['Humanities & languages','מדעי הרוח ושפות','#c026d3'],rel:['Bible, Jewish & Islamic studies','מקרא, יהדות ואסלאם','#0d9488'],arts:['Arts, design & architecture','אמנויות ועיצוב','#db2777']};
const ST={in:['Clears','#16a34a'],close:['Close','#d97706'],out:['Short','#e5484d'],part:['Check','#6d5bd0']};
const SUB={math:['Math','מתמטיקה','Core'],eng:['English','אנגלית','Core'],heb:['Hebrew expression','הבעה עברית','Core'],hist:['History','היסטוריה','Core'],civ:['Civics','אזרחות','Core'],lit:['Literature','ספרות','Core'],bible:['Bible','תנ״ך','Core'],oral:['Oral Torah','תושב״ע','Jewish studies'],talmud:['Talmud','תלמוד','Jewish studies'],jth:['Jewish thought','מחשבת ישראל','Jewish studies'],arab:['Arabic (mother tongue)','ערבית','Arab & Druze'],hebar:['Hebrew for Arabic speakers','עברית לדוברי ערבית','Arab & Druze'],islam:['Islam','דת האסלאם','Arab & Druze'],christ:['Christianity','דת נוצרית','Arab & Druze'],druze:['Druze heritage','מורשת דרוזית','Arab & Druze'],phys:['Physics','פיזיקה','Sciences'],chem:['Chemistry','כימיה','Sciences'],bio:['Biology','ביולוגיה','Sciences'],cs:['Computer science','מדעי המחשב','Sciences'],env:['Environmental science','מדעי הסביבה','Sciences'],agri:['Agriculture','חקלאות','Sciences'],biot:['Biotechnology','ביוטכנולוגיה','Sciences'],swe:['Software engineering','הנדסת תוכנה','Technology'],elec:['Electronics & computers','אלקטרוניקה ומחשבים','Technology'],mech:['Mechatronics','מכטרוניקה','Technology'],infos:['Information systems','מערכות מידע','Technology'],psy:['Psychology','פסיכולוגיה','Social sciences'],socio:['Sociology','סוציולוגיה','Social sciences'],econ:['Economics','כלכלה','Social sciences'],geo:['Geography','גאוגרפיה','Social sciences'],comm:['Communication','תקשורת','Social sciences'],arab2:['Arabic (second language)','ערבית כשפה שנייה','Languages'],fr:['French','צרפתית','Languages'],ru:['Russian','רוסית','Languages'],es:['Spanish','ספרדית','Languages'],art:['Art','אמנות','Arts'],music:['Music','מוזיקה','Arts'],theat:['Theatre','תיאטרון','Arts'],film:['Film','קולנוע','Arts'],dance:['Dance','מחול','Arts'],pe:['Physical education','חינוך גופני','Other'],other:['Other elective','מקצוע בחירה אחר','Other']};
const TRACKS={gen:['General','ממלכתי','State schools',['math','eng','heb','hist','civ','lit','bible']],rel:['Religious','ממלכתי-דתי','State religious schools',['math','eng','heb','hist','civ','lit','bible','oral']],arab:['Arab','ערבי','Arabic-language schools',['math','eng','arab','hebar','hist','civ','islam']],druze:['Druze','דרוזי','Druze schools',['math','eng','arab','hebar','hist','civ','druze']]};
const LOCK=new Set(['math','eng','heb','hebar','arab','hist','civ']);
const DU={math:4,eng:4,arab:3,hebar:3};
const CITIES=[['Tel Aviv',32.08,34.78],['Jerusalem',31.78,35.22],['Haifa',32.8,34.99],['Be’er Sheva',31.25,34.79],['Rishon LeZion',31.97,34.8],['Petah Tikva',32.09,34.89],['Ashdod',31.8,34.65],['Netanya',32.33,34.86],['Holon',32.01,34.78],['Bnei Brak',32.08,34.83],['Ramat Gan',32.07,34.82],['Rehovot',31.89,34.81],['Ashkelon',31.67,34.57],['Herzliya',32.16,34.84],['Kfar Saba',32.18,34.91],['Ra’anana',32.18,34.87],['Modi’in',31.9,35.01],['Hadera',32.44,34.92],['Beit Shemesh',31.75,34.99],['Kiryat Gat',31.61,34.77],['Sderot',31.52,34.6],['Dimona',31.07,35.03],['Arad',31.26,35.21],['Rahat',31.39,34.75],['Eilat',29.56,34.95],['Nazareth',32.7,35.3],['Umm al-Fahm',32.52,35.15],['Tayibe',32.27,34.99],['Sakhnin',32.86,35.3],['Daliyat al-Karmel',32.69,35.05],['Yokneam',32.66,35.11],['Afula',32.61,35.29],['Karmiel',32.92,35.3],['Akko',32.93,35.08],['Nahariya',33.01,35.1],['Tiberias',32.79,35.53],['Safed',32.96,35.5],['Kiryat Shmona',33.21,35.57],['Ariel',32.1,35.17],['Ma’ale Adumim',31.78,35.3]];
const META={tau:['Tel Aviv',32.113,34.804,'TA'],huji:['Jerusalem',31.794,35.244,'HU'],tech:['Haifa',32.777,35.022,'Te'],bgu:['Be’er Sheva',31.262,34.801,'BG'],haifa:['Haifa',32.761,35.019,'Hf'],biu:['Ramat Gan',32.069,34.843,'BI'],ariel:['Ariel',32.104,35.207,'Ar']};
const MONO={reichman:'Re',openu:'OU',afeka:'Af',azrieli:'Az',sce:'SC',braude:'Br',hit:'HI',shenkar:'Sh',ono:'On',comas:'CM',ruppin:'Ru',sapir:'Sa',telhai:'TH',kinneret:'Ki',yvc:'YV',wgalil:'WG',ashkelon:'As',netanya:'Ne',peres:'Pe',jct:'JC',mta:'TY',hadassah:'Ha',bezalel:'Bz'};
const SLUG={comas:'management',yvc:'emekyezreel',wgalil:'westerngalilee',mta:'tlvyafo',hadassah:'hac'};
const CCOL=['#0e7490','#7c3aed','#be123c','#0369a1','#b45309','#15803d','#9333ea','#c2410c','#0f766e','#4338ca','#a21caf','#047857','#b91c1c','#1d4ed8','#854d0e','#6d28d9','#0891b2','#9f1239','#3f6212','#7e22ce','#0c4a6e','#a16207','#5b21b6'];
const STD_B={math:[35,15],eng:[25,12.5],core:[25,12.5],other:[20,10]},STD_CORE=['phys','chem','bio','lit','hist','bible','cs','arab'];
const INST=[];
window.MESILA_UNIS.forEach(u=>{const m=META[u.id];INST.push(Object.assign(u,{type:'uni',city:m[0],lat:m[1],lon:m[2],mono:m[3]}))});
window.MESILA_COLS.forEach((c,k)=>INST.push({...c,mono:MONO[c.id]||c.short.slice(0,2),c:CCOL[k%CCOL.length],bonus:STD_B,core:STD_CORE,cap:0,dp:0,span:40,yr:'2026–27',calc:null,pOf:(p,i)=>i.pm,
 f:c.note||'Admission by published routes: psychometric, bagrut only, or both together. Uses the standard bonus table (35 / 25 / 20).',src:[['Admission conditions (milgapo)','https://www.milgapo.co.il/institutions/'+(SLUG[c.id]||c.id)]],P:c.P.map(r=>[r[0],r[1],r[2],0,0,{nc:1,off:0,...r[3]}])}));
const IX={};INST.forEach(u=>IX[u.id]=u);
const PROGS=[];INST.forEach(u=>u.P.forEach(r=>PROGS.push({u,top:r[0],n:r[1],he:r[2],cut:r[3],low:r[4],...(r[5]||{})})));
const TOTAL=PROGS.length;
INST.forEach(u=>u.n=PROGS.filter(p=>p.u===u).length);
// ---------- emblems (original monograms, not the institutions' real logos)
function emblem(u,s){s=s||36;const fs=u.mono.length>2?11:14;
 return `<span class="em" title="${esc(u.name)}"><svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">${u.type==='uni'?`<rect x="1" y="1" width="38" height="38" rx="11" fill="${u.c}"/><path d="M7 31c4-4 9-5.5 13-5.5S29 27 33 31" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none" stroke-linecap="round"/>`:`<circle cx="20" cy="20" r="19" fill="${u.c}"/><circle cx="20" cy="20" r="15" stroke="#fff" stroke-opacity=".28" stroke-width="1.5" fill="none"/>`}<text x="20" y="${u.type==='uni'?22.5:24.5}" text-anchor="middle" font-family="Heebo,sans-serif" font-size="${fs}" font-weight="800" fill="#fff">${esc(u.mono)}</text></svg></span>`}
// ---------- state
const SAMPLE={track:'gen',rows:[{s:'math',u:4,g:86},{s:'eng',u:5,g:88},{s:'heb',u:2,g:82},{s:'hist',u:2,g:78},{s:'civ',u:2,g:85},{s:'lit',u:2,g:76},{s:'bible',u:2,g:72},{s:'bio',u:5,g:87},{s:'psy',u:5,g:91}],pm:640,pq:628,pv:652,q:121,v:127,e:129,noPsy:false,deg:false,dAvg:85,dEx:'1',home:'Tel Aviv',sample:true,stage:'track'};
const clone=o=>JSON.parse(JSON.stringify(o));
const LS={get:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
let S=LS.get('mesila.state')||clone(SAMPLE);if(!S.rows||!TRACKS[S.track])S=clone(SAMPLE);
let MODE=null,ACC=null,DOC=null,SAVED=null,acctReady=false;
const UI={top:'all',st:'all',inst:'all',q:'',sort:'t',more:{},sel:null,zoom:'all'};
// ---------- maths
function bonusFor(u,s,units,g){if(g<60||units<4)return 0;const cat=s==='math'?'math':s==='eng'?'eng':u.core.includes(s)?'core':'other';return u.bonus[cat][units>=5?0:1]}
function optimal(u,rows){
 const it=rows.map(r=>({s:r.s,units:r.u,w:r.u*(u.mathW&&r.s==='math'?2:1),v:Math.min(r.g,100)+bonusFor(u,r.s,r.u,r.g)}));
 const fix=it.filter(i=>LOCK.has(i.s)),opt=it.filter(i=>!LOCK.has(i.s)).slice(0,12);let best=null;
 for(let m=0;m<(1<<opt.length);m++){let W=0,T=0,U=0;const drop=[];
  for(const i of fix){W+=i.w;T+=i.w*i.v;U+=i.units}
  opt.forEach((i,k)=>{if(m>>k&1){W+=i.w;T+=i.w*i.v;U+=i.units}else drop.push(i.s)});
  if(U<20||!W)continue;const a=T/W;if(!best||a>best.raw+1e-9)best={raw:a,drop}}
 if(!best){let W=0,T=0;for(const i of it){W+=i.w;T+=i.w*i.v}best={raw:W?T/W:0,drop:[],short:true}}
 best.avg=r2(best.raw);best.used=u.cap?Math.min(best.avg,u.cap):best.avg;return best}
const canCalc=p=>!!p.u.calc&&!p.nc&&!['tests','po','be','open','ask'].includes(p.t)&&p.cut>0;
const mathOK=(req,c)=>!req||req.some(([u,g])=>c.mathU>=u&&c.mathG>=g);
function evalP(p,b,i,c,full){
 const u=p.u,P=u.pOf(p,i),calc=canCalc(p)&&P>0,score=calc?u.calc(b,P,p,c):null,ck=[];
 if(p.minP)ck.push(['P '+p.minP+'+',i.pm>=p.minP]);
 if(p.minQ)ck.push(['quant '+p.minQ+'+',i.q?i.q>=p.minQ:null]);
 if(p.mr)ck.push(['math '+p.mr.map(([a,g])=>a+'u '+g).join(' or '),mathOK(p.mr,c)]);
 if(p.pr)ck.push(['physics '+p.pr[0]+'u '+p.pr[1],c.phU>=p.pr[0]&&c.phG>=p.pr[1]]);
 if(p.mp)ck.push(['math units × grade '+p.mp+'+',c.mathU*c.mathG>=p.mp]);
 const ckOK=ck.every(x=>x[1]!==false),mOK=mathOK(p.mr,c),phOK=!p.pr||(c.phU>=p.pr[0]&&c.phG>=p.pr[1]),qOK=!p.minQ||!i.q||i.q>=p.minQ;
 let need=null;
 if(calc&&full){const ok=X=>u.calc(b,X,p,c)>=p.cut;if(!ok(800))need=Infinity;else{let lo=200,hi=800;while(lo<hi){const md=(lo+hi)>>1;if(ok(md))hi=md;else lo=md+1}need=Math.max(lo,p.minP||0)}}
 const rt=[];let st='out',via='';
 if(p.t==='open')return {P,score,need,st:'in',via:'open admission',ck,rt};
 if(p.t==='ask')return {P,score,need,st:'part',via:'',ck,rt};
 if(calc&&score>=p.cut&&ckOK)st='in';
 if(p.altP){const ok=i.pm>=p.altP&&mOK&&phOK&&qOK;rt.push(['Psychometric '+p.altP+'+',ok,i.pm>=p.altP-20,i.pm||'—']);if(st!=='in'&&ok){st='in';via='psychometric route'}}
 if(p.bOnly){const ok=b>=p.bOnly&&mOK&&phOK;rt.push(['Bagrut average '+p.bOnly+'+',ok,b>=p.bOnly-3,b?b.toFixed(1):'—']);if(st!=='in'&&ok){st='in';via='bagrut-only route'}}
 (p.cb||[]).forEach(([x,y])=>{const ok=i.pm>=x&&b>=y&&mOK&&phOK&&qOK;rt.push([`Psychometric ${x}+ and average ${y}+`,ok,i.pm>=x-20&&b>=y-3,(i.pm||'—')+' · '+(b?b.toFixed(1):'—')]);if(st!=='in'&&ok){st='in';via='psychometric + bagrut route'}});
 if(st!=='in'&&i.deg){if(p.dgLaw&&i.deg.avg*10+i.pm>=1475&&i.pm>=600){st='in';via='degree route'}else if(p.dg&&i.deg.avg>=p.dg&&(!p.d10||(calc&&score>=p.cut-10))){st='in';via='degree route (average '+p.dg+'+)'}}
 if(st!=='in'){
  if(calc){const zone=p.low?score>=p.low:false,mg=full&&isFinite(need)?P-need:null;st=(zone||(mg!==null&&mg>=-15)||(!full&&p.cut-score<=u.span*0.2))?'close':'out';if(!ckOK&&st==='close'&&!zone)st='out'}
  else if(canCalc(p))st=rt.some(r=>r[2])&&ckOK?'close':'out';
  else if(p.t==='tests')st=ckOK?'part':'out';
  else if(rt.length)st=rt.some(r=>r[2])&&ckOK?'close':'out';
  else st=ckOK&&ck.length?'part':'out';
 }
 return {P,score,need,st,via,ck,rt}}
function inputs(){const np=S.noPsy,pm=np?0:+S.pm||0,pq=np?0:+S.pq||pm,pv=np?0:+S.pv||pm,q=np?0:+S.q||0,v=np?0:+S.v||0,e=np?0:+S.e||0;
 return {pm,pq,pv,q,v,e,ph:q&&v&&e?Math.round(0.514554*(e+4*v+6*q)-65.3):pq,deg:S.deg?{avg:+S.dAvg||0,ex:S.dEx==='1'}:null}}
function context(){const rows=S.rows.filter(r=>+r.g>0&&+r.u>0).map(r=>({s:r.s,u:+r.u,g:Math.min(+r.g,100)}));
 const best=s=>rows.filter(r=>r.s===s).sort((a,b)=>b.u-a.u||b.g-a.g)[0],m=best('math'),ph=best('phys');
 return {rows,c:{mathU:m?m.u:0,mathG:m?m.g:0,phU:ph?ph.u:0,phG:ph?ph.g:0,mp5:!!(m&&m.u>=5&&m.g>=55&&ph&&ph.u>=5&&ph.g>=55)}}}
let R=null;
function compute(){const i=inputs(),{rows,c}=context(),av={};INST.forEach(u=>av[u.id]=optimal(u,rows));
 PROGS.forEach(p=>{p.r=evalP(p,av[p.u.id].used,i,c,true)});
 const n={in:0,close:0,out:0,part:0};PROGS.forEach(p=>n[p.r.st]++);
 INST.forEach(u=>{u.open=PROGS.filter(p=>p.u===u&&p.r.st==='in').length});
 R={i,c,av,n,rows};return R}
function seriesFor(){const {i,c,av}=R,d1=i.pq-i.pm,d2=i.pv-i.pm,d3=i.ph-i.pq,out=[];
 for(let P=450;P<=800;P+=10){const j={...i,pm:P,pq:P+d1,pv:P+d2,ph:P+d1+d3};let k=0;PROGS.forEach(p=>{if(evalP(p,av[p.u.id].used,j,c,false).st==='in')k++});out.push([P,k])}return out}
// ---------- persistence
let saveT=0,writing=false,again=false,lastSaved='';
function save(){LS.set('mesila.state',S);clearTimeout(saveT);if(MODE==='acct'&&DOC){$('#saved').textContent='Saving…';saveT=setTimeout(flush,900)}else $('#saved').textContent=MODE==='guest'?'Saved on this device':''}
async function flush(){if(!DOC)return;const js=JSON.stringify(S);if(js===lastSaved){$('#saved').textContent='Saved to your account';return}if(writing){again=true;return}writing=true;
 try{await DOC.set({state:JSON.parse(js),at:Date.now()});lastSaved=js;SAVED=JSON.parse(js);$('#saved').textContent='Saved to your account'}catch(e){$('#saved').textContent='Saved on this device only'}
 writing=false;if(again){again=false;flush()}}
// ---------- sign-in
function drawSiMap(){$('#siMap').innerHTML=`<path d="${outline()}" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.55)" stroke-width="1"/>`+INST.map(u=>{const [x,y]=proj(u.lat,u.lon);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${u.type==='uni'?2.6:1.8}" fill="${u.type==='uni'?'#ffd2c2':'#fff'}" opacity=".95"/>`}).join('')}
function initialsImg(name,col){const t=((name||'').trim().split(/\s+/).map(w=>w[0]||'').join('').slice(0,2)||'G').toUpperCase().replace(/[<>&"']/g,'');const c=/^#[0-9a-f]{3,8}$/i.test(col||'')?col:'#94a3b8';
 return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="${c}"/><text x="20" y="26" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#fff">${t}</text></svg>`)}
function avatarSrc(){const a=ACC&&ACC.avatar;return typeof a==='string'&&/^(https:|data:image\/)/.test(a)?a:initialsImg(ACC&&ACC.name,ACC&&ACC.color)}
function setImg(el,src,fb){el.onerror=()=>{el.onerror=null;el.src=fb};el.src=src}
function siState(){const b=$('#acctBtn');
 if(!acctReady){b.disabled=true;$('#acctSpin').hidden=false;$('#acctImg').hidden=true;$('#acctName').textContent='Checking your Claude account…';$('#acctSub').textContent='One moment';return}
 $('#acctSpin').hidden=true;
 if(ACC&&ACC.id){b.disabled=false;setImg($('#acctImg'),avatarSrc(),initialsImg(ACC.name,ACC.color));$('#acctImg').hidden=false;$('#acctName').textContent='Continue as '+(ACC.name||'your account');$('#acctSub').textContent=SAVED?'Your grades are saved here':'Saves your grades to your Claude account';
  if(SAVED){$('#siT').textContent='Welcome back'+(ACC.name?', '+ACC.name.split(' ')[0]:'');$('#siP').textContent='Pick up where you left off.'}}
 else{b.disabled=true;$('#acctImg').hidden=true;$('#acctName').textContent='Account sign-in unavailable here';$('#acctSub').textContent='It works when this page is opened in Claude'}}
async function initAccount(){
 try{const cl=window.claude;const user=cl&&cl.use?await cl.use('user'):null;
  if(user){const [uid,me]=await Promise.all([user.id(),user.me()]);if(uid){ACC={id:uid,name:(me&&me.name)||'',avatar:me&&me.avatarUrl,color:me&&me.color};
   const db=await cl.use('db');if(db){DOC=db.doc('data/users/'+uid+'/mesila');try{const sn=await DOC.get();if(sn.exists){const d=sn.data();if(d&&d.state&&d.state.rows){SAVED=clone(d.state);lastSaved=JSON.stringify(d.state)}}}catch(e){}}}}
 }catch(e){}
 acctReady=true;siState();
 if(LS.get('mesila.mode')==='acct'&&ACC&&ACC.id&&location.hash.replace('#','')!=='signin')enter('acct',true);
}
function enter(mode,auto){MODE=mode;LS.set('mesila.mode',mode);
 if(mode==='acct'&&SAVED){S=clone(SAVED);if(!TRACKS[S.track])S=clone(SAMPLE)}
 if(mode==='acct'&&!DOC)MODE='guest';
 drawMe();save();
 const h=location.hash.replace('#','');
 go(auto&&VIEWS.includes(h)&&h!=='signin'?h:(S.sample&&!SAVED?'track':'results'))}
function drawMe(){const acct=MODE==='acct'&&ACC;
 setImg($('#meImg'),acct?avatarSrc():initialsImg('Guest'),initialsImg(acct?ACC.name:'Guest',acct&&ACC.color));
 $('#meName').textContent=acct?(ACC.name||'Account').split(' ')[0]:'Guest';$('#mnName').textContent=acct?(ACC.name||'Your account'):'Guest';
 $('#mnMode').textContent=acct?'Signed in with Claude · grades saved to your account':'Guest · grades saved in this browser only'}
// ---------- routing
const VIEWS=['signin','track','bagrut','psy','degree','results','map','places'],STAGES=[['track','School'],['bagrut','Bagrut'],['psy','Psychometric'],['degree','Degree'],['results','Results']];
function go(v){if(location.hash!=='#'+v)location.hash=v;else route()}
function route(){{const m=$('#menu');if(m)m.hidden=true;const mb=$('#meb');if(mb)mb.setAttribute('aria-expanded','false')}let v=location.hash.replace('#','');if(!VIEWS.includes(v))v=MODE?'results':'signin';
 if(!MODE&&v!=='signin'){v='signin'}
 $('#signin').hidden=v!=='signin';$('#app').hidden=v==='signin';
 if(v==='signin'){siState();return}
 const isStage=STAGES.some(s=>s[0]===v)&&v!=='results';if(isStage&&S.stage!==v){S.stage=v;save()}
 $$('#nav a').forEach(a=>a.setAttribute('aria-current',(a.dataset.n==='calc'&&isStage)||a.dataset.n===v?'page':'false'));
 $('#nav a[data-n=calc]').href='#'+(S.stage&&S.stage!=='results'?S.stage:'track');
 compute();drawStepper(v);
 ({track:vTrack,bagrut:vBagrut,psy:vPsy,degree:vDegree,results:vResults,map:vMap,places:vPlaces})[v]();
 window.scrollTo(0,0)}
function drawStepper(v){const k=STAGES.findIndex(s=>s[0]===v);if(k<0){$('#stepper').innerHTML='';return}
 $('#stepper').innerHTML=`<div class="steps" role="list">${STAGES.map(([id,l],j)=>`${j?`<span class="sline${j<=k?' done':''}"></span>`:''}<button type="button" class="stp${j<k?' done':''}${j===k?' cur':''}" data-go="${id}" role="listitem" aria-current="${j===k?'step':'false'}"><i>${j<k?'✓':j+1}</i><span>${l}</span></button>`).join('')}</div>`}
// ---------- live panel
function ringSvg(n,size){const R0=40,C=2*Math.PI*R0;let off=0,s=`<circle cx="50" cy="50" r="${R0}" fill="none" stroke="var(--soft)" stroke-width="12"/>`;
 ['in','close','part','out'].forEach(k=>{const f=n[k]/TOTAL;if(!f)return;s+=`<circle cx="50" cy="50" r="${R0}" fill="none" stroke="${ST[k][1]}" stroke-width="12" stroke-dasharray="${(f*C).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off*C).toFixed(2)}" transform="rotate(-90 50 50)"/>`;off+=f});
 return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">${s}</svg>`}
function livePanel(){const {n,av}=R,unis=INST.filter(u=>u.type==='uni'&&u.id!=='openu'&&u.id!=='reichman');
 return `<aside class="live"><div class="card"><div class="big">${ringSvg(n,96)}<div><b>${n.in}</b><small>of ${TOTAL} programs open to you</small></div></div>
 <div class="sb"><div><b style="color:var(--in)">${n.in}</b>clear</div><div><b style="color:var(--close)">${n.close}</b>close</div><div><b style="color:var(--part)">${n.part}</b>check</div><div><b style="color:var(--out)">${n.out}</b>short</div></div></div>
 <div class="card"><h4 style="margin-bottom:12px">Your bagrut average at each university</h4><div class="avl">${unis.map(u=>{const a=av[u.id],w=a.avg?Math.max(2,Math.min(100,(a.used-70)/55*100)):0;return `<div class="avr" style="--c:${u.c}">${emblem(u,26)}<span class="bar"><i style="width:${w}%"></i></span><b>${a.avg?a.used.toFixed(1):'—'}</b></div>`}).join('')}</div>
 <p class="fine" style="margin:12px 0 0">Colleges use the standard bonus table: ${R.av.afeka.avg?R.av.afeka.used.toFixed(1):'—'}.</p></div>
 <button class="btn sec" type="button" data-go="results">See all results</button></aside>`}
function refreshLive(){compute();const l=$('.live');if(l)l.outerHTML=livePanel()}
// ---------- stage views
function vTrack(){$('#main').innerHTML=`<div class="stage"><div class="card"><h2>What kind of school did you go to?</h2><p class="sub">This sets your required bagrut subjects. You can add any elective on the next step.</p>
 <div class="opts" id="trk">${Object.entries(TRACKS).map(([k,t])=>`<button type="button" class="opt" data-tr="${k}" aria-pressed="${S.track===k}"><b>${t[0]}</b><span class="he"><bdi>${t[1]}</bdi></span><small>${t[2]} · ${t[3].map(s=>SUB[s][0]).join(', ').replace('Hebrew for Arabic speakers','Hebrew')}</small></button>`).join('')}</div>
 <label class="lbl" for="home">Where do you live?</label><select id="home">${CITIES.map(c=>`<option${c[0]===S.home?' selected':''}>${c[0]}</option>`).join('')}</select>
 <p class="fine">Used to sort campuses by distance on the map.</p>
 <div class="nextrow"><span></span><button class="btn" type="button" data-go="bagrut">Next: bagrut grades</button></div></div>${livePanel()}</div>`}
function vBagrut(){$('#main').innerHTML=`<div class="stage"><div class="card"><h2>Your bagrut grades</h2><p class="sub">Each institution adds its own bonuses and leaves out subjects that pull you down, as long as 20 units remain. Your required subjects always count.</p>
 ${S.sample?'<div class="banner">These are sample grades. Replace them with yours.<button type="button" data-act="restart">Clear them</button></div>':''}
 <table class="bt"><thead><tr><th>Subject</th><th>Units</th><th>Grade</th><th><span class="fine">Remove</span></th></tr></thead><tbody id="rows"></tbody></table>
 <div class="addr"><select id="addSel" aria-label="Add a subject"></select><button class="btn sec" id="add" type="button">Add subject</button></div>
 <p class="fine" id="raw"></p>
 <div class="nextrow"><button class="btn ghost" type="button" data-go="track">Back</button><button class="btn" type="button" data-go="psy">Next: psychometric</button></div></div>${livePanel()}</div>`;drawRows()}
function drawRows(){const req=TRACKS[S.track][3];
 $('#rows').innerHTML=S.rows.map((r,k)=>{const fixed=req.includes(r.s),relSel=S.track==='arab'&&(r.s==='islam'||r.s==='christ')&&k<req.length;
  const name=relSel?`<select data-k="s" aria-label="Religion subject">${['islam','christ'].map(s=>`<option value="${s}"${s===r.s?' selected':''}>${SUB[s][0]}</option>`).join('')}</select>`:`${SUB[r.s][0]}<small><bdi>${SUB[r.s][1]}</bdi></small>`;
  return `<tr data-i="${k}"><td class="sn">${name}</td><td class="u"><select data-k="u" aria-label="Units for ${SUB[r.s][0]}">${[1,2,3,4,5].map(n=>`<option${n==r.u?' selected':''}>${n}</option>`).join('')}</select></td><td class="g"><input type="number" inputmode="numeric" data-k="g" min="0" max="100" value="${r.g===''||r.g==null?'':r.g}" aria-label="Grade for ${SUB[r.s][0]}"></td><td>${fixed||relSel?'':`<button class="x" type="button" data-del="${k}" aria-label="Remove ${SUB[r.s][0]}">×</button>`}</td></tr>`}).join('');
 const groups={};Object.entries(SUB).forEach(([k,v])=>{(groups[v[2]]=groups[v[2]]||[]).push(k)});
 $('#addSel').innerHTML='<option value="">Choose a subject to add…</option>'+Object.entries(groups).map(([g,ks])=>`<optgroup label="${g}">${ks.map(k=>`<option value="${k}">${SUB[k][0]} · ${SUB[k][1]}</option>`).join('')}</optgroup>`).join('');
 rawNote()}
function rawNote(){const el=$('#raw');if(!el)return;const rows=R.rows,tu=rows.reduce((s,r)=>s+r.u,0),ra=tu?rows.reduce((s,r)=>s+r.u*r.g,0)/tu:0,d=R.av.tau.drop;
 el.textContent=tu?`${tu} units · plain average ${ra.toFixed(1)}${tu<20?' · universities need at least 20 units':''}${d.length?' · Tel Aviv leaves out '+d.map(s=>SUB[s][0]).join(', '):''}`:'Enter your grades to start.'}
function vPsy(){$('#main').innerHTML=`<div class="stage"><div class="card"><h2>Psychometric scores</h2><p class="sub">Your score report lists three general scores and three section scores. Only the general score is required; the rest sharpen the results.</p>
 <label class="chk"><input type="checkbox" id="noPsy"${S.noPsy?' checked':''}> I haven't taken the psychometric yet</label>
 <div id="psyF"${S.noPsy?' hidden':''}>
 <label class="lbl" for="pm">General score (רב-תחומי)</label><div class="rng"><input type="range" id="pmR" min="200" max="800" value="${S.pm||200}" aria-label="General score slider"><input type="number" id="pm" min="200" max="800" value="${S.pm}"></div>
 <label class="lbl" for="pq">Quantitative emphasis (דגש כמותי)</label><div class="rng"><input type="range" id="pqR" min="200" max="800" value="${S.pq||200}" aria-label="Quantitative-emphasis slider"><input type="number" id="pq" min="200" max="800" value="${S.pq}"></div>
 <label class="lbl" for="pv">Verbal emphasis (דגש מילולי)</label><div class="rng"><input type="range" id="pvR" min="200" max="800" value="${S.pv||200}" aria-label="Verbal-emphasis slider"><input type="number" id="pv" min="200" max="800" value="${S.pv}"></div>
 <span class="lbl">Section scores, 50–150</span><div class="g3"><div><label class="fine" for="q">Quantitative</label><input type="number" id="q" min="50" max="150" value="${S.q}"></div><div><label class="fine" for="v">Verbal</label><input type="number" id="v" min="50" max="150" value="${S.v}"></div><div><label class="fine" for="e">English</label><input type="number" id="e" min="50" max="150" value="${S.e}"></div></div></div>
 <p class="fine" id="psyNote">${S.noPsy?'Without a score, only bagrut-only, degree and open-admission routes count.':''}</p>
 <div class="nextrow"><button class="btn ghost" type="button" data-go="bagrut">Back</button><button class="btn" type="button" data-go="degree">Next: previous degree</button></div></div>${livePanel()}</div>`}
function vDegree(){$('#main').innerHTML=`<div class="stage"><div class="card"><h2>Do you already have a degree?</h2><p class="sub">Some programs admit graduates on their degree average. Skip this if you're coming straight from school.</p>
 <div class="opts"><button type="button" class="opt" data-deg="0" aria-pressed="${!S.deg}"><b>No degree</b><small>Coming from school, the army or a mechina</small></button><button type="button" class="opt" data-deg="1" aria-pressed="${!!S.deg}"><b>I have a bachelor's degree</b><small>Or I'm finishing one</small></button></div>
 <div class="g2" id="degF"${S.deg?'':' hidden'}><div><label class="lbl" for="dAvg">Degree average</label><input type="number" id="dAvg" min="0" max="100" value="${S.dAvg}"></div><div><label class="lbl" for="dEx">Field</label><select id="dEx"><option value="1"${S.dEx==='1'?' selected':''}>Exact sciences or engineering</option><option value="0"${S.dEx==='0'?' selected':''}>Another field</option></select></div></div>
 <p class="fine">Degree routes in the data: Tel Aviv law (10 × average + psychometric ≥ 1475), Tel Aviv computer science and computer engineering, and Haifa's prior-degree routes.</p>
 <div class="nextrow"><button class="btn ghost" type="button" data-go="psy">Back</button><button class="btn" type="button" data-go="results">See my results</button></div></div>${livePanel()}</div>`}
// ---------- results
function card(p){const u=p.u,r=p.r,s=ST[r.st];let body='';
 if(canCalc(p)&&r.score!=null){const sp=u.span,lo=p.low||p.cut-sp*0.25,mn=Math.min(lo-sp,r.score),mx=Math.max(p.cut+sp,r.score),W=mx-mn,pc=x=>((x-mn)/W*100).toFixed(1),f=x=>u.dp?x.toFixed(u.dp):String(Math.round(x*100)/100);
  body+=`<div class="gauge" aria-hidden="true"><i class="z za" style="left:${pc(lo)}%;width:${(pc(p.cut)-pc(lo)).toFixed(1)}%"></i><i class="z zg" style="left:${pc(p.cut)}%;right:0"></i><b class="mk" style="left:${pc(r.score)}%"></b></div>
  <div class="nums"><span>You <b>${f(r.score)}</b></span>${p.low?`<span>${p.ivw?'Interview line':'Reject'} <b>${f(p.low)}</b></span>`:''}<span>Accept <b>${f(p.cut)}</b></span></div>`}
 if(r.rt.length)body+=`<ul class="rts">${r.rt.map(([t,ok,near,v])=>`<li class="${ok?'ok':near?'near':''}">${t}<span>you ${v}</span></li>`).join('')}</ul>`;
 const ck=r.ck.filter(([t])=>!(r.rt.length&&/^P /.test(t)&&p.altP)).map(([t,ok])=>`<li class="${ok===true?'ok':ok===false?'no':''}">${ok===true?'✓':ok===false?'✗':'?'} ${t}</li>`).join('');
 if(ck)body+=`<ul class="ck">${ck}</ul>`;
 let foot='';
 if(r.via)foot=`<p class="pf">In via <b>${r.via}</b></p>`;
 else if(canCalc(p)&&r.need!=null)foot=`<p class="pf">${r.need===Infinity?'Out of reach with psychometric alone':`Psychometric needed <b>${r.need}</b>${r.need<=r.P?' ✓':` (+${r.need-r.P})`}`}</p>`;
 else if(p.t==='ask')foot='<p class="pf m">Cutoffs are given at an admissions meeting.</p>';
 else if(p.t==='tests')foot=`<p class="pf m">${r.st==='part'?'Decided by tests, portfolio or interview':'Below the published minimum'}</p>`;
 else if(!r.rt.length&&r.st==='part')foot='<p class="pf m">Meets the published minimums; the final score isn’t public</p>';
 if(p.note)foot+=`<p class="pf m">${esc(p.note)}</p>`;
 const tags=[p.yr||u.yr,p.off?'official':'third-party'].join(' · ');
 return `<article class="pc"><div class="ph">${emblem(u,34)}<div class="t"><h4>${esc(p.n)}</h4><div class="i">${esc(u.short)} · <bdi>${p.he}</bdi></div></div><span class="pill" style="--sc:${s[1]}">${s[0]}</span></div>${body}${foot}<p class="fine" style="margin:0">${tags}</p></article>`}
function vResults(){const {n}=R,ser=seriesFor(),nxt=ser.find(([P,k])=>P>R.i.pm&&k>n.in);
 const bestU=[...INST].sort((a,b)=>b.open-a.open||a.name.localeCompare(b.name))[0];
 const miss=PROGS.filter(p=>p.r.st!=='in'&&canCalc(p)&&p.r.need!=null&&isFinite(p.r.need)&&p.r.need>p.r.P&&p.r.need<=800&&!p.r.ck.some(c=>!c[1])).sort((a,b)=>(a.r.need-a.r.P)-(b.r.need-b.r.P))[0];
 const mx=Math.max(...ser.map(s=>s[1]),1),mn=Math.min(...ser.map(s=>s[1])),X=P=>(P-450)/350*200,Y=k=>40-(k-mn)/Math.max(1,mx-mn)*36;
 let d=`M0,${Y(ser[0][1])}`;ser.slice(1).forEach(([P,k])=>{d+=`H${X(P)}V${Y(k)}`});
 $('#main').innerHTML=`<div class="sech"><h2>${n.in} programs are open to you</h2><span class="mute">out of ${TOTAL} at ${INST.length} institutions</span></div>
 <div class="kpis"><div class="kpi hi"><span>Open now</span><b>${n.in}</b><span>${n.close} more are close or on a waitlist</span></div>
 <div class="kpi"><span>Most options at</span><b style="font-size:22px">${esc(bestU.name)}</b><span>${bestU.open} of ${bestU.n} programs</span></div>
 <div class="kpi"><span>Closest miss</span><b style="font-size:22px">${miss?esc(miss.u.short+' · '+miss.n):'—'}</b><span>${miss?`needs psychometric ${miss.r.need} (+${miss.r.need-miss.r.P})`:'nothing just out of reach'}</span></div>
 <div class="kpi"><span>${nxt?`+${nxt[0]-R.i.pm} psychometric points`:'Psychometric'}</span><b style="font-size:22px">${nxt?`opens ${nxt[1]-n.in} more`:'no easy gains'}</b><svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path d="${d}V44H0Z" fill="color-mix(in srgb,var(--brand) 14%,transparent)"/><path d="${d}" fill="none" stroke="var(--brand)" stroke-width="2"/>${R.i.pm>=450?`<line x1="${X(R.i.pm)}" x2="${X(R.i.pm)}" y1="0" y2="44" stroke="var(--acc)" stroke-width="2"/>`:''}</svg></div></div>
 <div class="fb" id="fb"></div><div id="list"></div>`;drawFilters();drawList()}
function drawFilters(){const tc=k=>PROGS.filter(p=>instOK(p)&&(k==='all'||p.top===k)).length;
 $('#fb').innerHTML=`<div class="f1"><input type="search" id="q2" placeholder="Search programs in English or Hebrew" value="${esc(UI.q)}" aria-label="Search programs"><select id="instSel" aria-label="Institution"><option value="all">All institutions</option><option value="uni"${UI.inst==='uni'?' selected':''}>Universities only</option><option value="col"${UI.inst==='col'?' selected':''}>Colleges only</option><optgroup label="Universities">${INST.filter(u=>u.type==='uni').map(u=>`<option value="${u.id}"${UI.inst===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</optgroup><optgroup label="Colleges">${INST.filter(u=>u.type==='col').map(u=>`<option value="${u.id}"${UI.inst===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</optgroup></select><select id="sort" aria-label="Order"><option value="t"${UI.sort==='t'?' selected':''}>Group by field</option><option value="u"${UI.sort==='u'?' selected':''}>Group by institution</option><option value="m"${UI.sort==='m'?' selected':''}>Best chances first</option></select></div>
 <div class="chips">${[['all','All fields',null,'#0f172a'],...Object.entries(TOP).map(([k,t])=>[k,t[0],ICON[k],t[2]])].filter(([k])=>k==='all'||UI.top===k||tc(k)>0).map(([k,l,ic,c])=>`<button type="button" class="chip" style="--c:${c}" data-t="${k}" aria-pressed="${UI.top===k}">${ic?`<svg viewBox="0 0 24 24">${ic}</svg>`:''}${l} <span class="n">${tc(k)}</span></button>`).join('')}</div>
 <div class="seg" role="group" aria-label="Status">${[['all','Everything','var(--mute)'],['in','Clears','var(--in)'],['close','Close','var(--close)'],['part','Check','var(--part)'],['out','Short','var(--out)']].map(([k,l,c])=>`<button type="button" style="--c:${c}" data-s="${k}" aria-pressed="${UI.st===k}"><i></i>${l}${k==='all'?'':' '+PROGS.filter(p=>instOK(p)&&p.r.st===k).length}</button>`).join('')}</div>`}
const instOK=p=>UI.inst==='all'||(UI.inst==='uni'?p.u.type==='uni':UI.inst==='col'?p.u.type==='col':p.u.id===UI.inst);
const SO={in:0,close:1,part:2,out:3};
const mg=p=>p.r.st==='in'?1000:p.r.st==='close'?500-(p.r.need&&isFinite(p.r.need)?p.r.need-p.r.P:20):p.r.st==='part'?0:-500-(p.r.need&&isFinite(p.r.need)?p.r.need-p.r.P:300);
function drawList(){const q=UI.q.trim().toLowerCase(),vis=PROGS.filter(p=>instOK(p)&&(UI.top==='all'||p.top===UI.top)&&(UI.st==='all'||p.r.st===UI.st)&&(!q||p.n.toLowerCase().includes(q)||p.he.includes(UI.q.trim())||p.u.name.toLowerCase().includes(q)));
 if(!vis.length){$('#list').innerHTML='<div class="empty">No programs match these filters.</div>';return}
 const sortIn=a=>a.sort((x,y)=>SO[x.r.st]-SO[y.r.st]||(x.u.type===y.u.type?0:x.u.type==='uni'?-1:1)||x.u.name.localeCompare(y.u.name)||x.n.localeCompare(y.n));
 let groups;
 if(UI.sort==='m')groups=[['all','All matches','',ICON.cs,'var(--brand)',[...vis].sort((a,b)=>mg(b)-mg(a))]];
 else if(UI.sort==='u')groups=INST.map(u=>[u.id,u.name,u.he,null,u.c,sortIn(vis.filter(p=>p.u===u)),u]);
 else groups=Object.entries(TOP).map(([k,t])=>[k,t[0],t[1],ICON[k],t[2],sortIn(vis.filter(p=>p.top===k))]);
 $('#list').innerHTML=groups.filter(g=>g[5].length).map(([k,nm,he,ic,c,ps,u])=>{const lim=UI.more[k]?ps.length:8,o=ps.filter(p=>p.r.st==='in').length;
  return `<section class="grp"><div class="gh" style="--c:${c}">${u?emblem(u,40):`<span class="ic"><svg viewBox="0 0 24 24">${ic}</svg></span>`}<h3>${esc(nm)} ${he?`<bdi class="he">${he}</bdi>`:''}</h3><span class="cnt">${o} of ${ps.length} open</span></div><div class="grid">${ps.slice(0,lim).map(card).join('')}</div>${ps.length>lim?`<button class="btn sec more" type="button" data-more="${k}">Show all ${ps.length}</button>`:''}</section>`}).join('')}
// ---------- map
const PX=85.26,LON0=34.15,LAT0=33.4,proj=(la,lo)=>[(lo-LON0)*PX,(LAT0-la)*100];
const OUT=[[33.093,35.105],[33.005,35.095],[32.925,35.07],[32.86,35.04],[32.83,34.98],[32.825,34.955],[32.72,34.945],[32.6,34.91],[32.5,34.885],[32.33,34.845],[32.17,34.8],[32.09,34.77],[32.05,34.75],[31.95,34.69],[31.82,34.635],[31.67,34.55],[31.53,34.44],[31.4,34.33],[31.32,34.24],[31.22,34.27],[30.88,34.42],[30.5,34.56],[30.05,34.7],[29.7,34.83],[29.49,34.9],[29.53,34.96],[29.56,34.98],[29.85,35.06],[30.1,35.15],[30.4,35.17],[30.7,35.28],[30.95,35.38],[31.1,35.46],[31.4,35.55],[31.78,35.55],[32.1,35.53],[32.3,35.56],[32.62,35.57],[32.7,35.64],[32.88,35.65],[33.0,35.62],[33.15,35.62],[33.28,35.58],[33.2,35.5],[33.1,35.4],[33.08,35.3],[33.07,35.2]];
const outline=()=>'M'+OUT.map(([a,b])=>proj(a,b).map(v=>v.toFixed(1)).join(',')).join('L')+'Z';
const ZOOMS={all:['All Israel',[-6,-22,148,426]],north:['North',[52,0,88,102]],center:['Center',[38,88,64,72]],jlm:['Jerusalem',[64,140,42,38]],south:['South',[16,158,96,100]]};
let VB=ZOOMS.all[1].slice(),anim=0;
const dist=(a,b,c,d)=>{const R6=6371,t=x=>x*Math.PI/180,dl=t(c-a),dn=t(d-b),h=Math.sin(dl/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(dn/2)**2;return 2*R6*Math.asin(Math.sqrt(h))};
const home=()=>CITIES.find(c=>c[0]===S.home)||CITIES[0];
function vMap(){$('#main').innerHTML=`<div class="sech"><h2>Every campus on the map</h2><span class="mute">Distances are straight-line from ${esc(S.home)}. Change your town on the <a href="#track">first step</a>.</span></div>
 <div class="mapl"><div class="mapc"><div class="zoom">${Object.entries(ZOOMS).map(([k,z])=>`<button type="button" data-z="${k}" aria-pressed="${UI.zoom===k}">${z[0]}</button>`).join('')}</div><svg id="msvg" role="img" aria-label="Map of campuses"></svg><div class="mleg"><span><i style="border-radius:3px;background:var(--brand)"></i>University</span><span><i style="border-radius:50%;background:var(--acc)"></i>College</span><span><i style="border-radius:50%;background:var(--ink);width:9px;height:9px"></i>Home</span></div></div>
 <div><div id="det"></div><div class="list" id="mlist"></div></div></div>`;
 drawMapList();drawMap();const ro=new ResizeObserver(drawMap);ro.observe($('#msvg'))}
function drawMap(){const sv=$('#msvg');if(!sv)return;const W=sv.clientWidth,H=sv.clientHeight;if(!W||!H)return;
 const [vx,vy,vw,vh]=VB,k=Math.max(vw/W,vh/H),hm=home(),[hx,hy]=proj(hm[1],hm[2]),zoomed=UI.zoom!=='all';
 sv.setAttribute('viewBox',VB.map(v=>v.toFixed(2)).join(' '));
 let s=`<path d="${outline()}" fill="var(--land)" stroke="color-mix(in srgb,var(--brand) 35%,var(--line))" stroke-width="${(1.2*k).toFixed(2)}" stroke-linejoin="round"/>`;
 const [gx,gy]=proj(32.82,35.59),[dx,dy]=proj(31.5,35.48);
 s+=`<ellipse cx="${gx}" cy="${gy}" rx="4.2" ry="9" fill="var(--sea)"/><ellipse cx="${dx}" cy="${dy}" rx="4.6" ry="25" fill="var(--sea)"/>`;
 if(!zoomed)s+=`<text x="0" y="92" style="font:italic ${(11*k).toFixed(1)}px Heebo;fill:var(--mute)">Mediterranean<tspan x="0" dy="${(13*k).toFixed(1)}">Sea</tspan></text>`;
 s+=`<circle cx="${hx}" cy="${hy}" r="${(5*k).toFixed(2)}" fill="var(--ink)" stroke="var(--land)" stroke-width="${(2*k).toFixed(2)}"/>`;
 const pins=[...INST].sort((a,b)=>(a.id===UI.sel)-(b.id===UI.sel));
 const pr=u=>{const [x,y]=proj(u.lat,u.lon),r=(u.id===UI.sel?11:u.type==='uni'?8:6.5)*k;return {u,x,y,r}};
 const P2=pins.map(pr),boxes=P2.map(({x,y,r})=>[x-r,y-r,x+r,y+r]),labs=[],fs=12*k;
 boxes.push([hx-5*k,hy-5*k,hx+5*k,hy+5*k]);
 if(!zoomed)boxes.push([0,92-10*k,0+80*k,92+16*k]);
 const zb=sv.parentNode.querySelector('.zoom'),tp=((zb?zb.offsetTop+zb.offsetHeight:50)+6)*k;
 const hit=b=>boxes.some(o=>b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1])||b[0]<vx||b[2]>vx+vw||b[1]<vy+tp||b[3]>vy+vh;
 const order=[...P2].sort((a,b)=>(b.u.id===UI.sel)-(a.u.id===UI.sel)||(a.u.type==='uni'?0:1)-(b.u.type==='uni'?0:1)||b.u.n-a.u.n);
 order.forEach(({u,x,y,r})=>{const t=u.short,w=t.length*fs*0.56+2*k,h=fs*1.1,g=3*k;
  const c=[[x+r+g,y-h/2,'start'],[x-r-g-w,y-h/2,'end'],[x-w/2,y-r-g-h,'middle'],[x-w/2,y+r+g,'middle']];
  for(const [bx,by,an] of c){const bb=[bx,by,bx+w,by+h];if(!hit(bb)){boxes.push(bb);const tx=an==='start'?bx:an==='end'?bx+w:bx+w/2;labs.push(`<text class="mlab${u.id===UI.sel?' sel':''}" x="${tx.toFixed(2)}" y="${(by+h*0.8).toFixed(2)}" text-anchor="${an}" style="font-size:${fs.toFixed(2)}px;stroke-width:${(3*k).toFixed(2)}px">${esc(t)}</text>`);break}}});
 s+=P2.map(({u,x,y,r})=>{const shape=u.type==='uni'?`<rect x="${(x-r).toFixed(2)}" y="${(y-r).toFixed(2)}" width="${(2*r).toFixed(2)}" height="${(2*r).toFixed(2)}" rx="${(r*0.35).toFixed(2)}" fill="${u.c}" stroke="#fff" stroke-width="${(2*k).toFixed(2)}"/>`:`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" fill="${u.c}" stroke="#fff" stroke-width="${(2*k).toFixed(2)}"/>`;
  return `<g class="pin" data-pin="${u.id}" tabindex="0" role="button" aria-label="${esc(u.name)}">${shape}<title>${esc(u.name)} · ${esc(u.city)}</title></g>`}).join('')+labs.join('');
 sv.innerHTML=s}
function zoomTo(z){UI.zoom=z;$$('[data-z]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.z===z));const from=VB.slice(),to=ZOOMS[z][1],t0=performance.now(),D=matchMedia('(prefers-reduced-motion: reduce)').matches?0:450;cancelAnimationFrame(anim);
 const step=t=>{const f=D?1:Math.min(1,(t-t0)/D),e=1-(1-f)**3;VB=from.map((v,i)=>v+(to[i]-v)*e);drawMap();if(f<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)}
function drawMapList(){const hm=home();const list=[...INST].map(u=>({u,d:dist(hm[1],hm[2],u.lat,u.lon)})).sort((a,b)=>a.d-b.d);
 $('#mlist').innerHTML=list.map(({u,d})=>`<button type="button" class="li" data-pin="${u.id}" aria-pressed="${UI.sel===u.id}">${emblem(u,40)}<span><b>${esc(u.name)}</b><small>${esc(u.city)} · ${u.type==='uni'?'University':'College'}</small><span class="prog" style="display:block;margin-top:6px"><i style="width:${(u.open/u.n*100).toFixed(0)}%"></i></span></span><span class="d"><b>${Math.round(d)} km</b><br>${u.open}/${u.n} open</span></button>`).join('');
 const u=IX[UI.sel];
 $('#det').innerHTML=u?`<div class="det"><div style="display:flex;gap:14px;align-items:center">${emblem(u,52)}<div><h3>${esc(u.name)}</h3><div class="mute"><bdi>${u.he}</bdi> · ${esc(u.city)}</div></div></div>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag">${u.type==='uni'?'University':'Academic college'}</span><span class="tag">${Math.round(dist(hm[1],hm[2],u.lat,u.lon))} km from ${esc(S.home)}</span><span class="tag">Your average ${R.av[u.id].avg?R.av[u.id].used.toFixed(1):'—'}</span></div>
 <div><div class="nums" style="margin-bottom:6px"><span><b>${u.open}</b> of ${u.n} programs open</span></div><div class="prog"><i style="width:${(u.open/u.n*100).toFixed(0)}%"></i></div></div>
 <p class="fine" style="margin:0">${esc(u.f)}</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" type="button" data-show="${u.id}">View its programs</button><button class="btn sec" type="button" data-pin="">Close</button></div></div>`:''}
// ---------- institutions
function vPlaces(){const hm=home();
 $('#main').innerHTML=`<div class="sech"><h2>Universities and colleges</h2><span class="mute">${INST.filter(u=>u.type==='uni').length} universities · ${INST.filter(u=>u.type==='col').length} colleges · emblems are illustrative, not official logos</span></div>
 ${['uni','col'].map(t=>`<h3 style="margin:22px 0 12px;font-size:20px">${t==='uni'?'Universities':'Academic colleges'}</h3><div class="pl">${INST.filter(u=>u.type===t).map(u=>`<article class="pcard"><div class="hd">${emblem(u,48)}<div><h3>${esc(u.name)}</h3><div class="fine"><bdi>${u.he}</bdi></div></div></div>
 <div class="meta"><span>${esc(u.city)}</span><span>·</span><span>${Math.round(dist(hm[1],hm[2],u.lat,u.lon))} km away</span><span>·</span><span>average ${R.av[u.id].avg?R.av[u.id].used.toFixed(1):'—'}</span></div>
 <div><div class="nums" style="margin-bottom:6px"><span><b>${u.open}</b> of ${u.n} open</span><span>${Math.round(u.open/u.n*100)}%</span></div><div class="prog"><i style="width:${(u.open/u.n*100).toFixed(0)}%"></i></div></div>
 <div class="pact"><button class="btn sec sm" type="button" data-show="${u.id}">Programs</button><button class="btn ghost sm" type="button" data-onmap="${u.id}">On the map</button></div></article>`).join('')}</div>`).join('')}
 <h3 style="margin:32px 0 12px;font-size:20px">Formulas and sources</h3><div class="pl">${INST.filter(u=>u.src).map(u=>`<div class="pcard" style="gap:8px"><b>${esc(u.name)}</b><span class="fine">${esc(u.f)}</span><span class="fine">${u.src.map(([t,h])=>`<a href="${h}">${esc(t)}</a>`).join(' · ')}</span></div>`).join('')}</div>
 <p class="fine" style="margin-top:20px">Estimates for 2026–27. Cutoffs move during registration and each year; the institution's own calculator decides. "Third-party" programs come from milgapo.co.il, which compiles the institutions' published tables.</p>`}
// ---------- events
let raf=0;const later=f=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(f)};
function setTrack(t){const old=S.rows,oldReq=TRACKS[S.track][3];S.track=t;const req=TRACKS[t][3];
 const rows=req.map(s=>{const o=old.find(r=>r.s===s)||(s==='islam'?old.find(r=>r.s==='christ'):null);return o?{...o}:{s,u:DU[s]||2,g:''}});
 old.forEach((r,k)=>{const wasReq=k<oldReq.length&&(oldReq.includes(r.s)||r.s==='christ');if(!wasReq&&!req.includes(r.s))rows.push({...r})});S.rows=rows}
document.addEventListener('click',ev=>{const b=ev.target.closest('button,[data-pin]');
 if(!$('#menu').hidden&&!ev.target.closest('.me')){$('#menu').hidden=true;$('#meb').setAttribute('aria-expanded','false')}
 if(!b)return;const d=b.dataset;
 if(b.id==='acctBtn'){enter('acct');return}
 if(b.id==='guestBtn'){enter('guest');return}
 if(b.id==='meb'){const m=$('#menu');m.hidden=!m.hidden;b.setAttribute('aria-expanded',String(!m.hidden));return}
 if(d.go){go(d.go);return}
 if(d.act){$('#menu').hidden=true;
  if(d.act==='out'){LS.del('mesila.mode');MODE=null;go('signin');return}
  if(d.act==='sample'){S=clone(SAMPLE);save();route();return}
  if(d.act==='restart'){const t=S.track;S={...clone(SAMPLE),track:t,home:S.home,sample:false,rows:TRACKS[t][3].map(s=>({s,u:DU[s]||2,g:''})),noPsy:false};save();go('bagrut');route();return}
  if(d.act==='forget'){LS.del('mesila.state');if(DOC)DOC.delete().catch(()=>{});SAVED=null;S=clone(SAMPLE);$('#saved').textContent='Saved data deleted';route();return}}
 if(d.tr){setTrack(d.tr);save();$$('[data-tr]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.tr===S.track));refreshLive();return}
 if(d.deg!=null){S.deg=d.deg==='1';save();$$('[data-deg]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.deg===d.deg));$('#degF').hidden=!S.deg;refreshLive();return}
 if(d.del!=null){S.rows.splice(+d.del,1);S.sample=false;save();compute();drawRows();refreshLive();return}
 if(b.id==='add'){const s=$('#addSel').value;if(!s){$('#addSel').focus();return}S.rows.push({s,u:5,g:''});save();compute();drawRows();const ins=$$('#rows input');ins[ins.length-1].focus();return}
 if(d.t){UI.top=d.t;UI.more={};drawFilters();drawList();return}
 if(d.s){UI.st=d.s;drawFilters();drawList();return}
 if(d.more){UI.more[d.more]=1;drawList();return}
 if(d.z){zoomTo(d.z);return}
 if(d.pin!=null){UI.sel=d.pin||null;drawMapList();drawMap();if(UI.sel&&innerWidth<1000)$('#det').scrollIntoView({behavior:'smooth',block:'start'});return}
 if(d.show){UI.inst=d.show;UI.top='all';UI.st='all';UI.q='';UI.sort='t';go('results');return}
 if(d.onmap){UI.sel=d.onmap;go('map');return}
});
document.addEventListener('keydown',ev=>{if((ev.key==='Enter'||ev.key===' ')&&ev.target.matches&&ev.target.matches('g.pin')){ev.preventDefault();ev.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}if(ev.key==='Escape'&&!$('#menu').hidden){$('#menu').hidden=true}});
document.addEventListener('input',ev=>{const t=ev.target,tr=t.closest&&t.closest('tr[data-i]');
 if(tr){const r=S.rows[+tr.dataset.i];if(t.dataset.k==='s')r.s=t.value;else r[t.dataset.k]=t.value===''?'':+t.value;S.sample=false;save();later(()=>{compute();rawNote();refreshLive()});return}
 if(/^p[mqv]R$/.test(t.id)){const k=t.id.slice(0,2);S[k]=+t.value;$('#'+k).value=t.value}
 else if(['pm','pq','pv','q','v','e','dAvg'].includes(t.id)){S[t.id]=t.value===''?'':+t.value;if($('#'+t.id+'R'))$('#'+t.id+'R').value=t.value||200}
 else if(t.id==='noPsy'){S.noPsy=t.checked;$('#psyF').hidden=S.noPsy;$('#psyNote').textContent=S.noPsy?'Without a score, only bagrut-only, degree and open-admission routes count.':''}
 else if(t.id==='dEx'||t.id==='home'){S[t.id]=t.value}
 else if(t.id==='q2'){UI.q=t.value;later(drawList);return}
 else return;
 save();later(refreshLive)});
document.addEventListener('change',ev=>{const t=ev.target;
 if(t.id==='instSel'){UI.inst=t.value;UI.more={};drawFilters();drawList()}
 else if(t.id==='sort'){UI.sort=t.value;UI.more={};drawList()}
 else if(t.id==='home'){S.home=t.value;save()}
 else if(t.closest&&t.closest('tr[data-i]')&&t.tagName==='SELECT'){const r=S.rows[+t.closest('tr[data-i]').dataset.i];if(t.dataset.k==='s')r.s=t.value;else r.u=+t.value;S.sample=false;save();compute();rawNote();refreshLive()}});
window.addEventListener('hashchange',route);
// ---------- boot
{const e=$('#siCount');if(e)e.textContent=TOTAL+' programs'}
drawSiMap();
const lm=LS.get('mesila.mode');
if(lm==='guest'){MODE='guest';drawMe();save()}
route();
initAccount();
}
