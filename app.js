const cartoons=[
{title:'Микки Маус',emoji:'🐭'},
{title:'Тачки',emoji:'🏎️'},
{title:'Щенячий патруль',emoji:'🐶'},
{title:'Свинка Пеппа',emoji:'🐷'},
{title:'Маша и Медведь',emoji:'🐻'},
{title:'Блуи',emoji:'🐕'},
{title:'Миньоны',emoji:'🍌'},
{title:'Спайди',emoji:'🕷️'}
];
const defaults={phrase:'Хорошо! Сейчас папа включит тебе мультик',enabled:cartoons.map(()=>true)};
const load=()=>{try{return {...defaults,...JSON.parse(localStorage.getItem('multikSettings')||'{}')}}catch{return {...defaults}}};
let settings=load();
const grid=document.getElementById('cartoonGrid');
const chosen=document.getElementById('chosen');
const chosenEmoji=document.getElementById('chosenEmoji');
const chosenTitle=document.getElementById('chosenTitle');
const chosenText=document.getElementById('chosenText');
const backButton=document.getElementById('backButton');
const dialog=document.getElementById('settingsDialog');
const phraseInput=document.getElementById('phraseInput');
const settingsList=document.getElementById('settingsList');

function render(){grid.innerHTML='';cartoons.forEach((c,i)=>{if(settings.enabled[i]===false)return;const b=document.createElement('button');b.className=`card c${i%8}`;b.type='button';b.innerHTML=`<span class="card-emoji">${c.emoji}</span><span>${c.title}</span>`;b.addEventListener('click',()=>choose(c));grid.appendChild(b)})}
function choose(c){const text=`${settings.phrase} про ${c.title}!`;chosenEmoji.textContent=c.emoji;chosenTitle.textContent=c.title;chosenText.textContent=text;chosen.hidden=false;if(navigator.vibrate)navigator.vibrate(80);speak(text)}
function speak(text){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ru-RU';u.rate=.88;u.pitch=1.05;speechSynthesis.speak(u)}
backButton.addEventListener('click',()=>{chosen.hidden=true;speechSynthesis?.cancel?.()});

function openSettings(){phraseInput.value=settings.phrase;settingsList.innerHTML='';cartoons.forEach((c,i)=>{const label=document.createElement('label');label.className='toggle';label.innerHTML=`<input type="checkbox" data-i="${i}" ${settings.enabled[i]!==false?'checked':''}><span>${c.emoji} ${c.title}</span>`;settingsList.appendChild(label)});dialog.showModal()}
let holdTimer=null;const trigger=document.getElementById('parentTrigger');
const startHold=()=>{clearTimeout(holdTimer);holdTimer=setTimeout(openSettings,2500)};const stopHold=()=>clearTimeout(holdTimer);
['pointerdown','touchstart'].forEach(e=>trigger.addEventListener(e,startHold,{passive:true}));['pointerup','pointercancel','pointerleave','touchend'].forEach(e=>trigger.addEventListener(e,stopHold,{passive:true}));
document.getElementById('saveSettings').addEventListener('click',e=>{e.preventDefault();settings.phrase=phraseInput.value.trim()||defaults.phrase;settings.enabled=cartoons.map((_,i)=>settingsList.querySelector(`[data-i="${i}"]`)?.checked??true);localStorage.setItem('multikSettings',JSON.stringify(settings));render();dialog.close()});

if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
let wakeLock;async function keepAwake(){try{if('wakeLock'in navigator)wakeLock=await navigator.wakeLock.request('screen')}catch{}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')keepAwake()});keepAwake();render();
