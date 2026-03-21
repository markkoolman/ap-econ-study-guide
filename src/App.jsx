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
/* beginner box */
.bg0{background:#120822;border-left:4px solid #a880ff;border-radius:0 7px 7px 0;padding:.85rem .95rem;margin-bottom:.85rem}
.bg0 h5{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#a880ff;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.32rem}
.bg0 p{color:#d0c0f0;line-height:1.72;font-size:.97rem}
.bg0 ul{padding-left:1.2rem;margin:.4rem 0 0}
.bg0 li{color:#d0c0f0;line-height:1.7;font-size:.95rem;margin-bottom:.25rem}
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
.b2box{background:#051a0e;border:2px solid #00c851;border-radius:9px;padding:.95rem 1.1rem;margin-bottom:.85rem}
.b2box h5{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#00c851;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.42rem}
.b2box p{color:#a0f0c0;line-height:1.72;font-size:.97rem}
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

// Domestic Tariff diagram (Topic 2.9)
const DomTariffDiag=()=>(
  <div className="dw"><h5>🌍 Tariff — Domestic Market View (AP Micro Topic 2.9)</h5>
  <svg viewBox="0 0 320 225" style={{maxWidth:315,width:"100%"}}>
    <line x1="33" y1="202" x2="282" y2="202" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="202" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="157" y="218" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <text x="13" y="107" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,13,107)">Price ($)</text>
    {/* Domestic Supply */}
    <line x1="46" y1="182" x2="218" y2="38" stroke="#c9a84c" strokeWidth="2"/>
    <text x="220" y="36" fill="#c9a84c" fontSize="9">S_dom</text>
    {/* Domestic Demand */}
    <line x1="46" y1="32" x2="218" y2="182" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="220" y="183" fill="#5fcc8a" fontSize="9">D_dom</text>
    {/* World price line (free trade) */}
    <line x1="33" y1="138" x2="275" y2="138" stroke="#88aaff" strokeWidth="1.8" strokeDasharray="5,3"/>
    <text x="278" y="141" fill="#88aaff" fontSize="8">Pw (world)</text>
    {/* Tariff price line */}
    <line x1="33" y1="118" x2="275" y2="118" stroke="#b8943a" strokeWidth="2"/>
    <text x="278" y="121" fill="#b8943a" fontSize="8">Pw+tariff</text>
    {/* Quantity markers at world price */}
    <line x1="82" y1="202" x2="82" y2="138" stroke="#88aaff" strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="198" y1="202" x2="198" y2="138" stroke="#88aaff" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="82" y="210" fill="#88aaff" fontSize="7.5" textAnchor="middle">Qs_w</text>
    <text x="198" y="210" fill="#88aaff" fontSize="7.5" textAnchor="middle">Qd_w</text>
    {/* Quantity markers at tariff price */}
    <line x1="96" y1="202" x2="96" y2="118" stroke="#b8943a" strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="178" y1="202" x2="178" y2="118" stroke="#b8943a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="96" y="210" fill="#b8943a" fontSize="7.5" textAnchor="middle">Qs_t</text>
    <text x="178" y="210" fill="#b8943a" fontSize="7.5" textAnchor="middle">Qd_t</text>
    {/* Areas: CS loss (a+b+c+d), PS gain (a), govt revenue (c), DWL (b+d) */}
    <polygon points="33,118 33,138 82,138 96,118" fill="#c9a84c" opacity=".3"/>
    <text x="62" y="132" fill="#c9a84c" fontSize="8" textAnchor="middle">a</text>
    <polygon points="82,138 96,118 96,138" fill="#e07070" opacity=".35"/>
    <text x="92" y="134" fill="#e07070" fontSize="7.5">b</text>
    <rect x="96" y="118" width="82" height="20" fill="#5fcc8a" opacity=".2"/>
    <text x="137" y="131" fill="#5fcc8a" fontSize="8" textAnchor="middle">c (rev)</text>
    <polygon points="178,118 178,138 198,138" fill="#e07070" opacity=".35"/>
    <text x="186" y="134" fill="#e07070" fontSize="7.5">d</text>
  </svg><p>Free trade: domestic supply Qs_w, domestic demand Qd_w, imports = Qd_w − Qs_w. Tariff raises price → imports shrink, domestic production rises. CS loss = a+b+c+d. PS gain = a. Govt revenue = c. DWL = b+d.</p></div>
);

// T-Account / Bank Balance Sheet
const TAccountDiag=()=>(
  <div className="dw"><h5>🏦 T-Account: Bank Balance Sheet & Money Creation</h5>
  <svg viewBox="0 0 500 210" style={{maxWidth:490,width:"100%"}}>
    {/* Bank receives $1000 deposit */}
    <rect x="12" y="12" width="224" height="92" rx="6" fill="#101e2e" stroke="#b8943a" strokeWidth="1.3"/>
    <text x="124" y="28" fill="#b8943a" fontSize="8.5" textAnchor="middle" fontWeight="bold">BANK A — After $1,000 Deposit (RR=20%)</text>
    <line x1="124" y1="32" x2="124" y2="100" stroke="#253650" strokeWidth="1"/>
    <line x1="12" y1="38" x2="236" y2="38" stroke="#253650" strokeWidth="1"/>
    <text x="68" y="48" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">ASSETS</text>
    <text x="180" y="48" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">LIABILITIES</text>
    <text x="20" y="62" fill="#a8bece" fontSize="7.5">Reserves: +$1,000</text>
    <text x="130" y="62" fill="#a8bece" fontSize="7.5">Demand deposits: +$1,000</text>
    <text x="20" y="74" fill="#7a8e9f" fontSize="7">(required: $200)</text>
    <text x="20" y="85" fill="#7a8e9f" fontSize="7">(excess: $800)</text>
    <text x="20" y="96" fill="#c9a84c" fontSize="7.5">→ Can loan out $800</text>
    {/* After lending */}
    <rect x="12" y="112" width="224" height="88" rx="6" fill="#101e2e" stroke="#5fcc8a" strokeWidth="1.3"/>
    <text x="124" y="128" fill="#5fcc8a" fontSize="8.5" textAnchor="middle" fontWeight="bold">BANK A — After Lending $800</text>
    <line x1="124" y1="132" x2="124" y2="197" stroke="#253650" strokeWidth="1"/>
    <line x1="12" y1="138" x2="236" y2="138" stroke="#253650" strokeWidth="1"/>
    <text x="68" y="148" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">ASSETS</text>
    <text x="180" y="148" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">LIABILITIES</text>
    <text x="20" y="162" fill="#a8bece" fontSize="7.5">Reserves: +$200</text>
    <text x="130" y="162" fill="#a8bece" fontSize="7.5">Demand deposits: +$1,000</text>
    <text x="20" y="174" fill="#a8bece" fontSize="7.5">Loans: +$800</text>
    <text x="20" y="186" fill="#c9a84c" fontSize="7.5">Total assets: $1,000</text>
    <text x="130" y="186" fill="#c9a84c" fontSize="7.5">Total liabilities: $1,000</text>
    {/* Right side: Fed OMO T-account */}
    <rect x="248" y="12" width="244" height="186" rx="6" fill="#101e2e" stroke="#a880ff" strokeWidth="1.3"/>
    <text x="370" y="28" fill="#a880ff" fontSize="8.5" textAnchor="middle" fontWeight="bold">FED BUYS $100 BOND FROM BANK (OMO)</text>
    <line x1="370" y1="32" x2="370" y2="195" stroke="#253650" strokeWidth="1"/>
    <line x1="248" y1="38" x2="492" y2="38" stroke="#253650" strokeWidth="1"/>
    <text x="309" y="48" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">FED ASSETS</text>
    <text x="431" y="48" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">FED LIABILITIES</text>
    <text x="256" y="62" fill="#a8bece" fontSize="7.5">Securities: +$100</text>
    <text x="378" y="62" fill="#a8bece" fontSize="7.5">Bank reserves: +$100</text>
    <line x1="248" y1="90" x2="492" y2="90" stroke="#253650" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="309" y="102" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">BANK ASSETS</text>
    <text x="431" y="102" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">BANK LIABILITIES</text>
    <text x="256" y="116" fill="#a8bece" fontSize="7.5">Securities: −$100</text>
    <text x="378" y="116" fill="#a8bece" fontSize="7.5">(no change)</text>
    <text x="256" y="128" fill="#a8bece" fontSize="7.5">Reserves: +$100</text>
    <text x="256" y="142" fill="#c9a84c" fontSize="7.5">Excess reserves +$100</text>
    <text x="256" y="154" fill="#c9a84c" fontSize="7.5">→ can lend $100 more</text>
    <text x="256" y="168" fill="#b8943a" fontSize="7">With RR=10%: $100 × (1/0.1)</text>
    <text x="256" y="179" fill="#b8943a" fontSize="7">= up to $1,000 new money</text>
    <text x="256" y="190" fill="#b8943a" fontSize="7">created through banking system</text>
  </svg><p>T-accounts always balance: Assets = Liabilities. Required reserves = RR × deposits. Excess reserves can be loaned out. Fed OMO: buy bond from bank → bank's securities fall, reserves rise → new lending capacity.</p></div>
);

/* ═══════════ NEW DIAGRAMS ═══════════ */

// Reserve Market (AP Macro ample reserves framework)
const ReserveMktDiag=()=>(
  <div className="dw"><h5>🏦 The Reserve Market (AP Macro — Ample Reserves Framework)</h5>
  <svg viewBox="0 0 500 195" style={{maxWidth:490,width:"100%"}}>
    {/* Left: Reserve Market diagram */}
    <line x1="28" y1="175" x2="220" y2="175" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="28" y1="175" x2="28" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="220,172 227,175 220,178" fill="#4a7aab"/><polygon points="25,12 28,5 31,12" fill="#4a7aab"/>
    <text x="124" y="190" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity of Reserves</text>
    <text x="10" y="93" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,10,93)">Policy Rate (%)</text>
    {/* SR - horizontal at IOR level (ample reserves: supply flat at IOR) */}
    <line x1="28" y1="88" x2="215" y2="88" stroke="#c9a84c" strokeWidth="2.5"/>
    <text x="217" y="85" fill="#c9a84c" fontSize="9">SR</text>
    <text x="217" y="95" fill="#c9a84c" fontSize="7.5">(IOR)</text>
    {/* DR - downward sloping */}
    <line x1="38" y1="32" x2="210" y2="168" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="212" y="166" fill="#5fcc8a" fontSize="9">DR</text>
    {/* Policy rate PR1 */}
    <line x1="28" y1="88" x2="124" y2="88" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="23" y="91" fill="#b8943a" fontSize="8" textAnchor="end">PR*</text>
    {/* Quantity */}
    <line x1="124" y1="175" x2="124" y2="88" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="124" y="183" fill="#b8943a" fontSize="7.5" textAnchor="middle">Q*</text>
    <circle cx="124" cy="88" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <text x="28" y="9" fill="#a880ff" fontSize="8.5" fontWeight="bold">RESERVE MARKET</text>
    {/* Right: Key concepts */}
    <rect x="242" y="10" width="252" height="172" rx="7" fill="#101e2e" stroke="#a880ff" strokeWidth="1.2"/>
    <text x="368" y="26" fill="#a880ff" fontSize="8.5" textAnchor="middle" fontWeight="bold">AMPLE RESERVES FRAMEWORK (US Today)</text>
    <text x="250" y="42" fill="#c0d0dc" fontSize="7.5">US banking system has AMPLE reserves since 2008.</text>
    <text x="250" y="54" fill="#c0d0dc" fontSize="7.5">Key Fed tool = Interest on Reserves (IOR), NOT RR.</text>
    <line x1="250" y1="62" x2="486" y2="62" stroke="#253650" strokeWidth="1"/>
    <text x="250" y="75" fill="#b8943a" fontSize="7.5" fontWeight="bold">SR (Supply of Reserves):</text>
    <text x="250" y="86" fill="#a8bece" fontSize="7.5">• Horizontal at IOR rate (Fed sets this directly)</text>
    <text x="250" y="97" fill="#a8bece" fontSize="7.5">• Fed raises IOR → SR shifts UP → policy rate rises</text>
    <text x="250" y="108" fill="#a8bece" fontSize="7.5">• Fed lowers IOR → SR shifts DOWN → policy rate falls</text>
    <line x1="250" y1="116" x2="486" y2="116" stroke="#253650" strokeWidth="1"/>
    <text x="250" y="129" fill="#5fcc8a" fontSize="7.5" fontWeight="bold">DR (Demand for Reserves):</text>
    <text x="250" y="140" fill="#a8bece" fontSize="7.5">• Downward sloping: lower rate → banks hold fewer reserves</text>
    <text x="250" y="151" fill="#a8bece" fontSize="7.5">• Shifts right if: reserve requirements rise, more transactions</text>
    <line x1="250" y1="159" x2="486" y2="159" stroke="#253650" strokeWidth="1"/>
    <text x="250" y="172" fill="#00c8b4" fontSize="7.5">★ Different from money market (which shows i vs. money qty)</text>
  </svg><p>In the ample reserves system (US since 2008), the Fed controls the policy rate primarily by setting the Interest on Reserves (IOR), making SR horizontal. Raising IOR shifts SR up → policy rate rises. Required diagram for AP Macro FRQs.</p></div>
);

// Natural Monopoly diagram
const NatMonopDiag=()=>(
  <div className="dw"><h5>🏭 Natural Monopoly — Regulation Options</h5>
  <svg viewBox="0 0 320 220" style={{maxWidth:315,width:"100%"}}>
    <line x1="28" y1="200" x2="290" y2="200" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="28" y1="200" x2="28" y2="10" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="159" y="215" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <text x="10" y="105" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,10,105)">Price / Cost ($)</text>
    {/* ATC - continuously declining (natural monopoly) */}
    <path d="M 38 22 Q 70 55, 110 88 T 200 130 S 258 148, 280 155" stroke="#4a7aab" strokeWidth="2" fill="none"/>
    <text x="282" y="153" fill="#4a7aab" fontSize="9">ATC</text>
    {/* MC - below ATC, also declining but flatter */}
    <path d="M 38 55 Q 75 78, 120 105 T 215 145 S 262 158, 280 162" stroke="#e07070" strokeWidth="1.8" fill="none"/>
    <text x="282" y="160" fill="#e07070" fontSize="9">MC</text>
    {/* Demand */}
    <line x1="38" y1="24" x2="272" y2="185" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="274" y="183" fill="#5fcc8a" fontSize="9">D</text>
    {/* MR */}
    <line x1="38" y1="24" x2="155" y2="185" stroke="#88aaff" strokeWidth="2"/>
    <text x="158" y="183" fill="#88aaff" fontSize="9">MR</text>
    {/* Unregulated: MR=MC gives Qm */}
    <line x1="112" y1="200" x2="112" y2="100" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="60" x2="112" y2="60" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="112" y="208" fill="#b8943a" fontSize="7.5" textAnchor="middle">Qm</text>
    <text x="23" y="63" fill="#b8943a" fontSize="7" textAnchor="end">Pm</text>
    <circle cx="112" cy="60" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    {/* Socially optimal: P=MC gives Qs */}
    <line x1="175" y1="200" x2="175" y2="142" stroke="#e07070" strokeWidth="1.2" strokeDasharray="2,2"/>
    <line x1="28" y1="142" x2="175" y2="142" stroke="#e07070" strokeWidth="1.2" strokeDasharray="2,2"/>
    <text x="175" y="208" fill="#e07070" fontSize="7.5" textAnchor="middle">Qs</text>
    <text x="23" y="145" fill="#e07070" fontSize="7" textAnchor="end">Ps</text>
    <text x="140" y="138" fill="#e07070" fontSize="7">P=MC</text>
    <text x="135" y="147" fill="#e07070" fontSize="6.5">(loss: ATC>P)</text>
    {/* Fair return: P=ATC gives Qf */}
    <line x1="148" y1="200" x2="148" y2="122" stroke="#5fcc8a" strokeWidth="1.2" strokeDasharray="2,2"/>
    <line x1="28" y1="122" x2="148" y2="122" stroke="#5fcc8a" strokeWidth="1.2" strokeDasharray="2,2"/>
    <text x="148" y="208" fill="#5fcc8a" fontSize="7.5" textAnchor="middle">Qf</text>
    <text x="23" y="125" fill="#5fcc8a" fontSize="7" textAnchor="end">Pf</text>
    <text x="155" y="119" fill="#5fcc8a" fontSize="7">P=ATC</text>
    <text x="152" y="128" fill="#5fcc8a" fontSize="6.5">(normal π)</text>
  </svg><p>Natural monopoly: ATC falls continuously (huge economies of scale). MC always below ATC. Unregulated: Pm, Qm (profit, DWL). Socially optimal: P=MC (efficient but causes losses — needs subsidy). Fair return: P=ATC (normal profit, less DWL than unregulated).</p></div>
);

// TU and MU utility curves (AP Micro required to draw)
const UtilityDiag=()=>(
  <div className="dw"><h5>📈 Total Utility (TU) & Marginal Utility (MU) Curves</h5>
  <svg viewBox="0 0 480 195" style={{maxWidth:470,width:"100%"}}>
    {/* Left: TU curve */}
    <line x1="25" y1="175" x2="205" y2="175" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="25" y1="175" x2="25" y2="10" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="115" y="190" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity Consumed</text>
    <text x="11" y="92" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,11,92)">Total Utility (TU)</text>
    {/* TU curve - rises then flattens, may turn down */}
    <path d="M 28 165 Q 55 100, 90 55 T 145 28 S 175 25, 195 30" stroke="#b8943a" strokeWidth="2.2" fill="none"/>
    <text x="197" y="28" fill="#b8943a" fontSize="9">TU</text>
    <text x="28" y="8" fill="#b8943a" fontSize="8.5" fontWeight="bold">TOTAL UTILITY</text>
    {/* Max TU point */}
    <circle cx="155" cy="26" r="4" fill="#fff" stroke="#5fcc8a" strokeWidth="1.5"/>
    <line x1="155" y1="175" x2="155" y2="26" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="158" y="14" fill="#5fcc8a" fontSize="7.5">TU max</text>
    <text x="158" y="22" fill="#5fcc8a" fontSize="7">(MU=0 here)</text>
    {/* Right: MU curve */}
    <line x1="248" y1="175" x2="455" y2="175" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="248" y1="175" x2="248" y2="10" stroke="#4a7aab" strokeWidth="1.4"/>
    {/* Zero line */}
    <line x1="248" y1="130" x2="455" y2="130" stroke="#253650" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="243" y="133" fill="#5a6e7f" fontSize="7.5" textAnchor="end">0</text>
    <text x="348" y="190" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity Consumed</text>
    <text x="234" y="92" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,234,92)">Marginal Utility (MU)</text>
    {/* MU curve - starts high, declines, crosses zero, goes negative */}
    <path d="M 252 25 Q 278 50, 310 80 T 370 122 S 410 140, 445 158" stroke="#5fcc8a" strokeWidth="2.2" fill="none"/>
    <text x="447" y="156" fill="#5fcc8a" fontSize="9">MU</text>
    <text x="248" y="8" fill="#5fcc8a" fontSize="8.5" fontWeight="bold">MARGINAL UTILITY</text>
    {/* MU=0 at max TU */}
    <circle cx="375" cy="130" r="4" fill="#fff" stroke="#5fcc8a" strokeWidth="1.5"/>
    <line x1="375" y1="175" x2="375" y2="130" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="378" y="121" fill="#5fcc8a" fontSize="7.5">MU = 0</text>
    <text x="378" y="131" fill="#5fcc8a" fontSize="7">(TU at max)</text>
    {/* Diminishing MU label */}
    <text x="280" y="55" fill="#b8943a" fontSize="7.5">Law of Diminishing</text>
    <text x="280" y="65" fill="#b8943a" fontSize="7.5">Marginal Utility:</text>
    <text x="280" y="75" fill="#b8943a" fontSize="7.5">MU falls as Q rises</text>
  </svg><p>TU rises as Q increases (at decreasing rate). MU = slope of TU = extra utility from one more unit. MU always falls (diminishing MU). When MU = 0, TU is at its maximum. Required to draw on AP Micro FRQ.</p></div>
);

// Four Externality Types with MSC/MPC/MSB/MPB
const ExternalityDiag=()=>(
  <div className="dw"><h5>⚠️ Four Externality Types — MSC / MPC / MSB / MPB (AP Micro Required)</h5>
  <svg viewBox="0 0 580 280" style={{maxWidth:575,width:"100%"}}>
    {/* TOP LEFT: Negative Production Externality */}
    <text x="72" y="12" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">Negative Production</text>
    <line x1="15" y1="125" x2="130" y2="125" stroke="#4a7aab" strokeWidth="1.2"/>
    <line x1="15" y1="125" x2="15" y2="18" stroke="#4a7aab" strokeWidth="1.2"/>
    <text x="72" y="133" fill="#6a7e8f" fontSize="7" textAnchor="middle">Q</text>
    <text x="8" y="72" fill="#6a7e8f" fontSize="7" textAnchor="middle" transform="rotate(-90,8,72)">P/$</text>
    {/* MPB=MSB demand */}
    <line x1="20" y1="22" x2="122" y2="115" stroke="#5fcc8a" strokeWidth="1.8"/>
    <text x="124" y="113" fill="#5fcc8a" fontSize="7">MPB=MSB</text>
    {/* MPC supply */}
    <line x1="20" y1="108" x2="122" y2="32" stroke="#c9a84c" strokeWidth="1.8"/>
    <text x="124" y="30" fill="#c9a84c" fontSize="7">MPC</text>
    {/* MSC above MPC */}
    <line x1="20" y1="92" x2="122" y2="20" stroke="#e07070" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="124" y="18" fill="#e07070" fontSize="7">MSC</text>
    {/* Qm and Qs */}
    <line x1="71" y1="125" x2="71" y2="68" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="71" y="130" fill="#c9a84c" fontSize="7" textAnchor="middle">Qm</text>
    <line x1="57" y1="125" x2="57" y2="74" stroke="#e07070" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="54" y="130" fill="#e07070" fontSize="7" textAnchor="middle">Qs</text>
    <text x="64" y="50" fill="#e07070" fontSize="6.5">DWL</text>
    <polygon points="57,74 71,68 57,68" fill="#e07070" opacity=".35"/>
    <text x="15" y="145" fill="#e07070" fontSize="7">Overproduces: Qm&gt;Qs</text>
    <text x="15" y="153" fill="#e07070" fontSize="7">Fix: Pigouvian TAX</text>

    {/* TOP RIGHT: Positive Production Externality */}
    <text x="217" y="12" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">Positive Production</text>
    <line x1="158" y1="125" x2="278" y2="125" stroke="#4a7aab" strokeWidth="1.2"/>
    <line x1="158" y1="125" x2="158" y2="18" stroke="#4a7aab" strokeWidth="1.2"/>
    <text x="218" y="133" fill="#6a7e8f" fontSize="7" textAnchor="middle">Q</text>
    {/* MPB=MSB demand */}
    <line x1="163" y1="22" x2="265" y2="115" stroke="#5fcc8a" strokeWidth="1.8"/>
    <text x="267" y="113" fill="#5fcc8a" fontSize="7">MPB=MSB</text>
    {/* MPC supply */}
    <line x1="163" y1="110" x2="265" y2="28" stroke="#c9a84c" strokeWidth="1.8"/>
    <text x="267" y="26" fill="#c9a84c" fontSize="7">MPC</text>
    {/* MSC below MPC */}
    <line x1="163" y1="120" x2="265" y2="42" stroke="#5fcc8a" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="267" y="40" fill="#5fcc8a" fontSize="7">MSC</text>
    {/* Qm and Qs */}
    <line x1="214" y1="125" x2="214" y2="68" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="214" y="130" fill="#c9a84c" fontSize="7" textAnchor="middle">Qm</text>
    <line x1="228" y1="125" x2="228" y2="62" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="231" y="130" fill="#5fcc8a" fontSize="7" textAnchor="middle">Qs</text>
    <polygon points="214,68 228,62 228,68" fill="#5fcc8a" opacity=".35"/>
    <text x="158" y="145" fill="#5fcc8a" fontSize="7">Underproduces: Qm&lt;Qs</text>
    <text x="158" y="153" fill="#5fcc8a" fontSize="7">Fix: SUBSIDY</text>

    {/* BOTTOM LEFT: Negative Consumption Externality */}
    <text x="72" y="165" fill="#e07070" fontSize="8" textAnchor="middle" fontWeight="bold">Negative Consumption</text>
    <line x1="15" y1="272" x2="130" y2="272" stroke="#4a7aab" strokeWidth="1.2"/>
    <line x1="15" y1="272" x2="15" y2="168" stroke="#4a7aab" strokeWidth="1.2"/>
    <text x="72" y="279" fill="#6a7e8f" fontSize="7" textAnchor="middle">Q</text>
    {/* MPC=MSC supply */}
    <line x1="20" y1="262" x2="122" y2="178" stroke="#c9a84c" strokeWidth="1.8"/>
    <text x="124" y="176" fill="#c9a84c" fontSize="7">MPC=MSC</text>
    {/* MPB demand */}
    <line x1="20" y1="175" x2="122" y2="262" stroke="#88aaff" strokeWidth="1.8"/>
    <text x="124" y="264" fill="#88aaff" fontSize="7">MPB</text>
    {/* MSB below MPB */}
    <line x1="20" y1="192" x2="104" y2="262" stroke="#e07070" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="107" y="264" fill="#e07070" fontSize="7">MSB</text>
    {/* Qm and Qs */}
    <line x1="71" y1="272" x2="71" y2="218" stroke="#88aaff" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="74" y="270" fill="#88aaff" fontSize="7">Qm</text>
    <line x1="58" y1="272" x2="58" y2="226" stroke="#e07070" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="55" y="270" fill="#e07070" fontSize="7">Qs</text>
    <polygon points="58,226 71,218 58,218" fill="#e07070" opacity=".35"/>
    <text x="15" y="277" fill="#e07070" fontSize="6.5">Over: Qm&gt;Qs · Fix: TAX on buyers</text>

    {/* BOTTOM RIGHT: Positive Consumption Externality */}
    <text x="217" y="165" fill="#5fcc8a" fontSize="8" textAnchor="middle" fontWeight="bold">Positive Consumption</text>
    <line x1="158" y1="272" x2="278" y2="272" stroke="#4a7aab" strokeWidth="1.2"/>
    <line x1="158" y1="272" x2="158" y2="168" stroke="#4a7aab" strokeWidth="1.2"/>
    <text x="218" y="279" fill="#6a7e8f" fontSize="7" textAnchor="middle">Q</text>
    {/* MPC=MSC supply */}
    <line x1="163" y1="262" x2="265" y2="175" stroke="#c9a84c" strokeWidth="1.8"/>
    <text x="267" y="173" fill="#c9a84c" fontSize="7">MPC=MSC</text>
    {/* MPB demand */}
    <line x1="163" y1="175" x2="265" y2="262" stroke="#88aaff" strokeWidth="1.8"/>
    <text x="267" y="264" fill="#88aaff" fontSize="7">MPB</text>
    {/* MSB above MPB */}
    <line x1="163" y1="160" x2="265" y2="248" stroke="#5fcc8a" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="267" y="250" fill="#5fcc8a" fontSize="7">MSB</text>
    {/* Qm and Qs */}
    <line x1="214" y1="272" x2="214" y2="218" stroke="#88aaff" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="214" y="270" fill="#88aaff" fontSize="7">Qm</text>
    <line x1="228" y1="272" x2="228" y2="210" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="231" y="270" fill="#5fcc8a" fontSize="7">Qs</text>
    <polygon points="214,218 228,210 228,218" fill="#5fcc8a" opacity=".35"/>
    <text x="158" y="277" fill="#5fcc8a" fontSize="6.5">Under: Qm&lt;Qs · Fix: SUBSIDY to buyers</text>

    {/* Right side: Key framework */}
    <rect x="300" y="10" width="275" height="262" rx="7" fill="#101e2e" stroke="#b8943a" strokeWidth="1.2"/>
    <text x="438" y="26" fill="#b8943a" fontSize="8.5" textAnchor="middle" fontWeight="bold">EXTERNALITY FRAMEWORK</text>
    <text x="308" y="42" fill="#c9a84c" fontSize="8" fontWeight="bold">KEY TERMS:</text>
    <text x="308" y="54" fill="#a8bece" fontSize="7.5">MPB = Marginal Private Benefit (demand curve)</text>
    <text x="308" y="65" fill="#a8bece" fontSize="7.5">MSB = Marginal Social Benefit (includes external)</text>
    <text x="308" y="76" fill="#a8bece" fontSize="7.5">MPC = Marginal Private Cost (supply curve)</text>
    <text x="308" y="87" fill="#a8bece" fontSize="7.5">MSC = Marginal Social Cost (includes external)</text>
    <line x1="308" y1="95" x2="567" y2="95" stroke="#253650" strokeWidth="1"/>
    <text x="308" y="108" fill="#e07070" fontSize="8" fontWeight="bold">NEGATIVE externalities:</text>
    <text x="308" y="120" fill="#a8bece" fontSize="7.5">Production: MSC &gt; MPC (social cost &gt; private cost)</text>
    <text x="308" y="131" fill="#a8bece" fontSize="7.5">Consumption: MSB &lt; MPB (social benefit &lt; private)</text>
    <text x="308" y="142" fill="#e07070" fontSize="7.5">Both: market OVERproduces → fix with TAX</text>
    <line x1="308" y1="150" x2="567" y2="150" stroke="#253650" strokeWidth="1"/>
    <text x="308" y="163" fill="#5fcc8a" fontSize="8" fontWeight="bold">POSITIVE externalities:</text>
    <text x="308" y="175" fill="#a8bece" fontSize="7.5">Production: MSC &lt; MPC (lower social cost)</text>
    <text x="308" y="186" fill="#a8bece" fontSize="7.5">Consumption: MSB &gt; MPB (higher social benefit)</text>
    <text x="308" y="197" fill="#5fcc8a" fontSize="7.5">Both: market UNDERproduces → fix with SUBSIDY</text>
    <line x1="308" y1="205" x2="567" y2="205" stroke="#253650" strokeWidth="1"/>
    <text x="308" y="218" fill="#b8943a" fontSize="7.5" fontWeight="bold">Social optimum always where MSB = MSC</text>
    <text x="308" y="229" fill="#a8bece" fontSize="7.5">DWL = triangle between Qm and Qs</text>
    <line x1="308" y1="237" x2="567" y2="237" stroke="#253650" strokeWidth="1"/>
    <text x="308" y="250" fill="#00c8b4" fontSize="7.5">★ AP Micro: Must draw & label ALL 4 types.</text>
    <text x="308" y="261" fill="#00c8b4" fontSize="7.5">★ Quotas are EXCLUDED from AP Micro scope.</text>
  </svg><p>The AP Micro exam requires you to draw ALL four types with correct MSC/MPC/MSB/MPB labels. Social optimum always at MSB = MSC. DWL is the welfare triangle between market Q and social optimum Q.</p></div>
);

// Production Function: TP, MP, AP curves
const ProdFnDiag=()=>(
  <div className="dw"><h5>🏭 Production Function: TP, MP & AP Curves</h5>
  <svg viewBox="0 0 580 210" style={{maxWidth:575,width:"100%"}}>
    {/* LEFT: Total Product */}
    <line x1="18" y1="188" x2="178" y2="188" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="18" y1="188" x2="18" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="98" y="203" fill="#6a7e8f" fontSize="8.5" textAnchor="middle">Labor (L)</text>
    <text x="10" y="100" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,10,100)">Total Product (TP)</text>
    <path d="M 22 178 Q 55 120, 90 65 T 148 38 S 168 30, 172 35" stroke="#b8943a" strokeWidth="2.2" fill="none"/>
    <text x="98" y="8" fill="#b8943a" fontSize="9" textAnchor="middle" fontWeight="bold">TOTAL PRODUCT</text>
    <text x="98" y="18" fill="#7a8e9f" fontSize="7.5" textAnchor="middle">increases then flattens</text>
    {/* Diminishing returns marker */}
    <line x1="108" y1="12" x2="108" y2="188" stroke="#e07070" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="115" y="22" fill="#e07070" fontSize="7">Diminishing</text>
    <text x="115" y="30" fill="#e07070" fontSize="7">returns begin</text>
    {/* RIGHT: MP and AP */}
    <line x1="218" y1="188" x2="375" y2="188" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="218" y1="188" x2="218" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="218" y1="100" x2="375" y2="100" stroke="#253650" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="296" y="203" fill="#6a7e8f" fontSize="8.5" textAnchor="middle">Labor (L)</text>
    <text x="210" y="100" fill="#6a7e8f" fontSize="7" textAnchor="end">0</text>
    {/* MP - rises then falls, crosses x-axis */}
    <path d="M 222 155 Q 248 55, 275 48 T 318 88 S 348 138, 368 178" stroke="#5fcc8a" strokeWidth="2.2" fill="none"/>
    <text x="372" y="176" fill="#5fcc8a" fontSize="9">MP</text>
    {/* AP - rises then falls, always above MP when MP>AP */}
    <path d="M 222 165 Q 252 80, 285 70 T 335 108 S 360 140, 370 155" stroke="#88aaff" strokeWidth="2" fill="none"/>
    <text x="372" y="153" fill="#88aaff" fontSize="9">AP</text>
    <text x="296" y="8" fill="#5fcc8a" fontSize="9" textAnchor="middle" fontWeight="bold">MARGINAL & AVERAGE PRODUCT</text>
    <text x="296" y="18" fill="#7a8e9f" fontSize="7.5" textAnchor="middle">MP cuts AP at AP's maximum</text>
    {/* MP cuts AP label */}
    <circle cx="298" cy="72" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <text x="305" y="70" fill="#b8943a" fontSize="7.5">MP=AP (max AP)</text>
    {/* KEY RULES box */}
    <rect x="395" y="15" width="178" height="168" rx="7" fill="#101e2e" stroke="#253650" strokeWidth="1.2"/>
    <text x="484" y="32" fill="#b8943a" fontSize="8.5" textAnchor="middle" fontWeight="bold">KEY RULES</text>
    <text x="403" y="50" fill="#5fcc8a" fontSize="8">• MP rises → TP accelerating</text>
    <text x="403" y="63" fill="#5fcc8a" fontSize="8">• MP falls → TP decelerating</text>
    <text x="403" y="76" fill="#5fcc8a" fontSize="8">• MP = 0 → TP at maximum</text>
    <text x="403" y="89" fill="#e07070" fontSize="8">• MP &lt; 0 → TP declining</text>
    <text x="403" y="108" fill="#88aaff" fontSize="8">• MP &gt; AP → AP rising</text>
    <text x="403" y="121" fill="#88aaff" fontSize="8">• MP &lt; AP → AP falling</text>
    <text x="403" y="134" fill="#88aaff" fontSize="8">• MP = AP → AP at max</text>
    <text x="403" y="153" fill="#c9a84c" fontSize="8">• Diminishing returns:</text>
    <text x="403" y="165" fill="#c9a84c" fontSize="8">  MP starts falling</text>
    <text x="403" y="177" fill="#c9a84c" fontSize="8">  (NOT when MP&lt;0)</text>
  </svg><p>TP = total output. MP = change in TP per extra worker. AP = TP/L. Diminishing returns start when MP peaks and begins falling.</p></div>
);

// Per-unit tax diagram
const TaxDiag=()=>(
  <div className="dw"><h5>💸 Per-Unit Tax — Burden, DWL & Revenue</h5>
  <svg viewBox="0 0 300 220" style={{maxWidth:295,width:"100%"}}>
    <line x1="33" y1="198" x2="268" y2="198" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="33" y1="198" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.5"/>
    <text x="150" y="213" fill="#6a7e8f" fontSize="9" textAnchor="middle">Quantity</text>
    <text x="13" y="105" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,13,105)">Price ($)</text>
    {/* Original supply */}
    <line x1="46" y1="178" x2="228" y2="42" stroke="#c9a84c" strokeWidth="1.8" strokeDasharray="4,2"/>
    <text x="230" y="40" fill="#c9a84c" fontSize="8">S₀</text>
    {/* Supply after tax (shift left/up by tax amount) */}
    <line x1="46" y1="138" x2="228" y2="18" stroke="#c9a84c" strokeWidth="2"/>
    <text x="230" y="18" fill="#c9a84c" fontSize="9">S+tax</text>
    {/* Demand */}
    <line x1="46" y1="28" x2="228" y2="175" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="230" y="175" fill="#5fcc8a" fontSize="9">D</text>
    {/* Original equilibrium */}
    <circle cx="137" cy="103" r="4" fill="#fff" stroke="#6a7e8f" strokeWidth="1.5"/>
    {/* New equilibrium after tax */}
    <circle cx="115" cy="88" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="88" x2="115" y2="88" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="33" y1="118" x2="115" y2="118" stroke="#e07070" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="115" y1="198" x2="115" y2="88" stroke="#b8943a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="137" y1="198" x2="137" y2="103" stroke="#6a7e8f" strokeWidth="1" strokeDasharray="3,2"/>
    {/* Tax wedge */}
    <rect x="33" y="88" width="82" height="30" fill="#b8943a" opacity=".18"/>
    <text x="74" y="106" fill="#b8943a" fontSize="7.5" textAnchor="middle">Tax Revenue</text>
    {/* Buyer pays */}
    <text x="20" y="91" fill="#b8943a" fontSize="7.5" textAnchor="end">Pb</text>
    {/* Seller receives */}
    <text x="20" y="121" fill="#e07070" fontSize="7.5" textAnchor="end">Ps</text>
    {/* DWL triangle */}
    <polygon points="115,88 137,103 115,118" fill="#ff6b6b" opacity=".3"/>
    <text x="128" y="103" fill="#e07070" fontSize="7.5">DWL</text>
    <text x="115" y="208" fill="#b8943a" fontSize="7.5" textAnchor="middle">Qt</text>
    <text x="137" y="208" fill="#6a7e8f" fontSize="7.5" textAnchor="middle">Q*</text>
    {/* Tax size arrow */}
    <line x1="252" y1="88" x2="252" y2="118" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="248" y1="88" x2="256" y2="88" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="248" y1="118" x2="256" y2="118" stroke="#b8943a" strokeWidth="1.5"/>
    <text x="258" y="105" fill="#b8943a" fontSize="7.5">Tax</text>
    <text x="258" y="113" fill="#b8943a" fontSize="7.5">= Pb-Ps</text>
  </svg><p>Tax shifts S left. New Q (Qt &lt; Q*). Buyer pays Pb, seller receives Ps. Tax = Pb − Ps. DWL = lost transactions. Burden split by elasticities.</p></div>
);

