<?php
/**
 * AdScale Media — Healthcare Marketing Landing Page
 * Template Name: Healthcare Marketing
 */
get_header();
$home_url = home_url('/');
?>
<style>
/* ──── HEALTHCARE MARKETING — PAGE STYLES ──── */

body.page-template-page-healthcare-marketing { background:var(--bg-void); }
body.page-template-page-healthcare-marketing #navbar,
body.page-template-page-healthcare-marketing #mobile-menu,
body.page-template-page-healthcare-marketing footer,
body.page-template-page-healthcare-marketing .wa-float-lb,
body.page-template-page-healthcare-marketing #scroll-top-lb,
body.page-template-page-healthcare-marketing #progress-bar,
body.page-template-page-healthcare-marketing #loader,
body.page-template-page-healthcare-marketing .page-hero { display:none !important; }
body.page-template-page-healthcare-marketing .page-hero,
body.page-template-page-healthcare-marketing section { padding-top:0; }

.reveal{opacity:0;transform:translateY(44px);transition:opacity .7s ease,transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}
.rem-header{position:fixed;top:0;left:0;right:0;z-index:500;padding:12px 5%;background:rgba(6,12,20,.6);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--border-card)}
.rem-header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.rem-header-logo{display:inline-flex;align-items:center;gap:.5rem;text-decoration:none}
.rem-header-logo-img{height:32px;width:auto;transition:filter .3s}
.rem-header-logo:hover .rem-header-logo-img{filter:drop-shadow(0 0 6px rgba(10,102,194,0.5))}
.rem-header-logo-text{font-family:var(--font-display);font-size:1.15rem;letter-spacing:.08em;color:var(--white)}
.rem-header-logo-text span{color:var(--blue)}
.rem-header-actions{display:flex;gap:8px;align-items:center}
@media(max-width:640px){.rem-header-actions .lb-hide-mobile{display:none!important}}
.rem-hero{position:relative;width:100%;min-height:100vh;display:flex;align-items:center;overflow:hidden}
.rem-hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(6,12,20,.92) 0%,rgba(6,12,20,.5) 50%,rgba(6,12,20,.8) 100%)}
.rem-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.rem-orb-1{width:600px;height:600px;background:radial-gradient(circle,rgba(10,102,194,.2),transparent 70%);top:-15%;right:-10%;animation:orbFloat 25s ease-in-out infinite}
.rem-orb-2{width:500px;height:500px;background:radial-gradient(circle,rgba(0,200,150,.12),transparent 70%);bottom:-10%;left:-8%;animation:orbFloat 30s ease-in-out infinite reverse}
@keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(50px,-40px) scale(1.08)}50%{transform:translate(-30px,30px) scale(.92)}75%{transform:translate(40px,20px) scale(1.04)}}
.rem-hero-content{position:relative;z-index:2;width:100%;max-width:1200px;margin:0 auto;padding:0 5%}
.rem-hero-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center}
.rem-hero-text{position:relative;z-index:2}
.rem-hero-eyebrow{display:inline-flex;align-items:center;gap:.8rem;font-family:var(--font-mono);font-size:.72rem;color:var(--blue);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1.4rem}
.rem-hero-eyebrow::before{content:"";width:28px;height:1px;background:var(--blue)}
.rem-hero-headline{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,5.8rem);line-height:.95;letter-spacing:.04em;color:var(--white);margin-bottom:1.2rem}
.rem-hero-headline .accent{background:linear-gradient(135deg,var(--blue),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.rem-hero-headline .accent-orange{background:linear-gradient(135deg,var(--orange),var(--red));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.rem-hero-sub{font-size:1.05rem;color:var(--text-secondary);max-width:580px;line-height:1.75;margin-bottom:2rem}
.rem-hero-actions{display:flex;gap:1.1rem;flex-wrap:wrap;margin-bottom:1.6rem}
.rem-hero-actions .lb{font-size:.82rem;padding:.75rem 1.5rem}
.rem-hero-highlights{display:flex;gap:2rem;flex-wrap:wrap}
.rem-hero-highlight-item{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--text-secondary);font-family:var(--font-mono)}
.rem-hero-highlight-item .dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0}
.rem-hero-visual{position:relative;z-index:2}
.rem-dashboard-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.8rem;box-shadow:var(--shadow-card);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.rem-db-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.4rem;padding-bottom:1rem;border-bottom:1px solid var(--border)}
.rem-db-title{font-family:var(--font-mono);font-size:.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em}
.rem-db-badge{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--font-mono);font-size:.65rem;color:var(--green);background:var(--green-subtle);padding:.25rem .65rem;border-radius:100px}
.rem-db-row{display:flex;align-items:center;justify-content:space-between;padding:.7rem 0;border-bottom:1px solid var(--border-card)}
.rem-db-row:last-child{border-bottom:none}
.rem-db-row-label{font-size:.8rem;color:var(--text-secondary)}
.rem-db-row-value{font-family:var(--font-mono);font-size:.82rem;color:var(--white);font-weight:600}
.rem-db-row-value.green{color:var(--green)}
.rem-db-row-value.orange{color:var(--orange)}
.rem-db-row-value.blue{color:var(--blue-bright)}
.rem-db-bar{height:4px;border-radius:4px;background:var(--bg-elevated);margin-top:6px;overflow:hidden}
.rem-db-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--blue),var(--green));transition:width 1.5s ease}
.rem-section{padding:100px 5%}
.rem-section-inner{max-width:1200px;margin:0 auto}
.rem-section-header{text-align:center;margin-bottom:52px}
.rem-section-label{display:inline-flex;align-items:center;gap:.8rem;font-family:var(--font-mono);font-size:.7rem;color:var(--blue);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1rem}
.rem-section-label::before{content:"";width:26px;height:1px;background:var(--blue)}
.rem-section-label.orange{color:var(--orange)}
.rem-section-label.orange::before{background:var(--orange)}
.rem-section-label.green{color:var(--green)}
.rem-section-label.green::before{background:var(--green)}
.rem-section-title{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,4.2rem);line-height:1;letter-spacing:.03em;color:var(--white);margin-bottom:.8rem}
.rem-section-sub{font-size:1rem;color:var(--text-secondary);max-width:660px;margin:0 auto;line-height:1.7}
.rem-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.rem-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.rem-grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}
.rem-card{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.8rem;position:relative;overflow:hidden;transition:var(--transition)}
.rem-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-blue);border-color:var(--border-strong)}
.rem-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--green));opacity:0;transition:var(--transition)}
.rem-card:hover::before{opacity:1}
.rem-card-icon{width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm);background:var(--blue-subtle);color:var(--blue-bright);font-size:1.2rem;margin-bottom:1rem;flex-shrink:0}
.rem-card-icon.green{background:var(--green-subtle);color:var(--green)}
.rem-card-icon.orange{background:var(--orange-subtle);color:var(--orange)}
.rem-card-title{font-family:var(--font-head);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:.5rem}
.rem-card-desc{font-size:.88rem;color:var(--text-secondary);line-height:1.6}
.rem-problem-card{background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.2rem 1.5rem;display:flex;align-items:center;gap:.8rem;transition:var(--transition)}
.rem-problem-card:hover{border-color:rgba(230,57,70,.3);transform:translateX(4px)}
.rem-problem-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(230,57,70,.12);color:var(--red);font-size:.8rem;flex-shrink:0}
.rem-problem-text{font-size:.88rem;color:var(--text-secondary);line-height:1.4}
.rem-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative}
.rem-process-step{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.8rem;position:relative;transition:var(--transition)}
.rem-process-step:hover{transform:translateY(-4px);box-shadow:var(--shadow-blue)}
.rem-process-num{font-family:var(--font-display);font-size:2.8rem;color:var(--blue);opacity:.15;line-height:1;margin-bottom:.5rem}
.rem-process-icon{font-size:1.6rem;margin-bottom:.8rem;display:block}
.rem-process-title{font-family:var(--font-head);font-weight:700;font-size:.95rem;color:var(--white);margin-bottom:.4rem}
.rem-process-desc{font-size:.82rem;color:var(--text-secondary);line-height:1.5}
.rem-flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;align-items:start}
.rem-flow-step{text-align:center;padding:1.2rem .8rem;background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);transition:var(--transition)}
.rem-flow-step:hover{transform:translateY(-3px);box-shadow:var(--shadow-blue)}
.rem-flow-num{font-family:var(--font-mono);font-size:.65rem;color:var(--text-muted);margin-bottom:.4rem}
.rem-flow-icon{font-size:1.4rem;margin-bottom:.5rem;display:block}
.rem-flow-label{font-family:var(--font-head);font-weight:600;font-size:.78rem;color:var(--text-primary);line-height:1.3}
.rem-faq-list{max-width:780px;margin:0 auto}
.rem-faq-item{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);margin-bottom:10px;overflow:hidden;transition:var(--transition)}
.rem-faq-item:hover{border-color:var(--border-strong)}
.rem-faq-question{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.5rem;cursor:pointer;gap:1rem;-webkit-user-select:none;user-select:none}
.rem-faq-q-text{font-family:var(--font-head);font-weight:600;font-size:.92rem;color:var(--white);line-height:1.4}
.rem-faq-icon{font-size:1.2rem;color:var(--text-muted);transition:var(--transition);flex-shrink:0}
.rem-faq-item.open .rem-faq-icon{transform:rotate(45deg);color:var(--blue)}
.rem-faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease}
.rem-faq-item.open .rem-faq-answer{max-height:500px}
.rem-faq-answer-inner{padding:0 1.5rem 1.2rem;font-size:.88rem;color:var(--text-secondary);line-height:1.7}
.rem-form-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-card)}
.rem-form-header{padding:1.5rem 2rem;background:linear-gradient(135deg,rgba(10,102,194,.1),rgba(0,200,150,.05));border-bottom:1px solid var(--border)}
.rem-form-header h3{font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:var(--white)}
.rem-form-header p{font-size:.82rem;color:var(--text-secondary);margin-top:.3rem}
.rem-form-body{padding:2rem}
.rem-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.rem-form-group{margin-bottom:16px}
.rem-form-label{display:block;font-family:var(--font-mono);font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.rem-form-input,.rem-form-select,.rem-form-textarea{width:100%;padding:13px 16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-elevated);color:var(--white);font-family:var(--font-body);font-size:.88rem;outline:none;transition:var(--transition-fast)}
.rem-form-input:focus,.rem-form-select:focus,.rem-form-textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-glow)}
.rem-form-input::placeholder,.rem-form-textarea::placeholder{color:var(--text-faint)}
.rem-form-textarea{min-height:100px;resize:vertical}
.rem-form-select{cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A6E88' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
.rem-form-check{display:flex;align-items:flex-start;gap:10px;margin-top:4px}
.rem-form-check input[type=checkbox]{width:16px;height:16px;margin-top:3px;accent-color:var(--blue)}
.rem-form-check label{font-size:.82rem;color:var(--text-secondary);line-height:1.4}
.rem-form-submit{margin-top:8px}
.rem-form-success{display:none;text-align:center;padding:3rem 2rem}
.rem-form-success.visible{display:block}
.rem-form-success-icon{font-size:3rem;margin-bottom:1rem}
.rem-form-success h4{font-family:var(--font-head);font-size:1.2rem;font-weight:700;color:var(--green);margin-bottom:.5rem}
.rem-form-success p{font-size:.9rem;color:var(--text-secondary)}
.rem-cta{text-align:center;padding:100px 5%;position:relative;overflow:hidden}
.rem-cta-dark{background:var(--bg-deep)}
.rem-cta-title{font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);line-height:1;color:var(--white);margin-bottom:1rem}
.rem-cta-sub{font-size:1rem;color:var(--text-secondary);max-width:560px;margin:0 auto 2rem;line-height:1.7}
.rem-cta-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.rem-commit-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.rem-commit-item{display:flex;align-items:center;gap:.7rem;padding:.8rem 1rem;background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius-sm);font-size:.82rem;color:var(--text-secondary);line-height:1.4}
.rem-commit-item .ck{color:var(--green);font-weight:700;font-size:.9rem;flex-shrink:0}
.rem-scenario{background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius-lg);padding:2rem;transition:var(--transition)}
.rem-scenario:hover{border-color:var(--border-strong);box-shadow:var(--shadow-blue)}
.rem-scenario-label{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--font-mono);font-size:.62rem;color:var(--orange);background:var(--orange-subtle);padding:.2rem .6rem;border-radius:100px;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.05em}
.rem-scenario h4{font-family:var(--font-head);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:.6rem}
.rem-scenario p{font-size:.85rem;color:var(--text-secondary);line-height:1.6;margin-bottom:.6rem}
.rem-scenario ul{list-style:none;padding:0}
.rem-scenario ul li{font-size:.82rem;color:var(--text-secondary);padding:.25rem 0;padding-left:1.2rem;position:relative;line-height:1.5}
.rem-scenario ul li::before{content:"\203A";position:absolute;left:0;color:var(--blue);font-weight:700}
.rem-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(6,12,20,.92);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:10px 5%;display:none}
.rem-sticky-cta-inner{max-width:1200px;margin:0 auto;display:flex;gap:10px}
.rem-sticky-cta .lb{flex:1;justify-content:center}
@media(max-width:1100px){
  .rem-hero-layout{grid-template-columns:1fr;gap:40px}
  .rem-hero-visual{max-width:520px}
  .rem-grid-4{grid-template-columns:1fr 1fr}
  .rem-process-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .rem-grid-3{grid-template-columns:1fr}
  .rem-grid-2{grid-template-columns:1fr}
  .rem-grid-4{grid-template-columns:1fr}
  .rem-form-row{grid-template-columns:1fr}
  .rem-process-grid{grid-template-columns:1fr}
  .rem-hero-headline{font-size:clamp(2rem,8vw,3rem)}
  .rem-section{padding:60px 5%}
  .rem-sticky-cta{display:block}
}
@media(max-width:640px){
  .rem-hero-highlights{flex-direction:column;gap:.8rem}
  .rem-header-logo-text{font-size:.95rem}
}
.rem-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.rem-metric{text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius)}
.rem-metric-icon{font-size:1.6rem;margin-bottom:.5rem}
.rem-metric-val{font-family:var(--font-display);font-size:2.6rem;line-height:1;background:linear-gradient(135deg,var(--blue),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.rem-metric-label{font-size:.82rem;color:var(--text-secondary);margin-top:.3rem}
@media(max-width:1100px){.rem-metrics{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.rem-metrics{grid-template-columns:1fr 1fr;gap:12px}.rem-metric-val{font-size:2rem}}
</style>

<!-- ── Minimal Header ── -->
<header class="rem-header"><div class="rem-header-inner">
<a href="<?php echo esc_url($home_url); ?>" class="rem-header-logo"><img src="https://adscale.co.in/wp-content/uploads/2026/05/Transperent-Logo.png" alt="AdScale Media" class="rem-header-logo-img"><span class="rem-header-logo-text">Ad<span>Scale</span> Media</span></a>
<div class="rem-header-actions">
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get a Free Healthcare Marketing Consultation</span></a>
<a href="tel:+917388509954" class="lb lb-sm lb-hide-mobile"><div class="lb-shine"></div><span class="lb-text">📞 +91 7388509954</span></a>
</div></div></header>

<!-- ═══════ HERO ═══════ -->
<section class="rem-hero">
<div class="rem-hero-overlay"></div><div class="rem-orb rem-orb-1"></div><div class="rem-orb rem-orb-2"></div>
<div class="rem-hero-content"><div class="rem-hero-layout">
<div class="rem-hero-text">
<div class="rem-hero-eyebrow reveal">Healthcare Marketing</div>
<h1 class="rem-hero-headline reveal reveal-delay-1">Healthcare Marketing That Helps Patients Find and<br><span class="accent">Trust Your Practice</span></h1>
<p class="rem-hero-sub reveal reveal-delay-2">AdScale helps healthcare providers improve local visibility, generate relevant patient enquiries, strengthen online reputation, simplify appointment booking, and build a trusted digital presence through SEO, Google Maps, social media, Meta Ads, and conversion-focused systems.</p>
<div class="rem-hero-actions reveal reveal-delay-3">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Healthcare Marketing Consultation</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Request a Patient Growth Strategy</span></a>
</div>
<div class="rem-hero-highlights reveal reveal-delay-4">
<span class="rem-hero-highlight-item"><span class="dot"></span> Local patient visibility</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> Appointment-focused campaigns</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> Reputation management support</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> Transparent reporting</span>
</div></div>
<div class="rem-hero-visual reveal reveal-delay-2">
<div class="rem-dashboard-card">
<div class="rem-db-header"><span class="rem-db-title">Patient Acquisition Overview</span><span class="rem-db-badge">● Monitoring</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Local Visibility</span><span class="rem-db-row-value green">Improving</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Appointment Enquiries</span><span class="rem-db-row-value blue">Tracking enabled</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Google Maps Presence</span><span class="rem-db-row-value orange">Optimizing</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Reputation Management</span><span class="rem-db-row-value">Strategy active</span></div>
<div style="margin-top:1rem"><div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-bottom:4px"><span>Patient enquiries</span><span>Improving</span></div><div class="rem-db-bar"><div class="rem-db-bar-fill" style="width:72%"></div></div></div></div></div></div></div></section>

<!-- ═══════ WHO WE HELP ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Who We Help</div><h2 class="rem-section-title">Healthcare Providers We Support</h2><p class="rem-section-sub">Ethical and professional digital marketing solutions for every type of healthcare practice — from individual practitioners to multispeciality hospitals.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon green">🏥</div><div class="rem-card-title">Clinics</div><div class="rem-card-desc">Marketing systems for single-location and multi-location clinics. Improve local discoverability, appointment enquiries, and patient communication through structured digital presence.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">🏨</div><div class="rem-card-title">Hospitals</div><div class="rem-card-desc">Digital visibility, service promotion, appointment enquiries, and multispeciality marketing support for hospitals of all sizes. Connect departments with patient search intent.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">👨‍⚕️</div><div class="rem-card-title">Doctors</div><div class="rem-card-desc">Personal professional branding, local SEO, appointment booking, and patient education for individual practitioners seeking stronger online presence and patient trust.</div></div>
<div class="rem-card reveal"><div class="rem-card-icon green">🦷</div><div class="rem-card-title">Dentists</div><div class="rem-card-desc">Local patient acquisition, dental service promotion, Google Maps optimization, and reputation management for dental practices and dental clinics.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">🔬</div><div class="rem-card-title">Diagnostic Centres</div><div class="rem-card-desc">Local discovery, test enquiry generation, service-page optimization, and appointment support for pathology labs, radiology centres, and diagnostic facilities.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">💪</div><div class="rem-card-title">Physiotherapy Clinics</div><div class="rem-card-desc">Local SEO, treatment awareness, appointment campaigns, and patient education content for physiotherapy, rehabilitation, and wellness practices.</div></div>
<div class="rem-card reveal"><div class="rem-card-icon green">🏥</div><div class="rem-card-title">Specialty Practices</div><div class="rem-card-desc">Marketing support for dermatology, orthopaedics, cardiology, gynaecology, paediatrics, ENT, ophthalmology, mental wellness, and other specialties where legally and ethically appropriate.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">🧬</div><div class="rem-card-title">Multispeciality Clinics</div><div class="rem-card-desc">Coordinate department visibility, doctor profiles, service pages, and appointment routing for multispeciality healthcare organizations managing multiple practices under one roof.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">🌿</div><div class="rem-card-title">Wellness &amp; Healthcare Centres</div><div class="rem-card-desc">Digital presence and patient communication support for healthcare centres, wellness clinics, and medical consultants focusing on preventive and holistic care.</div></div>
</div></div></section>

<!-- ═══════ CHALLENGES ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">The Challenge</div><h2 class="rem-section-title">Common Healthcare Marketing Challenges</h2><p class="rem-section-sub">The obstacles that prevent healthcare providers from reaching new patients and growing their practice.</p></div>
<div class="rem-grid-3">
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Clinic not appearing in local searches when patients search for nearby services</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Poor Google Maps visibility despite having a physical clinic location</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Low appointment enquiries from online sources</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Patients unable to book appointments easily through website or search</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Outdated clinic website that does not reflect current services or doctors</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Inconsistent business information across Google, directories, and social media</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Negative or unanswered reviews damaging online reputation</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Low review volume making the practice appear less trusted</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Weak or incomplete doctor profile with no professional visibility</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Poor mobile experience causing potential patients to leave the website</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Missed phone calls and slow enquiry response losing appointment opportunities</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No WhatsApp follow-up for patient enquiries or appointment reminders</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No appointment tracking or clear source of patient enquiries</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Low social media trust and engagement with the local community</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Competitors appearing above the clinic in local search and maps</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No local SEO strategy to capture nearby patient searches</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Advertising spend without conversion tracking or clear patient attribution</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Multiple clinic locations not managed properly across online platforms</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Patients abandoning appointment forms due to friction or unclear steps</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Generic or inaccurate medical content that does not build patient trust</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No clear system for managing online reputation and patient feedback</span></div>
</div></div></section>

<!-- ═══════ SOLUTION ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Our Solution</div><h2 class="rem-section-title">Integrated Patient Acquisition System</h2><p class="rem-section-sub">An connected marketing system that combines local visibility, Google Maps, reputation management, appointment booking, social media, advertising, and reporting into one unified growth approach.</p></div>
<div class="rem-grid-4">
<div class="rem-card reveal"><div class="rem-card-icon">🎯</div><div class="rem-card-title">Practice &amp; Market Analysis</div><div class="rem-card-desc">Clinic research, local market analysis, competitor review, and healthcare service positioning aligned with patient search intent and practice goals.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📍</div><div class="rem-card-title">Local SEO &amp; Google Maps</div><div class="rem-card-desc">Google Business Profile optimization, local keyword targeting, citation consistency, and location-based content to improve local discoverability.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">📱</div><div class="rem-card-title">Social Media &amp; Advertising</div><div class="rem-card-desc">Social media presence, Meta Ads for healthcare, patient education content, and appointment enquiry campaigns with proper targeting and tracking.</div></div>
<div class="rem-card reveal reveal-delay-3"><div class="rem-card-icon">🔄</div><div class="rem-card-title">Reputation &amp; Retention</div><div class="rem-card-desc">Reputation management, review workflows, WhatsApp enquiry flows, appointment booking systems, and CRM integration for patient communication.</div></div>
</div></div></section>

<!-- ═══════ PATIENT LEAD GENERATION ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Lead Generation</div><h2 class="rem-section-title">Patient Lead Generation</h2><p class="rem-section-sub">An ethical system that helps attract people actively looking for suitable healthcare services.</p></div>
<div class="rem-grid-2">
<div><div class="rem-card reveal"><div class="rem-card-title">Enquiry Types We Help Generate</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Appointment enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Call enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">WhatsApp enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Website form submissions</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Health check-up enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">New clinic awareness</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Doctor-specific enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Location &amp; specialty targeting</span></div>
</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-title" style="margin-bottom:.8rem">What Affects Enquiry Quality</div>
<p class="rem-card-desc" style="margin-bottom:.6rem">Enquiry quality depends on clinic location, medical specialty, service demand, doctor availability, pricing transparency, reputation, website quality, targeting, response speed, and advertising budget.</p>
<p class="rem-card-desc">We do not promise a fixed number of patients or appointments. Our focus is on building campaigns that attract relevant enquiries and routing them effectively to your practice.</p>
</div></div></div></section>

<!-- ═══════ GOOGLE MAPS SEO ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Google Maps SEO</div><h2 class="rem-section-title">Google Maps SEO for Healthcare</h2><p class="rem-section-sub">Help nearby patients find your practice when they search for healthcare services on Google Maps.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📍</div><div class="rem-card-title">Profile Optimization</div><div class="rem-card-desc">Google Business Profile audit and optimization including categories, business description, services, photos, posts, and accurate location information for healthcare providers.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📋</div><div class="rem-card-title">Listing Management</div><div class="rem-card-desc">Service and doctor listing, working hours, appointment links, website URLs, Q&amp;A monitoring, duplicate profile checks, and multi-location profile management.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">⚠️</div><div class="rem-card-title">Important Note</div><div class="rem-card-desc">We do not guarantee a specific Maps position. We do not use false addresses or virtual locations that violate Google policies. Local ranking depends on proximity, relevance, prominence, and competition.</div></div>
</div>
<div style="text-align:center;margin-top:2rem"><p style="font-size:.85rem;color:var(--text-muted)">We do not claim guaranteed Google Maps rankings. Results depend on location, competition, and ongoing optimization.</p></div>
</div></section>

<!-- ═══════ LOCAL SEO ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Local SEO</div><h2 class="rem-section-title">Local SEO for Healthcare</h2><p class="rem-section-sub">Capture nearby patient searches with location-targeted SEO strategies for healthcare providers.</p></div>
<div class="rem-grid-2">
<div><div class="rem-card reveal"><div class="rem-card-title">Local SEO Services</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Local keyword research</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Location &amp; service pages</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Doctor &amp; specialty pages</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">NAP consistency</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Business directory management</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Local schema &amp; mobile optimization</span></div>
</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-title" style="margin-bottom:.8rem">Search Intent Examples</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Best dentist in [location]</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Skin specialist near me</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">General physician clinic</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Child specialist in [area]</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Orthopaedic doctor near me</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Diagnostic centre in [location]</span>
</div></div></div></div></section>

<!-- ═══════ REPUTATION MANAGEMENT ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">Reputation</div><h2 class="rem-section-title">Reputation Management</h2><p class="rem-section-sub">Ethical review monitoring, response workflows, and patient feedback systems to build online trust.</p></div>
<div class="rem-grid-2">
<div class="rem-card reveal"><div class="rem-card-title" style="margin-bottom:.8rem">Reputation Management Capabilities</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary)">• Review profile audit</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Google Review monitoring</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Review response guidelines</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Patient feedback workflows</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Negative review escalation</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Multi-location review management</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Brand mention monitoring</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Reputation reporting</span>
</div></div>
<div class="rem-card reveal reveal-delay-1">
<div class="rem-card-icon orange" style="margin-bottom:.8rem">⚖️</div>
<div class="rem-card-title" style="margin-bottom:.6rem">Ethical Review Practices</div>
<div class="rem-card-desc"><p style="margin-bottom:.4rem">• Reviews must come from genuine patients. We do not create, purchase, or manipulate reviews.</p><p style="margin-bottom:.4rem">• Patient privacy must be protected when responding publicly.</p><p style="margin-bottom:.4rem">• Negative reviews should be handled professionally, not removed dishonestly.</p><p style="margin-bottom:.4rem">• We do not promise five-star ratings.</p></div>
</div></div></div></section>

<!-- ═══════ APPOINTMENT BOOKING ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Appointments</div><h2 class="rem-section-title">Appointment Booking Systems</h2><p class="rem-section-sub">Simplified appointment booking that reduces friction and helps capture patient enquiries effectively.</p></div>
<div class="rem-grid-2">
<div class="rem-card reveal"><div class="rem-card-title" style="margin-bottom:.8rem">Booking Features</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary)">• Online appointment form</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Doctor &amp; department selection</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Date &amp; time selection</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Call &amp; WhatsApp booking</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Confirmation &amp; reminders</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Rescheduling &amp; cancellation</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Multi-location selection</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Appointment source tracking</span>
</div></div>
<div class="rem-card reveal reveal-delay-1">
<div class="rem-card-icon orange" style="margin-bottom:.8rem">⚠️</div>
<div class="rem-card-title" style="margin-bottom:.6rem">Important Notice</div>
<div class="rem-card-desc"><p style="margin-bottom:.4rem">• The appointment system must not be presented as emergency medical assistance.</p><p style="margin-bottom:.4rem">• For medical emergencies, patients should contact local emergency services or visit the nearest emergency department.</p><p style="margin-bottom:.4rem">• We do not guarantee appointment bookings — results depend on practice responsiveness and patient intent.</p></div>
</div></div></div></section>

<!-- ═══════ SOCIAL MEDIA MARKETING ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Social Media</div><h2 class="rem-section-title">Social Media Marketing for Healthcare</h2><p class="rem-section-sub">Patient education, doctor introduction, service awareness, and community health content for social platforms.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon orange">📱</div><div class="rem-card-title">Content Types</div><div class="rem-card-desc">Doctor and clinic introductions, patient education posts, health awareness content, myth vs fact posts, facility highlights, team introductions, and preventive care content.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon orange">📊</div><div class="rem-card-title">Content Planning</div><div class="rem-card-desc">Monthly content planning aligned with health awareness days, seasonal health topics, new service announcements, clinic updates, and community health messaging.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon orange">📋</div><div class="rem-card-title">Content Guidelines</div><div class="rem-card-desc">We do not provide personalized medical diagnosis through social media. Patient images, names, or treatment details are not published without explicit permission.</div></div>
</div></div></section>

<!-- ═══════ META ADS ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Meta Ads</div><h2 class="rem-section-title">Meta Ads for Healthcare</h2><p class="rem-section-sub">Facebook and Instagram advertising supporting healthcare awareness, service promotion, and appointment enquiries — managed ethically and in compliance with platform policies.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📢</div><div class="rem-card-title">Campaign Types</div><div class="rem-card-desc">Clinic and doctor awareness campaigns, appointment enquiry campaigns, service-specific campaigns, location-based targeting, video campaigns, and WhatsApp enquiry campaigns.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🎯</div><div class="rem-card-title">Targeting &amp; Compliance</div><div class="rem-card-desc">Location-based targeting, specialty-based targeting, conversion tracking, and compliant ad creative following Meta's healthcare advertising policies without targeting sensitive health conditions.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">📊</div><div class="rem-card-title">Campaign Management</div><div class="rem-card-desc">Creative testing, message testing, landing page campaigns, budget monitoring, conversion tracking, and campaign reporting — with medically responsible and respectful language.</div></div>
</div>
<div style="text-align:center;margin-top:2rem"><p style="font-size:.85rem;color:var(--text-muted)">We do not promise guaranteed appointment numbers or fixed cost per patient. Results depend on market conditions, budget, and practice factors.</p></div>
</div></section>

<!-- ═══════ LANDING PAGES ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Landing Pages</div><h2 class="rem-section-title">Healthcare Landing Pages</h2><p class="rem-section-sub">Mobile-first, fast-loading pages that help patients understand services, learn about doctors, and book appointments.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📄</div><div class="rem-card-title">Page Types</div><div class="rem-card-desc">Clinic landing pages, doctor profile pages, specialty and service pages, appointment landing pages, diagnostic service pages, location pages, and dental service pages.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📱</div><div class="rem-card-title">Key Features</div><div class="rem-card-desc">Mobile-first design, fast loading, click-to-call, WhatsApp CTA, online booking forms, doctor selection, privacy notices, emergency disclaimers, FAQ sections, and conversion tracking.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">⚠️</div><div class="rem-card-title">Medical Content Note</div><div class="rem-card-desc">We do not include unverified doctor qualifications, treatment claims, prices, success rates, or certifications. Doctor details are published only with verified and approved information.</div></div>
</div></div></section>

<!-- ═══════ PATIENT FLOW ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Patient Flow</div><h2 class="rem-section-title">Integrated Patient Enquiry &amp; Appointment Flow</h2><p class="rem-section-sub">How Google Maps, local SEO, social media, Meta Ads, appointment booking, and reputation management work together as one connected system.</p></div>
<div class="rem-flow">
<div class="rem-flow-step reveal"><div class="rem-flow-num">01</div><span class="rem-flow-icon">🔍</span><div class="rem-flow-label">Patient searches or sees approved ad</div></div>
<div class="rem-flow-step reveal reveal-delay-1"><div class="rem-flow-num">02</div><span class="rem-flow-icon">🏥</span><div class="rem-flow-label">Visits practice or service page</div></div>
<div class="rem-flow-step reveal reveal-delay-2"><div class="rem-flow-num">03</div><span class="rem-flow-icon">📋</span><div class="rem-flow-label">Reviews practice information</div></div>
<div class="rem-flow-step reveal reveal-delay-3"><div class="rem-flow-num">04</div><span class="rem-flow-icon">📞</span><div class="rem-flow-label">Calls, submits form, or requests appointment</div></div>
<div class="rem-flow-step reveal"><div class="rem-flow-num">05</div><span class="rem-flow-icon">📊</span><div class="rem-flow-label">Enquiry source recorded</div></div>
<div class="rem-flow-step reveal reveal-delay-1"><div class="rem-flow-num">06</div><span class="rem-flow-icon">📩</span><div class="rem-flow-label">Staff acknowledges enquiry</div></div>
<div class="rem-flow-step reveal reveal-delay-2"><div class="rem-flow-num">07</div><span class="rem-flow-icon">✅</span><div class="rem-flow-label">Appointment confirmed with reminders</div></div>
<div class="rem-flow-step reveal reveal-delay-3"><div class="rem-flow-num">08</div><span class="rem-flow-icon">🔄</span><div class="rem-flow-label">Feedback, data review &amp; optimize</div></div>
</div></div></section>

<!-- ═══════ PROCESS ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">Process</div><h2 class="rem-section-title">Our Healthcare Marketing Process</h2><p class="rem-section-sub">A structured methodology from practice discovery through ongoing optimization and patient growth.</p></div>
<div class="rem-process-grid">
<div class="rem-process-step reveal"><div class="rem-process-num">01</div><span class="rem-process-icon">🔍</span><div class="rem-process-title">Practice Discovery</div><div class="rem-process-desc">Understand clinic or hospital type, specialties, doctors, locations, services, appointment process, target areas, current online presence, and growth goals.</div></div>
<div class="rem-process-step reveal reveal-delay-1"><div class="rem-process-num">02</div><span class="rem-process-icon">📊</span><div class="rem-process-title">Digital Presence Audit</div><div class="rem-process-desc">Review website, Google Business Profile, local rankings, reviews, social media, appointment process, competitor presence, tracking setup, and mobile experience.</div></div>
<div class="rem-process-step reveal reveal-delay-2"><div class="rem-process-num">03</div><span class="rem-process-icon">🧩</span><div class="rem-process-title">Strategy Planning</div><div class="rem-process-desc">Create plan covering patient acquisition, Google Maps, local SEO, landing pages, reputation management, social media, Meta Ads, appointment booking, tracking, and reporting.</div></div>
<div class="rem-process-step reveal reveal-delay-3"><div class="rem-process-num">04</div><span class="rem-process-icon">⚙️</span><div class="rem-process-title">Setup &amp; Optimization</div><div class="rem-process-desc">Prepare approved profiles, content, pages, campaigns, forms, tracking, and appointment flows before launch.</div></div>
</div>
<div class="rem-process-grid" style="margin-top:20px">
<div class="rem-process-step reveal"><div class="rem-process-num">05</div><span class="rem-process-icon">🚀</span><div class="rem-process-title">Campaign Launch</div><div class="rem-process-desc">Launch approved marketing campaigns and local visibility activities with proper tracking and routing.</div></div>
<div class="rem-process-step reveal reveal-delay-1"><div class="rem-process-num">06</div><span class="rem-process-icon">📈</span><div class="rem-process-title">Enquiry &amp; Appointment Monitoring</div><div class="rem-process-desc">Track calls, forms, WhatsApp enquiries, appointment requests, and lead sources where systems permit.</div></div>
<div class="rem-process-step reveal reveal-delay-2"><div class="rem-process-num">07</div><span class="rem-process-icon">⭐</span><div class="rem-process-title">Reputation &amp; Content Improvement</div><div class="rem-process-desc">Improve patient education content, review workflows, social media presence, and local credibility.</div></div>
<div class="rem-process-step reveal reveal-delay-3"><div class="rem-process-num">08</div><span class="rem-process-icon">📋</span><div class="rem-process-title">Reporting &amp; Optimization</div><div class="rem-process-desc">Provide clear monthly reporting and prioritize the next growth actions based on performance data.</div></div>
</div></div></section>

<!-- ═══════ STRATEGY SCENARIOS ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Strategies</div><h2 class="rem-section-title">Healthcare Growth Strategy Examples</h2><p class="rem-section-sub">Illustrative marketing approaches based on common healthcare growth situations. These are not client results.</p></div>
<div class="rem-grid-2">
<div class="rem-scenario reveal"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Local Dental Clinic</h4><p><strong>Challenge:</strong> A local dental clinic receives most patients through referrals but wants to attract new patients searching online.<br><strong>Strategy:</strong> Google Business Profile optimization with complete service listing, local SEO for dental keywords, appointment landing page with clear CTA, Meta Ads for service awareness, and review workflow for patient feedback.<br><strong>Metrics to track:</strong> Google Maps actions, appointment enquiries, call volume, landing-page conversion, review volume.</p></div>
<div class="rem-scenario reveal reveal-delay-1"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Multispeciality Clinic</h4><p><strong>Challenge:</strong> A multispeciality clinic has multiple departments but patients only know about one or two services.<br><strong>Strategy:</strong> Department landing pages with doctor profiles, appointment routing by specialty, multi-service Meta Ads, local SEO for each department, reputation management, and monthly reporting.<br><strong>Metrics to track:</strong> Department page visits, appointment enquiries by specialty, new patient rate, organic traffic, review response rate.</p></div>
<div class="rem-scenario reveal"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Individual Doctor Practice</h4><p><strong>Challenge:</strong> An independent doctor wants to build a professional online presence and attract more local patients.<br><strong>Strategy:</strong> Personal professional profile page, specialty landing page with educational content, local SEO for doctor name and specialty, appointment booking system, and reputation workflow.<br><strong>Metrics to track:</strong> Profile page views, appointment bookings, local search impressions, online reviews, patient enquiries.</p></div>
<div class="rem-scenario reveal reveal-delay-1"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Hospital Department Campaign</h4><p><strong>Challenge:</strong> A hospital department wants to increase awareness and enquiries for a specific service.<br><strong>Strategy:</strong> Service-specific landing page with eligibility information, location targeting for nearby areas, search-intent aligned ad copy, appointment enquiry flow, call tracking, and reporting structure.<br><strong>Metrics to track:</strong> Service page visits, appointment enquiries, cost per enquiry, call answer rate, booking rate.</p></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:2rem">These are strategic examples illustrating potential approaches and not completed client results. Verified campaign results will be added after client approval.</p>
</div></section>

<!-- ═══════ METRICS ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Measurement</div><h2 class="rem-section-title">Healthcare Metrics to Track</h2><p class="rem-section-sub">Healthcare marketing campaigns may be evaluated using these performance indicators — tracked and reported transparently.</p></div>
<div class="rem-metrics">
<div class="rem-metric reveal"><div class="rem-metric-icon">📞</div><div class="rem-metric-val">Calls</div><div class="rem-metric-label">Appointment enquiries by phone</div></div>
<div class="rem-metric reveal reveal-delay-1"><div class="rem-metric-icon">📋</div><div class="rem-metric-val">Forms</div><div class="rem-metric-label">Website form submissions</div></div>
<div class="rem-metric reveal reveal-delay-2"><div class="rem-metric-icon">💬</div><div class="rem-metric-val">WhatsApp</div><div class="rem-metric-label">WhatsApp enquiries received</div></div>
<div class="rem-metric reveal reveal-delay-3"><div class="rem-metric-icon">📍</div><div class="rem-metric-val">Maps</div><div class="rem-metric-label">Google Business Profile actions</div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Additional metrics: cost per enquiry, appointment booking rate, call answer rate, missed-call rate, enquiry response time, landing-page conversion rate, direction requests, website clicks, local search visibility, review volume, review response rate, social engagement, search impressions, organic traffic, appointment source, and cancellation rate where systems support it. Actual values displayed only when verified.</p>
</div></section>

<!-- ═══════ DELIVERABLES ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Deliverables</div><h2 class="rem-section-title">What Is Included</h2><p class="rem-section-sub">A comprehensive set of services built around your healthcare marketing needs.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📋</div><div class="rem-card-title">Strategy &amp; Planning</div><div class="rem-card-desc">Practice consultation, local market research, competitor analysis, patient persona profiling, campaign strategy, funnel planning, and growth roadmap.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📱</div><div class="rem-card-title">Execution &amp; Management</div><div class="rem-card-desc">Google Business Profile optimization, local SEO, landing page development, social media planning, Meta Ads management, appointment system setup, and reputation workflows.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">🔧</div><div class="rem-card-title">Systems &amp; Tracking</div><div class="rem-card-desc">Enquiry form setup, conversion tracking, appointment source attribution, WhatsApp enquiry flow planning, reporting dashboard, and monthly performance reviews.</div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Final deliverables depend on the selected package, healthcare category, advertising policies, locations, available assets, and approved scope.</p>
</div></section>

<!-- ═══════ WHY ADSCALE ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Why AdScale</div><h2 class="rem-section-title">Why Choose AdScale for Healthcare Marketing</h2><p class="rem-section-sub">Built on healthcare-focused strategy, ethical patient communication, and professional execution.</p></div>
<div class="rem-grid-4">
<div class="rem-card reveal"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Healthcare-Focused Strategy</div><div class="rem-card-desc">Every campaign starts with understanding the practice, specialties, patient intent, and local market conditions before any execution begins.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Ethical Patient Communication</div><div class="rem-card-desc">We use accurate, approved medical content. No fake reviews, no fabricated patient stories, and no misleading medical claims.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Local Visibility Expertise</div><div class="rem-card-desc">Google Maps, local SEO, and location-based strategies designed to help patients find your practice when they search nearby.</div></div>
<div class="rem-card reveal reveal-delay-3"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Transparent Reporting</div><div class="rem-card-desc">No fake patient numbers, no fabricated results. Clear, honest reports with actionable recommendations for practice growth.</div></div>
</div></div></section>

<!-- ═══════ QUALITY COMMITMENT ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">Commitment</div><h2 class="rem-section-title">Our Healthcare Marketing Quality Commitment</h2><p class="rem-section-sub">How we ensure every campaign meets professional healthcare marketing standards.</p></div>
<div class="rem-commit-grid">
<div class="rem-commit-item reveal"><span class="ck">✓</span> Use only verified medical information and approved doctor details</div>
<div class="rem-commit-item reveal reveal-delay-1"><span class="ck">✓</span> Protect patient privacy with consent-based communication</div>
<div class="rem-commit-item reveal reveal-delay-2"><span class="ck">✓</span> No fake reviews, fabricated patient stories, or misleading claims</div>
<div class="rem-commit-item reveal reveal-delay-3"><span class="ck">✓</span> No guaranteed treatment outcomes or fear-based advertising</div>
<div class="rem-commit-item reveal"><span class="ck">✓</span> No hidden advertising costs or surprise fees</div>
<div class="rem-commit-item reveal reveal-delay-1"><span class="ck">✓</span> Clear campaign tracking and transparent reporting</div>
<div class="rem-commit-item reveal reveal-delay-2"><span class="ck">✓</span> Ethical review management and accurate appointment information</div>
<div class="rem-commit-item reveal reveal-delay-3"><span class="ck">✓</span> Secure handling of enquiry data with privacy-conscious execution</div>
</div></div></section>

<!-- ═══════ WHO THIS IS FOR ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">This Service Is For</div><h2 class="rem-section-title">Who This Service Is For</h2><p class="rem-section-sub">Healthcare providers that need structured digital marketing and patient acquisition systems.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">🏥</div><div class="rem-card-title">New &amp; Established Practices</div><div class="rem-card-desc">New clinics needing local visibility and established practices requiring consistent patient enquiry flow and digital presence management.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🏨</div><div class="rem-card-title">Hospitals &amp; Multispeciality Clinics</div><div class="rem-card-desc">Hospitals and multispeciality organizations needing department visibility, doctor profiles, and coordinated patient acquisition systems.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">👨‍⚕️</div><div class="rem-card-title">Individual Doctors &amp; Specialists</div><div class="rem-card-desc">Independent practitioners, specialists, and consultants building a professional online presence and attracting local patients.</div></div>
<div class="rem-card reveal"><div class="rem-card-icon">🦷</div><div class="rem-card-title">Dental &amp; Specialty Clinics</div><div class="rem-card-desc">Dental practices, diagnostic centres, physiotherapy clinics, and specialty healthcare providers targeting local patient acquisition.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🌿</div><div class="rem-card-title">Wellness &amp; Healthcare Centres</div><div class="rem-card-desc">Wellness centres, healthcare centres, and preventive care providers needing digital visibility and patient communication systems.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">⚠️</div><div class="rem-card-title">May Not Be Suitable</div><div class="rem-card-desc">Businesses expecting guaranteed patient numbers without competitive practice location, proper budget, responsive staff, and consistent appointment follow-up.</div></div>
</div></div></section>

<!-- ═══════ MID-PAGE CTA ═══════ -->
<section class="rem-cta rem-cta-dark"><div class="rem-section-inner">
<h2 class="rem-cta-title reveal">Help More Local Patients Discover Your Healthcare Practice</h2>
<p class="rem-cta-sub reveal reveal-delay-1">Build a professional patient acquisition system that connects local search, Google Maps, reputation, appointments, content, and advertising.</p>
<div class="rem-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Healthcare Marketing Consultation</span></a>
</div></div></section>

<!-- ═══════ FAQ ═══════ -->
<section class="rem-section" id="faq"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">FAQs</div><h2 class="rem-section-title">Frequently Asked Questions</h2><p class="rem-section-sub">Honest answers to common questions about healthcare marketing.</p></div>
<div class="rem-faq-list">
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What is healthcare digital marketing?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Healthcare digital marketing uses channels such as Google Maps, local SEO, social media, Meta Ads, website optimization, and reputation management to help healthcare providers improve local visibility, generate patient enquiries, and build a trusted online presence. It focuses on ethical patient communication and accurate service information.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Who can use healthcare marketing services?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Clinics, hospitals, doctors, dentists, diagnostic centres, physiotherapy clinics, multispeciality clinics, specialty hospitals, individual practitioners, wellness centres, and any healthcare provider that wants to improve local visibility, patient enquiries, and digital presence.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you generate patient enquiries for clinics?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We help clinics generate relevant patient enquiries through local SEO, Google Maps optimization, appointment landing pages, Meta Ads, and social media. Enquiry quality depends on location, specialty, demand, reputation, website quality, targeting, response speed, and advertising budget. We do not promise a fixed number of patients or appointments.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you help individual doctors?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We help individual doctors build professional online presence through personal profile pages, local SEO, appointment booking systems, patient education content, and reputation management. We use only verified and approved doctor information.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you work with dentists?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We support dental practices with local patient acquisition, dental service promotion, Google Maps optimization, appointment booking, and reputation management — using ethical marketing practices and accurate service information.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you market hospitals and multispeciality clinics?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We help hospitals and multispeciality clinics with department landing pages, doctor profiles, multi-location SEO, reputation management, social media, and advertising campaigns — designed to support patient enquiries across multiple specialties and locations.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What is Google Maps SEO?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Google Maps SEO (also called Google Business Profile optimization) is the process of improving a healthcare provider's presence on Google Maps and local search results. It involves optimizing business categories, descriptions, services, photos, reviews, and local keywords to help nearby patients find the practice.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you improve my Google Business Profile?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We audit and optimize Google Business Profiles by reviewing categories, business information, service listings, photos, posts, and review management. We also check for duplicate profiles and provide guidance on profile improvements. We do not guarantee a specific Maps position.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you guarantee a top Google Maps ranking?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">No. We do not guarantee specific Google Maps rankings or positions. Local ranking depends on proximity, relevance, prominence, reviews, competition, and many other factors. We focus on improving visibility through ethical optimization practices.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">How does healthcare reputation management work?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">We help healthcare providers monitor online reviews, respond professionally to patient feedback, and implement ethical review request processes. Reviews must come from genuine patients. We do not create, purchase, or manipulate reviews. Patient privacy is protected when responding publicly.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you generate genuine patient reviews?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">We can guide ethical review request processes where appropriate, but reviews must come voluntarily from genuine patients. We do not create, purchase, or incentivize reviews in ways that violate platform policies. Patient privacy must always be protected.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you create appointment booking systems?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We plan and set up appointment booking systems including online forms, doctor and department selection, date/time selection, confirmation messages, reminders, and source tracking. The system is not intended for emergency medical assistance. For emergencies, patients should contact local emergency services.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you run Meta Ads for healthcare services?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We run Facebook and Instagram advertising for healthcare awareness, service promotion, and appointment enquiries — following Meta's healthcare advertising policies. We avoid targeting sensitive health conditions, exaggerated claims, and fear-based messaging. All advertising uses medically responsible language.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Are healthcare advertisements restricted?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. Healthcare advertising on platforms like Meta and Google has specific restrictions. Ads must follow platform policies regarding medical claims, targeting, patient data, and content. We manage campaigns within these guidelines and do not run ads that violate healthcare advertising policies.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you promote medical treatments?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">We can promote service awareness and information about treatments using accurate, approved content — provided it complies with platform policies and healthcare advertising regulations. We do not make claims about treatment outcomes, success rates, or superiority over other treatments.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you provide local SEO?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. Local SEO is a core service. We provide local keyword research, location pages, doctor pages, service pages, NAP consistency, business directory management, local schema, and mobile optimization — all designed to help healthcare providers appear when nearby patients search for services.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you manage multiple clinic locations?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We can manage multi-location SEO, multiple Google Business Profiles, location-specific landing pages, consistent NAP across all directories, and location-based advertising — ensuring each practice location has accurate and optimized online presence.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you create healthcare social media content?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We plan and create patient education content, doctor introductions, service awareness posts, health awareness content, and community health messaging. We do not provide personalized medical diagnosis through social media or publish patient information without explicit consent.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you guarantee patient appointments?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">No. We do not guarantee patient appointments, specific enquiry volumes, or medical outcomes. Marketing creates visibility and enquiry opportunities. Actual appointments depend on practice reputation, doctor availability, pricing transparency, patient experience, response speed, and many other factors.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What is included in monthly reporting?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Monthly reports include campaign performance, cost metrics, appointment enquiry data, call tracking insights, Google Maps actions, local search visibility, reputation metrics, social engagement, creative analysis, and actionable recommendations for the next growth cycle. All data displayed is verified.</div></div></div>
</div></div></section>

<!-- ═══════ ENQUIRY FORM ═══════ -->
<section class="rem-section" id="enquiry" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Get Started</div><h2 class="rem-section-title">Request Your Healthcare Marketing Plan</h2><p class="rem-section-sub">Tell us about your practice and we will share a tailored marketing approach for your healthcare business.</p></div>
<div class="rem-form-card" style="max-width:800px;margin:0 auto">
<div class="rem-form-header"><h3>Get My Healthcare Marketing Plan</h3><p>Fill in the details and our team will reach out within 24 hours.</p></div>
<div class="rem-form-body" id="remFormBody">
<form id="remForm" onsubmit="return submitREMEnquiry(event)">
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Full Name *</label><input class="rem-form-input" type="text" name="name" required placeholder="Your full name"></div>
<div class="rem-form-group"><label class="rem-form-label">Clinic or Hospital Name *</label><input class="rem-form-input" type="text" name="business" required placeholder="Your clinic or hospital name"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Phone Number *</label><input class="rem-form-input" type="tel" name="phone" required placeholder="+91 98765 43210"></div>
<div class="rem-form-group"><label class="rem-form-label">Email Address *</label><input class="rem-form-input" type="email" name="email" required placeholder="you@example.com"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Healthcare Business Type *</label>
<select class="rem-form-select" name="businessType" required>
<option value="">Select business type</option>
<option>Clinic</option><option>Hospital</option><option>Doctor</option><option>Dentist</option><option>Dental Clinic</option><option>Diagnostic Centre</option><option>Physiotherapy Clinic</option><option>Multispeciality Clinic</option><option>Specialty Practice</option><option>Healthcare Centre</option><option>Other</option>
</select></div>
<div class="rem-form-group"><label class="rem-form-label">City or Service Area *</label><input class="rem-form-input" type="text" name="city" required placeholder="e.g. Ghaziabad, Delhi NCR"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Medical Specialty</label><input class="rem-form-input" type="text" name="specialty" placeholder="e.g. Cardiology, Dermatology, Dental, General"></div>
<div class="rem-form-group"><label class="rem-form-label">Number of Locations</label><input class="rem-form-input" type="text" name="locations" placeholder="e.g. 1, 3, 10+"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Primary Goal *</label>
<select class="rem-form-select" name="goal" required>
<option value="">Select primary goal</option>
<option>Increase patient enquiries</option><option>Improve appointment bookings</option><option>Improve Google Maps visibility</option><option>Improve local SEO</option><option>Build online reputation</option><option>Promote a new clinic</option><option>Promote a doctor or specialty</option><option>Improve social media presence</option><option>Generate calls and WhatsApp enquiries</option><option>Improve enquiry tracking</option><option>Manage multiple locations</option><option>Other</option>
</select></div>
<div class="rem-form-group"><label class="rem-form-label">Monthly Advertising Budget</label>
<select class="rem-form-select" name="budget">
<option value="">Select range</option>
<option>Under ₹50,000</option><option>₹50,000 – ₹1 Lakh</option><option>₹1 Lakh – ₹3 Lakhs</option><option>₹3 Lakhs – ₹5 Lakhs</option><option>₹5 Lakhs – ₹10 Lakhs</option><option>Above ₹10 Lakhs</option>
</select></div>
</div>
<div class="rem-form-group"><label class="rem-form-label">Required Services (select all that apply)</label>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Lead Generation"><span>Lead Generation</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Reputation Management"><span>Reputation</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Appointment Booking"><span>Appointments</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Google Maps SEO"><span>Google Maps</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Local SEO"><span>Local SEO</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Social Media"><span>Social Media</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Meta Ads"><span>Meta Ads</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Landing Page"><span>Landing Page</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="WhatsApp"><span>WhatsApp</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Complete Healthcare"><span>Full Solution</span></label>
</div></div>
<div class="rem-form-group"><label class="rem-form-label">Message</label><textarea class="rem-form-textarea" name="message" placeholder="Tell us about your practice, current marketing, or specific requirements..." rows="3"></textarea></div>
<div class="rem-form-check"><input type="checkbox" id="remConsent" required><label for="remConsent">I agree to be contacted regarding my enquiry. Your data will be handled securely.</label></div>
<div style="background:rgba(230,57,70,.08);border:1px solid rgba(230,57,70,.2);border-radius:var(--radius-sm);padding:12px 16px;font-size:.78rem;color:var(--text-secondary);line-height:1.5;margin-top:1rem;display:flex;align-items:flex-start;gap:8px"><span style="color:var(--red);flex-shrink:0;font-size:1rem;margin-top:1px">⚠️</span><span>Do not submit personal medical records or emergency health information through this form. For medical emergencies, contact local emergency services or visit the nearest emergency department.</span></div>
<div class="rem-form-submit"><button type="submit" class="lb lb-orange lb-full" id="remSubmitBtn"><div class="lb-shine"></div><span class="lb-text" id="remSubmitText">Get My Healthcare Marketing Plan →</span></button></div>
</form>
<div class="rem-form-success" id="remFormSuccess">
<div class="rem-form-success-icon">✅</div>
<h4>Thank You</h4>
<p>Your enquiry has been received. Our team will review your requirements and reach out within 24 hours to discuss a tailored healthcare marketing plan for your practice.</p>
</div></div></div></div></section>

<!-- ═══════ FINAL CTA ═══════ -->
<section class="rem-cta"><div class="rem-section-inner">
<h2 class="rem-cta-title reveal">Build a Trusted and Discoverable Healthcare Presence</h2>
<p class="rem-cta-sub reveal reveal-delay-1">Discuss your clinic, hospital, medical specialty, target location, appointment process, and growth goals with AdScale.</p>
<div class="rem-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Healthcare Marketing Consultation</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Request a Patient Growth Strategy</span></a>
</div></div></section>

<!-- ═══════ STICKY MOBILE CTA ═══════ -->
<div class="rem-sticky-cta" id="remStickyCTA"><div class="rem-sticky-cta-inner">
<a href="tel:+917388509954" class="lb lb-sm"><div class="lb-shine"></div><span class="lb-text">📞 Call Now</span></a>
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get Your Free Marketing Plan</span></a>
</div></div>

<!-- ═══════ SCHEMA ═══════ -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","name":"Healthcare Marketing Services","description":"Patient lead generation, Google Maps SEO, local SEO, reputation management, appointment booking, social media marketing, Meta Ads, and landing pages for healthcare providers.","provider":{"@type":"Organization","name":"AdScale Media","url":"<?php echo esc_url(home_url('/')); ?>"},"areaServed":{"@type":"City","name":"India"},"serviceType":["Digital Marketing","Patient Lead Generation","Healthcare Advertising"]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is healthcare digital marketing?","acceptedAnswer":{"@type":"Answer","text":"Healthcare digital marketing uses channels such as Google Maps, local SEO, social media, Meta Ads, website optimization, and reputation management to help healthcare providers improve local visibility, generate patient enquiries, and build a trusted online presence."}},{"@type":"Question","name":"Can you generate patient enquiries for clinics?","acceptedAnswer":{"@type":"Answer","text":"Yes. We help clinics generate relevant patient enquiries through local SEO, Google Maps optimization, appointment landing pages, Meta Ads, and social media. We do not promise a fixed number of patients or appointments."}}]}
</script>

