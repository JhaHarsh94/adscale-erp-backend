<?php
/**
 * AdScale Media — Real Estate Marketing Landing Page
 * Template Name: Real Estate Marketing
 */
get_header();
$home_url = home_url('/');
?>
<style>
/* ══════════════════════════════════════
   REAL ESTATE MARKETING — PAGE STYLES
   ══════════════════════════════════════ */

body.page-template-page-real-estate-marketing { background:var(--bg-void); }
body.page-template-page-real-estate-marketing #navbar,
body.page-template-page-real-estate-marketing #mobile-menu,
body.page-template-page-real-estate-marketing footer,
body.page-template-page-real-estate-marketing .wa-float-lb,
body.page-template-page-real-estate-marketing #scroll-top-lb,
body.page-template-page-real-estate-marketing #progress-bar,
body.page-template-page-real-estate-marketing #loader,
body.page-template-page-real-estate-marketing .page-hero { display:none !important; }
body.page-template-page-real-estate-marketing .page-hero,
body.page-template-page-real-estate-marketing section { padding-top:0; }

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
.rem-hero-eyebrow{display:inline-flex;align-items:center;gap:.8rem;font-family:var(--font-mono);font-size:.72rem;color:var(--orange);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1.4rem}
.rem-hero-eyebrow::before{content:"";width:28px;height:1px;background:var(--orange)}
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
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get a Free Strategy Call</span></a>
<a href="tel:+917388509954" class="lb lb-sm lb-hide-mobile"><div class="lb-shine"></div><span class="lb-text">📞 +91 7388509954</span></a>
</div></div></header>

<!-- ═══════ HERO ═══════ -->
<section class="rem-hero">
<div class="rem-hero-overlay"></div><div class="rem-orb rem-orb-1"></div><div class="rem-orb rem-orb-2"></div>
<div class="rem-hero-content"><div class="rem-hero-layout">
<div class="rem-hero-text">
<div class="rem-hero-eyebrow reveal">Real Estate Performance Marketing</div>
<h1 class="rem-hero-headline reveal reveal-delay-1">Turn Property Interest Into<br><span class="accent">Qualified Buyer Enquiries</span></h1>
<p class="rem-hero-sub reveal reveal-delay-2">AdScale helps real estate businesses generate, capture, qualify, and manage property enquiries through Meta Ads, Google Ads, conversion-focused landing pages, video marketing, CRM integration, and WhatsApp automation.</p>
<div class="rem-hero-actions reveal reveal-delay-3">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Real Estate Marketing Strategy</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Book a Property Lead Generation Call</span></a>
</div>
<div class="rem-hero-highlights reveal reveal-delay-4">
<span class="rem-hero-highlight-item"><span class="dot"></span> Qualified property enquiries</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> Campaign-specific landing pages</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> CRM-ready lead flow</span>
<span class="rem-hero-highlight-item"><span class="dot"></span> WhatsApp follow-up automation</span>
</div></div>
<div class="rem-hero-visual reveal reveal-delay-2">
<div class="rem-dashboard-card">
<div class="rem-db-header"><span class="rem-db-title">Property Campaign Overview</span><span class="rem-db-badge">● Live</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Leads This Month</span><span class="rem-db-row-value green">+48 enquiries</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Avg. Cost Per Lead</span><span class="rem-db-row-value orange">Tracking enabled</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Lead Qualification Rate</span><span class="rem-db-row-value blue">Monitoring</span></div>
<div class="rem-db-row"><span class="rem-db-row-label">Active Campaigns</span><span class="rem-db-row-value">4 running</span></div>
<div style="margin-top:1rem"><div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-bottom:4px"><span>Lead quality score</span><span>Improving</span></div><div class="rem-db-bar"><div class="rem-db-bar-fill" style="width:72%"></div></div></div></div></div></div></div></section>

<!-- ═══════ WHO WE HELP ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Who We Help</div><h2 class="rem-section-title">Real Estate Businesses We Support</h2><p class="rem-section-sub">Property marketing solutions designed for every segment of the real estate industry.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon green">🏗️</div><div class="rem-card-title">Builders</div><div class="rem-card-desc">Marketing support for residential, commercial, plotting, and redevelopment projects. Campaigns designed to generate qualified buyer enquiries.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">🏢</div><div class="rem-card-title">Real Estate Developers</div><div class="rem-card-desc">Campaign planning for project launches, inventory promotion, site visits, and lead generation across digital channels.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">🏠</div><div class="rem-card-title">Realtors</div><div class="rem-card-desc">Lead generation and follow-up systems for individual agents and brokerage teams. Structured campaigns for local property markets.</div></div>
<div class="rem-card reveal"><div class="rem-card-icon green">📊</div><div class="rem-card-title">Property Consultants</div><div class="rem-card-desc">Digital marketing systems for buyer enquiries, investor leads, resale properties, and rental opportunities.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">🤝</div><div class="rem-card-title">Channel Partners</div><div class="rem-card-desc">Campaigns designed to support project promotion and channel sales with trackable lead sources and automated follow-up.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">📈</div><div class="rem-card-title">Real Estate Agencies</div><div class="rem-card-desc">Centralized lead generation, landing pages, CRM workflows, and performance reporting for growing agencies.</div></div>
</div></div></section>

<!-- ═══════ CHALLENGES ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">The Challenge</div><h2 class="rem-section-title">Real Estate Marketing Challenges</h2><p class="rem-section-sub">Common problems that prevent property enquiries from converting into site visits and sales.</p></div>
<div class="rem-grid-3">
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">High cost per lead with low-quality enquiries</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Duplicate leads and unresponsive prospects</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Poor follow-up — leads not reaching the sales team</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Generic landing pages with low conversion rates</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No lead tracking or campaign source attribution</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Manual WhatsApp follow-up with missed enquiries</span></div>
<div class="rem-problem-card reveal"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Traffic without site visits or meaningful engagement</span></div>
<div class="rem-problem-card reveal reveal-delay-1"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">Leads outside the target location or budget range</span></div>
<div class="rem-problem-card reveal reveal-delay-2"><span class="rem-problem-icon">✕</span><span class="rem-problem-text">No CRM workflow or structured sales pipeline</span></div>
</div></div></section>