// Subsidy diagram
const SubsidyDiag=()=>(
  <div className="dw"><h5>💚 Per-Unit Subsidy — Effect on Market</h5>
  <svg viewBox="0 0 285 210" style={{maxWidth:278,width:"100%"}}>
    <line x1="28" y1="190" x2="255" y2="190" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="28" y1="190" x2="28" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="141" y="205" fill="#6a7e8f" fontSize="8.5" textAnchor="middle">Quantity</text>
    <text x="10" y="100" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,10,100)">Price ($)</text>
    {/* Original supply */}
    <line x1="40" y1="168" x2="220" y2="35" stroke="#c9a84c" strokeWidth="1.8" strokeDasharray="4,2"/>
    <text x="222" y="33" fill="#c9a84c" fontSize="8">S₀</text>
    {/* Supply after subsidy (shifts right/down) */}
    <line x1="40" y1="188" x2="240" y2="45" stroke="#5fcc8a" strokeWidth="2"/>
    <text x="242" y="43" fill="#5fcc8a" fontSize="9">S+sub</text>
    {/* Demand */}
    <line x1="40" y1="28" x2="228" y2="173" stroke="#88aaff" strokeWidth="2"/>
    <text x="230" y="171" fill="#88aaff" fontSize="9">D</text>
    {/* Original equilibrium */}
    <circle cx="127" cy="98" r="4" fill="#fff" stroke="#6a7e8f" strokeWidth="1.5"/>
    {/* New equilibrium */}
    <circle cx="154" cy="107" r="4" fill="#fff" stroke="#5fcc8a" strokeWidth="1.5"/>
    <line x1="28" y1="107" x2="154" y2="107" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="138" x2="154" y2="138" stroke="#e07070" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="154" y1="190" x2="154" y2="107" stroke="#5fcc8a" strokeWidth="1" strokeDasharray="3,2"/>
    {/* Subsidy wedge */}
    <rect x="28" y="107" width="126" height="31" fill="#5fcc8a" opacity=".15"/>
    <text x="91" y="125" fill="#5fcc8a" fontSize="7.5" textAnchor="middle">Subsidy Cost</text>
    <text x="14" y="110" fill="#5fcc8a" fontSize="7" textAnchor="end">Pb</text>
    <text x="14" y="141" fill="#e07070" fontSize="7" textAnchor="end">Ps</text>
    {/* DWL from subsidy */}
    <polygon points="127,98 154,107 127,116" fill="#ff6b6b" opacity=".25"/>
    <text x="130" y="108" fill="#e07070" fontSize="7">DWL</text>
  </svg><p>Subsidy shifts S right → lower price for buyers (Pb), higher price for sellers (Ps). Q increases beyond Q*. Government pays Ps − Pb per unit. Creates DWL (overproduction).</p></div>
);

// Financial Assets diagram
const FinAssetDiag=()=>(
  <div className="dw"><h5>📈 Financial Assets — Risk & Return Tradeoff</h5>
  <svg viewBox="0 0 480 185" style={{maxWidth:470,width:"100%"}}>
    <line x1="38" y1="158" x2="220" y2="158" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="38" y1="158" x2="38" y2="18" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="129" y="173" fill="#6a7e8f" fontSize="8.5" textAnchor="middle">Risk →</text>
    <text x="18" y="88" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,18,88)">Return →</text>
    <line x1="46" y1="145" x2="208" y2="28" stroke="#b8943a" strokeWidth="2" strokeDasharray="4,2"/>
    <text x="210" y="28" fill="#b8943a" fontSize="7.5">Risk-Return</text>
    <text x="210" y="37" fill="#b8943a" fontSize="7.5">Frontier</text>
    <circle cx="60" cy="140" r="6" fill="#4a7aab"/><text x="68" y="143" fill="#4a7aab" fontSize="7.5">T-bills</text><text x="68" y="153" fill="#4a7aab" fontSize="7">low risk, low r</text>
    <circle cx="95" cy="122" r="6" fill="#5fcc8a"/><text x="103" y="125" fill="#5fcc8a" fontSize="7.5">Bonds</text>
    <circle cx="135" cy="98" r="6" fill="#c9a84c"/><text x="143" y="101" fill="#c9a84c" fontSize="7.5">Stocks</text>
    <circle cx="180" cy="58" r="6" fill="#e07070"/><text x="188" y="61" fill="#e07070" fontSize="7.5">Derivatives</text><text x="188" y="71" fill="#e07070" fontSize="7">high risk, high r</text>
    {/* Right side: asset types comparison */}
    <rect x="240" y="12" width="234" height="162" rx="7" fill="#101e2e" stroke="#253650" strokeWidth="1.2"/>
    <text x="357" y="28" fill="#b8943a" fontSize="8.5" textAnchor="middle" fontWeight="bold">ASSET COMPARISON</text>
    <text x="248" y="44" fill="#4a7aab" fontSize="8" fontWeight="bold">Bonds (Debt)</text>
    <text x="248" y="54" fill="#a8bece" fontSize="7.5">• Fixed interest payments (coupon)</text>
    <text x="248" y="63" fill="#a8bece" fontSize="7.5">• Face value repaid at maturity</text>
    <text x="248" y="72" fill="#a8bece" fontSize="7.5">• Price ↑ ↔ Interest rate ↓ (INVERSE)</text>
    <text x="248" y="87" fill="#5fcc8a" fontSize="8" fontWeight="bold">Stocks (Equity)</text>
    <text x="248" y="97" fill="#a8bece" fontSize="7.5">• Ownership stake in firm</text>
    <text x="248" y="106" fill="#a8bece" fontSize="7.5">• Dividends + capital gains</text>
    <text x="248" y="115" fill="#a8bece" fontSize="7.5">• Higher risk, higher expected return</text>
    <text x="248" y="130" fill="#c9a84c" fontSize="8" fontWeight="bold">Bond Price ↔ Interest Rate</text>
    <text x="248" y="140" fill="#a8bece" fontSize="7.5">Fed buys bonds → demand ↑ → price ↑</text>
    <text x="248" y="150" fill="#a8bece" fontSize="7.5">→ yield (rate) FALLS. Always inverse.</text>
    <text x="248" y="163" fill="#e07070" fontSize="7.5">★ AP MACRO: OMO changes bond prices</text>
  </svg><p>Higher risk = higher expected return. Bond price and interest rate always move inversely. Fed OMO works through bond prices.</p></div>
);

// Quantity Theory of Money
const QTMDiag=()=>(
  <div className="dw"><h5>💵 Quantity Theory of Money: MV = PQ</h5>
  <svg viewBox="0 0 500 165" style={{maxWidth:490,width:"100%"}}>
    {/* Main equation display */}
    <rect x="15" y="12" width="470" height="55" rx="8" fill="#101e2e" stroke="#b8943a" strokeWidth="1.5"/>
    <text x="55" y="40" fill="#b8943a" fontSize="20" fontWeight="bold">M</text>
    <text x="78" y="40" fill="#f0ebe0" fontSize="20">×</text>
    <text x="95" y="40" fill="#5fcc8a" fontSize="20" fontWeight="bold">V</text>
    <text x="118" y="40" fill="#f0ebe0" fontSize="20">=</text>
    <text x="135" y="40" fill="#88aaff" fontSize="20" fontWeight="bold">P</text>
    <text x="155" y="40" fill="#f0ebe0" fontSize="20">×</text>
    <text x="172" y="40" fill="#c9a84c" fontSize="20" fontWeight="bold">Q</text>
    <text x="55" y="56" fill="#b8943a" fontSize="8">Money Supply</text>
    <text x="95" y="56" fill="#5fcc8a" fontSize="8">Velocity</text>
    <text x="135" y="56" fill="#88aaff" fontSize="8">Price Level</text>
    <text x="172" y="56" fill="#c9a84c" fontSize="8">Real Output</text>
    <text x="260" y="35" fill="#f0ebe0" fontSize="9">Total spending = Total nominal output</text>
    <text x="260" y="50" fill="#7a8e9f" fontSize="8">If V and Q are constant: ΔM → ΔP (inflation)</text>
    {/* Key implications */}
    <rect x="15" y="78" width="148" height="76" rx="6" fill="#0a2218" stroke="#2a7a50" strokeWidth="1.2"/>
    <text x="89" y="92" fill="#5fcc8a" fontSize="7.5" textAnchor="middle" fontWeight="bold">MONETARIST VIEW</text>
    <text x="23" y="104" fill="#98c8a8" fontSize="7">V is stable (constant)</text>
    <text x="23" y="114" fill="#98c8a8" fontSize="7">Q grows at natural rate</text>
    <text x="23" y="124" fill="#98c8a8" fontSize="7">∴ M↑ → P↑ (inflation)</text>
    <text x="23" y="134" fill="#98c8a8" fontSize="7">∴ Printing money =</text>
    <text x="23" y="143" fill="#98c8a8" fontSize="7">   inflation in LR</text>
    <rect x="172" y="78" width="150" height="76" rx="6" fill="#280a0a" stroke="#8a2020" strokeWidth="1.2"/>
    <text x="247" y="92" fill="#e07070" fontSize="7.5" textAnchor="middle" fontWeight="bold">LR INFLATION RULE</text>
    <text x="180" y="104" fill="#d8a0a0" fontSize="7">%ΔM = %ΔP + %ΔQ − %ΔV</text>
    <text x="180" y="114" fill="#d8a0a0" fontSize="7">If V stable, Q grows 3%:</text>
    <text x="180" y="124" fill="#d8a0a0" fontSize="7">M grows 8% → inflation ≈ 5%</text>
    <text x="180" y="134" fill="#d8a0a0" fontSize="7">Fed targets low inflation by</text>
    <text x="180" y="144" fill="#d8a0a0" fontSize="7">controlling M growth rate</text>
    <rect x="331" y="78" width="154" height="76" rx="6" fill="#001e1c" stroke="#00c8b4" strokeWidth="1.2"/>
    <text x="408" y="92" fill="#00c8b4" fontSize="7.5" textAnchor="middle" fontWeight="bold">★ AP MACRO POINTS</text>
    <text x="339" y="104" fill="#80e8e0" fontSize="7">MV = PQ identity always holds</text>
    <text x="339" y="114" fill="#80e8e0" fontSize="7">Classical: LR money is neutral</text>
    <text x="339" y="124" fill="#80e8e0" fontSize="7">(↑M only raises P, not Q)</text>
    <text x="339" y="134" fill="#80e8e0" fontSize="7">Keynesian: SR M↑ may raise Q</text>
    <text x="339" y="144" fill="#80e8e0" fontSize="7">Tested: "What causes LR inflation?"</text>
  </svg><p>M = money supply. V = velocity (times money turns over). P = price level. Q = real output. Key: long-run money growth causes proportional inflation.</p></div>
);

// Supply-Side Growth Policy
const SupplySideDiag=()=>(
  <div className="dw"><h5>📈 Supply-Side Policy & Long-Run Growth</h5>
  <svg viewBox="0 0 310 210" style={{maxWidth:305,width:"100%"}}>
    <line x1="33" y1="188" x2="278" y2="188" stroke="#4a7aab" strokeWidth="1.4"/>
    <line x1="33" y1="188" x2="33" y2="12" stroke="#4a7aab" strokeWidth="1.4"/>
    <text x="155" y="203" fill="#6a7e8f" fontSize="8.5" textAnchor="middle">Real GDP</text>
    <text x="13" y="100" fill="#6a7e8f" fontSize="8.5" textAnchor="middle" transform="rotate(-90,13,100)">Price Level</text>
    <line x1="46" y1="26" x2="232" y2="175" stroke="#5fcc8a" strokeWidth="1.8" strokeDasharray="4,2"/>
    <text x="233" y="173" fill="#5fcc8a" fontSize="8">AD</text>
    <line x1="46" y1="168" x2="182" y2="46" stroke="#c9a84c" strokeWidth="1.8" strokeDasharray="4,2"/>
    <text x="184" y="44" fill="#c9a84c" fontSize="8">SRAS₁</text>
    <line x1="33" y1="155" x2="33" y2="25" stroke="#e07070" strokeWidth="1.8" strokeDasharray="5,3"/>
    <text x="36" y="22" fill="#e07070" fontSize="7.5">LRAS₁</text>
    {/* After supply-side policy */}
    <line x1="90" y1="168" x2="238" y2="46" stroke="#b8943a" strokeWidth="2"/>
    <text x="240" y="44" fill="#b8943a" fontSize="8">SRAS₂</text>
    <line x1="88" y1="155" x2="88" y2="25" stroke="#b8943a" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="91" y="22" fill="#b8943a" fontSize="7.5">LRAS₂</text>
    {/* Equilibria */}
    <circle cx="113" cy="108" r="4" fill="#fff" stroke="#e07070" strokeWidth="1.5"/>
    <circle cx="163" cy="96" r="4" fill="#fff" stroke="#b8943a" strokeWidth="1.5"/>
    <line x1="33" y1="108" x2="113" y2="108" stroke="#e07070" strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="33" y1="96" x2="163" y2="96" stroke="#b8943a" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="28" y="111" fill="#e07070" fontSize="7" textAnchor="end">PL₁</text>
    <text x="28" y="99" fill="#b8943a" fontSize="7" textAnchor="end">PL₂↓</text>
    <text x="113" y="198" fill="#e07070" fontSize="7" textAnchor="middle">Y₁</text>
    <text x="163" y="198" fill="#b8943a" fontSize="7" textAnchor="middle">Y₂↑</text>
    <path d="M 125 75 L 148 75" stroke="#b8943a" strokeWidth="1.5" markerEnd="url(#ss1)"/>
    <text x="133" y="70" fill="#b8943a" fontSize="7.5">Growth</text>
    <defs><marker id="ss1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><polygon points="0,0 5,2.5 0,5" fill="#b8943a"/></marker></defs>
  </svg><p>Supply-side policies shift SRAS and LRAS rightward. Output rises (Y₁→Y₂) and price level falls (PL₁→PL₂). Sustainable long-run growth without inflation.</p></div>
);

// International Capital Flows
const CapFlowDiag=()=>(
  <div className="dw"><h5>🌐 Real Interest Rates & International Capital Flows</h5>
  <svg viewBox="0 0 500 185" style={{maxWidth:490,width:"100%"}}>
    {/* Left: Country A raises rates */}
    <rect x="12" y="12" width="226" height="162" rx="7" fill="#101e2e" stroke="#b8943a" strokeWidth="1.2"/>
    <text x="125" y="28" fill="#b8943a" fontSize="8.5" textAnchor="middle" fontWeight="bold">US RAISES INTEREST RATES</text>
    <text x="20" y="45" fill="#c0d0dc" fontSize="7.5">US real interest rate rises (r↑)</text>
    <text x="20" y="58" fill="#c0d0dc" fontSize="7.5">→ US assets more attractive</text>
    <text x="20" y="71" fill="#c0d0dc" fontSize="7.5">→ Foreign capital INFLOWS to US</text>
    <text x="20" y="84" fill="#c0d0dc" fontSize="7.5">→ Demand for US dollars ↑</text>
    <text x="20" y="97" fill="#c0d0dc" fontSize="7.5">→ Dollar APPRECIATES</text>
    <text x="20" y="110" fill="#c0d0dc" fontSize="7.5">→ US exports more expensive</text>
    <text x="20" y="123" fill="#c0d0dc" fontSize="7.5">→ US imports cheaper</text>
    <text x="20" y="136" fill="#c0d0dc" fontSize="7.5">→ Net exports (Xn) FALL</text>
    <text x="20" y="149" fill="#e07070" fontSize="7.5">→ AD shifts LEFT (partially offsets</text>
    <text x="20" y="160" fill="#e07070" fontSize="7.5">   expansionary policy)</text>
    {/* Right: Full chain */}
    <rect x="248" y="12" width="244" height="162" rx="7" fill="#101e2e" stroke="#5fcc8a" strokeWidth="1.2"/>
    <text x="370" y="28" fill="#5fcc8a" fontSize="8.5" textAnchor="middle" fontWeight="bold">COMPLETE CHAIN TO MEMORIZE</text>
    <text x="256" y="45" fill="#b8943a" fontSize="7.5">r↑ (Fed raises rates)</text>
    <text x="290" y="54" fill="#7a8e9f" fontSize="7">↓</text>
    <text x="256" y="64" fill="#c0d0dc" fontSize="7.5">Capital inflows: foreign invest in US</text>
    <text x="290" y="73" fill="#7a8e9f" fontSize="7">↓</text>
    <text x="256" y="82" fill="#c0d0dc" fontSize="7.5">Demand for $ ↑ → $ appreciates</text>
    <text x="290" y="91" fill="#7a8e9f" fontSize="7">↓</text>
    <text x="256" y="100" fill="#c0d0dc" fontSize="7.5">US exports ↓, imports ↑</text>
    <text x="290" y="109" fill="#7a8e9f" fontSize="7">↓</text>
    <text x="256" y="118" fill="#c0d0dc" fontSize="7.5">Net exports (Xn) fall</text>
    <text x="290" y="127" fill="#7a8e9f" fontSize="7">↓</text>
    <text x="256" y="136" fill="#e07070" fontSize="7.5">AD shifts LEFT → output &amp; PL fall</text>
    <line x1="256" y1="148" x2="484" y2="148" stroke="#253650" strokeWidth="1"/>
    <text x="256" y="160" fill="#00c8b4" fontSize="7">★ Works in reverse: r↓ → capital outflows</text>
    <text x="256" y="170" fill="#00c8b4" fontSize="7">→ $ depreciates → Xn↑ → AD right</text>
  </svg><p>Interest rate differentials drive international capital flows, which affect exchange rates, net exports, and ultimately aggregate demand. AP Macro Unit 6 core topic.</p></div>
);


const BudgetDiag=()=>(
  <div className="dw"><h5>💰 Budget Line (Individual Economizing Problem)</h5>
  <svg viewBox="0 0 260 200" style={{maxWidth:255,width:"100%"}}>
    <line x1="30" y1="178" x2="228" y2="178" stroke="#4a7aab" strokeWidth="1.5"/>
    <line x1="30" y1="178" x2="30" y2="15" stroke="#4a7aab" strokeWidth="1.5"/>
    <polygon points="228,175 235,178 228,181" fill="#4a7aab"/>
    <polygon points="27,15 30,8 33,15" fill="#4a7aab"/>
    <text x="129" y="194" fill="#6a7e8f" fontSize="9" textAnchor="middle">Good X (e.g. pizza)</text>
    <text x="12" y="97" fill="#6a7e8f" fontSize="9" textAnchor="middle" transform="rotate(-90,12,97)">Good Y (e.g. movies)</text>
    <line x1="35" y1="22" x2="215" y2="168" stroke="#b8943a" strokeWidth="2.2"/>
    <text x="217" y="166" fill="#b8943a" fontSize="8">Budget Line</text>
    <text x="75" y="145" fill="#5fcc8a" fontSize="9">✓ Affordable</text>
    <text x="148" y="78" fill="#e07070" fontSize="9">✗ Unaffordable</text>
    <text x="35" y="18" fill="#7a8e9f" fontSize="8">Max Y</text>
    <text x="198" y="176" fill="#7a8e9f" fontSize="8">Max X</text>
    <text x="80" y="108" fill="#b8943a" fontSize="7.5" transform="rotate(-38,80,108)">slope = -Px/Py</text>
  </svg><p>Points ON line: income fully spent. Points INSIDE: affordable but income not fully spent. OUTSIDE: unaffordable. Income↑ = parallel shift out. Price of X falls = X-intercept moves right (rotation).</p></div>
);

