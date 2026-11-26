/* Moteur minimal pour afficher la maquette hors du canvas : trous {{ chemin }} dans le texte et les attributs, clics et saisies. */
(function () {
  'use strict';
  var queued = false;
  function schedule() { if (!queued) { queued = true; Promise.resolve().then(render); } }
  class DCLogic {
    constructor() { this.state = {}; this.props = {}; }
    setState(p) {
      var n = typeof p === 'function' ? p(this.state, this.props) : p;
      this.state = Object.assign({}, this.state, n);
      schedule();
    }
    forceUpdate() { schedule(); }
  }

class Component extends DCLogic {
componentDidMount() {

try {
  this._nav = () => { const y = window.scrollY || document.documentElement.scrollTop || 0; const s = y > 48; if (s !== !!(this.state && this.state.navS)) this.setState({ navS: s }); };
  window.addEventListener('scroll', this._nav, { passive: true });
  this._nav();
} catch (e) {}
try {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('svg.v10-anim').forEach((el) => { if (el.pauseAnimations) el.pauseAnimations(); });
  }
} catch (e) {}
}
componentWillUnmount() {
try { if (this._nav) window.removeEventListener('scroll', this._nav); } catch (e) {}
}
renderVals() {
const s = this.state || {};
// Statut ouvert ou fermé, à l'heure de Paris (lundi au samedi, 9h30 à 19h)
let wd = 1, mins = 600, dateTxt = '', num = '0000-0000';
try {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', hour12: false }).formatToParts(now);
  const g = (t) => (parts.find((p) => p.type === t) || {}).value;
  wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
  mins = parseInt(g('hour'), 10) % 24 * 60 + parseInt(g('minute'), 10);
  num = g('day') + g('month') + '-' + g('hour') + g('minute');
  dateTxt = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  dateTxt = dateTxt.charAt(0).toUpperCase() + dateTxt.slice(1);
} catch (e) {}
const workday = wd >= 1 && wd <= 6;
const open = workday && mins >= 570 && mins < 1140;
let st;
if (open) {
  st = { bar: 'Ouvert jusqu’à 19h', big: 'Oui, jusqu’à 19h.', sub: 'Passez sans rendez-vous. Écran et batterie en 30 minutes.' };
} else if (workday && mins < 570) {
  st = { bar: 'Ouvre aujourd’hui à 9h30', big: 'J’ouvre à 9h30.', sub: 'Envoyez votre demande maintenant. Je vous réponds dès l’ouverture.' };
} else if (wd >= 1 && wd <= 5) {
  st = { bar: 'Réouverture demain à 9h30', big: 'Je rouvre demain à 9h30.', sub: 'Envoyez votre demande maintenant. Je vous réponds dès l’ouverture.' };
} else {
  st = { bar: 'Réouverture lundi à 9h30', big: 'Je rouvre lundi à 9h30.', sub: 'Envoyez votre demande maintenant. Je vous réponds dès l’ouverture.' };
}
st.dot = open ? '#30D158' : '#FF453A';
st.halo = open ? 'rgba(48, 209, 88, 0.2)' : 'rgba(255, 69, 58, 0.2)';
st.hero = open ? 'Ouvert maintenant, sans rendez-vous jusqu’à 19h' : 'Sans rendez-vous du lundi au samedi, de 9h30 à 19h';
st.hdot = open ? '#30D158' : '#8792A2';
st.hhalo = open ? 'rgba(48, 209, 88, 0.18)' : 'rgba(135, 146, 162, 0.18)';

const out = { st: st, tk: { num: num, date: dateTxt || 'Aujourd’hui' } };
st.pulse = open ? 'v10-pulse-on' : 'v10-pulse-off';
st.hdot = open ? '#30D158' : '#8792A2';
const S2 = [{"key": "iphone", "p": [{"parts": ["scr"], "w": false, "c": true, "n": "Écran cassé", "sub": "Durée : 30 min"}, {"parts": ["bat"], "w": false, "c": false, "n": "Batterie", "sub": "Durée : 30 min"}, {"parts": ["port"], "w": false, "c": false, "n": "Ne charge plus", "sub": "Diagnostic : gratuit"}, {"parts": ["board"], "w": true, "c": false, "n": "Tombé dans l’eau", "sub": "Désoxydation : dès 39 €"}, {"parts": ["board"], "w": false, "c": false, "n": "Ne s’allume plus", "sub": "Expertise : 99 €"}, {"parts": ["nand", "board"], "w": false, "c": false, "n": "Bloqué sur la pomme", "sub": "Diagnostic : gratuit"}, {"parts": ["back", "cam"], "w": false, "c": true, "n": "Vitre arrière brisée", "sub": "Prix : dès 59 €"}, {"parts": ["nand"], "w": false, "c": false, "n": "Photos et données", "sub": "Expertise : 99 €"}]}, {"key": "android", "p": [{"parts": ["scr"], "w": false, "c": true, "n": "Écran cassé", "sub": "Devis : gratuit"}, {"parts": ["port"], "w": false, "c": false, "n": "Ne charge plus", "sub": "Devis : gratuit"}, {"parts": ["board"], "w": false, "c": false, "n": "Ne s’allume plus", "sub": "Devis : gratuit"}, {"parts": ["board"], "w": true, "c": false, "n": "Tombé dans l’eau", "sub": "Devis : gratuit"}, {"parts": ["nand"], "w": false, "c": false, "n": "Photos et données", "sub": "Devis : gratuit"}]}, {"key": "ipad", "p": [{"parts": ["scr"], "w": false, "c": true, "n": "Écran cassé", "sub": "Devis : gratuit"}, {"parts": ["board"], "w": true, "c": false, "n": "Tombé dans l’eau", "sub": "Devis : gratuit"}, {"parts": ["board"], "w": false, "c": false, "n": "Ne s’allume plus", "sub": "Devis : gratuit"}, {"parts": ["bat"], "w": false, "c": false, "n": "Batterie", "sub": "Devis : gratuit"}, {"parts": ["nand"], "w": false, "c": false, "n": "Photos et données", "sub": "Devis : gratuit"}]}, {"key": "laptop", "p": [{"parts": ["board"], "w": true, "c": false, "n": "Liquide renversé", "sub": "Devis : gratuit"}, {"parts": ["board"], "w": false, "c": false, "n": "Ne s’allume plus", "sub": "Devis : gratuit"}, {"parts": ["nand"], "w": false, "c": false, "n": "Données à récupérer", "sub": "Devis : gratuit"}, {"parts": ["scr"], "w": false, "c": false, "n": "Écran", "sub": "Devis : gratuit"}, {"parts": ["bat"], "w": false, "c": false, "n": "Batterie", "sub": "Devis : gratuit"}]}];
const ANC = {"iphone": {"scr": [320, 300], "bat": [320, 358], "port": [320, 510], "board": [360, 170], "nand": [362, 147], "back": [268, 105], "cam": [268, 105]}, "android": {"scr": [320, 300], "bat": [320, 364], "port": [320, 513], "board": [350, 180], "nand": [353, 151], "back": [246, 120], "cam": [246, 120]}, "ipad": {"scr": [320, 300], "bat": [320, 380], "port": [320, 517], "board": [320, 150], "nand": [320, 124], "back": [173, 79], "cam": [173, 79]}, "laptop": {"scr": [320, 160], "bat": [320, 462], "port": [88, 350], "board": [320, 352], "nand": [331, 365], "back": [320, 470], "cam": [320, 34]}};
const PNAME = {"scr": "Écran", "bat": "Batterie", "port": "Connecteur de charge", "board": "Carte mère", "nand": "Mémoire NAND", "back": "Vitre arrière", "cam": "Caméras"};
const LAYER = {"iphone": {"scr": 0, "board": 1, "nand": 1, "bat": 2, "port": 3, "back": 4, "cam": 4}, "android": {"scr": 0, "board": 1, "nand": 1, "bat": 2, "port": 3, "back": 4, "cam": 4}, "ipad": {"scr": 0, "board": 1, "nand": 1, "bat": 2, "port": 3, "back": 4, "cam": 4}, "laptop": {"scr": 0, "board": 2, "nand": 2, "port": 2, "bat": 3, "back": 4, "cam": 0}};
const CK = {"scr": ["scr"], "bat": ["bat"], "port": ["port", "u2"], "board": ["pmic", "soc"], "nand": ["nand"], "back": [], "cam": []};
const SLOTS = [160, 480, 800, 1120];

const dev = typeof s.dev === 'number' ? s.dev : 0;
const D2 = S2[dev];
const sel = typeof s.sym === 'number' && s.sym < D2.p.length ? s.sym : 0;
const P2 = D2.p[sel];
out.dv = { key: D2.key };
for (let n = 0; n < S2.length; n++) {
  const on = n === dev;
  out.dv['d' + n] = { pressed: on, bg: on ? '#FFFFFF' : 'transparent', fg: on ? '#060A12' : '#C9D1DC',
    o: on ? 1 : 0, t: on ? 'scale(1)' : 'scale(0.94)', lo: on ? 1 : 0.32, lt: on ? 'translateY(0px) scale(0.62)' : 'translateY(20px) scale(0.42)',
    pick: () => this.setState({ dev: n, sym: 0, tp: null }) };
  out.ls = out.ls || {};
  out.ls['d' + n] = on ? 'flex' : 'none';
}
out.rw = {};
for (let n = 0; n < S2.length; n++) {
  out.rw['d' + n] = {};
  for (let i = 0; i < S2[n].p.length; i++) {
    const on = n === dev && i === sel;
    out.rw['d' + n]['p' + i] = { pressed: on, show: on ? 'flex' : 'none',
      bg: on ? 'rgba(255, 255, 255, 0.1)' : 'transparent', ring: on ? 'inset 0 0 0 1px rgba(255, 69, 58, 0.55)' : 'none',
      ibg: on ? '#FF453A' : 'rgba(77, 163, 255, 0.14)', ifg: on ? '#FFFFFF' : '#4DA3FF', sub: on ? '#FF6961' : '#8792A2',
      pick: () => this.setState({ sym: i, tp: null }) };
  }
}
const hotSet = {};
P2.parts.forEach((p) => { hotSet[p] = true; });
out.pt = {};
['scr', 'bat', 'port', 'board', 'nand', 'back', 'cam'].forEach((p) => {
  const on = !!hotSet[p];
  out.pt[p] = { s: on ? '#FF453A' : '#4DA3FF', f: on ? 'rgba(255, 69, 58, 0.16)' : 'rgba(77, 163, 255, 0.04)', op: on ? '1' : '0.8', cls: on ? 'v11-hot' : '' };
});
out.ov = { water: P2.w ? '1' : '0', crack: P2.c ? '1' : '0' };
const main = P2.parts[0];
const a = ANC[D2.key][main];
const right = a[0] < 330;
out.an = { x: a[0], y: a[1], lx: (a[0] / 640 * 100 + (right ? 7 : -7)).toFixed(1), ly: (a[1] / 560 * 100 - 6).toFixed(1),
  tf: right ? 'translate(0, -50%)' : 'translate(-100%, -50%)', part: PNAME[main], title: P2.n, sub: P2.sub };
out.lp = { x: a[0], y: a[1], nx: -a[0], ny: -a[1] };
const lay = LAYER[D2.key][main];
out.xl = {};
for (let k = 0; k < 5; k++) {
  const on = k === lay;
  out.xl['l' + k] = { s: on ? '#FF453A' : '#4DA3FF', f: on ? 'rgba(255, 69, 58, 0.12)' : 'rgba(6, 16, 31, 0.82)', dx: on ? -48 : 0,
    c: on ? '#FFFFFF' : '#8792A2', w: on ? '600' : '400', dot: on ? '#FF453A' : 'rgba(77, 163, 255, 0.5)' };
}
const ckOn = {};
P2.parts.forEach((p) => { (CK[p] || []).forEach((c) => { ckOn[c] = true; }); });
out.ck = {};
['bat', 'pmic', 'soc', 'nand', 'u2', 'port', 'scr'].forEach((c) => {
  const on = !!ckOn[c];
  out.ck[c] = { s: on ? '#FF453A' : '#4DA3FF', f: on ? 'rgba(255, 69, 58, 0.14)' : 'rgba(10, 20, 40, 0.9)', fault: on ? '1' : '0', cls: on ? 'v11-fault' : 'v11-flow' };
});
const ANX = {"iphone": {"scr": [445.8, 238.4], "bat": [320.0, 350.5], "port": [320.0, 528.3], "board": [380.4, 134.9], "nand": [377.0, 150.8], "back": [445.8, 238.4], "cam": [263.0, 88.8]}, "android": {"scr": [441.6, 238.4], "bat": [313.3, 340.4], "port": [320.0, 525.7], "board": [351.9, 120.6], "nand": [386.3, 100.5], "back": [441.6, 238.4], "cam": [245.4, 110.6]}, "ipad": {"scr": [512.9, 238.4], "bat": [358.6, 281.7], "port": [320.0, 531.6], "board": [177.4, 281.7], "nand": [177.4, 285.0], "back": [512.9, 238.4], "cam": [170.7, 63.6]}, "laptop": {"scr": [320.0, 144.0], "bat": [320.0, 454.7], "port": [118.0, 333.3], "board": [256.0, 329.3], "nand": [242.7, 329.3], "back": [320.0, 409.3], "cam": [320.0, 25.3]}};

{
  const hot = {};
  P2.parts.forEach((p) => { hot[p] = true; });
  out.q = {};
  ['scr', 'bat', 'port', 'board', 'nand', 'back', 'cam'].forEach((p) => {
    const on = !!hot[p];
    const whole = (p === 'scr' || p === 'back') && D2.key !== 'laptop';
    out.q[p] = { s: on ? '#FF5A4F' : '#7FB8FF', so: on ? 1 : (p === 'back' ? 0.5 : 1), f: on ? 'url(#s1h)' : 'none', fo: on ? (whole ? 0.35 : 1) : 1 };
  });
  const a = (ANX[D2.key] || ANX.iphone)[P2.parts[0]];
  const x = a[0] / 640 * 100, y = a[1] / 560 * 100;
  const right = x < 52;
  out.ha = { x: x.toFixed(2), y: y.toFixed(2), lx: (x + (right ? 5 : -5)).toFixed(2), ly: y.toFixed(2), tf: right ? 'translate(0, -50%)' : 'translate(-100%, -50%)' };
}

const fam = s.fam || 0;
for (let i = 0; i < 3; i++) {
  const on = i === fam;
  out['f' + i] = { pressed: on, show: on ? 'flex' : 'none', bg: on ? '#FFFFFF' : 'transparent', fg: on ? '#060A12' : '#C9D1DC', pick: () => this.setState({ fam: i }) };
}
const devMap = [0, 1, 3, 4];
const fdev = typeof s.fdev === 'number' ? s.fdev : devMap[dev];
const tpMap = { scr: 0, bat: 1, port: 2, nand: 5, board: 4, back: 0, cam: 0 };
const ftp = typeof s.tp === 'number' ? s.tp : (P2.w ? 3 : (tpMap[P2.parts[0]] || 0));
const rep = s.rep || 0;
const chipc = (on) => ({ bg: on ? '#0A1628' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0A1628', bd: on ? '#0A1628' : '#CBD3DE', pressed: on });
for (let i = 0; i < 7; i++) { out['d' + i] = Object.assign(chipc(i === fdev), { pick: () => this.setState({ fdev: i }) }); }
for (let i = 0; i < 7; i++) { out['t' + i] = Object.assign(chipc(i === ftp), { pick: () => this.setState({ tp: i }) }); }
for (let i = 0; i < 3; i++) { out['r' + i] = Object.assign(chipc(i === rep), { pick: () => this.setState({ rep: i }) }); }
const today = wd === 0 ? 6 : wd - 1;
for (let i = 0; i < 7; i++) {
  const on = i === today;
  out['h' + i] = { bg: on ? '#F0F5FD' : 'transparent', fg: on ? '#1D1D1F' : '#6E6E73', fw: on ? '600' : '400' };
}
const DX = {"devs": [{"n": "Smartphone", "b": [{"n": "Apple", "g": [{"n": "iPhone 17", "m": ["iPhone 17e", "iPhone 17", "iPhone Air", "iPhone 17 Pro", "iPhone 17 Pro Max"]}, {"n": "iPhone 16", "m": ["iPhone 16e", "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"]}, {"n": "iPhone 15", "m": ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"]}, {"n": "iPhone 14", "m": ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"]}, {"n": "iPhone 13", "m": ["iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"]}, {"n": "iPhone 12", "m": ["iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max"]}, {"n": "iPhone 11", "m": ["iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max"]}, {"n": "iPhone SE", "m": ["iPhone SE 2e génération", "iPhone SE 3e génération"]}, {"n": "iPhone X à XS", "m": ["iPhone X", "iPhone XR", "iPhone XS", "iPhone XS Max"]}, {"n": "iPhone 7 et 8", "m": ["iPhone 7", "iPhone 7 Plus", "iPhone 8", "iPhone 8 Plus"]}]}, {"n": "Samsung", "g": [{"n": "Galaxy S25", "m": ["Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra"]}, {"n": "Galaxy S24", "m": ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra"]}, {"n": "Galaxy S23", "m": ["Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra"]}, {"n": "Galaxy Z", "m": ["Galaxy Z Fold6", "Galaxy Z Flip6", "Galaxy Z Fold5", "Galaxy Z Flip5"]}, {"n": "Galaxy A", "m": ["Galaxy A55", "Galaxy A54", "Galaxy A53", "Galaxy A52"]}, {"n": "Galaxy M", "m": ["Galaxy M55", "Galaxy M54", "Galaxy M53", "Galaxy M52"]}, {"n": "Galaxy Note", "m": ["Galaxy Note 20", "Galaxy Note 20 Ultra"]}]}, {"n": "Google Pixel", "g": [{"n": "Pixel 9", "m": ["Pixel 9", "Pixel 9 Pro", "Pixel 9a"]}, {"n": "Pixel 8", "m": ["Pixel 8", "Pixel 8 Pro", "Pixel 8a"]}, {"n": "Pixel 7", "m": ["Pixel 7", "Pixel 7 Pro", "Pixel 7a"]}, {"n": "Pixel 6", "m": ["Pixel 6", "Pixel 6 Pro", "Pixel 6a"]}]}, {"n": "Huawei", "g": [{"n": "Pura et P", "m": ["Pura 70", "Pura 70 Pro", "Pura 70 Ultra", "P60", "P60 Pro", "P60 Art"]}, {"n": "Mate", "m": ["Mate 50", "Mate 50 Pro", "Mate Xs 2"]}, {"n": "Nova", "m": ["Nova 11", "Nova 10", "Nova 9"]}]}, {"n": "Xiaomi", "g": [{"n": "Xiaomi", "m": ["Xiaomi 14", "Xiaomi 14 Pro", "Xiaomi 14 Ultra", "Xiaomi 13", "Xiaomi 13 Pro", "Xiaomi 13 Ultra", "Xiaomi 12", "Xiaomi 12 Pro", "Xiaomi 12X"]}, {"n": "Redmi", "m": ["Redmi Note 13", "Redmi Note 12", "Redmi Note 11", "Redmi 13C", "Redmi 12C", "Redmi 11C"]}, {"n": "Poco", "m": ["Poco F5", "Poco F4", "Poco X5", "Poco X4", "Poco M5", "Poco M4"]}]}, {"n": "OnePlus", "g": [{"n": "OnePlus", "m": ["OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus 10 Pro", "OnePlus 9 Pro"]}, {"n": "Nord", "m": ["Nord 3", "Nord 2", "Nord CE 3", "Nord CE 2"]}]}, {"n": "Autre marque", "g": []}]}, {"n": "Tablette", "b": [{"n": "iPad", "g": [{"n": "iPad", "m": ["iPad Pro 11 ou 13 pouces (2018 à 2026)", "iPad Pro 9,7, 10,5 ou 12,9 pouces (2015 à 2017)", "iPad Air (2019 à 2026)", "iPad Air 1 ou 2 (2013 à 2014)", "iPad 5e à 11e génération (2017 à 2026)", "iPad 2 à 4 (2011 à 2012)", "iPad mini (toutes générations)"]}]}, {"n": "Autre tablette", "g": []}]}, {"n": "Ordinateur", "b": [{"n": "Mac", "g": [{"n": "Mac", "m": ["MacBook Pro 14 ou 16 pouces (2021 à 2026)", "MacBook Pro 13 pouces (2016 à 2022)", "MacBook Pro 15 pouces (2015 à 2019)", "MacBook Air (2018 à 2026)", "MacBook Air (2015 à 2017)", "MacBook 12 pouces (2015 à 2017)", "iMac, Mac mini ou Mac Studio"]}]}, {"n": "HP", "g": []}, {"n": "Dell", "g": []}, {"n": "Autre PC", "g": []}]}], "pan": [[["Écran cassé ou fissuré", "q"], ["Batterie qui se décharge vite", "q"], ["Ne charge plus", ""], ["Ne s’allume plus", "b"], ["Écran noir", ""], ["Vitre arrière cassée", ""], ["Tactile défectueux", ""], ["Bouton power ou volume", ""], ["Caméra floue ou HS", ""], ["Micro ou haut-parleur", ""], ["Réseau ou Wi-Fi instable", ""], ["Appareil qui chauffe", ""], ["Ralentissements ou bugs", ""], ["Tombé dans l’eau", "b"], ["Récupérer mes données", "b"]], [["Écran fissuré ou tactile HS", ""], ["Ne s’allume plus", "b"], ["Batterie qui se vide vite", ""], ["Ne charge plus", ""], ["Lenteurs ou bugs", ""], ["Caméra ou micro HS", ""], ["Boutons", ""], ["Bluetooth ou Wi-Fi", ""], ["Mise à jour impossible", ""], ["Appareil bloqué", ""], ["Tombé dans l’eau", "b"], ["Récupérer mes données", "b"]], [["Écran noir ou cassé", ""], ["Ne s’allume plus", "b"], ["Clavier ou pavé tactile", ""], ["Batterie qui ne tient plus", ""], ["Charge ou chargeur", ""], ["Surchauffe", ""], ["Ventilateur bruyant ou bloqué", ""], ["Lenteurs", ""], ["Wi-Fi instable", ""], ["Port USB ou HDMI", ""], ["Carte graphique ou disque", "b"], ["Liquide renversé", "b"], ["Récupérer mes données", "b"]]], "opts": ["Prendre rendez-vous", "Passer à l’atelier", "Recevoir un devis avant de passer", "Être rappelé dans l’heure", "Envoyer mon appareil par colis"], "slots": ["9h30", "10h30", "11h30", "14h00", "15h00", "16h00", "17h00", "18h00"], "cp": ["Appel", "SMS", "WhatsApp"]};

{
  const st = this.state;
  const set = (o) => this.setState(o);
  const later = (fn) => setTimeout(fn, 230);
  const scr = st.dg_scr || 'dev';
  const go = (next, extra) => set(Object.assign({ dg_scr: next, dg_hist: (this.state.dg_hist || []).concat([this.state.dg_scr || 'dev']) }, extra || {}));
  const dv = typeof st.dg_dev === 'number' ? st.dg_dev : -1;
  const br = typeof st.dg_br === 'number' ? st.dg_br : -1;
  const gr = typeof st.dg_gr === 'number' ? st.dg_gr : -1;
  const model = st.dg_model || '';
  const free = (st.dg_free || '').trim();
  const pan = st.dg_pan || {};
  const desc = (st.dg_desc || '').trim();
  const opt = typeof st.dg_opt === 'number' ? st.dg_opt : -1;
  const slot = typeof st.dg_slot === 'number' ? st.dg_slot : -1;
  const cp = typeof st.dg_cp === 'number' ? st.dg_cp : -1;
  const name = (st.dg_name || '').trim();
  const tel = (st.dg_tel || '').replace(/[^0-9+]/g, '');
  const chip = (on, pick) => ({ c: on ? 'on' : '', ap: on ? 'true' : 'false', pick });
  const g = {};
  const KEYS = ['dev', 'brand', 'grp', 'model', 'free', 'pan', 'info', 'opt', 'slot', 'contact', 'done'];
  g.v = {}; KEYS.forEach((k) => { g.v[k] = k === scr ? 'block' : 'none'; });
  const PH = { dev: [0, 50], brand: [1, 34], grp: [1, 67], model: [1, 90], free: [1, 90], pan: [2, 50], info: [2, 100], opt: [3, 50], slot: [3, 90], contact: [4, 60], done: [4, 100] };
  const [ph, fill] = PH[scr];
  for (let n = 0; n < 5; n++) g['f' + n] = n < ph ? '100%' : (n === ph ? fill + '%' : '0%');
  g.num = ph + 1;
  g.stepT = 'Étape ' + (ph + 1) + ' sur 5';
  g.ph = scr === 'done' ? 'Diagnostic envoyé' : ['Appareil', 'Modèle', 'Panne', 'Prise en charge', 'Coordonnées'][ph];
  g.hint = { dev: 'Touchez votre réponse', brand: 'Touchez votre réponse', grp: 'Touchez votre réponse', model: 'Touchez votre réponse', free: '', pan: 'Plusieurs choix possibles', info: '', opt: 'Touchez votre réponse', slot: '', contact: '', done: '' }[scr];
  // calendrier, heure de Paris
  const pz = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).reduce((a, p) => { a[p.type] = p.value; return a; }, {});
  const DAY = 86400000;
  const T0 = Date.UTC(+pz.year, +pz.month - 1, +pz.day), LAST = T0 + 41 * DAY;
  const nowMin = (+pz.hour % 24) * 60 + (+pz.minute);
  const keyOf = (t) => new Date(t).toISOString().slice(0, 10);
  const fmt = (t, o) => new Intl.DateTimeFormat('fr-FR', Object.assign({ timeZone: 'UTC' }, o)).format(new Date(t)).replace(/\./g, '');
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  const slotMin = (x) => { const m = /(\d+)h(\d+)/.exec(x); return (+m[1]) * 60 + (+m[2]); };
  const slotOk = (t, x) => t > T0 || slotMin(x) > nowMin + 30;
  const FERIE = ['01-01', '05-01', '05-08', '07-14', '08-15', '11-01', '11-11', '12-25'];
  const openDay = (t) => t >= T0 && t <= LAST && new Date(t).getUTCDay() !== 0 && FERIE.indexOf(keyOf(t).slice(5)) < 0 && DX.slots.some((x) => slotOk(t, x));
  const date = st.dg_date || '';
  const dT = date ? Date.parse(date + 'T00:00:00Z') : NaN;
  const dayLong = date ? fmt(dT, { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  const dayShort = !date ? '' : (dT === T0 ? 'aujourd’hui' : (dT === T0 + DAY ? 'demain' : fmt(dT, { weekday: 'short', day: 'numeric', month: 'short' })));
  const cm = st.dg_cm || 0;
  const y0 = new Date(T0).getUTCFullYear(), mo = new Date(T0).getUTCMonth() + cm;
  const first = Date.UTC(y0, mo, 1), lead = (new Date(first).getUTCDay() + 6) % 7, dim = new Date(Date.UTC(y0, mo + 1, 0)).getUTCDate();
  const hasNext = Date.UTC(y0, mo + 1, 1) <= LAST;
  const cal = { title: cap(fmt(first, { month: 'long', year: 'numeric' })), prevC: cm > 0 ? '' : 'off', nextC: hasNext ? '' : 'off' };
  cal.prev = () => { if (cm > 0) set({ dg_cm: cm - 1 }); };
  cal.next = () => { if (hasNext) set({ dg_cm: cm + 1 }); };
  for (let n = 0; n < 42; n++) {
    const dn = n - lead + 1;
    if (dn < 1 || dn > dim) { cal['c' + n] = { t: '', c: 'blank', ap: 'true', lab: '', pick: () => {} }; continue; }
    const t = Date.UTC(y0, mo, dn), k = keyOf(t), ok = openDay(t);
    cal['c' + n] = { t: String(dn), c: [ok ? 'ok' : 'off', t === T0 ? 'today' : '', k === date ? 'sel' : ''].filter(Boolean).join(' '), ap: ok ? 'false' : 'true',
      lab: fmt(t, { weekday: 'long', day: 'numeric', month: 'long' }) + (ok ? '' : ', indisponible'), pick: () => { if (ok) set({ dg_date: k, dg_slot: -1 }); } };
  }
  g.cal = cal;
  g.slT = date ? cap(dayLong) : '';
  g.slEmpty = date ? 'none' : 'flex';
  g.slList = date ? 'flex' : 'none';
  DX.devs.forEach((d, i) => {
    g['d' + i] = chip(i === dv, () => { set({ dg_dev: i, dg_br: -1, dg_gr: -1, dg_model: '', dg_free: '', dg_pan: {} }); later(() => set({ dg_scr: 'brand', dg_hist: ['dev'] })); });
    g['bl' + i] = i === dv ? 'block' : 'none';
    g['pl' + i] = i === dv ? 'block' : 'none';
    d.b.forEach((b, j) => {
      const onb = i === dv && j === br;
      g['b' + i + 'x' + j] = chip(onb, () => { set({ dg_br: j, dg_gr: b.g.length === 1 ? 0 : -1, dg_model: '', dg_free: '' }); later(() => go(b.g.length > 1 ? 'grp' : (b.g.length === 1 ? 'model' : 'free'))); });
      g['gb' + i + 'x' + j] = onb ? 'block' : 'none';
      g['u' + i + 'x' + j] = chip(onb && model === '?', () => { set({ dg_model: '?' }); later(() => go('pan')); });
      b.g.forEach((gg, k) => {
        const ong = onb && k === gr;
        g['g' + i + 'x' + j + 'x' + k] = chip(ong, () => { set({ dg_gr: k, dg_model: '' }); later(() => go('model')); });
        g['gl' + i + 'x' + j + 'x' + k] = ong ? 'block' : 'none';
        gg.m.forEach((m, v) => { g['v' + i + 'x' + j + 'x' + k + 'x' + v] = chip(ong && model === m, () => { set({ dg_model: m }); later(() => go('pan')); }); });
      });
    });
  });
  g.uf = chip(model === '?', () => { set({ dg_model: '?' }); later(() => go('pan')); });
  DX.pan.forEach((lst, i) => lst.forEach((p, k) => {
    const key = i + '-' + k;
    g['p' + i + 'x' + k] = chip(i === dv && !!pan[key], () => { const np = Object.assign({}, this.state.dg_pan || {}); if (np[key]) delete np[key]; else np[key] = 1; set({ dg_pan: np }); });
  }));
  DX.opts.forEach((o, k) => { g['o' + k] = chip(k === opt, () => { set({ dg_opt: k }); later(() => go(k === 0 ? 'slot' : 'contact')); }); });
  DX.slots.forEach((x, n) => { const ok = !!date && slotOk(dT, x); g['sl' + n] = { c: !ok ? 'off' : (n === slot ? 'on' : ''), ap: n === slot ? 'true' : 'false', ti: n === slot ? '0' : '-1', d: !date || ok ? 'flex' : 'none', pick: () => { if (ok) set({ dg_slot: n }); } }; });
  DX.cp.forEach((c, k) => { g['cp' + k] = chip(k === cp, () => set({ dg_cp: k })); });
  g.setFree = (e) => set({ dg_free: e.target.value, dg_model: '' });
  g.setDesc = (e) => set({ dg_desc: e.target.value });
  g.setName = (e) => set({ dg_name: e.target.value });
  g.setTel = (e) => set({ dg_tel: e.target.value });
  g.setMail = (e) => set({ dg_mail: e.target.value });
  const pans = dv >= 0 ? DX.pan[dv].filter((p, k) => pan[dv + '-' + k]) : [];
  const board = pans.some((p) => p[1] === 'b'), quick = pans.some((p) => p[1] === 'q');
  const infoN = board ? 0 : (quick && dv === 0 ? 1 : 2);
  for (let n = 0; n < 3; n++) g['inf' + n] = n === infoN ? 'flex' : 'none';
  // bouton continuer selon l'écran
  const CONT = {
    free: [free.length > 1, 'Continuer', () => go('pan')],
    pan: [pans.length > 0 || desc.length > 3, 'Continuer', () => go('info')],
    info: [true, 'Continuer', () => go('opt')],
    slot: [!!date && slot >= 0, 'Continuer', () => go('contact')],
    contact: [name.length > 0 && tel.length >= 10, 'Recevoir mon diagnostic', () => go('done')],
  };
  const c = CONT[scr];
  g.contShow = c && scr !== 'slot' ? 'inline-flex' : 'none';
  g.contC = c && !c[0] ? 'off' : '';
  g.contL = c ? c[1] : '';
  g.cont = () => { if (c && c[0]) c[2](); };
  g.footShow = scr === 'done' ? 'none' : 'flex';
  g.backVis = scr === 'dev' ? 'hidden' : 'visible';
  g.back = () => { const h = (this.state.dg_hist || []).slice(); const prev = h.pop() || 'dev'; set({ dg_scr: prev, dg_hist: h }); };
  g.reset = () => set({ dg_scr: 'dev', dg_hist: [], dg_dev: -1, dg_br: -1, dg_gr: -1, dg_model: '', dg_free: '', dg_pan: {}, dg_desc: '', dg_opt: -1, dg_date: '', dg_cm: 0, dg_slot: -1, dg_cp: -1 });
  // réponses déjà données
  const D = dv >= 0 ? DX.devs[dv] : null;
  const B = D && br >= 0 ? D.b[br] : null;
  let rm = '';
  const bn = B ? (B.n === 'Apple' ? 'iPhone' : B.n) : '';
  if (B) {
    if (model === '?') rm = /^Autre/.test(B.n) ? D.n : bn;
    else if (model) rm = model;
    else if (free) rm = (/^Autre/.test(B.n) || free.toLowerCase().indexOf(B.n.toLowerCase()) === 0) ? free : B.n + ' ' + free;
    else rm = /^Autre/.test(B.n) ? D.n : bn;
  }
  const optT = opt >= 0 ? DX.opts[opt] + (opt === 0 && date && slot >= 0 ? ', ' + dayShort + ' à ' + DX.slots[slot] : '') : '';
  const ans = [D && !rm ? D.n : '', rm, pans.length ? (pans.length === 1 ? pans[0][0] : pans.length + ' pannes') : '', optT].filter((x) => x && scr !== 'dev');
  for (let n = 0; n < 4; n++) g['a' + n] = { t: ans[n] || '', d: ans[n] ? 'inline-flex' : 'none' };
  g.ansShow = ans.length && scr !== 'done' ? 'flex' : 'none';
  // bilan
  g.sum = {
    dev: rm || (D ? D.n : ''),
    pan: pans.length ? pans.map((p, i) => i ? p[0].charAt(0).toLowerCase() + p[0].slice(1) : p[0]).join(', ') : (desc || 'À préciser'),
    delai: board ? '24 à 72 heures selon la panne' : (quick && dv === 0 ? '30 minutes, sur place' : 'Précisé avec le devis'),
    prix: board ? 'Expertise 99 €, déduite si la réparation aboutit' : 'Devis gratuit avant toute intervention',
    opt: optT || ''
  };
  const devT = !D ? '' : (rm && rm !== D.n ? rm : D.n.toLowerCase());
  g.panT = devT ? 'Quelle est la panne de votre ' + devT + ' ?' : 'Quelle est la panne ?';
  g.recT = devT ? 'Votre diagnostic pour votre ' + devT : 'Votre diagnostic';
  g.cf = {
    t: name ? 'Merci ' + name + ', j’ai bien reçu votre diagnostic.' : 'Merci, j’ai bien reçu votre diagnostic.',
    m: ['Je vous confirme le créneau ' + (!date ? '' : (dT === T0 ? 'd’aujourd’hui' : (dT === T0 + DAY ? 'de demain' : 'du ' + dayLong))) + (slot >= 0 ? ' à ' + DX.slots[slot] : '') + '.',
      'Je vous attends au 232 rue de Bercy, du lundi au samedi de 9h30 à 19h.',
      'Je vous envoie un prix et un délai en moins de 15 minutes, pendant les horaires d’ouverture.',
      'Je vous rappelle dans l’heure, pendant les horaires d’ouverture.',
      'Je vous envoie l’adresse et les consignes d’envoi.'][opt] || ''
  };
  out.dg = g;
}

out.nav = { c: (this.state && this.state.navS) ? 'is-s' : '' };
return out;
}
}

  var PROPS = {};
  var root = document.getElementById('dc-root');
  var HOLE = /\{\{\s*([A-Za-z0-9_$.]+)\s*\}\}/g;
  var binds = [];
  var vals = {};
  function get(o, path) {
    var ks = path.split('.');
    for (var i = 0; i < ks.length; i++) { if (o == null) return undefined; o = o[ks[i]]; }
    return o;
  }
  function fmt(v) { return v == null ? '' : String(v); }
  function call(path, e) { var fn = get(vals, path); if (typeof fn === 'function') fn(e); }
  function scan(node) {
    if (node.nodeType === 3) {
      if (node.nodeValue.indexOf('{{') >= 0) binds.push({ t: 0, n: node, tpl: node.nodeValue, last: null });
      return;
    }
    if (node.nodeType !== 1) return;
    var at = Array.prototype.slice.call(node.attributes);
    for (var i = 0; i < at.length; i++) {
      if (at[i].value.indexOf('{{') >= 0) binds.push({ t: 1, n: node, a: at[i].name, tpl: at[i].value, last: null });
    }
    var c = node.getAttribute('data-dc-click');
    if (c) node.addEventListener('click', function (e) { call(c, e); });
    var inp = node.getAttribute('data-dc-input');
    if (inp) node.addEventListener('input', function (e) { call(inp, e); });
    for (var ch = node.firstChild; ch; ch = ch.nextSibling) scan(ch);
  }
  var comp;
  function render() {
    queued = false;
    vals = comp.renderVals() || {};
    for (var i = 0; i < binds.length; i++) {
      var b = binds[i];
      var v = b.tpl.replace(HOLE, function (_, p) { return fmt(get(vals, p)); });
      if (v !== b.last) {
        b.last = v;
        if (b.t === 0) b.n.nodeValue = v; else b.n.setAttribute(b.a, v);
      }
    }
  }
  comp = new Component();
  comp.props = Object.assign({}, PROPS);
  scan(root);
  render();
  root.classList.add('dc-ready');
  if (typeof comp.componentDidMount === 'function') comp.componentDidMount();
})();