<!-- ═══════ SOLUTION ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Our Solution</div><h2 class="rem-section-title">Complete Property Lead Generation System</h2><p class="rem-section-sub">An integrated marketing system that connects advertising, landing pages, CRM, and sales follow-up.</p></div>
<div class="rem-grid-4">
<div class="rem-card reveal"><div class="rem-card-icon">🎯</div><div class="rem-card-title">Audience &amp; Campaign Strategy</div><div class="rem-card-desc">Buyer persona research, location targeting, budget-based planning, and campaign structure aligned with your project goals.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📱</div><div class="rem-card-title">Meta &amp; Google Ads</div><div class="rem-card-desc">Paid campaigns across Facebook, Instagram, and Google Search designed to reach potential buyers actively looking for property.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">📄</div><div class="rem-card-title">Conversion Landing Pages</div><div class="rem-card-desc">Project-specific landing pages with optimized forms, property details, location maps, and clear calls to action.</div></div>
<div class="rem-card reveal reveal-delay-3"><div class="rem-card-icon">🔄</div><div class="rem-card-title">CRM &amp; WhatsApp Automation</div><div class="rem-card-desc">Automated lead capture, instant acknowledgements, sales team notifications, and structured follow-up workflows.</div></div>
</div></div></section>

<!-- ═══════ LEAD GENERATION ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Lead Generation</div><h2 class="rem-section-title">Real Estate Lead Generation</h2><p class="rem-section-sub">A structured system that attracts, captures, and routes relevant property enquiries.</p></div>
<div class="rem-grid-2">
<div><div class="rem-card reveal"><div class="rem-card-title">Enquiry Types We Help Generate</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Buyer lead generation</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Investor lead generation</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Site visit enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Project launch enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Residential &amp; commercial leads</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Plot and land enquiries</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Channel partner leads</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Location &amp; budget targeting</span></div>
</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-title" style="margin-bottom:.8rem">What Affects Lead Quality</div>
<p class="rem-card-desc" style="margin-bottom:.6rem">Lead quality depends on the offer, location, property pricing, market demand, campaign budget, creative quality, audience targeting, sales follow-up, project reputation, and landing-page experience.</p>
<p class="rem-card-desc">We do not promise a fixed number of leads. Our focus is on building campaigns that attract relevant enquiries and routing them effectively to your sales team.</p>
</div></div></div></section>

<!-- ═══════ META ADS ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Meta Ads</div><h2 class="rem-section-title">Meta Ads for Real Estate</h2><p class="rem-section-sub">Reach potential property buyers across Facebook and Instagram with targeted campaigns.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📢</div><div class="rem-card-title">Campaign Types</div><div class="rem-card-desc">Project awareness, lead generation, website conversion, WhatsApp campaigns, video views, and retargeting campaigns tailored for real estate.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🎯</div><div class="rem-card-title">Audience Targeting</div><div class="rem-card-desc">Location-based targeting, interest-based targeting, buyer persona profiling, lookalike audiences, and remarketing for property enquiries.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">📊</div><div class="rem-card-title">Campaign Goals</div><div class="rem-card-desc">Generate buyer enquiries, promote project launches, drive site visit bookings, reach investors, and generate WhatsApp enquiries.</div></div>
</div>
<div style="text-align:center;margin-top:2rem"><p style="font-size:.85rem;color:var(--text-muted)">We do not claim guaranteed CPL or guaranteed sales. Results depend on market conditions, budget, and project factors.</p></div>
</div></section>

<!-- ═══════ GOOGLE ADS ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Google Ads</div><h2 class="rem-section-title">Google Ads for Real Estate</h2><p class="rem-section-sub">Capture people actively searching for property with high-intent campaigns.</p></div>
<div class="rem-grid-2">
<div><div class="rem-card reveal"><div class="rem-card-title">Search Campaigns</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Location-specific campaigns</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Project-name targeting</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Property-type campaigns</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">High-intent keyword focus</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Negative keyword management</span></div>
<div class="rem-problem-card" style="border-color:var(--border)"><span class="rem-problem-text">Call &amp; lead form campaigns</span></div>
</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-title" style="margin-bottom:.8rem">Search Intent Examples</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Flats for sale in [location]</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">New residential project</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Commercial property investment</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Plots for sale</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Luxury apartments</span>
<span style="font-size:.82rem;color:var(--text-secondary);padding:.4rem .6rem;background:var(--bg-card-alt);border-radius:6px">Property consultant near me</span>
</div></div></div></div></section>

<!-- ═══════ VIDEO MARKETING ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Video Marketing</div><h2 class="rem-section-title">Property Video Marketing</h2><p class="rem-section-sub">Professional property videos help buyers understand the project before contacting your sales team.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon orange">🎬</div><div class="rem-card-title">Property Videos</div><div class="rem-card-desc">Project introductions, walkthroughs, site tours, drone footage, construction updates, location advantages, amenities showcases, and floor plan videos.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon orange">📱</div><div class="rem-card-title">Short-Form &amp; Reels</div><div class="rem-card-desc">Social media videos, reels, motion graphics, property highlight clips, and investment opportunity videos optimized for mobile platforms.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon orange">📋</div><div class="rem-card-title">Client Assets Required</div><div class="rem-card-desc">Raw footage, legal permissions, project details, and media assets must be provided or approved by the client. No fake property footage or misleading visuals.</div></div>
</div></div></section>