/* ═══════════════ JSX HELPERS ═══════════════ */
const BG=({t,c})=><div className="bg0"><h5>🧠 {t}</h5><p>{c}</p></div>;
const BGl=({t,items})=><div className="bg0"><h5>🧠 {t}</h5><ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;
const B=({t,c})=><div className="sb0"><h5>{t}</h5><p>{c}</p></div>;
const B2=({c})=><div className="b2box"><h5>🔰 Start Here — No Economics Knowledge Needed</h5><p>{c}</p></div>;
const D=({t,c})=><div className="db"><h5>{t}</h5><p>{c}</p></div>;
const E=({t,c})=><div className="eb"><h5>{t}</h5><p>{c}</p></div>;
const AP=({c})=><div className="apb"><h5>⚡ AP Exam Tips</h5><ul>{c.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;
const Dl=({t,items})=><div className="db"><h5>{t}</h5><ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;
const APX=({t,c})=><div className="apx"><h5>{t}</h5><p>{c}</p></div>;
const APXl=({t,items})=><div className="apx"><h5>{t}</h5><ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul></div>;

/* ═══════════════ CONTENT ═══════════════ */

const part1=[
  {id:"ep",icon:"🔭",title:"The Economic Perspective",sub:"Scarcity · Purposeful Behavior · Marginal Analysis",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="Imagine you have $20 and want pizza AND a movie ticket, but together they cost $30. You can't have both — you have to choose. That's the fundamental problem economics studies: we all face limits. Resources (money, time, land, workers) are scarce — there's never enough for everyone to have everything they want. Economics is the study of how people, businesses, and societies make choices when they face these limits. Every single concept in this course comes back to this one idea: scarcity forces choices, and choices have consequences."/><B t="Plain English" c="Economics is about one big problem: we want more than we can have. Resources (time, money, land) are limited; wants are unlimited. So every choice requires giving something up. Economics studies HOW we make these choices."/><Dl t="Three Core Ideas" items={["Scarcity & Choice: Every choice means giving up the next-best alternative (opportunity cost).","Purposeful Behavior: People act rationally — weighing benefits against costs to maximize their well-being.","Marginal Analysis: 'Marginal' = one more unit. Act when MB ≥ MC. Stop when MC > MB. This drives every output/pricing decision."]}/></>,
    "In-Depth":<><D t="Scarcity" c="Human wants are virtually limitless while productive resources are finite. Even the wealthiest nations face scarcity of time, skilled labor, land, and capital. Scarcity is universal — not a description of poverty."/><D t="Purposeful (Rational) Behavior" c="Economists model people as rational actors seeking to maximize satisfaction given constraints. This doesn't mean perfect or selfish — just deliberate. Businesses maximize profit; consumers maximize utility; governments (ideally) maximize social welfare."/><D t="Marginal Analysis" c="Marginal benefit (MB) = extra benefit from one more unit. Marginal cost (MC) = extra cost. Rule: act if MB ≥ MC; stop when MC > MB. This is the foundation of every pricing and output decision in AP Micro."/></>,
    Examples:<><E t="Marginal Analysis at a Buffet" c="1st plate: amazing. 4th plate: you feel sick. You stop when the marginal benefit (enjoyment) drops below the marginal cost (discomfort). This is marginal thinking in action."/><E t="Beyoncé Has Scarcity Too" c="She has millions of dollars but only 24 hrs/day. Time is scarce. Every concert means less time for other things. Even billionaires face tradeoffs."/></>,
    "AP Tips":<AP c={["MB = MC is the profit-maximizing rule — appears on nearly every AP Micro FRQ.","Scarcity ≠ Poverty. Universal condition, not description of being poor. Classic trap.","'Rational' in economics = purposeful, not cold or perfect."]}/>
  }},
  {id:"mm",icon:"🔬",title:"Micro vs. Macro + Positive vs. Normative",sub:"Two branches · Factual vs. value statements",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="Economics has two branches. MICROECONOMICS is the close-up view: one market, one firm, one consumer at a time. Why did egg prices spike? How does Apple price the iPhone? These are micro questions. MACROECONOMICS is the wide-angle view: the whole economy at once. Why was unemployment 14% in 2020? What caused 9% inflation in 2022? These are macro questions. A separate distinction: POSITIVE economics = facts you can test (Unemployment is 4.2%). NORMATIVE economics = value judgments (Unemployment should be lower). Economists agree on positive facts but can legitimately disagree on normative goals."/><B t="Plain English" c="Microeconomics zooms in (one market, one firm, one consumer). Macroeconomics zooms out (whole economy: GDP, inflation, unemployment). Positive = factual, testable ('Unemployment is 4%'). Normative = value judgment ('It should be lower')."/></>,
    "In-Depth":<><D t="Microeconomics" c="Prices, consumer behavior, firm decisions, market structures (perfect competition, monopoly, oligopoly), resource allocation, market failures. This is AP Micro."/><D t="Macroeconomics" c="GDP, unemployment, inflation, business cycles, monetary policy (the Fed), fiscal policy (taxes & spending). National-level outcomes. This is AP Macro."/><D t="Positive vs. Normative" c="Positive: testable facts — can be right or wrong based on evidence. Normative: 'should' statements involving value judgments — no data can prove them correct. Economists agree on positive analysis but disagree on normative policy conclusions."/></>,
    Examples:<><E t="Micro vs. Macro" c="Micro: 'Why did egg prices rise after bird flu?' (one market). Macro: 'Why did inflation hit 9% in 2022?' (whole economy's price level)."/><E t="Positive vs. Normative" c="Positive: 'US minimum wage is $7.25/hr.' Normative: 'The minimum wage should be raised to $20.' Same topic, totally different type of statement."/></>,
    "AP Tips":<AP c={["'Taxes should be cut' = NORMATIVE. 'Taxes were cut by 10%' = POSITIVE. Tested every year.","Know which AP exam you're on — Micro and Macro test completely different content.","Policy debates always involve normative disagreement. Economists can agree on facts but disagree on what to do."]}/>
  }},
  {id:"ppc",icon:"📊",title:"Production Possibilities Model",sub:"PPC · Opportunity Cost · Efficiency · Growth",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Imagine a country can make ONLY two things: guns and butter (this is the classic example). If all workers are making guns, you get zero butter. If all workers are making butter, you get zero guns. The Production Possibilities Curve (PPC) maps out every combination in between. Points ON the curve mean you're using ALL your resources efficiently. Points INSIDE the curve mean you're wasting resources (like during a recession when people are unemployed). Points OUTSIDE the curve are impossible — you literally don't have enough resources to get there yet. The only way to get outside the current curve is economic growth: more workers, better technology, or new resources."/><B t="Plain English" c="The PPC shows all efficient combinations of two goods an economy can produce with current resources and technology. Points ON the curve = efficient. Inside = wasted resources. Outside = unattainable. The curve bows outward because of the Law of Increasing Opportunity Costs."/><B t="Key Shifts" c="Outward PPC shift = economic growth (more resources or better technology). Inward shift = natural disaster, war, disease. Moving ALONG the curve = reallocation, not growth."/></>,
    Diagram:<><PPCDiag/><Dl t="What Shifts the PPC Outward?" items={["More natural resources (discovery of oil, minerals)","More labor (population growth, immigration)","More capital goods (investment in factories/equipment)","Better technology (innovation, education/training of workers)"]}/></>,
    "In-Depth":<><D t="Law of Increasing Opportunity Costs" c="As you produce more of one good, its opportunity cost rises because resources aren't perfectly adaptable between uses. The first units shifted cost little; later units cost more. This makes the PPC concave (bowed out from origin)."/><D t="Productive vs. Allocative Efficiency" c="Productive efficiency: on the PPC (no wasted resources). Allocative efficiency: the RIGHT point on the PPC — where MB = MC for society, maximizing social welfare. Pure competition achieves both in LR."/><D t="Present vs. Future Tradeoff" c="Producing more capital goods today (sacrifice consumer goods) → PPC shifts further outward tomorrow. Japan/South Korea invested heavily in capital post-WWII → became wealthy economies by 1980s. This is the investment-for-growth tradeoff."/></>,
    "AP Tips":<AP c={["Most-tested concept in AP Economics. Every PPC question: correctly label axes, curve, and specific points.","Recession = inside curve (existing resources unused). NOT a shift inward. Technology improvement = outward shift.","Sector-specific tech improvement → rotate curve outward on THAT axis only, not both.","Capital goods investment → LARGER future outward shift than consumer goods investment."]}/>
  }},
  {id:"factors",icon:"🌍",title:"Factors of Production & Society's Problem",sub:"Land · Labor · Capital · Entrepreneurship",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="To make ANYTHING — a pizza, a car, a haircut — you need inputs. Economists group all possible inputs into four categories called factors of production. (1) LAND: not just dirt, but ALL natural resources — oil, water, forests, minerals, even the radio spectrum. The payment for land is called RENT. (2) LABOR: all human work — physical and mental. The payment is WAGES. (3) CAPITAL: man-made tools used to produce things — factory machines, computers, delivery trucks, buildings. NOT money — money buys capital, but money itself is not capital. The payment is INTEREST. (4) ENTREPRENEURSHIP: the talent to combine the other three factors and take risks to build a business. The payment is PROFIT. Every product you buy required all four."/><B t="The Four Factors" c="Every economy needs four ingredients: Land (natural resources → earns Rent), Labor (human effort → earns Wages), Capital (man-made production tools — NOT money → earns Interest), Entrepreneurial Ability (organizes the others, takes risk → earns Profit)."/></>,
    "In-Depth":<><Dl t="Four Factors & Income Payments" items={["Land: All natural resources (farmland, oil, minerals, water). Income = Rent. Perfectly inelastic supply → all rent is economic surplus.","Labor: Physical and mental human effort. Income = Wages. Quality improved through education (human capital).","Capital: Man-made goods used in production (factories, machines, computers). Income = Interest. Capital ≠ Money — this is a classic AP trap.","Entrepreneurial Ability: Talent to combine other factors, innovate, and bear risk. Income = Profit (residual after all other factors paid)."]}/><D t="Capital ≠ Money" c="The bakery oven IS capital. The $50,000 cash used to buy it is not. Money is just a medium of exchange used to ACQUIRE capital. In AP Micro, 'capital' always means physical production tools."/></>,
    "AP Tips":<AP c={["Capital ≠ Money — tested every year without exception.","Know income payments: Rent, Wages, Interest, Profit (RWIP). Match each to its factor.","'Human capital' = education and skills embodied in workers. Still classified under Labor, not Capital."]}/>
  }},
  {id:"esys",icon:"🏛️",title:"Economic Systems, Market Characteristics & Five Questions",sub:"Command · Market · Invisible Hand · Circular Flow",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="Every society must answer three basic questions: WHAT to produce? HOW to produce it? FOR WHOM? A MARKET ECONOMY uses prices and competition to answer these automatically. A COMMAND ECONOMY uses government planners (the Soviet model, which collapsed). A MIXED ECONOMY (every real country today) uses mostly markets but with important government roles. The US is a mixed economy — mostly market-driven, but with Social Security, antitrust laws, the FDA, and many other government interventions."/><B t="Three Systems" c="Command economy: government decides what, how, and for whom to produce (North Korea, Soviet Union). Market system: prices and profit signals coordinate decisions (US, Western Europe). Pure laissez-faire: zero government, all markets (theoretical only)."/><B t="Five Fundamental Questions Every Economy Must Answer" c="(1) What to produce? → consumer dollar votes. (2) How? → least-cost production. (3) Who gets output? → those with income. (4) How to accommodate change? → prices adjust automatically. (5) How to promote progress? → profit motive drives innovation."/></>,
    "In-Depth":<><D t="The Invisible Hand (Adam Smith, 1776)" c="Self-interest in competitive markets accidentally benefits society. The baker bakes for profit, but you get bread. Price signals coordinate millions of decentralized decisions without central planning. But the invisible hand fails with: public goods, externalities, monopoly, and information asymmetry."/><D t="The Incentive Problem in Command Economies" c="Without profit motive or competition, no reason to work hard, innovate, or be efficient. Soviet nail factories made giant nails to meet weight quotas; tiny useless nails to meet count quotas. No price signals → chronic shortages, poor quality, stagnation."/><CircularDiag/><D t="Circular Flow: Income = Output = Expenditure" c="Product market (top): households buy goods from businesses. Resource market (bottom): households sell labor/land/capital to businesses. Two flows run in opposite directions: real goods/services and money. In a simple economy: all income = all spending = GDP."/></>,
    Examples:<><E t="The Two Koreas" c="Same people, same culture, different systems. South Korea (market): GDP per capita ~$35,000. North Korea (command): ~$1,800. Almost entirely explained by economic system choice."/></>,
    "AP Tips":<AP c={["Five Fundamental Questions appear on both Micro and Macro FRQs — know all five cold.","Circular flow backbone of GDP accounting: C+I+G+Xn = income = output. AP Macro always tests this.","Invisible hand FAILS with market failures — public goods, externalities, monopoly. Core AP Micro content."]}/>
  }},
];

const part2=[
  {id:"sd",icon:"📊",title:"Demand, Supply & Market Equilibrium",sub:"Ch 3 — The core of all economics",tabs:["Simple","Diagram","In-Depth","Price Controls","AP Tips"],cnt:{
    Simple:<><B2 c="Think about buying pizza. If pizza costs $2 a slice, you might buy 3 slices. If it costs $8 a slice, you probably buy 1 or zero. That's the Law of Demand — as price goes up, people buy less. Simple. Now flip to the pizza shop's view: if they can charge $8 a slice, they want to make tons of pizza. If they can only charge $2, they're not so motivated. That's the Law of Supply — as price goes up, producers make more. Supply and demand meet in a MARKET, and where they meet determines the actual price (called equilibrium). If pizza is priced too high, there's a surplus (leftover pizza, shops cut prices). If priced too low, there's a shortage (lines out the door, prices rise). Markets are self-correcting."/><B t="Plain English" c="Demand: people buy less as prices rise (inverse). Supply: firms produce more as prices rise (direct). Where they meet = equilibrium price and quantity. This is the most important concept in all of economics."/><Dl t="Demand Shifters (TIPEN)" items={["Tastes/preferences change","Income changes (normal vs. inferior goods)","Prices of related goods (substitutes raise demand; complements lower it)","Expectations of future prices","Number of buyers in market"]}/><Dl t="Supply Shifters (ROTTEN)" items={["Resource (input) prices change","Other goods' profitability changes","Technology improves","Taxes/subsidies change","Expectations of future prices","Number of sellers changes"]}/></>,
    Diagram:<><SDDiag/><D t="All 8 Equilibrium Scenarios" c="D right → P↑ Q↑. D left → P↓ Q↓. S right → P↓ Q↑. S left → P↑ Q↓. Both right: Q↑ P=?. Both left: Q↓ P=?. D right + S left: P↑ Q=?. D left + S right: P↓ Q=?. When both shift, one variable is indeterminate."/></>,
    "In-Depth":<><D t="Law of Demand — Three Explanations" c="(1) Substitution effect: higher price → buy cheaper alternatives. (2) Income effect: higher price → real income falls → buy less. (3) Diminishing Marginal Utility: each additional unit gives less satisfaction → willingness to pay falls."/><D t="Change in Demand vs. Change in Quantity Demanded" c="Price change → movement ALONG the curve (change in QD). Any other factor change → SHIFT of the entire curve (change in D). This distinction is tested on every AP exam."/><D t="Normal vs. Inferior Goods" c="Normal good: income rises → demand rises (cars, restaurants). Inferior good: income rises → demand FALLS (ramen, public transit). Income elasticity positive for normal, negative for inferior."/></>,
    "Price Controls":<><PriceDiag/><D t="Price Ceiling (Maximum Price Set Below Equilibrium)" c="Binding price ceiling → Qd > Qs → shortage. Examples: rent control (NYC), gas price caps 1970s. Side effects: black markets, non-price rationing (waiting lists, discrimination), quality deterioration, reduced investment in the good."/><D t="Price Floor (Minimum Price Set Above Equilibrium)" c="Binding price floor → Qs > Qd → surplus. Examples: minimum wage (labor market), agricultural price supports. Side effects: unemployment (if in labor market), excess supply that must be purchased or disposed of."/><E t="Rent Control in NYC" c="Decades of below-market rent → housing shortage, long waiting lists, landlords stop maintaining properties, black market for key money. Perfect textbook price ceiling outcome."/></>,
    "AP Tips":<AP c={["Memorize all 8 S&D scenarios: each shift direction × each curve. Know P and Q effects.","Change in demand (shift) vs. change in quantity demanded (movement) — tested every single year.","Price ceiling BELOW P* = shortage. Price floor ABOVE P* = surplus. Never mix these up.","Normal good: income ↑ → D right. Inferior good: income ↑ → D left."]}/>
  }},
  {id:"taxsub",icon:"💸",title:"Government Intervention: Taxes, Subsidies & Price Controls",sub:"AP Micro Topic 2.8 — Per-unit tax, subsidy, DWL, burden sharing",tabs:["Simple","Diagrams","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Markets find their own equilibrium naturally — but governments sometimes step in with four main tools. (1) PRICE CEILING: a maximum price (rent control). If set below equilibrium, creates a SHORTAGE. (2) PRICE FLOOR: a minimum price (minimum wage). If set above equilibrium, creates a SURPLUS. (3) TAX on sellers: raises their costs, shifts supply left, raises buyer price, lowers seller price, reduces quantity traded, creates DWL. (4) SUBSIDY: government pays part of cost, shifts supply right, lowers buyer price, more trade. All four move the market from its natural equilibrium — sometimes with good intentions, but always with tradeoffs."/><B t="Plain English" c="Governments intervene in markets in four main ways: (1) Price ceilings — max price below equilibrium → shortage. (2) Price floors — min price above equilibrium → surplus. (3) Per-unit taxes — shift supply left → higher buyer price, lower seller price, less output, DWL. (4) Per-unit subsidies — shift supply right → lower buyer price, higher seller price, more output, DWL. All four create deadweight loss (inefficiency)."/></>,
    Diagrams:<><TaxDiag/><SubsidyDiag/></>,
    "In-Depth":<><D t="Per-Unit Tax — Full Analysis" c="A per-unit tax on sellers shifts the supply curve LEFT by the amount of the tax. New equilibrium: lower quantity (Qt < Q*), higher buyer price (Pb), lower seller price (Ps). The tax = Pb − Ps. Government revenue = tax × Qt (rectangle). DWL = triangle between Qt and Q* under demand and above supply. Tax burden is shared: buyers pay Pb − P*, sellers pay P* − Ps. The MORE inelastic side bears the GREATER burden."/><D t="Tax Burden and Elasticity" c="The key insight: who bears the tax burden has NOTHING to do with who legally pays it. It depends entirely on relative elasticities. If demand is perfectly inelastic (vertical): buyers bear 100% of the tax. If supply is perfectly inelastic: sellers bear 100%. If demand is more inelastic than supply: buyers bear more. The less able you are to change your behavior (less elastic), the more of the burden you bear."/><D t="Per-Unit Subsidy — Full Analysis" c="A per-unit subsidy on sellers shifts supply RIGHT by the subsidy amount. New equilibrium: higher quantity (Qs > Q*), lower buyer price (Pb), higher seller price (Ps). Government cost = subsidy × Qs. DWL = triangle between Q* and Qs (the overproduction inefficiency). Subsidy causes market to overproduce beyond the socially optimal quantity."/><APX t="Tax vs. Subsidy on AP FRQs" c="AP Micro Topic 2.8 is heavily tested. You must be able to: (1) Draw both tax and subsidy diagrams with all labels (Pb, Ps, Qt, tax wedge, DWL shaded). (2) Calculate government revenue (tax) or government cost (subsidy). (3) Determine who bears more burden by comparing elasticities. (4) Explain why both create DWL. Remember: a tax on buyers shifts demand LEFT, not supply — same final result but drawn differently."/></>,
    "AP Tips":<AP c={["Tax on sellers: S shifts LEFT. Tax on buyers: D shifts LEFT. Both create same Pb, Ps, Qt — just drawn differently.","DWL from tax = triangle between old Q* and new Qt. MUST shade it on the FRQ diagram.","Burden rule: more inelastic side bears more burden. Cigarette tax: demand inelastic → buyers bear most.","Subsidy creates overproduction DWL. Tax creates underproduction DWL. Both are inefficiencies."]}/>
  }},
  {id:"mf",icon:"🏛️",title:"Market Failures: Externalities, Public Goods, Surplus",sub:"Ch 4 — When markets under- or overproduce",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Markets are amazing at allocating resources efficiently — MOST of the time. But three big situations cause markets to fail: (1) EXTERNALITIES: your actions affect bystanders who aren't part of the transaction. A factory spews pollution that harms nearby residents — those residents aren't in the market for the factory's product, but they bear a cost. The factory doesn't pay for that harm, so it produces too much. (2) PUBLIC GOODS: some things everyone benefits from but no one has incentive to pay for (national defense, street lights). Private companies won't provide them profitably. (3) INFORMATION ASYMMETRY: one side knows more than the other (used car sellers know if the car is a lemon; patients know more about their health than insurance companies). These failures create a case for government intervention — though as Chapter 5 shows, government can also fail."/><B t="Consumer & Producer Surplus" c="Consumer Surplus (CS) = what buyers were willing to pay MINUS what they actually paid. Area above P*, below demand curve. Producer Surplus (PS) = price received minus minimum acceptable price. Area below P*, above supply curve. Total Surplus = CS + PS = maximized at free market equilibrium. Any distortion → Deadweight Loss."/><Dl t="Four Types of Market Failure" items={["Public Goods: non-excludable AND non-rival. Free-rider problem. Markets underprovide. Govt must provide (defense, lighthouses, clean air).","Negative Externalities: costs imposed on third parties. Social cost > private cost → market overproduces. Solution: Pigouvian tax.","Positive Externalities: benefits to third parties. Social benefit > private benefit → market underproduces. Solution: subsidy.","Information Asymmetry: one party knows more than the other (used cars, insurance). Leads to adverse selection and moral hazard."]}/></>,
    Diagram:<><SurplusDiag/><ExternalityDiag/></>,
    "In-Depth":<><D t="Optimal Externality Reduction" c="Government should reduce negative externalities until MB of reduction = MC of reduction. FULL elimination is never optimal — last unit of pollution removal costs more than the benefit. This is the efficient quantity of pollution reduction, where the MC and MB curves for abatement intersect."/><D t="Public Goods — Free Rider Problem" c="If good is non-excludable, people consume it without paying. No one has incentive to pay voluntarily. Private firms can't profit → provide none or too little. Government must provide or subsidize, funded by taxation (compulsory payment to prevent free riding)."/><D t="Information Asymmetry" c="Adverse selection: high-risk buyers are more likely to purchase insurance (insurer can't distinguish). Moral hazard: once insured, people take more risks (insurer can't monitor behavior). Solutions: signaling, screening, warranties, government mandates."/><APX t="Quasi-Public Goods (AP Extra)" c="Excludable but non-rival (up to a point): toll roads, streaming services, national parks. Markets can provide them but may under-price due to non-rivalry. Government often subsidizes or provides them. These appear on AP FRQs more than the textbook covers."/></>,
    "AP Tips":<AP c={["Coase Theorem: if property rights are well-defined and transaction costs are low, private bargaining can solve externalities without government intervention. Example: factory pollutes river, fishermen downstream lose income. If the two parties can negotiate, they'll reach an efficient agreement — factory pays fishermen or fishermen pay factory to reduce pollution. AP Micro occasionally tests this.","Public goods: BOTH non-excludable AND non-rival. Fire station is excludable (club good). Know difference.","Negative externality → tax to internalize social cost. Positive externality → subsidy to increase quantity toward social optimum.","DWL = triangle between old and new Q. Must draw AND shade it correctly — FRQ requirement.","Total surplus maximized at P*. Any price control, tax, or market power creates DWL."]}/>
  }},
  {id:"gov",icon:"⚖️",title:"Government's Role, Failure & Antitrust",sub:"Ch 5 & 19 — When government doesn't fix markets",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Even in a market economy, government plays essential roles. Without government: who provides national defense? (Nobody — impossible to exclude anyone, so no private incentive.) Who stops factories dumping toxins in rivers? (Nobody — no private cost to the factory.) Who prevents monopolies from exploiting consumers? Government's core roles: (1) Enforce property rights and contracts — the foundation of every market. (2) Provide public goods. (3) Correct externalities. (4) Prevent monopoly abuse. (5) Stabilize the macroeconomy. (6) Redistribute income. BUT: government can also fail — politicians face their own incentives, information problems, and lobbying pressures that can make things worse."/><B t="Government's Economic Role" c="In a market economy, government: (1) enforces property rights/contracts, (2) provides public goods, (3) corrects externalities, (4) promotes competition (antitrust), (5) stabilizes the economy (macro policy), (6) redistributes income. But government can fail too."/><B t="Antitrust Laws" c="Laws to prevent monopoly power and promote competition. Sherman Antitrust Act (1890): outlaws monopolization and price-fixing cartels. Clayton Act (1914): prohibits specific anticompetitive practices (tying contracts, exclusive dealing). Federal Trade Commission Act (1914): created FTC to investigate unfair competition."/></>,
    "In-Depth":<><D t="Government Failure Types" c="(1) Principal-Agent Problem: politicians (agents) may not serve voters (principals) — maximize votes instead. (2) Special Interest Effect: concentrated benefits to few, diffuse costs to many → lobbying wins. (3) Shortsightedness: political cycle pressure for quick fixes. (4) Bureaucratic Inefficiency: no profit motive → no cost minimization. (5) Regulatory Capture: regulated industry controls its regulator."/><D t="Antitrust Issues and Enforcement" c="Issues of interpretation: What counts as anticompetitive? A company with 90% market share through superior innovation vs. predatory pricing. Issues of enforcement: suing Microsoft (2000) for bundling Internet Explorer. Effectiveness debated — some mergers prevented, some monopolies persist."/><D t="Natural Monopoly Regulation" c="Some industries have such large economies of scale that competition is impossible or wasteful (utilities, rail). Options: (1) Government ownership. (2) Regulated monopoly: set P = MC (socially optimal but may cause losses) or P = ATC (fair return, allows normal profit). Deregulation: remove government price controls and allow competition to emerge."/></>,
    "AP Tips":<AP c={["Antitrust appears more in AP Micro. Know Sherman Act (1890) as the key law.","Government failure ≠ government is always wrong. It means intervention can also create inefficiencies.","Regulatory capture: agency serves industry, not consumers. Classic example: revolving door between Wall Street and regulators.","Natural monopoly regulation: P = MC is allocatively efficient but may cause losses. P = ATC is fair return (normal profit)."]}/>
  }},
  {id:"lorenz",icon:"📊",title:"Income Inequality: Lorenz Curve & Gini Coefficient",sub:"Ch 21 — Measuring and causes of income inequality",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Why do some people earn millions per year while others work full-time for minimum wage? The LORENZ CURVE measures this gap. Rank all households from poorest to richest. Ask: what share of total income does the bottom 20% earn? The bottom 40%? In a perfectly equal world, the bottom 20% would earn exactly 20%. In reality the bottom 20% of US households earn about 3-4%. The Lorenz curve bows below the equality line — the bigger the bow, the more unequal. The GINI COEFFICIENT summarizes the whole curve in one number: 0 = perfect equality, 1 = one person owns everything. US Gini is about 0.39."/><B t="Plain English" c="Societies are not equal — some people earn far more than others. The Lorenz Curve visualizes income inequality by showing what percentage of total income the bottom X% of the population actually earns. The further the curve bows away from the 45° equality line, the more unequal the distribution."/></>,
    Diagram:<><LorenzDiag/></>,
    "In-Depth":<><D t="Reading the Lorenz Curve" c="The 45° line (line of perfect equality): every 10% of the population earns exactly 10% of income. Actual Lorenz curve bows below. Example: bottom 40% of US population earns about 10% of income. Top 20% earns about 50%. The greater the bowing, the more inequality."/><D t="Gini Coefficient" c="Gini = Area A / (Area A + Area B). Ranges from 0 (perfect equality) to 1 (one person owns everything). US Gini ≈ 0.39. Nordic countries ≈ 0.25–0.30. Brazil ≈ 0.48. Higher Gini = more inequality. Gini has risen in the US since 1970."/><Dl t="Causes of Income Inequality" items={["Ability differences (innate talent, intelligence)","Education and training (human capital investment)","Discrimination (race, gender wage gaps)","Luck, connections, and being in the right place","Unequal distribution of wealth (inherited assets)","Market power of certain occupations"]}/><D t="Equality vs. Efficiency Tradeoff" c="More redistribution (taxes/transfers) reduces inequality but may reduce incentives to work and invest → lower efficiency and output. Less redistribution preserves incentives but increases inequality. Policymakers must choose where on this tradeoff to sit. No objectively correct answer — normative judgment."/></>,
    "AP Tips":<AP c={["Lorenz curve: further from 45° line → more inequality → higher Gini.","Gini coefficient: 0 = perfect equality, 1 = perfect inequality. Know the direction.","⚠️ EXCLUSION: AP Micro CED explicitly states drawing the Lorenz curve AND calculating the Gini coefficient are BEYOND THE SCOPE of the AP Exam. You must understand what they represent and how to interpret them, but you will NOT be asked to draw the curve or calculate the Gini on a FRQ.","Government redistribution (progressive taxes, transfers) moves Lorenz toward equality (lower Gini)."]}/> 
  }},
  {id:"domtariff",icon:"🌍",title:"Tariff — Domestic Market Analysis",sub:"AP Micro Topic 2.9 — World price, imports, DWL triangles b+d",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="A tariff is a tax on imports. If China sells steel for $400/ton and the US imposes a $100 tariff, domestic buyers now pay $500. This HELPS domestic steel producers (they can now compete) but HURTS domestic car makers, builders, and consumers who pay more. The government collects the tariff revenue. But the total consumer loss is LARGER than the producer gain plus government revenue — creating two DWL triangles. This is why economists generally support free trade: tariffs protect a concentrated group of producers while imposing diffuse costs on millions of consumers."/><B t="Plain English" c="A tariff is a tax on imported goods. At the world price (Pw), domestic producers supply less than consumers demand so the gap is filled by imports. A tariff raises domestic price above Pw — helps domestic producers but hurts consumers and creates two DWL triangles."/><B t="Five Key Areas" c="a = producer surplus gain (domestic firms). b = DWL on production side. c = government tariff revenue. d = DWL on consumption side. CS loss = a+b+c+d. Net welfare loss = b+d (only the triangles are deadweight loss)."/></>,
    Diagram:<><DomTariffDiag/></>,
    "In-Depth":<><D t="Free Trade Baseline" c="At world price Pw: domestic quantity supplied (Qs_w) < domestic quantity demanded (Qd_w). Gap = imports. Consumer surplus is maximized; producer surplus smaller than under protection."/><D t="Effect of a Tariff" c="Tariff raises price from Pw to Pw+tariff. Domestic production rises to Qs_t. Demand falls to Qd_t. Imports shrink. CS falls by a+b+c+d. PS rises by a. Govt collects c. Net welfare loss = b+d."/><D t="Quota vs. Tariff" c="Identical effect on price and quantity. Critical difference: tariff → government collects area c as revenue. Quota → area c goes to whoever holds import licenses (often foreign exporters). Net DWL same (b+d) but tariff preferred from national welfare view."/></>,
    "AP Tips":<AP c={["Draw and label ALL areas: a (PS gain), b (DWL prod. side), c (govt revenue), d (DWL cons. side).","DWL = triangles b+d ONLY. Rectangle c is revenue — not deadweight loss.","Tariff vs quota: same P and Q effects but tariff → govt revenue; quota → importers capture area c.","AP Micro Topic 2.9: 'Identify DWL from a tariff' → shade ONLY triangles b and d."]}/>
  }},
];

