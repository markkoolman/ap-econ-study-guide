import { useState } from "react";

/* ═══════════════ STYLES ═══════════════ */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Crimson Pro',serif;background:#0a1520;color:#f0ebe0}
.app{min-height:100vh;background:#0a1520}
.topnav{background:#060e18;border-bottom:2px solid #b8943a;padding:0 1rem;display:flex;align-items:stretch;position:sticky;top:0;z-index:200;overflow-x:auto}
.topnav::-webkit-scrollbar{height:3px}.topnav::-webkit-scrollbar-thumb{background:#b8943a}
.nav-logo{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:900;color:#b8943a;padding:.75rem 1rem .75rem 0;border-right:1px solid #162435;margin-right:.4rem;display:flex;align-items:center;white-space:nowrap;flex-shrink:0}
.nb{background:none;border:none;cursor:pointer;font-family:'Crimson Pro',serif;font-size:.88rem;font-weight:600;color:#7a8e9f;padding:.75rem .75rem;border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap;flex-shrink:0}
.nb:hover{color:#f0ebe0}.nb.on{color:#b8943a;border-bottom-color:#b8943a}
.pg{padding:1.4rem;max-width:1080px;margin:0 auto}
.ch{display:grid;grid-template-columns:195px 1fr;gap:1.4rem;align-items:start}
@media(max-width:660px){.ch{grid-template-columns:1fr}}
.sb{background:#162435;border:1px solid #253650;border-radius:10px;padding:.75rem;position:sticky;top:54px;max-height:90vh;overflow-y:auto}
.sb h4{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#4a7aab;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem;padding-left:.4rem}
.sbb{display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;font-family:'Crimson Pro',serif;font-size:.85rem;color:#7a8e9f;padding:.38rem .55rem;border-radius:5px;transition:all .2s;border-left:3px solid transparent;margin-bottom:1px}
.sbb:hover{background:#0a1520;color:#f0ebe0}.sbb.on{background:#0a1520;color:#b8943a;border-left-color:#b8943a}
.tc{background:#162435;border:1px solid #253650;border-radius:10px;margin-bottom:.9rem;overflow:hidden;transition:border-color .2s}
.tc.open{border-color:#4a7aab}
.th{display:flex;align-items:center;justify-content:space-between;padding:.9rem 1.1rem;cursor:pointer;transition:background .2s}
.th:hover{background:#1d2e42}
.ti-grp{display:flex;align-items:center;gap:.75rem}
.t-icon{font-size:1.25rem}
.t-title{font-family:'Playfair Display',serif;font-size:1.05rem;color:#f0ebe0}
.t-sub{font-size:.82rem;color:#4a7aab;margin-top:.1rem}
.t-arr{color:#b8943a;font-size:.95rem;transition:transform .3s}.t-arr.open{transform:rotate(180deg)}
.tb{padding:0 1.1rem 1.1rem}
.stabs{display:flex;gap:.35rem;margin-bottom:.9rem;flex-wrap:wrap}
.stab{background:#0a1520;border:1px solid #253650;color:#7a8e9f;font-family:'JetBrains Mono',monospace;font-size:.68rem;padding:.22rem .65rem;border-radius:999px;cursor:pointer;transition:all .2s}
.stab.on{background:#b8943a22;border-color:#b8943a;color:#b8943a}
.cb{animation:fi .2s ease}
@keyframes fi{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
/* book content boxes */
.sb0{background:#0a1520;border-left:4px solid #b8943a;border-radius:0 7px 7px 0;padding:.85rem .95rem;margin-bottom:.85rem}
.sb0 h5{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#b8943a;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.32rem}
.sb0 p{color:#c0d0dc;line-height:1.65;font-size:.97rem}
.db{background:#101e2e;border:1px solid #253650;border-radius:7px;padding:.85rem .95rem;margin-bottom:.65rem}
.db h5{font-family:'Playfair Display',serif;font-size:.97rem;color:#4a7aab;margin-bottom:.38rem}
.db p,.db li{color:#a8bece;line-height:1.65;font-size:.95rem}
.db ul{padding-left:1.1rem}.db li{margin-bottom:.22rem}
.eb{background:#0a2218;border:1px solid #2a6a44;border-radius:7px;padding:.85rem .95rem;margin-bottom:.65rem}
.eb h5{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#2a7a50;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.38rem}
.eb p{color:#98c8a8;line-height:1.65;font-size:.95rem}.eb strong{color:#5fcc8a}
.apb{background:#280a0a;border:1px solid #8a2020;border-radius:7px;padding:.85rem .95rem;margin-bottom:.65rem}
.apb h5{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#c0392b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.38rem}
.apb p,.apb li{color:#d8a0a0;line-height:1.65;font-size:.95rem}
.apb ul{padding-left:1.1rem}.apb li{margin-bottom:.22rem}
/* AP-ONLY extra box (teal - not in book) */
.apx{background:#001e1c;border:1px solid #00c8b4;border-radius:7px;padding:.85rem .95rem;margin-bottom:.65rem;position:relative}
.apx::before{content:"★ AP EXTRA — NOT IN TEXTBOOK";font-family:'JetBrains Mono',monospace;font-size:.58rem;color:#00c8b4;letter-spacing:.12em;display:block;margin-bottom:.5rem}
.apx h5{font-family:'Playfair Display',serif;font-size:.97rem;color:#00c8b4;margin-bottom:.38rem}
.apx p,.apx li{color:#80e8e0;line-height:1.65;font-size:.95rem}
.apx ul{padding-left:1.1rem}.apx li{margin-bottom:.22rem}
.apx strong{color:#00ffd0}
/* diagrams */
.dw{background:#0a1520;border:1px solid #253650;border-radius:7px;padding:1.1rem;margin:.75rem 0;text-align:center}
.dw h5{font-family:'Playfair Display',serif;color:#b8943a;margin-bottom:.75rem;font-size:.92rem}
.dw p{color:#5a6e7f;font-size:.8rem;margin-top:.38rem}
svg text{font-family:'Crimson Pro',serif}
/* home */
.hero{text-align:center;padding:2.2rem 1rem 1.2rem}
.hero h1{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:900;color:#b8943a;line-height:1.15;margin-bottom:.35rem}
.hero p{font-size:1.15rem;color:#8a9eae;margin-bottom:1.2rem}
.hcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1.1rem;margin-top:1.4rem}
.hcard{background:#162435;border:1px solid #253650;border-radius:10px;padding:1.3rem;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
.hcard:hover{border-color:#b8943a;transform:translateY(-2px);box-shadow:0 6px 24px rgba(184,148,58,.12)}
.hcard-n{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:900;color:#b8943a14;position:absolute;top:.3rem;right:.7rem;line-height:1}
.hcard h3{font-family:'Playfair Display',serif;font-size:1.05rem;color:#b8943a;margin-bottom:.35rem}
.hcard p{color:#7a8e9f;font-size:.88rem;line-height:1.48}
.chips{margin-top:.7rem;display:flex;flex-wrap:wrap;gap:.28rem}
.chip{background:#0a1520;color:#4a7aab;font-size:.68rem;font-family:'JetBrains Mono',monospace;padding:.13rem .45rem;border-radius:999px;border:1px solid #4a7aab33}
/* hard Qs */
.hqi{background:#162435;border-radius:10px;padding:1.1rem;margin-bottom:1.1rem;border-left:4px solid #c0392b}
.hqi h2{font-family:'Playfair Display',serif;color:#c0392b;font-size:1.5rem;margin-bottom:.28rem}
.hqc{background:#162435;border:1px solid #253650;border-radius:10px;margin-bottom:.9rem;overflow:hidden}
.hqh{padding:.9rem 1.1rem;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:.75rem}
.hqh:hover{background:#1d2e42}
.hqn{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:#c0392b;background:#280a0a;padding:.13rem .5rem;border-radius:999px;white-space:nowrap}
.hqq{font-family:'Crimson Pro',serif;font-size:1rem;color:#f0ebe0;line-height:1.5;flex:1}
.hqb{padding:.9rem 1.1rem;border-top:1px solid #253650}
.hqtag{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#4a7aab;margin-bottom:.55rem}
.hqa{color:#a8bece;line-height:1.7;font-size:.95rem}.hqa strong{color:#b8943a}
.ktg{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:.55rem;margin-top:.65rem}
.kt{background:#0a1520;border:1px solid #4a7aab22;border-radius:7px;padding:.45rem .75rem}
.kt strong{display:block;color:#4a7aab;font-size:.78rem;font-family:'JetBrains Mono',monospace}
.kt span{color:#7a8e9f;font-size:.82rem}
.sch{margin-bottom:1.1rem}
.sch h2{font-family:'Playfair Display',serif;font-size:1.9rem;margin-bottom:.2rem}
.sch p{color:#5a6e7f;font-size:.95rem}
.part-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#4a7aab;background:#0a1520;border:1px solid #4a7aab44;border-radius:999px;padding:.13rem .55rem;margin-bottom:.45rem}
.mktable{width:100%;border-collapse:collapse;font-size:.85rem;margin:.6rem 0}
.mktable th{background:#0a1520;color:#b8943a;font-family:'JetBrains Mono',monospace;font-size:.68rem;padding:.5rem .7rem;text-align:left;border:1px solid #253650}
.mktable td{padding:.45rem .7rem;border:1px solid #1a2e40;color:#a8bece;vertical-align:top}
.mktable tr:nth-child(even) td{background:#0d1e2e}
`;

/* ═══════════════ DIAGRAM HELPERS ═══════════════ */
const Ax=(x1,y1,x2,y2,c="#4a7aab")=><><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.6"/><polygon points={`${x2-3},${y2-6} ${x2},${y2+1} ${x2+3},${y2-6}`} fill={c}/></>;
const Mk=(id,c)=><marker id={id} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill={c}/></marker>;

/* ═══════════════ ALL DIAGRAMS ═══════════════ */
const PPCDiag=()=>(
  <div className="dw"><h5>📈 Production Possibilities Curve</h5>
  <svg viewBox="0 0 290 210" style={{maxWidth:270,width:"100%"}}>
    <line x1="38" y1="190" x2="258" y2="190" stroke="#4a7aab" strokeWidth="1.6"/>
    <line x1="38" y1="190" x2="38" y2="16" stroke="#4a7aab" strokeWidth="1.6"/>
    <polygon points="258,187 265,190 258,193" fill="#4a7aab"/><polygon points="35,16 38,9 41,16" fill="#4a7aab"/>
    <text x="148" y="205" fill="#6a7e8f" fontSize="9" textAnchor="middle">Consumer Goods</text>
    <text x="13" y="105" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,13,105)">Capital Goods</text>
    <path d="M 42 20 C 65 52,112 112,160 155 S 240 185,252 188" stroke="#b8943a" strokeWidth="2.2" fill="none"/>
    <circle cx="138" cy="160" r="5" fill="#2a7a50"/><text x="146" y="157" fill="#5fcc8a" fontSize="8">A (inefficient)</text>
    <circle cx="192" cy="165" r="5" fill="#b8943a"/><text x="200" y="162" fill="#b8943a" fontSize="8">B (efficient)</text>
    <circle cx="228" cy="136" r="5" fill="#c0392b" opacity=".85"/><text x="197" y="132" fill="#e07070" fontSize="8">C (unattainable)</text>
  </svg><p>On = efficient · Inside = wasted resources · Outside = impossible today</p></div>
);

const SDDiag=()=>(
  <div className="dw"><h5>📊 Supply & Demand — Market Equilibrium</h5>
  <svg viewBox="0 0 300 220" style={{maxWidth:290,width:"100%"}}>
    <line x1="38" y1="195" x2="268" y2="195" stroke="#4a7aab" strokeWidth="1.6"/>
    <line x1="38" y1="195" x2="38" y2="12" stroke="#4a7aab" strokeWidth="1.6"/>
    <polygon points="268,192 275,195 268,198" fill="#4a7aab"/><polygon points="35,12 38,5 41,12" fill="#4a7aab"/>
    <text x="153" y="210" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <text x="13" y="105" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,13,105)">Price</text>
    <line x1="50" y1="30" x2="255" y2="180" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="256" y="177" fill="#5fcc8a" fontSize="10">D</text>
    <line x1="50" y1="180" x2="255" y2="30" stroke="#c9a84c" strokeWidth="2"/>
    <text x="258" y="32" fill="#c9a84c" fontSize="10">S</text>
    <circle cx="152" cy="105" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.8"/>
    <line x1="38" y1="105" x2="152" y2="105" stroke="#b8943a" strokeWidth="1" strokeDasharray="4,3"/>
    <line x1="152" y1="195" x2="152" y2="105" stroke="#b8943a" strokeWidth="1" strokeDasharray="4,3"/>
    <text x="33" y="108" fill="#b8943a" fontSize="8" textAnchor="end">P*</text>
    <text x="152" y="206" fill="#b8943a" fontSize="8" textAnchor="middle">Q*</text>
  </svg><p>Equilibrium: supply meets demand. Self-correcting: surplus → P falls; shortage → P rises.</p></div>
);

const PriceDiag=()=>(
  <div className="dw"><h5>⚠️ Price Ceiling vs Price Floor</h5>
  <svg viewBox="0 0 300 215" style={{maxWidth:290,width:"100%"}}>
    <line x1="38" y1="195" x2="270" y2="195" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="38" y1="195" x2="38" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="48" y1="30" x2="255" y2="178" stroke="#5fcc8a" strokeWidth="2"/>
    <line x1="48" y1="178" x2="255" y2="30" stroke="#c9a84c" strokeWidth="2"/>
    <text x="256" y="176" fill="#5fcc8a" fontSize="10">D</text><text x="258" y="32" fill="#c9a84c" fontSize="10">S</text>
    <circle cx="151" cy="104" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="38" y1="140" x2="270" y2="140" stroke="#e07070" strokeWidth="1.8" strokeDasharray="5,3"/>
    <text x="210" y="135" fill="#e07070" fontSize="8">Ceiling→SHORTAGE</text>
    <line x1="38" y1="68" x2="270" y2="68" stroke="#88aaff" strokeWidth="1.8" strokeDasharray="5,3"/>
    <text x="214" y="63" fill="#88aaff" fontSize="8">Floor→SURPLUS</text>
    <text x="32" y="107" fill="#b8943a" fontSize="8" textAnchor="end">P*</text>
  </svg><p>Ceiling BELOW P* → shortage. Floor ABOVE P* → surplus. Both create DWL.</p></div>
);

const SurplusDiag=()=>(
  <div className="dw"><h5>💡 Consumer & Producer Surplus + DWL</h5>
  <svg viewBox="0 0 285 215" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="195" x2="255" y2="195" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="195" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="46" y1="28" x2="240" y2="178" stroke="#5fcc8a" strokeWidth="2"/>
    <line x1="46" y1="178" x2="240" y2="28" stroke="#c9a84c" strokeWidth="2"/>
    <text x="242" y="176" fill="#5fcc8a" fontSize="9">D</text><text x="244" y="32" fill="#c9a84c" fontSize="9">S</text>
    <circle cx="143" cy="103" r="4" fill="#fff"/>
    <line x1="33" y1="103" x2="143" y2="103" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="143" y1="195" x2="143" y2="103" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <polygon points="33,103 143,103 33,28" fill="#5fcc8a" opacity=".2"/>
    <text x="62" y="75" fill="#5fcc8a" fontSize="9">CS</text>
    <polygon points="33,103 143,103 33,178" fill="#c9a84c" opacity=".2"/>
    <text x="52" y="138" fill="#c9a84c" fontSize="9">PS</text>
    <text x="80" y="98" fill="#b8943a" fontSize="8">Total surplus</text>
    <text x="80" y="108" fill="#b8943a" fontSize="8">maximized at P*</text>
  </svg><p>CS + PS = maximum at free-market equilibrium. Any distortion → DWL (lost surplus).</p></div>
);

const ElasticDiag=()=>(
  <div className="dw"><h5>↔️ Elastic vs. Inelastic Demand</h5>
  <svg viewBox="0 0 300 190" style={{maxWidth:295,width:"100%"}}>
    <line x1="18" y1="175" x2="118" y2="175" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="18" y1="175" x2="18" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="25" y1="25" x2="110" y2="165" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="62" y="7" fill="#5fcc8a" fontSize="9" textAnchor="middle">ELASTIC (Ed&gt;1)</text>
    <text x="62" y="17" fill="#7a8e9f" fontSize="7.5" textAnchor="middle">flat curve</text>
    <line x1="170" y1="175" x2="275" y2="175" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="170" y1="175" x2="170" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="197" y1="22" x2="222" y2="165" stroke="#e07070" strokeWidth="2"/>
    <text x="218" y="7" fill="#e07070" fontSize="9" textAnchor="middle">INELASTIC (Ed&lt;1)</text>
    <text x="218" y="17" fill="#7a8e9f" fontSize="7.5" textAnchor="middle">steep curve</text>
    <text x="145" y="95" fill="#b8943a" fontSize="8" textAnchor="middle">vs</text>
    <line x1="18" y1="70" x2="52" y2="70" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="18" y1="120" x2="88" y2="120" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="62" y="188" fill="#5fcc8a" fontSize="8" textAnchor="middle">large ΔQ</text>
    <line x1="170" y1="70" x2="207" y2="70" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="170" y1="120" x2="214" y2="120" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="218" y="188" fill="#e07070" fontSize="8" textAnchor="middle">small ΔQ</text>
  </svg><p>Elastic = flat curve, big Q response. Inelastic = steep, small response. Perfectly elastic = horizontal. Perfectly inelastic = vertical.</p></div>
);

const CostDiag=()=>(
  <div className="dw"><h5>📉 Short-Run Cost Curves</h5>
  <svg viewBox="0 0 300 210" style={{maxWidth:295,width:"100%"}}>
    <line x1="33" y1="192" x2="278" y2="192" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="192" x2="33" y2="10" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="155" y="206" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity (Q)</text>
    <text x="13" y="100" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,13,100)">Cost ($)</text>
    <path d="M 46 28 Q 88 58,136 100 T 268 150" stroke="#7a8e9f" strokeWidth="1.4" fill="none" strokeDasharray="4,3"/>
    <text x="270" y="148" fill="#7a8e9f" fontSize="8">AFC↓</text>
    <path d="M 46 148 Q 105 112,152 120 T 268 170" stroke="#4a7aab" strokeWidth="1.7" fill="none"/>
    <text x="270" y="168" fill="#4a7aab" fontSize="8">AVC</text>
    <path d="M 46 88 Q 122 62,165 68 T 268 130" stroke="#5fcc8a" strokeWidth="2" fill="none"/>
    <text x="270" y="128" fill="#5fcc8a" fontSize="8">ATC</text>
    <path d="M 46 172 Q 95 115,124 88 T 172 72 S 228 88, 268 112" stroke="#c9a84c" strokeWidth="2.2" fill="none"/>
    <text x="270" y="110" fill="#c9a84c" fontSize="8">MC</text>
    <circle cx="163" cy="67" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <text x="155" y="59" fill="#b8943a" fontSize="7.5">min ATC</text>
    <circle cx="146" cy="118" r="3.5" fill="#fff" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="150" y="113" fill="#4a7aab" fontSize="7.5">min AVC</text>
  </svg><p>MC cuts ATC & AVC at their minimums. ATC = AVC + AFC. Profit max: MR = MC.</p></div>
);

const PCFirmDiag=()=>(
  <div className="dw"><h5>🏭 Pure Competition — Short-Run Profit</h5>
  <svg viewBox="0 0 285 205" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="185" x2="258" y2="185" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="185" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="13" y="100" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,13,100)">$/unit</text>
    <line x1="33" y1="82" x2="252" y2="82" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="254" y="79" fill="#5fcc8a" fontSize="9">P=MR=AR=D</text>
    <path d="M 48 112 Q 108 72, 148 74 T 250 108" stroke="#4a7aab" strokeWidth="1.7" fill="none"/>
    <text x="252" y="106" fill="#4a7aab" fontSize="8">ATC</text>
    <path d="M 48 172 Q 95 122, 126 92 T 190 74 S 234 72, 252 82" stroke="#c9a84c" strokeWidth="2" fill="none"/>
    <text x="253" y="81" fill="#c9a84c" fontSize="7">MC</text>
    <circle cx="192" cy="74" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="192" y1="185" x2="192" y2="74" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="192" y="195" fill="#b8943a" fontSize="8" textAnchor="middle">Q*</text>
    <rect x="33" y="74" width="159" height="10" fill="#b8943a" opacity=".22"/>
    <text x="112" y="70" fill="#b8943a" fontSize="7.5" textAnchor="middle">economic profit (P&gt;ATC)</text>
  </svg><p>Firm is price taker: P = MR. Profit max at MR = MC → Q*. Long run: P = min ATC.</p></div>
);

const MonopDiag=()=>(
  <div className="dw"><h5>🏰 Pure Monopoly Equilibrium</h5>
  <svg viewBox="0 0 300 215" style={{maxWidth:295,width:"100%"}}>
    <line x1="33" y1="195" x2="272" y2="195" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="195" x2="33" y2="10" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="152" y="210" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <line x1="46" y1="22" x2="248" y2="180" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="250" y="178" fill="#5fcc8a" fontSize="9">D=AR</text>
    <line x1="46" y1="22" x2="147" y2="180" stroke="#88aaff" strokeWidth="2"/>
    <text x="150" y="178" fill="#88aaff" fontSize="9">MR</text>
    <path d="M 46 172 Q 88 132, 116 104 T 172 80 S 218 76, 258 84" stroke="#c9a84c" strokeWidth="2" fill="none"/>
    <text x="260" y="83" fill="#c9a84c" fontSize="9">MC</text>
    <path d="M 50 122 Q 105 82, 142 84 T 242 112" stroke="#e07070" strokeWidth="1.6" fill="none" strokeDasharray="3,2"/>
    <text x="244" y="110" fill="#e07070" fontSize="8">ATC</text>
    <circle cx="114" cy="104" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="114" y1="195" x2="114" y2="104" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="114" y="205" fill="#b8943a" fontSize="8" textAnchor="middle">Qm</text>
    <line x1="33" y1="66" x2="114" y2="66" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="69" fill="#b8943a" fontSize="8" textAnchor="end">Pm</text>
    <rect x="33" y="66" width="81" height="18" fill="#b8943a" opacity=".2"/>
    <text x="73" y="62" fill="#b8943a" fontSize="7.5" textAnchor="middle">profit</text>
    <text x="180" y="148" fill="#e07070" fontSize="7.5">DWL</text>
  </svg><p>MR = MC → Qm. Then up to demand → Pm. Always P &gt; MR. Allocatively inefficient: P &gt; MC.</p></div>
);

const ADASDiag=()=>(
  <div className="dw"><h5>📐 Aggregate Demand & Aggregate Supply</h5>
  <svg viewBox="0 0 300 220" style={{maxWidth:295,width:"100%"}}>
    <line x1="33" y1="198" x2="270" y2="198" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="198" x2="33" y2="10" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="151" y="212" fill="#6a7e8f" fontSize="9" textAnchor="middle">Real GDP</text>
    <text x="12" y="105" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,105)">Price Level</text>
    <line x1="48" y1="26" x2="240" y2="183" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="242" y="181" fill="#5fcc8a" fontSize="9">AD</text>
    <line x1="48" y1="183" x2="188" y2="48" stroke="#c9a84c" strokeWidth="2"/>
    <text x="190" y="46" fill="#c9a84c" fontSize="9">SRAS</text>
    <line x1="143" y1="198" x2="143" y2="12" stroke="#e07070" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="146" y="15" fill="#e07070" fontSize="8">LRAS</text>
    <circle cx="143" cy="108" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="108" x2="143" y2="108" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="111" fill="#b8943a" fontSize="8" textAnchor="end">PL*</text>
    <text x="143" y="208" fill="#b8943a" fontSize="8" textAnchor="middle">Y*=Yp</text>
  </svg><p>AD downward. SRAS upward (sticky wages SR). LRAS vertical at full-employment output (Yp).</p></div>
);

const LFDiag=()=>(
  <div className="dw"><h5>💵 Loanable Funds Market</h5>
  <svg viewBox="0 0 285 205" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="183" x2="255" y2="183" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="183" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="255,180 262,183 255,186" fill="#4a7aab"/><polygon points="30,12 33,5 36,12" fill="#4a7aab"/>
    <text x="144" y="198" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Loanable Funds ($)</text>
    <text x="12" y="97" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,97)">Real Interest Rate (r)</text>
    <line x1="46" y1="28" x2="238" y2="168" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="240" y="166" fill="#5fcc8a" fontSize="9">D (invest.)</text>
    <line x1="46" y1="168" x2="238" y2="28" stroke="#c9a84c" strokeWidth="2"/>
    <text x="240" y="30" fill="#c9a84c" fontSize="9">S (saving)</text>
    <circle cx="142" cy="98" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="98" x2="142" y2="98" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="142" y1="183" x2="142" y2="98" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="101" fill="#b8943a" fontSize="8" textAnchor="end">r*</text>
    <text x="142" y="193" fill="#b8943a" fontSize="8" textAnchor="middle">Q*</text>
    <text x="55" y="148" fill="#5fcc8a" fontSize="7.5">Govt deficit:</text>
    <text x="55" y="158" fill="#5fcc8a" fontSize="7.5">D shifts right</text>
    <text x="55" y="168" fill="#5fcc8a" fontSize="7.5">→ r rises</text>
  </svg><p>Borrowers demand funds (investment). Savers supply funds. r* = equilibrium real interest rate. Govt deficits shift D right → crowding out.</p></div>
);

const MoneyMktDiag=()=>(
  <div className="dw"><h5>🏦 Money Market</h5>
  <svg viewBox="0 0 285 205" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="183" x2="255" y2="183" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="183" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="255,180 262,183 255,186" fill="#4a7aab"/><polygon points="30,12 33,5 36,12" fill="#4a7aab"/>
    <text x="144" y="198" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Money</text>
    <text x="12" y="97" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,97)">Nominal Interest Rate (i)</text>
    <line x1="140" y1="18" x2="140" y2="178" stroke="#c9a84c" strokeWidth="2.2"/>
    <text x="143" y="15" fill="#c9a84c" fontSize="9">MS (fixed by Fed)</text>
    <line x1="46" y1="26" x2="230" y2="168" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="233" y="166" fill="#5fcc8a" fontSize="9">MD</text>
    <circle cx="140" cy="95" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="95" x2="140" y2="95" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="98" fill="#b8943a" fontSize="8" textAnchor="end">i*</text>
    <path d="M 160 95 Q 190 85, 200 80" stroke="#88aaff" strokeWidth="1.5" strokeDasharray="3,2" fill="none"/>
    <text x="168" y="108" fill="#88aaff" fontSize="7.5">Fed buys bonds:</text>
    <text x="168" y="118" fill="#88aaff" fontSize="7.5">MS shifts right</text>
    <text x="168" y="128" fill="#88aaff" fontSize="7.5">→ i falls</text>
  </svg><p>MS is vertical (controlled by Fed). MD slopes down. i* = nominal rate. Expansionary MP: MS right → i falls → investment rises.</p></div>
);

const ForexDiag=()=>(
  <div className="dw"><h5>💱 Foreign Exchange Market (US Dollar)</h5>
  <svg viewBox="0 0 285 205" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="183" x2="255" y2="183" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="183" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="255,180 262,183 255,186" fill="#4a7aab"/><polygon points="30,12 33,5 36,12" fill="#4a7aab"/>
    <text x="144" y="198" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Dollars</text>
    <text x="12" y="97" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,97)">Exchange Rate ($/foreign)</text>
    <line x1="46" y1="28" x2="236" y2="168" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="238" y="166" fill="#5fcc8a" fontSize="9">D$</text>
    <line x1="46" y1="168" x2="236" y2="28" stroke="#c9a84c" strokeWidth="2"/>
    <text x="238" y="30" fill="#c9a84c" fontSize="9">S$</text>
    <circle cx="141" cy="98" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="98" x2="141" y2="98" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="101" fill="#b8943a" fontSize="8" textAnchor="end">ER*</text>
    <text x="46" y="55" fill="#5fcc8a" fontSize="7.5">D shifts right:</text>
    <text x="46" y="65" fill="#5fcc8a" fontSize="7.5">$ appreciates</text>
    <text x="46" y="75" fill="#5fcc8a" fontSize="7.5">(US rates rise)</text>
  </svg><p>D for $ from foreigners buying US exports/assets. S of $ from Americans buying imports/assets abroad. Appreciation: D rises or S falls.</p></div>
);

const KCDiag=()=>(
  <div className="dw"><h5>✚ Keynesian Cross (Aggregate Expenditures Model)</h5>
  <svg viewBox="0 0 285 215" style={{maxWidth:280,width:"100%"}}>
    <line x1="33" y1="193" x2="255" y2="193" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="193" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="255,190 262,193 255,196" fill="#4a7aab"/><polygon points="30,12 33,5 36,12" fill="#4a7aab"/>
    <text x="144" y="208" fill="#6a7e8f" fontSize="9" textAnchor="middle">Real GDP (Y)</text>
    <text x="12" y="102" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,12,102)">Aggregate Expenditure (AE)</text>
    <line x1="38" y1="188" x2="245" y2="18" stroke="#7a8e9f" strokeWidth="1.4" strokeDasharray="4,3"/>
    <text x="248" y="20" fill="#7a8e9f" fontSize="8">45°</text>
    <line x1="38" y1="148" x2="242" y2="45" stroke="#b8943a" strokeWidth="2.2"/>
    <text x="245" y="43" fill="#b8943a" fontSize="8">AE=C+I+G+Xn</text>
    <circle cx="158" cy="98" r="5" fill="#fff" stroke="#5fcc8a" strokeWidth="1.5"/>
    <line x1="158" y1="193" x2="158" y2="98" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="158" y="203" fill="#5fcc8a" fontSize="8" textAnchor="middle">Y*</text>
    <text x="38" y="142" fill="#b8943a" fontSize="7.5">AE intercept</text>
    <text x="38" y="152" fill="#b8943a" fontSize="7.5">= autonomous</text>
    <text x="38" y="162" fill="#b8943a" fontSize="7.5">spending</text>
    <text x="38" y="175" fill="#7a8e9f" fontSize="7.5">(C₀+I+G+Xn)</text>
    <text x="90" y="178" fill="#88aaff" fontSize="7.5">Rec. gap</text>
    <text x="188" y="178" fill="#e07070" fontSize="7.5">Inf. gap</text>
  </svg><p>Equilibrium where AE = Y (45° line). Recessionary gap: Y* below full employment. Inflationary gap: Y* above. Multiplier closes gaps.</p></div>
);

const LaborDiag=()=>(
  <div className="dw"><h5>👷 Competitive Labor Market</h5>
  <svg viewBox="0 0 285 205" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="183" x2="255" y2="183" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="183" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="255,180 262,183 255,186" fill="#4a7aab"/><polygon points="30,12 33,5 36,12" fill="#4a7aab"/>
    <text x="144" y="198" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Labor (workers)</text>
    <text x="12" y="97" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,97)">Wage Rate (W)</text>
    <line x1="46" y1="168" x2="236" y2="28" stroke="#c9a84c" strokeWidth="2"/>
    <text x="238" y="28" fill="#c9a84c" fontSize="9">SL</text>
    <line x1="46" y1="28" x2="236" y2="168" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="238" y="168" fill="#5fcc8a" fontSize="9">DL=MRP</text>
    <circle cx="141" cy="98" r="5" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="98" x2="141" y2="98" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="141" y1="183" x2="141" y2="98" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="101" fill="#b8943a" fontSize="8" textAnchor="end">W*</text>
    <text x="141" y="193" fill="#b8943a" fontSize="8" textAnchor="middle">L*</text>
    <text x="46" y="132" fill="#5fcc8a" fontSize="7.5">DL derived from</text>
    <text x="46" y="142" fill="#5fcc8a" fontSize="7.5">product demand</text>
  </svg><p>Labor demand = MRP curve (downward: diminishing MP). Supply = upward (opportunity cost rises). Hire until W = MRP.</p></div>
);

const MonopsonyDiag=()=>(
  <div className="dw"><h5>🏭 Monopsony Labor Market</h5>
  <svg viewBox="0 0 285 215" style={{maxWidth:275,width:"100%"}}>
    <line x1="33" y1="193" x2="255" y2="193" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="193" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="144" y="208" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Labor</text>
    <text x="12" y="102" fill="#6a7e8f" fontSize="8" textAnchor="middle" transform="rotate(-90,12,102)">Wage / MRC</text>
    <line x1="46" y1="173" x2="222" y2="38" stroke="#c9a84c" strokeWidth="2"/>
    <text x="224" y="36" fill="#c9a84c" fontSize="9">SL (ACL)</text>
    <line x1="46" y1="173" x2="134" y2="38" stroke="#e07070" strokeWidth="2"/>
    <text x="136" y="36" fill="#e07070" fontSize="9">MRC</text>
    <line x1="46" y1="38" x2="222" y2="173" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="224" y="171" fill="#5fcc8a" fontSize="9">DL=MRP</text>
    <circle cx="118" cy="113" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="118" y1="193" x2="118" y2="113" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="118" y="203" fill="#b8943a" fontSize="8" textAnchor="middle">Lm</text>
    <line x1="33" y1="148" x2="118" y2="148" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="28" y="151" fill="#b8943a" fontSize="8" textAnchor="end">Wm</text>
    <text x="50" y="75" fill="#e07070" fontSize="7.5">MRC &gt; W</text>
    <text x="50" y="85" fill="#e07070" fontSize="7.5">because must raise</text>
    <text x="50" y="95" fill="#e07070" fontSize="7.5">wage for ALL workers</text>
  </svg><p>Single buyer of labor: MRC &gt; W. Hires less (Lm) and pays less (Wm) than competitive market. Creates DWL.</p></div>
);

const LorenzDiag=()=>(
  <div className="dw"><h5>📊 Lorenz Curve & Gini Coefficient</h5>
  <svg viewBox="0 0 260 220" style={{maxWidth:255,width:"100%"}}>
    <line x1="30" y1="185" x2="220" y2="185" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="30" y1="185" x2="30" y2="18" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="125" y="200" fill="#6a7e8f" fontSize="9" textAnchor="middle">Cumulative % of Population</text>
    <text x="12" y="102" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,12,102)">Cumulative % of Income</text>
    <line x1="30" y1="185" x2="220" y2="18" stroke="#5fcc8a" strokeWidth="1.8" strokeDasharray="5,3"/>
    <text x="195" y="28" fill="#5fcc8a" fontSize="8">Perfect</text>
    <text x="195" y="37" fill="#5fcc8a" fontSize="8">Equality</text>
    <path d="M 30 185 Q 80 182, 120 170 T 220 18" stroke="#b8943a" strokeWidth="2.2" fill="none"/>
    <text x="155" y="148" fill="#b8943a" fontSize="8">Lorenz</text>
    <text x="155" y="158" fill="#b8943a" fontSize="8">Curve</text>
    <polygon points="30,185 220,18 220,185" fill="#4a7aab" opacity=".07"/>
    <path d="M 30 185 Q 80 182, 120 170 T 220 18 L 220 185 Z" fill="#b8943a" opacity=".12"/>
    <text x="108" y="178" fill="#b8943a" fontSize="7.5">Area A</text>
    <text x="170" y="120" fill="#4a7aab" fontSize="7.5">Area B</text>
    <text x="48" y="158" fill="#c8d0e0" fontSize="7.5">Gini = A/(A+B)</text>
    <text x="48" y="168" fill="#c8d0e0" fontSize="7.5">0 = perfect equality</text>
    <text x="48" y="178" fill="#c8d0e0" fontSize="7.5">1 = total inequality</text>
  </svg><p>Greater bow = more inequality = larger Gini coefficient. US Gini ≈ 0.39 (moderate inequality).</p></div>
);

const LRIndustryDiag=()=>(
  <div className="dw"><h5>📈 Long-Run Industry Supply Curves</h5>
  <svg viewBox="0 0 300 185" style={{maxWidth:295,width:"100%"}}>
    <line x1="20" y1="165" x2="275" y2="165" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="20" y1="165" x2="20" y2="15" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="148" y="180" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <text x="10" y="90" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,10,90)">Price</text>
    <line x1="28" y1="90" x2="262" y2="90" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="265" y="88" fill="#5fcc8a" fontSize="8">Constant cost</text>
    <text x="265" y="98" fill="#5fcc8a" fontSize="7.5">(horizontal)</text>
    <line x1="28" y1="130" x2="262" y2="60" stroke="#c9a84c" strokeWidth="2"/>
    <text x="265" y="58" fill="#c9a84c" fontSize="8">Increasing cost</text>
    <text x="265" y="68" fill="#c9a84c" fontSize="7.5">(upward slope)</text>
    <line x1="28" y1="55" x2="262" y2="115" stroke="#88aaff" strokeWidth="2"/>
    <text x="265" y="113" fill="#88aaff" fontSize="8">Decreasing cost</text>
    <text x="265" y="123" fill="#88aaff" fontSize="7.5">(downward slope)</text>
    <text x="28" y="156" fill="#6a7e8f" fontSize="7.5">Entry of new firms</text>
    <text x="28" y="164" fill="#6a7e8f" fontSize="7.5">drives LR supply</text>
  </svg><p>Constant cost: entry doesn't change input prices (most common). Increasing: entry bids up inputs. Decreasing: entry reduces input prices (rare).</p></div>
);

const IndiffDiag=()=>(
  <div className="dw"><h5>🎯 Indifference Curves & Consumer Optimum</h5>
  <svg viewBox="0 0 270 215" style={{maxWidth:265,width:"100%"}}>
    <line x1="30" y1="193" x2="240" y2="193" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="30" y1="193" x2="30" y2="15" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="135" y="208" fill="#6a7e8f" fontSize="9" textAnchor="middle">Good X</text>
    <text x="12" y="104" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,104)">Good Y</text>
    <path d="M 42 22 Q 62 55, 95 88 T 188 175" stroke="#4a7aab" strokeWidth="1.6" fill="none" strokeDasharray="3,2"/>
    <text x="190" y="173" fill="#4a7aab" fontSize="7.5">IC₁</text>
    <path d="M 55 22 Q 78 52, 112 82 T 214 162" stroke="#5fcc8a" strokeWidth="2" fill="none"/>
    <text x="216" y="160" fill="#5fcc8a" fontSize="7.5">IC₂</text>
    <path d="M 78 22 Q 104 48, 140 75 T 235 148" stroke="#5fcc8a" strokeWidth="1.4" fill="none" strokeDasharray="2,2"/>
    <text x="237" y="146" fill="#5fcc8a" fontSize="7.5">IC₃</text>
    <line x1="35" y1="28" x2="218" y2="178" stroke="#b8943a" strokeWidth="2"/>
    <text x="220" y="176" fill="#b8943a" fontSize="7.5">BL</text>
    <circle cx="138" cy="88" r="5" fill="#fff" stroke="#b8943a" strokeWidth="2"/>
    <text x="145" y="85" fill="#b8943a" fontSize="8">Optimum</text>
    <text x="145" y="95" fill="#b8943a" fontSize="7.5">(tangency)</text>
    <text x="38" y="155" fill="#7a8e9f" fontSize="7.5">MRS = Px/Py</text>
    <text x="38" y="165" fill="#7a8e9f" fontSize="7.5">at optimum</text>
    <text x="38" y="175" fill="#7a8e9f" fontSize="7.5">(slope IC = slope BL)</text>
  </svg><p>Optimum: highest attainable IC tangent to budget line. MRS (slope of IC) = price ratio (slope of BL). Higher ICs = more utility.</p></div>
);

const PhillipsDiag=()=>(
  <div className="dw"><h5>📈 Phillips Curve (SR & LR)</h5>
  <svg viewBox="0 0 265 200" style={{maxWidth:260,width:"100%"}}>
    <line x1="33" y1="178" x2="240" y2="178" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="178" x2="33" y2="14" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="136" y="193" fill="#6a7e8f" fontSize="9" textAnchor="middle">Unemployment Rate →</text>
    <text x="12" y="96" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,96)">Inflation Rate →</text>
    <path d="M 50 22 Q 84 55, 122 90 T 205 156" stroke="#b8943a" strokeWidth="2.2" fill="none"/>
    <text x="208" y="154" fill="#b8943a" fontSize="8">SRPC</text>
    <line x1="140" y1="178" x2="140" y2="14" stroke="#e07070" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="143" y="17" fill="#e07070" fontSize="8">LRPC</text>
    <text x="140" y="188" fill="#e07070" fontSize="7.5" textAnchor="middle">NRU</text>
    <circle cx="86" cy="58" r="4" fill="#5fcc8a"/>
    <text x="92" y="56" fill="#5fcc8a" fontSize="7.5">Low U, high π</text>
    <circle cx="178" cy="136" r="4" fill="#88aaff"/>
    <text x="120" y="150" fill="#88aaff" fontSize="7.5">High U, low π</text>
    <path d="M 50 55 Q 82 48, 118 80 T 200 142" stroke="#e07070" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
    <text x="188" y="138" fill="#e07070" fontSize="7.5">SRPC</text>
    <text x="188" y="148" fill="#e07070" fontSize="7.5">shifts →</text>
    <text x="188" y="158" fill="#e07070" fontSize="7.5">(supply shock)</text>
  </svg><p>SRPC: inflation-unemployment tradeoff. LRPC: vertical at NRU (no LR tradeoff). Supply shock → SRPC shifts right (stagflation).</p></div>
);

const MoneyMultDiag=()=>(
  <div className="dw"><h5>🏦 Money Multiplier & Fractional Reserve Banking</h5>
  <svg viewBox="0 0 295 170" style={{maxWidth:290,width:"100%"}}>
    <rect x="18" y="18" width="108" height="38" rx="6" fill="#162435" stroke="#b8943a" strokeWidth="1.4"/>
    <text x="72" y="34" fill="#b8943a" fontSize="9.5" textAnchor="middle" fontWeight="bold">Bank A</text>
    <text x="72" y="46" fill="#8a9eae" fontSize="8" textAnchor="middle">Deposit: $1,000</text>
    <text x="72" y="56" fill="#5fcc8a" fontSize="7.5" textAnchor="middle">Loans $800 (holds $200)</text>
    <line x1="126" y1="37" x2="145" y2="37" stroke="#5fcc8a" strokeWidth="1.4"/>
    <polygon points="143,34 148,37 143,40" fill="#5fcc8a"/>
    <rect x="148" y="18" width="108" height="38" rx="6" fill="#162435" stroke="#5fcc8a" strokeWidth="1.4"/>
    <text x="202" y="34" fill="#5fcc8a" fontSize="9.5" textAnchor="middle" fontWeight="bold">Bank B</text>
    <text x="202" y="46" fill="#8a9eae" fontSize="8" textAnchor="middle">Deposit: $800</text>
    <text x="202" y="56" fill="#5fcc8a" fontSize="7.5" textAnchor="middle">Loans $640… and so on</text>
    <text x="148" y="90" fill="#b8943a" fontSize="11" textAnchor="middle" fontWeight="bold">Money Multiplier = 1 / RR</text>
    <text x="148" y="108" fill="#8a9eae" fontSize="9" textAnchor="middle">RR = 20%: MM = 1/0.2 = 5</text>
    <text x="148" y="123" fill="#c9a84c" fontSize="9" textAnchor="middle">$1,000 deposit → up to $5,000 money supply</text>
    <text x="148" y="140" fill="#6a7e8f" fontSize="8" textAnchor="middle">Actual increase less if banks hold excess reserves or cash drains</text>
    <text x="148" y="155" fill="#6a7e8f" fontSize="8" textAnchor="middle">Fed controls RR to expand or contract money supply</text>
  </svg></div>
);

const CircularDiag=()=>(
  <div className="dw"><h5>🔄 Circular Flow Model</h5>
  <svg viewBox="0 0 330 238" style={{maxWidth:320,width:"100%"}}>
    <rect x="12" y="90" width="96" height="50" rx="8" fill="#101e2e" stroke="#b8943a" strokeWidth="1.4"/>
    <text x="60" y="113" fill="#b8943a" fontSize="10" textAnchor="middle" fontWeight="bold">HOUSEHOLDS</text>
    <text x="60" y="127" fill="#7a8e9f" fontSize="8" textAnchor="middle">consumers &</text>
    <text x="60" y="137" fill="#7a8e9f" fontSize="8" textAnchor="middle">resource owners</text>
    <rect x="222" y="90" width="96" height="50" rx="8" fill="#101e2e" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="270" y="113" fill="#4a7aab" fontSize="10" textAnchor="middle" fontWeight="bold">BUSINESSES</text>
    <text x="270" y="127" fill="#7a8e9f" fontSize="8" textAnchor="middle">producers &</text>
    <text x="270" y="137" fill="#7a8e9f" fontSize="8" textAnchor="middle">employers</text>
    <rect x="115" y="7" width="100" height="32" rx="7" fill="#0a2218" stroke="#2a7a50" strokeWidth="1.4"/>
    <text x="165" y="22" fill="#5fcc8a" fontSize="9" textAnchor="middle" fontWeight="bold">PRODUCT MARKET</text>
    <text x="165" y="33" fill="#5fcc8a" fontSize="7.5" textAnchor="middle">Goods & Services</text>
    <rect x="115" y="198" width="100" height="32" rx="7" fill="#280a0a" stroke="#8a2020" strokeWidth="1.4"/>
    <text x="165" y="213" fill="#e07070" fontSize="9" textAnchor="middle" fontWeight="bold">RESOURCE MARKET</text>
    <text x="165" y="224" fill="#e07070" fontSize="7.5" textAnchor="middle">Labor, Land, Capital</text>
    <path d="M 60 90 Q 60 42, 115 22" stroke="#5fcc8a" strokeWidth="1.4" fill="none" markerEnd="url(#c1)"/>
    <path d="M 215 22 Q 270 42, 270 90" stroke="#b8943a" strokeWidth="1.4" fill="none" markerEnd="url(#c2)"/>
    <path d="M 270 140 Q 270 188, 215 213" stroke="#5fcc8a" strokeWidth="1.4" fill="none" markerEnd="url(#c1)"/>
    <path d="M 115 213 Q 60 188, 60 140" stroke="#b8943a" strokeWidth="1.4" fill="none" markerEnd="url(#c2)"/>
    <text x="34" y="52" fill="#5fcc8a" fontSize="7.5">$ spending</text>
    <text x="278" y="52" fill="#b8943a" fontSize="7.5">goods &</text><text x="278" y="62" fill="#b8943a" fontSize="7.5">services</text>
    <text x="278" y="176" fill="#5fcc8a" fontSize="7.5">wages/</text><text x="278" y="186" fill="#5fcc8a" fontSize="7.5">rent/profit</text>
    <text x="20" y="176" fill="#b8943a" fontSize="7.5">labor/</text><text x="17" y="186" fill="#b8943a" fontSize="7.5">land/cap.</text>
    <defs><marker id="c1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#5fcc8a"/></marker><marker id="c2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#b8943a"/></marker></defs>
  </svg><p>Money & real goods flow in opposite directions. Product market (top) + Resource market (bottom).</p></div>
);

/* ═══════════════ JSX HELPERS ═══════════════ */
const B=({t,c})=><div className="sb0"><h5>{t}</h5><p>{c}</p></div>;
const D=({t,c})=><div className="db"><h5>{t}</h5><p>{c}</p></div>;
const E=({t,c})=><div className="eb"><h5>{t}</h5><p>{c}</p></div>;
const AP=({c})=><div className="apb"><h5>⚡ AP Exam Tips</h5><ul>{c.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;
const Dl=({t,items})=><div className="db"><h5>{t}</h5><ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;
const APX=({t,c})=><div className="apx"><h5>{t}</h5><p>{c}</p></div>;
const APXl=({t,items})=><div className="apx"><h5>{t}</h5><ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;

/* ═══════════════ CONTENT ═══════════════ */

const part1=[
  {id:"ep",icon:"🔭",title:"The Economic Perspective",sub:"Scarcity · Purposeful Behavior · Marginal Analysis",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Economics is about one big problem: we want more than we can have. Resources (time, money, land) are limited; wants are unlimited. So every choice requires giving something up. Economics studies HOW we make these choices."/><Dl t="Three Core Ideas" items={["Scarcity & Choice: Every choice means giving up the next-best alternative (opportunity cost).","Purposeful Behavior: People act rationally — weighing benefits against costs to maximize their well-being.","Marginal Analysis: 'Marginal' = one more unit. Act when MB ≥ MC. Stop when MC > MB. This drives every output/pricing decision."]}/></>,
    "In-Depth":<><D t="Scarcity" c="Human wants are virtually limitless while productive resources are finite. Even the wealthiest nations face scarcity of time, skilled labor, land, and capital. Scarcity is universal — not a description of poverty."/><D t="Purposeful (Rational) Behavior" c="Economists model people as rational actors seeking to maximize satisfaction given constraints. This doesn't mean perfect or selfish — just deliberate. Businesses maximize profit; consumers maximize utility; governments (ideally) maximize social welfare."/><D t="Marginal Analysis" c="Marginal benefit (MB) = extra benefit from one more unit. Marginal cost (MC) = extra cost. Rule: act if MB ≥ MC; stop when MC > MB. This is the foundation of every pricing and output decision in AP Micro."/></>,
    Examples:<><E t="Marginal Analysis at a Buffet" c="1st plate: amazing. 4th plate: you feel sick. You stop when the marginal benefit (enjoyment) drops below the marginal cost (discomfort). This is marginal thinking in action."/><E t="Beyoncé Has Scarcity Too" c="She has millions of dollars but only 24 hrs/day. Time is scarce. Every concert means less time for other things. Even billionaires face tradeoffs."/></>,
    "AP Tips":<AP c={["MB = MC is the profit-maximizing rule — appears on nearly every AP Micro FRQ.","Scarcity ≠ Poverty. Universal condition, not description of being poor. Classic trap.","'Rational' in economics = purposeful, not cold or perfect."]}/>
  }},
  {id:"mm",icon:"🔬",title:"Micro vs. Macro + Positive vs. Normative",sub:"Two branches · Factual vs. value statements",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Microeconomics zooms in (one market, one firm, one consumer). Macroeconomics zooms out (whole economy: GDP, inflation, unemployment). Positive = factual, testable ('Unemployment is 4%'). Normative = value judgment ('It should be lower')."/></>,
    "In-Depth":<><D t="Microeconomics" c="Prices, consumer behavior, firm decisions, market structures (perfect competition, monopoly, oligopoly), resource allocation, market failures. This is AP Micro."/><D t="Macroeconomics" c="GDP, unemployment, inflation, business cycles, monetary policy (the Fed), fiscal policy (taxes & spending). National-level outcomes. This is AP Macro."/><D t="Positive vs. Normative" c="Positive: testable facts — can be right or wrong based on evidence. Normative: 'should' statements involving value judgments — no data can prove them correct. Economists agree on positive analysis but disagree on normative policy conclusions."/></>,
    Examples:<><E t="Micro vs. Macro" c="Micro: 'Why did egg prices rise after bird flu?' (one market). Macro: 'Why did inflation hit 9% in 2022?' (whole economy's price level)."/><E t="Positive vs. Normative" c="Positive: 'US minimum wage is $7.25/hr.' Normative: 'The minimum wage should be raised to $20.' Same topic, totally different type of statement."/></>,
    "AP Tips":<AP c={["'Taxes should be cut' = NORMATIVE. 'Taxes were cut by 10%' = POSITIVE. Tested every year.","Know which AP exam you're on — Micro and Macro test completely different content.","Policy debates always involve normative disagreement. Economists can agree on facts but disagree on what to do."]}/>
  }},
  {id:"ppc",icon:"📊",title:"Production Possibilities Model",sub:"PPC · Opportunity Cost · Efficiency · Growth",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="The PPC shows all efficient combinations of two goods an economy can produce with current resources and technology. Points ON the curve = efficient. Inside = wasted resources. Outside = unattainable. The curve bows outward because of the Law of Increasing Opportunity Costs."/><B t="Key Shifts" c="Outward PPC shift = economic growth (more resources or better technology). Inward shift = natural disaster, war, disease. Moving ALONG the curve = reallocation, not growth."/></>,
    Diagram:<><PPCDiag/><Dl t="What Shifts the PPC Outward?" items={["More natural resources (discovery of oil, minerals)","More labor (population growth, immigration)","More capital goods (investment in factories/equipment)","Better technology (innovation, education/training of workers)"]}/></>,
    "In-Depth":<><D t="Law of Increasing Opportunity Costs" c="As you produce more of one good, its opportunity cost rises because resources aren't perfectly adaptable between uses. The first units shifted cost little; later units cost more. This makes the PPC concave (bowed out from origin)."/><D t="Productive vs. Allocative Efficiency" c="Productive efficiency: on the PPC (no wasted resources). Allocative efficiency: the RIGHT point on the PPC — where MB = MC for society, maximizing social welfare. Pure competition achieves both in LR."/><D t="Present vs. Future Tradeoff" c="Producing more capital goods today (sacrifice consumer goods) → PPC shifts further outward tomorrow. Japan/South Korea invested heavily in capital post-WWII → became wealthy economies by 1980s. This is the investment-for-growth tradeoff."/></>,
    "AP Tips":<AP c={["Most-tested concept in AP Economics. Every PPC question: correctly label axes, curve, and specific points.","Recession = inside curve (existing resources unused). NOT a shift inward. Technology improvement = outward shift.","Sector-specific tech improvement → rotate curve outward on THAT axis only, not both.","Capital goods investment → LARGER future outward shift than consumer goods investment."]}/>
  }},
  {id:"factors",icon:"🌍",title:"Factors of Production & Society's Problem",sub:"Land · Labor · Capital · Entrepreneurship",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="The Four Factors" c="Every economy needs four ingredients: Land (natural resources → earns Rent), Labor (human effort → earns Wages), Capital (man-made production tools — NOT money → earns Interest), Entrepreneurial Ability (organizes the others, takes risk → earns Profit)."/></>,
    "In-Depth":<><Dl t="Four Factors & Income Payments" items={["Land: All natural resources (farmland, oil, minerals, water). Income = Rent. Perfectly inelastic supply → all rent is economic surplus.","Labor: Physical and mental human effort. Income = Wages. Quality improved through education (human capital).","Capital: Man-made goods used in production (factories, machines, computers). Income = Interest. Capital ≠ Money — this is a classic AP trap.","Entrepreneurial Ability: Talent to combine other factors, innovate, and bear risk. Income = Profit (residual after all other factors paid)."]}/><D t="Capital ≠ Money" c="The bakery oven IS capital. The $50,000 cash used to buy it is not. Money is just a medium of exchange used to ACQUIRE capital. In AP Micro, 'capital' always means physical production tools."/></>,
    "AP Tips":<AP c={["Capital ≠ Money — tested every year without exception.","Know income payments: Rent, Wages, Interest, Profit (RWIP). Match each to its factor.","'Human capital' = education and skills embodied in workers. Still classified under Labor, not Capital."]}/>
  }},
  {id:"esys",icon:"🏛️",title:"Economic Systems, Market Characteristics & Five Questions",sub:"Command · Market · Invisible Hand · Circular Flow",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Three Systems" c="Command economy: government decides what, how, and for whom to produce (North Korea, Soviet Union). Market system: prices and profit signals coordinate decisions (US, Western Europe). Pure laissez-faire: zero government, all markets (theoretical only)."/><B t="Five Fundamental Questions Every Economy Must Answer" c="(1) What to produce? → consumer dollar votes. (2) How? → least-cost production. (3) Who gets output? → those with income. (4) How to accommodate change? → prices adjust automatically. (5) How to promote progress? → profit motive drives innovation."/></>,
    "In-Depth":<><D t="The Invisible Hand (Adam Smith, 1776)" c="Self-interest in competitive markets accidentally benefits society. The baker bakes for profit, but you get bread. Price signals coordinate millions of decentralized decisions without central planning. But the invisible hand fails with: public goods, externalities, monopoly, and information asymmetry."/><D t="The Incentive Problem in Command Economies" c="Without profit motive or competition, no reason to work hard, innovate, or be efficient. Soviet nail factories made giant nails to meet weight quotas; tiny useless nails to meet count quotas. No price signals → chronic shortages, poor quality, stagnation."/><CircularDiag/><D t="Circular Flow: Income = Output = Expenditure" c="Product market (top): households buy goods from businesses. Resource market (bottom): households sell labor/land/capital to businesses. Two flows run in opposite directions: real goods/services and money. In a simple economy: all income = all spending = GDP."/></>,
    Examples:<><E t="The Two Koreas" c="Same people, same culture, different systems. South Korea (market): GDP per capita ~$35,000. North Korea (command): ~$1,800. Almost entirely explained by economic system choice."/></>,
    "AP Tips":<AP c={["Five Fundamental Questions appear on both Micro and Macro FRQs — know all five cold.","Circular flow backbone of GDP accounting: C+I+G+Xn = income = output. AP Macro always tests this.","Invisible hand FAILS with market failures — public goods, externalities, monopoly. Core AP Micro content."]}/>
  }},
];

const part2=[
  {id:"sd",icon:"📊",title:"Demand, Supply & Market Equilibrium",sub:"Ch 3 — The core of all economics",tabs:["Simple","Diagram","In-Depth","Price Controls","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Demand: people buy less as prices rise (inverse). Supply: firms produce more as prices rise (direct). Where they meet = equilibrium price and quantity. This is the most important concept in all of economics."/><Dl t="Demand Shifters (TIPEN)" items={["Tastes/preferences change","Income changes (normal vs. inferior goods)","Prices of related goods (substitutes raise demand; complements lower it)","Expectations of future prices","Number of buyers in market"]}/><Dl t="Supply Shifters (ROTTEN)" items={["Resource (input) prices change","Other goods' profitability changes","Technology improves","Taxes/subsidies change","Expectations of future prices","Number of sellers changes"]}/></>,
    Diagram:<><SDDiag/><D t="All 8 Equilibrium Scenarios" c="D right → P↑ Q↑. D left → P↓ Q↓. S right → P↓ Q↑. S left → P↑ Q↓. Both right: Q↑ P=?. Both left: Q↓ P=?. D right + S left: P↑ Q=?. D left + S right: P↓ Q=?. When both shift, one variable is indeterminate."/></>,
    "In-Depth":<><D t="Law of Demand — Three Explanations" c="(1) Substitution effect: higher price → buy cheaper alternatives. (2) Income effect: higher price → real income falls → buy less. (3) Diminishing Marginal Utility: each additional unit gives less satisfaction → willingness to pay falls."/><D t="Change in Demand vs. Change in Quantity Demanded" c="Price change → movement ALONG the curve (change in QD). Any other factor change → SHIFT of the entire curve (change in D). This distinction is tested on every AP exam."/><D t="Normal vs. Inferior Goods" c="Normal good: income rises → demand rises (cars, restaurants). Inferior good: income rises → demand FALLS (ramen, public transit). Income elasticity positive for normal, negative for inferior."/></>,
    "Price Controls":<><PriceDiag/><D t="Price Ceiling (Maximum Price Set Below Equilibrium)" c="Binding price ceiling → Qd > Qs → shortage. Examples: rent control (NYC), gas price caps 1970s. Side effects: black markets, non-price rationing (waiting lists, discrimination), quality deterioration, reduced investment in the good."/><D t="Price Floor (Minimum Price Set Above Equilibrium)" c="Binding price floor → Qs > Qd → surplus. Examples: minimum wage (labor market), agricultural price supports. Side effects: unemployment (if in labor market), excess supply that must be purchased or disposed of."/><E t="Rent Control in NYC" c="Decades of below-market rent → housing shortage, long waiting lists, landlords stop maintaining properties, black market for key money. Perfect textbook price ceiling outcome."/></>,
    "AP Tips":<AP c={["Memorize all 8 S&D scenarios: each shift direction × each curve. Know P and Q effects.","Change in demand (shift) vs. change in quantity demanded (movement) — tested every single year.","Price ceiling BELOW P* = shortage. Price floor ABOVE P* = surplus. Never mix these up.","Normal good: income ↑ → D right. Inferior good: income ↑ → D left."]}/>
  }},
  {id:"mf",icon:"🏛️",title:"Market Failures: Externalities, Public Goods, Surplus",sub:"Ch 4 — When markets under- or overproduce",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Consumer & Producer Surplus" c="Consumer Surplus (CS) = what buyers were willing to pay MINUS what they actually paid. Area above P*, below demand curve. Producer Surplus (PS) = price received minus minimum acceptable price. Area below P*, above supply curve. Total Surplus = CS + PS = maximized at free market equilibrium. Any distortion → Deadweight Loss."/><Dl t="Four Types of Market Failure" items={["Public Goods: non-excludable AND non-rival. Free-rider problem. Markets underprovide. Govt must provide (defense, lighthouses, clean air).","Negative Externalities: costs imposed on third parties. Social cost > private cost → market overproduces. Solution: Pigouvian tax.","Positive Externalities: benefits to third parties. Social benefit > private benefit → market underproduces. Solution: subsidy.","Information Asymmetry: one party knows more than the other (used cars, insurance). Leads to adverse selection and moral hazard."]}/></>,
    Diagram:<><SurplusDiag/></>,
    "In-Depth":<><D t="Optimal Externality Reduction" c="Government should reduce negative externalities until MB of reduction = MC of reduction. FULL elimination is never optimal — last unit of pollution removal costs more than the benefit. This is the efficient quantity of pollution reduction, where the MC and MB curves for abatement intersect."/><D t="Public Goods — Free Rider Problem" c="If good is non-excludable, people consume it without paying. No one has incentive to pay voluntarily. Private firms can't profit → provide none or too little. Government must provide or subsidize, funded by taxation (compulsory payment to prevent free riding)."/><D t="Information Asymmetry" c="Adverse selection: high-risk buyers are more likely to purchase insurance (insurer can't distinguish). Moral hazard: once insured, people take more risks (insurer can't monitor behavior). Solutions: signaling, screening, warranties, government mandates."/><APX t="Quasi-Public Goods (AP Extra)" c="Excludable but non-rival (up to a point): toll roads, streaming services, national parks. Markets can provide them but may under-price due to non-rivalry. Government often subsidizes or provides them. These appear on AP FRQs more than the textbook covers."/></>,
    "AP Tips":<AP c={["Public goods: BOTH non-excludable AND non-rival. Fire station is excludable (club good). Know difference.","Negative externality → tax to internalize social cost. Positive externality → subsidy to increase quantity toward social optimum.","DWL = triangle between old and new Q. Must draw AND shade it correctly — FRQ requirement.","Total surplus maximized at P*. Any price control, tax, or market power creates DWL."]}/>
  }},
  {id:"gov",icon:"⚖️",title:"Government's Role, Failure & Antitrust",sub:"Ch 5 & 19 — When government doesn't fix markets",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Government's Economic Role" c="In a market economy, government: (1) enforces property rights/contracts, (2) provides public goods, (3) corrects externalities, (4) promotes competition (antitrust), (5) stabilizes the economy (macro policy), (6) redistributes income. But government can fail too."/><B t="Antitrust Laws" c="Laws to prevent monopoly power and promote competition. Sherman Antitrust Act (1890): outlaws monopolization and price-fixing cartels. Clayton Act (1914): prohibits specific anticompetitive practices (tying contracts, exclusive dealing). Federal Trade Commission Act (1914): created FTC to investigate unfair competition."/></>,
    "In-Depth":<><D t="Government Failure Types" c="(1) Principal-Agent Problem: politicians (agents) may not serve voters (principals) — maximize votes instead. (2) Special Interest Effect: concentrated benefits to few, diffuse costs to many → lobbying wins. (3) Shortsightedness: political cycle pressure for quick fixes. (4) Bureaucratic Inefficiency: no profit motive → no cost minimization. (5) Regulatory Capture: regulated industry controls its regulator."/><D t="Antitrust Issues and Enforcement" c="Issues of interpretation: What counts as anticompetitive? A company with 90% market share through superior innovation vs. predatory pricing. Issues of enforcement: suing Microsoft (2000) for bundling Internet Explorer. Effectiveness debated — some mergers prevented, some monopolies persist."/><D t="Natural Monopoly Regulation" c="Some industries have such large economies of scale that competition is impossible or wasteful (utilities, rail). Options: (1) Government ownership. (2) Regulated monopoly: set P = MC (socially optimal but may cause losses) or P = ATC (fair return, allows normal profit). Deregulation: remove government price controls and allow competition to emerge."/></>,
    "AP Tips":<AP c={["Antitrust appears more in AP Micro. Know Sherman Act (1890) as the key law.","Government failure ≠ government is always wrong. It means intervention can also create inefficiencies.","Regulatory capture: agency serves industry, not consumers. Classic example: revolving door between Wall Street and regulators.","Natural monopoly regulation: P = MC is allocatively efficient but may cause losses. P = ATC is fair return (normal profit)."]}/>
  }},
  {id:"lorenz",icon:"📊",title:"Income Inequality: Lorenz Curve & Gini Coefficient",sub:"Ch 21 — Measuring and causes of income inequality",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Societies are not equal — some people earn far more than others. The Lorenz Curve visualizes income inequality by showing what percentage of total income the bottom X% of the population actually earns. The further the curve bows away from the 45° equality line, the more unequal the distribution."/></>,
    Diagram:<><LorenzDiag/></>,
    "In-Depth":<><D t="Reading the Lorenz Curve" c="The 45° line (line of perfect equality): every 10% of the population earns exactly 10% of income. Actual Lorenz curve bows below. Example: bottom 40% of US population earns about 10% of income. Top 20% earns about 50%. The greater the bowing, the more inequality."/><D t="Gini Coefficient" c="Gini = Area A / (Area A + Area B). Ranges from 0 (perfect equality) to 1 (one person owns everything). US Gini ≈ 0.39. Nordic countries ≈ 0.25–0.30. Brazil ≈ 0.48. Higher Gini = more inequality. Gini has risen in the US since 1970."/><Dl t="Causes of Income Inequality" items={["Ability differences (innate talent, intelligence)","Education and training (human capital investment)","Discrimination (race, gender wage gaps)","Luck, connections, and being in the right place","Unequal distribution of wealth (inherited assets)","Market power of certain occupations"]}/><D t="Equality vs. Efficiency Tradeoff" c="More redistribution (taxes/transfers) reduces inequality but may reduce incentives to work and invest → lower efficiency and output. Less redistribution preserves incentives but increases inequality. Policymakers must choose where on this tradeoff to sit. No objectively correct answer — normative judgment."/></>,
    "AP Tips":<AP c={["Lorenz curve: further from 45° line → more inequality → higher Gini.","Gini coefficient: 0 = perfect equality, 1 = perfect inequality. Know the direction.","AP Micro uses this in income distribution FRQs. Know what shifts the Lorenz curve toward/away from equality.","Government redistribution (progressive taxes, transfers) moves Lorenz toward equality (lower Gini)."]}/>
  }},
];

const part3=[
  {id:"elas",icon:"↔️",title:"Elasticity",sub:"Ch 6 — Price, income, and cross elasticity",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Elasticity = sensitivity of quantity to a price (or income) change. Elastic: big response to price change (flat demand curve). Inelastic: small response (steep curve). The formula is always % change in Q divided by % change in the independent variable."/><Dl t="Key Formulas" items={["PED = %ΔQd / %ΔP (take absolute value for comparison)","If |PED| > 1: Elastic (quantity sensitive). |PED| < 1: Inelastic. |PED| = 1: Unit elastic.","Cross-Price Elasticity = %ΔQd of A / %ΔP of B → positive = substitutes; negative = complements","Income Elasticity = %ΔQd / %ΔIncome → positive = normal good; negative = inferior good","PES = %ΔQs / %ΔP → same direction, always positive (law of supply)"]}/></>,
    Diagram:<><ElasticDiag/><D t="Total Revenue Test" c="ELASTIC demand: price ↑ → TR decreases (customers flee). Price ↓ → TR increases. INELASTIC: price ↑ → TR increases (customers stay). Price ↓ → TR decreases. UNIT ELASTIC: price change doesn't change TR. This is the fastest way to identify elasticity on the AP exam."/></>,
    "In-Depth":<><Dl t="Determinants of Price Elasticity of Demand" items={["Availability of substitutes: more subs → more elastic (Pepsi vs. brand-name cereal)","Necessity vs. luxury: necessities (insulin) inelastic; luxuries (yacht) elastic","Budget share: larger share → more elastic (housing vs. salt)","Time horizon: more time → more elastic (can find substitutes, adjust behavior)","Breadth of market definition: broad (food) inelastic; narrow (Doritos) elastic"]}/><D t="Price Elasticity of Supply" c="Immediate period: perfectly inelastic (supply fixed — Picasso painting auction). Short run: somewhat inelastic (partial adjustment). Long run: more elastic (full adjustment, entry possible). Time is the key determinant of supply elasticity."/><APX t="Midpoint Formula for PED (AP Calculation Extra)" c="PED = [(Q2-Q1)/((Q2+Q1)/2)] / [(P2-P1)/((P2+P1)/2)]. The AP exam provides this formula but expects you to use it correctly. The midpoint method avoids asymmetry: going from $5 to $10 gives the same elasticity as $10 to $5."/></>,
    "AP Tips":<AP c={["Total Revenue Test is the fastest AP elasticity method — know it perfectly.","Cross elasticity: POSITIVE = substitutes (Coke & Pepsi). NEGATIVE = complements (cars & gas). ZERO = unrelated.","Perfectly inelastic demand = VERTICAL curve. Perfectly elastic = HORIZONTAL curve. Both extremes tested.","AP will give you a table or graph and ask you to calculate PED. Use midpoint formula."]}/>
  }},
  {id:"util",icon:"😊",title:"Utility Maximization",sub:"Ch 7 — How consumers maximize satisfaction",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Utility = satisfaction from consuming a good. Marginal utility = extra satisfaction from one more unit. Law of Diminishing Marginal Utility: each additional unit gives LESS satisfaction than the previous one (1st slice >> 4th slice). You maximize utility by spreading spending so the last dollar on each good gives equal marginal utility."/><B t="The Rule" c="Maximize total utility when: MU_x / P_x = MU_y / P_y. 'The bang per buck must be equal across all goods.' If MU/P is higher for X, buy more X until equality is restored."/></>,
    "In-Depth":<><D t="Law of Diminishing Marginal Utility" c="As consumption increases, MU eventually falls. Explains downward-sloping demand curve: you'll only buy more of a good at a lower price because each unit is worth less to you. This is the link between consumer theory and demand."/><D t="Diamond-Water Paradox" c="Water is essential but cheap. Diamonds are trivial luxuries but expensive. Why? We have so much water that the MARGINAL utility of one more unit is tiny. Few diamonds → MU of one more is enormous. Exchange value determined by marginal utility, not total utility."/><D t="Income and Substitution Effects" c="When price falls: (1) Substitution effect — good is now cheaper relative to others → buy more. (2) Income effect — real purchasing power rises → can afford more of all goods. Both typically increase Qd → law of demand holds. (Giffen goods: income effect dominates and is negative → rare violation of law of demand.)"/></>,
    Examples:<><E t="Budget Allocation Example" c="$10 budget. Pizza $2, coffee $1. MU of last pizza = 20; MU of last coffee = 5. MU/P: pizza = 10; coffee = 5. Buy more pizza! Each dollar on pizza gives 10 utils vs. 5 for coffee. Shift spending from coffee to pizza until ratios equalize."/></>,
    "AP Tips":<AP c={["AP will give you a table of MUs and ask: optimal bundle? → Find where MU_x/P_x = MU_y/P_y.","If MU_x/P_x > MU_y/P_y → buy more X and less Y. State this direction clearly on FRQs.","Diminishing MU explains downward-sloping demand — both concepts tested together."]}/>
  }},
  {id:"ic",icon:"🎯",title:"Indifference Curve Analysis",sub:"Ch 7 Appendix — Higher utility theory",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="An indifference curve (IC) shows all combinations of two goods that give a consumer the SAME total utility (equal satisfaction). Higher ICs = more utility. The consumer's optimum is where the HIGHEST attainable IC just touches (is tangent to) the budget line."/></>,
    Diagram:<><IndiffDiag/></>,
    "In-Depth":<><D t="Properties of Indifference Curves" c="(1) Downward sloping: to stay on same utility level, if you get more X, you must give up some Y. (2) Cannot cross: would imply contradictory preferences. (3) Convex to origin: reflects diminishing MRS — as you get more X, you're willing to give up less Y for even more X. (4) Higher = better (more utility)."/><D t="Marginal Rate of Substitution (MRS)" c="MRS = the rate at which a consumer willingly trades Y for X (staying on the same IC). MRS = MU_x / MU_y = slope of IC (absolute value). Diminishing MRS: as you consume more X, you're less willing to sacrifice Y for more X (convexity)."/><D t="Consumer Optimum" c="Highest IC tangent to budget line. At tangency: slope of IC = slope of budget line → MRS = P_x / P_y → MU_x/P_x = MU_y/P_y. This is the same condition as the utility-maximizing rule — just stated graphically."/><D t="Price Change and Income Change Effects" c="Price of X falls → budget line rotates outward on X axis → consumer moves to higher IC. New optimum on higher IC. Can decompose into substitution effect (rotate along old IC) and income effect (shift to new IC) — graphical version of what we covered in utility max."/></>,
    "AP Tips":<AP c={["Indifference curves appear more in AP Micro FRQs than the main text suggests — know the properties cold.","At optimum: MRS = Px/Py. Equivalently: MU_x/P_x = MU_y/P_y. Both say the same thing.","ICs cannot cross — if asked why, state it would imply A is both preferred to and indifferent from B, a contradiction.","Budget line rotation (price change) vs. budget line shift (income change) — draw both confidently."]}/>
  }},
  {id:"beh",icon:"🧠",title:"Behavioral Economics",sub:"Ch 8 — Why people don't always act rationally",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Traditional economics assumes perfectly rational people. Behavioral economics documents predictable, systematic ways people are NOT rational. Understanding these helps explain real decisions — and design better policies through 'nudges' (choice architecture that makes the good option the default)."/></>,
    "In-Depth":<><Dl t="Key Behavioral Biases (Know These)" items={["Framing Effect: Same info presented differently → different choice ('90% survival' vs '10% mortality rate')","Anchoring: First number seen biases all subsequent judgments (car price negotiation)","Status Quo Bias: Prefer current state even when alternatives are better (organ donation opt-in vs opt-out)","Mental Accounting: Treating money differently based on source or label (won money vs. earned money)","Loss Aversion (Prospect Theory): Losses hurt ~2x more than equal gains feel good","Hyperbolic Discounting: Overvalue present vs. future — why people don't save enough","Endowment Effect: You value things more once you own them"]}/><D t="Nudging & Choice Architecture" c="Thaler & Sunstein (2008): instead of mandating behavior, redesign defaults. 401(k) auto-enrollment: employees save much more when they must opt OUT rather than opt IN. Same options, different default → radically different outcomes. Libertarian paternalism — preserves freedom while improving outcomes."/></>,
    "AP Tips":<AP c={["Loss aversion is the most-tested behavioral concept. Losses hurt 2x more than equivalent gains.","Nudging = changing choice architecture (default options) without restricting freedom. Classic AP Micro policy question.","Behavioral econ challenges the assumption of rational actors — the AP exam may ask you to evaluate this challenge."]}/>
  }},
];

const part4=[
  {id:"costs",icon:"💰",title:"Businesses & Costs of Production",sub:"Ch 9 — Explicit, implicit, economic profit, cost curves",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Key Definitions" c="Explicit costs: actual cash payments (wages, rent). Implicit costs: opportunity costs of own resources (your time, your building). Accounting profit = TR - explicit costs. Economic profit = TR - explicit - implicit costs. Normal profit = economic profit = 0 (all resources earning exactly their opportunity cost)."/><Dl t="Cost Concepts — Know All Six" items={["Fixed Costs (FC): Don't vary with output (rent, insurance, equipment leases)","Variable Costs (VC): Vary with output (labor, materials, energy)","Total Cost (TC) = FC + VC","ATC = TC/Q = AFC + AVC","AVC = VC/Q","MC = ΔTC/ΔQ — THE MOST IMPORTANT COST — always determines profit-maximizing output"]}/></>,
    Diagram:<><CostDiag/></>,
    "In-Depth":<><D t="Law of Diminishing Returns (Short Run)" c="Adding more variable inputs (labor) to a fixed input (factory) → eventually MP falls → MC rises. This is why the MC curve is U-shaped and eventually upward sloping. Occurs because fixed input becomes a bottleneck."/><D t="Short Run vs. Long Run" c="Short run: at least one input is fixed (you can't change factory size overnight). Long run: ALL inputs are variable (can build new factory, enter/exit industry). Distinction matters because cost structures differ."/><D t="Economies & Diseconomies of Scale (Long Run)" c="Economies of scale: LRAC falls as output grows (large-scale efficiencies, specialization, bulk buying). Diseconomies: LRAC rises (coordination problems, bureaucracy, communication failures). Minimum efficient scale (MES) = minimum output at which LRAC is minimized. Determines industry structure."/></>,
    "AP Tips":<AP c={["Economic profit vs. accounting profit — always include implicit costs. Classic AP question.","Normal profit = zero economic profit = firm is earning exactly its opportunity cost. Should NOT shut down.","Shutdown rule (SR): P < min AVC → shut down immediately. Exit rule (LR): P < min ATC → exit industry.","MC cuts both ATC and AVC at their minimum points — essential for every firm diagram."]}/>
  }},
  {id:"pc",icon:"🏭",title:"Pure Competition — Short & Long Run",sub:"Ch 10–11 — Price takers, MR=MC, LR normal profit",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Four Market Structures" c="(1) Pure Competition: many sellers, identical product, easy entry/exit, price takers. (2) Monopolistic Competition: many sellers, differentiated product, easy entry. (3) Oligopoly: few large sellers, barriers to entry, mutual interdependence. (4) Pure Monopoly: one seller, significant barriers. Pure competition = benchmark (most efficient)."/></>,
    Diagram:<><PCFirmDiag/><LRIndustryDiag/></>,
    "In-Depth":<><D t="Pure Competition: Key Features" c="Many sellers, identical (homogeneous) products, easy entry/exit, no price control → price takers. Firm's demand curve = perfectly elastic (horizontal) at market price. P = MR = AR for every competitive firm. Firm NEVER has market power."/><D t="Profit Maximization: MR = MC Rule" c="For ALL market structures, profit is maximized where MR = MC. If MR > MC: produce more (adding to profit). If MC > MR: produce less. For PC firm: MR = P, so produce where P = MC. This is both profit-max AND allocative efficiency in PC."/><D t="Long-Run Industry Supply Curves" c="Constant cost industry: entry of new firms doesn't change input prices → LRAS is horizontal. Most industries. Increasing cost: expansion bids up input prices → LRAS slopes upward. Decreasing cost: expansion creates input efficiencies → LRAS slopes downward (rare)."/><D t="Long-Run PC Equilibrium" c="If profit → entry → supply ↑ → P ↓ → profit erodes. If loss → exit → supply ↓ → P ↑ → loss eliminated. LR equilibrium: P = min ATC = MC → productive AND allocative efficiency. Normal profit only."/></>,
    "AP Tips":<AP c={["P = MR = AR for pure competitor. This is the line you draw on the firm's diagram.","MR = MC gives Q*. Then go up to the demand (=P) line for price. This EXACT procedure appears on FRQs.","LR PC equilibrium: P = min ATC = MC. Three-way equality — tested on nearly every AP Micro exam.","Break-even: P = ATC (normal profit). Shutdown: P = min AVC. These trigger points are heavily tested."]}/>
  }},
  {id:"mono",icon:"🏰",title:"Pure Monopoly",sub:"Ch 12 — Price maker, MR < P, regulation",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Monopolist = ONLY seller. Sets price by choosing quantity. To sell more, must lower price for ALL units → MR falls faster than price → MR < P always. Result: produces less at higher price than competition → allocative inefficiency → deadweight loss."/></>,
    Diagram:<><MonopDiag/></>,
    "In-Depth":<><D t="Barriers to Entry" c="Natural monopoly (huge economies of scale — utilities, rail). Legal barriers (patents, copyrights, licenses). Essential resource ownership (DeBeers and diamonds historically). Strategic barriers (predatory pricing to drive out rivals)."/><D t="Economic Effects vs. Pure Competition" c="Higher price, lower output, economic profit (sustained by barriers), income transfer from consumers to monopolist, deadweight loss (allocative inefficiency), possible X-inefficiency (complacency without competition)."/><D t="Price Discrimination" c="Charging different prices to different buyers for same product. Conditions: market power, distinguishable buyers with different elasticities, no resale possible. First degree (perfect): charge each buyer their maximum WTP → captures ALL consumer surplus, no DWL but max profit. Third degree (most common): students vs. adults, business vs. economy flights."/><D t="Regulated Monopoly" c="Socially optimal price: P = MC (allocatively efficient but may cause losses if P < ATC). Fair-return price: P = ATC (allows normal profit, sustainable). Dilemma: MC regulation requires subsidy; ATC regulation leaves some allocative inefficiency."/></>,
    "AP Tips":<AP c={["Monopolist has NO supply curve (no unique P-Q relationship). AP exam tests this directly.","Always: MR < P for monopolist because demand slopes down. MR = P only for perfect competitor.","Draw: find MR = MC → drop to Q axis (Qm) → rise to DEMAND curve (NOT MR) for Pm. Critical step.","Monopoly always charges on the ELASTIC portion of demand (where MR > 0) at profit max."]}/>
  }},
  {id:"mk4",icon:"🔑",title:"Four Market Structures — Comparison",sub:"Quick reference for all four structures",tabs:["Table","Monopolistic Comp.","Oligopoly","AP Tips"],cnt:{
    Table:<><div className="db" style={{overflowX:"auto"}}><table className="mktable"><thead><tr><th>Feature</th><th>Pure Competition</th><th>Mono. Comp.</th><th>Oligopoly</th><th>Pure Monopoly</th></tr></thead><tbody>
      <tr><td>Number of Sellers</td><td>Many (infinite)</td><td>Many</td><td>Few (3–5 large)</td><td>One</td></tr>
      <tr><td>Product</td><td>Identical/homogeneous</td><td>Differentiated</td><td>Identical or differentiated</td><td>Unique, no close sub</td></tr>
      <tr><td>Entry/Exit</td><td>Very easy</td><td>Easy</td><td>Significant barriers</td><td>Blocked</td></tr>
      <tr><td>Price Control</td><td>None (price taker)</td><td>Some</td><td>Considerable</td><td>Considerable</td></tr>
      <tr><td>MR vs Price</td><td>MR = P</td><td>MR &lt; P</td><td>MR &lt; P</td><td>MR &lt; P</td></tr>
      <tr><td>LR Profit</td><td>Normal profit only</td><td>Normal profit only</td><td>Economic profit possible</td><td>Economic profit possible</td></tr>
      <tr><td>Productive Eff.</td><td>Yes (P = min ATC)</td><td>No (excess capacity)</td><td>Usually no</td><td>No</td></tr>
      <tr><td>Allocative Eff.</td><td>Yes (P = MC)</td><td>No (P &gt; MC)</td><td>Usually no</td><td>No (P &gt; MC)</td></tr>
      <tr><td>Examples</td><td>Wheat, corn, stocks</td><td>Restaurants, clothing</td><td>Cars, phones, airlines</td><td>Local utility, patented drug</td></tr>
    </tbody></table></div></>,
    "Monopolistic Comp.":<><D t="Characteristics" c="Many sellers, differentiated products (branding, style, quality), easy entry/exit, advertising as competition tool. Examples: restaurants, clothing brands, app stores, barbershops."/><D t="Short Run vs. Long Run" c="Short run: can earn economic profit or loss (like monopoly — faces downward-sloping demand). Long run: easy entry erodes profit → entry until P = ATC (normal profit), but NOT at min ATC. Excess capacity: firm produces less than minimum-cost output. Not productively efficient but offers product variety."/><APX t="Excess Capacity — AP Extra Nuance" c="In LR monopolistic competition: firm operates on declining portion of LRAC — not at minimum. This excess capacity is the cost of product variety. Whether this is 'wasteful' or 'desirable variety' is normative. The AP exam may ask you to identify excess capacity on a diagram as the gap between actual Q and min ATC quantity."/></>,
    Oligopoly:<><D t="Mutual Interdependence" c="Oligopolist's decisions depend on rivals' responses. My price cut may trigger a price war. My price hike may go unmatched. This strategic interaction defines oligopoly and makes it the most complex market structure."/><D t="Prisoner's Dilemma & Nash Equilibrium" c="Two firms each choose: advertise or not. Both advertise → both earn medium profit. Neither advertises → both earn high profit. One advertises, one doesn't → advertiser gains, other loses. Dominant strategy for each: advertise regardless of rival. Nash equilibrium: both advertise (collectively suboptimal). Collusion to not advertise is unstable — each has incentive to cheat."/><D t="Kinked Demand Theory" c="If firm raises price → rivals don't follow (customers leave). If firm cuts price → rivals match (no gain). Result: kink in demand curve at current price. Above kink: elastic demand. Below: inelastic. Creates gap in MR curve → MC can shift without changing optimal price/output → price stickiness explained."/></>,
    "AP Tips":<AP c={["Four market structures comparison table — memorize ALL rows. AP FRQ often asks to 'compare X to pure competition in terms of efficiency.'","Monopolistic competition: LR normal profit + excess capacity. Oligopoly: LR economic profit possible.","Prisoner's dilemma: know dominant strategy AND Nash equilibrium. Classic AP game theory question.","Only pure competition achieves both productive AND allocative efficiency in the long run."]}/>
  }},
];

const part5=[
  {id:"rm",icon:"👷",title:"Factor Markets: Wages, Rent, Interest & Profit",sub:"Ch 14–16 — Derived demand, MRP, monopsony, loanable funds",tabs:["Simple","Diagrams","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Resource markets work just like product markets — but demand for resources is DERIVED from demand for the final good. Firms hire workers not for their own sake, but to produce things consumers want. The key rule: hire until MRP = MRC (marginal revenue product = marginal resource cost)."/><Dl t="Factor Income Payments" items={["Labor → Wages (competitive: W = MRP; monopsony: W < MRP)","Land → Rent (supply perfectly inelastic → all rent is economic surplus above opportunity cost)","Capital → Interest (determined in loanable funds market by saving supply and investment demand)","Entrepreneurship → Profit (residual; reward for bearing uninsurable risk and organizing production)"]}/></>,
    Diagrams:<><LaborDiag/><MonopsonyDiag/><LFDiag/></>,
    "In-Depth":<><D t="Derived Demand" c="Demand for resources comes from demand for the final product. If pizza demand rises → demand for pizza workers rises. If technology replaces workers → DL shifts left. Key: DL = MRP curve. MRP = MP × MR (for monopolist product market) = MP × P (for competitive product market)."/><D t="MRP = MRC Hiring Rule" c="Hire inputs until MRP = MRC. For competitive labor market: MRC = wage (constant). For monopsony: MRC > wage (must raise wage for all workers). Rule: hire until MRP = MRC, just like produce until MR = MC. Two sides of the same optimization problem."/><D t="Monopsony" c="Single employer: faces upward-sloping labor supply → to hire more workers, must pay higher wage for ALL → MRC > wage. Monopsonist hires LESS (Lm) and pays LESS (Wm) than competitive market. Creates DWL (like monopoly on the buyer side). Examples: company towns, some hospital/school districts."/><D t="Minimum Wage in Competitive vs. Monopsony Markets" c="Competitive market: min wage above equilibrium → unemployment (QL < L*). Monopsony market: minimum wage can INCREASE employment AND wages simultaneously — if set between Wm and W_c, it eliminates the monopsony distortion. This is why empirical studies often find minimum wage increases don't cause unemployment — many labor markets have monopsonistic elements."/><D t="Loanable Funds Market" c="Determines real interest rate. Supply = saving (households, businesses, govt surpluses, foreign savers). Demand = borrowing for investment (firms), government borrowing (deficits). Equilibrium: r* where S = I. Government deficit shifts D right → r rises → crowding out of private investment."/></>,
    "AP Tips":<AP c={["MRP = MP × P (competitive firm). Hire until MRP = W (competitive labor market).","Monopsony: MRC > W; hires less at lower wage. Draw diagram: MRC above S_L, find Q where MRP = MRC, drop to S_L for wage.","Loanable funds market: S = saving. D = investment demand. Government deficits shift D right → r rises → crowding out.","AP Micro almost always has a labor market FRQ. Know both competitive and monopsony diagrams cold."]}/>
  }},
];

const part6=[
  {id:"gdp",icon:"📈",title:"Measuring GDP & National Income",sub:"Ch 25 — Expenditure approach, income approach, real vs. nominal",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="The GDP Formula" c="GDP = C + I + G + Xn. C = Consumer spending (~70% of US GDP). I = Gross Private Domestic Investment (equipment, construction, inventory changes — NOT stock purchases). G = Government purchases (NOT transfer payments). Xn = Net Exports = Exports - Imports (negative for US — trade deficit)."/></>,
    "In-Depth":<><D t="What GDP Includes and Excludes" c="INCLUDES: final goods only (not intermediate — avoids double counting), domestically produced, market transactions. EXCLUDES: used goods (not new production), financial transactions (stocks/bonds), transfer payments (Social Security, welfare), nonmarket activities (home cooking, volunteer work), underground economy."/><D t="Nominal vs. Real GDP" c="Nominal GDP: measured at current prices (output + price changes). Real GDP: adjusted for inflation (measures ONLY actual output changes). To compare output across years, ALWAYS use Real GDP. GDP Deflator = (Nominal GDP / Real GDP) × 100."/><D t="Income Approach to GDP" c="GDP = Compensation of employees + Rents + Interest + Proprietors' income + Corporate profits + Taxes on production/imports. This equals expenditure approach by identity: every dollar spent = a dollar of income for someone."/><D t="GDP Shortcomings" c="Misses: non-market activities (household work), underground economy, quality improvements, income distribution (same GDP can have very different equality), environmental degradation, leisure, subjective well-being. GDP = output scoreboard, not happiness meter."/></>,
    Examples:<><E t="Avoiding Double Counting" c="Ford buys $500 in steel → makes $25,000 car. GDP counts only the $25,000 final good. Steel counted once (as Ford's input, its value already in the car). Value-added at each stage = GDP by production approach."/><E t="Investment vs. Financial Investment" c="When Apple buys a new factory = $500M investment (counted in I). When you buy $500M of Apple stock = financial transaction (NOT counted in GDP). Only PHYSICAL capital investment counts."/></>,
    "AP Tips":<AP c={["GDP formula: C + I + G + Xn. Know every component — what's in and what's out.","Transfer payments (Social Security, welfare) are NOT in G. They are NOT in GDP.","Nominal grows with inflation. Real GDP removes inflation. AP Macro ALWAYS uses real GDP for output comparisons.","Recession = two consecutive quarters of declining REAL GDP."]}/>
  }},
  {id:"bci",icon:"📉",title:"Business Cycles, Unemployment & Inflation",sub:"Ch 27 — Recession, types of unemployment, CPI, costs of inflation",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Business Cycle Phases" c="Peak (max output, low unemployment) → Recession (declining output, 2+ quarters falling real GDP, rising unemployment) → Trough (bottom) → Expansion/Recovery (rising output, falling unemployment). Driven by investment swings and demand/supply shocks."/><Dl t="Three Types of Unemployment" items={["Frictional: Between jobs voluntarily. Normal, healthy, indicates a dynamic economy.","Structural: Skills mismatch — workers' skills no longer match available jobs. More serious, longer duration.","Cyclical: Insufficient aggregate demand — not enough spending to employ everyone. The 'bad' kind during recessions.","Full Employment / NRU = Frictional + Structural only. No cyclical. ≈ 4–6% in US."]}/></>,
    "In-Depth":<><D t="Measuring Unemployment" c="Official rate (U-3): (unemployed seeking work / labor force) × 100. Understates true unemployment: discouraged workers (gave up looking) not counted as unemployed; underemployed (part-time wanting full-time) counted as employed. U-6 includes these."/><D t="Inflation: Definition, Measurement, Types" c="Inflation = sustained rise in general price level. CPI = (Cost of current basket / Cost of base year basket) × 100. Inflation rate = % change in CPI. Demand-pull: AD > AS at full employment → price level rises. Cost-push: SRAS shifts left (input cost shock) → stagflation (P↑, Y↓)."/><D t="Costs of Inflation" c="Redistributive: debtors gain (real debt shrinks), creditors lose. Fixed-income earners lose. Savers lose (real return = nominal rate - inflation). Menu costs, shoe-leather costs, uncertainty reduces investment. Hyperinflation can destroy economic activity entirely."/><D t="Real vs. Nominal Interest Rate — Fisher Equation" c="Real interest rate = Nominal interest rate - Inflation rate. (r = i - π). If bank charges 6% nominal and inflation is 4%, real rate = 2% — that's the true purchasing power cost of borrowing. Lenders want positive real returns. Borrowers prefer lower real rates."/><APX t="Fisher Equation — AP Macro Requirement" c="r = i − π. This EXACT formula appears on AP Macro FRQs. Example: If nominal interest rate = 8% and expected inflation = 3%, real rate = 5%. When inflation rises unexpectedly, real rate falls → benefits borrowers, hurts lenders. Always think about real (inflation-adjusted) variables for long-run analysis."/></>,
    Examples:<><E t="2021–2022 US Inflation" c="COVID relief stimulus ($5T) → demand-pull inflation (AD shifted right). Supply chain disruptions + energy price spikes → cost-push (SRAS shifted left). Both simultaneously → inflation peaked at 9.1% in June 2022. Fed raised rates to shift AD left."/></>,
    "AP Tips":<AP c={["Frictional + Structural = NRU. Cyclical = recessionary. Only cyclical unemployment responds to stimulus.","Fisher equation: r = i - π. AP Macro FRQ almost certainly includes this. Real rate can be negative.","Demand-pull: AD right (P↑ Y↑). Cost-push: SRAS left (P↑ Y↓ — stagflation). Draw BOTH in AD-AS.","CPI vs. GDP deflator: CPI = fixed consumer basket; GDP deflator = all goods in GDP (broader)."]}/>
  }},
  {id:"growth",icon:"🚀",title:"Economic Growth",sub:"Ch 26 — Determinants, productivity, Rule of 70",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Economic growth = sustained increase in real GDP per capita over time. It compounds: Rule of 70 says years to double = 70 / annual growth rate. At 2% growth, income doubles in 35 years. At 7% growth, doubles in 10 years. Small differences in growth rates matter enormously over decades."/></>,
    "In-Depth":<><Dl t="Supply-Side Determinants of Growth" items={["Labor quality: education, training, health → human capital → productivity","Capital quantity: more machines, infrastructure, equipment","Technology: most important long-run driver (TFP — total factor productivity)","Natural resources: helpful but not necessary (Japan, South Korea = few resources, high growth)","Institutional factors: rule of law, property rights, political stability, low corruption"]}/><D t="Labor Productivity" c="Real GDP per hour worked. Rising productivity → workers produce more → higher real wages possible without inflation. Productivity growth from: capital deepening (more capital per worker), technology advances, education, economies of scale."/><D t="Growth and the PPC / LRAS" c="Economic growth = rightward shift of LRAS (and outward shift of PPC). Distinguished from recovery (moving toward existing LRAS from inside it). Short-run vs. long-run: short run = manage business cycles. Long run = grow productive capacity."/></>,
    "AP Tips":<AP c={["Rule of 70: doubling time = 70 / annual growth rate.","Growth = shift of LRAS rightward (not just moving along it).","AP Macro growth questions combine with long-run AD-AS. Supply-side policies (education, R&D, deregulation) shift LRAS right."]}/>
  }},
];

const part7=[
  {id:"adasm",icon:"📐",title:"Aggregate Demand & Aggregate Supply",sub:"Ch 30 — The core macro model",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="AD-AS is the macro version of supply and demand. AD = total spending. SRAS = total production in the short run (sticky wages/prices). LRAS = maximum sustainable output at full employment (vertical — all prices flexible). This one model explains recession, inflation, stagflation, and growth."/></>,
    Diagram:<><ADASDiag/><Dl t="AD Shifters (CIGXN)" items={["C: Consumer wealth, confidence, taxes, debt","I: Interest rates, business confidence, technology, investment tax credits","G: Government spending changes","Xn: Exchange rates, foreign income changes, tariffs"]}/><Dl t="SRAS Shifters" items={["Input prices (oil, wages, raw materials)","Productivity changes","Business taxes / subsidies","Government regulations"]}/></>,
    "In-Depth":<><D t="Why AD Slopes Downward" c="(1) Wealth effect: higher price level → real wealth falls → C falls. (2) Interest rate effect: higher prices → need more money → interest rates rise → I falls. (3) Net export effect: higher US prices → US exports more expensive → Xn falls."/><D t="SRAS vs. LRAS" c="SRAS upward sloping: in short run, wages/prices sticky → firms produce more when prices rise. LRAS vertical at full employment: in long run, all wages/prices adjust fully → output returns to potential regardless of price level."/><D t="Four Macro Scenarios" c="(1) AD right → demand-pull inflation (P↑, Y↑). (2) AD left → recession (Y↓, P↓ or sticky). (3) SRAS left → stagflation (P↑, Y↓ — worst). (4) SRAS right → favorable supply shock (P↓, Y↑ — best)."/><D t="Long-Run Self-Correction" c="Recessionary gap: unemployment → wages fall → SRAS shifts right → price level falls → Y returns to potential. Takes years. Inflationary gap: tight labor → wages rise → SRAS shifts left → P rises → Y returns to potential. Keynesians: too slow, use active policy. Classicals: let markets self-correct."/></>,
    "AP Tips":<AP c={["Most-tested AP Macro model. Draw: downward AD, upward SRAS, vertical LRAS. Label P and Y axes.","Stagflation = SRAS LEFT (supply shock). Policy dilemma: can't fix both P and Y simultaneously.","Recessionary gap: Y < Yp (left of LRAS). Inflationary gap: Y > Yp (right of LRAS). Identify both on diagram.","LR self-correction: recessionary gap → SRAS shifts right (wages fall). Inflationary → SRAS shifts left (wages rise)."]}/>
  }},
  {id:"kc",icon:"✚",title:"Keynesian Cross & Aggregate Expenditures Model",sub:"Ch 29 — Equilibrium GDP, expenditure gaps, multiplier",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="The Keynesian Cross shows how total spending determines GDP. Equilibrium is where total aggregate expenditure (AE = C+I+G+Xn) equals total output (Y). The 45° line represents all points where spending = output. If AE is below the 45° line, output falls. If above, output rises. The gap between equilibrium Y and full employment Y is the expenditure gap."/></>,
    Diagram:<><KCDiag/></>,
    "In-Depth":<><D t="Consumption Schedule" c="C = C₀ + MPC × Y. C₀ = autonomous consumption (even with zero income, people spend some from savings). MPC = marginal propensity to consume (fraction of each new dollar of income spent). MPS = 1 - MPC (fraction saved). As income rises, consumption rises but by less (MPC < 1)."/><D t="Recessionary Expenditure Gap" c="Equilibrium GDP (Y*) < Full Employment GDP (Yfe). Gap size = Yfe - Y*. To close it: increase autonomous spending by Gap / Multiplier. Example: Yfe = $5T, Y* = $4.5T, MPC = 0.8 → Multiplier = 5. Need $100B increase in G to close $500B gap."/><D t="Inflationary Expenditure Gap" c="Equilibrium GDP (Y*) > Yfe. Economy overheating — spending exceeds full-employment output. Gap = Y* - Yfe. To close: contractionary policy (cut G or raise T) by Gap / Multiplier. Must reduce autonomous spending."/><D t="The Spending Multiplier" c="Initial spending → income → more spending → more income. Chain continues. Total multiplied effect = Initial ΔSpending × (1/MPS). Tax multiplier = MPC/MPS (smaller because first round of tax cut is partially saved). Because first round differs, tax multiplier < spending multiplier in absolute value."/><APX t="Balanced Budget Multiplier — AP Extra" c="If government simultaneously increases G by $1 AND raises taxes by $1, GDP rises by exactly $1 (not zero). Why? ΔY from G = +$1 × (1/MPS). ΔY from tax = -$1 × (MPC/MPS). Net = 1/MPS - MPC/MPS = (1-MPC)/MPS = MPS/MPS = 1. Balanced budget multiplier = 1 always. This is an AP Macro FRQ classic."/></>,
    "AP Tips":<AP c={["Multiplier = 1/MPS = 1/(1-MPC). If MPC = 0.75, Multiplier = 4.","Tax multiplier = -MPC/MPS. SMALLER than spending multiplier (first round partly saved).","Balanced budget multiplier = 1 always. This exact question appears on AP Macro FRQs.","Recessionary gap: need ΔG = Gap / Multiplier. Don't confuse the gap size with the policy size needed."]}/>
  }},
  {id:"fp",icon:"🏛️",title:"Fiscal Policy, Deficits & National Debt",sub:"Ch 28, 31 — Government spending, taxes, crowding out",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Fiscal policy = government uses spending (G) and taxes (T) to stabilize the economy. Recessionary gap: expansionary FP (G↑ or T↓). Inflationary gap: contractionary FP (G↓ or T↑). Effects are multiplied through the economy. But timing lags, crowding out, and politics all limit effectiveness."/></>,
    "In-Depth":<><D t="Expansionary vs. Contractionary Fiscal Policy" c="Expansionary: G↑ or T↓ → AD shifts right → Y↑, P↑. Used for recessionary gap. Contractionary: G↓ or T↑ → AD shifts left → Y↓, P↓. Used for inflationary gap. Discretionary: requires legislation. Built-in stabilizers: automatic (tax revenue falls in recession, unemployment insurance rises → cushion without legislation)."/><D t="Crowding Out Effect" c="Government deficit spending → government borrows from loanable funds market → D for loanable funds shifts right → real interest rate rises → private investment falls. Partial or full offset of fiscal stimulus. Most severe: economy at full employment (tight financial market). Minimal: deep recession with near-zero rates (liquidity trap)."/><D t="Fiscal Policy Limitations" c="(1) Timing lags: recognition lag (months), administrative lag (congressional debate), operational lag (implementation time). (2) Crowding out: as above. (3) Political considerations: incumbents prefer tax cuts and spending increases regardless of economic conditions. (4) Ricardian Equivalence: rational consumers save tax cuts to pay future taxes (controversial)."/><D t="The National Debt" c="Accumulated deficits. Cyclically adjusted budget separates structural deficit (exists even at full employment) from cyclical deficit (due to recession). Real concerns: interest payments (crowd out other spending), foreign ownership (wealth transfer). Counter-arguments: most held domestically, government can tax/print money, necessary during recession."/></>,
    Examples:<><E t="2009 Obama Stimulus ($787B)" c="Unemployment hit 10% in Great Recession. ARRA: tax cuts (C↑), infrastructure (G↑), transfers (C↑). Debates: lags meant effect came late; some crowding out. Most economists credit it with preventing a deeper depression. Classic expansionary fiscal policy."/></>,
    "AP Tips":<AP c={["Built-in stabilizers = automatic fiscal policy (no legislation needed). Examples: progressive income tax, unemployment insurance.","Crowding out: FP → govt borrows → loanable funds D right → r rises → I falls. Draw loanable funds diagram for full credit on AP FRQ.","Multiplier = 1/MPS. Tax multiplier = MPC/MPS. Both smaller in practice due to crowding out, leakages.","Recessionary gap → expansionary FP (G↑ or T↓) → AD shifts right. Draw and label on AD-AS."]}/>
  }},
  {id:"mp",icon:"🏦",title:"Money, Banking & Monetary Policy",sub:"Ch 32–34 — Fed, money supply, tools, money market",tabs:["Simple","Diagrams","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="The Fed & Tools of Monetary Policy" c="The Federal Reserve (the Fed) controls monetary policy independently. Three main tools: (1) Open Market Operations (most important): buy bonds → inject money → rates fall. (2) Reserve Ratio: lowering it → banks loan more. (3) Discount Rate: lower it → banks borrow more from Fed. (4) Interest on Excess Reserves: raising it → banks hold more reserves → less lending."/><Dl t="Money Functions and Definitions" items={["Medium of exchange: use to buy things (eliminates inefficient barter)","Store of value: hold wealth in liquid form","Unit of account: common measure of value","M1 = currency + demand deposits (checking) — most liquid","M2 = M1 + savings deposits + money market funds — broader"]}/></>,
    Diagrams:<><MoneyMktDiag/><MoneyMultDiag/></>,
    "In-Depth":<><D t="Expansionary Monetary Policy (for Recession)" c="Fed buys bonds → excess reserves → banks lend more → MS increases → interest rates fall → Investment rises → AD shifts right → Y↑ P↑ (toward Yp if recessionary gap). Also: lower rates → dollar depreciates → Xn rises → additional AD boost."/><D t="Contractionary Monetary Policy (for Inflation)" c="Fed sells bonds → reserves drain → banks lend less → MS decreases → interest rates rise → Investment falls → AD shifts left → Y↓ P↓. Used to fight inflationary gap or high inflation. 2022-2023: Fed raised rates from 0% to 5.25% to combat 9% inflation."/><D t="Fed Balance Sheet" c="Assets: U.S. government securities (bonds) and loans to banks. Liabilities: Federal Reserve Notes (physical currency) and bank reserves (deposits at the Fed). When Fed buys bonds: asset (securities) increases, liability (bank reserves) increases → money supply expands. Quantitative Easing (QE): large-scale asset purchases beyond normal OMO."/><D t="Money Market Equilibrium" c="MS is vertical (fixed by Fed). MD slopes downward (higher nominal rate = higher opportunity cost of holding money). Equilibrium: nominal interest rate i* where MS = MD. Fed shifts MS: buy bonds → MS right → i falls → I rises → AD right. Sell bonds → MS left → i rises → I falls → AD left."/><APX t="Bond Prices & Interest Rates — Inverse Relationship (AP Essential)" c="When the Fed BUYS bonds: bond demand rises → bond prices rise → interest rates FALL (inverse relationship always). Why? A $1,000 bond paying $50/year: if price rises to $1,100, yield = 50/1100 = 4.5% (fell from 5%). Sell bonds: prices fall → rates rise. AP Macro FRQs frequently test this: 'What happens to bond prices when the Fed conducts expansionary OMO?' Answer: bond prices RISE, interest rates FALL."/><APX t="Monetary Policy Transmission — Full Chain (AP Extra)" c="OMO (buy bonds) → excess reserves increase → banks create new loans → MS increases → bond prices rise, interest rates fall → (1) Investment increases (business borrowing cheaper) → (2) Consumer durables increase (car loans, mortgages cheaper) → (3) Dollar depreciates (capital outflow at lower US rates) → net exports rise → (4) AD shifts right → Real GDP rises, price level rises (if recessionary gap)."/></>,
    "AP Tips":<AP c={["OMO = most-used Fed tool. Buy bonds → expand money supply → lower i → more I → AD right.","Bond prices and interest rates move INVERSELY. Buy bonds → prices rise → rates fall. ALWAYS.","Money multiplier = 1/RR. $1000 deposit, RR=10% → up to $10,000 total money supply. Actual less.","Draw money market: vertical MS, downward MD. Fed buys bonds → MS shifts right → i falls."]}/>
  }},
  {id:"pc2",icon:"📈",title:"Phillips Curve, Extended AS & Supply-Side",sub:"Ch 36–37 — SR/LR Phillips, stagflation, Laffer curve",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Short-run Phillips Curve: tradeoff between inflation and unemployment. Low unemployment → high inflation (economy overheating). High unemployment → low inflation. But in the LONG RUN: no tradeoff — the LRPC is vertical at the Natural Rate of Unemployment (NRU). You can't permanently buy lower unemployment with higher inflation."/></>,
    Diagram:<><PhillipsDiag/></>,
    "In-Depth":<><D t="Why the LR Phillips Curve is Vertical" c="In the long run, workers adjust their inflation expectations. If government tries to keep unemployment below NRU with repeated stimulus: expectations rise → wages rise → SRAS shifts left → stagflation → unemployment returns to NRU but now with higher inflation. Expectations-augmented Phillips curve — you can fool workers short-run but not long-run."/><D t="Supply-Side Shocks and Stagflation" c="1970s OPEC oil shocks: production costs rose → SRAS shifted left → GDP fell + inflation rose simultaneously = stagflation. SRPC shifts right (now have higher inflation at every unemployment rate — worse tradeoff). Standard policy can't fix both: expansionary worsens inflation; contractionary worsens unemployment."/><D t="Laffer Curve" c="At 0% tax rate: zero revenue. At 100%: zero revenue (no one works). Revenue peaks somewhere in between. Supply-siders argue: if on the right side of the peak, cutting taxes can increase revenue by stimulating work/investment. Reagan tax cuts 1981. Empirically controversial — most economists think US was NOT on the right side."/><APX t="Short-Run vs. Long-Run Macro Policy — AP Synthesis" c="Recessionary gap: SR → expansionary policy (AD right, Y rises toward Yp). LR self-correction → SRAS right (wages fall), same result but takes longer. Inflationary gap: SR → contractionary policy (AD left, Y falls toward Yp). LR → SRAS left (wages rise), same result but again slower. AP Macro FRQs often ask about BOTH SR and LR effects of a policy shock. Always describe: initial impact, short-run equilibrium, AND long-run equilibrium."/></>,
    "AP Tips":<AP c={["SRPC: expansionary policy → move up-left (lower U, higher π). Contractionary → down-right.","LRPC is vertical at NRU. Supply shock → SRPC shifts right (stagflation shown as rightward SRPC shift).","AP always has one Phillips Curve FRQ. Draw SRPC and LRPC. Label NRU on horizontal axis.","Connect AD-AS to Phillips Curve: AD right = move up-left on SRPC. SRAS left = SRPC shifts right."]}/>
  }},
];

const part8=[
  {id:"trade",icon:"🌐",title:"International Trade & Comparative Advantage",sub:"Ch 38 — Why nations trade, tariffs, WTO",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Countries trade because they're different. Comparative advantage: specialize in what you produce at the LOWEST OPPORTUNITY COST — even if another country is absolutely better at everything. Trade allows both countries to consume more than they could alone."/><Dl t="Comparative vs. Absolute Advantage" items={["Absolute advantage: produce MORE output per unit of input — raw efficiency","Comparative advantage: produce at LOWER OPPORTUNITY COST — this determines trade specialization","A country should export goods where it has CA (lower OC) and import goods where the other country has CA","Works even if one country is absolutely worse at EVERYTHING — CA always exists for both countries"]}/></>,
    "In-Depth":<><D t="Gains from Trade" c="Specialization + trade allows both countries to consume beyond their individual PPCs. World output rises. Terms of trade (ratio at which goods are exchanged) must fall between the two countries' domestic opportunity cost ratios for BOTH to gain."/><D t="Trade Barriers: Tariffs and Quotas" c="Tariff: tax on imports → domestic price rises → domestic production rises, imports fall, CS falls, PS rises, govt revenue rises, net welfare loss (DWL). Quota: quantity limit → same price/quantity effect as tariff but NO government revenue — rent goes to foreign exporters or domestic importers with licenses. Both are economically inferior to free trade."/><D t="Arguments for Protection" c="(1) Infant industry: protect new domestic industries until competitive. Sometimes valid but tends to become permanent. (2) Military self-sufficiency: strategic industries. Legitimate concern, easily abused. (3) Anti-dumping: prevent foreign firms selling below cost to destroy domestic competition. (4) Cheap foreign labor: usually fallacious — low wages reflect low productivity; CA still determines trade. (5) Diversification argument."/></>,
    Examples:<><E t="Comparative Advantage Calculation" c="Country A: makes 10 cars OR 20 wheat. Country B: makes 6 cars OR 18 wheat. A's OC of 1 car = 2 wheat. B's OC of 1 car = 3 wheat. A has CA in cars (lower OC: 2 < 3). B's OC of 1 wheat = 1/3 car. A's OC of 1 wheat = 1/2 car. B has CA in wheat. Both gain from A specializing in cars and B in wheat."/></>,
    "AP Tips":<AP c={["CA = lower OPPORTUNITY COST (not lower absolute cost). Always calculate OC ratios first.","Tariff creates DWL. AP expects you to draw: domestic S&D + world price line + tariff line + labeled surplus/DWL areas.","Terms of trade: must be between both countries' domestic OC ratios for both to benefit. Check this condition.","Quota vs. tariff: same P and Q effects, but quota gives no govt revenue. AP asks you to distinguish."]}/>
  }},
  {id:"er",icon:"💱",title:"Exchange Rates & Balance of Payments",sub:"Ch 39 — Forex market, current account, capital account",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B t="Plain English" c="Exchange rate = price of one currency in terms of another. Dollar appreciates (gets stronger): US exports more expensive for foreigners → they buy less. US imports cheaper → Americans buy more. Net exports fall → AD shifts left. Dollar depreciates: opposite — helps exporters, hurts importers."/><Dl t="Balance of Payments Accounts" items={["Current Account: trade in goods (merchandise balance), services, investment income, and transfers. Deficit = imports > exports.","Capital/Financial Account: flows of financial assets (stocks, bonds, FDI, real estate). Surplus = foreigners buy more US assets than Americans buy foreign assets.","They always balance: current account deficit = capital account surplus (accounting identity). The US trade deficit is funded by foreign capital inflows."]}/></>,
    Diagram:<><ForexDiag/></>,
    "In-Depth":<><D t="What Shifts the Dollar Exchange Rate" c="Dollar demand (D$) from: foreigners buying US exports, foreign investment in US assets, foreign tourism in US. Dollar supply (S$) from: Americans buying imports, US investment abroad, US tourism abroad. D$ shifts right → dollar appreciates (ER rises). S$ shifts right → dollar depreciates."/><D t="Interest Rates and Exchange Rates" c="US interest rates rise → US assets more attractive to foreigners → capital inflows → D$ rises → dollar appreciates → exports fall, imports rise → current account worsens. Key AP chain: Fed raises rates → dollar appreciates → Xn falls → AD partially offset."/><D t="Flexible vs. Fixed Exchange Rates" c="Flexible (floating): exchange rate determined by supply and demand. Self-correcting: trade deficit → dollar depreciates → exports ↑ → deficit shrinks. Most countries today (US, EU, Japan). Fixed: government sets and maintains exchange rate using reserves and trade policy. Less common now (China manages its rate)."/><APX t="Monetary Policy → Exchange Rate → Net Exports Chain (AP Extra)" c="This chain connects monetary policy to international trade and is heavily tested: Fed expands money supply → interest rates fall → foreign capital outflows (seeking higher returns elsewhere) → demand for dollars falls / supply of dollars rises → dollar DEPRECIATES → US exports become cheaper for foreigners → US imports become more expensive → Net Exports INCREASE → AD shifts further right (international multiplier adds to domestic multiplier). AP Macro FRQs test this full chain — write out each step explicitly."/></>,
    "AP Tips":<AP c={["Dollar appreciates: exports ↓ (expensive for foreigners), imports ↑ (cheap for Americans). Xn falls → AD left.","Fed raises interest rates → capital inflows → dollar appreciates → Xn falls → partially offsets expansionary effect.","Current account deficit ↔ capital account surplus (always, by accounting identity).","Draw forex diagram: D for dollars from foreigners, S from Americans. Interest rate rise → D shifts right → dollar appreciates (ER rises)."]}/>
  }},
];

/* ═══════════════ HARD QUESTIONS ═══════════════ */
const hardQs=[
  {q:"Explain why a pure competitor earns only normal profit in the long run but a monopolist can sustain economic profit. What does this imply about allocative efficiency in each?",tag:"Micro: Market Structures",a:<div className="hqa"><strong>Pure Competition LR:</strong> If economic profit exists (P &gt; ATC), new firms enter (no barriers). Supply increases → market P falls → profit erodes. Reverse for losses. LR: P = min ATC = MC = normal profit. Allocatively efficient: P = MC (price = social cost of last unit).<br/><br/><strong>Monopoly LR:</strong> Barriers to entry prevent rivals. Monopolist maintains P &gt; ATC (economic profit) indefinitely. Sets MR = MC for Qm, but P &gt; MC always (since MR &lt; P for downward-sloping demand). Consumers value last unit MORE than cost to produce → allocative inefficiency → DWL → some mutually beneficial transactions don't occur.<br/><br/><strong>Implication:</strong> Pure competition maximizes total surplus. Monopoly transfers welfare from consumers to firm and destroys some (DWL). Justifies antitrust policy and regulated monopoly.</div>},
  {q:"You have $12. Pizza costs $3, soda costs $1. MU of pizza: 1st=30, 2nd=24, 3rd=18, 4th=12. MU of soda: 1st=10, 2nd=8, 3rd=6, 4th=4. What is the utility-maximizing combination?",tag:"Micro: Utility Maximization",a:<div className="hqa"><strong>Step 1 — Calculate MU/P for each unit:</strong><br/>Pizza: 30/3=10, 24/3=8, 18/3=6, 12/3=4<br/>Soda: 10/1=10, 8/1=8, 6/1=6, 4/1=4<br/><br/><strong>Step 2 — Rank by MU/P and purchase in order:</strong><br/>1st pizza (10) = 1st soda (10): tied → buy both ($4 spent, $8 left)<br/>2nd pizza (8) = 2nd soda (8): tied → buy both ($6 spent, $6 left)<br/>3rd pizza (6) = 3rd soda (6): tied → buy both ($4 left, but 3rd pizza = $3 + 3rd soda = $1 = $4) → buy both ($0 left)<br/><br/><strong>Optimal bundle: 3 pizzas + 3 sodas.</strong> Total utility = (30+24+18) + (10+8+6) = 96 utils. Budget fully spent ($9 + $3 = $12). MU_pizza/P_pizza = MU_soda/P_soda = 6 at margin ✓</div>},
  {q:"A negative supply shock (OPEC oil embargo) hits the economy. Show AD-AS effects, identify the policy dilemma, and explain what each option costs policymakers.",tag:"Macro: AD-AS & Stagflation",a:<div className="hqa"><strong>AD-AS Effect:</strong> Oil = production input → costs rise for all firms → SRAS shifts LEFT. New equilibrium: P↑ (inflation) and Y↓ (recession) = stagflation. On Phillips Curve: SRPC shifts right (worse tradeoff — higher inflation at every unemployment level).<br/><br/><strong>Policy Dilemma:</strong><br/>• <strong>Expansionary (AD right):</strong> Fights recession (Y rises) but worsens inflation (P rises further). Trades unemployment for more inflation.<br/>• <strong>Contractionary (AD left):</strong> Fights inflation but deepens recession (Y falls further). Trades inflation for more unemployment.<br/>• <strong>Do nothing:</strong> Wait for self-correction. Long-run: wages eventually fall → SRAS shifts right → both P and Y return to original. Takes years; politically unacceptable.<br/><br/><strong>Best but slow:</strong> Supply-side policies to shift SRAS right (alternative energy, deregulation). Addresses root cause.</div>},
  {q:"The Fed buys $50 billion in Treasury bonds. Trace the COMPLETE effect chain through money market, loanable funds market, investment, AD-AS, and exchange rate.",tag:"Macro: Full Monetary Policy Chain",a:<div className="hqa"><strong>Step 1 — Money Market:</strong> Fed buys bonds → injects $50B into banking system → MS shifts right → nominal interest rate i falls.<br/><br/><strong>Step 2 — Bond Market:</strong> Bond demand rises → bond prices rise (inverse relationship: rates fell).<br/><br/><strong>Step 3 — Loanable Funds:</strong> More money available for lending → supply of loanable funds shifts right → real interest rate r falls → investment (I) increases.<br/><br/><strong>Step 4 — AD:</strong> I↑ and C↑ (cheaper consumer loans/mortgages) → AD shifts right. Multiplier amplifies effect.<br/><br/><strong>Step 5 — Exchange Rate:</strong> Lower US rates → capital outflows → demand for dollars falls → dollar depreciates → exports rise, imports fall → Xn↑ → additional AD shift right.<br/><br/><strong>Step 6 — AD-AS outcome:</strong> If recessionary gap → Y rises toward Yp, P rises moderately. If at full employment → mainly inflation. This is expansionary monetary policy.</div>},
  {q:"Calculate: MPC = 0.8. Government increases spending by $200 billion. (a) What is the spending multiplier? (b) What is the total change in GDP? (c) If government instead cut taxes by $200 billion, what would be the change in GDP? (d) Why is (b) different from (c)?",tag:"Macro: Multipliers",a:<div className="hqa"><strong>(a) Spending Multiplier</strong> = 1/MPS = 1/(1-0.8) = 1/0.2 = <strong>5</strong><br/><br/><strong>(b) ΔY from spending</strong> = $200B × 5 = <strong>$1,000 billion = $1 trillion</strong><br/><br/><strong>(c) Tax Multiplier</strong> = MPC/MPS = 0.8/0.2 = 4<br/>ΔY from tax cut = $200B × 4 = <strong>$800 billion</strong><br/><br/><strong>(d) Why different:</strong> When G increases by $1, the FULL $1 immediately becomes income for someone (first round = $1). When taxes are CUT by $1, the first round = only $0.80 (MPC fraction) because households save $0.20. The spending multiplier starts from a larger base — every subsequent round is identical, but the first round differs. Tax multiplier is always MPC/MPS, always smaller than 1/MPS.</div>},
  {q:"Country A can produce 10 cars OR 20 tons of wheat. Country B can produce 6 cars OR 18 tons of wheat. (a) Which has CA in cars? (b) Which in wheat? (c) Country B is absolutely worse at both — explain why they still gain from trade.",tag:"International: Comparative Advantage",a:<div className="hqa"><strong>Opportunity Costs:</strong><br/>A: 1 car = 2 wheat; 1 wheat = 0.5 cars<br/>B: 1 car = 3 wheat; 1 wheat = 0.33 cars<br/><br/><strong>(a) Cars:</strong> A's OC (2 wheat) &lt; B's OC (3 wheat) → <strong>Country A has CA in cars</strong><br/><strong>(b) Wheat:</strong> B's OC (0.33 cars) &lt; A's OC (0.5 cars) → <strong>Country B has CA in wheat</strong><br/><br/><strong>(c) Why B still gains:</strong> Absolute advantage is irrelevant to trade. What matters is RELATIVE efficiency. B gives up less to produce wheat (0.33 cars per ton) than A does (0.5 cars per ton). By specializing in wheat and trading for cars, B gets more cars per ton of wheat than it could produce itself. World output rises: both consume beyond their individual PPCs. Gains from trade come from specialization according to comparative advantage, not absolute advantage.</div>},
  {q:"Draw and explain a correctly labeled graph for a monopsonistic labor market. How do wages and employment compare to a competitive labor market?",tag:"Micro: Factor Markets",a:<div className="hqa"><strong>Graph labels needed:</strong> X-axis = quantity of labor (L). Y-axis = wage / dollar cost. Three curves: (1) SL upward sloping (= ACL, average cost of labor). (2) MRC curve upward sloping and ABOVE SL (steeper — to hire one more worker, must raise wage for all current workers). (3) DL = MRP curve, downward sloping.<br/><br/><strong>Finding equilibrium:</strong> Monopsonist hires until MRP = MRC (profit-maximizing input rule). Drop from intersection to X-axis → Lm (employment). Drop from Lm to SL curve (NOT MRC) → Wm (wage actually paid).<br/><br/><strong>vs. Competitive market:</strong><br/>Competitive: hire where DL = SL → Lc workers at Wc wage. Wc &gt; Wm and Lc &gt; Lm.<br/>Monopsony: hires LESS and pays LESS. Workers are exploited (paid below MRP). DWL exists (workers and employer lose mutually beneficial employment).<br/><br/><strong>Policy implication:</strong> Minimum wage at or below Wc can INCREASE both wages AND employment in monopsony markets — corrects the market power distortion.</div>},
  {q:"Explain the long-run self-correction mechanism for a recessionary gap. Then draw the AD-AS diagram showing (a) the initial recessionary gap, (b) the long-run self-correction, and (c) the resulting changes in the price level and real GDP.",tag:"Macro: Long-Run Self-Correction",a:<div className="hqa"><strong>Starting position (a):</strong> AD intersects SRAS to the LEFT of LRAS. Real GDP (Y*) &lt; Potential GDP (Yp) → recessionary gap. Unemployment above NRU. Price level at PL₁.<br/><br/><strong>Self-correction mechanism (b):</strong> High unemployment puts downward pressure on nominal wages. As wages fall: firms' costs decrease → SRAS shifts RIGHT. Process continues until SRAS intersects AD exactly at the LRAS level.<br/><br/><strong>New long-run equilibrium (c):</strong><br/>→ Real GDP rises back to Yp (potential — at LRAS)<br/>→ Price level FALLS (from PL₁ to PL₂) — lower wages reduced costs<br/>→ Unemployment returns to NRU<br/><br/><strong>Keynesian objection:</strong> "In the long run, we are all dead" (Keynes). Wages are sticky downward — workers resist pay cuts. Self-correction may take 3-10 years. Argument for active fiscal/monetary policy to close gap faster.</div>},
  {q:"Explain the crowding-out effect fully. Under what conditions is it most severe? When might it be minimal or non-existent?",tag:"Macro: Fiscal Policy Limits",a:<div className="hqa"><strong>Crowding Out Mechanism:</strong> Government deficit spending requires borrowing → increases demand for loanable funds → D shifts right in loanable funds market → real interest rate rises → private investment falls (I↓). Some or all fiscal stimulus is offset by reduced private spending. Net effect on AD is less than multiplier predicts.<br/><br/><strong>Most Severe When:</strong><br/>• Economy near full employment (financial markets already tight; even small govt borrowing raises rates significantly)<br/>• Private investment is highly interest-rate sensitive (elastic investment demand)<br/>• Fixed money supply (Fed doesn't accommodate expansion)<br/>• Open economy (capital inflows reduce crowding out but cause dollar appreciation → trade balance worsens — "crowding out of net exports")<br/><br/><strong>Minimal / Non-Existent When:</strong><br/>• Deep recession / liquidity trap (interest rates near zero; banks hold excess reserves; more govt borrowing doesn't raise rates noticeably)<br/>• Fed simultaneously expands money supply (accommodates fiscal expansion — keeps rates from rising)<br/>• Excess bank reserves exist (banks don't compete for funds)<br/><br/><strong>2009-2020 environment:</strong> Near-zero rates → very minimal crowding out → fiscal multiplier close to full theoretical value.</div>},
];

/* ═══════════════ NAV & SECTIONS ═══════════════ */
const NAVS=[{id:"home",label:"🏠 Home"},{id:"p1",label:"Part 1: Foundations"},{id:"p2",label:"Part 2: Micro Markets"},{id:"p3",label:"Part 3: Consumer"},{id:"p4",label:"Part 4: Firms"},{id:"p5",label:"Part 5: Resources"},{id:"p6",label:"Part 6: Macro GDP"},{id:"p7",label:"Part 7: Macro Policy"},{id:"p8",label:"Part 8: International"},{id:"hq",label:"📝 Hard Qs"}];
const SECS={p1:{badge:"Part One",title:"Intro to Economics & the Economy",sub:"Chapters 1–2",data:part1,col:"#b8943a"},p2:{badge:"Part Two",title:"Price, Quantity & Efficiency",sub:"Chapters 3–5",data:part2,col:"#5fcc8a"},p3:{badge:"Part Three",title:"Consumer Behavior",sub:"Chapters 6–8",data:part3,col:"#88aaff"},p4:{badge:"Part Four",title:"Microeconomics of Product Markets",sub:"Chapters 9–13",data:part4,col:"#c9a84c"},p5:{badge:"Part Five",title:"Resource Markets & Government",sub:"Chapters 14–18",data:part5,col:"#e07070"},p6:{badge:"Part Seven",title:"GDP, Growth & Business Cycles",sub:"Chapters 24–27",data:part6,col:"#4a7aab"},p7:{badge:"Part Eight–Nine",title:"Macro Models, Fiscal & Monetary Policy",sub:"Chapters 28–34, 36",data:part7,col:"#a880ff"},p8:{badge:"Part Eleven",title:"International Economics",sub:"Chapters 38–39",data:part8,col:"#5fcc8a"}};

function SectionView({sid}){
  const sec=SECS[sid];
  const [openT,setOpenT]=useState({});
  const [tabs,setTabs]=useState({});
  const toggle=id=>setOpenT(p=>({...p,[id]:!p[id]}));
  const getTab=t=>tabs[t.id]||t.tabs[0];
  const setTab=(id,tab)=>setTabs(p=>({...p,[id]:tab}));
  return(
    <div className="pg">
      <div className="sch"><div className="part-badge">{sec.badge}</div><h2 style={{color:sec.col}}>{sec.title}</h2><p>{sec.sub}</p></div>
      <div className="ch">
        <div className="sb">
          <h4>Topics</h4>
          {sec.data.map(t=>(
            <button key={t.id} className={`sbb ${openT[t.id]?"on":""}`} onClick={()=>{toggle(t.id);}}>
              {t.icon} {t.title.split(":")[0].split(" ").slice(0,4).join(" ")}
            </button>
          ))}
        </div>
        <div>
          {sec.data.map(t=>(
            <div className={`tc ${openT[t.id]?"open":""}`} key={t.id}>
              <div className="th" onClick={()=>toggle(t.id)}>
                <div className="ti-grp"><span className="t-icon">{t.icon}</span><div><div className="t-title">{t.title}</div><div className="t-sub">{t.sub}</div></div></div>
                <span className={`t-arr ${openT[t.id]?"open":""}`}>▼</span>
              </div>
              {openT[t.id]&&(
                <div className="tb">
                  <div className="stabs">{t.tabs.map(tab=><button key={tab} className={`stab ${getTab(t)===tab?"on":""}`} onClick={()=>setTab(t.id,tab)}>{tab}</button>)}</div>
                  <div className="cb">{t.cnt[getTab(t)]}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HQPage(){
  const [open,setOpen]=useState({});
  return(
    <div className="pg">
      <div className="hqi"><h2>⚡ AP Hard Questions</h2><p>10 challenging FRQ-style questions with complete model answers. Cover the answer and try first.</p></div>
      {hardQs.map((q,i)=>(
        <div className="hqc" key={i}>
          <div className="hqh" onClick={()=>setOpen(p=>({...p,[i]:!p[i]}))}>
            <div style={{display:"flex",flexDirection:"column",gap:".35rem",flex:1}}>
              <span className="hqn">Q{i+1} · {q.tag}</span>
              <span className="hqq">{q.q}</span>
            </div>
            <span style={{color:"#b8943a",fontSize:"1rem",flexShrink:0}}>{open[i]?"▲":"▼"}</span>
          </div>
          {open[i]&&<div className="hqb"><div className="hqtag">MODEL ANSWER</div>{q.a}</div>}
        </div>
      ))}
    </div>
  );
}

const HOME_CARDS=[
  {id:"p1",n:"1",t:"Foundations",d:"Scarcity, PPC, economic systems, circular flow, opportunity cost, factors of production.",chips:["PPC","Scarcity","Circular Flow","Invisible Hand","Opportunity Cost"]},
  {id:"p2",n:"2",t:"Micro: Markets",d:"S&D, equilibrium, price controls, market failures, externalities, Lorenz curve, antitrust.",chips:["S&D","DWL","Externalities","Lorenz Curve","Antitrust"]},
  {id:"p3",n:"3",t:"Consumer Behavior",d:"Elasticity, utility maximization, indifference curves, behavioral economics.",chips:["PED","MU Rule","Indiff. Curves","Loss Aversion","Nudging"]},
  {id:"p4",n:"4",t:"Firm Theory",d:"Cost curves, pure competition, monopoly, 4-market comparison table, game theory.",chips:["MC=MR","4 Structures","Monopoly","Oligopoly","LR Industry S"]},
  {id:"p5",n:"5",t:"Resource Markets",d:"Derived demand, MRP, competitive & monopsony labor, loanable funds market.",chips:["MRP=MRC","Monopsony","Loanable Funds","Min Wage","Rent"]},
  {id:"p6",n:"6",t:"Macro: GDP & Cycles",d:"GDP formula, real vs. nominal, business cycles, unemployment types, inflation, Fisher equation.",chips:["C+I+G+Xn","Real GDP","NRU","CPI","r = i - π"]},
  {id:"p7",n:"7",t:"Macro: Policy",d:"AD-AS, Keynesian Cross, fiscal & monetary policy, money & forex markets, Phillips curve.",chips:["AD-AS","Money Market","Loanable Funds","Keynesian Cross","Phillips Curve"]},
  {id:"p8",n:"8",t:"International",d:"Comparative advantage, tariffs, forex diagrams, balance of payments, exchange rate chains.",chips:["Comparative Adv.","Tariffs","Forex Market","BOP","Dollar Effects"]},
  {id:"hq",n:"?",t:"Hard Questions",d:"10 complete FRQ-style answers covering all sections. Try before revealing.",chips:["Multipliers","AD-AS","Labor Markets","Game Theory","Monetary Chain"]},
];

const TERMS=[["GDP = C+I+G+Xn","Expenditure approach"],["PED = %ΔQd / %ΔP","Price elasticity"],["MR = MC","Profit max rule"],["P = min ATC","Productive efficiency"],["P = MC","Allocative efficiency"],["MU_x/P_x = MU_y/P_y","Utility max rule"],["Money Multiplier = 1/RR","Fractional reserve"],["Spending Multiplier = 1/MPS","Fiscal multiplier"],["Tax Multiplier = MPC/MPS","Smaller than spending"],["r = i - π","Fisher equation"],["Comparative Adv.","Lower opportunity cost"],["NRU = F + S","No cyclical unemp."],["LRPC vertical at NRU","No LR tradeoff"],["Real GDP","Inflation-adjusted output"],["DWL","Lost surplus, distortion"],["CS = WTP - Price paid","Consumer surplus"],["Economic Profit = 0","Normal profit, LR PC"],["MRP = MP × P","Derived demand"],["Crowding Out","Govt borrows → r↑ → I↓"],["Balanced Budget Mult = 1","G & T rise equally"],["Bond price ↑ ↔ rate ↓","Inverse relationship"],["Dollar appreciates","Xn falls, AD shifts left"],["★ Indiff. Curve optimum","MRS = Px/Py at tangency"],["★ Balanced budget mult","ΔY = ΔG when ΔG = ΔT"],];

export default function App(){
  const [page,setPage]=useState("home");
  return(
    <div className="app">
      <style>{S}</style>
      <nav className="topnav">
        <div className="nav-logo">📚 AP ECON</div>
        {NAVS.map(n=><button key={n.id} className={`nb ${page===n.id?"on":""}`} onClick={()=>setPage(n.id)}>{n.label}</button>)}
      </nav>
      {page==="home"&&(
        <div className="pg">
          <div className="hero"><h1>AP Economics<br/>Complete Study Guide</h1><p>All chapters · AP Micro + Macro · 100% comprehensive</p>
            <div style={{display:"flex",gap:".5rem",justifyContent:"center",flexWrap:"wrap",marginTop:".6rem"}}>
              <span style={{background:"#001e1c",border:"1px solid #00c8b4",color:"#00c8b4",fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",padding:".2rem .7rem",borderRadius:"999px"}}>★ Teal boxes = AP content beyond the textbook</span>
              <span style={{background:"#0a1520",border:"1px solid #b8943a",color:"#b8943a",fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",padding:".2rem .7rem",borderRadius:"999px"}}>Gold = from textbook chapters</span>
            </div>
          </div>
          <div className="hcards">{HOME_CARDS.map(c=><div className="hcard" key={c.id} onClick={()=>setPage(c.id)}><div className="hcard-n">{c.n}</div><h3>{c.t}</h3><p>{c.d}</p><div className="chips">{c.chips.map(x=><span className="chip" key={x}>{x}</span>)}</div></div>)}</div>
          <div style={{marginTop:"1.8rem"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",color:"#4a7aab",fontSize:".68rem",textTransform:"uppercase",letterSpacing:".1em",marginBottom:".7rem"}}>⚡ Master Formula & Term Reference</div>
            <div className="ktg">{TERMS.map(([k,v])=><div className="kt" key={k}><strong style={k.startsWith("★")?{color:"#00c8b4"}:{}}>{k}</strong><span>{v}</span></div>)}</div>
          </div>
        </div>
      )}
      {Object.keys(SECS).map(sid=>page===sid&&<SectionView key={sid} sid={sid}/>)}
      {page==="hq"&&<HQPage/>}
    </div>
  );
}