<!-- ═══════ LANDING PAGES ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Landing Pages</div><h2 class="rem-section-title">Real Estate Landing Pages</h2><p class="rem-section-sub">Dedicated campaign landing pages perform better than sending all traffic to a generic website.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📄</div><div class="rem-card-title">Page Types</div><div class="rem-card-desc">Project-specific pages for residential, commercial, plotting, and luxury properties with lead forms, galleries, and location maps.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📱</div><div class="rem-card-title">Key Features</div><div class="rem-card-desc">Mobile-first design, fast loading, conversion tracking, CRM integration, WhatsApp CTA, click-to-call, and thank-you pages with source attribution.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">⚠️</div><div class="rem-card-title">Important Note</div><div class="rem-card-desc">Unverified prices, approvals, possession dates, RERA numbers, or availability are not displayed. Placeholders are used where verified project details must be inserted.</div></div>
</div></div></section>

<!-- ═══════ CRM INTEGRATION ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">CRM</div><h2 class="rem-section-title">CRM Integration</h2><p class="rem-section-sub">Organize and track every property enquiry from first contact to site visit and beyond.</p></div>
<div class="rem-grid-2">
<div class="rem-card reveal"><div class="rem-card-title" style="margin-bottom:.8rem">CRM Capabilities</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary)">• Lead capture &amp; auto-entry</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Source &amp; campaign tracking</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Lead assignment to agents</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Follow-up reminders</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Site visit scheduling</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Duplicate lead detection</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Sales pipeline stages</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Reporting dashboard</span>
</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-title" style="margin-bottom:.8rem">Sales Pipeline Stages</div>
<div style="display:flex;flex-wrap:wrap;gap:6px">
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">New Lead</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Contacted</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Interested</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Follow-Up</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Site Visit Scheduled</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Site Visit Done</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Negotiation</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Booking</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Lost</span>
<span style="font-size:.75rem;color:var(--text-secondary);background:var(--bg-elevated);padding:.25rem .6rem;border-radius:100px">Not Qualified</span>
</div>
<p style="font-size:.78rem;color:var(--text-muted);margin-top:1rem">Integration depends on the CRM, available APIs, website setup, and selected automation tools.</p>
</div></div></div></section>

<!-- ═══════ WHATSAPP AUTOMATION ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">WhatsApp</div><h2 class="rem-section-title">WhatsApp Automation</h2><p class="rem-section-sub">Improve response time and follow-up with automated WhatsApp communication.</p></div>
<div class="rem-grid-2">
<div class="rem-card reveal"><div class="rem-card-title" style="margin-bottom:.8rem">Automation Features</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
<span style="font-size:.82rem;color:var(--text-secondary)">• Instant acknowledgement</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Property brochure delivery</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Price-range information</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Site visit booking</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Lead qualification questions</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Sales agent notification</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Follow-up reminders</span>
<span style="font-size:.82rem;color:var(--text-secondary)">• Campaign source tracking</span>
</div></div>
<div class="rem-card reveal reveal-delay-1">
<div class="rem-card-icon orange" style="margin-bottom:.8rem">⚖️</div>
<div class="rem-card-title" style="margin-bottom:.6rem">Compliance &amp; Limitations</div>
<div class="rem-card-desc"><p style="margin-bottom:.4rem">• WhatsApp automation must follow Meta and WhatsApp policies.</p><p style="margin-bottom:.4rem">• Official WhatsApp Business API or approved integrations may involve third-party charges.</p><p style="margin-bottom:.4rem">• Automation should not be used for spam.</p><p style="margin-bottom:.4rem">• Customer consent and template approval may be required.</p></div>
</div></div></div></section>

<!-- ═══════ LEAD FLOW ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Lead Flow</div><h2 class="rem-section-title">Integrated Property Lead Flow</h2><p class="rem-section-sub">How Meta Ads, Google Ads, landing pages, CRM, and WhatsApp work together as a connected system.</p></div>
<div class="rem-flow">
<div class="rem-flow-step reveal"><div class="rem-flow-num">01</div><span class="rem-flow-icon">📱</span><div class="rem-flow-label">Property Ad Viewed</div></div>
<div class="rem-flow-step reveal reveal-delay-1"><div class="rem-flow-num">02</div><span class="rem-flow-icon">📄</span><div class="rem-flow-label">Landing Page Visit</div></div>
<div class="rem-flow-step reveal reveal-delay-2"><div class="rem-flow-num">03</div><span class="rem-flow-icon">✉️</span><div class="rem-flow-label">Enquiry Submitted</div></div>
<div class="rem-flow-step reveal reveal-delay-3"><div class="rem-flow-num">04</div><span class="rem-flow-icon">📊</span><div class="rem-flow-label">Lead in CRM</div></div>
<div class="rem-flow-step reveal"><div class="rem-flow-num">05</div><span class="rem-flow-icon">📞</span><div class="rem-flow-label">Agent Assigned</div></div>
<div class="rem-flow-step reveal reveal-delay-1"><div class="rem-flow-num">06</div><span class="rem-flow-icon">💬</span><div class="rem-flow-label">WhatsApp Ack</div></div>
<div class="rem-flow-step reveal reveal-delay-2"><div class="rem-flow-num">07</div><span class="rem-flow-icon">📅</span><div class="rem-flow-label">Site Visit</div></div>
<div class="rem-flow-step reveal reveal-delay-3"><div class="rem-flow-num">08</div><span class="rem-flow-icon">📈</span><div class="rem-flow-label">Review &amp; Optimize</div></div>
</div></div></section>

