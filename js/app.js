/* UI: dashboard, progresso, biblioteca e player de treino */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
let tab='home',mo=0,flt='all',Q=[],i=0,left=0,endAt=0,rem=0,paused=false,timer=0,wake=null,ac=null,done={},t0=0,rp={},prs=new Set();
const R={1:'Fácil',2:'Ok',3:'Puxado'};
const thumb=id=>`<img src="img/${id}-${STATIC.has(id)?'main':'start'}.webp" alt="${EX[id].n}" loading="lazy">`;
const fig=id=>STATIC.has(id)?`<div class="fig still"><img src="img/${id}-main.webp" alt="${EX[id].n}" loading="lazy"></div>`
 :`<div class="fig"><img src="img/${id}-start.webp" alt="" loading="lazy"><img class="b" src="img/${id}-peak.webp" alt="${EX[id].n}" loading="lazy"></div>`;
const sv=(d,f)=>`<svg class="i${f?' f':''}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const IC={home:sv('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),chart:sv('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),dumb:sv('<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>'),
 play:sv('<path d="M7 4l13 8-13 8z"/>',1),pause:sv('<path d="M8 5v14M16 5v14"/>'),skip:sv('<path d="M5 4l10 8-10 8zM19 5v14"/>',1),swap:sv('<path d="M4 8h14l-3-3M20 16H6l3 3"/>'),
 vol:sv('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4 4 0 010 6"/>'),mute:sv('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l4 6M21 9l-4 6"/>'),x:sv('<path d="M6 6l12 12M18 6L6 18"/>'),vid:sv('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>')};
$$('#nav button').forEach((b,k)=>b.insertAdjacentHTML('afterbegin',[IC.home,IC.chart,IC.dumb][k]));
const cap=s=>s[0].toUpperCase()+s.slice(1);
const greet=()=>{const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'};
const mmss=s=>Math.floor(s/60)+':'+pad(s%60);
const yt=id=>DEMO[id]||'https://www.youtube.com/results?search_query='+encodeURIComponent('calistenia '+EX[id].n+' execução correta');
const rec=id=>{const e=store.reps()[id];return e?`<p class="mut">🏆 Recorde: ${e.best.n} · último: ${e.last}</p>`:''};
const spark=h=>{if(h.length<2)return'';const v=h.map(x=>x.n),mx=Math.max(...v),mn=Math.min(...v),w=60,hh=18;
 return `<svg viewBox="0 0 ${w} ${hh}" width="${w}" height="${hh}"><polyline fill="none" style="stroke:var(--acc)" stroke-width="1.5" points="${v.map((n,i)=>(i/(v.length-1)*w).toFixed(1)+','+(hh-1-(mx==mn?(hh-2)/2:(n-mn)/(mx-mn)*(hh-2))).toFixed(1)).join(' ')}"/></svg>`};
const repBox=id=>{const e=store.reps()[id];return `<div class="rep"><p class="mut">Quantas repetições de <b>${EX[id].n}</b>?</p><div class="st"><button id="rm">−</button><span id="rv">${e?e.last:10}</span><button id="rpl">+</button></div><button class="btn ghost" id="rok" style="margin-top:6px">Registrar</button>${e?`<p class="mut">Último: ${e.last} · Recorde: ${e.best.n}</p>`:''}</div>`};
const ring=(f,txt,sz)=>`<div class="ring" style="width:${sz}px;height:${sz}px"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34"/><circle class="p" cx="40" cy="40" r="34" stroke-dasharray="213.6" stroke-dashoffset="${213.6*(1-Math.min(1,f))}"/></svg><b>${txt}</b></div>`;
function vol(days){const l=new Date();l.setDate(l.getDate()-days+1);const s=ymd(l),o={};store.log().filter(e=>e.d>=s).forEach(e=>{for(const g in e.g)o[g]=(o[g]||0)+e.g[g]});return o}
function bars(days){const o=vol(days),mx=Math.max(60,...Object.values(o));
 if(!Object.keys(o).length)return '<div class="empty"><span>📊</span><p class="mut">Conclua o primeiro treino e o volume por grupo muscular aparece aqui.</p></div>';
 return ['core','peito','costas','bracos','pernas'].map(g=>`<div class="vb"><span>${G[g]}</span><i><b style="width:${(o[g]||0)/mx*100}%"></b></i><em>${Math.round((o[g]||0)/60)} min</em></div>`).join('')}


