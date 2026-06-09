let current=0;const screens=[...document.querySelectorAll('.screen')];
const bgm=new Audio('assets/goofy-loop.mp3');bgm.loop=true;bgm.volume=.42;
const boing=new Audio('assets/boing.mp3');boing.volume=.75;
const boom=new Audio('assets/boom.mp3');boom.volume=.8;
const sparkle=new Audio('assets/sparkle.mp3');sparkle.volume=.85;
let soundOn=false;
function startSound(){if(soundOn)return;soundOn=true;bgm.play().catch(()=>{});document.body.classList.add('sound-on');}
function play(a){try{a.currentTime=0;a.play().catch(()=>{});}catch(e){}}
function nextScreen(){startSound();play(boom);screens[current].classList.remove('active');current++;screens[current].classList.add('active')}
function showFinal(){startSound();bgm.pause();play(sparkle);screens[current].classList.remove('active');current=4;screens[current].classList.add('active');}
const glow=document.querySelector('.cursorGlow');document.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});
const noBtn=document.getElementById('noBtn');const area=document.getElementById('buttonsArea');const taunt=document.getElementById('taunt');let escapes=0;function escapeNo(){startSound();play(boing);const ar=area.getBoundingClientRect();const bw=noBtn.offsetWidth,bh=noBtn.offsetHeight;const x=Math.max(0,Math.random()*(ar.width-bw));const y=Math.max(0,Math.random()*(ar.height-bh));noBtn.style.left=x+'px';noBtn.style.top=y+'px';escapes++;const lines=['Too slow.','Not happening.','Button escaped successfully.','Ahona vs NO button: 0-1','Just click YES bro.','NO access denied.'];taunt.textContent=lines[escapes%lines.length];if(escapes>7){noBtn.textContent='NO (still impossible)';}}
noBtn.addEventListener('pointerenter',escapeNo);noBtn.addEventListener('touchstart',e=>{e.preventDefault();escapeNo();});noBtn.addEventListener('click',e=>{e.preventDefault();escapeNo();});
document.querySelectorAll('video').forEach(v=>{v.muted=true;v.playsInline=true;v.play().catch(()=>{});});
// small music control
const btn=document.createElement('button');btn.className='music-toggle';btn.textContent='🔊 goofy mode';btn.onclick=()=>{startSound(); if(bgm.paused){bgm.play();btn.textContent='🔊 goofy mode'}else{bgm.pause();btn.textContent='🔇 music off'}};document.body.appendChild(btn);