<!-- ═══════ PROCESS ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">Process</div><h2 class="rem-section-title">Our Real Estate Marketing Process</h2><p class="rem-section-sub">A structured approach from project discovery to campaign optimization.</p></div>
<div class="rem-process-grid">
<div class="rem-process-step reveal"><div class="rem-process-num">01</div><span class="rem-process-icon">🔍</span><div class="rem-process-title">Project Discovery</div><div class="rem-process-desc">Understand project type, location, target buyer, price range, inventory, selling points, competitors, and campaign goals.</div></div>
<div class="rem-process-step reveal reveal-delay-1"><div class="rem-process-num">02</div><span class="rem-process-icon">📊</span><div class="rem-process-title">Market &amp; Audience Research</div><div class="rem-process-desc">Research buyer profiles, search intent, competing projects, location demand, and creative angles.</div></div>
<div class="rem-process-step reveal reveal-delay-2"><div class="rem-process-num">03</div><span class="rem-process-icon">🧩</span><div class="rem-process-title">Funnel Planning</div><div class="rem-process-desc">Plan ad campaigns, landing page, lead form, CRM workflow, WhatsApp automation, tracking, and reporting.</div></div>
<div class="rem-process-step reveal reveal-delay-3"><div class="rem-process-num">04</div><span class="rem-process-icon">🎨</span><div class="rem-process-title">Creative &amp; Page Preparation</div><div class="rem-process-desc">Prepare ad copy, property creatives, videos, landing page, lead form, and tracking setup for campaign launch.</div></div>
</div>
<div class="rem-process-grid" style="margin-top:20px">
<div class="rem-process-step reveal"><div class="rem-process-num">05</div><span class="rem-process-icon">🚀</span><div class="rem-process-title">Campaign Launch</div><div class="rem-process-desc">Launch approved campaigns on relevant platforms with proper tracking and lead routing.</div></div>
<div class="rem-process-step reveal reveal-delay-1"><div class="rem-process-num">06</div><span class="rem-process-icon">🔄</span><div class="rem-process-title">Lead Capture &amp; Routing</div><div class="rem-process-desc">Send enquiries to the correct sales team or CRM with source attribution and WhatsApp acknowledgement.</div></div>
<div class="rem-process-step reveal reveal-delay-2"><div class="rem-process-num">07</div><span class="rem-process-icon">📈</span><div class="rem-process-title">Optimization</div><div class="rem-process-desc">Review lead quality, campaign cost, audience response, search terms, creative performance, and conversion.</div></div>
<div class="rem-process-step reveal reveal-delay-3"><div class="rem-process-num">08</div><span class="rem-process-icon">📋</span><div class="rem-process-title">Reporting</div><div class="rem-process-desc">Share clear campaign and lead-generation reports with actionable recommendations.</div></div>
</div></div></section>

<!-- ═══════ DELIVERABLES ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Deliverables</div><h2 class="rem-section-title">What Is Included</h2><p class="rem-section-sub">A comprehensive set of services built around your property marketing needs.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">📋</div><div class="rem-card-title">Strategy &amp; Planning</div><div class="rem-card-desc">Project marketing consultation, buyer persona research, competitor research, campaign strategy, and funnel planning.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">📱</div><div class="rem-card-title">Campaign Execution</div><div class="rem-card-desc">Meta Ads planning, Google Ads planning, ad copywriting, creative direction, property video strategy, and landing-page development.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">🔧</div><div class="rem-card-title">Systems &amp; Tracking</div><div class="rem-card-desc">Lead form setup, conversion tracking, CRM integration planning, WhatsApp automation planning, remarketing setup, and monthly reporting.</div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Final deliverables depend on the selected package, advertising platforms, project requirements, client-provided assets, and approved scope.</p>
</div></section>

<!-- ═══════ WHY ADSCALE ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Why AdScale</div><h2 class="rem-section-title">Why Choose AdScale</h2><p class="rem-section-sub">Built on process, transparency, and real estate marketing expertise.</p></div>
<div class="rem-grid-4">
<div class="rem-card reveal"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Real Estate Focus</div><div class="rem-card-desc">Funnel planning and integrated lead-generation systems designed specifically for property businesses.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Platform Expertise</div><div class="rem-card-desc">Meta and Google campaign strategy with conversion-focused landing pages and CRM-ready lead capture.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Transparent Approach</div><div class="rem-card-desc">No fake lead guarantees, no misleading campaign claims. Clear reporting and honest communication.</div></div>
<div class="rem-card reveal reveal-delay-3"><div class="rem-card-icon green">✓</div><div class="rem-card-title">Sales &amp; Marketing Alignment</div><div class="rem-card-desc">Mobile-first, tracking-first execution designed to align marketing with sales follow-up.</div></div>
</div></div></section>

<!-- ═══════ QUALITY COMMITMENT ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">Commitment</div><h2 class="rem-section-title">Our Quality Commitment</h2><p class="rem-section-sub">How we ensure every campaign meets professional standards.</p></div>
<div class="rem-commit-grid">
<div class="rem-commit-item reveal"><span class="ck">✓</span> Accurate use of approved project information</div>
<div class="rem-commit-item reveal reveal-delay-1"><span class="ck">✓</span> Clear campaign tracking and transparent reporting</div>
<div class="rem-commit-item reveal reveal-delay-2"><span class="ck">✓</span> No misleading property claims or pricing</div>
<div class="rem-commit-item reveal reveal-delay-3"><span class="ck">✓</span> No fabricated results or fake urgency</div>
<div class="rem-commit-item reveal"><span class="ck">✓</span> Secure lead data handling with consent-based communication</div>
<div class="rem-commit-item reveal reveal-delay-1"><span class="ck">✓</span> Responsive, accessible landing pages for all devices</div>
<div class="rem-commit-item reveal reveal-delay-2"><span class="ck">✓</span> No unapproved creative assets or false availability</div>
<div class="rem-commit-item reveal reveal-delay-3"><span class="ck">✓</span> Continuous campaign improvement with honest recommendations</div>
</div></div></section>

