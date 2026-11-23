{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const r2=x=>Math.round(x*100)/100;
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ---------- reference data
const ICON={eng:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/>',cs:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',sci:'<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',life:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',health:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',soc:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 14.2c3 0 6 1.6 6 4.8"/>',biz:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',law:'<path d="M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',hum:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 10h5"/>',rel:'<path d="M7 4h11a2 2 0 0 1 0 4H7zM7 4a2 2 0 0 0 0 4v10a2 2 0 0 0 2 2h10V8M10 12h6M10 15h6"/>',arts:'<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-1.2-1-1.5-1-2.6 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'};
const TOP={cs:['Computer science & data','מחשבים ונתונים','#4d7cff'],eng:['Engineering','הנדסה','#ff8a3d'],sci:['Math, physics & chemistry','מדעים מדויקים','#b26bff'],life:['Life & brain sciences','מדעי החיים והמוח','#8fe05a'],health:['Medicine & health','רפואה ובריאות','#ff4fa3'],soc:['Social sciences & education','מדעי החברה וחינוך','#22d3ee'],biz:['Business & management','ניהול ועסקים','#ffc83d'],law:['Law & criminology','משפטים וקרימינולוגיה','#8aa4ff'],hum:['Humanities & languages','מדעי הרוח ושפות','#e879f9'],rel:['Bible, Jewish & Islamic studies','מקרא, יהדות ואסלאם','#2dd4bf'],arts:['Arts, design & architecture','אמנויות ועיצוב','#ff6b6b']};
const ST={in:['Clears','var(--in)'],close:['Close','var(--close)'],out:['Short','var(--out)'],part:['Check','var(--part)']};
const SUB={math:['Math','מתמטיקה','Core'],eng:['English','אנגלית','Core'],heb:['Hebrew expression','הבעה עברית','Core'],hist:['History','היסטוריה','Core'],civ:['Civics','אזרחות','Core'],lit:['Literature','ספרות','Core'],bible:['Bible','תנ״ך','Core'],oral:['Oral Torah','תושב״ע','Jewish studies'],talmud:['Talmud','תלמוד','Jewish studies'],jth:['Jewish thought','מחשבת ישראל','Jewish studies'],arab:['Arabic (mother tongue)','ערבית','Arab & Druze'],hebar:['Hebrew for Arabic speakers','עברית לדוברי ערבית','Arab & Druze'],islam:['Islam','דת האסלאם','Arab & Druze'],christ:['Christianity','דת נוצרית','Arab & Druze'],druze:['Druze heritage','מורשת דרוזית','Arab & Druze'],phys:['Physics','פיזיקה','Sciences'],chem:['Chemistry','כימיה','Sciences'],bio:['Biology','ביולוגיה','Sciences'],cs:['Computer science','מדעי המחשב','Sciences'],env:['Environmental science','מדעי הסביבה','Sciences'],agri:['Agriculture','חקלאות','Sciences'],biot:['Biotechnology','ביוטכנולוגיה','Sciences'],swe:['Software engineering','הנדסת תוכנה','Technology'],elec:['Electronics & computers','אלקטרוניקה ומחשבים','Technology'],mech:['Mechatronics','מכטרוניקה','Technology'],infos:['Information systems','מערכות מידע','Technology'],psy:['Psychology','פסיכולוגיה','Social sciences'],socio:['Sociology','סוציולוגיה','Social sciences'],econ:['Economics','כלכלה','Social sciences'],geo:['Geography','גאוגרפיה','Social sciences'],comm:['Communication','תקשורת','Social sciences'],arab2:['Arabic (second language)','ערבית כשפה שנייה','Languages'],fr:['French','צרפתית','Languages'],ru:['Russian','רוסית','Languages'],es:['Spanish','ספרדית','Languages'],art:['Art','אמנות','Arts'],music:['Music','מוזיקה','Arts'],theat:['Theatre','תיאטרון','Arts'],film:['Film','קולנוע','Arts'],dance:['Dance','מחול','Arts'],pe:['Physical education','חינוך גופני','Other'],other:['Other elective','מקצוע בחירה אחר','Other']};
const TRACKS={gen:['General','ממלכתי','State schools',['math','eng','heb','hist','civ','lit','bible']],rel:['Religious','ממלכתי-דתי','State religious schools',['math','eng','heb','hist','civ','lit','bible','oral']],arab:['Arab','ערבי','Arabic-language schools',['math','eng','arab','hebar','hist','civ','islam']],druze:['Druze','דרוזי','Druze schools',['math','eng','arab','hebar','hist','civ','druze']]};
const LOCK=new Set(['math','eng','heb','hebar','arab','hist','civ']);
const DU={math:4,eng:4,arab:3,hebar:3};
const tkey=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
const hkey=v=>String(v||'').replace(/[֑-ׇ]/g,'').replace(/[ךםןףץ]/g,c=>({'ך':'כ','ם':'מ','ן':'נ','ף':'פ','ץ':'צ'}[c])).replace(/[^א-ת0-9]/g,'');
const skel=v=>tkey(v).replace(/ph/g,'f').replace(/th/g,'t').replace(/tz|ts|zz/g,'z').replace(/kh|ch/g,'h').replace(/q|c/g,'k').replace(/w/g,'v').replace(/b/g,'v').replace(/[aeiouy]/g,'').replace(/(.)\1+/g,'$1');
const TOWNS=(window.MESILA_TOWNS||[]).map(([id,en,he,lat,lon,pop])=>({id,en:en||he,he,lat,lon,pop,k:tkey(en),kh:hkey(he),sk:skel(en),w:String(en||'').split(/[\s\-'’()]+/).map(tkey).filter(Boolean)}));
const TOWNIX={};TOWNS.forEach(t=>TOWNIX[t.id]=t);
const BIG=[...TOWNS].sort((a,b)=>b.pop-a.pop);
function townSearch(q){q=String(q||'').trim();if(!q)return BIG.slice(0,8);
 const k=tkey(q),h=hkey(q),sk=skel(q),out=[];
 for(const t of TOWNS){let sc=9;
  if(h){if(t.kh.startsWith(h))sc=0;else if(t.kh.includes(h))sc=2}
  if(k){if(t.k.startsWith(k))sc=Math.min(sc,0);else if(t.w.some(w=>w.startsWith(k)))sc=Math.min(sc,1);else if(t.k.includes(k))sc=Math.min(sc,2);else if(sk.length>=2&&t.sk.startsWith(sk))sc=Math.min(sc,3);else if(sk.length>=3&&t.sk.includes(sk))sc=Math.min(sc,4)}
  if(sc<9)out.push([sc,t])}
 return out.sort((a,b)=>a[0]-b[0]||b[1].pop-a[1].pop).slice(0,8).map(x=>x[1])}
function townId(v){v=String(v||'');if(TOWNIX[v])return v;const k=tkey(v),sk=skel(v);const m=k&&BIG.find(t=>t.k.startsWith(k)||t.sk===sk);return m?m.id:'5000'}
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
const PROGS=[],PIX={};INST.forEach(u=>u.P.forEach(r=>{let id=u.id+'/'+(r[1].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'p');while(PIX[id])id+='-2';const p={id,u,top:r[0],n:r[1],he:r[2],cut:r[3],low:r[4],...(r[5]||{})};PIX[id]=p;PROGS.push(p)}));
const TOTAL=PROGS.length;
INST.forEach(u=>u.n=PROGS.filter(p=>p.u===u).length);
// ---------- emblems (original monograms, not the institutions' real logos)
function emblem(u,s){s=s||36;const lg=(window.MESILA_LOGOS||{})[u.id];if(lg&&/^logos\/[\w.-]+$/.test(lg))return `<span class="em lg" title="${esc(u.name)}" style="width:${s}px;height:${s}px"><img src="${esc(lg)}" alt="" loading="lazy" decoding="async"></span>`;const fs=u.mono.length>2?11:14;
 return `<span class="em" title="${esc(u.name)}"><svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">${u.type==='uni'?`<rect x="1" y="1" width="38" height="38" rx="11" fill="${u.c}"/><path d="M7 31c4-4 9-5.5 13-5.5S29 27 33 31" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none" stroke-linecap="round"/>`:`<circle cx="20" cy="20" r="19" fill="${u.c}"/><circle cx="20" cy="20" r="15" stroke="#fff" stroke-opacity=".28" stroke-width="1.5" fill="none"/>`}<text x="20" y="${u.type==='uni'?22.5:24.5}" text-anchor="middle" font-family="Bricolage,Plex Hebrew,sans-serif" font-size="${fs}" font-weight="750" fill="#fff">${esc(u.mono)}</text></svg></span>`}
// ---------- state
const SAMPLE={track:'gen',rows:[{s:'math',u:4,g:86},{s:'eng',u:5,g:88},{s:'heb',u:2,g:82},{s:'hist',u:2,g:78},{s:'civ',u:2,g:85},{s:'lit',u:2,g:76},{s:'bible',u:2,g:72},{s:'bio',u:5,g:87},{s:'psy',u:5,g:91}],pm:640,pq:628,pv:652,q:121,v:127,e:129,noPsy:false,deg:false,dAvg:85,dEx:'1',home:'5000',sample:true,stage:'track'};
const clone=o=>JSON.parse(JSON.stringify(o));
const LS={get:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
let S=LS.get('mesila.state')||clone(SAMPLE);if(!S.rows||!TRACKS[S.track])S=clone(SAMPLE);S.home=townId(S.home);
let MODE=null,ACC=null,DOC=null,SAVED=null,acctReady=false;
const UI={top:'all',st:'all',inst:'all',q:'',sort:'t',more:{},sel:null,zoom:'all'};
let M3D=null,M3D_LOADING=null;
// ---------- view preferences (saved with the grades)
const DEF_VIEW={layout:'cards',mapv:'3d',dense:false,show:{kpis:true,fields:true,status:true,he:true,gauge:true,routes:true,checks:true,meta:true,live:true},hideShort:false,hidden:[],hiddenInst:[],saved:[]};
function V(){if(!S.view||typeof S.view!=='object')S.view=clone(DEF_VIEW);const v=S.view;for(const k in DEF_VIEW)if(v[k]===undefined)v[k]=clone(DEF_VIEW[k]);for(const k in DEF_VIEW.show)if(typeof v.show[k]!=='boolean')v.show[k]=true;return v}
const isHidden=p=>{const v=V();return v.hidden.includes(p.id)||v.hiddenInst.includes(p.u.id)};
const pool=()=>{const v=V();return PROGS.filter(p=>!isHidden(p)&&!(v.hideShort&&p.r.st==='out'))};
const countsOf=ps=>{const n={in:0,close:0,out:0,part:0};ps.forEach(p=>n[p.r.st]++);return n};
const stageCls=()=>'stage'+(V().show.live?'':' solo');
const IC={star:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>',
 hide:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A9.9 9.9 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-2.6 3.7M6.2 6.3C3.9 7.7 2.5 9.9 2 12c1 2.5 5 7 10 7 1.7 0 3.3-.5 4.6-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
 tune:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
 cards:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
 list:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
 x:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'};
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
function seriesFor(ps){ps=ps||PROGS;const {i,c,av}=R,d1=i.pq-i.pm,d2=i.pv-i.pm,d3=i.ph-i.pq,out=[];
 for(let P=450;P<=800;P+=10){const j={...i,pm:P,pq:P+d1,pv:P+d2,ph:P+d1+d3};let k=0;ps.forEach(p=>{if(evalP(p,av[p.u.id].used,j,c,false).st==='in')k++});out.push([P,k])}return out}
// ---------- persistence
let saveT=0,writing=false,again=false,lastSaved='';
function save(){LS.set('mesila.state',S);clearTimeout(saveT);if(MODE==='acct'&&DOC){$('#saved').textContent='Saving…';saveT=setTimeout(flush,900)}else $('#saved').textContent=MODE==='guest'?'Saved on this device':''}
async function flush(){if(!DOC)return;const js=JSON.stringify(S);if(js===lastSaved){$('#saved').textContent='Saved to your account';return}if(writing){again=true;return}writing=true;
 try{await DOC.set({state:JSON.parse(js),at:Date.now()});lastSaved=js;SAVED=JSON.parse(js);$('#saved').textContent='Saved to your account'}catch(e){$('#saved').textContent='Saved on this device only'}
 writing=false;if(again){again=false;flush()}}
// ---------- sign-in
function drawSiMap(){const unis=INST.filter(u=>u.type==='uni').map(u=>proj(u.lat,u.lon)).sort((a,b)=>a[1]-b[1]);
 let d=`M${unis[0][0].toFixed(1)},${unis[0][1].toFixed(1)}`;for(let k=1;k<unis.length;k++){const [x0,y0]=unis[k-1],[x1,y1]=unis[k],my=(y0+y1)/2;d+=` C${x0.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`}
 $('#siMap').innerHTML=`<defs><linearGradient id="siTr" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--a3)"/><stop offset=".5" style="stop-color:var(--a1)"/><stop offset="1" style="stop-color:var(--a4)"/></linearGradient><filter id="siGl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
 <path d="${outline()}" style="fill:color-mix(in srgb,var(--a3) 5%,transparent);stroke:var(--a3)" stroke-opacity=".75" stroke-width="1" filter="url(#siGl)"/>
 <path d="${d}" fill="none" stroke="url(#siTr)" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1 3.2" filter="url(#siGl)" opacity=".95"/>`+
 INST.map(u=>{const [x,y]=proj(u.lat,u.lon),uni=u.type==='uni';return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${uni?3:1.9}" style="fill:${uni?'#ffffff':'color-mix(in srgb,'+u.c+' 55%,#ffffff)'}" filter="url(#siGl)"/>`}).join('')}
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
function route(){if(M3D){M3D.dispose();M3D=null}{const m=$('#menu');if(m)m.hidden=true;const mb=$('#meb');if(mb)mb.setAttribute('aria-expanded','false')}let v=location.hash.replace('#','');if(!VIEWS.includes(v))v=MODE?'results':'signin';
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
function ringSvg(n,size,tot){tot=tot||1;const R0=40,C=2*Math.PI*R0;let off=0,s=`<circle cx="50" cy="50" r="${R0}" fill="none" style="stroke:var(--soft)" stroke-width="12"/>`;
 ['in','close','part','out'].forEach(k=>{const f=n[k]/tot;if(!f)return;s+=`<circle cx="50" cy="50" r="${R0}" fill="none" style="stroke:${ST[k][1]}" stroke-width="12" stroke-dasharray="${(f*C).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off*C).toFixed(2)}" transform="rotate(-90 50 50)"/>`;off+=f});
 return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">${s}</svg>`}
function livePanel(){if(!V().show.live)return '';const {av}=R,ps=pool(),n=countsOf(ps),unis=INST.filter(u=>u.type==='uni'&&u.id!=='openu'&&u.id!=='reichman');
 return `<aside class="live"><div class="card"><div class="big">${ringSvg(n,96,ps.length)}<div><b>${n.in}</b><small>of ${ps.length} programs open to you</small></div></div>
 <div class="sb"><div><b style="color:var(--in)">${n.in}</b>clear</div><div><b style="color:var(--close)">${n.close}</b>close</div><div><b style="color:var(--part)">${n.part}</b>check</div><div><b style="color:var(--out)">${n.out}</b>short</div></div></div>
 <div class="card"><h4 style="margin-bottom:12px">Your bagrut average at each university</h4><div class="avl">${unis.map(u=>{const a=av[u.id],w=a.avg?Math.max(2,Math.min(100,(a.used-70)/55*100)):0;return `<div class="avr" style="--c:${u.c}">${emblem(u,26)}<span class="bar"><i style="width:${w}%"></i></span><b>${a.avg?a.used.toFixed(1):'—'}</b></div>`}).join('')}</div>
 <p class="fine" style="margin:12px 0 0">Colleges use the standard bonus table: ${R.av.afeka.avg?R.av.afeka.used.toFixed(1):'—'}.</p></div>
 <button class="btn sec" type="button" data-go="results">See all results</button></aside>`}
function refreshLive(){compute();const l=$('.live');if(l)l.outerHTML=livePanel()}
function homeNote(){const t=homeT(),near=[...INST].map(u=>[u,dist(t.lat,t.lon,u.lat,u.lon)]).sort((a,b)=>a[1]-b[1])[0];
 return `<bdi>${esc(t.he)}</bdi> · nearest campus: ${esc(near[0].short)}, ${Math.max(1,Math.round(near[1]))} km. Choose from ${TOWNS.length.toLocaleString('en')} towns and villages.`}
let HL=[],HA=-1;
function drawHome(){const inp=$('#homeQ'),ul=$('#homeList');if(!inp||!ul)return;HL=townSearch(inp.value===homeT().en?'':inp.value);HA=HL.length?0:-1;
 ul.innerHTML=HL.length?HL.map((t,k)=>`<li role="option" id="ho${k}" data-town="${t.id}" aria-selected="${k===HA}"><b>${esc(t.en)}</b><bdi>${esc(t.he)}</bdi>${t.pop?`<small>${t.pop>=1000?Math.round(t.pop/1000)+'k':t.pop} people</small>`:''}</li>`).join(''):'<li class="none" role="presentation">No town by that name. Try the Hebrew spelling.</li>';
 ul.hidden=false;inp.setAttribute('aria-expanded','true');inp.setAttribute('aria-activedescendant',HA>=0?'ho'+HA:'')}
function moveHome(d){if(!HL.length)return;HA=(HA+d+HL.length)%HL.length;$$('#homeList li[role=option]').forEach((li,k)=>li.setAttribute('aria-selected',k===HA));const a=$('#ho'+HA);if(a)a.scrollIntoView({block:'nearest'});$('#homeQ').setAttribute('aria-activedescendant','ho'+HA)}
function closeHome(restore){const inp=$('#homeQ'),ul=$('#homeList');if(!ul)return;ul.hidden=true;inp.setAttribute('aria-expanded','false');inp.removeAttribute('aria-activedescendant');if(restore)inp.value=homeT().en}
function pickTown(id){if(!TOWNIX[id])return;S.home=id;save();closeHome(true);const n=$('#homeNote');if(n)n.innerHTML=homeNote()}
// ---------- stage views
function vTrack(){$('#main').innerHTML=`<div class="${stageCls()}"><div class="card"><h2>What kind of school did you go to?</h2><p class="sub">This sets your required bagrut subjects. You can add any elective on the next step.</p>
 <div class="opts" id="trk">${Object.entries(TRACKS).map(([k,t])=>`<button type="button" class="opt" data-tr="${k}" aria-pressed="${S.track===k}"><b>${t[0]}</b><span class="he"><bdi>${t[1]}</bdi></span><small>${t[2]} · ${t[3].map(s=>SUB[s][0]).join(', ').replace('Hebrew for Arabic speakers','Hebrew')}</small></button>`).join('')}</div>
 <label class="lbl" for="homeQ">Where do you live?</label><div class="combo"><input type="text" id="homeQ" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="homeList" autocomplete="off" spellcheck="false" placeholder="Type your town in English or Hebrew" value="${esc(homeT().en)}"><ul id="homeList" role="listbox" aria-label="Towns" hidden></ul></div>
 <p class="fine" id="homeNote">${homeNote()}</p>
 <div class="nextrow"><span></span><button class="btn" type="button" data-go="bagrut">Next: bagrut grades</button></div></div>${livePanel()}</div>`}
function vBagrut(){$('#main').innerHTML=`<div class="${stageCls()}"><div class="card"><h2>Your bagrut grades</h2><p class="sub">Each institution adds its own bonuses and leaves out subjects that pull you down, as long as 20 units remain. Your required subjects always count.</p>
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
function vPsy(){$('#main').innerHTML=`<div class="${stageCls()}"><div class="card"><h2>Psychometric scores</h2><p class="sub">Your score report lists three general scores and three section scores. Only the general score is required; the rest sharpen the results.</p>
 <label class="chk"><input type="checkbox" id="noPsy"${S.noPsy?' checked':''}> I haven't taken the psychometric yet</label>
 <div id="psyF"${S.noPsy?' hidden':''}>
 <label class="lbl" for="pm">General score (רב-תחומי)</label><div class="rng"><input type="range" id="pmR" min="200" max="800" value="${S.pm||200}" aria-label="General score slider"><input type="number" id="pm" min="200" max="800" value="${S.pm}"></div>
 <label class="lbl" for="pq">Quantitative emphasis (דגש כמותי)</label><div class="rng"><input type="range" id="pqR" min="200" max="800" value="${S.pq||200}" aria-label="Quantitative-emphasis slider"><input type="number" id="pq" min="200" max="800" value="${S.pq}"></div>
 <label class="lbl" for="pv">Verbal emphasis (דגש מילולי)</label><div class="rng"><input type="range" id="pvR" min="200" max="800" value="${S.pv||200}" aria-label="Verbal-emphasis slider"><input type="number" id="pv" min="200" max="800" value="${S.pv}"></div>
 <span class="lbl">Section scores, 50–150</span><div class="g3"><div><label class="fine" for="q">Quantitative</label><input type="number" id="q" min="50" max="150" value="${S.q}"></div><div><label class="fine" for="v">Verbal</label><input type="number" id="v" min="50" max="150" value="${S.v}"></div><div><label class="fine" for="e">English</label><input type="number" id="e" min="50" max="150" value="${S.e}"></div></div></div>
 <p class="fine" id="psyNote">${S.noPsy?'Without a score, only bagrut-only, degree and open-admission routes count.':''}</p>
 <div class="nextrow"><button class="btn ghost" type="button" data-go="bagrut">Back</button><button class="btn" type="button" data-go="degree">Next: previous degree</button></div></div>${livePanel()}</div>`}
function vDegree(){$('#main').innerHTML=`<div class="${stageCls()}"><div class="card"><h2>Do you already have a degree?</h2><p class="sub">Some programs admit graduates on their degree average. Skip this if you're coming straight from school.</p>
 <div class="opts"><button type="button" class="opt" data-deg="0" aria-pressed="${!S.deg}"><b>No degree</b><small>Coming from school, the army or a mechina</small></button><button type="button" class="opt" data-deg="1" aria-pressed="${!!S.deg}"><b>I have a bachelor's degree</b><small>Or I'm finishing one</small></button></div>
 <div class="g2" id="degF"${S.deg?'':' hidden'}><div><label class="lbl" for="dAvg">Degree average</label><input type="number" id="dAvg" min="0" max="100" value="${S.dAvg}"></div><div><label class="lbl" for="dEx">Field</label><select id="dEx"><option value="1"${S.dEx==='1'?' selected':''}>Exact sciences or engineering</option><option value="0"${S.dEx==='0'?' selected':''}>Another field</option></select></div></div>
 <p class="fine">Degree routes in the data: Tel Aviv law (10 × average + psychometric ≥ 1475), Tel Aviv computer science and computer engineering, and Haifa's prior-degree routes.</p>
 <div class="nextrow"><button class="btn ghost" type="button" data-go="psy">Back</button><button class="btn" type="button" data-go="results">See my results</button></div></div>${livePanel()}</div>`}
// ---------- results
function footText(p){const r=p.r;
 if(r.via)return `In via <b>${r.via}</b>`;
 if(canCalc(p)&&r.need!=null)return r.need===Infinity?'Out of reach with psychometric alone':`Psychometric needed <b>${r.need}</b>${r.need<=r.P?' ✓':` (+${r.need-r.P})`}`;
 if(p.t==='open')return 'Open admission';
 if(p.t==='ask')return 'Cutoffs are given at an admissions meeting';
 if(p.t==='tests')return r.st==='part'?'Decided by tests, portfolio or interview':'Below the published minimum';
 if(r.rt.length){const best=r.rt.find(x=>x[1])||r.rt.find(x=>x[2])||r.rt[0];return `${best[1]?'Meets':'Needs'} ${esc(best[0]).replace(/\+$/,'+')}`}
 if(r.st==='part')return 'Meets the published minimums; the final score isn’t public';
 return ''}
function acts(p){const sv=V().saved.includes(p.id);
 return `<span class="acts"><button type="button" class="ib" data-save="${p.id}" aria-pressed="${sv}" aria-label="${sv?'Remove from saved':'Save'}: ${esc(p.n)}" title="${sv?'Saved':'Save'}">${IC.star}</button><button type="button" class="ib" data-hide="${p.id}" aria-label="Hide ${esc(p.n)}" title="Hide">${IC.hide}</button></span>`}
const fmt=(u,x)=>x==null?'—':u.dp?x.toFixed(u.dp):String(Math.round(x*100)/100);
function card(p){const u=p.u,r=p.r,s=ST[r.st],v=V(),sh=v.show;let body='';
 if(sh.gauge&&canCalc(p)&&r.score!=null){const sp=u.span,lo=p.low||p.cut-sp*0.25,mn=Math.min(lo-sp,r.score),mx=Math.max(p.cut+sp,r.score),W=mx-mn,pc=x=>((x-mn)/W*100).toFixed(1),f=x=>fmt(u,x);
  body+=`<div class="gauge" aria-hidden="true"><i class="z za" style="left:${pc(lo)}%;width:${(pc(p.cut)-pc(lo)).toFixed(1)}%"></i><i class="z zg" style="left:${pc(p.cut)}%;right:0"></i><b class="mk" style="left:${pc(r.score)}%"></b></div>
  <div class="nums"><span>You <b>${f(r.score)}</b></span>${p.low?`<span>${p.ivw?'Interview line':'Reject'} <b>${f(p.low)}</b></span>`:''}<span>Accept <b>${f(p.cut)}</b></span></div>`}
 if(sh.routes&&r.rt.length)body+=`<ul class="rts">${r.rt.map(([t,ok,near,vv])=>`<li class="${ok?'ok':near?'near':''}">${t}<span>you ${vv}</span></li>`).join('')}</ul>`;
 const ck=sh.checks?r.ck.filter(([t])=>!(r.rt.length&&/^P /.test(t)&&p.altP)).map(([t,ok])=>`<li class="${ok===true?'ok':ok===false?'no':''}">${ok===true?'✓':ok===false?'✗':'?'} ${t}</li>`).join(''):'';
 if(ck)body+=`<ul class="ck">${ck}</ul>`;
 const ft=footText(p);let foot=ft?`<p class="pf${r.via||(canCalc(p)&&r.need!=null)?'':' m'}">${ft}</p>`:'';
 if(p.note)foot+=`<p class="pf m">${esc(p.note)}</p>`;
 const tags=[p.yr||u.yr,p.off?'official':'third-party'].join(' · ');
 return `<article class="pc" style="--c:${TOP[p.top]?TOP[p.top][2]:'var(--brand)'}"><div class="ph">${emblem(u,34)}<div class="t"><h4>${esc(p.n)}</h4><div class="i">${esc(u.short)}${sh.he?` · <bdi>${p.he}</bdi>`:''}</div></div><span class="pill" style="--sc:${s[1]}">${s[0]}</span></div>${body}${foot}<div class="pf2">${sh.meta?`<span class="fine">${tags}</span>`:'<span></span>'}${acts(p)}</div></article>`}
function prow(p){const u=p.u,r=p.r,s=ST[r.st],sh=V().show,calc=canCalc(p)&&r.score!=null;
 return `<tr style="--c:${TOP[p.top]?TOP[p.top][2]:'var(--brand)'}"><td class="pn">${emblem(u,28)}<span><b>${esc(p.n)}</b><small>${esc(u.short)}${sh.he?` · <bdi>${p.he}</bdi>`:''}</small></span></td><td class="st"><span class="pill" style="--sc:${s[1]}">${s[0]}</span></td><td class="num" data-l="You">${calc?fmt(u,r.score):'—'}</td><td class="num" data-l="Reject">${calc&&p.low?fmt(u,p.low):'—'}</td><td class="num" data-l="Accept">${calc?fmt(u,p.cut):'—'}</td><td class="nx">${footText(p)}</td><td class="mv">${calc?`You <b>${fmt(u,r.score)}</b>${p.low?` · Reject <b>${fmt(u,p.low)}</b>`:''} · Accept <b>${fmt(u,p.cut)}</b>`:''}</td><td class="ac">${acts(p)}</td></tr>`}
function vResults(){const v=V(),ps=pool(),n=countsOf(ps),hid=PROGS.length-ps.length,ser=seriesFor(ps),nxt=ser.find(([P,k])=>P>R.i.pm&&k>n.in);
 const open={};ps.forEach(p=>{if(p.r.st==='in')open[p.u.id]=(open[p.u.id]||0)+1});
 const bestU=INST.filter(u=>!v.hiddenInst.includes(u.id)).sort((a,b)=>(open[b.id]||0)-(open[a.id]||0)||a.name.localeCompare(b.name))[0];
 const miss=ps.filter(p=>p.r.st!=='in'&&canCalc(p)&&p.r.need!=null&&isFinite(p.r.need)&&p.r.need>p.r.P&&p.r.need<=800&&!p.r.ck.some(c=>!c[1])).sort((a,b)=>(a.r.need-a.r.P)-(b.r.need-b.r.P))[0];
 const mx=Math.max(...ser.map(s=>s[1]),1),mn=Math.min(...ser.map(s=>s[1])),X=P=>(P-450)/350*200,Y=k=>40-(k-mn)/Math.max(1,mx-mn)*36;
 let d=`M0,${Y(ser[0][1])}`;ser.slice(1).forEach(([P,k])=>{d+=`H${X(P)}V${Y(k)}`});
 const instN=INST.length-v.hiddenInst.length;
 $('#main').innerHTML=`<div class="rh"><div class="sech"><h2>${n.in} programs are open to you</h2><span class="mute">out of ${ps.length} at ${instN} institution${instN===1?'':'s'}</span>${hid?`<button type="button" class="lnk" data-act="cust">${hid} hidden</button>`:''}</div>
 <div class="ra"><div class="tog" role="group" aria-label="Layout"><button type="button" data-layout="cards" aria-pressed="${v.layout==='cards'}">${IC.cards}<span>Cards</span></button><button type="button" data-layout="list" aria-pressed="${v.layout==='list'}">${IC.list}<span>List</span></button></div><button class="btn sec sm" type="button" data-act="cust" aria-haspopup="dialog">${IC.tune}<span>Customize</span></button></div></div>
 ${v.show.kpis&&bestU?`<div class="kpis"><div class="kpi hi"><span>Open now</span><b class="n">${n.in}</b><span>${n.close} more are close or on a waitlist</span></div>
 <div class="kpi" style="--c:var(--cyan)"><span>Most options at</span><b style="font-size:22px">${esc(bestU.name)}</b><span>${open[bestU.id]||0} of ${bestU.n} programs</span></div>
 <div class="kpi" style="--c:var(--close)"><span>Closest miss</span><b style="font-size:22px">${miss?esc(miss.u.short+' · '+miss.n):'—'}</b><span>${miss?`needs psychometric ${miss.r.need} (+${miss.r.need-miss.r.P})`:'nothing just out of reach'}</span></div>
 <div class="kpi" style="--c:var(--pink)"><span>${nxt?`+${nxt[0]-R.i.pm} psychometric points`:'Psychometric'}</span><b style="font-size:22px">${nxt?`opens ${nxt[1]-n.in} more`:'no easy gains'}</b><svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="spkL" x1="0" x2="1"><stop offset="0" style="stop-color:var(--a1)"/><stop offset=".55" style="stop-color:var(--a2)"/><stop offset="1" style="stop-color:var(--a3)"/></linearGradient><linearGradient id="spkA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--a2);stop-opacity:.35"/><stop offset="1" style="stop-color:var(--a2);stop-opacity:0"/></linearGradient></defs><path d="${d}V44H0Z" fill="url(#spkA)"/><path class="ln" d="${d}" fill="none" stroke="url(#spkL)" stroke-width="2.2"/>${R.i.pm>=450?`<line x1="${X(R.i.pm)}" x2="${X(R.i.pm)}" y1="0" y2="44" stroke="var(--acc)" stroke-width="2" stroke-dasharray="3 3"/>`:''}</svg></div></div>`:''}
 <div class="fb" id="fb"></div><div id="list"></div>`;drawFilters();drawList()}
function drawFilters(){const v=V(),ps=pool(),tc=k=>ps.filter(p=>instOK(p)&&(k==='all'||p.top===k)).length,svN=ps.filter(p=>instOK(p)&&v.saved.includes(p.id)).length;
 if(UI.st==='saved'&&!svN)UI.st='all';
 $('#fb').innerHTML=`<div class="f1"><input type="search" id="q2" placeholder="Search programs in English or Hebrew" value="${esc(UI.q)}" aria-label="Search programs"><select id="instSel" aria-label="Institution"><option value="all">All institutions</option><option value="uni"${UI.inst==='uni'?' selected':''}>Universities only</option><option value="col"${UI.inst==='col'?' selected':''}>Colleges only</option><optgroup label="Universities">${INST.filter(u=>u.type==='uni').map(u=>`<option value="${u.id}"${UI.inst===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</optgroup><optgroup label="Colleges">${INST.filter(u=>u.type==='col').map(u=>`<option value="${u.id}"${UI.inst===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</optgroup></select><select id="sort" aria-label="Order"><option value="t"${UI.sort==='t'?' selected':''}>Group by field</option><option value="u"${UI.sort==='u'?' selected':''}>Group by institution</option><option value="m"${UI.sort==='m'?' selected':''}>Best chances first</option></select></div>
 ${v.show.fields?`<div class="chips">${[['all','All fields',null,'var(--brand)'],...Object.entries(TOP).map(([k,t])=>[k,t[0],ICON[k],t[2]])].filter(([k])=>k==='all'||UI.top===k||tc(k)>0).map(([k,l,ic,c])=>`<button type="button" class="chip" style="--c:${c}" data-t="${k}" aria-pressed="${UI.top===k}">${ic?`<svg viewBox="0 0 24 24">${ic}</svg>`:''}${l} <span class="n">${tc(k)}</span></button>`).join('')}</div>`:''}
 ${v.show.status?`<div class="seg" role="group" aria-label="Status">${[['all','Everything','var(--mute)'],['in','Clears','var(--in)'],['close','Close','var(--close)'],['part','Check','var(--part)'],...(v.hideShort?[]:[['out','Short','var(--out)']]),...(svN?[['saved','Saved','#ffc83d']]:[])].map(([k,l,c])=>`<button type="button" style="--c:${c}" data-s="${k}" aria-pressed="${UI.st===k}">${k==='saved'?IC.star:'<i></i>'}${l}${k==='all'?'':' '+(k==='saved'?svN:ps.filter(p=>instOK(p)&&p.r.st===k).length)}</button>`).join('')}</div>`:''}`}
const instOK=p=>UI.inst==='all'||(UI.inst==='uni'?p.u.type==='uni':UI.inst==='col'?p.u.type==='col':p.u.id===UI.inst);
const SO={in:0,close:1,part:2,out:3};
const mg=p=>p.r.st==='in'?1000:p.r.st==='close'?500-(p.r.need&&isFinite(p.r.need)?p.r.need-p.r.P:20):p.r.st==='part'?0:-500-(p.r.need&&isFinite(p.r.need)?p.r.need-p.r.P:300);
function drawList(){const v=V(),q=UI.q.trim().toLowerCase(),qh=UI.q.trim(),base=pool().filter(instOK);
 const vis=base.filter(p=>(UI.top==='all'||p.top===UI.top)&&(UI.st==='all'||(UI.st==='saved'?v.saved.includes(p.id):p.r.st===UI.st))&&(!q||p.n.toLowerCase().includes(q)||p.he.includes(qh)||p.u.name.toLowerCase().includes(q)||p.u.short.toLowerCase().includes(q)));
 const filt=UI.q||UI.top!=='all'||UI.st!=='all'||UI.inst!=='all';
 const af=filt?`<div class="af"><span>Showing ${vis.length} of ${pool().length} programs</span><button type="button" class="lnk" data-act="clearf">Clear filters</button></div>`:'';
 if(!vis.length){$('#list').innerHTML=af+'<div class="empty">No programs match these filters.</div>';return}
 const sortIn=a=>a.sort((x,y)=>SO[x.r.st]-SO[y.r.st]||(x.u.type===y.u.type?0:x.u.type==='uni'?-1:1)||x.u.name.localeCompare(y.u.name)||x.n.localeCompare(y.n));
 let groups;
 if(UI.sort==='m')groups=[['all','All matches','',ICON.cs,'var(--brand)',[...vis].sort((a,b)=>mg(b)-mg(a))]];
 else if(UI.sort==='u')groups=INST.map(u=>[u.id,u.name,u.he,null,u.c,sortIn(vis.filter(p=>p.u===u)),u]);
 else groups=Object.entries(TOP).map(([k,t])=>[k,t[0],t[1],ICON[k],t[2],sortIn(vis.filter(p=>p.top===k))]);
 const list=v.layout==='list',per=list?25:8;
 $('#list').innerHTML=af+groups.filter(g=>g[5].length).map(([k,nm,he,ic,c,ps,u])=>{const lim=UI.more[k]?ps.length:per,cn=countsOf(ps);
  const bar=`<span class="gbar" title="${cn.in} clear · ${cn.close} close · ${cn.part} check · ${cn.out} short">${['in','close','part','out'].map(x=>cn[x]?`<i style="flex:${cn[x]};background:${ST[x][1]}"></i>`:'').join('')}</span>`;
  const items=ps.slice(0,lim);
  const body=list?`<div class="tblw"><table class="pt"><thead><tr><th scope="col">Program</th><th scope="col">Status</th><th scope="col" class="num">You</th><th scope="col" class="num">Reject</th><th scope="col" class="num">Accept</th><th scope="col">What decides it</th><th scope="col"><span class="sr">Save or hide</span></th></tr></thead><tbody>${items.map(prow).join('')}</tbody></table></div>`
   :`<div class="grid${v.dense?' dense':''}">${items.map(card).join('')}</div>`;
  return `<section class="grp"><div class="gh" style="--c:${c}">${u?emblem(u,40):`<span class="ic"><svg viewBox="0 0 24 24">${ic}</svg></span>`}<h3>${esc(nm)} ${he&&V().show.he?`<bdi class="he">${he}</bdi>`:''}</h3><span class="cnt">${bar}${cn.in} of ${ps.length} open</span></div>${body}${ps.length>lim?`<button class="btn sec more" type="button" data-more="${k}">Show all ${ps.length}</button>`:''}</section>`}).join('')}
// ---------- customize panel
let custFrom=null,lastHidden=null,toastT=0;
function sw(path,label,hint){const v=V(),val=path.split('.').reduce((o,k)=>o&&o[k],v);
 return `<label class="sw"><input type="checkbox" data-pref="${path}"${val?' checked':''}><span class="tr" aria-hidden="true"></span><span><b>${label}</b>${hint?`<small>${hint}</small>`:''}</span></label>`}
function drawCust(){const v=V(),hid=v.hidden.map(id=>PIX[id]).filter(Boolean),grp=t=>INST.filter(u=>u.type===t).map(u=>`<label class="ck2"><input type="checkbox" data-inst="${u.id}"${v.hiddenInst.includes(u.id)?'':' checked'}>${emblem(u,22)}<span>${esc(u.name)}</span><small>${u.n}</small></label>`).join('');
 $('#cust').innerHTML=`<div class="dr-h"><h3 id="custT">Look and layout</h3><button type="button" class="ib" data-act="custClose" aria-label="Close">${IC.x}</button></div>
 <div class="dr-b">
 ${themeSection()}
 <section><h4>Layout</h4><div class="tog wide" role="group" aria-label="Layout"><button type="button" data-layout="cards" aria-pressed="${v.layout==='cards'}">${IC.cards}<span>Cards</span></button><button type="button" data-layout="list" aria-pressed="${v.layout==='list'}">${IC.list}<span>List</span></button></div>
  ${sw('dense','Compact cards','Smaller cards, more on screen')}</section>
 <section><h4>Results page</h4>${sw('show.kpis','Summary cards')}${sw('show.fields','Field filters')}${sw('show.status','Status filter')}</section>
 <section><h4>On each program</h4>${sw('show.he','Hebrew names')}${sw('show.gauge','Score bar','Your score against the rejection and acceptance lines')}${sw('show.routes','Admission routes')}${sw('show.checks','Requirement checks','Math units, physics, quantitative score')}${sw('show.meta','Year and source')}</section>
 <section><h4>While you fill in your grades</h4>${sw('show.live','Live summary beside each step')}</section>
 <section><h4>Hide programs</h4>${sw('hideShort','Programs I’m short for','Leaves out everything marked Short')}
  <div class="ih"><span>Universities</span><button type="button" class="lnk" data-act="instAll" data-t2="uni">Show all</button></div><div class="il">${grp('uni')}</div>
  <div class="ih"><span>Colleges</span><button type="button" class="lnk" data-act="instAll" data-t2="col">Show all</button></div><div class="il">${grp('col')}</div>
  <div class="ih"><span>${hid.length?`${hid.length} program${hid.length>1?'s':''} hidden`:'No single programs hidden'}</span>${hid.length?'<button type="button" class="lnk" data-act="unhideAll">Show them all</button>':''}</div>
  ${hid.length?`<ul class="hl">${hid.map(p=>`<li><span>${esc(p.n)} <small>${esc(p.u.short)}</small></span><button type="button" class="lnk" data-unhide="${p.id}">Show</button></li>`).join('')}</ul>`:'<p class="fine" style="margin:6px 0 0">Use the eye button on any program to hide it.</p>'}
 </section></div>
 <div class="dr-f"><button type="button" class="btn ghost" data-act="viewReset">Reset to default</button><button type="button" class="btn" data-act="custClose">Done</button></div>`}
function keepScroll(f){const b=$('#cust .dr-b'),y=b?b.scrollTop:0;f();const b2=$('#cust .dr-b');if(b2)b2.scrollTop=y}
function openCust(from){custFrom=from||document.activeElement;drawCust();$('#cust').hidden=false;$('#scrim').hidden=false;document.body.classList.add('locked');const f=$('#cust .dr-h .ib');if(f)f.focus()}
function closeCust(){if($('#cust').hidden)return;$('#cust').hidden=true;$('#scrim').hidden=true;document.body.classList.remove('locked');const f=custFrom&&document.contains(custFrom)?custFrom:($('.rh [data-act=cust]')||$('#meb'));if(f)f.focus()}
function rerender(){const v=location.hash.replace('#','');if(v==='results')vResults();else if(['track','bagrut','psy','degree'].includes(v))route();else if(v==='places'||v==='map')route()}
function toast(msg,undo){const t=$('#toast');clearTimeout(toastT);t.innerHTML=`<span>${msg}</span>${undo?'<button type="button" data-act="undo">Undo</button>':''}`;t.classList.add('on');toastT=setTimeout(()=>t.classList.remove('on'),5000)}
// ---------- map
const PX=85.26,LON0=34.15,LAT0=33.4,proj=(la,lo)=>[(lo-LON0)*PX,(LAT0-la)*100];
const OUT=[[33.093,35.105],[33.005,35.095],[32.925,35.07],[32.86,35.04],[32.83,34.98],[32.825,34.955],[32.72,34.945],[32.6,34.91],[32.5,34.885],[32.33,34.845],[32.17,34.8],[32.09,34.77],[32.05,34.75],[31.95,34.69],[31.82,34.635],[31.67,34.55],[31.53,34.44],[31.4,34.33],[31.32,34.24],[31.22,34.27],[30.88,34.42],[30.5,34.56],[30.05,34.7],[29.7,34.83],[29.49,34.9],[29.53,34.96],[29.56,34.98],[29.85,35.06],[30.1,35.15],[30.4,35.17],[30.7,35.28],[30.95,35.38],[31.1,35.46],[31.4,35.55],[31.78,35.55],[32.1,35.53],[32.3,35.56],[32.62,35.57],[32.7,35.64],[32.88,35.65],[33.0,35.62],[33.15,35.62],[33.28,35.58],[33.2,35.5],[33.1,35.4],[33.08,35.3],[33.07,35.2]];
const outline=()=>'M'+OUT.map(([a,b])=>proj(a,b).map(v=>v.toFixed(1)).join(',')).join('L')+'Z';
const ZOOMS={all:['All Israel',[-6,-22,148,426]],north:['North',[52,0,88,102]],center:['Center',[38,88,64,72]],jlm:['Jerusalem',[64,140,42,38]],south:['South',[16,158,96,100]]};
let VB=ZOOMS.all[1].slice(),anim=0;
const dist=(a,b,c,d)=>{const R6=6371,t=x=>x*Math.PI/180,dl=t(c-a),dn=t(d-b),h=Math.sin(dl/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(dn/2)**2;return 2*R6*Math.asin(Math.sqrt(h))};
const homeT=()=>TOWNIX[S.home]||TOWNIX['5000']||{en:'Tel Aviv-Yafo',he:'תל אביב - יפו',lat:32.085,lon:34.782};
const home=()=>{const t=homeT();return [t.en,t.lat,t.lon]};
function vMap(){const v=V(),three=v.mapv==='3d';
 $('#main').innerHTML=`<div class="sech"><h2>Every campus on the map</h2><span class="mute">Distances are straight-line from ${esc(homeT().en)}. Change your town on the <a href="#track">first step</a>.</span></div>
 <div class="mapl"><div class="mapc" id="mapc"><div class="zoom">${Object.entries(ZOOMS).map(([k,z])=>`<button type="button" data-z="${k}" aria-pressed="${UI.zoom===k}">${z[0]}</button>`).join('')}</div>
 <div class="tog mview" role="group" aria-label="Map style"><button type="button" data-mapv="2d" aria-pressed="${!three}">Flat</button><button type="button" data-mapv="3d" aria-pressed="${three}">3D</button></div>
 ${three?`<div id="m3box" style="position:absolute;inset:0"><div class="m3load">Loading the 3D map…</div></div><div class="m3hint">Column height = programs open to you. Drag to turn, scroll to zoom, click a column.</div>`:`<svg id="msvg" role="img" aria-label="Map of campuses"></svg>`}
 <div class="mleg"><span><i style="border-radius:3px;background:var(--brand)"></i>University</span><span><i style="border-radius:50%;background:var(--acc)"></i>College</span><span><i style="border-radius:50%;background:var(--ink);width:9px;height:9px"></i>Home</span></div></div>
 <div><div id="det"></div><div class="list" id="mlist"></div></div></div>`;
 drawMapList();
 if(three)start3D();else{drawMap();const ro=new ResizeObserver(drawMap);ro.observe($('#msvg'))}}
// ---------- 3D map (js/map3d.js, loaded on first use)
const probe=()=>{let e=$('#cprobe');if(!e){e=document.createElement('i');e.id='cprobe';e.style.cssText='position:absolute;width:0;height:0;overflow:hidden';document.body.appendChild(e)}return e};
function cssHex(name){const e=probe();e.style.color='';e.style.color=`var(${name})`;const c=getComputedStyle(e).color;let m=c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);let rgb;
 if(m)rgb=[+m[1],+m[2],+m[3]];else{m=c.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);rgb=m?[m[1]*255,m[2]*255,m[3]*255]:[128,128,128]}
 return '#'+rgb.map(x=>Math.round(Math.max(0,Math.min(255,x))).toString(16).padStart(2,'0')).join('')}
function sceneColors(){const t=TH(),dark=t.mode!=='light';return {dark,glow:t.glow/100,sea:cssHex('--sea'),land:cssHex('--land'),coast:cssHex('--coast'),a1:cssHex('--a1'),a2:cssHex('--a2'),a3:cssHex('--a3'),a4:cssHex('--a4'),ink:cssHex('--ink')}}
function load3D(){if(window.Mesila3D)return Promise.resolve(window.Mesila3D);if(M3D_LOADING)return M3D_LOADING;
 M3D_LOADING=new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='js/map3d.js';sc.onload=()=>window.Mesila3D?ok(window.Mesila3D):no(new Error('3D module missing'));sc.onerror=()=>{M3D_LOADING=null;no(new Error('3D module failed to load'))};document.head.appendChild(sc)});return M3D_LOADING}
function flat(msg){const v=V();v.mapv='2d';save();route();if(msg)toast(msg)}
function start3D(){load3D().then(lib=>{const box=$('#m3box');if(!box)return;
 if(!lib.supported()){flat('3D needs WebGL, which this browser has turned off. Showing the flat map.');return}
 const hm=homeT(),P=(la,lo)=>proj(la,lo),reg=(la,lo,dist)=>{const [x,y]=P(la,lo);return {x,y,dist}};
 box.innerHTML='';
 try{M3D=lib.create(box,{center:P(31.4,35.0),outline:OUT.map(([a,b])=>P(a,b)),
  places:INST.map(u=>{const [x,y]=P(u.lat,u.lon);return {id:u.id,label:u.short,type:u.type,x,y,color:u.c,value:u.open||0}}),
  home:(()=>{const [x,y]=P(hm.lat,hm.lon);return {x,y,label:hm.en}})(),
  regions:{all:reg(31.5,35.0,470),north:reg(32.8,35.25,230),center:reg(32.06,34.88,190),jlm:reg(31.79,35.15,130),south:reg(31.05,34.85,300)},
  view:UI.zoom,sel:UI.sel,colors:sceneColors(),reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,label:'3D map: every campus as a column, taller where more programs are open to you',
  onPick:id=>{UI.sel=id;drawMapList();M3D&&M3D.select(id);if(innerWidth<1000)$('#det').scrollIntoView({behavior:'smooth',block:'start'})}})}
 catch(e){M3D=null;flat('The 3D map could not start here. Showing the flat map.')}}).catch(()=>flat('The 3D map could not load. Showing the flat map.'))}
function drawMap(){const sv=$('#msvg');if(!sv)return;const W=sv.clientWidth,H=sv.clientHeight;if(!W||!H)return;
 const [vx,vy,vw,vh]=VB,k=Math.max(vw/W,vh/H),hm=home(),[hx,hy]=proj(hm[1],hm[2]),zoomed=UI.zoom!=='all';
 sv.setAttribute('viewBox',VB.map(v=>v.toFixed(2)).join(' '));
 let s=`<path class="land" d="${outline()}" style="fill:var(--land);stroke:var(--coast)" stroke-width="${(1.3*k).toFixed(2)}" stroke-linejoin="round"/>`;
 const [gx,gy]=proj(32.82,35.59),[dx,dy]=proj(31.5,35.48);
 s+=`<ellipse cx="${gx}" cy="${gy}" rx="4.2" ry="9" fill="var(--sea)"/><ellipse cx="${dx}" cy="${dy}" rx="4.6" ry="25" fill="var(--sea)"/>`;
 if(!zoomed)s+=`<text x="0" y="92" style="font:italic ${(11*k).toFixed(1)}px var(--text);fill:var(--mute)">Mediterranean<tspan x="0" dy="${(13*k).toFixed(1)}">Sea</tspan></text>`;
 s+=`<circle cx="${hx}" cy="${hy}" r="${(11*k).toFixed(2)}" fill="color-mix(in srgb,var(--cyan) 14%,transparent)" style="stroke:var(--cyan)" stroke-opacity=".55" stroke-width="${(1.2*k).toFixed(2)}"/><circle cx="${hx}" cy="${hy}" r="${(5*k).toFixed(2)}" style="fill:var(--ink);stroke:var(--land)" stroke-width="${(2*k).toFixed(2)}"/>`;
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
 s+=P2.map(({u,x,y,r})=>{const shape=u.type==='uni'?`<rect x="${(x-r).toFixed(2)}" y="${(y-r).toFixed(2)}" width="${(2*r).toFixed(2)}" height="${(2*r).toFixed(2)}" rx="${(r*0.35).toFixed(2)}" fill="${u.c}" style="stroke:var(--pinS)" stroke-width="${(2*k).toFixed(2)}"/>`:`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" fill="${u.c}" style="stroke:var(--pinS)" stroke-width="${(2*k).toFixed(2)}"/>`;
  return `<g class="pin" style="--pc:${u.c}" data-pin="${u.id}" tabindex="0" role="button" aria-label="${esc(u.name)}">${shape}<title>${esc(u.name)} · ${esc(u.city)}</title></g>`}).join('')+labs.join('');
 sv.innerHTML=s}
function zoomTo(z){UI.zoom=z;$$('[data-z]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.z===z));const from=VB.slice(),to=ZOOMS[z][1],t0=performance.now(),D=matchMedia('(prefers-reduced-motion: reduce)').matches?0:450;cancelAnimationFrame(anim);
 const step=t=>{const f=D?1:Math.min(1,(t-t0)/D),e=1-(1-f)**3;VB=from.map((v,i)=>v+(to[i]-v)*e);drawMap();if(f<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)}
function drawMapList(){const hm=home();const list=[...INST].map(u=>({u,d:dist(hm[1],hm[2],u.lat,u.lon)})).sort((a,b)=>a.d-b.d);
 $('#mlist').innerHTML=list.map(({u,d})=>`<button type="button" class="li" data-pin="${u.id}" aria-pressed="${UI.sel===u.id}">${emblem(u,40)}<span><b>${esc(u.name)}</b><small>${esc(u.city)} · ${u.type==='uni'?'University':'College'}</small><span class="prog" style="display:block;margin-top:6px"><i style="width:${(u.open/u.n*100).toFixed(0)}%"></i></span></span><span class="d"><b>${Math.round(d)} km</b><br>${u.open}/${u.n} open</span></button>`).join('');
 const u=IX[UI.sel];
 $('#det').innerHTML=u?`<div class="det"><div style="display:flex;gap:14px;align-items:center">${emblem(u,52)}<div><h3>${esc(u.name)}</h3><div class="mute"><bdi>${u.he}</bdi> · ${esc(u.city)}</div></div></div>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag">${u.type==='uni'?'University':'Academic college'}</span><span class="tag">${Math.round(dist(hm[1],hm[2],u.lat,u.lon))} km from ${esc(homeT().en)}</span><span class="tag">Your average ${R.av[u.id].avg?R.av[u.id].used.toFixed(1):'—'}</span></div>
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
document.addEventListener('mousedown',ev=>{const li=ev.target.closest&&ev.target.closest('[data-town]');if(li){ev.preventDefault();pickTown(li.dataset.town)}});
document.addEventListener('click',ev=>{if(ev.target.id==='scrim'){closeCust();return}
 const b=ev.target.closest('button,[data-pin]');
 if(!$('#menu').hidden&&!ev.target.closest('.me')){$('#menu').hidden=true;$('#meb').setAttribute('aria-expanded','false')}
 if(!b)return;const d=b.dataset;
 if(b.classList.contains('mode')&&b.classList.contains('thm')){const t=TH();t.mode=t.mode==='dark'?'light':'dark';applyTheme(t);return}
 if(d.pal){const t=TH();if(d.pal==='custom'&&t.pal!=='custom'){const q=palOf(t);t.custom={a1:q[1],a2:q[2],a3:q[3],a4:q[4],bg:q[5]}}t.pal=d.pal;applyTheme(t);keepScroll(drawCust);return}
 if(d.mode){const t=TH();t.mode=d.mode;applyTheme(t);$$('[data-mode]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.mode===d.mode));return}
 if(b.id==='acctBtn'){enter('acct');return}
 if(b.id==='guestBtn'){enter('guest');return}
 if(b.id==='meb'){const m=$('#menu');m.hidden=!m.hidden;b.setAttribute('aria-expanded',String(!m.hidden));return}
 if(d.go){go(d.go);return}
 if(d.act){$('#menu').hidden=true;
  if(d.act==='out'){LS.del('mesila.mode');MODE=null;go('signin');return}
  if(d.act==='sample'){S={...clone(SAMPLE),home:S.home,view:S.view};save();route();return}
  if(d.act==='cust'){openCust(d.act==='cust'&&b.closest('#menu')?$('#meb'):b);return}
  if(d.act==='custClose'){closeCust();return}
  if(d.act==='thRandom'){const t=TH();t.custom=randomPalette();t.pal='custom';applyTheme(t);keepScroll(drawCust);return}
  if(d.act==='clearf'){UI.q='';UI.top='all';UI.st='all';UI.inst='all';UI.more={};drawFilters();drawList();return}
  if(d.act==='instAll'){const v=V();v.hiddenInst=v.hiddenInst.filter(id=>IX[id].type!==d.t2);save();drawCust();rerender();return}
  if(d.act==='unhideAll'){V().hidden=[];save();drawCust();rerender();return}
  if(d.act==='viewReset'){S.view=clone(DEF_VIEW);save();drawCust();rerender();return}
  if(d.act==='undo'){if(lastHidden){const v=V();v.hidden=v.hidden.filter(id=>id!==lastHidden);lastHidden=null;save();rerender()}$('#toast').classList.remove('on');return}
  if(d.act==='restart'){const t=S.track;S={...clone(SAMPLE),track:t,home:S.home,view:S.view,sample:false,rows:TRACKS[t][3].map(s=>({s,u:DU[s]||2,g:''})),noPsy:false};save();go('bagrut');route();return}
  if(d.act==='forget'){LS.del('mesila.state');if(DOC)DOC.delete().catch(()=>{});SAVED=null;S=clone(SAMPLE);$('#saved').textContent='Saved data deleted';route();return}}
 if(d.tr){setTrack(d.tr);save();$$('[data-tr]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.tr===S.track));refreshLive();return}
 if(d.deg!=null){S.deg=d.deg==='1';save();$$('[data-deg]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.deg===d.deg));$('#degF').hidden=!S.deg;refreshLive();return}
 if(d.del!=null){S.rows.splice(+d.del,1);S.sample=false;save();compute();drawRows();refreshLive();return}
 if(b.id==='add'){const s=$('#addSel').value;if(!s){$('#addSel').focus();return}S.rows.push({s,u:5,g:''});save();compute();drawRows();const ins=$$('#rows input');ins[ins.length-1].focus();return}
 if(d.layout){V().layout=d.layout;UI.more={};save();$$('[data-layout]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.layout===d.layout));if($('#list'))drawList();return}
 if(d.save){const v=V(),k=v.saved.indexOf(d.save);if(k<0)v.saved.push(d.save);else v.saved.splice(k,1);save();$$(`[data-save="${d.save}"]`).forEach(x=>{x.setAttribute('aria-pressed',k<0);x.title=k<0?'Saved':'Save'});if($('#fb'))drawFilters();if(UI.st==='saved')drawList();toast(k<0?'Saved. Find it under Saved in the status filter.':'Removed from saved');return}
 if(d.hide){const v=V();if(!v.hidden.includes(d.hide))v.hidden.push(d.hide);lastHidden=d.hide;save();rerender();toast(`Hidden: ${esc(PIX[d.hide].n)} · ${esc(PIX[d.hide].u.short)}`,true);return}
 if(d.unhide){const v=V();v.hidden=v.hidden.filter(id=>id!==d.unhide);save();drawCust();rerender();return}
 if(d.t){UI.top=d.t;UI.more={};drawFilters();drawList();return}
 if(d.s){UI.st=d.s;drawFilters();drawList();return}
 if(d.more){UI.more[d.more]=1;drawList();return}
 if(d.z){if(M3D){UI.zoom=d.z;$$('[data-z]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.z===d.z));M3D.flyTo(d.z)}else zoomTo(d.z);return}
 if(d.mapv){V().mapv=d.mapv;save();route();return}
 if(d.pin!=null){UI.sel=d.pin||null;drawMapList();if(M3D)M3D.select(UI.sel);else drawMap();if(UI.sel&&innerWidth<1000)$('#det').scrollIntoView({behavior:'smooth',block:'start'});return}
 if(d.show){UI.inst=d.show;UI.top='all';UI.st='all';UI.q='';UI.sort='t';go('results');return}
 if(d.onmap){UI.sel=d.onmap;go('map');return}
});
document.addEventListener('keydown',ev=>{
 if(ev.target.id==='homeQ'){const ul=$('#homeList');
  if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();if(ul.hidden)drawHome();else moveHome(ev.key==='ArrowDown'?1:-1);return}
  if(ev.key==='Enter'){ev.preventDefault();if(!ul.hidden&&HL[HA])pickTown(HL[HA].id);return}
  if(ev.key==='Escape'){if(!ul.hidden){ev.preventDefault();closeHome(true)}return}}
 if(!$('#cust').hidden){if(ev.key==='Escape'){ev.preventDefault();closeCust();return}
  if(ev.key==='Tab'){const f=$$('#cust button,#cust input');const a=f[0],z=f[f.length-1];if(ev.shiftKey&&document.activeElement===a){ev.preventDefault();z.focus()}else if(!ev.shiftKey&&document.activeElement===z){ev.preventDefault();a.focus()}}}if((ev.key==='Enter'||ev.key===' ')&&ev.target.matches&&ev.target.matches('g.pin')){ev.preventDefault();ev.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}if(ev.key==='Escape'&&!$('#menu').hidden){$('#menu').hidden=true}});
document.addEventListener('input',ev=>{const t=ev.target;
 if(t.dataset&&t.dataset.thr){const th=TH();th[t.dataset.thr]=+t.value;applyTheme(th);const o=t.parentNode.querySelector('output');if(o)o.textContent=t.value}
 else if(t.dataset&&t.dataset.thc){const th=TH();if(HEX.test(t.value)){th.custom[t.dataset.thc]=t.value;th.pal='custom';applyTheme(th)}}});
document.addEventListener('focusin',ev=>{if(ev.target.id==='homeQ'){ev.target.select();drawHome()}});
document.addEventListener('focusout',ev=>{if(ev.target.id==='homeQ')setTimeout(()=>{if(document.activeElement!==$('#homeQ'))closeHome(true)},120)});
document.addEventListener('input',ev=>{const t=ev.target,tr=t.closest&&t.closest('tr[data-i]');
 if(t.id==='homeQ'){drawHome();return}
 if(tr){const r=S.rows[+tr.dataset.i];if(t.dataset.k==='s')r.s=t.value;else r[t.dataset.k]=t.value===''?'':+t.value;S.sample=false;save();later(()=>{compute();rawNote();refreshLive()});return}
 if(/^p[mqv]R$/.test(t.id)){const k=t.id.slice(0,2);S[k]=+t.value;$('#'+k).value=t.value}
 else if(['pm','pq','pv','q','v','e','dAvg'].includes(t.id)){S[t.id]=t.value===''?'':+t.value;if($('#'+t.id+'R'))$('#'+t.id+'R').value=t.value||200}
 else if(t.id==='noPsy'){S.noPsy=t.checked;$('#psyF').hidden=S.noPsy;$('#psyNote').textContent=S.noPsy?'Without a score, only bagrut-only, degree and open-admission routes count.':''}
 else if(t.id==='dEx'){S[t.id]=t.value}
 else if(t.id==='q2'){UI.q=t.value;later(drawList);return}
 else return;
 save();later(refreshLive)});
document.addEventListener('change',ev=>{const t=ev.target;
 if(t.id==='instSel'){UI.inst=t.value;UI.more={};drawFilters();drawList()}
 else if(t.id==='sort'){UI.sort=t.value;UI.more={};drawList()}
 else if(t.dataset&&t.dataset.thb){const th=TH();th[t.dataset.thb]=t.checked;applyTheme(th)}
 else if(t.dataset&&t.dataset.pref){const v=V(),ks=t.dataset.pref.split('.');let o=v;ks.slice(0,-1).forEach(k=>o=o[k]);o[ks[ks.length-1]]=t.checked;save();rerender()}
 else if(t.dataset&&t.dataset.inst){const v=V(),id=t.dataset.inst;v.hiddenInst=t.checked?v.hiddenInst.filter(x=>x!==id):[...new Set([...v.hiddenInst,id])];if(UI.inst===id)UI.inst='all';save();rerender()}
 else if(t.closest&&t.closest('tr[data-i]')&&t.tagName==='SELECT'){const r=S.rows[+t.closest('tr[data-i]').dataset.i];if(t.dataset.k==='s')r.s=t.value;else r.u=+t.value;S.sample=false;save();compute();rawNote();refreshLive()}});
window.addEventListener('hashchange',route);
// ---------- themes: four palette colours + a dark base; dark or light mode; glow, roundness, ambient light
const PALETTES={night:['Night line','#7c4dff','#4f6bff','#1fc8ff','#ff3d9a','#05060d'],synth:['Synthwave','#ff2e97','#9b3dff','#ffa53d','#2de2e6','#0d0418'],aurora:['Aurora','#14d9a0','#1fa2ff','#9b7bff','#ffd23d','#020f10'],
 ember:['Ember','#ff5a36','#ff8f3d','#ffd23d','#ff3d9a','#100806'],ocean:['Deep sea','#2563ff','#06b6d4','#2dd4bf','#a78bfa','#020a18'],signal:['Signal','#a3ff12','#2bffa3','#22e1ff','#ff3d9a','#040704']};
const DEF_THEME={pal:'night',mode:'dark',glow:44,round:60,amb:true,custom:{a1:'#7c4dff',a2:'#4f6bff',a3:'#1fc8ff',a4:'#ff3d9a',bg:'#05060d'}};
const SUN='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',MOON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
 PAL_IC='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7.2" r="1.2"/><circle cx="15" cy="7.6" r="1.2"/></svg>';
const HEX=/^#[0-9a-f]{6}$/i;
function TH(){let t=LS.get('mesila.theme');if(!t||typeof t!=='object')t={...clone(DEF_THEME),mode:t==='light'?'light':'dark'};
 for(const k in DEF_THEME)if(t[k]===undefined)t[k]=clone(DEF_THEME[k]);for(const k in DEF_THEME.custom)if(!HEX.test(t.custom[k]||''))t.custom[k]=DEF_THEME.custom[k];if(!PALETTES[t.pal]&&t.pal!=='custom')t.pal='night';return t}
const palOf=t=>t.pal==='custom'?['Custom',t.custom.a1,t.custom.a2,t.custom.a3,t.custom.a4,t.custom.bg]:PALETTES[t.pal];
function lum(h){const n=parseInt(h.slice(1),16),f=c=>(c/=255)<=.03928?c/12.92:((c+.055)/1.055)**2.4;return .2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255)}
function applyTheme(t){t=t||TH();const p=palOf(t),R=document.documentElement,st=R.style,dark=t.mode!=='light';
 R.dataset.theme=dark?'dark':'light';
 [['--a1',p[1]],['--a2',p[2]],['--a3',p[3]],['--a4',p[4]],['--bgD',p[5]]].forEach(([k,v])=>st.setProperty(k,v));
 st.setProperty('--on',(lum(p[1])+lum(p[2]))/2>.4?'#0a0d1f':'#ffffff');
 st.setProperty('--gp',Math.round(dark?t.glow:t.glow*.12)+'%');st.setProperty('--aur',Math.round(dark?6+t.glow*.4:3+t.glow*.12)+'%');st.setProperty('--amb',t.amb?'1':'0');
 const r=t.round/100;st.setProperty('--r1',(3+r*13).toFixed(1)+'px');st.setProperty('--r2',(4+r*18).toFixed(1)+'px');st.setProperty('--r3',(5+r*25).toFixed(1)+'px');
 LS.set('mesila.theme',t);const m=document.querySelector('meta[name=theme-color]');if(m)m.content=dark?p[5]:'#f6f7fb';
 $$('.thm.mode').forEach(b=>{b.innerHTML=dark?SUN:MOON;b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.title=b.getAttribute('aria-label')});
 $$('.thm.pal').forEach(b=>{b.innerHTML=PAL_IC});
 if(typeof M3D!=='undefined'&&M3D)M3D.restyle(sceneColors());return t}
function hsl2hex(h,s,l){h=((h%360)+360)%360;s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('')}
function randomPalette(){const h=Math.random()*360,step=24+Math.random()*30,sat=82+Math.random()*16;return {a1:hsl2hex(h,sat,62),a2:hsl2hex(h+step,sat,58),a3:hsl2hex(h+step*2,sat,60),a4:hsl2hex(h+180+Math.random()*40-20,95,62),bg:hsl2hex(h,45,4)}}
function themeSection(){const t=TH(),p=palOf(t);
 return `<section id="themeSec"><h4>Theme</h4><div class="thg">${Object.entries(PALETTES).map(([k,q])=>`<button type="button" class="ths" data-pal="${k}" aria-pressed="${t.pal===k}" style="--s1:${q[1]};--s2:${q[2]};--s3:${q[3]};--s4:${q[4]};--sb:${q[5]}"><span class="sw3"></span>${q[0]}</button>`).join('')}<button type="button" class="ths cu" data-pal="custom" aria-pressed="${t.pal==='custom'}"><span class="sw3"></span>Custom</button></div>
 <div class="tog wide" role="group" aria-label="Mode"><button type="button" data-mode="dark" aria-pressed="${t.mode==='dark'}">${MOON}<span>Dark</span></button><button type="button" data-mode="light" aria-pressed="${t.mode==='light'}">${SUN}<span>Light</span></button></div>
 ${t.pal==='custom'?`<div class="cc">${[['a1','Main'],['a2','Blend'],['a3','Highlight'],['a4','Accent'],['bg','Night base']].map(([k,l])=>`<label><input type="color" data-thc="${k}" value="${t.custom[k]}" aria-label="${l} colour"><span>${l}</span></label>`).join('')}</div>
  <div class="ccb"><button type="button" class="btn sec sm" data-act="thRandom">Surprise me</button></div>`:''}
 <label class="sl"><span>Glow</span><input type="range" min="0" max="100" value="${t.glow}" data-thr="glow" aria-label="Glow"><output>${t.glow}</output></label>
 <label class="sl"><span>Roundness</span><input type="range" min="0" max="100" value="${t.round}" data-thr="round" aria-label="Roundness"><output>${t.round}</output></label>
 <label class="sw"><input type="checkbox" data-thb="amb"${t.amb?' checked':''}><span class="tr" aria-hidden="true"></span><span><b>Ambient light</b><small>The coloured glow and dot grid behind the page</small></span></label></section>`}
applyTheme();
// ---------- boot
{const e=$('#siCount');if(e)e.textContent=TOTAL+' programs'}
drawSiMap();
const lm=LS.get('mesila.mode');
if(lm==='guest'){MODE='guest';drawMe();save()}
route();
initAccount();
}
