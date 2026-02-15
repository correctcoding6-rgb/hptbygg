
/* ── IMAGE CONFIGURATION ────────────────────────── */
/*
 * ADD YOUR IMAGES HERE
 * Place image files in the appropriate folders, then list them below:
 * - images/hero/     → Hero section (1 image)
 * - images/gallery/  → Gallery slideshow (as many as you want)
 */

const IMAGE_CONFIG = {
  // Hero image - shown in the main hero section
  hero: 'images/hero/hero-main.jpg',

  // Gallery images - all images will be shown in the slideshow
  // Add as many as you want! Just list the filename here.
  gallery: [
    { url: 'images/gallery/1.jpg', caption: '' },
    { url: 'images/gallery/2.jpg', caption: '' },
    { url: 'images/gallery/3.jpg', caption: '' },
    { url: 'images/gallery/4.jpg', caption: '' },
    { url: 'images/gallery/5.jpg', caption: '' },
    { url: 'images/gallery/6.jpg', caption: '' },
    { url: 'images/gallery/7.jpg', caption: '' },
    { url: 'images/gallery/8.jpg', caption: '' },
    { url: 'images/gallery/9.jpg', caption: '' },
    { url: 'images/gallery/10.jpg', caption: '' },
    { url: 'images/gallery/11.jpg', caption: '' },
    { url: 'images/gallery/12.jpg', caption: '' },
    { url: 'images/gallery/13.jpg', caption: '' },
    { url: 'images/gallery/14.jpg', caption: '' },
    { url: 'images/gallery/15.jpg', caption: '' },
    { url: 'images/gallery/16.jpg', caption: '' },
    { url: 'images/gallery/17.jpg', caption: '' },
    { url: 'images/gallery/18.jpg', caption: '' },
    { url: 'images/gallery/19.jpg', caption: '' }

    

  ]
};

/* ── STATE ──────────────────────────────────────── */
const S = {
  bname:'HPT Bygg',
  heroImg: IMAGE_CONFIG.hero,
  htitle:'PROFESSIONELLT\nLOKALT\nHANTVERK',
  hdesc:'Vi tar oss an alla typer utav byggjobb, stora som små. Kök, badrum, plattsättning, renoveringar, utbyggnader, altaner, finsnickeri — inget jobb är för litet eller för stort.',
  hdesc2:'Fokus på kvalitet levererar vi alltid arbete som håller. Lokal service, pålitlig utförande och sträva efter goda samarbeten och nöjda kunder.',
  bnum:'15+', blbl:'Års erfarenhet',
  addr:'Trävägen 12, 123 45 Stockholm',
  ph:'070-123 45 67', em:'info@hptbygg.se',
  hr:'Mån–Fre 07:00–17:00 · Lör 08:00–14:00',
  igh:'@hptbygg',
  imgs: IMAGE_CONFIG.gallery.map((img, index) => ({
    id: index + 1,
    url: img.url,
    cap: img.caption
  })),
  nid: IMAGE_CONFIG.gallery.length + 1
};

/* ── SLIDESHOW ──────────────────────────────────── */
let cs = 0;

function buildSlides() {
  const tr = document.getElementById('slides-track');
  const dt = document.getElementById('g-dots');
  tr.innerHTML = ''; dt.innerHTML = '';
  S.imgs.forEach((img,i) => {
    const sl = document.createElement('div'); sl.className='slide';
    sl.innerHTML = img.url
      ? `<img src="${img.url}" alt="${img.cap}" onerror="this.parentElement.innerHTML='<div class=slide-ph><div class=slide-ph-icon>🪵</div><div>${img.cap}</div></div>'" /><div class="slide-ov"><div class="slide-cap">${img.cap}</div></div>`
      : `<div class="slide-ph"><div class="slide-ph-icon">🪵</div><div>${img.cap}</div></div>`;
    tr.appendChild(sl);
    const d = document.createElement('div'); d.className='g-dot'+(i===0?' active':'');
    d.onclick=()=>goTo(i); dt.appendChild(d);
  });
  goTo(0);
}