<!-- ═══════ STRATEGY EXAMPLES ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">Strategies</div><h2 class="rem-section-title">Campaign Strategy Examples</h2><p class="rem-section-sub">Illustrative marketing strategies based on common real estate campaign requirements.</p></div>
<div class="rem-grid-2">
<div class="rem-scenario reveal"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Residential Project Launch</h4><p>Campaign structure for a new residential project entering the market.</p><ul><li>Target buyers by location, budget, and property type</li><li>Meta Ads for project awareness + Google Ads for high-intent search</li><li>Project-specific landing page with gallery, floor plans, and lead form</li><li>CRM workflow: New Lead → Contacted → Site Visit → Follow-Up</li><li>Metrics to track: cost per lead, contact rate, site visit booking rate</li></ul></div>
<div class="rem-scenario reveal reveal-delay-1"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Commercial Property Campaign</h4><p>Investor-focused campaign for commercial real estate.</p><ul><li>Google Ads targeting high-intent commercial property keywords</li><li>LinkedIn audience targeting for business decision-makers</li><li>Video walkthrough with investment ROI summary</li><li>Consultation booking CTA instead of standard lead form</li><li>CRM lead stages: New → Qualified → Meeting Set → Negotiation</li></ul></div>
<div class="rem-scenario reveal"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Plotting Project Campaign</h4><p>Location-focused campaign for plot and land development projects.</p><ul><li>Google Ads targeting location + plot/land keywords</li><li>Meta Ads with map-based creatives showing location advantages</li><li>WhatsApp enquiry flow with instant brochure delivery</li><li>Site visit CTA with map, nearby landmarks, and connectivity highlights</li><li>Lead qualification: budget, preferred size, timeline</li></ul></div>
<div class="rem-scenario reveal reveal-delay-1"><div class="rem-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Realtor Lead Generation</h4><p>Local property campaign for individual agents and teams.</p><ul><li>Hyperlocal Meta Ads targeting property seekers in specific areas</li><li>Buyer requirement form capturing budget, location, and property type</li><li>CRM with lead assignment to specific agents</li><li>WhatsApp follow-up with matching property options</li><li>Source tracking to measure which campaign generates quality leads</li></ul></div>
</div></div></section>

<!-- ═══════ METRICS ═══════ -->
<section class="rem-section"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Measurement</div><h2 class="rem-section-title">Campaign Metrics to Track</h2><p class="rem-section-sub">Real campaigns may be evaluated using these performance indicators.</p></div>
<div class="rem-metrics">
<div class="rem-metric reveal"><div class="rem-metric-icon">💰</div><div class="rem-metric-val">CPL</div><div class="rem-metric-label">Cost per lead</div></div>
<div class="rem-metric reveal reveal-delay-1"><div class="rem-metric-icon">📊</div><div class="rem-metric-val">LQR</div><div class="rem-metric-label">Lead qualification rate</div></div>
<div class="rem-metric reveal reveal-delay-2"><div class="rem-metric-icon">📞</div><div class="rem-metric-val">CR</div><div class="rem-metric-label">Contact rate</div></div>
<div class="rem-metric reveal reveal-delay-3"><div class="rem-metric-icon">📅</div><div class="rem-metric-val">SVR</div><div class="rem-metric-label">Site visit booking rate</div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Performance values are not displayed unless verified. Each campaign is measured against its specific goals and market conditions.</p>
</div></section>

<!-- ═══════ WHO THIS IS FOR ═══════ -->
<section class="rem-section" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label orange">This Service Is For</div><h2 class="rem-section-title">Who This Service Is For</h2><p class="rem-section-sub">Real estate businesses that need structured digital marketing and lead management.</p></div>
<div class="rem-grid-3">
<div class="rem-card reveal"><div class="rem-card-icon">🏗️</div><div class="rem-card-title">New &amp; Ongoing Projects</div><div class="rem-card-desc">New property launches needing awareness and lead generation, and ongoing projects requiring consistent enquiry flow.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🏘️</div><div class="rem-card-title">Builders &amp; Developers</div><div class="rem-card-desc">Builders needing qualified enquiries and developers entering a new market with targeted campaigns.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">🏠</div><div class="rem-card-title">Realtors &amp; Consultants</div><div class="rem-card-desc">Realtors building a predictable lead pipeline and consultants managing multiple property listings.</div></div>
<div class="rem-card reveal"><div class="rem-card-icon">🤝</div><div class="rem-card-title">Channel Partners</div><div class="rem-card-desc">Channel partners promoting developer inventory with trackable lead sources and automated follow-up.</div></div>
<div class="rem-card reveal reveal-delay-1"><div class="rem-card-icon">🏢</div><div class="rem-card-title">Commercial &amp; Luxury</div><div class="rem-card-desc">Commercial property sellers, plotting project promoters, and luxury real estate brands requiring premium positioning.</div></div>
<div class="rem-card reveal reveal-delay-2"><div class="rem-card-icon">⚠️</div><div class="rem-card-title">May Not Be Suitable</div><div class="rem-card-desc">Businesses expecting guaranteed sales without a competitive project, proper budget, responsive sales team, and consistent follow-up.</div></div>
</div></div></section>

<!-- ═══════ MID-PAGE CTA ═══════ -->
<section class="rem-cta rem-cta-dark"><div class="rem-section-inner">
<h2 class="rem-cta-title reveal">Need More Qualified Enquiries for Your Property Project?</h2>
<p class="rem-cta-sub reveal reveal-delay-1">Build a structured marketing funnel that connects advertising, landing pages, CRM, WhatsApp, and sales follow-up.</p>
<div class="rem-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Strategy Call</span></a>
</div></div></section>