const part3=[
  {id:"elas",icon:"↔️",title:"Elasticity",sub:"Ch 6 — Price, income, and cross elasticity",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="'Elasticity' just means 'how much does behavior change when price changes?' Two extreme examples: (1) Insulin for diabetics — if the price doubles, they still have to buy it. That's INELASTIC demand (steep demand curve, tiny quantity change). (2) Luxury handbags — if the price doubles, most people just stop buying. That's ELASTIC demand (flat demand curve, huge quantity change). The formula is always: % change in QUANTITY divided by % change in PRICE. If the answer is bigger than 1 → elastic (quantity changes a lot). If smaller than 1 → inelastic (quantity barely changes). This matters for businesses: if your product is inelastic (like gas or cigarettes), raising prices INCREASES revenue. If elastic, raising prices DECREASES revenue."/><B t="Plain English" c="Elasticity = sensitivity of quantity to a price (or income) change. Elastic: big response to price change (flat demand curve). Inelastic: small response (steep curve). The formula is always % change in Q divided by % change in the independent variable."/><Dl t="Key Formulas" items={["PED = %ΔQd / %ΔP (take absolute value for comparison)","If |PED| > 1: Elastic (quantity sensitive). |PED| < 1: Inelastic. |PED| = 1: Unit elastic.","Cross-Price Elasticity = %ΔQd of A / %ΔP of B → positive = substitutes; negative = complements","Income Elasticity = %ΔQd / %ΔIncome → positive = normal good; negative = inferior good","PES = %ΔQs / %ΔP → same direction, always positive (law of supply)"]}/></>,
    Diagram:<><ElasticDiag/><D t="Total Revenue Test" c="ELASTIC demand: price ↑ → TR decreases (customers flee). Price ↓ → TR increases. INELASTIC: price ↑ → TR increases (customers stay). Price ↓ → TR decreases. UNIT ELASTIC: price change doesn't change TR. This is the fastest way to identify elasticity on the AP exam."/></>,
    "In-Depth":<><Dl t="Determinants of Price Elasticity of Demand" items={["Availability of substitutes: more subs → more elastic (Pepsi vs. brand-name cereal)","Necessity vs. luxury: necessities (insulin) inelastic; luxuries (yacht) elastic","Budget share: larger share → more elastic (housing vs. salt)","Time horizon: more time → more elastic (can find substitutes, adjust behavior)","Breadth of market definition: broad (food) inelastic; narrow (Doritos) elastic"]}/><D t="Price Elasticity of Supply" c="Immediate period: perfectly inelastic (supply fixed — Picasso painting auction). Short run: somewhat inelastic (partial adjustment). Long run: more elastic (full adjustment, entry possible). Time is the key determinant of supply elasticity."/><APX t="Midpoint Formula for PED (AP Calculation Extra)" c="PED = [(Q2-Q1)/((Q2+Q1)/2)] / [(P2-P1)/((P2+P1)/2)]. The AP exam provides this formula but expects you to use it correctly. The midpoint method avoids asymmetry: going from $5 to $10 gives the same elasticity as $10 to $5."/></>,
    "AP Tips":<AP c={["Total Revenue Test is the fastest AP elasticity method — know it perfectly.","Cross elasticity: POSITIVE = substitutes (Coke & Pepsi). NEGATIVE = complements (cars & gas). ZERO = unrelated.","Perfectly inelastic demand = VERTICAL curve. Perfectly elastic = HORIZONTAL curve. Both extremes tested.","AP will give you a table or graph and ask you to calculate PED. Use midpoint formula."]}/>
  }},
  {id:"util",icon:"😊",title:"Utility Maximization",sub:"Ch 7 — How consumers maximize satisfaction",tabs:["Simple","Diagram","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="'Utility' is just the economist's word for SATISFACTION or happiness you get from consuming something. Think about eating pizza slices at a party. The first slice is AMAZING — huge satisfaction. The second is great. The third is fine. By the fifth slice you're stuffed and barely enjoying it. The MARGINAL utility (satisfaction from each ADDITIONAL slice) is decreasing. This is the Law of Diminishing Marginal Utility, and it's universal. Your second car is less exciting than your first. The 10th pair of shoes less satisfying than the 1st. Consumers try to spend their limited income to maximize total satisfaction — and the math shows they do this by spreading spending so each dollar gives equal satisfaction across all goods."/><B t="Plain English" c="Utility = satisfaction from consuming a good. Marginal utility = extra satisfaction from one more unit. Law of Diminishing Marginal Utility: each additional unit gives LESS satisfaction than the previous one (1st slice >> 4th slice). You maximize utility by spreading spending so the last dollar on each good gives equal marginal utility."/><B t="The Rule" c="Maximize total utility when: MU_x / P_x = MU_y / P_y. 'The bang per buck must be equal across all goods.' If MU/P is higher for X, buy more X until equality is restored."/></>,
    Diagram:<><UtilityDiag/><D t="Reading the TU/MU Graph" c="TU rises quickly at first (high MU), then more slowly (falling MU), peaks when MU=0, may then decline (negative MU). The MU curve is the slope of TU at each point. AP Micro requires drawing BOTH curves with correct shape and MU=0 / TU-max relationship labeled."/></>,
    "In-Depth":<><D t="Law of Diminishing Marginal Utility" c="As consumption increases, MU eventually falls. Explains downward-sloping demand curve: you'll only buy more of a good at a lower price because each unit is worth less to you. This is the link between consumer theory and demand."/><D t="Diamond-Water Paradox" c="Water is essential but cheap. Diamonds are trivial luxuries but expensive. Why? We have so much water that the MARGINAL utility of one more unit is tiny. Few diamonds → MU of one more is enormous. Exchange value determined by marginal utility, not total utility."/><D t="Income and Substitution Effects" c="When price falls: (1) Substitution effect — good is now cheaper relative to others → buy more. (2) Income effect — real purchasing power rises → can afford more of all goods. Both typically increase Qd → law of demand holds. (Giffen goods: income effect dominates and is negative → rare violation of law of demand.)"/></>,
    Examples:<><E t="Budget Allocation Example" c="$10 budget. Pizza $2, coffee $1. MU of last pizza = 20; MU of last coffee = 5. MU/P: pizza = 10; coffee = 5. Buy more pizza! Each dollar on pizza gives 10 utils vs. 5 for coffee. Shift spending from coffee to pizza until ratios equalize."/></>,
    "AP Tips":<AP c={["AP will give you a table of MUs and ask: optimal bundle? → Find where MU_x/P_x = MU_y/P_y.","If MU_x/P_x > MU_y/P_y → buy more X and less Y. State this direction clearly on FRQs.","Diminishing MU explains downward-sloping demand — both concepts tested together."]}/>
  }},
  {id:"ic",icon:"🎯",title:"Indifference Curve Analysis",sub:"Ch 7 Appendix — Higher utility theory",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="An indifference curve shows all combinations of two goods that give you EXACTLY THE SAME happiness. 3 pizzas + 4 movies might make you just as happy as 5 pizzas + 2 movies — both on the same curve. Higher curves = more happiness. The BUDGET LINE shows what you can afford. Your optimal choice is where the highest reachable indifference curve TOUCHES the budget line (tangency point). IMPORTANT: AP Micro explicitly says drawing indifference curves is BEYOND THE SCOPE of the AP exam. This is background theory only — you will not draw ICs on FRQs."/><B t="Plain English" c="An indifference curve (IC) shows all combinations of two goods that give a consumer the SAME total utility (equal satisfaction). Higher ICs = more utility. The consumer's optimum is where the HIGHEST attainable IC just touches (is tangent to) the budget line."/></>,
    Diagram:<><IndiffDiag/></>,
    "In-Depth":<><D t="Properties of Indifference Curves" c="(1) Downward sloping: to stay on same utility level, if you get more X, you must give up some Y. (2) Cannot cross: would imply contradictory preferences. (3) Convex to origin: reflects diminishing MRS — as you get more X, you're willing to give up less Y for even more X. (4) Higher = better (more utility)."/><D t="Marginal Rate of Substitution (MRS)" c="MRS = the rate at which a consumer willingly trades Y for X (staying on the same IC). MRS = MU_x / MU_y = slope of IC (absolute value). Diminishing MRS: as you consume more X, you're less willing to sacrifice Y for more X (convexity)."/><D t="Consumer Optimum" c="Highest IC tangent to budget line. At tangency: slope of IC = slope of budget line → MRS = P_x / P_y → MU_x/P_x = MU_y/P_y. This is the same condition as the utility-maximizing rule — just stated graphically."/><D t="Price Change and Income Change Effects" c="Price of X falls → budget line rotates outward on X axis → consumer moves to higher IC. New optimum on higher IC. Can decompose into substitution effect (rotate along old IC) and income effect (shift to new IC) — graphical version of what we covered in utility max."/></>,
    "AP Tips":<AP c={["⚠️ IMPORTANT: The AP Micro CED explicitly states: indifference curves are BEYOND THE SCOPE of the AP Micro Exam. The content here is labeled AP Extra and draws on the textbook appendix — good background knowledge and may help you think through problems, but you will NOT be asked to draw indifference curves on AP Micro FRQs.","Indifference curves are covered in AP Micro course materials (textbook Chapter 7 Appendix) but are explicitly excluded from exam scope by the CED.","At optimum: MRS = Px/Py. Equivalently: MU_x/P_x = MU_y/P_y. Both say the same thing.","ICs cannot cross — if asked why, state it would imply A is both preferred to and indifferent from B, a contradiction.","Budget line rotation (price change) vs. budget line shift (income change) — draw both confidently."]}/>
  }},
  {id:"beh",icon:"🧠",title:"Behavioral Economics",sub:"Ch 8 — Why people don't always act rationally",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Traditional economics assumes people are perfectly rational robots who always make the best decision with available information. Real life: we're not robots. We're biased, emotional, and predictably irrational. BEHAVIORAL ECONOMICS studies how real humans actually decide — and finds we make systematic, predictable mistakes. Understanding these mistakes helps: (1) governments design better policies (making organ donation opt-OUT instead of opt-IN saved thousands of lives), (2) businesses market more effectively, and (3) you make better personal decisions by recognizing your own biases."/><B t="Plain English" c="Traditional economics assumes perfectly rational people. Behavioral economics documents predictable, systematic ways people are NOT rational. Understanding these helps explain real decisions — and design better policies through 'nudges' (choice architecture that makes the good option the default)."/></>,
    "In-Depth":<><Dl t="Key Behavioral Biases (Know These)" items={["Framing Effect: Same info presented differently → different choice ('90% survival' vs '10% mortality rate')","Anchoring: First number seen biases all subsequent judgments (car price negotiation)","Status Quo Bias: Prefer current state even when alternatives are better (organ donation opt-in vs opt-out)","Mental Accounting: Treating money differently based on source or label (won money vs. earned money)","Loss Aversion (Prospect Theory): Losses hurt ~2x more than equal gains feel good","Hyperbolic Discounting: Overvalue present vs. future — why people don't save enough","Endowment Effect: You value things more once you own them"]}/><D t="Nudging & Choice Architecture" c="Thaler & Sunstein (2008): instead of mandating behavior, redesign defaults. 401(k) auto-enrollment: employees save much more when they must opt OUT rather than opt IN. Same options, different default → radically different outcomes. Libertarian paternalism — preserves freedom while improving outcomes."/></>,
    "AP Tips":<AP c={["Loss aversion is the most-tested behavioral concept. Losses hurt 2x more than equivalent gains.","Nudging = changing choice architecture (default options) without restricting freedom. Classic AP Micro policy question.","Behavioral econ challenges the assumption of rational actors — the AP exam may ask you to evaluate this challenge."]}/>
  }},
];

const part4=[
  {id:"prodfn",icon:"⚙️",title:"The Production Function",sub:"AP Micro Topic 3.1 — TP, MP, AP, Diminishing Returns",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Imagine you own a small bakery. You have one oven (fixed). You start with 1 worker → can make 20 loaves/day. Add a 2nd worker → 38 loaves/day (18 more). 3rd worker → 54 loaves/day (16 more). 4th worker → 66 loaves/day (12 more). Notice: each additional worker adds LESS than the previous one. Why? One oven, getting crowded. Workers start waiting for oven time, bumping into each other. This is the LAW OF DIMINISHING MARGINAL RETURNS — the most important production concept. It only applies in the SHORT RUN when at least one input (the oven) is fixed. In the long run you can add more ovens."/><B t="Plain English" c="A production function shows how inputs (workers) turn into outputs (units produced). Three measures: Total Product (TP) = total output. Marginal Product (MP) = output from ONE more worker. Average Product (AP) = output per worker (TP ÷ L). Law of Diminishing Marginal Returns: at some point, adding more workers to a fixed factory causes each extra worker to add LESS output — not because they're lazy, but because the factory gets crowded."/></>,
    Diagram:<><ProdFnDiag/></>,
    "In-Depth":<><D t="Three Product Measures" c="Total Product (TP): all output from current workers. Marginal Product (MP) = ΔTP/ΔL — the extra output from hiring one more worker. Average Product (AP) = TP/L — output per worker. These three are always related: when MP > AP, AP is rising. When MP < AP, AP is falling. MP = AP at AP's maximum."/><D t="Law of Diminishing Marginal Returns" c="In the short run, with at least one fixed input (factory), adding more of the variable input (labor) eventually causes MP to fall. This happens because workers start competing for the same machines, space, and materials. IMPORTANT: diminishing returns begin when MP PEAKS and starts falling — NOT when MP becomes negative."/><D t="Connection to Cost Curves" c="When MP rises, MC falls (more output per worker = lower cost per unit). When MP falls (diminishing returns), MC rises. The MP curve and MC curve are mirror images: MP peaks where MC is at its minimum. This is why the MC curve is U-shaped."/><APX t="Production Function on the AP Exam" c="AP Micro Topic 3.1 requires you to: (1) Draw correctly labeled TP and MP/AP graphs. (2) Identify where diminishing returns begin (MP peak). (3) Calculate MP and AP from a table. (4) Explain why TP is concave (bowed downward) in the diminishing returns zone. The TP curve inflects (changes from accelerating to decelerating) exactly where MP peaks."/></>,
    "AP Tips":<AP c={["Diminishing returns ≠ negative returns. Returns diminish when MP starts falling, NOT when TP falls.","MP intersects AP at AP's maximum. This is exactly like MC intersecting ATC at ATC's minimum — same math.","On the AP FRQ: 'At what level of labor do diminishing marginal returns begin?' → where MP starts falling (its peak).","Given a table of TP values: MP = change in TP. AP = TP ÷ L. You must be able to calculate these numerically."]}/>
  }},
  {id:"costs",icon:"💰",title:"Businesses & Costs of Production",sub:"Ch 9 — Explicit, implicit, economic profit, cost curves",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Imagine you quit your $60,000/year job to open a bakery. Your costs include the obvious stuff: flour, rent, employees (EXPLICIT costs — money actually going out the door). But you ALSO gave up your $60,000 salary. That's an IMPLICIT cost — an opportunity cost that doesn't show up on your tax return. ECONOMIC PROFIT subtracts BOTH: if the bakery makes $80,000 revenue and has $50,000 in explicit costs, accounting profit = $30,000. BUT you gave up $60,000 in wages, so economic profit = $30,000 − $60,000 = negative $30,000. You're actually losing! This is why economists always include opportunity costs. 'Normal profit' (zero economic profit) means you're earning exactly your opportunity cost — just enough to stay in business."/><B t="Key Definitions" c="Explicit costs: actual cash payments (wages, rent). Implicit costs: opportunity costs of own resources (your time, your building). Accounting profit = TR - explicit costs. Economic profit = TR - explicit - implicit costs. Normal profit = economic profit = 0 (all resources earning exactly their opportunity cost)."/><Dl t="Cost Concepts — Know All Six" items={["Fixed Costs (FC): Don't vary with output (rent, insurance, equipment leases)","Variable Costs (VC): Vary with output (labor, materials, energy)","Total Cost (TC) = FC + VC","ATC = TC/Q = AFC + AVC","AVC = VC/Q","MC = ΔTC/ΔQ — THE MOST IMPORTANT COST — always determines profit-maximizing output"]}/></>,
    Diagram:<><CostDiag/></>,
    "In-Depth":<><D t="Law of Diminishing Returns (Short Run)" c="Adding more variable inputs (labor) to a fixed input (factory) → eventually MP falls → MC rises. This is why the MC curve is U-shaped and eventually upward sloping. Occurs because fixed input becomes a bottleneck."/><D t="Short Run vs. Long Run" c="Short run: at least one input is fixed (you can't change factory size overnight). Long run: ALL inputs are variable (can build new factory, enter/exit industry). Distinction matters because cost structures differ."/><D t="Economies & Diseconomies of Scale (Long Run)" c="Economies of scale: LRAC falls as output grows (large-scale efficiencies, specialization, bulk buying). Diseconomies: LRAC rises (coordination problems, bureaucracy, communication failures). Minimum efficient scale (MES) = minimum output at which LRAC is minimized. Determines industry structure."/></>,
    "AP Tips":<AP c={["Economic profit vs. accounting profit — always include implicit costs. Classic AP question.","Normal profit = zero economic profit = firm is earning exactly its opportunity cost. Should NOT shut down.","Shutdown rule (SR): P < min AVC → shut down immediately. Exit rule (LR): P < min ATC → exit industry.","MC cuts both ATC and AVC at their minimum points — essential for every firm diagram."]}/>
  }},
  {id:"pc",icon:"🏭",title:"Pure Competition — Short & Long Run",sub:"Ch 10–11 — Price takers, MR=MC, LR normal profit",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="There are four types of markets, ranging from perfectly competitive (no power) to monopoly (all power). A WHEAT FARMER represents pure competition: thousands of farmers sell identical wheat, so no single farmer can set price — they just accept whatever the market offers (they're price TAKERS). A LOCAL UTILITY (water company) is a monopoly: one seller, you have no choice, they set price. RESTAURANTS are in between: many choices, but each has a slightly different menu and vibe (monopolistic competition). Airlines are oligopoly: a few big carriers who watch each other's prices closely. The more market power (ability to set price), the less efficient and the more deadweight loss (value lost to society). Pure competition is the benchmark — most efficient."/><B t="Four Market Structures" c="(1) Pure Competition: many sellers, identical product, easy entry/exit, price takers. (2) Monopolistic Competition: many sellers, differentiated product, easy entry. (3) Oligopoly: few large sellers, barriers to entry, mutual interdependence. (4) Pure Monopoly: one seller, significant barriers. Pure competition = benchmark (most efficient)."/></>,
    Diagram:<><PCFirmDiag/><LRIndustryDiag/></>,
    "In-Depth":<><D t="Pure Competition: Key Features" c="Many sellers, identical (homogeneous) products, easy entry/exit, no price control → price takers. Firm's demand curve = perfectly elastic (horizontal) at market price. P = MR = AR for every competitive firm. Firm NEVER has market power."/><D t="Profit Maximization: MR = MC Rule" c="For ALL market structures, profit is maximized where MR = MC. If MR > MC: produce more (adding to profit). If MC > MR: produce less. For PC firm: MR = P, so produce where P = MC. This is both profit-max AND allocative efficiency in PC."/><D t="Long-Run Industry Supply Curves" c="Constant cost industry: entry of new firms doesn't change input prices → LRAS is horizontal. Most industries. Increasing cost: expansion bids up input prices → LRAS slopes upward. Decreasing cost: expansion creates input efficiencies → LRAS slopes downward (rare)."/><D t="Long-Run PC Equilibrium" c="If profit → entry → supply ↑ → P ↓ → profit erodes. If loss → exit → supply ↓ → P ↑ → loss eliminated. LR equilibrium: P = min ATC = MC → productive AND allocative efficiency. Normal profit only."/></>,
    "AP Tips":<AP c={["P = MR = AR for pure competitor. This is the line you draw on the firm's diagram.","MR = MC gives Q*. Then go up to the demand (=P) line for price. This EXACT procedure appears on FRQs.","LR PC equilibrium: P = min ATC = MC. Three-way equality — tested on nearly every AP Micro exam.","Break-even: P = ATC (normal profit). Shutdown: P = min AVC. These trigger points are heavily tested."]}/>
  }},
  {id:"mono",icon:"🏰",title:"Pure Monopoly",sub:"Ch 12 — Price maker, MR < P, regulation",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="A monopoly is when ONE company is the only seller of a product with no close substitutes. Think: only one company in your town can legally provide electricity. Or a company with a patent on a life-saving drug. Because there's no competition, the monopolist can charge MORE than what it costs to make the product. Here's the critical insight: to sell MORE units, a monopolist must LOWER the price for ALL units (since demand slopes down). This means the extra revenue from selling one more unit (MR) is LESS than the price. The monopolist maximizes profit at MR = MC, which gives a LOWER quantity and HIGHER price than a competitive market. Society loses — that gap is called Deadweight Loss."/><B t="Plain English" c="Monopolist = ONLY seller. Sets price by choosing quantity. To sell more, must lower price for ALL units → MR falls faster than price → MR < P always. Result: produces less at higher price than competition → allocative inefficiency → deadweight loss."/></>,
    Diagram:<><MonopDiag/></>,
    "In-Depth":<><D t="Barriers to Entry" c="Natural monopoly (huge economies of scale — utilities, rail). Legal barriers (patents, copyrights, licenses). Essential resource ownership (DeBeers and diamonds historically). Strategic barriers (predatory pricing to drive out rivals)."/><D t="Economic Effects vs. Pure Competition" c="Higher price, lower output, economic profit (sustained by barriers), income transfer from consumers to monopolist, deadweight loss (allocative inefficiency), possible X-inefficiency (complacency without competition)."/><D t="Price Discrimination" c="Charging different prices to different buyers for same product. Conditions: market power, distinguishable buyers with different elasticities, no resale possible. First degree (perfect): charge each buyer their maximum WTP → captures ALL consumer surplus, no DWL but max profit. Third degree (most common): students vs. adults, business vs. economy flights."/><D t="Regulated Monopoly" c="Socially optimal price: P = MC (allocatively efficient but may cause losses if P < ATC). Fair-return price: P = ATC (allows normal profit, sustainable). Dilemma: MC regulation requires subsidy; ATC regulation leaves some allocative inefficiency."/></>,
    "AP Tips":<AP c={["Monopolist has NO supply curve (no unique P-Q relationship). AP exam tests this directly.","Always: MR < P for monopolist because demand slopes down. MR = P only for perfect competitor.","Draw: find MR = MC → drop to Q axis (Qm) → rise to DEMAND curve (NOT MR) for Pm. Critical step.","Monopoly always charges on the ELASTIC portion of demand (where MR > 0) at profit max."]}/>
  }},
  {id:"natmonop",icon:"🏭",title:"Natural Monopoly & Regulation",sub:"AP Micro required diagram — declining LRATC, two regulation options",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Imagine competing with your city's water utility. You would need to dig up every street and lay your own pipe network — billions in fixed costs. It makes no economic sense to have two competing water networks. This is a NATURAL MONOPOLY: fixed costs so enormous that one firm serves the whole market cheaper than two firms could. The problem: without competition, the monopoly charges too much. So government REGULATES it instead of breaking it up. Two options: P = MC (allocatively efficient but causes losses — need a subsidy) or P = ATC (fair return, normal profit, but still above MC). This is the one case where monopoly is the efficient structure — we just regulate the price."/><B t="Plain English" c="A natural monopoly exists when one firm can supply the entire market at lower cost than two or more firms could. This happens when economies of scale are so large that ATC keeps falling across the whole range of market demand — so having multiple firms would mean each produces at a higher cost. Examples: water utilities, electricity grids, rail lines. The government typically allows the monopoly but regulates its price."/></>,
    Diagram:<><NatMonopDiag/></>,
    "In-Depth":<><D t="Why Natural Monopoly Exists" c="Huge fixed costs (pipes, power lines, rail tracks) spread over more output → ATC keeps declining. A second firm would have to duplicate these fixed costs, making both firms' ATC higher than if one firm served everyone. The market 'naturally' tends to a single supplier. ATC > MC everywhere (MC is always below ATC when ATC is declining)."/><D t="Unregulated Outcome (Pm, Qm)" c="Without regulation, the monopolist sets MR = MC → Qm and charges Pm (read from demand curve). Earns economic profit. Pm > MC → allocatively inefficient. Consumers pay too much, too little is produced relative to social optimum."/><D t="Socially Optimal Regulation: P = MC" c="Setting P = MC achieves allocative efficiency (price reflects true social cost). But for a natural monopoly, MC < ATC everywhere, so P = MC < ATC → the firm earns a loss. Government must provide a subsidy to keep the firm operating. Produces Qs > Qm at price Ps < Pm."/><D t="Fair-Return Regulation: P = ATC" c="Setting P = ATC allows the firm to earn exactly normal profit (zero economic profit — covers all costs including opportunity costs). Not allocatively efficient (P > MC) but avoids the subsidy problem. Produces Qf between Qm and Qs. The practical compromise: less DWL than unregulated, no subsidy needed."/></>,
    "AP Tips":<AP c={["Natural monopoly: ATC always declining, MC always below ATC. This is what makes the diagram distinct from regular monopoly.","Two regulation options on the diagram: P=MC (allocatively efficient but causes loss) vs P=ATC (normal profit, second-best).","AP Micro FRQ: 'Show the fair-return price on the diagram' → where demand intersects ATC. 'Show socially optimal price' → where demand intersects MC.","Socially optimal P=MC causes a LOSS (ATC > P) → requires govt subsidy to be sustainable."]}/>
  }},
  {id:"govintmkt",icon:"⚖️",title:"Government Intervention Across Market Structures",sub:"AP Micro Topic 6.4 — Tax/subsidy effects differ by market type",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="A dollar tax sounds simple, but its effects depend on what type of market you tax. In PERFECT COMPETITION: the tax shifts supply left, raises buyer price, lowers seller price, both sides share the burden based on elasticities. In MONOPOLY: the firm already charges above MC, so a per-unit tax shifts MC up and the monopolist produces even less. But a LUMP-SUM tax (a fixed fee regardless of output — like a license fee) only raises fixed costs: it shifts ATC up but LEAVES MC UNCHANGED. So the monopolist does not change quantity or price — only profit falls. This lump-sum vs. per-unit tax distinction on a monopolist is a CLASSIC AP Micro FRQ topic."/><B t="Plain English" c="A per-unit tax or subsidy doesn't work the same way in every market. In a perfectly competitive market, the burden is shared between buyers and sellers based on elasticities, and the firm is a price taker so it just adjusts quantity. In a monopoly, the firm has pricing power — a tax may cause a larger price increase than in competition, and the DWL compounds on top of existing monopoly DWL."/></>,
    "In-Depth":<><D t="Tax in a Perfectly Competitive Market" c="Tax shifts MC/supply left. Competitive firm is a price taker — it simply produces less (Q falls). Market price rises by part of the tax (buyer burden) and seller net price falls by the rest (seller burden). DWL = triangle of lost transactions. Long run: if tax pushes P below ATC, firms exit → market supply contracts further."/><D t="Tax on a Monopolist" c="A per-unit tax increases the monopolist's MC (shifts MC upward). Monopolist re-optimizes: new MR = MC at lower Q → higher P. The monopolist passes on MORE than just the tax in some cases because of the shape of its demand curve. DWL increases further — now there's both the original monopoly DWL PLUS additional DWL from the tax."/><D t="Subsidy on a Perfectly Competitive vs. Monopoly Market" c="Competitive market: subsidy lowers MC → supply shifts right → lower price, more output, moves CLOSER to efficient quantity. May correct a positive externality by funding production to the social optimum. Monopoly: subsidy lowers MC → monopolist moves down MC → lower price and higher output → reduces but doesn't eliminate the monopoly DWL (unless subsidy is perfectly calibrated to make P = MC)."/><APX t="AP Micro Topic 6.4 — What They Actually Test" c="The AP exam tests: (1) Show graphically how a per-unit tax affects a perfectly competitive firm AND the market simultaneously. (2) Show how a lump-sum tax (fixed amount regardless of output) vs. per-unit tax affects a monopolist differently. A LUMP-SUM tax only shifts the ATC curve (not MC) → doesn't change the monopolist's profit-max Q or P! This distinction appears on AP FRQs."/></>,
    "AP Tips":<AP c={["Lump-sum tax: shifts ATC up only, NOT MC. Monopolist's Q and P unchanged. Only profit changes.","Per-unit tax: shifts MC up. Monopolist's Q falls and P rises. Affects output decision.","Tax in competitive market: DWL = triangle. Monopoly + tax: double DWL (monopoly DWL + tax DWL).","AP FRQ tip: always draw BOTH firm and market diagrams for competitive industry questions."]}/>
  }},
  {id:"mk4",icon:"🔑",title:"Four Market Structures — Comparison",sub:"Quick reference for all four structures",tabs:["Table","Monopolistic Comp.","Oligopoly","AP Tips"],cnt:{
    Table:<><B2 c="Market structures range from pure competition (thousands of identical sellers, no price power — like wheat farming) to pure monopoly (one seller, total price power — like a local utility). Most real markets fall in between. The key variables: How many sellers? How different are their products? How hard is it to enter? More competition = lower prices, more efficiency, better for society. Less competition = higher prices, less output, DWL. Every market structure still uses MR=MC to maximize profit — that rule never changes."/><div className="db" style={{overflowX:"auto"}}><table className="mktable"><thead><tr><th>Feature</th><th>Pure Competition</th><th>Mono. Comp.</th><th>Oligopoly</th><th>Pure Monopoly</th></tr></thead><tbody>
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
    "AP Tips":<AP c={["Four market structures comparison table — memorize ALL rows. AP FRQ often asks to 'compare X to pure competition in terms of efficiency.'","Monopolistic competition: LR normal profit + excess capacity. Oligopoly: LR economic profit possible.","Prisoner's dilemma: know dominant strategy AND Nash equilibrium. Classic AP game theory question.","Only pure competition achieves both productive AND allocative efficiency in the long run.","EXCL: Nash equilibrium with more than 2 players/actions, mixed-strategy equilibria, and extensive-form games are BEYOND SCOPE of AP Exam.","EXCL: A graph showing inefficiency from collusion is BEYOND SCOPE of AP Exam — understand collusion conceptually only."]}/>
  }},
];

