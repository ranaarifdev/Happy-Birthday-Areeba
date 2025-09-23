/* ----------------------------
  Matrix / falling code background
   ---------------------------- */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
const cols = Math.floor(w / 18) + 1;
const ypos = Array(cols).fill(0);

function matrixResize() {
  canvas.width = w = innerWidth;
  canvas.height = h = innerHeight;
}
window.addEventListener('resize', matrixResize);

function matrixLoop() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#05ff05';
  ctx.font = '14px monospace';

  for (let i = 0; i < ypos.length; i++) {
    const text = String.fromCharCode(33 + Math.random() * 94);
    const x = i * 18;
    ctx.fillText(text, x, ypos[i] * 18);

    if (ypos[i] * 18 > h && Math.random() > 0.975) ypos[i] = 0;
    ypos[i]++;
  }
  requestAnimationFrame(matrixLoop);
}
matrixLoop();

/* ----------------------------
  Modal / typewriter wish
   ---------------------------- */
const giftBox = document.getElementById('giftBox');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const typewriter = document.getElementById('typewriter');

const longWish = `Talha Zaffar — listen up, birthday protocol engaged! 🚀
As a dedicated cyber security student you already run periodic scans on systems — today we run a scan on happiness and the result is: 100% PASS. I (Rana Arif) am issuing you a permanent license for joy, valid until forever. 

Imagine your day as a secure server: the firewall is strong, the cookies are sweet, and all suspicious frowns are port-blocked. If life's logs try to throw an error, simply reboot with cake. When exams attack like a nasty bot, counter with a meme and a well-timed 'lol' — it's an approved defense.

May your password suggestions always be creative, your two-factor authentication be hugs + laughter, and your backups include extra slices of cake. May your packet loss be zero, your uptime be legendary, and may every '404' you encounter be an opportunity to discover a better route in life.

This year, may you find zero-day happiness (the good kind), patch vulnerabilities with new skills, and escalate privileges only to reach your dreams. May your shell prompt always greet you kindly, and may your shell history keep only the best commands. Blow out the candles like executing a graceful shutdown: calm, skilled, and followed by applause.

I sign this wish with full authenticity: keep hacking life the ethical way, keep learning, keep laughing, and keep being the brilliant, silly, unstoppable friend we all admire. Happy birthday, Talha — may your logs be filled with success messages and your inbox only ever receive good news. 🎂🎉`;

function typeWrite(text, el, speed = 16) {
  el.textContent = '';
  let i = 0;
  (function next() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(next, speed);
    }
  })();
}

giftBox.addEventListener('click', () => {
  // change background gradient for a moment
  document.documentElement.style.setProperty('--bg', '#02060a');
  // open modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  // start typing after small delay
  setTimeout(()=> typeWrite(longWish, typewriter, 14), 260);
});

// close controls
closeBtn.addEventListener('click', closeModal);
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  typewriter.textContent = '';
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

/* ----------------------------
  Center-screen hacker popups on scroll
   ---------------------------- */
const popupContainer = document.getElementById('popupContainer');

const popMessages = [
  '⚠️ Firewall Breached… oh wait, it\'s just your birthday cake!',
  '💻 Access Granted: Happy Birthday Talha!',
  '🚨 Virus Detected: Too Many Candles on the Cake.',
  '🕵️ Password Hint: It\'s your big day, Talha!',
  '🔐 Secure Channel Opened: Cake & Hugs Only.',
  '📡 Signal: 100% — Incoming love packets.',
  '🛡️ IDS Alert: Too many friends in one room!'
];

let lastY = 0;
let minGap = 220;
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  if (Math.abs(y - lastY) > minGap && Math.random() < 0.7) {
    lastY = y;
    showPopup(randomFrom(popMessages));
  }
});

function showPopup(text) {
  const el = document.createElement('div');
  el.className = 'hack-popup';
  el.innerHTML = `<div class="title">[ ALERT ]</div><div class="body">${escapeHtml(text)}</div>`;
  popupContainer.appendChild(el);

  // add class to animate in
  requestAnimationFrame(() => el.classList.add('show'));
  // remove after delay
  setTimeout(()=> {
    el.classList.add('hide');
    el.addEventListener('animationend', ()=> el.remove());
  }, 2600 + Math.random()*1400);
}

/* ----------------------------
  Finale: confetti + balloons when reaching final panel
   ---------------------------- */
const finale = document.querySelector('.panel.finale');
let finaleTriggered = false;
function checkFinale() {
  if (finaleTriggered) return;
  const rect = finale.getBoundingClientRect();
  if (rect.top < innerHeight && rect.bottom > 0) {
    finaleTriggered = true;
    runConfetti();
  }
}
window.addEventListener('scroll', checkFinale);
window.addEventListener('load', checkFinale);

function runConfetti() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#7CFC00','#00E6FF','#FF6B6B','#FFD166','#B28DFF'];
  for (let i=0;i<90;i++) {
    const piece = document.createElement('div');
    piece.style.position = 'fixed';
    piece.style.left = (Math.random()*100)+'vw';
    piece.style.top = '-10vh';
    piece.style.width = (6+Math.random()*10)+'px';
    piece.style.height = (8+Math.random()*14)+'px';
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.opacity = 0.95;
    piece.style.borderRadius = (Math.random()*50)+'%';
    piece.style.zIndex = 50;
    piece.style.transition = 'transform 3s linear, top 3s linear, opacity 1s ease';
    wrap.appendChild(piece);
    // drop
    requestAnimationFrame(()=> {
      piece.style.top = (100 + Math.random()*40)+'vh';
      piece.style.transform = `rotate(${(Math.random()*720)-360}deg) translateY(0)`;
    });
    // cleanup
    setTimeout(()=> piece.remove(), 4200 + Math.random()*800);
  }

  // subtle balloon emojis
  for (let i=0;i<12;i++) {
    const b = document.createElement('div');
    b.textContent = '🎈';
    b.style.position = 'fixed';
    b.style.left = (10 + Math.random()*80) + 'vw';
    b.style.bottom = '-6vh';
    b.style.fontSize = (20 + Math.random()*40) + 'px';
    b.style.opacity = 0.95;
    b.style.zIndex = 52;
    document.body.appendChild(b);
    // float up
    requestAnimationFrame(()=> {
      b.style.transition = `transform ${5+Math.random()*6}s linear`;
      b.style.transform = `translateY(-120vh)`;
    });
    setTimeout(()=> b.remove(), 7000);
  }
}

/* ----------------------------
  Utilities
   ---------------------------- */
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* small nicety: pressing Enter on hero opens gift */
document.addEventListener('keydown', (e)=>{
  if ((e.key === 'Enter' || e.key === ' ') && modal.classList.contains('open') === false) {
    const rect = document.getElementById('hero').getBoundingClientRect();
    // only if near top (not typing)
    if (window.scrollY < 200) giftBox.click();
  }
});