function goTo(n) {
  const tr = document.getElementById('slides-track');
  const ds = document.querySelectorAll('.g-dot');
  const pv = window.innerWidth > 900 ? 3 : 1;
  cs = Math.max(0, Math.min(n, Math.max(0, S.imgs.length - pv)));
  const sl = tr.querySelector('.slide');
  if (!sl) return;
  tr.style.transform = `translateX(-${cs*(sl.offsetWidth+1)}px)`;
  ds.forEach((d,i)=>d.classList.toggle('active',i===cs));
}

function nextSlide(){goTo(cs+1);}
function prevSlide(){goTo(cs-1);}
window.addEventListener('resize',()=>goTo(cs));

/* ── ADMIN ──────────────────────────────────────── */
function openAdmin() { fillAdmin(); document.getElementById('admin-overlay').classList.add('open'); }
function closeAdmin() { document.getElementById('admin-overlay').classList.remove('open'); }

document.getElementById('admin-overlay').addEventListener('click', e => {
  if (e.target===document.getElementById('admin-overlay')) closeAdmin();
});

function switchTab(n,el) {
  document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.admin-pane').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-'+n).classList.add('active');
}

function fillAdmin() {
  document.getElementById('a-bname').value = S.bname;
  document.getElementById('a-hero-img').value = S.heroImg;
  document.getElementById('a-htitle').value = S.htitle;
  document.getElementById('a-hdesc').value = S.hdesc;
  document.getElementById('a-hdesc2').value = S.hdesc2;
  document.getElementById('a-bnum').value = S.bnum;
  document.getElementById('a-blbl').value = S.blbl;
  document.getElementById('a-addr').value=S.addr;
  document.getElementById('a-ph').value=S.ph;
  document.getElementById('a-em').value=S.em;
  document.getElementById('a-hr').value=S.hr;
  document.getElementById('a-igh').value=S.igh;
  renderImgs();
}

function renderImgs() {
  const g = document.getElementById('a-imgs'); g.innerHTML='';
  S.imgs.forEach(img => {
    const w=document.createElement('div'); w.className='img-tw';
    const th=document.createElement('div'); th.className='img-th';
    th.innerHTML = img.url ? `<img src="${img.url}" alt="${img.cap}" />` : '<div class="img-th-ph">🪵</div>';
    th.innerHTML += `<div class="img-th-ctrl"><button class="th-del" onclick="rmImg(${img.id})">✕</button></div>`;
    const ci=document.createElement('input'); ci.className='cap-in';
    ci.value=img.cap; ci.placeholder='Bildtext…';
    ci.onchange=e=>{ const f=S.imgs.find(i=>i.id===img.id); if(f) f.cap=e.target.value; };
    w.append(th,ci); g.appendChild(w);
  });
}

function addByUrl() {
  const u=document.getElementById('a-iurl').value.trim();
  const c=document.getElementById('a-icap').value.trim()||'Utan titel';
  if(!u){toast('Ange en bild-URL');return;}
  S.imgs.push({id:S.nid++,url:u,cap:c});
  document.getElementById('a-iurl').value='';
  document.getElementById('a-icap').value='';
  renderImgs(); buildSlides(); toast('Bild tillagd');
}

function uploadFiles(e) {
  Array.from(e.target.files).forEach(f => {
    const r=new FileReader();
    r.onload=ev=>{ S.imgs.push({id:S.nid++,url:ev.target.result,cap:f.name.replace(/\.[^.]+$/,'')}); renderImgs(); buildSlides(); };
    r.readAsDataURL(f);
  });
  toast(`${e.target.files.length} bild(er) uppladdade`);
}

function rmImg(id) {
  S.imgs=S.imgs.filter(i=>i.id!==id);
  renderImgs(); buildSlides(); toast('Bild borttagen');
}