<!-- ═══════ FAQ ═══════ -->
<section class="rem-section" id="faq"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label">FAQs</div><h2 class="rem-section-title">Frequently Asked Questions</h2><p class="rem-section-sub">Honest answers to common questions about real estate digital marketing.</p></div>
<div class="rem-faq-list">
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What is real estate digital marketing?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Real estate digital marketing uses online channels such as Meta Ads, Google Ads, property videos, and landing pages to generate enquiries from potential buyers, investors, and channel partners for property projects.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">How do you generate property leads?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">We use a combination of audience research, campaign strategy, targeted ads, conversion-focused landing pages, lead forms, CRM integration, and WhatsApp automation to capture and manage enquiries. Results depend on market conditions, budget, and project factors.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Which is better for real estate — Meta Ads or Google Ads?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Both serve different purposes. Meta Ads are effective for building awareness and reaching potential buyers based on interests and demographics. Google Ads capture people actively searching for property. Many campaigns benefit from using both platforms together.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you generate leads for a new property project?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. New project launches benefit from awareness campaigns, pre-launch lead generation, and targeted advertising to reach potential buyers before and during the launch phase.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you market residential and commercial projects?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We plan campaigns for residential, commercial, plotting, luxury, rental, and resale property segments. Each campaign is structured based on the project type and target audience.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you promote plots and land projects?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. Plotting projects benefit from location-focused targeting, map-based creatives, WhatsApp enquiry flows, and landing pages that highlight connectivity, amenities, and investment potential.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you create real estate landing pages?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We create project-specific landing pages with optimized lead forms, property galleries, location maps, and clear calls to action. Pages are mobile-first and conversion-focused.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you integrate leads with our CRM?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Integration depends on the CRM, available APIs, website setup, and selected automation tools. We assess integration requirements during the planning phase and recommend suitable options.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you set up WhatsApp automation for property enquiries?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. WhatsApp automation can be set up for instant acknowledgements, brochure delivery, appointment booking, and lead qualification. Automation must follow Meta and WhatsApp policies.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Is WhatsApp automation free?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Official WhatsApp Business API or approved integrations may involve third-party charges. We do not promise completely free official WhatsApp automation.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you create property videos?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We create property walkthroughs, project introduction videos, site tours, construction updates, drone footage, motion graphics, and short-form videos for social media. Raw footage and client approval are required.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What assets do we need to provide?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Project details, property images, floor plans, location information, pricing (if approved for display), legal approvals, and brand assets. The specific requirements depend on the campaign scope.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you guarantee property sales?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">No. We do not guarantee property sales, site visits, or bookings. Marketing generates enquiries and visibility. Sales depend on the project, pricing, sales team responsiveness, and market conditions.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you guarantee a fixed cost per lead?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">No. Cost per lead varies based on location, competition, campaign budget, creative quality, audience targeting, and market demand. We monitor and optimize to improve efficiency.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">How is lead quality improved?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Lead quality is improved through better audience targeting, optimized landing pages, qualification fields in forms, location and budget targeting, and continuous campaign refinement.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">How quickly should the sales team contact leads?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Faster response improves conversion. We recommend contacting leads within minutes through automated WhatsApp acknowledgements followed by a sales call within a few hours.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you target buyers in specific locations?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. We use location-based targeting on Meta Ads and Google Ads to reach potential buyers in specific cities, neighborhoods, or within a radius around your project location.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Do you provide campaign reports?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. Monthly campaign reports include lead performance, cost metrics, audience insights, creative analysis, and recommendations for improvement.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">Can you track site visit bookings?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Yes. Site visit bookings can be tracked through CRM integration, WhatsApp automation, and dedicated landing page CTAs. Tracking depends on the systems used by the sales team.</div></div></div>
<div class="rem-faq-item"><div class="rem-faq-question" onclick="toggleREMFAQ(this)"><span class="rem-faq-q-text">What budget is required for real estate ads?</span><span class="rem-faq-icon">+</span></div><div class="rem-faq-answer"><div class="rem-faq-answer-inner">Budget depends on location, competition, campaign objectives, and target audience size. We discuss budget during the consultation and recommend a suitable starting point based on your goals.</div></div></div>
</div></div></section>