const part5=[
  {id:"rm",icon:"👷",title:"Factor Markets: Wages, Rent, Interest & Profit",sub:"Ch 14–16 — Derived demand, MRP, monopsony, loanable funds",tabs:["Simple","Diagrams","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Why does a surgeon earn $350,000/year while a fast food worker earns $25,000? The answer is SUPPLY AND DEMAND — but for LABOR. Think of hiring like buying any product: (1) How much is each worker worth to you? (Demand) (2) How many people are available and willing to work? (Supply) A surgeon is worth a lot because their skills are rare (low supply) and they generate huge value for hospitals (high demand). A fast food worker has a large pool of applicants (high supply) and is more easily replaced (lower specialized demand). The KEY formula: hire workers until what they bring in (MRP = Marginal Revenue Product) equals what they cost (wage). This is EXACTLY like the MR = MC rule for output."/><B t="Plain English" c="Resource markets work just like product markets — but demand for resources is DERIVED from demand for the final good. Firms hire workers not for their own sake, but to produce things consumers want. The key rule: hire until MRP = MRC (marginal revenue product = marginal resource cost)."/><Dl t="Factor Income Payments" items={["Labor → Wages (competitive: W = MRP; monopsony: W < MRP)","Land → Rent (supply perfectly inelastic → all rent is economic surplus above opportunity cost)","Capital → Interest (determined in loanable funds market by saving supply and investment demand)","Entrepreneurship → Profit (residual; reward for bearing uninsurable risk and organizing production)"]}/></>,
    Diagrams:<><LaborDiag/><MonopsonyDiag/><LFDiag/></>,
    "In-Depth":<><D t="Derived Demand" c="Demand for resources comes from demand for the final product. If pizza demand rises → demand for pizza workers rises. If technology replaces workers → DL shifts left. Key: DL = MRP curve. MRP = MP × MR (for monopolist product market) = MP × P (for competitive product market)."/><D t="MRP = MRC Hiring Rule" c="Hire inputs until MRP = MRC. For competitive labor market: MRC = wage (constant). For monopsony: MRC > wage (must raise wage for all workers). Rule: hire until MRP = MRC, just like produce until MR = MC. Two sides of the same optimization problem."/><D t="Monopsony" c="Single employer: faces upward-sloping labor supply → to hire more workers, must pay higher wage for ALL → MRC > wage. Monopsonist hires LESS (Lm) and pays LESS (Wm) than competitive market. Creates DWL (like monopoly on the buyer side). Examples: company towns, some hospital/school districts."/><D t="Minimum Wage in Competitive vs. Monopsony Markets" c="Competitive market: min wage above equilibrium → unemployment (QL < L*). Monopsony market: minimum wage can INCREASE employment AND wages simultaneously — if set between Wm and W_c, it eliminates the monopsony distortion. This is why empirical studies often find minimum wage increases don't cause unemployment — many labor markets have monopsonistic elements."/><D t="Loanable Funds Market" c="Determines real interest rate. Supply = saving (households, businesses, govt surpluses, foreign savers). Demand = borrowing for investment (firms), government borrowing (deficits). Equilibrium: r* where S = I. Government deficit shifts D right → r rises → crowding out of private investment."/></>,
    "AP Tips":<AP c={["MRP = MP × P (competitive firm). Hire until MRP = W (competitive labor market).","Monopsony: MRC > W; hires less at lower wage. Draw diagram: MRC above S_L, find Q where MRP = MRC, drop to S_L for wage.","Loanable funds market: S = saving. D = investment demand. Government deficits shift D right → r rises → crowding out.","AP Micro almost always has a labor market FRQ. Know both competitive and monopsony diagrams cold."]}/>
  }},
  {id:"laborsupply",icon:"👥",title:"Labor Supply Shifters, VMPL vs. MRP",sub:"AP Micro Topic 5.2 — What shifts labor supply; VMPL distinction",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="The Labor Demand curve (DL) shows how many workers firms want at each wage. But what about the supply side — what shifts the LABOR SUPPLY curve? Think about it from a worker's perspective: you decide whether to take a job based on (1) the wage offered, (2) what other jobs pay, (3) whether you enjoy the work, (4) non-wage benefits. If immigration increases the number of workers, SL shifts RIGHT → wages fall. If many workers retire, SL shifts LEFT → wages rise. Separately: VMPL (Value of Marginal Product of Labor) is used only for perfectly competitive firms. MRP is the general formula. This distinction is tested on AP FRQs."/><B t="Plain English" c="Labor supply can shift left or right depending on outside wages, worker preferences, the size of the labor force, and non-wage factors. Separately: VMPL (Value of Marginal Product of Labor) is the term used specifically for a perfectly competitive firm in the OUTPUT market. MRP is the general term (works for any market). For competitive output markets ONLY: VMPL = MP × P = MRP. For a monopolist: MRP = MP × MR which is LESS than MP × P."/></>,
    "In-Depth":<><D t="Labor Supply Shifters — What Shifts SL" c="Labor supply shifts RIGHT (more workers at every wage) when: (1) More workers enter the labor force (immigration, population growth, more women entering workforce). (2) Wages in alternative occupations fall (opportunity cost of this job decreases). (3) Workers develop stronger preference for this type of work. (4) Non-wage benefits improve (better working conditions, job security). Labor supply shifts LEFT when opposite occurs."/><D t="VMPL vs. MRP — The Critical Distinction" c="VMPL = MP × P (value of marginal product of labor). Used for firms that are price takers in the OUTPUT market (perfectly competitive firms). MRP = MP × MR (marginal revenue product). Works for ALL firms. For a competitive output market: MR = P, so VMPL = MRP. For a monopolist: MR < P, so MRP < VMPL. The monopolist's labor demand is LOWER than a competitive firm with the same production technology — the monopolist restricts output, which reduces the value it attributes to additional workers."/><D t="Why Monopoly in the Output Market Affects Labor Demand" c="A monopolist produces less output (MR=MC at lower Q than P=MC). Since it produces less, it needs fewer workers. The MRP curve for a monopolist lies below the VMPL curve. This means in industries with monopolistic output markets, workers are paid less and fewer are hired than would be the case in competitive output markets."/></>,
    "AP Tips":<AP c={["VMPL = MP × P — ONLY for perfectly competitive output markets.","MRP = MP × MR — for ALL market structures. For competitive firms: MRP = VMPL.","Monopoly in output market → MRP < VMPL → fewer workers hired at lower wage than in competition.","Labor supply shifters: immigration, alternative wages, workforce preferences, non-wage benefits. These shift the SL curve — different from wage changes which move along SL."]}/>
  }},
  {id:"wagesdiff",icon:"💼",title:"Wage Differentials, Unions & Collective Bargaining",sub:"Ch 17 — Why wages differ, unions, bilateral monopoly, minimum wage",tabs:["Start Here","In-Depth","Examples","AP Tips"],cnt:{
    "Start Here":<><B2 c="Why does a surgeon earn 10x more than a barber? Both work hard, both provide a service. The answer is supply and demand for LABOR — but with some important twists. (1) SUPPLY differences: very few people can become surgeons (8+ years of training, high intelligence required) → supply is low → wages are high. Millions of people can cut hair → supply is high → wages are low. (2) DEMAND differences: hospitals desperately need surgeons (high demand, huge revenue per worker) → wages bid up. Barbershop demand is limited. (3) UNIONS can artificially raise wages above equilibrium by restricting labor supply or negotiating collectively — a barbers union that limits licenses would push barber wages up. Understanding why wages differ is essential for AP Micro."/><Dl t="Five Causes of Wage Differentials" items={["(1) Differences in human capital: education and skills increase productivity → higher MRP → higher wages. A software engineer's 4-year CS degree → $120K salary vs. high school diploma → $35K.","(2) Noncompeting groups: occupations that require rare talents or long training create separate labor markets. A superstar athlete and an accountant literally don't compete for the same jobs.","(3) Compensating differences: dangerous, unpleasant, or irregular work pays more to attract workers. Coal miners, offshore oil rig workers, night shift employees get wage premiums.","(4) Market imperfections: discrimination, lack of information, geographic immobility, union rules can all cause wages to deviate from competitive equilibrium.","(5) Pure supply and demand: if only 50 people in the world can play professional basketball at the highest level, those 50 people earn astronomical wages because teams compete fiercely for them."]}/></>,
    "In-Depth":<><D t="Unions: How They Raise Wages" c="Labor unions are organizations of workers that negotiate collectively with employers. Strategy 1 — Demand enhancement: unions lobby for policies that increase demand for union labor (tariffs on imported goods, licensing laws). Strategy 2 — Supply restriction (craft unions): limit entry into the occupation through apprenticeships, licensing exams, long training periods. By restricting supply, the union shifts SL left → wages rise. Strategy 3 — Industrial union / collective bargaining: all workers in an industry join one union (auto workers, teachers). They negotiate as a bloc — if management won't agree, all workers strike. This monopsonistic-like power forces wages above competitive equilibrium."/><D t="Bilateral Monopoly" c="Interesting case: monopsony employer (one buyer of labor) vs. a strong union (one seller of labor). The monopsonist wants to pay Wm (below competitive wages). The union wants to charge Wu (above competitive wages). They negotiate — final wage somewhere between Wm and Wu. Neither side has all the power; the outcome depends on bargaining skill, strike threats, and alternatives each side has. This bilateral monopoly model appears in AP Micro FRQs about wage determination when both buyer and seller have market power."/><D t="Minimum Wage: Two Very Different Effects" c="In a COMPETITIVE labor market: minimum wage above equilibrium → creates a surplus of labor (unemployment). More people want to work at the higher wage; fewer firms want to hire. Creates a DWL triangle. In a MONOPSONY labor market: minimum wage can actually INCREASE BOTH wages AND employment simultaneously. Why? The monopsonist was restricting hiring to hold wages down — the minimum wage removes that distortion. For wages set between Wm and Wc (competitive wage), employment rises. This is the empirical finding that confuses people — in monopsonistic markets, minimum wage increases don't necessarily cause unemployment."/><D t="Pay-for-Performance Plans" c="Firms use pay structures to solve information problems (managers can't perfectly monitor every worker). Types: (1) Piece rates — pay per unit produced (apple pickers, sales reps on commission). Ties pay to output directly. (2) Profit sharing — employees get a share of company profits → they work harder because they benefit. (3) Stock options — workers can buy company stock at a set price → they want the company to succeed. (4) Efficiency wages — pay ABOVE market rates to attract better workers and reduce turnover and shirking. McDonald's could pay less, but paying more reduces costly employee turnover."/></>,
    Examples:<><E t="Compensating Differentials in Real Life" c="Oil rig workers in the Gulf of Mexico earn $80,000+ per year for dangerous, isolated work. The same skills on shore would pay $40,000. The $40,000 premium is a compensating differential — extra pay to attract workers to undesirable conditions. Similarly: night shift nurses, hazmat cleanup workers, Alaskan fishermen, and soldiers in combat zones all receive wage premiums reflecting their dangerous or unpleasant working conditions."/><E t="Teacher vs. Software Engineer — Same Education" c="A 4-year degree in education vs. computer science. Both take 4 years. But CS starting salary: $90,000. Education starting: $35,000. Why? (1) Supply: many more people major in education (some with limited alternatives). (2) Demand: tech companies generate huge revenue per employee → high MRP → high wages. School districts are constrained by property tax budgets. (3) Human capital: CS skills are highly specific and scarce. This wage gap has widened over decades as tech demand grew faster than supply."/></>,
    "AP Tips":<AP c={["Wage differentials question format: always explain both demand AND supply factors.","Bilateral monopoly: monopsonist (one buyer) + union (one seller). Wage between Wm and competitive W. Neither side gets their ideal.","Minimum wage in competitive market → unemployment. In monopsony → may increase employment. KNOW BOTH.","Pay-for-performance plans solve the principal-agent problem: aligning worker incentives with firm goals."]}/>
  }},
  {id:"rentinterest",icon:"🏦",title:"Economic Rent, Interest, Present Value & Profit",sub:"Ch 18 — Land, capital returns, time value of money, profit sources",tabs:["Start Here","In-Depth","AP Tips"],cnt:{
    "Start Here":<><B2 c="There are four factors of production: Land, Labor, Capital, and Entrepreneurship. We've covered wages (payment for labor). Now: RENT = payment for land. INTEREST = payment for capital (borrowing money). PROFIT = payment for entrepreneurship (running a business and bearing risk). These aren't just vocabulary — they explain why your landlord charges rent, why banks charge interest on loans, and why some businesses earn enormous profits while others go bankrupt. The economic definitions are slightly different from everyday usage, which is why this chapter trips people up."/><Dl t="Three Factor Payments Explained Simply" items={["ECONOMIC RENT: Payment for land and other resources whose supply is PERFECTLY FIXED. Your city can't create more land in downtown Manhattan — so if demand for that space rises, ALL the benefit goes to landowners as higher rent. Supply is vertical (perfectly inelastic), so demand alone determines price.","INTEREST: The price paid for the use of money over time. You can have $100 today or $100 in a year. Rational people prefer $100 today (time preference). To get them to wait, you pay interest. Interest rates are determined in the LOANABLE FUNDS market — higher rates when investment demand is high or saving is low.","PROFIT: The residual after all other factors are paid. Profit rewards innovation, risk-taking, and bringing resources together productively. It's also a SIGNAL — high profit attracts new firms; losses drive firms out. Without profit (and loss), resources wouldn't flow to their most valuable uses."]}/></>,
    "In-Depth":<><D t="Economic Rent: Why Land is Special" c="Land is the only factor of production with a PERFECTLY INELASTIC supply — you can't manufacture more land. This means: if demand for land increases, the ENTIRE price increase goes to the landowner as rent. There's no supply response. Example: a beachfront property becomes valuable not because of anything the landowner did, but because people want to be near the beach. The landowner captures all that value as rent. Henry George (1879) proposed taxing land rent heavily: since land supply is fixed, a land tax can't reduce the quantity supplied — it just transfers rent from landowners to government without creating distortions."/><D t="Interest Rates: The Price of Time" c="Interest exists because of TIME PREFERENCE: people value goods now more than goods later. The interest rate is the price you pay to get goods now rather than waiting. Determined in the loanable funds market: supply = saving (households lend their savings), demand = investment (firms borrow to buy equipment). Key factors affecting interest rates: (1) Risk — riskier loans charge higher rates (credit cards vs. mortgages). (2) Maturity — longer loans usually charge more (yield curve). (3) Loan size — smaller loans have higher rates per dollar (fixed costs). (4) Taxability — tax-exempt bonds pay lower rates because the after-tax return is competitive."/><D t="Present Value: Why $1,000 Tomorrow ≠ $1,000 Today" c="Present value (PV) = the value TODAY of money you'll receive in the future. Formula: PV = Future Value / (1 + r)^n, where r = interest rate and n = years. Example: you'll receive $1,100 one year from now. If interest rate = 10%, PV = $1,100/1.10 = $1,000. That means $1,000 today and $1,100 in one year are EQUIVALENT at a 10% interest rate. This concept is fundamental to every business investment decision: should you spend $500,000 on a machine that saves $100,000/year for 6 years? Discount all future savings back to present value and compare to cost."/><D t="Economic Profit: Why It Varies" c="Economic profit = Revenue − all costs (explicit + implicit). Sources of profit: (1) Innovation — introducing a new product or process gives temporary monopoly power and profit before competitors catch up. (2) Risk-bearing — businesses that take on uninsurable risks (like launching a new restaurant) earn profits if successful. (3) Market power — firms with monopoly or oligopoly power restrict output and earn sustained profits. Profit signals: rising profits attract entry → competition erodes profit. Falling profits (losses) cause exit → remaining firms become profitable again. This profit/loss signaling mechanism is how market economies allocate resources."/></>,
    "AP Tips":<AP c={["Economic rent: supply perfectly inelastic → demand ALONE determines price. Can tax 100% without reducing quantity.","Interest rates: determined by loanable funds market. Government borrowing shifts demand right → crowding out.","Present value: PV = FV / (1+r)^n. Higher interest rate → lower present value of future money.","Profit is both a reward (for innovation/risk) and a signal (attracts entry, drives exit). AP Micro tests both roles."]}/>
  }},
  {id:"publictax",icon:"🏛️",title:"Public Finance: Taxes, Spending & Tax Incidence",sub:"Ch 20 — Tax types, benefits vs ability-to-pay, tax incidence, efficiency loss",tabs:["Start Here","In-Depth","Examples","AP Tips"],cnt:{
    "Start Here":<><B2 c="The government needs money to function — to pay for roads, schools, military, Social Security, and everything else. It collects this money through TAXES. But not all taxes are designed equally, and who actually BEARS the burden of a tax often isn't who officially pays it. This chapter covers two big questions: (1) What PRINCIPLES should guide tax policy? (2) Who REALLY pays different types of taxes? These are some of the most debated topics in economics and politics, and the answers often surprise people."/><Dl t="Three Tax Structures" items={["PROGRESSIVE TAX: As your income rises, you pay a higher PERCENTAGE in taxes. The US federal income tax: 10% on first $10k, 12% on next bracket, up to 37% on income above $500k. The more you earn, the larger the share going to taxes. Argument: those with higher incomes have greater ability to pay.","REGRESSIVE TAX: As your income rises, you pay a LOWER percentage. Sales taxes are regressive: if you earn $20,000 and spend all of it, you might pay $1,400 in sales tax = 7% of income. If you earn $200,000 and spend $100,000, same $7,000 in sales tax = 3.5% of income. Poorer people spend a larger fraction of income.","PROPORTIONAL (FLAT) TAX: Same percentage at all income levels. Earn $30,000, pay 15% ($4,500). Earn $300,000, pay 15% ($45,000). Simple, but controversial."]}/></>,
    "In-Depth":<><D t="Two Principles of Taxation" c="(1) BENEFITS-RECEIVED PRINCIPLE: those who use a government service should pay for it. Gas taxes funding roads: drivers pay taxes that fund highways they drive on. Park entrance fees. The problem: public goods like national defense benefit everyone equally, making it impossible to charge only those who 'use' it. (2) ABILITY-TO-PAY PRINCIPLE: those with higher incomes can afford to pay more taxes, regardless of benefits received. Progressive income taxes embody this principle. The debate between these two philosophies drives most tax policy arguments."/><D t="Marginal vs. Average Tax Rate — Critical Distinction" c="AVERAGE tax rate = total taxes paid / total income. If you earn $80,000 and pay $13,000 in taxes, average rate = 16.25%. MARGINAL tax rate = the rate on your LAST (next) dollar of income. In a progressive system, this is higher than your average rate. Why it matters for behavior: if the marginal rate is 37%, earning one more dollar nets you only $0.63. High marginal rates theoretically reduce incentives to earn more. This is the core of supply-side economics: cut marginal rates → people work more → economy grows. The Laffer Curve suggests a marginal rate of 100% produces zero revenue (no one would work)."/><D t="Tax Incidence: Who Really Bears the Burden?" c="The LEGAL incidence of a tax (who writes the check) often differs from the ECONOMIC incidence (who actually bears the burden). Key insight: the more INELASTIC your supply or demand, the more of the tax burden you bear. Example: employer pays $4/hr Social Security tax. In a competitive labor market, this shifts labor demand left — wages fall and/or employment falls. Workers actually bear part of the burden even though the employer writes the check. Cigarette taxes: demand is inelastic (addicts can't easily quit) → consumers bear most of the burden. Corporate income tax: burden falls partly on shareholders (lower dividends), partly on workers (lower wages), and partly on consumers (higher prices) — economists still debate the split."/><D t="Efficiency Loss of Taxation" c="EVERY tax (except a pure land tax or lump-sum tax) creates a DWL (efficiency loss). Why? Taxes make activities more expensive → people do less of the activity. Sales tax reduces consumption. Income tax reduces work (or shifts it to untaxed activities). The DWL equals the value of transactions that would have occurred but for the tax. The key rule: taxes on inelastic goods create less DWL (behavior doesn't change much) — this is why economists often favor taxing inelastic goods like land and cigarettes over taxing labor and capital, which have more elastic supply."/></>,
    Examples:<><E t="Who Really Pays Payroll Taxes?" c="Social Security payroll taxes: 6.2% paid by employees, 6.2% paid by employers. But economics shows the split doesn't matter much — both halves ultimately fall on wages. If the employer must pay $0.62 for every $1 of wages, they'll pay workers $0.62 less than otherwise. The total compensation (wage + employer taxes) is what employers care about. In competitive labor markets, economic incidence depends on elasticities, not legal incidence."/><E t="Which Taxes Are Most Regressive?" c="Sales and excise taxes are the most regressive. Poor families spend nearly all their income on consumption (food, rent, gas) and pay sales tax on all of it. Wealthy families save much of their income, which is never subject to sales tax. A $1 flat tax on a gallon of gas takes 0.004% of a millionaire's daily income but might take 0.1% of a minimum wage worker's — 25x the relative burden. This is why economists and policy advocates often propose replacing sales taxes with income taxes."/></>,
    "AP Tips":<AP c={["Progressive = higher income → higher rate. Regressive = higher income → lower rate. Proportional = flat rate.","Tax incidence: whoever is more INELASTIC bears more burden. Not who writes the check.","Marginal vs average rate: always distinguish these. AP Macro and Micro both test this.","All taxes except lump-sum and land taxes create DWL. The more elastic demand/supply, the more DWL."]}/>
  }},
];

const part6=[
  {id:"gdp",icon:"📈",title:"Measuring GDP & National Income",sub:"Ch 25 — Expenditure approach, income approach, real vs. nominal",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="GDP stands for Gross Domestic Product — the total dollar value of everything a country produces in a year. Think of it as the economy's report card. If GDP is growing, more stuff is being made, more people are employed, incomes are rising. If GDP is falling (two straight quarters = recession), factories are idle, people are losing jobs. We calculate GDP by adding up four spending categories: (C) households buying food, cars, Netflix subscriptions; (I) businesses buying equipment and building factories; (G) government buying tanks, roads, teacher salaries; (Xn) selling to foreigners (exports) minus what we buy from them (imports). One critical rule: only count FINAL goods (the bread, not the flour used to make it) to avoid double-counting."/><B t="The GDP Formula" c="GDP = C + I + G + Xn. C = Consumer spending (~70% of US GDP). I = Gross Private Domestic Investment (equipment, construction, inventory changes — NOT stock purchases). G = Government purchases (NOT transfer payments). Xn = Net Exports = Exports - Imports (negative for US — trade deficit)."/></>,
    "In-Depth":<><D t="What GDP Includes and Excludes" c="INCLUDES: final goods only (not intermediate — avoids double counting), domestically produced, market transactions. EXCLUDES: used goods (not new production), financial transactions (stocks/bonds), transfer payments (Social Security, welfare), nonmarket activities (home cooking, volunteer work), underground economy."/><D t="Nominal vs. Real GDP" c="Nominal GDP: measured at current prices (output + price changes). Real GDP: adjusted for inflation (measures ONLY actual output changes). To compare output across years, ALWAYS use Real GDP. GDP Deflator = (Nominal GDP / Real GDP) × 100."/><D t="Income Approach to GDP" c="GDP = Compensation of employees + Rents + Interest + Proprietors' income + Corporate profits + Taxes on production/imports. This equals expenditure approach by identity: every dollar spent = a dollar of income for someone."/><D t="GDP Shortcomings" c="Misses: non-market activities (household work), underground economy, quality improvements, income distribution (same GDP can have very different equality), environmental degradation, leisure, subjective well-being. GDP = output scoreboard, not happiness meter."/></>,
    Examples:<><E t="Avoiding Double Counting" c="Ford buys $500 in steel → makes $25,000 car. GDP counts only the $25,000 final good. Steel counted once (as Ford's input, its value already in the car). Value-added at each stage = GDP by production approach."/><E t="Investment vs. Financial Investment" c="When Apple buys a new factory = $500M investment (counted in I). When you buy $500M of Apple stock = financial transaction (NOT counted in GDP). Only PHYSICAL capital investment counts."/></>,
    "AP Tips":<AP c={["GDP formula: C + I + G + Xn. Know every component — what's in and what's out.","Transfer payments (Social Security, welfare) are NOT in G. They are NOT in GDP.","Nominal grows with inflation. Real GDP removes inflation. AP Macro ALWAYS uses real GDP for output comparisons.","Recession = two consecutive quarters of declining REAL GDP."]}/>
  }},
  {id:"bci",icon:"📉",title:"Business Cycles, Unemployment & Inflation",sub:"Ch 27 — Recession, types of unemployment, CPI, costs of inflation",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="The economy doesn't grow in a straight line — it cycles up and down like waves. EXPANSION: companies are hiring, people are spending, GDP is growing, life is good. PEAK: maximum output, almost everyone who wants a job has one (unemployment very low), but prices start rising (inflation). RECESSION: output falls for at least two consecutive quarters, companies lay off workers, people cut spending. TROUGH: the bottom of the cycle, highest unemployment, lowest output. Then recovery begins again. The government tries to smooth these cycles: when the economy tanks, it can spend more (fiscal policy) or lower interest rates (monetary policy) to stimulate demand."/><B t="Business Cycle Phases" c="Peak (max output, low unemployment) → Recession (declining output, 2+ quarters falling real GDP, rising unemployment) → Trough (bottom) → Expansion/Recovery (rising output, falling unemployment). Driven by investment swings and demand/supply shocks."/><Dl t="Three Types of Unemployment" items={["Frictional: Between jobs voluntarily. Normal, healthy, indicates a dynamic economy.","Structural: Skills mismatch — workers' skills no longer match available jobs. More serious, longer duration.","Cyclical: Insufficient aggregate demand — not enough spending to employ everyone. The 'bad' kind during recessions.","Full Employment / NRU = Frictional + Structural only. No cyclical. ≈ 4–6% in US."]}/></>,
    "In-Depth":<><D t="Measuring Unemployment" c="Official rate (U-3): (unemployed seeking work / labor force) × 100. Understates true unemployment: discouraged workers (gave up looking) not counted as unemployed; underemployed (part-time wanting full-time) counted as employed. U-6 includes these."/><D t="Inflation: Definition, Measurement, Types" c="Inflation = sustained rise in general price level. CPI = (Cost of current basket / Cost of base year basket) × 100. Inflation rate = % change in CPI. Demand-pull: AD > AS at full employment → price level rises. Cost-push: SRAS shifts left (input cost shock) → stagflation (P↑, Y↓)."/><D t="Costs of Inflation" c="Redistributive: debtors gain (real debt shrinks), creditors lose. Fixed-income earners lose. Savers lose (real return = nominal rate - inflation). Menu costs, shoe-leather costs, uncertainty reduces investment. Hyperinflation can destroy economic activity entirely."/><D t="Real vs. Nominal Interest Rate — Fisher Equation" c="Real interest rate = Nominal interest rate - Inflation rate. (r = i - π). If bank charges 6% nominal and inflation is 4%, real rate = 2% — that's the true purchasing power cost of borrowing. Lenders want positive real returns. Borrowers prefer lower real rates."/><APX t="Fisher Equation — AP Macro Requirement" c="r = i − π. This EXACT formula appears on AP Macro FRQs. Example: If nominal interest rate = 8% and expected inflation = 3%, real rate = 5%. When inflation rises unexpectedly, real rate falls → benefits borrowers, hurts lenders. Always think about real (inflation-adjusted) variables for long-run analysis."/></>,
    Examples:<><E t="2021–2022 US Inflation" c="COVID relief stimulus ($5T) → demand-pull inflation (AD shifted right). Supply chain disruptions + energy price spikes → cost-push (SRAS shifted left). Both simultaneously → inflation peaked at 9.1% in June 2022. Fed raised rates to shift AD left."/></>,
    "AP Tips":<AP c={["Frictional + Structural = NRU. Cyclical = recessionary. Only cyclical unemployment responds to stimulus.","Fisher equation: r = i - π. AP Macro FRQ almost certainly includes this. Real rate can be negative.","Demand-pull: AD right (P↑ Y↑). Cost-push: SRAS left (P↑ Y↓ — stagflation). Draw BOTH in AD-AS.","CPI vs. GDP deflator: CPI = fixed consumer basket; GDP deflator = all goods in GDP (broader).","CPI substitution bias: CPI overstates inflation — consumers switch to cheaper substitutes when prices rise, but CPI basket is fixed.","Disinflation = inflation rate FALLING but still positive. Deflation = price level actually DECLINING. Know both definitions."]}/>
  }},
  {id:"growth",icon:"🚀",title:"Economic Growth",sub:"Ch 26 — Determinants, productivity, Rule of 70",tabs:["Simple","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Why are people in the US 50x richer than people in some developing countries, even though both had similar living standards 300 years ago? The answer is ECONOMIC GROWTH — the magic of compounding small annual improvements over decades. The US has grown at ~2% per year for 150 years. That sounds small, but the Rule of 70 shows that at 2%, living standards DOUBLE every 35 years. Over 150 years, that means standards are 16x higher. At 7% growth (China/South Korea in their peak decades), living standards double every 10 years — 6 doublings in 60 years = 64x improvement. The key drivers: better technology (the biggest), more capital equipment per worker, better education, and good institutions."/><B t="Plain English" c="Economic growth = sustained increase in real GDP per capita over time. It compounds: Rule of 70 says years to double = 70 / annual growth rate. At 2% growth, income doubles in 35 years. At 7% growth, doubles in 10 years. Small differences in growth rates matter enormously over decades."/></>,
    "In-Depth":<><Dl t="Supply-Side Determinants of Growth" items={["Labor quality: education, training, health → human capital → productivity","Capital quantity: more machines, infrastructure, equipment","Technology: most important long-run driver (TFP — total factor productivity)","Natural resources: helpful but not necessary (Japan, South Korea = few resources, high growth)","Institutional factors: rule of law, property rights, political stability, low corruption"]}/><D t="Labor Productivity" c="Real GDP per hour worked. Rising productivity → workers produce more → higher real wages possible without inflation. Productivity growth from: capital deepening (more capital per worker), technology advances, education, economies of scale."/><D t="Growth and the PPC / LRAS" c="Economic growth = rightward shift of LRAS (and outward shift of PPC). Distinguished from recovery (moving toward existing LRAS from inside it). Short-run vs. long-run: short run = manage business cycles. Long run = grow productive capacity."/></>,
    "AP Tips":<AP c={["Rule of 70: doubling time = 70 / annual growth rate.","Growth = shift of LRAS rightward (not just moving along it).","AP Macro growth questions combine with long-run AD-AS. Supply-side policies (education, R&D, deregulation) shift LRAS right.","Aggregate Production Function (MEA-2.B): Real GDP = f(Employment). Graph: x-axis = employment, y-axis = real GDP. Upward sloping — more workers = more output. Shifts up when: technology improves, capital increases, workers become more productive. Required to explain; provided on MC (not required to draw on FRQ).","Per capita GDP = Real GDP / Population. The standard measure of living standards. AP Macro uses this to compare growth across countries and over time."]}/>
  }},
];

