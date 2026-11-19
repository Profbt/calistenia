/* Catálogo e programa de treino. Para adicionar exercício: nova linha em EX + imagens em img/<id>-start|peak|main.webp */
const G={core:'Barriga',peito:'Peito',costas:'Costas',bracos:'Braços',pernas:'Pernas',geral:'Corpo todo'};
const STATIC=new Set('triceps-dip-hold-bench dolphin-pose reverse-tabletop-hold bird-dog-hold supported-single-leg-stand tandem-stance heel-to-toe-walk heel-flicks kneeling-wrist-stretch standing-quad-stretch standing-calf-stretch seated-spinal-twist pigeon-stretch wall-sit downward-dog thread-the-needle kneeling-hip-flexor-stretch hollow-body-hold side-plank locust-pose torso-twists cat-cow high-knees bear-plank-hold plank reverse-plank standing-side-bend doorway-chest-stretch cross-body-shoulder-stretch cobra-stretch childs-pose supine-spinal-twist standing-forward-fold overhead-triceps-stretch'.split(' '));
const EX={};
[ // id, nome, grupo, dica
['torso-twists','Torção de tronco','core','Giro suave, ombros soltos'],
['cat-cow','Gato e vaca','costas','Arredonde e estenda a coluna, devagar'],
['leg-swing-front-to-back','Balanço de pernas','pernas','Apoie-se na parede se precisar'],
['worlds-greatest-stretch','Alongamento dinâmico','geral','Abra o peito a cada passo'],
['inchworm','Lagarta','geral','Caminhe com as mãos até a prancha'],
['high-knees','Marcha de joelhos altos','geral','Sem saltos, ritmo confortável'],
['jumping-jacks','Polichinelo','geral','Ritmo forte; troque pela marcha se incomodar o joelho'],
['wall-push-ups','Flexão na parede','peito','Corpo reto, desça devagar'],
['incline-push-ups','Flexão inclinada','peito','Mãos em banco ou sofá firme'],
['push-up','Flexão completa','peito','Abdômen firme, peito quase no chão'],
['bear-plank-hold','Prancha com joelhos','core','Joelhos apoiados, quadril alinhado'],
['plank','Prancha','core','Cotovelos sob os ombros, abdômen contraído'],
['plank-knee-tuck','Prancha com joelho ao peito','core','Alterne sem balançar o quadril'],
['bodyweight-squat','Agachamento','pernas','Joelhos acompanham os pés, coluna reta'],
['bodyweight-reverse-lunge','Afundo para trás','pernas','Passo atrás controlado'],
['split-squat','Agachamento dividido','pernas','Tronco ereto, desça reto'],
['crunches','Abdominal curto','core','Suba só as escápulas, sem puxar o pescoço'],
['bicycle-crunch','Abdominal bicicleta','core','Cotovelo ao joelho oposto, devagar'],
['russian-twist','Giro russo','core','Gire o tronco, não só os braços'],
['superman','Superman','costas','Suba braços e pernas, segure 2s'],
['bird-dog','Cachorro-pássaro','costas','Braço e perna opostos, quadril parado'],
['reverse-plank','Prancha invertida','costas','Quadril alto, peito aberto'],
['bench-dips','Mergulho na cadeira','bracos','Cadeira firme, cotovelos para trás'],
['close-grip-push-ups','Flexão fechada','bracos','Mãos sob o peito, cotovelos junto ao corpo'],
['diamond-push-ups','Flexão diamante','bracos','Mãos em losango; apoie os joelhos se precisar'],
['standing-side-bend','Inclinação lateral','core','Respire fundo e troque o lado'],
['doorway-chest-stretch','Abertura de peito','peito','Antebraço no batente, giro suave'],
['cross-body-shoulder-stretch','Alongar ombro','bracos','Puxe o braço cruzado ao peito'],
['cobra-stretch','Cobra','core','Quadril no chão, peito alto'],
['childs-pose','Postura da criança','costas','Relaxe a lombar e respire'],
['supine-spinal-twist','Torção deitado','costas','Ombros no chão, joelhos para o lado'],
['standing-forward-fold','Flexão à frente em pé','pernas','Joelhos levemente dobrados'],
['overhead-triceps-stretch','Alongar tríceps','bracos','Cotovelo para cima, mão nas costas'],
['mountain-climbers','Alpinista','core','Joelho ao peito, ritmo controlado, sem saltar'],
['glute-bridge','Elevação pélvica','pernas','Suba o quadril apertando o glúteo'],
['single-leg-glute-bridge','Elevação pélvica unilateral','pernas','Quadril nivelado, uma perna por vez'],
['dead-bug','Inseto morto','core','Lombar colada no chão, braço e perna opostos'],
['hollow-body-hold','Hollow body','core','Lombar no chão; dobre os joelhos se precisar'],
['step-ups','Subida no banco','pernas','Banco firme, suba e desça controlando'],
['side-plank','Prancha lateral','core','Quadril alto, corpo em linha'],
['lying-leg-raise','Elevação de pernas','core','Desça devagar sem arquear a lombar'],
['locust-pose','Gafanhoto','costas','Suba peito e pernas, olhe para o chão'],
['knee-push-ups','Flexão com joelhos','peito','Joelhos apoiados, corpo em linha'],
['reverse-crunches','Abdominal invertido','core','Suba o quadril sem balançar as pernas'],
['flutter-kicks','Chute alternado deitado','core','Lombar no chão, chutes curtos e controlados'],
['heel-touches','Toque nos calcanhares','core','Incline o tronco de lado e toque o calcanhar'],
['cross-body-crunch','Abdominal cruzado','core','Ombro em direção ao joelho oposto, devagar'],
['wall-sit','Cadeirinha na parede','pernas','Costas na parede, joelhos a 90°'],
['side-lunge','Afundo lateral','pernas','Sente para o lado, a outra perna estendida'],
['bodyweight-good-morning','Bom dia (quadril)','costas','Joelhos leves, coluna reta, quadril para trás'],
['wide-grip-push-ups','Flexão aberta','peito','Mãos além dos ombros, desça controlando'],
['pike-push-ups','Flexão em V','bracos','Quadril alto, cabeça passa entre os braços'],
['downward-dog','Cachorro olhando para baixo','costas','Empurre o chão, calcanhares descendo'],
['thread-the-needle','Agulha (rotação de ombro)','costas','Passe o braço sob o corpo, ombro no chão'],
['kneeling-hip-flexor-stretch','Alongar flexor do quadril','pernas','Quadril à frente, tronco ereto'],
['spiderman-push-up','Flexão aranha','peito','Joelho ao cotovelo a cada repetição, quadril firme'],
['decline-push-up','Flexão com pés elevados','peito','Pés num banco baixo, corpo em linha'],
['crab-dips','Mergulho de caranguejo','bracos','Mãos atrás, quadril alto, cotovelos para trás'],
['triceps-dip-hold-bench','Sustentação de tríceps no banco','bracos','Cotovelos a 90°, ombros longe das orelhas'],
['dolphin-pose','Postura do golfinho','bracos','Antebraços no chão, quadril alto, empurre o chão'],
['pilates-roll-down','Rolagem de coluna','costas','Desça vértebra por vértebra, abdômen para dentro'],
['reverse-tabletop-hold','Mesa invertida','costas','Quadril alto, ombros sobre as mãos'],
['bird-dog-hold','Cachorro-pássaro com pausa','costas','Segure braço e perna estendidos, quadril parado'],
['supported-single-leg-stand','Equilíbrio em uma perna','pernas','Apoie-se na parede e troque a perna'],
['tandem-stance','Pés em linha','pernas','Um pé à frente do outro, olhar fixo'],
['step-up-to-balance','Subida com equilíbrio','pernas','Suba, segure 2s em uma perna e desça controlando'],
['heel-to-toe-walk','Caminhada calcanhar-ponta','pernas','Passos em linha reta, devagar'],
['clamshells','Concha (clamshell)','pernas','Deitado de lado, abra o joelho sem girar o quadril'],
['fire-hydrant','Hidrante','pernas','Em quatro apoios, abra o joelho para o lado'],
['side-lying-hip-abduction','Elevação lateral de perna','pernas','Deitado de lado, suba a perna sem girar o quadril'],
['bodyweight-calf-raise','Elevação de panturrilha','pernas','Suba na ponta dos pés e desça devagar'],
['single-leg-calf-raise','Panturrilha em uma perna','pernas','Apoie a mão na parede para manter o equilíbrio'],
['heel-flicks','Chute no glúteo','geral','Calcanhar ao glúteo, ritmo leve'],
['bear-crawl','Rastejar de urso','geral','Joelhos baixos, passos curtos e controlados'],
['lateral-leg-swing','Balanço lateral de pernas','pernas','Apoie na parede, balanço suave de lado'],
['kneeling-wrist-stretch','Alongar punhos','bracos','De joelhos, palmas no chão, incline devagar'],
['standing-quad-stretch','Alongar quadríceps','pernas','Calcanhar ao glúteo, joelhos juntos'],
['standing-calf-stretch','Alongar panturrilha','pernas','Calcanhar no chão, incline o tronco à frente'],
['seated-spinal-twist','Torção sentada','costas','Coluna alta, gire a partir do tronco'],
['pigeon-stretch','Alongamento do pombo','pernas','Quadril ao chão; apoie com almofada se precisar'],
].forEach(([id,n,g,t])=>EX[id]={id,n,g,t});
const WARM=['torso-twists','cat-cow','leg-swing-front-to-back','worlds-greatest-stretch','inchworm'];
const STRETCH=['standing-side-bend','doorway-chest-stretch','cross-body-shoulder-stretch','cobra-stretch','childs-pose','supine-spinal-twist','standing-forward-fold','overhead-triceps-stretch'];
const LV=[null,
{nome:'Base',warm:'high-knees',main:['wall-push-ups','bear-plank-hold','bodyweight-squat','crunches','superman','bench-dips']},
{nome:'Evolução',warm:'high-knees',main:['incline-push-ups','plank','bodyweight-reverse-lunge','bicycle-crunch','bird-dog','close-grip-push-ups']},
{nome:'Forte',warm:'jumping-jacks',main:['push-up','plank-knee-tuck','split-squat','russian-twist','reverse-plank','diamond-push-ups']}];
const T={warm:30,work:45,rest:15,rounds:3,stretch:30};
const DEMO={}; // id -> link de vídeo escolhido por você, ex.: 'plank':'https://youtu.be/XXXX'
/* Foco do treino: lista dos 6 exercícios principais por nível (índice 1..3) */
const FN={completo:'Completo',barriga:'Barriga',peito:'Peito e braços',costas:'Costas e pernas'};
const FOC={
 barriga:[null,'dead-bug bear-plank-hold crunches glute-bridge superman side-plank','bicycle-crunch plank lying-leg-raise mountain-climbers bird-dog side-plank','russian-twist plank-knee-tuck hollow-body-hold mountain-climbers reverse-plank side-plank'],
 peito:[null,'wall-push-ups incline-push-ups bench-dips bear-plank-hold bird-dog crunches','knee-push-ups close-grip-push-ups crab-dips plank bird-dog bicycle-crunch','push-up diamond-push-ups decline-push-up plank-knee-tuck reverse-plank dolphin-pose'],
 costas:[null,'superman bodyweight-squat glute-bridge bird-dog bear-plank-hold pilates-roll-down','bird-dog bodyweight-reverse-lunge glute-bridge locust-pose step-ups reverse-tabletop-hold','reverse-plank split-squat single-leg-glute-bridge locust-pose step-ups single-leg-calf-raise']};