function home(){
 const L=LV[store.level],did=store.dates().includes(ymd()),wk=store.week(),goal=store.goal,tot=store.dates().length;
 const min=Math.round(build(false).reduce((n,x)=>n+x.time,0)/60);
 return `<header><small>${greet()}</small><h1>Calistenia</h1></header>
<section class="strip"><div id="goal">${ring(wk/goal,wk+'/'+goal,58)}<span>meta da semana<br>(toque p/ mudar)</span></div><div><b class="n">${store.streak()}</b><span>dias seguidos</span></div><div><b class="n">${tot}</b><span>dias treinados</span></div></section>
<section class="card"><span class="tag">${did?'✓ Treino de hoje feito':'Treino de hoje'}</span>
<h2>Nível ${store.level} · ${L.nome}</h2><p class="mut">~${min} min · baixo impacto · variação ${'ABC'[store.log().length%3]}</p>
<div class="chips g2" style="margin:12px 0 0">${Object.keys(FN).map(k=>`<button data-f="${k}" class="${store.foco===k?'on':''}"><i class="dot" style="background:${FC[k]}"></i>${FN[k]}</button>`).join('')}</div>
<div class="seg" style="margin-top:12px">${[15,20,25,30].map(m=>`<button data-m="${m}" class="${store.tempo===m?'on':''}">${m} min</button>`).join('')}</div>
<div class="thumbs">${mainOf().map((id,k)=>`<div style="--dl:-${(k*.43).toFixed(2)}s">${fig(id)}${EX[id].n}</div>`).join('')}</div>
</section>
<div class="gobar"><label class="chk"><input type="checkbox" id="skw"> Pular aquecimento</label><button class="btn" id="go">${IC.play} ${did?'Treinar de novo':'Iniciar treino'} · ${min} min</button></div>
<section class="card"><h3>Seu nível</h3><div class="seg">${[1,2,3].map(n=>`<button data-l="${n}" class="${store.level===n?'on':''}">${n} · ${LV[n].nome}</button>`).join('')}</div></section>
<section class="card"><h3>Evitar por desconforto</h3><div class="chips g4" style="margin:0">${Object.keys(RN).map(r=>`<button data-a="${r}" class="${store.avoid.includes(r)?'on':''}">${RN[r]}</button>`).join('')}</div><p class="mut" style="margin-top:8px">Os treinos trocam sozinhos os exercícios que sobrecarregam as regiões marcadas.</p>${store.avoid.length&&mainOf().length<6?'<p class="mut" style="margin-top:6px">⚠ Com essas restrições o treino ficou mais curto. Vale conversar com um profissional de saúde.</p>':''}</section>
<section class="card"><h3>Últimos 7 dias</h3>${bars(7)}</section>`}

