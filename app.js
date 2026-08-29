const cartoons=[
{title:'Микки Маус',image:'https://thumbs.dfs.ivi.ru/storage0/contents/f/2/19db4912db4f20a5adcc76074b341d.jpg'},
{title:'Маша и Медведь',image:'https://multyashka.at.ua/_ld/0/15.jpg'},
{title:'Баранчик Шон',image:'https://lostplay.ru/img/shaun-the-sheep.jpg'},
{title:'Пингвины',image:'https://kor.ill.in.ua/m/1260x900/1537912.jpg'},
{title:'Буба',image:'https://fanfics.me/images/fandoms_canons/1974-1626803723-big.jpg'},
{title:'Барбоскины',image:'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/8953e4f7-b758-4c79-84dd-9e26b30f19d8/600x900'}
];
const grid=document.getElementById('cartoonGrid');
function render(){grid.innerHTML='';cartoons.forEach((c,i)=>{const b=document.createElement('button');b.className=`card c${i}`;b.type='button';b.setAttribute('aria-label',c.title);b.innerHTML=`<img class="card-image" src="${c.image}" alt="${c.title}" loading="eager"><span class="card-title">${c.title}</span>`;b.addEventListener('click',()=>choose(c));grid.appendChild(b)})}
function choose(c){if(navigator.vibrate)navigator.vibrate(55);speak(c.title);document.querySelectorAll('.card').forEach(x=>x.classList.remove('picked'));event?.currentTarget?.classList.add('picked');setTimeout(()=>event?.currentTarget?.classList.remove('picked'),450)}
function speak(text){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ru-RU';u.rate=.92;u.pitch=1;speechSynthesis.speak(u)}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
let wakeLock;async function keepAwake(){try{if('wakeLock'in navigator)wakeLock=await navigator.wakeLock.request('screen')}catch{}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')keepAwake()});keepAwake();render();
