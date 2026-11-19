/* Armazenamento local. Mantém as chaves antigas (calis_level, calis_dates) — histórico preservado. */
const LS=localStorage,pad=n=>String(n).padStart(2,'0');
const ymd=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); // data LOCAL (corrige bug do UTC)
const J=(k,f)=>{try{return JSON.parse(LS.getItem(k))??f}catch(e){return f}};
const store={
 get level(){return +(LS.getItem('calis_level')||1)},set level(v){LS.setItem('calis_level',v)},
 get foco(){return LS.getItem('calis_foco')||'completo'},set foco(v){LS.setItem('calis_foco',v)},
 get tempo(){return +(LS.getItem('calis_tempo')||15)},set tempo(v){LS.setItem('calis_tempo',v)},
 get avoid(){return J('calis_avoid',[])},set avoid(v){LS.setItem('calis_avoid',JSON.stringify(v))},
 get goal(){return +(LS.getItem('calis_goal')||5)},set goal(v){LS.setItem('calis_goal',v)},
 get voice(){return LS.getItem('calis_voice')!=='0'},set voice(v){LS.setItem('calis_voice',v?1:0)},
 dates(){return J('calis_dates',[])},log(){return J('calis_log',[])},reps(){return J('calis_reps',{})},
 addRep(id,n){const o=this.reps(),e=o[id]||{h:[]},pr=!!e.best&&n>e.best.n;if(!e.best||n>e.best.n)e.best={n,d:ymd()};e.last=n;e.h=[...e.h,{d:ymd(),n}].slice(-30);o[id]=e;LS.setItem('calis_reps',JSON.stringify(o));return pr},
 toggle(d){const a=this.dates(),i=a.indexOf(d);i>=0?a.splice(i,1):a.push(d);LS.setItem('calis_dates',JSON.stringify(a.sort()))},
 complete(e){if(!this.dates().includes(e.d))this.toggle(e.d);const l=this.log();l.push(e);LS.setItem('calis_log',JSON.stringify(l))},
 rate(r){const l=this.log();if(l.length){l[l.length-1].rpe=r;LS.setItem('calis_log',JSON.stringify(l))}},
 streak(){const s=new Set(this.dates());let n=0,d=new Date();if(!s.has(ymd(d)))d.setDate(d.getDate()-1);while(s.has(ymd(d))){n++;d.setDate(d.getDate()-1)}return n},
 week(){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));const s=ymd(d);return this.dates().filter(x=>x>=s&&x<=ymd()).length}
};