<!-- ═══════ TRACKING PLACEHOLDERS ═══════ -->
<!-- Google Analytics: Replace G-XXXXXXXXXX -->
<!-- Google Tag Manager: Replace GTM-XXXXXXX -->
<!-- Meta Pixel: Replace 000000000000000 -->
<!-- Google Ads Conversion: Replace AW-XXXXXXXXX -->
<!-- Form submission conversion tracking -->
<!-- WhatsApp click conversion tracking -->
<!-- Call click conversion tracking -->
<!-- CRM webhook: https://your-crm.com/webhook/leads -->
<!-- UTM parameters are captured: utm_source, utm_medium, utm_campaign, utm_content, utm_term -->

<script>
function toggleREMFAQ(el){var p=el.parentElement;p.classList.toggle('open')}
function submitREMEnquiry(e){e.preventDefault();var btn=document.getElementById('remSubmitBtn'),txt=document.getElementById('remSubmitText');btn.disabled=true;txt.textContent='Submitting...';fetch('<?php echo esc_url(admin_url('admin-ajax.php')); ?>',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({action:'healthcare_enquiry',_ajax_nonce:'<?php echo wp_create_nonce('healthcare_enquiry_nonce'); ?>',formData:JSON.stringify(Object.fromEntries(new FormData(e.target)))})}).then(function(r){if(r.ok){document.getElementById('remForm').style.display='none';document.getElementById('remFormSuccess').classList.add('visible')}else{txt.textContent='Error — please try again';btn.disabled=false}}).catch(function(){txt.textContent='Error — please try again';btn.disabled=false});return false}
// Scroll reveal
document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.reveal');if(!els.length)return;var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:0.1});els.forEach(function(e){obs.observe(e)})})
// Header scroll
document.addEventListener('DOMContentLoaded',function(){var h=document.querySelector('.rem-header');if(!h)return;var last=0;window.addEventListener('scroll',function(){var y=window.scrollY;if(y>last&&y>100){h.style.transform='translateY(-100%)'}else{h.style.transform='translateY(0)'}last=y},{passive:true})})
</script>

<?php get_footer(); ?>