function prog(){
 const n=new Date(),m=new Date(n.getFullYear(),n.getMonth()+mo,1),y=m.getFullYear(),mm=m.getMonth(),set=new Set(store.dates()),t=ymd();
 let c=['S','T','Q','Q','S','S','D'].map(x=>`<div class="h">${x}</div>`).join('')+'<div></div>'.repeat((m.getDay()+6)%7);
 for(let d=1;d<=new Date(y,mm+1,0).getDate();d++){const ds=y+'-'+pad(mm+1)+'-'+pad(d);
  c+=`<div class="d${set.has(ds)?' on':''}${ds===t?' today':''}${ds>t?' fut':''}" ${ds>t?'':`data-d="${ds}"`}>${d}</div>`}
 const h=store.log().slice(-8).reverse().map(e=>`<div class="hi"><b>${e.d.slice(8)}/${e.d.slice(5,7)}</b><span>Nível ${e.lvl} · ${e.min} min</span><em>${R[e.rpe]||'—'}</em></div>`).join('');
 const ro=Object.entries(store.reps()).sort((p,q)=>q[1].h.length-p[1].h.length).map(([id,e])=>`<div class="rc"><span>${EX[id]?EX[id].n:id}</span>${spark(e.h)}<b>${e.best.n}</b></div>`).join('');
 return `<header><h1>Progresso</h1></header>
<section class="card"><div class="mh"><button id="mp">‹</button><b>${cap(m.toLocaleDateString('pt-BR',{month:'long',year:'numeric'}))}</b><button id="mn">›</button></div><div class="cal">${c}</div>
<p class="mut" style="margin-top:10px">Toque num dia para marcar/desmarcar.</p></section>
<section class="card"><h3>Volume · 30 dias</h3>${bars(30)}</section>
<section class="card"><h3>Recordes pessoais</h3>${ro||'<p class="mut">Registre as repetições no descanso entre os exercícios para ver seus recordes.</p>'}</section>
<section class="card"><h3>Histórico</h3>${h||'<p class="mut">Nenhum treino registrado ainda.</p>'}</section>
<section class="card"><h3>Backup</h3><p class="mut">Seus dados ficam só neste aparelho. Exporte de vez em quando.</p><div class="ctl"><button id="exp">Exportar</button><label class="ghost" style="margin:0;padding:15px;text-align:center;cursor:pointer;flex:1;border-radius:14px;background:#262c3a;color:var(--txt)">Importar<input type="file" id="imp" accept="application/json" hidden></label></div></section>`}

function lib(){
 const ids=Object.keys(EX).filter(id=>flt==='all'||EX[id].g===flt);
 return `<header><h1>Exercícios</h1><small>${Object.keys(EX).length} movimentos de baixo impacto</small></header>
<div class="chips">${['all',...Object.keys(G)].map(g=>`<button data-g="${g}" class="${flt===g?'on':''}">${g==='all'?'Todos':G[g]}</button>`).join('')}</div>
${ids.map(id=>`<div class="card ex">${fig(id)}<div><h2>${EX[id].n}</h2><span class="tag">${G[EX[id].g]}</span><p class="mut">${EX[id].t}</p>${rec(id)}<a href="${yt(id)}" target="_blank" rel="noopener">${IC.vid} Ver vídeo</a></div></div>`).join('')}
<section class="card"><h3>Vídeos de apoio</h3>${VIDEOS.map(([t,v])=>`<p><a href="https://www.youtube.com/watch?v=${v}" target="_blank" rel="noopener">▶ ${t}</a></p>`).join('')}<p class="mut">Sugestões do canal Calisteniaᴺᴱᵀ. Alguns trazem saltos ou intensidade alta; adapte ao seu nível.</p></section>
<p class="mut credit">Ilustrações e dados: <a href="https://repdb.co" target="_blank" rel="noopener">Exercise data by RepDB (repdb.co)</a>. Conteúdo informativo, não é orientação médica — consulte um profissional de saúde antes de iniciar.</p>`}