<!-- ═══════ ENQUIRY FORM ═══════ -->
<section class="rem-section" id="enquiry" style="background:var(--bg-deep)"><div class="rem-section-inner">
<div class="rem-section-header"><div class="rem-section-label green">Get Started</div><h2 class="rem-section-title">Request Your Real Estate Marketing Plan</h2><p class="rem-section-sub">Tell us about your property project and we will share a tailored marketing approach.</p></div>
<div class="rem-form-card" style="max-width:800px;margin:0 auto">
<div class="rem-form-header"><h3>Get My Real Estate Marketing Plan</h3><p>Fill in the details and our team will reach out within 24 hours.</p></div>
<div class="rem-form-body" id="remFormBody">
<form id="remForm" onsubmit="return submitREMEnquiry(event)">
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Full Name *</label><input class="rem-form-input" type="text" id="remName" name="name" required placeholder="Your name"></div>
<div class="rem-form-group"><label class="rem-form-label">Business Name</label><input class="rem-form-input" type="text" id="remBusiness" name="business" placeholder="Your company or project name"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Phone Number *</label><input class="rem-form-input" type="tel" id="remPhone" name="phone" required placeholder="Your phone number"></div>
<div class="rem-form-group"><label class="rem-form-label">Email Address *</label><input class="rem-form-input" type="email" id="remEmail" name="email" required placeholder="Your email"></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Business Type</label><select class="rem-form-select" id="remBusinessType" name="businessType"><option value="">Select</option><option>Builder</option><option>Developer</option><option>Realtor</option><option>Property Consultant</option><option>Real Estate Agency</option><option>Channel Partner</option><option>Broker</option><option>Other</option></select></div>
<div class="rem-form-group"><label class="rem-form-label">Project Type</label><select class="rem-form-select" id="remProjectType" name="projectType"><option value="">Select</option><option>New Launch</option><option>Ongoing Project</option><option>Ready-to-Move</option><option>Residential</option><option>Commercial</option><option>Plotting</option><option>Luxury Property</option><option>Multiple Projects</option><option>Other</option></select></div>
</div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Project Location</label><input class="rem-form-input" type="text" id="remLocation" name="location" placeholder="City or area"></div>
<div class="rem-form-group"><label class="rem-form-label">Property Price Range</label><select class="rem-form-select" id="remPriceRange" name="priceRange"><option value="">Select</option><option>Under ₹30 Lakhs</option><option>₹30 Lakhs – ₹50 Lakhs</option><option>₹50 Lakhs – ₹1 Crore</option><option>₹1 Crore – ₹3 Crore</option><option>₹3 Crore – ₹5 Crore</option><option>Above ₹5 Crore</option></select></div>
</div>
<div class="rem-form-group"><label class="rem-form-label">Required Services (select all that apply)</label>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Lead Generation"><span>Lead Generation</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Meta Ads"><span>Meta Ads</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Google Ads"><span>Google Ads</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Property Videos"><span>Property Videos</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Landing Page"><span>Landing Page</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="CRM Integration"><span>CRM Integration</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="WhatsApp Automation"><span>WhatsApp Automation</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Campaign Strategy"><span>Campaign Strategy</span></label>
<label class="rem-form-check" style="align-items:center"><input type="checkbox" name="services" value="Complete Solution"><span>Complete Solution</span></label>
</div></div>
<div class="rem-form-row">
<div class="rem-form-group"><label class="rem-form-label">Monthly Ad Budget</label><select class="rem-form-select" id="remBudget" name="budget"><option value="">Select range</option><option>Under ₹50,000</option><option>₹50,000 – ₹1 Lakh</option><option>₹1 Lakh – ₹3 Lakhs</option><option>₹3 Lakhs – ₹5 Lakhs</option><option>₹5 Lakhs – ₹10 Lakhs</option><option>Above ₹10 Lakhs</option></select></div>
<div class="rem-form-group"><label class="rem-form-label">Marketing Goal</label><select class="rem-form-select" id="remGoal" name="goal"><option value="">Select</option><option>Generate property enquiries</option><option>Increase site visits</option><option>Promote a new launch</option><option>Improve lead quality</option><option>Reduce missed follow-ups</option><option>Build a lead pipeline</option><option>Automate lead management</option><option>Other</option></select></div>
</div>
<div class="rem-form-group"><label class="rem-form-label">Message</label><textarea class="rem-form-textarea" id="remMessage" name="message" placeholder="Tell us about your project, current marketing efforts, or specific requirements..." rows="3"></textarea></div>
<div class="rem-form-check"><input type="checkbox" id="remConsent" required><label for="remConsent">I agree to be contacted regarding my enquiry. Your data will be handled securely.</label></div>
<div class="rem-form-submit"><button type="submit" class="lb lb-orange lb-full" id="remSubmitBtn"><div class="lb-shine"></div><span class="lb-text" id="remSubmitText">Get My Real Estate Marketing Plan <span class="arrow">→</span></span></button></div>
</form>
<div class="rem-form-success" id="remFormSuccess">
<div class="rem-form-success-icon">✅</div>
<h4>Thank You</h4>
<p>Your enquiry has been received. Our team will review your requirements and reach out within 24 hours to discuss a tailored real estate marketing plan for your project.</p>
</div></div></div></div></section>

<!-- ═══════ FINAL CTA ═══════ -->
<section class="rem-cta"><div class="rem-section-inner">
<h2 class="rem-cta-title reveal">Turn Your Property Marketing Into a Connected Lead-Generation System</h2>
<p class="rem-cta-sub reveal reveal-delay-1">Discuss your project, target buyers, location, campaign goals, and current sales process with AdScale.</p>
<div class="rem-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Real Estate Marketing Strategy</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Book a Property Lead Generation Call</span></a>
</div></div></section>

<!-- ═══════ FOOTER ═══════ -->
<section class="rem-section" style="background:#030810;padding:48px 5% 0;margin-top:0;">
<div class="rem-section-inner">
<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.04);">
<div>
<a href="<?php echo esc_url($home_url); ?>" class="rem-header-logo" style="margin-bottom:12px;">
<img src="https://adscale.co.in/wp-content/uploads/2026/05/Transperent-Logo.png" alt="AdScale Media" class="rem-header-logo-img">
<span class="rem-header-logo-text">Ad<span>Scale</span> Media</span>
</a>
<p style="font-size:13px;color:var(--text-muted);line-height:1.7;max-width:300px;margin-top:10px;">Performance marketing agency helping real estate businesses generate qualified property enquiries through integrated digital marketing systems.</p>
</div>
<div>
<h4 style="font-family:var(--font-mono);font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--white);margin-bottom:18px;">Quick Links</h4>
<div style="display:flex;flex-direction:column;gap:8px;">
<a href="<?php echo esc_url(home_url('/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Home</a>
<a href="<?php echo esc_url(home_url('/about/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">About Us</a>
<a href="<?php echo esc_url(home_url('/services/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Services</a>
<a href="<?php echo esc_url(home_url('/contact/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Contact</a>
</div>
</div>
<div>
<h4 style="font-family:var(--font-mono);font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--white);margin-bottom:18px;">Contact</h4>
<div style="display:flex;flex-direction:column;gap:8px;">
<a href="tel:+917388509954" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">+91 7388509954</a>
<a href="mailto:info@adscale.co.in" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">info@adscale.co.in</a>
<a href="https://wa.me/917388509954" target="_blank" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">WhatsApp</a>
<span style="font-size:13px;color:var(--text-muted);">Lucknow, UP, India</span>
</div>
</div>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding:18px 0;">
<span style="font-size:11px;color:var(--text-faint);">© <?php echo date('Y'); ?> AdScale Media. All rights reserved. Lucknow, India.</span>
<span style="font-family:var(--font-mono);font-size:.62rem;color:var(--text-muted);background:rgba(255,255,255,.03);border:1px solid var(--border-card);padding:.18rem .6rem;border-radius:4px;">GSTIN: 09GYAPD4822F1ZN</span>
</div>
</div>
</section>