const mainOf=()=>fix(subs(store.foco==='completo'?LV[store.level].main:FOC[store.foco][store.level].split(' ')));
/* Sugestões do canal Calisteniaᴺᴱᵀ (calistenia.net) — alguns trazem saltos/intensidade alta: adapte */
const VIDEOS=[['Costas sem equipamento','ZbsBvRdLOXQ'],['Peito para iniciantes','BPMtdraPA4E'],['Abdômen curto','XHuz7qoHcOs'],['Core completo em casa','XxCsD9q8uAA'],['Peito, ombros e tríceps','vl1MeY56IGc'],['Corpo inteiro (15 min)','C3P_wk3Mpyw']];
/* Variação A/B/C: a cada treino concluído alterna substituições (só se o substituto ainda não estiver na lista) */
const SUB={'crunches':'cross-body-crunch','bicycle-crunch':'heel-touches','russian-twist':'flutter-kicks','lying-leg-raise':'reverse-crunches','bodyweight-squat':'wall-sit','bodyweight-reverse-lunge':'side-lunge','superman':'bodyweight-good-morning','push-up':'wide-grip-push-ups','close-grip-push-ups':'pike-push-ups','cobra-stretch':'downward-dog','supine-spinal-twist':'thread-the-needle','standing-forward-fold':'kneeling-hip-flexor-stretch','inchworm':'bear-crawl','leg-swing-front-to-back':'lateral-leg-swing','high-knees':'heel-flicks','standing-side-bend':'seated-spinal-twist','childs-pose':'pigeon-stretch','diamond-push-ups':'spiderman-push-up'};
const SUB2={'bird-dog':'bird-dog-hold','step-ups':'step-up-to-balance','bodyweight-squat':'step-up-to-balance','glute-bridge':'clamshells','single-leg-glute-bridge':'side-lying-hip-abduction','locust-pose':'fire-hydrant','reverse-plank':'reverse-tabletop-hold','superman':'pilates-roll-down','crab-dips':'triceps-dip-hold-bench','close-grip-push-ups':'crab-dips','worlds-greatest-stretch':'heel-to-toe-walk','leg-swing-front-to-back':'bodyweight-calf-raise','cat-cow':'supported-single-leg-stand','inchworm':'tandem-stance','standing-side-bend':'standing-calf-stretch','overhead-triceps-stretch':'standing-quad-stretch','cross-body-shoulder-stretch':'kneeling-wrist-stretch'};
const subs=a=>{const v=store.log().length%3,M=v===1?SUB:v===2?SUB2:null;return M?a.map(id=>M[id]&&!a.includes(M[id])?M[id]:id):a};
/* Presets de duração (min): aquecimento, rodadas, tempo de trabalho/descanso (s), alongamento. '@' = aquecimento final do nível */
const ST4=['standing-side-bend','doorway-chest-stretch','cobra-stretch','childs-pose'];
const PRE={
 15:{warm:['torso-twists','worlds-greatest-stretch','@'],rounds:2,work:45,rest:15,str:ST4},
 20:{warm:['torso-twists','cat-cow','worlds-greatest-stretch','@'],rounds:3,work:40,rest:15,str:ST4},
 25:{warm:[...WARM,'@'],rounds:3,work:45,rest:15,str:STRETCH},
 30:{warm:[...WARM,'@'],rounds:4,work:45,rest:15,str:STRETCH}};