function render(){document.documentElement.style.setProperty('--acc',FC[store.foco]||FC.completo);$('#view').innerHTML={home,prog,lib}[tab]();$$('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));bind()}
function bind(){const on=(s,f)=>$$(s).forEach(e=>e.onclick=()=>f(e));
 on('#go',()=>start($('#skw').checked));on('.card .seg button[data-l]',b=>{store.level=+b.dataset.l;render()});on('.card .seg button[data-m]',b=>{store.tempo=+b.dataset.m;render()});
 on('#goal',()=>{store.goal=store.goal>=7?3:store.goal+1;render()});on('.cal .d[data-d]',c=>{store.toggle(c.dataset.d);render()});
 on('#mp',()=>{mo--;render()});on('#mn',()=>{mo++;render()});on('.chips button[data-g]',b=>{flt=b.dataset.g;render()});on('.chips button[data-a]',b=>{const r=b.dataset.a,v=store.avoid;store.avoid=v.includes(r)?v.filter(x=>x!==r):[...v,r];render()});on('.chips button[data-f]',b=>{store.foco=b.dataset.f;render()});backup()}
const KEYS=['calis_level','calis_dates','calis_log','calis_reps','calis_goal','calis_tempo','calis_foco','calis_voice','calis_avoid'];
function backup(){const x=$('#exp');if(!x)return;
 x.onclick=()=>{const o={};KEYS.forEach(k=>o[k]=LS.getItem(k));const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'}));l.download='calistenia-backup-'+ymd()+'.json';l.click()};
 $('#imp').onchange=e=>{const f=e.target.files[0];if(f)f.text().then(t=>{try{const o=JSON.parse(t);KEYS.forEach(k=>{if(o[k]!=null)LS.setItem(k,o[k])});render()}catch(err){alert('Arquivo inválido')}})}}
$$('#nav button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;render();scrollTo(0,0)});

/* ---- Player ---- */
function beep(f,d){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.15;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
function say(t){if(!store.voice||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';speechSynthesis.speak(u)}
const lock=()=>{try{navigator.wakeLock?.request('screen').then(l=>wake=l).catch(()=>{})}catch(e){}};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!$('#player').hidden)lock()});
function build(skip){const L=LV[store.level],P=PRE[store.tempo],M=mainOf(),S=fix(subs(P.str)),q=[];
 if(!skip)fix(subs(P.warm.map(id=>id==='@'?L.warm:id))).forEach(id=>q.push({id,time:T.warm,ph:'Aquecimento'}));
 for(let r=1;r<=P.rounds;r++){const ph=`Treino · rodada ${r}/${P.rounds}`;
  M.forEach((id,k)=>{q.push({id,time:P.work,ph,g:EX[id].g});q.push({rest:1,time:P.rest,ph,prev:id,next:k<M.length-1?M[k+1]:r<P.rounds?M[0]:S[0]})})}
 S.forEach(id=>q.push({id,time:T.stretch,ph:'Alongamento'}));return q}
function repBind(x){if(!$('#rok'))return;let v=+$('#rv').textContent;
 $('#rm').onclick=()=>{v=Math.max(0,v-1);$('#rv').textContent=v};$('#rpl').onclick=()=>{v++;$('#rv').textContent=v};
 $('#rok').onclick=()=>{const pr=store.addRep(x.prev,v);(rp[x.prev]=rp[x.prev]||[]).push(v);if(pr)prs.add(x.prev);
  $('#player .rep').innerHTML=`<p><b>✓ ${v} repetições registradas</b></p>${pr?'<p class="pr">🏆 Novo recorde!</p>':''}`}}
function start(skip){Q=build(skip);i=0;done={};rp={};prs=new Set();t0=Date.now();beep(880,.15);lock();$('#player').hidden=false;document.body.style.overflow='hidden';step()}
function step(keep){const x=Q[i],e=EX[x.rest?x.next:x.id],nx=Q.slice(i+1).find(y=>!y.rest);
 $('#player').innerHTML=`<div class="pl"><div class="top"><button class="ib" id="qt" aria-label="Encerrar">${IC.x}</button><div class="ph">${x.ph}</div><button class="ib" id="vz" aria-label="Voz">${store.voice?IC.vol:IC.mute}</button></div><div class="stage">${fig(e.id)}</div>${!x.rest&&!STATIC.has(e.id)?'<p class="mut">Ritmo guiado · repetição <b id="rn">0</b></p>':''}
<h2>${x.rest?'Descanso':e.n}</h2><p class="mut">${x.rest?'Prepare-se: '+e.n:e.t}</p><div style="margin-top:12px">${ring(1,mmss(x.time),120)}</div>
${x.rest&&x.prev&&!ISO.has(x.prev)?repBox(x.prev):''}
<div class="pb"><i style="width:${i/Q.length*100}%"></i></div><p class="mut">${i+1} de ${Q.length}${nx&&!x.rest?' · Próximo: '+EX[nx.id].n:''}</p>
<div class="ctl"><button id="pz">${IC.pause} Pausar</button><button id="sk">Pular ${IC.skip}</button></div>
${x.rest?'':`<button class="swb" id="sw">${IC.swap} Trocar exercício</button>`}</div>`;
 $('#pz').onclick=()=>{paused=!paused;paused?rem=endAt-Date.now():endAt=Date.now()+rem;$('#player').classList.toggle('pz',paused);$('#pz').innerHTML=paused?IC.play+' Continuar':IC.pause+' Pausar'};
 $('#sk').onclick=next;if($('#sw'))$('#sw').onclick=swap;$('#player').className=x.rest?'rest':'';$('#qt').onclick=quit;$('#vz').onclick=()=>{store.voice=!store.voice;$('#vz').innerHTML=store.voice?IC.vol:IC.mute};
 paused=false;left=x.time;endAt=Date.now()+(keep?rem:x.time*1000);clearInterval(timer);timer=setInterval(tick,200);say(x.rest?'Descanso. Próximo, '+e.n:e.n);repBind(x)}
function tick(){if(paused)return;const x=Q[i],ms=endAt-Date.now(),r=Math.max(0,Math.ceil(ms/1000));
 $('#player .p').style.strokeDashoffset=213.6*(1-Math.max(0,ms)/(x.time*1000));
 const rn=$('#rn');if(rn)rn.textContent=Math.floor((x.time*1000-Math.max(0,ms))/3400);$('#player .ring').classList.toggle('hot',r>0&&r<=3);
 if(r!==left){left=r;$('#player .ring b').textContent=mmss(r);if(r>0&&r<=3)beep(660,.12)}
 if(ms<=0){beep(990,.35);if(x.g)done[x.g]=(done[x.g]||0)+x.time;next()}}
function quit(){const was=paused;if(!was){paused=true;rem=endAt-Date.now()}$('#player').classList.add('pz');
 const sh=document.createElement('div');sh.id='sheet';sh.innerHTML='<div class="sp"><h2>Encerrar o treino?</h2><p class="mut" style="margin:8px 0 16px">O progresso desta sessão não será salvo.</p><button class="btn" id="kp">Continuar treinando</button><button class="btn ghost" id="ke">Encerrar</button></div>';$('#player').appendChild(sh);
 $('#kp').onclick=()=>{sh.remove();if(!was){paused=false;endAt=Date.now()+rem;$('#player').classList.remove('pz')}};$('#ke').onclick=()=>{sh.remove();close()}}
function swap(){const was=paused,x=Q[i];if(!was){paused=true;rem=endAt-Date.now()}let reg='',easy=false;
 const sh=document.createElement('div');sh.id='sheet';$('#player').appendChild(sh);
 const draw=()=>{const ex=Q.map(y=>y.id);let l=(reg||easy)?cands(x.id,reg?[reg]:[],ex,easy):[];if(easy&&!l.length)l=cands(x.id,reg?[reg]:[],ex);l=l.slice(0,4);
  sh.innerHTML=`<div class="sp"><h2>O que está incomodando?</h2><div class="chips" style="margin-top:12px">${Object.keys(RN).map(r=>`<button data-r="${r}" class="${reg===r?'on':''}">${RN[r]}</button>`).join('')}<button data-r="leve" class="${easy?'on':''}">Só mais leve</button></div>
${l.map(k=>`<div class="alt" data-k="${k}">${thumb(k)}<div><b>${EX[k].n}</b><p class="mut">${EX[k].t}</p></div></div>`).join('')||'<p class="mut">Escolha uma região acima para ver as alternativas.</p>'}
${reg?`<label class="chk"><input type="checkbox" id="rem"> Evitar ${RN[reg].toLowerCase()} nos próximos treinos</label>`:''}
<p class="mut" style="font-size:.8rem;margin-top:12px">Se a dor for forte ou persistir, procure um profissional de saúde.</p><button class="ghost" id="cx">Cancelar</button></div>`;
  sh.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{b.dataset.r==='leve'?easy=!easy:reg=reg===b.dataset.r?'':b.dataset.r;draw()});
  sh.querySelectorAll('.alt').forEach(a=>a.onclick=()=>{const n=a.dataset.k,o=x.id,m=sh.querySelector('#rem');if(reg&&m&&m.checked&&!store.avoid.includes(reg))store.avoid=[...store.avoid,reg];
   Q.forEach((y,j)=>{if(j>=i){if(y.id===o){y.id=n;y.g=EX[n].g}if(y.prev===o)y.prev=n;if(y.next===o)y.next=n}});sh.remove();paused=false;endAt=Date.now()+rem;step(true)});
  sh.querySelector('#cx').onclick=()=>{sh.remove();if(!was){paused=false;endAt=Date.now()+rem}}};draw()}
function confetti(){const d=document.createElement('div');d.className='cf';d.innerHTML=Array.from({length:40},(_,k)=>`<i style="left:${Math.random()*100}%;background:${['#ffb03a','#4ade80','#60a5fa','#f472b6'][k%4]};animation-delay:${(Math.random()*.8).toFixed(2)}s"></i>`).join('');$('#player').appendChild(d);setTimeout(()=>d.remove(),4000)}
function next(){i++;i>=Q.length?finish():step()}
function close(){clearInterval(timer);window.speechSynthesis?.cancel();wake?.release?.();wake=null;$('#player').hidden=true;document.body.style.overflow='';render()}
function finish(){clearInterval(timer);const min=Math.max(1,Math.round((Date.now()-t0)/60000));
 store.complete({d:ymd(),lvl:store.level,foco:store.foco,tempo:store.tempo,min,g:done,rp});say('Treino concluído. Parabéns!');
 const tot=Object.values(rp).flat().reduce((s,n)=>s+n,0),extra=(tot?`<p class="mut">${tot} repetições registradas</p>`:'')+(prs.size?`<h3 style="margin-top:20px">🏆 Novos recordes</h3>${[...prs].map(id=>`<p>${EX[id].n}: <b style="color:var(--acc)">${store.reps()[id].best.n}</b></p>`).join('')}`:'');
 $('#player').innerHTML=`<div class="pl"><div class="big">🏆</div><h1>Treino concluído!</h1><p class="mut">${min} min · ${store.dates().length} dia(s) treinados · ${store.streak()} seguido(s)</p>
${extra}<h3 style="margin-top:24px">Como foi?</h3><div class="seg" id="rt"><button data-r="1">Fácil</button><button data-r="2">Ok</button><button data-r="3">Puxado</button></div>
<div id="sug"></div><button class="btn" id="fh">Voltar ao início</button></div>`;
 $$('#rt button').forEach(b=>b.onclick=()=>{const r=+b.dataset.r,L=store.level;store.rate(r);$$('#rt button').forEach(x=>x.classList.toggle('on',x===b));
  $('#sug').innerHTML=r===1&&L<3?`<button class="btn ghost" id="ch" data-l="${L+1}">Subir para o nível ${L+1}</button>`:r===3&&L>1?`<button class="btn ghost" id="ch" data-l="${L-1}">Voltar ao nível ${L-1}</button>`:'';
  const c=$('#ch');if(c)c.onclick=()=>{store.level=+c.dataset.l;c.textContent='Nível alterado ✓'}});
 confetti();$('#fh').onclick=close}

render();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