const part7=[
  {id:"finassets",icon:"📈",title:"Financial Assets: Stocks, Bonds & Risk",sub:"AP Macro Topic 4.1 — Financial sector foundations",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="A financial asset is a piece of paper (or digital record) that represents a claim on future income. If you buy a BOND, you're lending money to a government or company — they promise to pay you back with interest. If you buy STOCK, you own a small piece of a company — if it does well, you get dividends and your stock gains value. The critical rule for AP Macro: BOND PRICES and INTEREST RATES move in OPPOSITE DIRECTIONS. Imagine you hold a $1,000 bond paying $50/year (5% yield). Now interest rates rise to 8%. New bonds pay $80/year. No one wants your old $50/year bond at $1,000 — so its price falls until the yield is competitive. When the Fed buys bonds, it drives bond prices UP and interest rates DOWN."/><B t="Plain English" c="Financial assets are claims on future income or wealth. Two main types: Bonds (debt — you lend money, earn fixed interest) and Stocks (equity — you own a piece of a company, earn dividends + capital gains). Higher risk = higher expected return. The most critical rule for AP Macro: bond prices and interest rates move in OPPOSITE directions — always."/></>,
    Diagram:<><FinAssetDiag/></>,
    "In-Depth":<><D t="Bonds (Debt Instruments)" c="A bond is a loan made by an investor to a borrower (corporation or government). The bond pays a fixed coupon payment each period and returns face value at maturity. Bond price and interest rates are INVERSELY related: if market rates rise, existing bonds paying lower fixed rates become less valuable → price falls. If a $1,000 bond pays $50/year: yield = 50/1000 = 5%. If market rates rise to 6%, no one will pay $1,000 for a 5% bond → price falls until yield matches market rate."/><D t="Stocks (Equity Instruments)" c="A share of stock represents ownership in a corporation. Stockholders earn dividends (regular profit distributions) and capital gains (price appreciation). Stocks carry more risk than bonds (no guaranteed payment) but historically earn higher returns. Stock prices reflect expectations of future corporate profits."/><D t="The Bond Price—Interest Rate Inverse Relationship" c="This relationship is the most important financial concept in AP Macro. When the Fed buys bonds (expansionary OMO): bond demand rises → bond prices rise → interest rates FALL → investment rises → AD shifts right. When Fed sells bonds: prices fall → rates rise → investment falls → AD shifts left. You must always connect OMO to bond prices to interest rates to investment to AD."/></>,
    "AP Tips":<AP c={["Bond price ↑ ↔ interest rate ↓. ALWAYS inverse. This shows up on AP Macro FRQs every year.","Fed buys bonds → bond prices rise → rates fall → I rises → AD shifts right. Write out every step.","Stocks are NOT tested as deeply as bonds in AP Macro — focus on bonds and the price-rate relationship.","Financial assets are in AP Macro Unit 4 — often the foundation for monetary policy questions."]}/>
  }},
  {id:"reservemkt",icon:"🏦",title:"The Reserve Market",sub:"AP Macro Topic 4.6 — Ample reserves, IOR, policy rate",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Every bank in the US keeps an account at the Federal Reserve (like a checking account, but for banks). The money in these accounts = bank RESERVES. Before 2008, the Fed would adjust the amount of reserves in the system to push interest rates up or down. Today's system is different: banks have ENORMOUS amounts of reserves (ample reserves, after $4 trillion in Fed bond purchases during 2008-2020). Now the Fed primarily controls rates by setting the INTEREST ON RESERVES (IOR) — essentially the interest rate the Fed pays banks to park money at the Fed. Raise IOR → banks prefer parking money at Fed over lending it → all interest rates rise. Lower IOR → banks prefer lending → rates fall."/><B t="Plain English" c="The Reserve Market is a REQUIRED diagram on AP Macro FRQs. It shows how the Fed controls the federal funds rate in today's ample-reserves banking system. Unlike the old system (limited reserves + money multiplier), the US Fed now primarily uses Interest on Reserves (IOR) as its key tool — raising IOR raises the policy rate; lowering IOR lowers it."/></>,
    Diagram:<><ReserveMktDiag/></>,
    "In-Depth":<><D t="Limited vs. Ample Reserves — Two Frameworks" c="OLD system (limited reserves): banks had just enough reserves, so Fed buying/selling bonds in OMO directly changed money supply and interest rates via the multiplier. NEW system (ample reserves, US since 2008): banks hold far more reserves than required. OMO alone doesn't change interest rates — banks just swap bonds for more excess reserves. Instead, the Fed sets IOR directly, which becomes the effective floor for all short-term rates."/><D t="Supply of Reserves (SR) — Horizontal Line" c="In the ample reserves framework, SR is essentially horizontal (perfectly elastic) at the IOR rate. Why? Banks won't lend reserves at a rate below what the Fed pays on reserves. So IOR sets the floor. Fed RAISES IOR → SR shifts UP → policy rate rises. Fed LOWERS IOR → SR shifts DOWN → policy rate falls."/><D t="Demand for Reserves (DR) — Downward Sloping" c="Banks demand reserves for: required reserves (transactions), precautionary holdings, and to earn interest. Lower policy rate → holding reserves costs more in terms of forgone lending → DR slopes down. Shifts right if: reserve requirements rise, more transactions, uncertainty increases."/><APX t="Reserve Market vs. Money Market — AP Macro Distinction" c="The AP Macro exam now includes BOTH: Money Market (MS vertical, MD downward, y-axis = nominal interest rate, x-axis = quantity of money) AND Reserve Market (SR horizontal at IOR, DR downward, y-axis = policy rate, x-axis = quantity of reserves). Know which one is being asked. The Reserve Market is the more current/accurate model of how the Fed actually operates. Both are required to draw."/></>,
    "AP Tips":<AP c={["Reserve Market: SR is HORIZONTAL at IOR level. DR slopes down. Policy rate = where they intersect.","Fed raises policy rate: raises IOR → SR shifts UP. NOT by shrinking money supply (that's the old framework).","AP Macro FRQ: 'Draw a correctly labeled reserve market and show the effect of the Fed raising IOR' → SR shifts up, policy rate rises.","Both money market AND reserve market appear on AP Macro. Know when each is appropriate to use."]}/>
  }},
  {id:"moneyinflation",icon:"💵",title:"Money Growth & Inflation: Quantity Theory (MV=PQ)",sub:"AP Macro Topic 5.3 — Long-run inflation, classical view",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Here's an analogy: imagine the economy is a pool of goods and services (the real economy), and money is the water in the pipes flowing to buy those goods. If you pump MORE water (money) into the pipes, but the pool doesn't get bigger (real GDP stays the same), what happens? The water pressure (price level) rises — INFLATION. This is Milton Friedman's core insight: 'Inflation is always and everywhere a monetary phenomenon.' Too much money chasing too few goods. The Quantity Theory of Money captures this: M × V = P × Q. In the long run, money growth that exceeds real GDP growth causes inflation, dollar for dollar. This is why central banks obsess over money supply growth."/><B t="Plain English" c="The Quantity Theory of Money says: Money Supply × Velocity = Price Level × Real Output. Or: MV = PQ. In the long run, if you print more money (M↑) but real output (Q) doesn't change, prices must rise proportionally. This is why economists say 'inflation is always and everywhere a monetary phenomenon' — excessive money growth causes inflation in the long run."/></>,
    Diagram:<><QTMDiag/></>,
    "In-Depth":<><D t="The Equation of Exchange: MV = PQ" c="M = money supply (controlled by Fed). V = velocity of money (how many times each dollar is spent per year; assumed relatively stable by monetarists). P = price level (GDP deflator). Q = real output (real GDP). The equation is an accounting identity — it's always true by definition. The question is what causes what."/><D t="Monetarist Interpretation" c="Milton Friedman and monetarists assume V is stable (predictable) and Q grows at its long-run natural rate regardless of monetary policy. Therefore: ΔM → proportional ΔP in the long run. Excess money growth = inflation. The Fed should target a steady, modest money growth rate equal to the growth rate of real output to maintain price stability."/><D t="Classical Quantity Theory — Money Neutrality" c="In the long run, money is 'neutral': increasing M only raises P, it does NOT raise real output Q. Prices adjust fully. The classical dichotomy separates real variables (Q, employment) from nominal variables (P, M). In the short run (sticky wages/prices): M↑ can raise Q temporarily. In the long run: only P rises. This is why the LRAS is vertical and why LR monetary policy targets inflation, not output."/><D t="Rule vs. Discretion Debate" c="Monetarists (Friedman): Fed should follow a constant money growth rule (k-percent rule) because discretionary policy creates instability. Keynesians: discretionary policy is necessary to respond to shocks. Modern central banks (Taylor Rule) use a hybrid: adjust rates systematically in response to inflation and output gaps."/></>,
    "AP Tips":<AP c={["MV = PQ: know all four variables and what each represents.","Long-run money neutrality: M↑ → only P↑, not Q. Real variables unchanged in LR.","AP Macro may ask: 'If money supply grows 10% and real GDP grows 3%, what happens to the price level?' → approximately 7% inflation (if V is stable).","Connects to: Phillips Curve (LR vertical at NRU), LRAS (vertical), and why the Fed targets inflation."]}/>
  }},
  {id:"supplygrowth",icon:"🚀",title:"Public Policy & Supply-Side Economic Growth",sub:"AP Macro Topics 5.6–5.7 — Supply-side policies, LRAS growth",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="There are two ways to increase GDP: (1) Use your existing capacity more fully (like a factory running extra shifts — this is moving toward your LRAS, not shifting it). (2) Actually expand capacity — build new factories, train more workers, invent new technology. ONLY option 2 is true long-run growth, and it shifts the LRAS rightward. Supply-side policies target option 2 directly. Unlike demand-side policies (which pump up spending but can cause inflation), supply-side policies grow the economy's real productive capacity — more output AND a stable or lower price level. The tradeoff: supply-side policies work over YEARS (building infrastructure takes time) while demand-side works in months."/><B t="Plain English" c="Economic growth means shifting the LRAS rightward — increasing the economy's productive capacity. Supply-side policies target this directly by improving the QUALITY or QUANTITY of productive resources. Unlike demand-side (fiscal/monetary) policy that moves along existing SRAS, supply-side policies expand the frontier itself — more output at a lower price level."/></>,
    Diagram:<><SupplySideDiag/></>,
    "In-Depth":<><Dl t="Supply-Side Policies That Shift LRAS Rightward" items={["Investment in physical capital: infrastructure spending (roads, ports, broadband) increases productive capacity","Investment in human capital: education subsidies, job training programs, immigration of skilled workers → higher labor productivity","Research & Development (R&D): government funding of basic research (NIH, NASA), patent system → technological progress → TFP growth","Deregulation: removing barriers to business entry and competition → more efficient resource allocation, more innovation","Tax incentives for investment: lower corporate taxes, investment tax credits → more private capital formation","Policies to increase labor force participation: childcare subsidies, immigration reform"]}/><D t="Supply-Side vs. Demand-Side Policy" c="Demand-side (Keynesian): G↑ or T↓ → AD shifts right → short-run output rises, but price level also rises. Good for closing recessionary gaps, but inflationary. Supply-side: SRAS and LRAS shift right → output rises AND price level falls. Better for sustainable long-run growth. But supply-side effects are slow (takes years to build infrastructure or train workers) while demand-side works in months."/><D t="Growth Accounting" c="Output growth = labor input growth + capital growth + total factor productivity (TFP) growth. TFP captures everything else — mostly technology and innovation. Studies show TFP is the dominant driver of long-run growth in advanced economies. This is why R&D and education investment are considered the most important supply-side policies."/></>,
    "AP Tips":<AP c={["Supply-side = LRAS shifts RIGHT. Both output rises AND price level falls. Draw this correctly on AD-AS.","Demand-side = AD shifts right. Output rises BUT price level also rises. Different diagram.","AP Macro FRQ might ask: 'What policy would increase long-run potential output?' → supply-side examples above.","Government spending on infrastructure counts as G in AD (short run) AND shifts LRAS (long run). Both effects are tested."]}/>
  }},
  {id:"adasm",icon:"📐",title:"Aggregate Demand & Aggregate Supply",sub:"Ch 30 — The core macro model",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="The AD-AS model is the big picture version of supply and demand — but instead of one market, it covers the ENTIRE economy at once. Instead of 'price of one product' on the y-axis, it shows the overall PRICE LEVEL (inflation). Instead of quantity of one product, it shows REAL GDP (total output of everything). AD (Aggregate Demand) = total spending in the economy — slopes downward just like regular demand. SRAS (Short-Run Aggregate Supply) = total production capacity when some prices are sticky — slopes upward. LRAS (Long-Run Aggregate Supply) = the economy's maximum sustainable capacity — perfectly VERTICAL because in the long run, output returns to full employment regardless of prices. This one model explains recessions, inflation, stagflation, and growth."/><B t="Plain English" c="AD-AS is the macro version of supply and demand. AD = total spending. SRAS = total production in the short run (sticky wages/prices). LRAS = maximum sustainable output at full employment (vertical — all prices flexible). This one model explains recession, inflation, stagflation, and growth."/></>,
    Diagram:<><ADASDiag/><Dl t="AD Shifters (CIGXN)" items={["C: Consumer wealth, confidence, taxes, debt","I: Interest rates, business confidence, technology, investment tax credits","G: Government spending changes","Xn: Exchange rates, foreign income changes, tariffs"]}/><Dl t="SRAS Shifters" items={["Input prices (oil, wages, raw materials)","Productivity changes","Business taxes / subsidies","Government regulations"]}/></>,
    "In-Depth":<><D t="Why AD Slopes Downward" c="(1) Wealth effect: higher price level → real wealth falls → C falls. (2) Interest rate effect: higher prices → need more money → interest rates rise → I falls. (3) Net export effect: higher US prices → US exports more expensive → Xn falls."/><D t="SRAS vs. LRAS" c="SRAS upward sloping: in short run, wages/prices sticky → firms produce more when prices rise. LRAS vertical at full employment: in long run, all wages/prices adjust fully → output returns to potential regardless of price level."/><D t="Four Macro Scenarios" c="(1) AD right → demand-pull inflation (P↑, Y↑). (2) AD left → recession (Y↓, P↓ or sticky). (3) SRAS left → stagflation (P↑, Y↓ — worst). (4) SRAS right → favorable supply shock (P↓, Y↑ — best)."/><D t="Long-Run Self-Correction" c="Recessionary gap: unemployment → wages fall → SRAS shifts right → price level falls → Y returns to potential. Takes years. Inflationary gap: tight labor → wages rise → SRAS shifts left → P rises → Y returns to potential. Keynesians: too slow, use active policy. Classicals: let markets self-correct."/></>,
    "AP Tips":<AP c={["Most-tested AP Macro model. Draw: downward AD, upward SRAS, vertical LRAS. Label P and Y axes.","Stagflation = SRAS LEFT (supply shock). Policy dilemma: can't fix both P and Y simultaneously.","Recessionary gap: Y < Yp (left of LRAS). Inflationary gap: Y > Yp (right of LRAS). Identify both on diagram.","LR self-correction: recessionary gap → SRAS shifts right (wages fall). Inflationary → SRAS shifts left (wages rise)."]}/>
  }},
  {id:"kc",icon:"✚",title:"Keynesian Cross & Aggregate Expenditures Model",sub:"Ch 29 — Equilibrium GDP, expenditure gaps, multiplier",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Here's a simple but profound insight from John Maynard Keynes (1936): in a recession, the problem is that people STOP SPENDING. Businesses lay off workers → workers have less income → they spend less → businesses sell less → they lay off more workers. A vicious cycle. The government can break this cycle by spending itself — it injects money into the circular flow, which has a MULTIPLIED effect. If the government spends $100 billion and the multiplier is 5, GDP rises by $500 billion. Why? Because one person's spending is another person's income. The Keynesian Cross model shows how total spending (AE) determines total output (GDP), and where they're equal is the equilibrium GDP."/><B t="Plain English" c="The Keynesian Cross shows how total spending determines GDP. Equilibrium is where total aggregate expenditure (AE = C+I+G+Xn) equals total output (Y). The 45° line represents all points where spending = output. If AE is below the 45° line, output falls. If above, output rises. The gap between equilibrium Y and full employment Y is the expenditure gap."/></>,
    Diagram:<><KCDiag/></>,
    "In-Depth":<><D t="Consumption Schedule" c="C = C₀ + MPC × Y. C₀ = autonomous consumption (even with zero income, people spend some from savings). MPC = marginal propensity to consume (fraction of each new dollar of income spent). MPS = 1 - MPC (fraction saved). As income rises, consumption rises but by less (MPC < 1)."/><D t="Recessionary Expenditure Gap" c="Equilibrium GDP (Y*) < Full Employment GDP (Yfe). Gap size = Yfe - Y*. To close it: increase autonomous spending by Gap / Multiplier. Example: Yfe = $5T, Y* = $4.5T, MPC = 0.8 → Multiplier = 5. Need $100B increase in G to close $500B gap."/><D t="Inflationary Expenditure Gap" c="Equilibrium GDP (Y*) > Yfe. Economy overheating — spending exceeds full-employment output. Gap = Y* - Yfe. To close: contractionary policy (cut G or raise T) by Gap / Multiplier. Must reduce autonomous spending."/><D t="The Spending Multiplier" c="Initial spending → income → more spending → more income. Chain continues. Total multiplied effect = Initial ΔSpending × (1/MPS). Tax multiplier = MPC/MPS (smaller because first round of tax cut is partially saved). Because first round differs, tax multiplier < spending multiplier in absolute value."/><APX t="Balanced Budget Multiplier — AP Extra" c="If government simultaneously increases G by $1 AND raises taxes by $1, GDP rises by exactly $1 (not zero). Why? ΔY from G = +$1 × (1/MPS). ΔY from tax = -$1 × (MPC/MPS). Net = 1/MPS - MPC/MPS = (1-MPC)/MPS = MPS/MPS = 1. Balanced budget multiplier = 1 always. This is an AP Macro FRQ classic."/></>,
    "AP Tips":<AP c={["Multiplier = 1/MPS = 1/(1-MPC). If MPC = 0.75, Multiplier = 4.","Tax multiplier = -MPC/MPS. SMALLER than spending multiplier (first round partly saved).","Balanced budget multiplier = 1 always. This exact question appears on AP Macro FRQs.","Recessionary gap: need ΔG = Gap / Multiplier. Don't confuse the gap size with the policy size needed."]}/>
  }},
  {id:"fp",icon:"🏛️",title:"Fiscal Policy, Deficits & National Debt",sub:"Ch 28, 31 — Government spending, taxes, crowding out",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="When the economy crashes — factories close, unemployment soars, people stop spending — the government has a powerful lever: FISCAL POLICY. It can SPEND MORE (build roads, hire teachers, send checks to families) or CUT TAXES (so people have more money to spend). Both pump money into the economy and shift AD rightward. When the economy is overheating — inflation is high, everyone is borrowing and spending — the government can do the reverse: SPEND LESS or RAISE TAXES. The tricky part: there are serious TIME LAGS. Congress debates for months. By the time money is actually spent, the recession might already be over. And deficit spending (spending more than taxes bring in) piles up as national debt, which future generations must pay back."/><B t="Plain English" c="Fiscal policy = government uses spending (G) and taxes (T) to stabilize the economy. Recessionary gap: expansionary FP (G↑ or T↓). Inflationary gap: contractionary FP (G↓ or T↑). Effects are multiplied through the economy. But timing lags, crowding out, and politics all limit effectiveness."/></>,
    "In-Depth":<><D t="Expansionary vs. Contractionary Fiscal Policy" c="Expansionary: G↑ or T↓ → AD shifts right → Y↑, P↑. Used for recessionary gap. Contractionary: G↓ or T↑ → AD shifts left → Y↓, P↓. Used for inflationary gap. Discretionary: requires legislation. Built-in stabilizers: automatic (tax revenue falls in recession, unemployment insurance rises → cushion without legislation)."/><D t="Crowding Out Effect" c="Government deficit spending → government borrows from loanable funds market → D for loanable funds shifts right → real interest rate rises → private investment falls. Partial or full offset of fiscal stimulus. Most severe: economy at full employment (tight financial market). Minimal: deep recession with near-zero rates (liquidity trap)."/><D t="Fiscal Policy Limitations" c="(1) Timing lags: recognition lag (months), administrative lag (congressional debate), operational lag (implementation time). (2) Crowding out: as above. (3) Political considerations: incumbents prefer tax cuts and spending increases regardless of economic conditions. (4) Ricardian Equivalence: rational consumers save tax cuts to pay future taxes (controversial)."/><D t="The National Debt" c="Accumulated deficits. Cyclically adjusted budget separates structural deficit (exists even at full employment) from cyclical deficit (due to recession). Real concerns: interest payments (crowd out other spending), foreign ownership (wealth transfer). Counter-arguments: most held domestically, government can tax/print money, necessary during recession."/></>,
    Examples:<><E t="2009 Obama Stimulus ($787B)" c="Unemployment hit 10% in Great Recession. ARRA: tax cuts (C↑), infrastructure (G↑), transfers (C↑). Debates: lags meant effect came late; some crowding out. Most economists credit it with preventing a deeper depression. Classic expansionary fiscal policy."/></>,
    "AP Tips":<AP c={["Built-in stabilizers = automatic fiscal policy (no legislation needed). Examples: progressive income tax, unemployment insurance.","Crowding out: FP → govt borrows → loanable funds D right → r rises → I falls. Draw loanable funds diagram for full credit on AP FRQ.","Multiplier = 1/MPS. Tax multiplier = MPC/MPS. Both smaller in practice due to crowding out, leakages.","Recessionary gap → expansionary FP (G↑ or T↓) → AD shifts right. Draw and label on AD-AS."]}/>
  }},
  {id:"mp",icon:"🏦",title:"Money, Banking & Monetary Policy",sub:"Ch 32–34 — Fed, money supply, tools, money market",tabs:["Simple","Diagrams","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="The Federal Reserve (the Fed) is America's central bank — think of it as the bank's bank. It doesn't take deposits from regular people, but almost every bank keeps money there. The Fed's superpower: it can CREATE money by buying bonds from banks (Open Market Operations), which puts more dollars in circulation and lowers interest rates. Lower rates mean cheaper mortgages, car loans, and business loans → people borrow and spend more → economy grows. The Fed can also DESTROY money by selling bonds, which drains money from circulation and raises rates → people borrow less → inflation cools. This is MONETARY POLICY — adjusting the money supply and interest rates to keep the economy stable."/><B t="The Fed & Tools of Monetary Policy" c="The Federal Reserve (the Fed) controls monetary policy independently. Three main tools: (1) Open Market Operations (most important): buy bonds → inject money → rates fall. (2) Reserve Ratio: lowering it → banks loan more. (3) Discount Rate: lower it → banks borrow more from Fed. (4) Interest on Excess Reserves: raising it → banks hold more reserves → less lending."/><Dl t="Money Functions and Definitions" items={["Medium of exchange: use to buy things (eliminates inefficient barter)","Store of value: hold wealth in liquid form","Unit of account: common measure of value","M1 = currency + demand deposits (checking) — most liquid","M2 = M1 + savings deposits + money market funds — broader"]}/></>,
    Diagrams:<><MoneyMktDiag/><MoneyMultDiag/></>,
    "In-Depth":<><D t="Expansionary Monetary Policy (for Recession)" c="Fed buys bonds → excess reserves → banks lend more → MS increases → interest rates fall → Investment rises → AD shifts right → Y↑ P↑ (toward Yp if recessionary gap). Also: lower rates → dollar depreciates → Xn rises → additional AD boost."/><D t="Contractionary Monetary Policy (for Inflation)" c="Fed sells bonds → reserves drain → banks lend less → MS decreases → interest rates rise → Investment falls → AD shifts left → Y↓ P↓. Used to fight inflationary gap or high inflation. 2022-2023: Fed raised rates from 0% to 5.25% to combat 9% inflation."/><D t="Fed Balance Sheet" c="Assets: U.S. government securities (bonds) and loans to banks. Liabilities: Federal Reserve Notes (physical currency) and bank reserves (deposits at the Fed). When Fed buys bonds: asset (securities) increases, liability (bank reserves) increases → money supply expands. Quantitative Easing (QE): large-scale asset purchases beyond normal OMO."/><D t="Money Market Equilibrium" c="MS is vertical (fixed by Fed). MD slopes downward (higher nominal rate = higher opportunity cost of holding money). Equilibrium: nominal interest rate i* where MS = MD. Fed shifts MS: buy bonds → MS right → i falls → I rises → AD right. Sell bonds → MS left → i rises → I falls → AD left."/><APX t="Bond Prices & Interest Rates — Inverse Relationship (AP Essential)" c="When the Fed BUYS bonds: bond demand rises → bond prices rise → interest rates FALL (inverse relationship always). Why? A $1,000 bond paying $50/year: if price rises to $1,100, yield = 50/1100 = 4.5% (fell from 5%). Sell bonds: prices fall → rates rise. AP Macro FRQs frequently test this: 'What happens to bond prices when the Fed conducts expansionary OMO?' Answer: bond prices RISE, interest rates FALL."/><APX t="Monetary Policy Transmission — Full Chain (AP Extra)" c="OMO (buy bonds) → excess reserves increase → banks create new loans → MS increases → bond prices rise, interest rates fall → (1) Investment increases (business borrowing cheaper) → (2) Consumer durables increase (car loans, mortgages cheaper) → (3) Dollar depreciates (capital outflow at lower US rates) → net exports rise → (4) AD shifts right → Real GDP rises, price level rises (if recessionary gap)."/></>,
    "AP Tips":<AP c={["OMO = most-used Fed tool. Buy bonds → expand money supply → lower i → more I → AD right.","Bond prices and interest rates move INVERSELY. Buy bonds → prices rise → rates fall. ALWAYS.","Money multiplier = 1/RR. $1000 deposit, RR=10% → up to $10,000 total money supply. Actual less.","Draw money market: vertical MS, downward MD. Fed buys bonds → MS shifts right → i falls."]}/>
  }},
  {id:"tacct",icon:"📋",title:"T-Accounts & Bank Balance Sheets",sub:"AP Macro Topic 4.4 — How banks create money, OMO mechanics",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Every bank keeps a simple ledger. LEFT side (assets): what the bank OWNS — vault cash, loans it has made, bonds it holds. RIGHT side (liabilities): what the bank OWES — mainly depositors's money. They always balance. Here is the magic of fractional reserve banking: you deposit $1,000. The bank keeps 10% ($100) as required reserve and loans out $900. That $900 gets deposited elsewhere, which loans out $810... and so on. A single $1,000 deposit can ultimately create up to $10,000 in new money in the banking system (money multiplier = 1/RR = 1/0.10 = 10). The Fed controls this process by setting the reserve requirement and through open market operations."/><B t="Plain English" c="A T-account is a simplified bank balance sheet. Left side = Assets (what the bank owns: loans, securities, reserves). Right side = Liabilities (what the bank owes: deposits). They must always be EQUAL. When you deposit $1,000, it appears on BOTH sides. The bank keeps required reserves (RR × deposits) and loans out the rest (excess reserves). This loaning process creates new money."/><B t="Required Reserve Formula" c="Required Reserves = Reserve Requirement × Deposits. Excess Reserves = Total Reserves − Required Reserves. Maximum new loans = Excess Reserves. Maximum new money created in entire banking system = Excess Reserves × Money Multiplier (1/RR)."/></>,
    Diagram:<><TAccountDiag/></>,
    "In-Depth":<><D t="Reading a T-Account" c="Assets (left side): reserves held at Fed or in vault, loans made to customers, securities (bonds) owned, other assets. Liabilities (right side): demand deposits (checking accounts), savings deposits, other debt. Key identity: Total Assets = Total Liabilities + Net Worth. Banks aim to have no excess reserves (idle money doesn't earn interest) — they loan everything above required reserves."/><D t="How Money Is Created Step by Step" c="Step 1: Customer deposits $1,000. Bank's assets (reserves) +$1,000; liabilities (deposits) +$1,000. Step 2: With RR=20%, required reserves = $200. Excess reserves = $800. Bank loans $800. Step 3: Assets change: reserves fall to $200, loans rise by $800 (total assets still $1,000). Step 4: Borrower deposits $800 at another bank → that bank now has $800 in deposits, loans $640... Process repeats. Total money creation = $1,000 × (1/0.20) = $5,000 maximum."/><D t="Fed Open Market Operations — T-Account View" c="Fed BUYS $100 bond from a commercial bank: Fed's assets (securities) +$100; Fed's liabilities (bank reserves) +$100. Commercial bank's assets: securities −$100, reserves +$100. Net effect: bank now has $100 more in reserves → excess reserves rise → bank can make new loans → money supply expands. Fed SELLS bond: exact reverse — bank's reserves fall → must reduce lending → money supply contracts."/><D t="Why Banks Hold Excess Reserves (and Why That Limits the Multiplier)" c="During recessions or uncertainty, banks may hold excess reserves instead of lending (as happened 2008-2015 when Fed paid interest on reserves). If banks hold excess reserves, the actual money multiplier is less than 1/RR. Also: if loan recipients hold cash instead of re-depositing, the multiplier shrinks. The theoretical multiplier (1/RR) assumes all excess reserves are loaned and all loans re-deposited."/></>,
    "AP Tips":<AP c={["T-account questions appear on AP Macro FRQs nearly every year. Practice filling them out both ways (deposit AND Fed OMO).","When Fed buys bonds FROM A BANK: bank securities fall, bank reserves rise. No change in deposits (yet).","When Fed buys bonds FROM THE PUBLIC: public deposits proceeds → deposits rise, reserves rise, then bank loans excess.","Maximum new money = Excess Reserves / RR (equivalently: Excess Reserves × Money Multiplier). Show your work."]}/>
  }},
  {id:"pc2",icon:"📈",title:"Phillips Curve, Extended AS & Supply-Side",sub:"Ch 36–37 — SR/LR Phillips, stagflation, Laffer curve",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="In the 1960s, economists noticed a pattern: when unemployment was LOW (economy booming), inflation was HIGH. When unemployment was HIGH (recession), inflation was LOW. They plotted this as the Phillips Curve — a tradeoff. Policymakers thought: great, we can choose where on this curve we want to be. Low unemployment? Accept some inflation. Low inflation? Accept some unemployment. Then the 1970s happened: BOTH inflation AND unemployment rose simultaneously (stagflation — an OPEC oil shock shifted the whole curve rightward). The lesson: you can trade off short-run, but in the LONG RUN, the economy returns to the natural rate of unemployment regardless of inflation. The long-run curve is vertical."/><B t="Plain English" c="Short-run Phillips Curve: tradeoff between inflation and unemployment. Low unemployment → high inflation (economy overheating). High unemployment → low inflation. But in the LONG RUN: no tradeoff — the LRPC is vertical at the Natural Rate of Unemployment (NRU). You can't permanently buy lower unemployment with higher inflation."/></>,
    Diagram:<><PhillipsDiag/></>,
    "In-Depth":<><D t="Why the LR Phillips Curve is Vertical" c="In the long run, workers adjust their inflation expectations. If government tries to keep unemployment below NRU with repeated stimulus: expectations rise → wages rise → SRAS shifts left → stagflation → unemployment returns to NRU but now with higher inflation. Expectations-augmented Phillips curve — you can fool workers short-run but not long-run."/><D t="Supply-Side Shocks and Stagflation" c="1970s OPEC oil shocks: production costs rose → SRAS shifted left → GDP fell + inflation rose simultaneously = stagflation. SRPC shifts right (now have higher inflation at every unemployment rate — worse tradeoff). Standard policy can't fix both: expansionary worsens inflation; contractionary worsens unemployment."/><D t="Laffer Curve" c="At 0% tax rate: zero revenue. At 100%: zero revenue (no one works). Revenue peaks somewhere in between. Supply-siders argue: if on the right side of the peak, cutting taxes can increase revenue by stimulating work/investment. Reagan tax cuts 1981. Empirically controversial — most economists think US was NOT on the right side."/><APX t="Short-Run vs. Long-Run Macro Policy — AP Synthesis" c="Recessionary gap: SR → expansionary policy (AD right, Y rises toward Yp). LR self-correction → SRAS right (wages fall), same result but takes longer. Inflationary gap: SR → contractionary policy (AD left, Y falls toward Yp). LR → SRAS left (wages rise), same result but again slower. AP Macro FRQs often ask about BOTH SR and LR effects of a policy shock. Always describe: initial impact, short-run equilibrium, AND long-run equilibrium."/></>,
    "AP Tips":<AP c={["SRPC: expansionary policy → move up-left (lower U, higher π). Contractionary → down-right.","LRPC is vertical at NRU. Supply shock → SRPC shifts right (stagflation shown as rightward SRPC shift).","AP always has one Phillips Curve FRQ. Draw SRPC and LRPC. Label NRU on horizontal axis.","Connect AD-AS to Phillips Curve: AD right = move up-left on SRPC. SRAS left = SRPC shifts right."]}/>
  }},
];

const part8=[
  {id:"capflows",icon:"💹",title:"Real Interest Rates & International Capital Flows",sub:"AP Macro Topic 6.6 — How rate differentials drive forex and AD",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="Capital flows are simply money moving across borders looking for the best return. Think of it like water: money flows downhill toward higher interest rates. If US rates rise to 7% while European rates stay at 3%, global investors will move money from Europe to the US. To buy US bonds, they need US dollars — so they sell euros/yen/pounds and buy dollars. This INCREASES demand for dollars → dollar APPRECIATES. Now US goods are more expensive for foreigners → US exports fall. US imports become cheaper → US imports rise. Net exports fall → AD shifts LEFT. This is why the Fed raising rates can actually hurt US exporters — it triggers a chain reaction through global capital markets."/><B t="Plain English" c="Money is mobile — investors move funds to wherever returns are highest. If US interest rates rise relative to other countries, foreign investors want US bonds. To buy US bonds they need US dollars — so demand for dollars rises and the dollar appreciates. This makes US exports more expensive and imports cheaper, reducing net exports and partially offsetting the original policy. This is a critical AP Macro chain."/></>,
    Diagram:<><CapFlowDiag/></>,
    "In-Depth":<><D t="Interest Rate Differentials Drive Capital Flows" c="If real interest rates are higher in the US than abroad, investors in other countries prefer US assets (US bonds, US bank deposits). They sell their currency and buy dollars to invest in the US. This capital inflow: (1) Increases demand for dollars in forex market → dollar appreciates. (2) Increases supply of foreign currencies → those currencies depreciate. Net result: US goods become more expensive for foreigners, foreign goods cheaper for Americans."/><D t="The Full Monetary Policy Chain (International Version)" c="Expansionary monetary policy (Fed buys bonds): interest rates fall → capital OUTFLOWS (investors seek higher returns abroad) → demand for dollars falls / supply rises → dollar DEPRECIATES → US exports cheaper for foreigners → US imports more expensive → net exports (Xn) RISE → AD shifts further right (international multiplier reinforces domestic monetary policy). Contractionary policy: exact reverse."/><D t="Fiscal Policy and Capital Flows" c="Expansionary fiscal policy (G↑, deficit spending): government borrows more → loanable funds demand rises → real interest rates rise → capital INFLOWS → dollar APPRECIATES → net exports FALL. This international crowding out can partially or fully offset the fiscal expansion. Open economies face more crowding out than closed economies because of this additional channel."/><D t="Balance of Payments Identity" c="Current account (CA) + Capital/Financial Account (CFA) = 0. If US has a trade deficit (CA < 0), it must be financed by a capital surplus (CFA > 0) — foreigners invest more in the US than Americans invest abroad. The 2024 US trade deficit (~$800B) is exactly financed by net capital inflows (~$800B). This is not optional — it's an accounting identity."/></>,
    "AP Tips":<AP c={["Full chain: r↑ → capital inflows → dollar appreciates → Xn falls → AD shifts left. Write EVERY step on FRQ.","r↓ → capital outflows → dollar depreciates → Xn rises → AD shifts right (reinforces expansionary MP).","Fiscal expansion → r↑ → capital inflows → dollar appreciates → Xn falls → PARTIALLY offsets the fiscal stimulus.","Current account deficit = Capital account surplus. Always. By accounting identity. No exceptions."]}/>
  }},
  {id:"trade",icon:"🌐",title:"International Trade & Comparative Advantage",sub:"Ch 38 — Why nations trade, tariffs, WTO",tabs:["Simple","In-Depth","Examples","AP Tips"],cnt:{
    Simple:<><B2 c="Why does the US buy coffee from Colombia instead of growing it domestically? Because Colombia can grow coffee much more efficiently than the US can. And why does Colombia buy American software instead of developing it themselves? Because the US is extremely good at software. Each country SPECIALIZES in what it does best and TRADES for the rest. This is comparative advantage, and it's the most powerful idea in international economics. Even if one country is better at EVERYTHING than another country (absolute advantage), both countries STILL benefit from specialization and trade. The key is RELATIVE efficiency — which activity do you give up the least to produce?"/><B t="Plain English" c="Countries trade because they're different. Comparative advantage: specialize in what you produce at the LOWEST OPPORTUNITY COST — even if another country is absolutely better at everything. Trade allows both countries to consume more than they could alone."/><Dl t="Comparative vs. Absolute Advantage" items={["Absolute advantage: produce MORE output per unit of input — raw efficiency","Comparative advantage: produce at LOWER OPPORTUNITY COST — this determines trade specialization","A country should export goods where it has CA (lower OC) and import goods where the other country has CA","Works even if one country is absolutely worse at EVERYTHING — CA always exists for both countries"]}/></>,
    "In-Depth":<><D t="Gains from Trade" c="Specialization + trade allows both countries to consume beyond their individual PPCs. World output rises. Terms of trade (ratio at which goods are exchanged) must fall between the two countries' domestic opportunity cost ratios for BOTH to gain."/><D t="Trade Barriers: Tariffs and Quotas" c="Tariff: tax on imports → domestic price rises → domestic production rises, imports fall, CS falls, PS rises, govt revenue rises, net welfare loss (DWL). Quota: quantity limit → same price/quantity effect as tariff but NO government revenue — rent goes to foreign exporters or domestic importers with licenses. Both are economically inferior to free trade."/><D t="Arguments for Protection" c="(1) Infant industry: protect new domestic industries until competitive. Sometimes valid but tends to become permanent. (2) Military self-sufficiency: strategic industries. Legitimate concern, easily abused. (3) Anti-dumping: prevent foreign firms selling below cost to destroy domestic competition. (4) Cheap foreign labor: usually fallacious — low wages reflect low productivity; CA still determines trade. (5) Diversification argument."/></>,
    Examples:<><E t="Comparative Advantage Calculation" c="Country A: makes 10 cars OR 20 wheat. Country B: makes 6 cars OR 18 wheat. A's OC of 1 car = 2 wheat. B's OC of 1 car = 3 wheat. A has CA in cars (lower OC: 2 < 3). B's OC of 1 wheat = 1/3 car. A's OC of 1 wheat = 1/2 car. B has CA in wheat. Both gain from A specializing in cars and B in wheat."/></>,
    "AP Tips":<AP c={["CA = lower OPPORTUNITY COST (not lower absolute cost). Always calculate OC ratios first.","Tariff creates DWL. AP expects you to draw: domestic S&D + world price line + tariff line + labeled surplus/DWL areas.","Terms of trade: must be between both countries' domestic OC ratios for both to benefit. Check this condition.","Quota vs. tariff: same P and Q effects, but quota gives no govt revenue. AP asks you to distinguish."]}/>
  }},
  {id:"er",icon:"💱",title:"Exchange Rates & Balance of Payments",sub:"Ch 39 — Forex market, current account, capital account",tabs:["Simple","Diagram","In-Depth","AP Tips"],cnt:{
    Simple:<><B2 c="An exchange rate is just the price of one country's money in terms of another country's money. Right now $1 might buy €0.92 or ¥149. These prices constantly fluctuate based on supply and demand in the FOREIGN EXCHANGE MARKET (forex). If more people want dollars (foreigners buying US goods, investing in US stocks), the dollar's price rises — it APPRECIATES. If Americans are buying lots of imports (selling dollars, buying foreign currency), the dollar's price falls — it DEPRECIATES. A stronger dollar: good for American tourists abroad and for Americans buying imports. Bad for US exporters (their products become expensive for foreigners). This is why exchange rates matter for the whole economy."/><B t="Plain English" c="Exchange rate = price of one currency in terms of another. Dollar appreciates (gets stronger): US exports more expensive for foreigners → they buy less. US imports cheaper → Americans buy more. Net exports fall → AD shifts left. Dollar depreciates: opposite — helps exporters, hurts importers."/><Dl t="Balance of Payments Accounts" items={["Current Account: trade in goods (merchandise balance), services, investment income, and transfers. Deficit = imports > exports.","Capital/Financial Account: flows of financial assets (stocks, bonds, FDI, real estate). Surplus = foreigners buy more US assets than Americans buy foreign assets.","They always balance: current account deficit = capital account surplus (accounting identity). The US trade deficit is funded by foreign capital inflows."]}/></>,
    Diagram:<><ForexDiag/></>,
    "In-Depth":<><D t="What Shifts the Dollar Exchange Rate" c="Dollar demand (D$) from: foreigners buying US exports, foreign investment in US assets, foreign tourism in US. Dollar supply (S$) from: Americans buying imports, US investment abroad, US tourism abroad. D$ shifts right → dollar appreciates (ER rises). S$ shifts right → dollar depreciates."/><D t="Interest Rates and Exchange Rates" c="US interest rates rise → US assets more attractive to foreigners → capital inflows → D$ rises → dollar appreciates → exports fall, imports rise → current account worsens. Key AP chain: Fed raises rates → dollar appreciates → Xn falls → AD partially offset."/><D t="Flexible vs. Fixed Exchange Rates" c="Flexible (floating): exchange rate determined by supply and demand. Self-correcting: trade deficit → dollar depreciates → exports ↑ → deficit shrinks. Most countries today (US, EU, Japan). Fixed: government sets and maintains exchange rate using reserves and trade policy. Less common now (China manages its rate)."/><APX t="Monetary Policy → Exchange Rate → Net Exports Chain (AP Extra)" c="This chain connects monetary policy to international trade and is heavily tested: Fed expands money supply → interest rates fall → foreign capital outflows (seeking higher returns elsewhere) → demand for dollars falls / supply of dollars rises → dollar DEPRECIATES → US exports become cheaper for foreigners → US imports become more expensive → Net Exports INCREASE → AD shifts further right (international multiplier adds to domestic multiplier). AP Macro FRQs test this full chain — write out each step explicitly."/></>,
    "AP Tips":<AP c={["Dollar appreciates: exports ↓ (expensive for foreigners), imports ↑ (cheap for Americans). Xn falls → AD left.","Fed raises interest rates → capital inflows → dollar appreciates → Xn falls → partially offsets expansionary effect.","Current account deficit ↔ capital account surplus (always, by accounting identity).","Draw forex diagram: D for dollars from foreigners, S from Americans. Interest rate rise → D shifts right → dollar appreciates (ER rises)."]}/>
  }},
];