/* Exercícios isométricos (sem contagem de repetições) */
const ISO=new Set('triceps-dip-hold-bench reverse-tabletop-hold bird-dog-hold bear-plank-hold plank reverse-plank side-plank hollow-body-hold wall-sit'.split(' '));

/* Desconforto: regiões e exercícios que as sobrecarregam; dificuldade 1-3 */
const RN={ombro:'Ombro',punho:'Punho',joelho:'Joelho',lombar:'Lombar'};
const STRESS={
 ombro:'push-up knee-push-ups incline-push-ups wide-grip-push-ups close-grip-push-ups diamond-push-ups pike-push-ups bench-dips plank bear-plank-hold plank-knee-tuck side-plank mountain-climbers reverse-plank bird-dog inchworm downward-dog doorway-chest-stretch cross-body-shoulder-stretch overhead-triceps-stretch thread-the-needle cat-cow spiderman-push-up decline-push-up crab-dips triceps-dip-hold-bench dolphin-pose reverse-tabletop-hold bear-crawl bird-dog-hold'.split(' '),
 punho:'push-up knee-push-ups incline-push-ups wide-grip-push-ups close-grip-push-ups diamond-push-ups pike-push-ups bench-dips plank bear-plank-hold plank-knee-tuck side-plank mountain-climbers reverse-plank bird-dog inchworm cat-cow downward-dog cobra-stretch thread-the-needle spiderman-push-up decline-push-up crab-dips triceps-dip-hold-bench reverse-tabletop-hold bear-crawl bird-dog-hold kneeling-wrist-stretch fire-hydrant'.split(' '),
 joelho:'bodyweight-squat bodyweight-reverse-lunge split-squat step-ups side-lunge wall-sit jumping-jacks high-knees knee-push-ups bear-plank-hold plank-knee-tuck mountain-climbers worlds-greatest-stretch cat-cow bird-dog childs-pose kneeling-hip-flexor-stretch step-up-to-balance bear-crawl fire-hydrant pigeon-stretch standing-quad-stretch heel-flicks'.split(' '),
 lombar:'crunches cross-body-crunch bicycle-crunch heel-touches russian-twist lying-leg-raise reverse-crunches flutter-kicks hollow-body-hold superman locust-pose bodyweight-good-morning reverse-plank torso-twists cobra-stretch standing-forward-fold pilates-roll-down seated-spinal-twist dolphin-pose'.split(' ')};