function applyIg() {
  S.igh=document.getElementById('a-igh').value.trim();
  document.getElementById('ig-display').textContent=S.igh;
  document.getElementById('lt-ig-handle').textContent=S.igh;
  document.getElementById('lt-ig').href=`https://instagram.com/${S.igh.replace('@','')}`;
  toast('Handle uppdaterat');
}

function saveAll() {
  S.bname  =document.getElementById('a-bname').value;
  S.heroImg=document.getElementById('a-hero-img').value;
  S.htitle =document.getElementById('a-htitle').value;
  S.hdesc  =document.getElementById('a-hdesc').value;
  S.hdesc2 =document.getElementById('a-hdesc2').value;
  S.bnum   =document.getElementById('a-bnum').value;
  S.blbl   =document.getElementById('a-blbl').value;
  S.addr=document.getElementById('a-addr').value;
  S.ph  =document.getElementById('a-ph').value;
  S.em  =document.getElementById('a-em').value;
  S.hr  =document.getElementById('a-hr').value;
  S.igh =document.getElementById('a-igh').value;
  applyState(); toast('Ändringar sparade ✓');
}

function applyState() {
  const bn = S.bname.toUpperCase();
  document.getElementById('nav-logo').textContent = bn;
  document.getElementById('footer-logo').textContent = bn;
  document.getElementById('footer-copy').textContent = `© 2025 ${bn} · ALLA RÄTTIGHETER FÖRBEHÅLLNA`;

  // Update hero image
  const heroSlot = document.querySelector('.hero-img-slot');
  if (S.heroImg) {
    heroSlot.innerHTML = `<img src="${S.heroImg}" alt="Hero" onerror="this.parentElement.innerHTML='<div class=ph>KUNDE EJ LADDA BILD<br/>KONTROLLERA URL</div>'" />`;
  } else {
    heroSlot.innerHTML = '<div class="ph">HERO-BILD<br/>LÄGG TILL VIA ADMIN</div>';
  }

  const lines = S.htitle.split('\n');
  document.getElementById('hero-title').innerHTML =
    lines.map((l,i)=>i===1?`<span class="outline">${l}</span>`:l).join('<br/>');

  document.getElementById('hero-desc').textContent = S.hdesc;
  document.getElementById('hero-desc-2').textContent = S.hdesc2;
  document.getElementById('hero-badge-num').textContent = S.bnum;
  document.getElementById('hero-badge-lbl').textContent = S.blbl;
  document.getElementById('ci-addr').textContent=S.addr;
  document.getElementById('ci-phone').textContent=S.ph;
  document.getElementById('ci-email').textContent=S.em;
  document.getElementById('ci-hours').textContent=S.hr;
  document.getElementById('ig-display').textContent=S.igh;
  document.getElementById('lt-ig-handle').textContent=S.igh;

  // Update link tree links
  document.getElementById('lt-phone').href=`tel:${S.ph.replace(/[^0-9+]/g,'')}`;
  document.getElementById('lt-phone').querySelector('span:last-child').textContent=S.ph;
  document.getElementById('lt-email').href=`mailto:${S.em}`;
  document.getElementById('lt-email').querySelector('span:last-child').textContent=S.em;
  document.getElementById('lt-ig').href=`https://instagram.com/${S.igh.replace('@','')}`;

  buildSlides();
}

/* ── CONTACT FORM ───────────────────────────────── */
function sendMsg(e) {
  e.preventDefault();
  const l=document.getElementById('slbl'); l.textContent='Skickar…';
  setTimeout(()=>{
    document.getElementById('cform').reset(); l.textContent='Skicka meddelande';
    const ok=document.getElementById('form-ok'); ok.style.display='block';
    setTimeout(()=>ok.style.display='none',6000);
  },1000);
}

/* ── TOAST ──────────────────────────────────────── */
function toast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg;
  t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500);
}

/* ── SMOOTH NAV ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});

/* ── INITIALIZE ─────────────────────────────────── */
buildSlides();