<!-- ═══════ STICKY MOBILE CTA ═══════ -->
<div class="rem-sticky-cta" id="remStickyCTA"><div class="rem-sticky-cta-inner">
<a href="tel:+917388509954" class="lb lb-sm lb-hide-mobile"><div class="lb-shine"></div><span class="lb-text">📞 Call Now</span></a>
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get Your Free Marketing Plan</span></a>
</div></div>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","name":"Real Estate Marketing Services","description":"Property lead generation, Meta Ads, Google Ads, property video marketing, landing pages, CRM integration, and WhatsApp automation for real estate businesses.","provider":{"@type":"Organization","name":"AdScale Media","url":"https:\/\/adscale.co.in"},"areaServed":{"@type":"City","name":"India"},"serviceType":["Digital Marketing","Lead Generation","Real Estate Advertising"]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is real estate digital marketing?","acceptedAnswer":{"@type":"Answer","text":"Real estate digital marketing uses online channels such as Meta Ads, Google Ads, property videos, and landing pages to generate enquiries from potential buyers, investors, and channel partners for property projects."}},{"@type":"Question","name":"How do you generate property leads?","acceptedAnswer":{"@type":"Answer","text":"We use a combination of audience research, campaign strategy, targeted ads, conversion-focused landing pages, lead forms, CRM integration, and WhatsApp automation to capture and manage enquiries."}}]}
</script>

<script>
/* ── Scroll Reveal ── */
(function(){var e=document.querySelectorAll('.reveal');if(!e.length)return;var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(e.target.classList.add('visible'),t.unobserve(e.target))})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});e.forEach(function(e){t.observe(e)})})();

/* ── FAQ Accordion ── */
function toggleREMFAQ(el){var p=el.parentElement;p.classList.toggle('open')}

/* ── Toast ── */
function showToast(e,t){var n=document.createElement('div');n.textContent=e,n.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:99999;padding:14px 28px;border-radius:12px;font-size:14px;color:#fff;background:rgba(6,12,20,.95);backdrop-filter:blur(20px);border:1px solid '+(t==='error'?'rgba(230,57,70,.3)':'rgba(0,200,150,.3)')+';box-shadow:0 8px 32px rgba(0,0,0,.5);opacity:0;transition:opacity .4s;max-width:90vw;text-align:center;',document.body.appendChild(n),requestAnimationFrame(function(){n.style.opacity='1'}),setTimeout(function(){n.style.opacity='0',setTimeout(function(){n.remove()},400)},3500)}

/* ── Form Submission ── */
function submitREMEnquiry(e){e.preventDefault();
var btn=document.getElementById('remSubmitBtn'),txt=document.getElementById('remSubmitText');
var name=document.getElementById('remName').value.trim(),phone=document.getElementById('remPhone').value.trim(),email=document.getElementById('remEmail').value.trim();
if(!name||!phone||!email)return showToast('Please fill in all required fields.','error'),!1;
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return showToast('Please enter a valid email address.','error'),!1;
btn.disabled=true;txt.innerHTML='Sending...';
var services=[];document.querySelectorAll('input[name="services"]:checked').forEach(function(cb){services.push(cb.value)});
var data=new URLSearchParams();data.append('action','adscale_contact');data.append('nonce','<?php echo wp_create_nonce('adscale_contact'); ?>');
data.append('name',name);data.append('phone',phone);data.append('email',email);
data.append('brand',document.getElementById('remBusiness').value.trim());
data.append('service',(document.getElementById('remProjectType').value||'Real Estate')+' | '+services.join(', '));
data.append('budget',document.getElementById('remBudget').value);
data.append('industry','Real Estate');
data.append('message',document.getElementById('remMessage').value.trim()||'');
fetch('<?php echo admin_url('admin-ajax.php'); ?>',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data.toString()})
.then(function(r){return r.json()}).then(function(r){
if(r.success){txt.innerHTML='✓ Request Sent Successfully!';btn.style.boxShadow='0 0 28px -4px rgba(0,200,150,.5)';
showToast('Thank you! Our team will review your requirements and reach out within 24 hours.','success');
setTimeout(function(){document.getElementById('remForm').reset();btn.disabled=false;txt.innerHTML='Get My Real Estate Marketing Plan <span class="arrow">→</span>';btn.style.boxShadow=''},4000)}
else{showToast(r.data&&r.data.message||'Something went wrong. Please try again.','error');btn.disabled=false;txt.innerHTML='Get My Real Estate Marketing Plan <span class="arrow">→</span>'}})
.catch(function(){showToast('Network error. Please try again or WhatsApp us directly.','error');btn.disabled=false;txt.innerHTML='Get My Real Estate Marketing Plan <span class="arrow">→</span>'});
return!1}

/* ── Header Scroll ── */
(function(){var h=document.querySelector('.rem-header');if(!h)return;var last=0;window.addEventListener('scroll',function(){var y=window.scrollY;if(y>last&&y>100){h.style.transform='translateY(-100%)'}else{h.style.transform='translateY(0)'}last=y},{passive:true})})();

/* ── Smooth Anchor Scroll ── */
(function(){document.querySelectorAll('a[href^="#"]').forEach(function(e){e.addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));t&&(e.preventDefault(),t.scrollIntoView({behavior:'smooth',block:'start'}))})})})();
</script>
<?php get_footer(); ?>