/* ═══════════════ HARD QUESTIONS ═══════════════ */
const hardQs=[
  /* ── MICRO: MARKET STRUCTURES ── */
  {q:"Explain why a pure competitor earns only normal profit in the long run but a monopolist can sustain economic profit. What does this imply about allocative efficiency in each?",tag:"Micro: Market Structures",a:<div className="hqa"><strong>Pure Competition LR:</strong> If economic profit exists (P &gt; ATC), new firms enter (no barriers). Supply increases → market P falls → profit erodes. Reverse for losses. LR: P = min ATC = MC = normal profit. Allocatively efficient: P = MC (price = social cost of last unit).<br/><br/><strong>Monopoly LR:</strong> Barriers to entry prevent rivals. Monopolist maintains P &gt; ATC (economic profit) indefinitely. Sets MR = MC for Qm, but P &gt; MC always (since MR &lt; P for downward-sloping demand). Consumers value last unit MORE than cost to produce → allocative inefficiency → DWL → some mutually beneficial transactions don't occur.<br/><br/><strong>Implication:</strong> Pure competition maximizes total surplus. Monopoly transfers welfare from consumers to firm and destroys some (DWL). Justifies antitrust policy and regulated monopoly.</div>},
  {q:"A firm in a monopolistically competitive market earns economic profit in the short run. Describe (a) the long-run adjustment and (b) what the firm's graph looks like in long-run equilibrium. How does it differ from the pure competition long-run result?",tag:"Micro: Market Structures",a:<div className="hqa"><strong>(a) Long-run adjustment:</strong> Economic profit attracts new entrants with differentiated but similar products. Demand for any individual firm's product falls (shifts left) and becomes more elastic as consumers gain substitutes. Entry continues until each firm earns only normal profit (P = ATC). No further entry incentive.<br/><br/><strong>(b) LR graph:</strong> Demand curve tangent to ATC (touching at exactly one point). Price = ATC at that output. MR = MC below that point determines profit-max output (Qmc). Price read from demand curve above.<br/><br/><strong>vs. Pure competition LR:</strong> Both earn normal profit (P = ATC). BUT monopolistic competition: (1) P &gt; MC (allocatively inefficient), (2) firm produces at less than minimum ATC (excess capacity — "too many firms producing too little"), (3) product variety exists. Pure competition: P = MC = min ATC. Productively AND allocatively efficient but homogeneous goods.</div>},
  {q:"Two firms in an oligopoly face this payoff matrix (profits in $M). Firm A can Advertise or Not; Firm B can Advertise or Not. Both Advertise: A=$4, B=$4. A Advertises, B doesn't: A=$7, B=$1. A doesn't, B Advertises: A=$1, B=$7. Neither advertises: A=$6, B=$6. (a) Find each firm's dominant strategy. (b) Identify the Nash equilibrium. (c) Why is the Nash equilibrium collectively suboptimal?",tag:"Micro: Oligopoly & Game Theory",a:<div className="hqa"><strong>(a) Dominant strategies:</strong><br/>Firm A: If B Advertises → A earns $4 (Advertise) vs. $1 (Not). If B doesn't → A earns $7 (Advertise) vs. $6 (Not). Advertising always pays A more regardless of B's choice → <strong>A's dominant strategy: Advertise.</strong><br/>Firm B: Same logic by symmetry → <strong>B's dominant strategy: Advertise.</strong><br/><br/><strong>(b) Nash equilibrium:</strong> Both Advertise → A=$4, B=$4. Each firm is playing their best response given the other's strategy. Neither can improve by unilaterally switching.<br/><br/><strong>(c) Collectively suboptimal:</strong> If both could credibly commit to NOT advertising, both earn $6 &gt; $4. But this is unstable: each has a private incentive to defect (earn $7 by advertising while the other doesn't). This is the Prisoner's Dilemma — rational self-interest produces a collectively worse outcome. Only binding collusion (illegal cartel) or repeated interaction with punishment strategies can sustain cooperation.</div>},

  /* ── MICRO: COSTS & PRODUCTION ── */
  {q:"A firm's MPC = 0.75. The following workers are added to a fixed factory: 1 worker → TP=10; 2 workers → TP=18; 3 workers → TP=24; 4 workers → TP=28; 5 workers → TP=30. (a) Calculate MP for each worker. (b) When do diminishing returns begin? (c) If the wage is $40 and each unit sells for $5, how many workers should the firm hire?",tag:"Micro: Production & Costs",a:<div className="hqa"><strong>(a) Marginal Product:</strong><br/>Worker 1: MP = 10. Worker 2: MP = 8. Worker 3: MP = 6. Worker 4: MP = 4. Worker 5: MP = 2.<br/><br/><strong>(b) Diminishing returns begin at worker 2</strong> — MP falls from 10 to 8. (Returns diminish when MP starts falling, not when it becomes negative.)<br/><br/><strong>(c) Hiring rule:</strong> Hire until MRP = MRC (= wage).<br/>MRP = MP × P (competitive output market, so MR = P = $5).<br/>Worker 1: MRP = 10 × $5 = $50 &gt; $40 ✓<br/>Worker 2: MRP = 8 × $5 = $40 = $40 ✓ (exactly equal — hire)<br/>Worker 3: MRP = 6 × $5 = $30 &lt; $40 ✗<br/><strong>Hire 2 workers.</strong> At 2 workers, MRP = wage = $40, profit is maximized.</div>},
  {q:"A firm has fixed costs of $100. At output Q=5: TVC=$50. At Q=10: TVC=$80. At Q=15: TVC=$130. At Q=20: TVC=$200. (a) Calculate TC, ATC, AVC, AFC, and MC at each output level. (b) At what output is ATC minimized? (c) Where does MC equal ATC?",tag:"Micro: Production & Costs",a:<div className="hqa"><strong>(a) Cost Table:</strong><br/>Q=5: TC=150, ATC=30, AVC=10, AFC=20, MC=50/5=$10<br/>Q=10: TC=180, ATC=18, AVC=8, AFC=10, MC=30/5=$6<br/>Q=15: TC=230, ATC=15.3, AVC=8.7, AFC=6.7, MC=50/5=$10<br/>Q=20: TC=300, ATC=15, AVC=10, AFC=5, MC=70/5=$14<br/><br/><strong>(b) ATC minimized at Q=20</strong> (ATC=15, lowest in the table). In reality, MC=ATC at the exact minimum — we'd need more data points to find it precisely.<br/><br/><strong>(c) MC = ATC rule:</strong> When MC &lt; ATC, ATC is falling. When MC &gt; ATC, ATC is rising. MC equals ATC exactly at ATC's minimum. Between Q=15 and Q=20: MC rises above ATC, so ATC minimum is between these points. This principle — not the exact number — is what the AP exam always tests.</div>},

  /* ── MICRO: TAXES, EXTERNALITIES & PUBLIC GOODS ── */
  {q:"A per-unit tax of $6 is placed on sellers in a competitive market. Before tax: P*=$20, Q*=100. After tax: buyer pays $24, seller receives $18, Qt=80. (a) Calculate government tax revenue. (b) Calculate the DWL. (c) Which side bears more burden, and how do you know?",tag:"Micro: Tax, Subsidy & DWL",a:<div className="hqa"><strong>(a) Tax revenue</strong> = tax per unit × Qt = $6 × 80 = <strong>$480</strong><br/><br/><strong>(b) DWL:</strong> The DWL triangle has a base = original Q* − new Qt = 100 − 80 = 20 units, and height = tax = $6.<br/>DWL = ½ × base × height = ½ × 20 × $6 = <strong>$60</strong><br/><br/><strong>(c) Burden split:</strong><br/>Buyer burden = Pb − P* = $24 − $20 = $4 per unit<br/>Seller burden = P* − Ps = $20 − $18 = $2 per unit<br/>Buyers bear $4, sellers bear $2 → <strong>buyers bear 2/3 of the burden</strong> (2/3 of the $6 tax).<br/><br/><strong>Why:</strong> Buyers bear more burden because demand is more inelastic than supply in this market. The side less able to change behavior (less price-sensitive) bears more of the tax. This has nothing to do with who legally writes the check to the government.</div>},
  {q:"A factory produces steel and emits pollution as a by-product. (a) Draw a correctly labeled negative production externality diagram. (b) Identify the market quantity vs. the socially optimal quantity. (c) What policy could correct this, and at what size should it be set?",tag:"Micro: Externalities",a:<div className="hqa"><strong>(a) Diagram elements:</strong> X-axis = quantity of steel. Y-axis = price/cost. Downward-sloping MPB = MSB (demand). Upward-sloping MPC (private supply). MSC curve above MPC by the amount of external cost (pollution). MSC − MPC = marginal external cost.<br/><br/><strong>(b) Quantities:</strong> Market equilibrium: MPB = MPC → Qm (where demand meets MPC). Socially optimal: MSB = MSC → Qs &lt; Qm. Market overproduces by Qm − Qs. DWL = triangle between Qs and Qm, bounded by MSC above and MSB below.<br/><br/><strong>(c) Pigouvian Tax:</strong> A per-unit tax set equal to the marginal external cost at the optimal output (the vertical gap between MSC and MPC at Qs). This makes MPC + tax = MSC → firms now face the full social cost → produce Qs. Tax = marginal external cost at Qs. Size = exactly the gap between MSC and MPC at the socially optimal quantity — not a flat tax.</div>},
  {q:"Explain why the free market underprovides public goods. Use national defense as an example and explain why the government must provide it.",tag:"Micro: Public Goods",a:<div className="hqa"><strong>Defining characteristics:</strong> National defense is (1) non-excludable: once defense is provided, no one can be excluded from protection regardless of whether they pay. (2) Non-rival: one person's protection does not reduce another's — all citizens are simultaneously protected.<br/><br/><strong>Why markets fail:</strong> Non-excludability creates the free-rider problem. Any rational individual will wait for others to pay and enjoy the benefit for free. If everyone reasons this way, no one pays voluntarily → private firms cannot charge for the good → cannot recover costs → choose not to provide it at all (or vastly underprovide).<br/><br/><strong>Why government must provide it:</strong> Government can overcome free riding through taxation (compulsory payment). Everyone contributes through taxes regardless of whether they "feel like paying." Government aggregates individual demand through the political process and provides the socially optimal quantity. This is one of the clearest examples of market failure requiring government intervention — not because of greed or malice, but because the incentive structure makes voluntary provision impossible.</div>},

  /* ── MICRO: UTILITY MAXIMIZATION ── */
  {q:"You have $12. Pizza costs $3, soda costs $1. MU of pizza: 1st=30, 2nd=24, 3rd=18, 4th=12. MU of soda: 1st=10, 2nd=8, 3rd=6, 4th=4. What is the utility-maximizing combination?",tag:"Micro: Utility Maximization",a:<div className="hqa"><strong>Step 1 — Calculate MU/P for each unit:</strong><br/>Pizza: 30/3=10, 24/3=8, 18/3=6, 12/3=4<br/>Soda: 10/1=10, 8/1=8, 6/1=6, 4/1=4<br/><br/><strong>Step 2 — Rank by MU/P and purchase in order:</strong><br/>1st pizza (10) = 1st soda (10): tied → buy both ($4 spent, $8 left)<br/>2nd pizza (8) = 2nd soda (8): tied → buy both ($6 spent, $6 left)<br/>3rd pizza (6) = 3rd soda (6): tied → buy both ($4 left, but 3rd pizza = $3 + 3rd soda = $1 = $4) → buy both ($0 left)<br/><br/><strong>Optimal bundle: 3 pizzas + 3 sodas.</strong> Total utility = (30+24+18) + (10+8+6) = 96 utils. Budget fully spent ($9 + $3 = $12). MU_pizza/P_pizza = MU_soda/P_soda = 6 at margin ✓</div>},

  /* ── MICRO: FACTOR MARKETS ── */
  {q:"Draw and explain a correctly labeled graph for a monopsonistic labor market. How do wages and employment compare to a competitive labor market?",tag:"Micro: Factor Markets",a:<div className="hqa"><strong>Graph labels needed:</strong> X-axis = quantity of labor (L). Y-axis = wage / dollar cost. Three curves: (1) SL upward sloping (= ACL, average cost of labor). (2) MRC curve upward sloping and ABOVE SL (steeper — to hire one more worker, must raise wage for all current workers). (3) DL = MRP curve, downward sloping.<br/><br/><strong>Finding equilibrium:</strong> Monopsonist hires until MRP = MRC (profit-maximizing input rule). Drop from intersection to X-axis → Lm (employment). Drop from Lm to SL curve (NOT MRC) → Wm (wage actually paid).<br/><br/><strong>vs. Competitive market:</strong><br/>Competitive: hire where DL = SL → Lc workers at Wc wage. Wc &gt; Wm and Lc &gt; Lm.<br/>Monopsony: hires LESS and pays LESS. Workers are exploited (paid below MRP). DWL exists.<br/><br/><strong>Policy implication:</strong> Minimum wage at or below Wc can INCREASE both wages AND employment in monopsony markets — corrects the market power distortion.</div>},
  {q:"An industry uses labor in a perfectly competitive output market. (a) Explain why the labor demand curve slopes downward. (b) List three events that would shift labor demand RIGHT. (c) What is the difference between VMPL and MRP, and when are they equal?",tag:"Micro: Factor Markets",a:<div className="hqa"><strong>(a) Why DL slopes down:</strong> Labor demand is derived from product demand. As more workers are hired, marginal product falls (law of diminishing returns). Since MRP = MP × P, and MP falls as L rises, MRP falls → the additional revenue each extra worker generates declines → firms are only willing to pay lower wages for more workers.<br/><br/><strong>(b) Three events shifting DL right (demand for labor increases):</strong><br/>1. Increase in product demand → product price rises → MRP rises at every labor quantity<br/>2. Increase in labor productivity (technology, better training) → MP rises → MRP rises<br/>3. Rise in price of capital that substitutes for labor → firms substitute toward labor<br/><br/><strong>(c) VMPL vs. MRP:</strong><br/>VMPL = MP × P (product price). Only valid when the firm is a price taker in the output market (perfect competition, MR = P).<br/>MRP = MP × MR. Works for ALL market structures.<br/>They are equal ONLY when the firm is a perfect competitor in the output market (P = MR). For monopolists, MR &lt; P, so MRP &lt; VMPL — monopolist's labor demand is lower.</div>},

  /* ── MACRO: AD-AS & GAPS ── */
  {q:"A negative supply shock (OPEC oil embargo) hits the economy. Show AD-AS effects, identify the policy dilemma, and explain what each option costs policymakers.",tag:"Macro: AD-AS & Stagflation",a:<div className="hqa"><strong>AD-AS Effect:</strong> Oil = production input → costs rise for all firms → SRAS shifts LEFT. New equilibrium: P↑ (inflation) and Y↓ (recession) = stagflation. On Phillips Curve: SRPC shifts right (worse tradeoff — higher inflation at every unemployment level).<br/><br/><strong>Policy Dilemma:</strong><br/>• <strong>Expansionary (AD right):</strong> Fights recession (Y rises) but worsens inflation (P rises further).<br/>• <strong>Contractionary (AD left):</strong> Fights inflation but deepens recession (Y falls further).<br/>• <strong>Do nothing:</strong> Wait for self-correction. Long-run: wages eventually fall → SRAS shifts right → both P and Y return. Takes years.<br/><br/><strong>Best but slow:</strong> Supply-side policies shift SRAS right (alternative energy, deregulation). Addresses root cause.</div>},
  {q:"Explain the long-run self-correction mechanism for a recessionary gap. Then draw the AD-AS diagram showing (a) the initial recessionary gap, (b) the long-run self-correction, and (c) the resulting changes in the price level and real GDP.",tag:"Macro: Long-Run Self-Correction",a:<div className="hqa"><strong>Starting position (a):</strong> AD intersects SRAS to the LEFT of LRAS. Real GDP (Y*) &lt; Potential GDP (Yp) → recessionary gap. Unemployment above NRU. Price level at PL₁.<br/><br/><strong>Self-correction mechanism (b):</strong> High unemployment puts downward pressure on nominal wages. As wages fall: firms' costs decrease → SRAS shifts RIGHT. Process continues until SRAS intersects AD exactly at the LRAS level.<br/><br/><strong>New long-run equilibrium (c):</strong><br/>→ Real GDP rises back to Yp (at LRAS)<br/>→ Price level FALLS (from PL₁ to PL₂) — lower wages reduced costs<br/>→ Unemployment returns to NRU<br/><br/><strong>Keynesian objection:</strong> Wages are sticky downward — self-correction may take 3-10 years. Argument for active fiscal/monetary policy to close gap faster.</div>},
  {q:"The economy is currently operating at full employment. The government unexpectedly increases spending by $500B (MPC = 0.75). Using AD-AS, trace the complete short-run AND long-run effects on output, price level, and unemployment.",tag:"Macro: AD-AS Full Analysis",a:<div className="hqa"><strong>Multiplier:</strong> 1/MPS = 1/0.25 = 4. So ΔAD = $500B × 4 = $2T rightward shift in AD.<br/><br/><strong>Short-run:</strong> AD shifts right. Starting AT full employment (LRAS), the new AD/SRAS intersection is to the RIGHT of LRAS → inflationary gap. Output temporarily exceeds Yp. Unemployment falls below NRU. Price level rises. This is demand-pull inflation.<br/><br/><strong>Long-run self-correction:</strong> Labor market overheats → workers demand higher wages → nominal wages rise → firms' costs increase → SRAS shifts LEFT. Price level rises further. Output falls back toward Yp. Unemployment returns to NRU.<br/><br/><strong>Final LR equilibrium:</strong> Same real GDP (Yp) as before, but permanently higher price level. The $500B spending increase was "absorbed" entirely into higher prices in the long run — no permanent real output gain. This is why supply-side economists argue demand-side stimulus at full employment only causes inflation, not growth.</div>},

  /* ── MACRO: MONETARY POLICY & BANKING ── */
  {q:"The Fed buys $50 billion in Treasury bonds. Trace the COMPLETE effect chain through money market, loanable funds market, investment, AD-AS, and exchange rate.",tag:"Macro: Full Monetary Policy Chain",a:<div className="hqa"><strong>Step 1 — Money Market:</strong> Fed buys bonds → injects $50B into banking system → MS shifts right → nominal interest rate i falls.<br/><br/><strong>Step 2 — Bond Market:</strong> Bond demand rises → bond prices rise (inverse: rates fell).<br/><br/><strong>Step 3 — Loanable Funds:</strong> Supply of loanable funds shifts right → real interest rate r falls → investment (I) increases.<br/><br/><strong>Step 4 — AD:</strong> I↑ and C↑ (cheaper consumer loans) → AD shifts right. Multiplier amplifies effect.<br/><br/><strong>Step 5 — Exchange Rate:</strong> Lower US rates → capital outflows → demand for dollars falls → dollar depreciates → exports rise, imports fall → Xn↑ → additional AD shift right.<br/><br/><strong>Step 6 — AD-AS outcome:</strong> If recessionary gap → Y rises toward Yp, P rises moderately. If at full employment → mainly inflation.</div>},
  {q:"A bank has demand deposits of $200,000 and a reserve requirement of 10%. (a) What are required reserves? (b) What are excess reserves if actual reserves = $40,000? (c) If the Fed buys $10,000 in bonds from this bank, what is the maximum increase in the money supply from this action alone? (d) What limits the actual increase below the theoretical maximum?",tag:"Macro: T-Accounts & Money Creation",a:<div className="hqa"><strong>(a) Required reserves</strong> = RR × deposits = 0.10 × $200,000 = <strong>$20,000</strong><br/><br/><strong>(b) Excess reserves</strong> = Actual − Required = $40,000 − $20,000 = <strong>$20,000</strong><br/><br/><strong>(c) Fed buys $10,000 bond from this bank:</strong><br/>Bank's T-account: Securities −$10,000; Reserves +$10,000.<br/>New excess reserves = $20,000 + $10,000 = $30,000.<br/>Maximum new money from these excess reserves = $30,000 × (1/0.10) = <strong>$300,000</strong>.<br/>The $10,000 bond purchase creates up to $300,000 in new deposits through the money multiplier (1/RR = 10).<br/><br/><strong>(d) Actual increase limited by:</strong><br/>• Banks holding excess reserves (not lending everything out)<br/>• Borrowers holding cash instead of re-depositing<br/>• Banks losing deposits to other banks during the lending chain<br/>In practice, the actual multiplier is always less than the theoretical 1/RR.</div>},
  {q:"Explain the difference between the Money Market and the Reserve Market diagrams. In each, (a) what is on each axis? (b) what does the supply curve look like and why? (c) how does the Fed shift the supply curve in each framework?",tag:"Macro: Money Market vs Reserve Market",a:<div className="hqa"><strong>Money Market:</strong><br/>(a) X-axis = Quantity of Money; Y-axis = Nominal interest rate (i).<br/>(b) MS is VERTICAL (perfectly inelastic) — the Fed directly controls the money supply; it does not change based on interest rates.<br/>(c) Fed buys bonds → bank reserves increase → banks create loans → MS shifts RIGHT → i falls. Old framework (limited reserves).<br/><br/><strong>Reserve Market:</strong><br/>(a) X-axis = Quantity of Reserves; Y-axis = Policy rate (overnight/federal funds rate).<br/>(b) SR is HORIZONTAL (perfectly elastic) at the IOR rate — banks won't lend reserves below what the Fed pays them, so IOR is the effective floor.<br/>(c) Fed raises IOR → SR shifts UP → policy rate rises. Modern US framework (ample reserves since 2008). Simply changing IOR directly moves all short-term rates without needing to change the money supply significantly.<br/><br/><strong>Key distinction:</strong> Money Market is the traditional model for the old limited-reserves system. Reserve Market is how the US Fed ACTUALLY operates today. AP Macro now tests both; FRQs may specify which diagram to draw.</div>},

  /* ── MACRO: MULTIPLIERS & FISCAL POLICY ── */
  {q:"Calculate: MPC = 0.8. Government increases spending by $200 billion. (a) What is the spending multiplier? (b) What is the total change in GDP? (c) If government instead cut taxes by $200 billion, what would be the change in GDP? (d) Why is (b) different from (c)?",tag:"Macro: Multipliers",a:<div className="hqa"><strong>(a) Spending Multiplier</strong> = 1/MPS = 1/(1-0.8) = 1/0.2 = <strong>5</strong><br/><br/><strong>(b) ΔY from spending</strong> = $200B × 5 = <strong>$1,000 billion = $1 trillion</strong><br/><br/><strong>(c) Tax Multiplier</strong> = MPC/MPS = 0.8/0.2 = 4. ΔY from tax cut = $200B × 4 = <strong>$800 billion</strong><br/><br/><strong>(d) Why different:</strong> When G increases by $1, the FULL $1 immediately becomes income for someone. When taxes are CUT by $1, the first round = only $0.80 (MPC fraction) because households save $0.20. Tax multiplier is always smaller than spending multiplier.</div>},
  {q:"A recessionary gap of $400B exists. MPC = 0.75. (a) How much must government spending increase to close the gap? (b) How much must taxes be cut to close the gap? (c) If the government increases BOTH G and T by the same $100B, what happens to GDP? Explain using the balanced budget multiplier.",tag:"Macro: Multipliers — Advanced",a:<div className="hqa"><strong>Multiplier = 1/MPS = 1/0.25 = 4. Tax multiplier = MPC/MPS = 0.75/0.25 = 3.</strong><br/><br/><strong>(a) Required ΔG:</strong> Need ΔY = $400B. ΔG = $400B / 4 = <strong>$100B increase in G</strong>.<br/><br/><strong>(b) Required ΔT:</strong> Need ΔY = $400B. ΔT = −$400B / 3 = <strong>$133.3B tax cut</strong> (larger cut needed because tax multiplier is smaller).<br/><br/><strong>(c) Balanced budget multiplier:</strong> When ΔG = ΔT = +$100B (equal increase in both):<br/>ΔY from G = +$100B × 4 = +$400B<br/>ΔY from T = +$100B × (−3) = −$300B<br/>Net ΔY = +$400B − $300B = <strong>+$100B</strong><br/>The balanced budget multiplier = 1. GDP rises by exactly the amount of the spending increase, regardless of MPC. This works because the spending increase starts from the full $100B, while the tax increase only reduces spending by MPC × $100B = $75B (people absorb $25B through reduced saving).</div>},
  {q:"Explain the crowding-out effect fully. Under what conditions is it most severe? When might it be minimal or non-existent?",tag:"Macro: Fiscal Policy Limits",a:<div className="hqa"><strong>Crowding Out Mechanism:</strong> Government deficit spending requires borrowing → increases demand for loanable funds → D shifts right → real interest rate rises → private investment falls (I↓). Some or all fiscal stimulus is offset by reduced private spending.<br/><br/><strong>Most Severe When:</strong><br/>• Economy near full employment (financial markets tight)<br/>• Private investment is highly interest-rate sensitive<br/>• Fixed money supply (Fed doesn't accommodate expansion)<br/>• Open economy: capital inflows → dollar appreciates → Xn falls ("crowding out of net exports")<br/><br/><strong>Minimal / Non-Existent When:</strong><br/>• Deep recession / liquidity trap (rates near zero; more govt borrowing doesn't raise rates)<br/>• Fed simultaneously expands money supply (accommodates fiscal expansion)<br/>• Excess bank reserves exist<br/><br/><strong>2009–2020 environment:</strong> Near-zero rates → very minimal crowding out → fiscal multiplier close to full theoretical value.</div>},

  /* ── MACRO: PHILLIPS CURVE ── */
  {q:"Using the Phillips Curve framework, explain what happens to both the short-run and long-run Phillips curves when (a) the government uses expansionary fiscal policy to reduce unemployment below the NRU, and (b) a negative supply shock hits.",tag:"Macro: Phillips Curve",a:<div className="hqa"><strong>(a) Expansionary fiscal policy to reduce unemployment below NRU:</strong><br/>Short run: AD shifts right → move UP and LEFT along the existing SRPC (lower unemployment, higher inflation). Unemployment falls below NRU temporarily.<br/>Long run: Workers notice real wages falling (inflation surprises them) → they demand higher nominal wages → SRAS shifts left → SRPC shifts RIGHT (now have same unemployment but higher inflation). New LR equilibrium: unemployment returns to NRU but at a higher inflation rate. The LRPC is vertical at NRU — you cannot permanently reduce unemployment below NRU; you only generate inflation.<br/><br/><strong>(b) Negative supply shock (e.g., oil price spike):</strong><br/>SRAS shifts LEFT → SRPC shifts RIGHT (stagflation: higher inflation AND higher unemployment simultaneously). This is the worst outcome — the economy moves to a point NORTHEAST on the old SRPC (or equivalently, the SRPC itself shifts outward). Standard demand-side policy cannot fix both problems simultaneously.</div>},
  {q:"In 2022, US inflation reached 9%. (a) Using AD-AS, explain two causes. (b) Show the Fed's response on the Reserve Market diagram. (c) Trace the full chain from the Fed's action to reduced inflation, including the international capital flow effect.",tag:"Macro: Real-World Policy Chain",a:<div className="hqa"><strong>(a) Two causes of 9% inflation (AD-AS):</strong><br/>1. Demand-pull: $5T COVID stimulus → AD shifted far right → Y exceeded Yp → inflationary gap → price level rose.<br/>2. Cost-push: Supply chain disruptions + energy price spike → SRAS shifted left → compounded price level increase. Both effects simultaneously produced severe inflation.<br/><br/><strong>(b) Reserve Market response:</strong> Fed raised IOR (Interest on Reserves). SR (supply of reserves) shifts UP. New equilibrium: higher policy rate (federal funds rate rose from ~0% to 5.25%). Demand for reserves DR unchanged (slopes down); new equilibrium at higher rate.<br/><br/><strong>(c) Full chain:</strong><br/>Fed raises IOR → policy rate rises → all interest rates rise → I falls (fewer business investments) + C falls (mortgages, auto loans more expensive) → AD shifts LEFT → Y falls toward Yp → price level falls (inflation cools).<br/>International channel: Higher US rates → capital inflows → demand for dollars ↑ → dollar appreciates → US imports cheaper (reduces import prices directly) + US exports ↓ → Xn falls → additional AD shift left → reinforces disinflation.</div>},

  /* ── INTERNATIONAL TRADE & FOREX ── */
  {q:"Country A can produce 10 cars OR 20 tons of wheat. Country B can produce 6 cars OR 18 tons of wheat. (a) Which has CA in cars? (b) Which in wheat? (c) Country B is absolutely worse at both — explain why they still gain from trade.",tag:"International: Comparative Advantage",a:<div className="hqa"><strong>Opportunity Costs:</strong><br/>A: 1 car = 2 wheat; 1 wheat = 0.5 cars.<br/>B: 1 car = 3 wheat; 1 wheat = 0.33 cars.<br/><br/><strong>(a) Cars:</strong> A's OC (2 wheat) &lt; B's OC (3 wheat) → <strong>Country A has CA in cars.</strong><br/><strong>(b) Wheat:</strong> B's OC (0.33 cars) &lt; A's OC (0.5 cars) → <strong>Country B has CA in wheat.</strong><br/><br/><strong>(c) Why B still gains:</strong> Absolute advantage is irrelevant. B gives up less to produce wheat. By specializing in wheat and trading for cars, B gets more cars per ton of wheat than it could produce domestically. World output rises. Gains from trade come from specialization according to comparative advantage — always exists for both countries.</div>},
  {q:"The US dollar depreciates against the euro. Trace the COMPLETE effect on (a) US exports and imports, (b) the current account, (c) aggregate demand, and (d) employment and the price level in the short run.",tag:"International: Forex & AD",a:<div className="hqa"><strong>(a) Exports and imports:</strong> Dollar depreciation → US goods become cheaper for foreign buyers (price in euros falls) → US exports rise. Foreign goods become more expensive for Americans (price in dollars rises) → US imports fall.<br/><br/><strong>(b) Current account:</strong> Exports rise + imports fall → net exports (Xn) increase → current account improves (moves toward surplus or reduces deficit).<br/><br/><strong>(c) Aggregate demand:</strong> Xn is a component of AD (AD = C+I+G+Xn). Rising Xn → AD shifts RIGHT. The multiplier amplifies this shift: ΔY = ΔXn × (1/MPS).<br/><br/><strong>(d) Short-run employment and price level:</strong> AD shifts right → in the short run, real GDP rises (Y moves toward or past Yp) → employment rises, unemployment falls toward or below NRU. Price level rises (demand-pull pressure). If starting from a recessionary gap: helpful. If already at full employment: primarily inflationary.<br/><br/><strong>What caused the depreciation?</strong> Matters for context: Fed cutting rates → capital outflows → depreciation (reinforces expansionary MP). Trade tariffs by trading partner → also depreciates dollar.</div>},
  {q:"Explain the relationship between the current account and the capital/financial account. If the US has a $900B trade deficit, what must be true about capital flows? Why can't the US simply 'fix' the trade deficit through tariffs?",tag:"International: Balance of Payments",a:<div className="hqa"><strong>BOP identity:</strong> Current Account (CA) + Capital/Financial Account (CFA) = 0. By accounting identity, they always sum to zero. A current account deficit MUST be exactly offset by a capital account surplus — these are two sides of the same transactions.<br/><br/><strong>If CA = −$900B:</strong> Then CFA = +$900B. Foreigners are net investing $900B more in US assets than Americans invest abroad. This includes purchases of US Treasury bonds, real estate, stocks, and direct investment. The US is running a capital account surplus of equal size — it is the world's largest recipient of foreign capital.<br/><br/><strong>Why tariffs can't fix it:</strong> Tariffs reduce imports (improve CA) but trigger retaliation (reduce exports — worsen CA), and most importantly: the CA deficit is driven by the macroeconomic identity that national saving is less than national investment. As long as the US investment-saving gap persists (government deficit + low household saving relative to private investment demand), the CA deficit will persist regardless of tariffs. Tariffs might shift which goods are imported but won't eliminate the structural imbalance. This is the Keynes-Ohlin twin-deficits argument.</div>},
];

/* ═══════════════ NAV & SECTIONS ═══════════════ */
const NAVS=[{id:"home",label:"🏠 Home"},{id:"p1",label:"Part 1: Foundations"},{id:"p2",label:"Part 2: Micro Markets"},{id:"p3",label:"Part 3: Consumer"},{id:"p4",label:"Part 4: Firms"},{id:"p5",label:"Part 5: Resources"},{id:"p6",label:"Part 6: Macro GDP"},{id:"p7",label:"Part 7: Macro Policy"},{id:"p8",label:"Part 8: International"},{id:"hq",label:"📝 Hard Qs"},{id:"frq",label:"⚡ FRQ Skills"}];
const SECS={p1:{badge:"Part One",title:"Intro to Economics & the Economy",sub:"Chapters 1–2",data:part1,col:"#b8943a"},p2:{badge:"Part Two",title:"Price, Quantity & Efficiency",sub:"Chapters 3–5 + AP Micro Topics 2.8, 6.4",data:part2,col:"#5fcc8a"},p3:{badge:"Part Three",title:"Consumer Behavior",sub:"Chapters 6–8 + AP Micro Topic 6.5",data:part3,col:"#88aaff"},p4:{badge:"Part Four",title:"Microeconomics of Product Markets",sub:"Chapters 9–13 + AP Micro Topics 3.1, 6.4",data:part4,col:"#c9a84c"},p5:{badge:"Part Five",title:"Resource Markets & Government",sub:"Chapters 14–18 — MRP, Wages, Unions, Rent, Interest, Taxes",data:part5,col:"#e07070"},p6:{badge:"Part Seven",title:"GDP, Growth & Business Cycles",sub:"Chapters 24–27",data:part6,col:"#4a7aab"},p7:{badge:"Part Eight–Nine",title:"Macro Models, Fiscal & Monetary Policy",sub:"Chapters 28–34, 36 + AP Macro Topics 4.1, 5.3, 5.6–5.7",data:part7,col:"#a880ff"},p8:{badge:"Part Eleven",title:"International Economics",sub:"Chapters 38–39 + AP Macro Topic 6.6",data:part8,col:"#5fcc8a"}};

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
  {id:"p2",n:"2",t:"Micro: Markets",d:"S&D, equilibrium, per-unit taxes & subsidies, market failures, Lorenz curve, antitrust, govt intervention.",chips:["S&D","Tax/Subsidy DWL","Externalities","Lorenz Curve","Antitrust"]},
  {id:"p3",n:"3",t:"Consumer Behavior",d:"Elasticity, utility maximization, indifference curves, behavioral economics.",chips:["PED","MU Rule","Indiff. Curves","Loss Aversion","Nudging"]},
  {id:"p4",n:"4",t:"Firm Theory",d:"Production function (TP/MP/AP), cost curves, all 4 market structures, government intervention across structures.",chips:["TP/MP/AP","MC=MR","Monopoly","Oligopoly","Tax on Monopolist"]},
  {id:"p5",n:"5",t:"Resource Markets",d:"MRP, labor markets, wage differentials, unions, economic rent, interest/present value, public finance & tax types.",chips:["MRP=MRC","Wage Differentials","Unions","Economic Rent","Tax Incidence"]},
  {id:"p6",n:"6",t:"Macro: GDP & Cycles",d:"GDP formula, real vs. nominal, business cycles, unemployment types, inflation, Fisher equation.",chips:["C+I+G+Xn","Real GDP","NRU","CPI","r = i - π"]},
  {id:"p7",n:"7",t:"Macro: Policy",d:"Financial assets, MV=PQ, supply-side growth, AD-AS, Keynesian Cross, fiscal & monetary policy, Phillips curve.",chips:["MV=PQ","Supply-Side","AD-AS","Money Market","Phillips Curve"]},
  {id:"p8",n:"8",t:"International",d:"Comparative advantage, tariffs, forex, balance of payments, capital flows & exchange rate chains.",chips:["Comparative Adv.","Tariffs","Forex Market","Capital Flows","r→$→Xn"]},
  {id:"hq",n:"?",t:"Hard Questions",d:"25+ complete FRQ-style answers organized by topic. Try before revealing — covers every major AP question type.",chips:["Multipliers","AD-AS","Labor Markets","Game Theory","Monetary Chain"]},
  {id:"frq",n:"⚡",t:"FRQ Skills",d:"Execution guide: economic chains, perfect graph checklists, quick math drills, explain vs. identify examples, T-account mastery.",chips:["All Chains","Graph Checklist","Quick Math","T-Accounts","Explain vs. ID"]},
];

const TERMS=[["GDP = C+I+G+Xn","Expenditure approach"],["PED = %ΔQd / %ΔP","Price elasticity"],["MR = MC","Profit max rule"],["P = min ATC","Productive efficiency"],["P = MC","Allocative efficiency"],["MU_x/P_x = MU_y/P_y","Utility max rule"],["Money Multiplier = 1/RR","Fractional reserve"],["Spending Multiplier = 1/MPS","Fiscal multiplier"],["Tax Multiplier = MPC/MPS","Smaller than spending"],["r = i - π","Fisher equation"],["MV = PQ","Quantity Theory of Money"],["Comparative Adv.","Lower opportunity cost"],["NRU = F + S","No cyclical unemp."],["LRPC vertical at NRU","No LR tradeoff"],["Real GDP","Inflation-adjusted output"],["DWL","Lost surplus, distortion"],["CS = WTP - Price paid","Consumer surplus"],["Economic Profit = 0","Normal profit, LR PC"],["MRP = MP × P","Derived demand"],["Crowding Out","Govt borrows → r↑ → I↓"],["Bond price ↑ ↔ rate ↓","Inverse relationship"],["Dollar appreciates","Xn falls, AD shifts left"],["Tax burden","Borne by more inelastic side"],["r↑ → $ appreciates → Xn↓","Capital flow chain"],["MP peaks = MC minimum","Production-cost link"],["★ MRS = Px/Py","Indiff. curve optimum"],["★ Balanced budget mult","ΔY = ΔG when ΔG = ΔT"],["★ Lump-sum tax","Shifts ATC not MC"],["★ LR money neutrality","M↑ → only P↑ in LR"],];


function FRQPage(){
  const [open,setOpen]=useState({});
  const tog=k=>setOpen(p=>({...p,[k]:!p[k]}));
  const chainStyle={background:"#0a1520",border:"1px solid #4a7aab44",borderRadius:"8px",padding:".85rem 1rem",marginBottom:".7rem"};
  const stepStyle={background:"#162435",border:"1px solid #253650",borderRadius:"6px",padding:".28rem .65rem",color:"#f0ebe0",fontSize:".88rem",fontFamily:"'Crimson Pro',serif",lineHeight:"1.4"};
  const arrowStyle={color:"#b8943a",fontSize:"1rem",fontWeight:"bold"};
  const labelStyle={fontFamily:"'JetBrains Mono',monospace",fontSize:".68rem",color:"#4a7aab",textTransform:"uppercase",letterSpacing:".1em",marginBottom:".55rem"};
  const secStyle={marginBottom:"1.4rem"};
  const secHead={fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",color:"#b8943a",borderBottom:"1px solid #253650",paddingBottom:".4rem",marginBottom:".85rem"};
  const mkChain=(label,steps)=>(
    <div style={chainStyle} key={label}>
      <div style={labelStyle}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:".3rem"}}>
        {steps.map((s,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:".3rem"}}>
          <span style={stepStyle}>{s}</span>
          {(i<steps.length-1)?<span style={arrowStyle}>→</span>:null}
        </span>)}
      </div>
    </div>
  );
  const mkTip=(bad,good)=>(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".7rem",marginBottom:".7rem"}}>
      <div style={{background:"#280a0a",border:"1px solid #8a2020",borderRadius:"7px",padding:".75rem .9rem"}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",color:"#c0392b",marginBottom:".3rem"}}>✗ IDENTIFY ONLY (loses points)</div>
        <p style={{color:"#d8a0a0",fontSize:".9rem",lineHeight:"1.6",margin:0}}>{bad}</p>
      </div>
      <div style={{background:"#0a2218",border:"1px solid #2a7a50",borderRadius:"7px",padding:".75rem .9rem"}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",color:"#2a7a50",marginBottom:".3rem"}}>✓ EXPLAIN (full AP credit)</div>
        <p style={{color:"#98c8a8",fontSize:".9rem",lineHeight:"1.6",margin:0}}>{good}</p>
      </div>
    </div>
  );
  const mkCalc=(key,q,a)=>(
    <div style={{background:"#162435",border:"1px solid #253650",borderRadius:"9px",marginBottom:".65rem",overflow:"hidden"}} key={key}>
      <div style={{padding:".75rem 1rem",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>tog(key)}>
        <span style={{color:"#c9a84c",fontSize:".95rem",fontFamily:"'Crimson Pro',serif",lineHeight:"1.5",flex:1}}>{q}</span>
        <span style={{color:"#b8943a",marginLeft:".5rem",flexShrink:0}}>{open[key]?"▲":"▼"}</span>
      </div>
      {open[key]&&<div style={{padding:".75rem 1rem",borderTop:"1px solid #253650",color:"#a8bece",lineHeight:"1.7",fontSize:".93rem"}}>{a}</div>}
    </div>
  );
  const SEC=(title,children)=>(
    <div style={secStyle} key={title}>
      <div style={secHead}>{title}</div>
      {children}
    </div>
  );
  const graphs=[
    {t:"Any S&D / AD-AS Graph",items:["Both axes labeled (Price or P.L. on y; Q or Real GDP on x)","All curves drawn AND labeled at endpoint","Equilibrium point marked (dot or asterisk)","Dashed lines from equilibrium to both axes","P* and Q* labeled on axes"]},
    {t:"PC Firm Side-by-Side",items:["MARKET: S and D curves, labeled P* and Q*","FIRM: Horizontal P=MR=D line at market price","FIRM: U-shaped ATC, AVC, and upward MC","Profit-max Q* where P=MC (drop to x-axis)","Profit/loss rectangle shaded and labeled"]},
    {t:"Monopoly Graph",items:["Downward-sloping Demand = AR labeled","MR curve below and steeper than D","U-shaped ATC and upward MC","MR=MC intersection → Qm on x-axis","Rise to DEMAND (not MR) for Pm","Profit rectangle shaded","DWL triangle labeled"]},
    {t:"AD-AS Model",items:["Y-axis: Price Level (PL)","X-axis: Real GDP","Downward-sloping AD labeled","Upward-sloping SRAS labeled","Vertical LRAS labeled at Yp","Equilibrium intersection labeled","Gap identified: recessionary or inflationary"]},
    {t:"Phillips Curve",items:["X-axis: Unemployment Rate (%)","Y-axis: Inflation Rate (%)","Downward-sloping SRPC labeled","Vertical LRPC labeled at NRU","NRU marked on x-axis","Specific equilibrium point labeled","Shift shown as SRPC₂ if supply shock"]},
    {t:"Externality Graphs",items:["X-axis: Quantity; Y-axis: Price","MPB curve (demand, labeled)","MPC curve (private supply, labeled)","MSB or MSC dashed curve labeled","Qm and Qs both on x-axis","DWL triangle shaded and labeled","Policy correction arrow shown"]},
  ];
  const formulas=[
    {t:"Multipliers",rows:[["Spending Multiplier","1 / MPS = 1 / (1−MPC)"],["Tax Multiplier","−MPC / MPS"],["Balanced Budget","Always = 1"],["Money Multiplier","1 / Reserve Ratio"],["Max ΔMoney","Excess Reserves × (1/RR)"]]},
    {t:"Comparative Advantage",rows:[["OC of good A","Units of B given up per unit of A"],["CA rule","Produce where OC is LOWER"],["Terms of Trade","Between the two OC ratios"],["Who exports?","The good where you have CA"]]},
    {t:"Inflation & Real Values",rows:[["CPI","(Current basket cost / Base year cost) × 100"],["Inflation rate","(CPI₂ − CPI₁) / CPI₁ × 100%"],["Real GDP","Nominal GDP / Deflator × 100"],["Real interest rate","i − π (nominal minus inflation)"]]},
    {t:"Utility Maximization",rows:[["Utility max","MUx/Px = MUy/Py for all goods"],["If MUx/Px higher","Buy more X, less Y"],["Budget constraint","Px·Qx + Py·Qy = Income"]]},
    {t:"T-Account Rules",rows:[["Required Reserves","RR × Total Deposits"],["Excess Reserves","Actual − Required Reserves"],["Max new loans","= Excess Reserves"],["Max ΔMoney (system)","Excess Reserves / RR"],["Fed buys $X bond","Bank: Securities −X, Reserves +X"]]},
    {t:"Elasticity",rows:[["PED (midpoint)","[(Q2−Q1)/avg Q] / [(P2−P1)/avg P]"],["TR Test: elastic","Price up → TR falls"],["TR Test: inelastic","Price up → TR rises"],["Cross-price positive","Substitutes"],["Income elasticity negative","Inferior good"]]},
  ];
  const drills=[
    ["MPC=0.6, spending multiplier?","1/0.4 = 2.5"],
    ["MPC=0.75, tax multiplier?","0.75/0.25 = 3"],
    ["RR=25%, money multiplier?","1/0.25 = 4"],
    ["Nominal GDP=$600, Deflator=120, Real GDP?","$600/1.2 = $500"],
    ["Nominal rate=7%, inflation=4%, real rate?","7−4 = 3%"],
    ["$500 excess reserves, RR=10%, max new money?","$500/0.10 = $5,000"],
  ];
  const practiceQs=[
    {k:"p0",q:"The economy is in an inflationary gap. The Fed wants to restore full employment. (a) What should the Fed do in the Reserve Market? (b) Write the complete chain from the Fed's action to the new long-run equilibrium.",a:<div><strong>(a)</strong> The Fed should raise the Interest on Reserves (IOR), shifting SR upward in the Reserve Market. This raises the policy rate.<br/><br/><strong>(b) Chain:</strong> IOR rises → all interest rates rise → Investment falls + interest-sensitive Consumption falls → AD shifts LEFT → Real GDP falls toward Yp and Price Level falls → Inflationary gap closes → LR equilibrium restored at a lower price level. Unemployment returns to NRU.</div>},
    {k:"p1",q:"MPC = 0.8. Recessionary gap = $600B. Option A: increase G by $120B. Option B: cut taxes by $150B. Option C: increase G AND T by $120B each. Which option(s) close the gap? Show all calculations.",a:<div><strong>Spending Multiplier = 1/MPS = 1/0.2 = 5. Tax multiplier = MPC/MPS = 0.8/0.2 = 4.</strong><br/><br/><strong>Option A:</strong> ΔY = $120B × 5 = $600B. Exactly closes gap. ✓<br/><strong>Option B:</strong> ΔY = $150B × 4 = $600B. Exactly closes gap. ✓ (larger cut needed because tax multiplier is smaller)<br/><strong>Option C:</strong> From G: $120B × 5 = +$600B. From T: $120B × 4 = −$480B. Net ΔY = +$120B only. ✗<br/><br/>Options A and B close the gap. Option C only closes $120B (balanced budget multiplier = 1).</div>},
    {k:"p2",q:"Japan domestic OC: 1 electronics = 2 kg coffee. Brazil domestic OC: 1 electronics = 4 kg coffee. (a) Who has CA in each good? (b) What range of terms of trade makes both better off?",a:<div><strong>(a)</strong> Japan exports electronics (OC = 2 kg, less than Brazil's 4 kg). Brazil exports coffee.<br/><br/><strong>(b) Terms of trade must fall between the two domestic OC ratios.</strong><br/>1 electronics trades for between 2 and 4 kg of coffee. At this range: Japan gets more than 2 kg (better than domestic), Brazil pays less than 4 kg (better than domestic). Both gain from trade.</div>},
    {k:"p3",q:"A monopolist: Q=50, P=$30, MC=$18, ATC=$22. (a) Is the firm allocatively efficient? (b) Is it productively efficient? (c) Calculate profit per unit and total profit.",a:<div><strong>(a) Allocative efficiency requires P = MC.</strong> Here P = $30 ≠ MC = $18. NOT allocatively efficient. P &gt; MC means consumers value the last unit more than it costs to produce — the monopolist restricts output to raise price.<br/><br/><strong>(b) Productive efficiency requires P = min ATC.</strong> Here P = $30 &gt; ATC = $22. Not at minimum ATC. NOT productively efficient.<br/><br/><strong>(c) Profit per unit</strong> = P − ATC = $30 − $22 = $8. Total profit = $8 × 50 = $400.</div>},
  ];
  return(
    <div className="pg">
      <div className="hqi" style={{borderLeftColor:"#b8943a"}}>
        <h2 style={{color:"#b8943a"}}>⚡ FRQ Skills: Execution for a 5</h2>
        <p>The chains, graph checklists, quick math, and Explain vs. Identify drills that turn knowledge into points.</p>
      </div>

      {SEC("1 · The Multi-Step Economic Chains",
        <div>
          <div className="db" style={{marginBottom:".9rem"}}><h5>Why Chains Matter</h5><p>AP FRQs award a separate point for each logical step. Writing "AD shifts left" earns one point. Writing the complete chain earns all of them. Practice until each chain flows in under 60 seconds.</p></div>
          {mkChain("Contractionary Monetary Policy (Ample Reserves)",["Fed raises IOR","All interest rates rise","Investment (I) falls","Interest-sensitive C falls","AD shifts LEFT","Real GDP and Price Level fall","Unemployment rises toward NRU"])}
          {mkChain("Expansionary Monetary Policy (Ample Reserves)",["Fed lowers IOR","All interest rates fall","Investment (I) rises","C rises (cheaper loans)","AD shifts RIGHT","Real GDP rises toward Yp","Price Level rises"])}
          {mkChain("International Capital Flow Chain (US rates rise)",["US real interest rate rises","Foreign investors want US assets","Capital INFLOWS to US","Demand for US dollars rises","Dollar APPRECIATES","US exports more expensive","US imports cheaper","Net exports (Xn) FALL","AD shifts LEFT"])}
          {mkChain("Expansionary Fiscal Policy — Crowding Out Chain",["Government deficit spends (G up)","Demand for loanable funds rises","Real interest rate rises","Private investment (I) falls","AD shift smaller than multiplier predicts","Long-run growth potential may decrease"])}
          {mkChain("Monetary Policy — Exchange Rate — Net Exports",["Fed buys bonds","Interest rates fall","Capital outflows seek higher returns abroad","Dollar DEPRECIATES","US exports cheaper","US imports more expensive","Net exports (Xn) RISE","AD shifts further RIGHT"])}
          {mkChain("LR Self-Correction from Recessionary Gap",["Y* below Yp","Unemployment above NRU","Wages bid down (labor surplus)","Firms costs fall","SRAS shifts RIGHT","Y rises back to Yp","Price level falls","Unemployment returns to NRU"])}
          {mkChain("LR Self-Correction from Inflationary Gap",["Y* above Yp","Unemployment below NRU","Workers demand higher wages","Firms costs rise","SRAS shifts LEFT","Y falls back to Yp","Price level rises","Unemployment returns to NRU"])}
        </div>
      )}

      {SEC("2 · The Perfect Graph Checklist",
        <div>
          <div className="db" style={{marginBottom:".9rem"}}><h5>The #1 Source of Lost Points on FRQs</h5><p>Every graph you draw needs ALL elements listed below — no exceptions. AP graders cannot give credit for unlabeled axes or missing equilibrium points.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:".8rem"}}>
            {graphs.map(g=>(
              <div key={g.t} style={{background:"#101e2e",border:"1px solid #253650",borderRadius:"8px",padding:".85rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",color:"#b8943a",fontSize:".95rem",marginBottom:".5rem"}}>{g.t}</div>
                <ul style={{margin:0,paddingLeft:"1.1rem"}}>{g.items.map((item,i)=><li key={i} style={{color:"#a8bece",fontSize:".83rem",lineHeight:"1.6",marginBottom:".12rem"}}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {SEC("3 · Explain vs. Identify — The Difference Between a 3 and a 5",
        <div>
          <div className="db" style={{marginBottom:".9rem"}}><h5>AP Rubrics Award Points Per Logical Step</h5><p>The verb in an AP question determines what you need. "Identify" = name it. "Explain" = connect cause to effect with economic reasoning. Missing any step = missing points.</p></div>
          {mkTip(
            "'Price increases because demand rose.'",
            "'An increase in consumer income raises demand for this normal good, shifting demand rightward. At the original price, a shortage now exists, creating upward pressure on price until a new equilibrium is reached at a higher price and quantity.'"
          )}
          {mkTip(
            "'The AD curve shifts left.'",
            "'The Fed raising IOR increases all interest rates. Higher borrowing costs reduce business investment in capital and consumer spending on interest-sensitive goods. The reduction in Investment (I) and Consumption (C) shifts the AD curve leftward, reducing real GDP and the price level.'"
          )}
          {mkTip(
            "'Net exports fall.'",
            "'Higher US interest rates attract foreign capital inflows, increasing demand for US dollars in the foreign exchange market. The dollar appreciates. US exports become more expensive for foreign buyers (quantity demanded falls) and US imports become cheaper. Net exports (Xn = Exports − Imports) decrease, shifting AD leftward.'"
          )}
          {mkTip(
            "'The firm earns a profit.'",
            "'At profit-maximizing output Q*, where MR = MC, the price P* (read from the demand curve) exceeds average total cost ATC at Q*. Since TR = P* times Q* and TC = ATC times Q*, and P* exceeds ATC, the firm earns positive economic profit equal to (P* − ATC) times Q*.'"
          )}
        </div>
      )}

      {SEC("4 · Quick Math: Calculations You Must Do in Under 60 Seconds",
        <div>
          <div className="db" style={{marginBottom:".9rem"}}><h5>No Calculator on AP. Practice Until Setup Is Automatic.</h5><p>The numbers on the exam are always simple. What trips students up is not knowing the formula. These formula cards cover every calculation the AP expects.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:".7rem",marginBottom:"1rem"}}>
            {formulas.map(g=>(
              <div key={g.t} style={{background:"#101e2e",border:"1px solid #253650",borderRadius:"8px",padding:".85rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",color:"#4a7aab",fontSize:".95rem",marginBottom:".55rem"}}>{g.t}</div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <tbody>{g.rows.map(([k,v],i)=>(
                    <tr key={i}>
                      <td style={{color:"#c9a84c",fontFamily:"'JetBrains Mono',monospace",fontSize:".72rem",padding:".2rem .4rem .2rem 0",verticalAlign:"top",whiteSpace:"nowrap"}}>{k}</td>
                      <td style={{color:"#a8bece",fontSize:".82rem",padding:".2rem 0 .2rem .4rem",lineHeight:"1.45"}}>{v}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            ))}
          </div>
          <div style={{background:"#001e1c",border:"1px solid #00c8b4",borderRadius:"8px",padding:".85rem 1rem"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",color:"#00c8b4",marginBottom:".6rem"}}>★ TIMED DRILL — Try before looking at answer</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:".5rem"}}>
              {drills.map(([q,a],i)=>(
                <div key={i} style={{background:"#0a1520",borderRadius:"6px",padding:".5rem .75rem"}}>
                  <div style={{color:"#80e8e0",fontSize:".85rem",marginBottom:".3rem"}}>{q}</div>
                  <div style={{color:"#00c8b4",fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem",background:"#162435",padding:".2rem .5rem",borderRadius:"4px",display:"inline-block",cursor:"pointer"}}
                       onClick={e=>{const el=e.currentTarget;el.style.opacity=el.style.opacity==="0"?"1":"0";}}>
                    Answer: {a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {SEC("5 · T-Account Mastery — AP Macro Required",
        <div>
          <div className="db" style={{marginBottom:".9rem"}}><h5>T-Account Questions Appear on AP Macro FRQs Almost Every Year</h5><p>You must quickly and accurately fill out T-accounts for two scenarios: (1) a customer deposits cash, (2) the Fed buys bonds from the bank. These are different and graders can tell if you confuse them.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            <div style={{background:"#101e2e",border:"1px solid #b8943a",borderRadius:"8px",padding:".85rem"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",color:"#b8943a",marginBottom:".55rem"}}>SCENARIO A: Customer deposits $1,000 cash (RR = 20%)</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:".83rem"}}>
                <thead><tr>
                  <th style={{color:"#5fcc8a",padding:".3rem",borderBottom:"1px solid #253650",textAlign:"center"}}>ASSETS</th>
                  <th style={{color:"#e07070",padding:".3rem",borderBottom:"1px solid #253650",textAlign:"center"}}>LIABILITIES</th>
                </tr></thead>
                <tbody>
                  <tr>
                    <td style={{color:"#a8bece",padding:".25rem .4rem"}}>Reserves: +$1,000</td>
                    <td style={{color:"#a8bece",padding:".25rem .4rem"}}>Demand deposits: +$1,000</td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{color:"#7a8e9f",fontSize:".78rem",padding:".25rem .4rem",borderTop:"1px dashed #253650"}}>Required: $200 — Excess: $800 — can loan $800</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{background:"#101e2e",border:"1px solid #5fcc8a",borderRadius:"8px",padding:".85rem"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",color:"#5fcc8a",marginBottom:".55rem"}}>SCENARIO B: Fed buys $1,000 bond FROM the bank</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:".83rem"}}>
                <thead><tr>
                  <th style={{color:"#5fcc8a",padding:".3rem",borderBottom:"1px solid #253650",textAlign:"center"}}>ASSETS</th>
                  <th style={{color:"#e07070",padding:".3rem",borderBottom:"1px solid #253650",textAlign:"center"}}>LIABILITIES</th>
                </tr></thead>
                <tbody>
                  <tr>
                    <td style={{color:"#a8bece",padding:".25rem .4rem"}}>Securities: −$1,000</td>
                    <td rowSpan={2} style={{color:"#a8bece",padding:".25rem .4rem",verticalAlign:"middle"}}>No change in deposits</td>
                  </tr>
                  <tr><td style={{color:"#a8bece",padding:".25rem .4rem"}}>Reserves: +$1,000</td></tr>
                  <tr><td colSpan={2} style={{color:"#c9a84c",fontSize:".78rem",padding:".25rem .4rem",borderTop:"1px dashed #253650"}}>Net excess reserves +$1,000 — can loan $1,000 more</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{background:"#0a1520",border:"1px solid #4a7aab44",borderRadius:"7px",padding:".75rem 1rem"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",color:"#4a7aab",marginBottom:".4rem"}}>CRITICAL DISTINCTIONS</div>
            <ul style={{margin:0,paddingLeft:"1.1rem"}}>
              {["Deposit: reserves and deposits both rise. Bank gains new required reserve obligation.","OMO from bank: no new deposits. Securities swap for reserves — pure reserve injection.","OMO from public: person deposits check — then same as Scenario A from that point.","Required reserves = RR times deposits. Always compute this first before finding excess.","Max new money from entire banking system = excess reserves divided by RR."].map((t,i)=><li key={i} style={{color:"#a8bece",fontSize:".85rem",lineHeight:"1.6",marginBottom:".2rem"}}>{t}</li>)}
            </ul>
          </div>
        </div>
      )}

      {SEC("6 · Practice Scenarios — Try Before Revealing",
        <div>
          {practiceQs.map(({k,q,a})=>mkCalc(k,q,a))}
        </div>
      )}

    </div>
  );
}


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
      {page==="frq"&&<FRQPage/>}
    </div>
  );
}