const DIF={};[['pilates-roll-down reverse-tabletop-hold step-up-to-balance clamshells fire-hydrant side-lying-hip-abduction',1],
['wall-push-ups bear-plank-hold crunches superman bench-dips dead-bug glute-bridge cross-body-crunch bodyweight-squat wall-sit',1],
['crab-dips triceps-dip-hold-bench dolphin-pose bird-dog-hold single-leg-calf-raise',2],
['incline-push-ups knee-push-ups plank bodyweight-reverse-lunge bicycle-crunch bird-dog close-grip-push-ups lying-leg-raise mountain-climbers side-plank locust-pose step-ups side-lunge heel-touches reverse-crunches flutter-kicks bodyweight-good-morning pike-push-ups',2],
['spiderman-push-up decline-push-up',3],
['push-up plank-knee-tuck split-squat russian-twist reverse-plank diamond-push-ups hollow-body-hold single-leg-glute-bridge wide-grip-push-ups',3]].forEach(([s,d])=>s.split(' ').forEach(id=>DIF[id]=d));
const WARMS=new Set([...WARM,'high-knees','jumping-jacks','heel-flicks','bear-crawl','lateral-leg-swing','bodyweight-calf-raise','supported-single-leg-stand','tandem-stance','heel-to-toe-walk']),STRS=new Set([...STRETCH,'downward-dog','thread-the-needle','kneeling-hip-flexor-stretch','kneeling-wrist-stretch','standing-quad-stretch','standing-calf-stretch','seated-spinal-twist','pigeon-stretch']);
const kind=id=>WARMS.has(id)?'w':STRS.has(id)?'s':'m';
/* alternativas do mesmo tipo (aquecimento/treino/alongamento) que não sobrecarregam as regiões; mesmo grupo e dificuldade parecida primeiro */
const cands=(id,regs,ex,easy)=>Object.keys(EX).filter(k=>kind(k)===kind(id)&&k!==id&&!ex.includes(k)&&!regs.some(r=>STRESS[r].includes(k))&&(!easy||(DIF[k]||1)<(DIF[id]||2)))
 .sort((a,b)=>(EX[b].g===EX[id].g)-(EX[a].g===EX[id].g)||Math.abs((DIF[a]||1)-(DIF[id]||1))-Math.abs((DIF[b]||1)-(DIF[id]||1)));
/* sem alternativa segura: o exercício é omitido (o treino fica mais curto) */
const fix=a=>{const av=store.avoid;if(!av.length)return a;const o=[...a],del=new Set();o.forEach((id,i)=>{if(av.some(r=>STRESS[r].includes(id))){const c=cands(id,av,o)[0];if(c)o[i]=c;else del.add(i)}});return del.size?o.filter((_,i)=>!del.has(i)):o};

/* Cor de destaque por foco */
const FC={completo:'#ffb03a',barriga:'#ff7a45',peito:'#4aa8ff',costas:'#a78bfa'};
