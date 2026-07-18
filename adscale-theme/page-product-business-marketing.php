<?php
/**
 * AdScale Media — Product Business Marketing Landing Page
 * Template Name: Product Business Marketing
 */
get_header();
$home_url = home_url('/');
?>
<style>
/* ══════════════════════════════════════
   PRODUCT BUSINESS MARKETING — PAGE STYLES
   ══════════════════════════════════════ */

body.page-template-page-product-business-marketing { background:var(--bg-void); }
body.page-template-page-product-business-marketing #navbar,
body.page-template-page-product-business-marketing #mobile-menu,
body.page-template-page-product-business-marketing footer,
body.page-template-page-product-business-marketing .wa-float-lb,
body.page-template-page-product-business-marketing #scroll-top-lb,
body.page-template-page-product-business-marketing #progress-bar,
body.page-template-page-product-business-marketing #loader,
body.page-template-page-product-business-marketing .page-hero { display:none !important; }
body.page-template-page-product-business-marketing .page-hero,
body.page-template-page-product-business-marketing section { padding-top:0; }

.reveal{opacity:0;transform:translateY(44px);transition:opacity .7s ease,transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}

/* ── Header ── */
.pbm-header{position:fixed;top:0;left:0;right:0;z-index:500;padding:12px 5%;background:rgba(6,12,20,.6);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--border-card)}
.pbm-header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.pbm-header-logo{display:inline-flex;align-items:center;gap:.5rem;text-decoration:none}
.pbm-header-logo-img{height:32px;width:auto;transition:filter .3s}
.pbm-header-logo:hover .pbm-header-logo-img{filter:drop-shadow(0 0 6px rgba(10,102,194,0.5))}
.pbm-header-logo-text{font-family:var(--font-display);font-size:1.15rem;letter-spacing:.08em;color:var(--white)}
.pbm-header-logo-text span{color:var(--blue)}
.pbm-header-actions{display:flex;gap:8px;align-items:center}
@media(max-width:640px){.pbm-header-actions .lb-hide-mobile{display:none!important}}

/* ── Hero ── */
.pbm-hero{position:relative;width:100%;min-height:100vh;display:flex;align-items:center;overflow:hidden}
.pbm-hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(6,12,20,.92) 0%,rgba(6,12,20,.5) 50%,rgba(6,12,20,.8) 100%)}
.pbm-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.pbm-orb-1{width:600px;height:600px;background:radial-gradient(circle,rgba(10,102,194,.2),transparent 70%);top:-15%;right:-10%;animation:orbFloat 25s ease-in-out infinite}
.pbm-orb-2{width:500px;height:500px;background:radial-gradient(circle,rgba(0,200,150,.12),transparent 70%);bottom:-10%;left:-8%;animation:orbFloat 30s ease-in-out infinite reverse}
@keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(50px,-40px) scale(1.08)}50%{transform:translate(-30px,30px) scale(.92)}75%{transform:translate(40px,20px) scale(1.04)}}
.pbm-hero-content{position:relative;z-index:2;width:100%;max-width:1200px;margin:0 auto;padding:0 5%}
.pbm-hero-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center}
.pbm-hero-text{position:relative;z-index:2}
.pbm-hero-eyebrow{display:inline-flex;align-items:center;gap:.8rem;font-family:var(--font-mono);font-size:.72rem;color:var(--blue);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1.4rem}
.pbm-hero-eyebrow::before{content:"";width:28px;height:1px;background:var(--blue)}
.pbm-hero-headline{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,5.8rem);line-height:.95;letter-spacing:.04em;color:var(--white);margin-bottom:1.2rem}
.pbm-hero-headline .accent{background:linear-gradient(135deg,var(--blue),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.pbm-hero-headline .accent-orange{background:linear-gradient(135deg,var(--orange),var(--red));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.pbm-hero-sub{font-size:1.05rem;color:var(--text-secondary);max-width:600px;line-height:1.75;margin-bottom:2rem}
.pbm-hero-actions{display:flex;gap:1.1rem;flex-wrap:wrap;margin-bottom:1.6rem}
.pbm-hero-actions .lb{font-size:.82rem;padding:.75rem 1.5rem}
.pbm-hero-highlights{display:flex;gap:2rem;flex-wrap:wrap}
.pbm-hero-highlight-item{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--text-secondary);font-family:var(--font-mono)}
.pbm-hero-highlight-item .dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0}
.pbm-hero-visual{position:relative;z-index:2}
.pbm-dashboard-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.8rem;box-shadow:var(--shadow-card);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.pbm-db-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.4rem;padding-bottom:1rem;border-bottom:1px solid var(--border)}
.pbm-db-title{font-family:var(--font-mono);font-size:.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em}
.pbm-db-badge{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--font-mono);font-size:.65rem;color:var(--green);background:var(--green-subtle);padding:.25rem .65rem;border-radius:100px}
.pbm-db-row{display:flex;align-items:center;justify-content:space-between;padding:.7rem 0;border-bottom:1px solid var(--border-card)}
.pbm-db-row:last-child{border-bottom:none}
.pbm-db-row-label{font-size:.8rem;color:var(--text-secondary)}
.pbm-db-row-value{font-family:var(--font-mono);font-size:.82rem;color:var(--white);font-weight:600}
.pbm-db-row-value.green{color:var(--green)}
.pbm-db-row-value.orange{color:var(--orange)}
.pbm-db-row-value.blue{color:var(--blue-bright)}
.pbm-db-bar{height:4px;border-radius:4px;background:var(--bg-elevated);margin-top:6px;overflow:hidden}
.pbm-db-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--blue),var(--green));transition:width 1.5s ease}

/* ── Shared Sections ── */
.pbm-section{padding:100px 5%}
.pbm-section-inner{max-width:1200px;margin:0 auto}
.pbm-section-header{text-align:center;margin-bottom:52px}
.pbm-section-label{display:inline-flex;align-items:center;gap:.8rem;font-family:var(--font-mono);font-size:.7rem;color:var(--blue);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1rem}
.pbm-section-label::before{content:"";width:26px;height:1px;background:var(--blue)}
.pbm-section-label.orange{color:var(--orange)}
.pbm-section-label.orange::before{background:var(--orange)}
.pbm-section-label.green{color:var(--green)}
.pbm-section-label.green::before{background:var(--green)}
.pbm-section-title{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,4.2rem);line-height:1;letter-spacing:.03em;color:var(--white);margin-bottom:.8rem}
.pbm-section-sub{font-size:1rem;color:var(--text-secondary);max-width:660px;margin:0 auto;line-height:1.7}

/* ── Grids ── */
.pbm-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pbm-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.pbm-grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}
.pbm-card{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.8rem;position:relative;overflow:hidden;transition:var(--transition)}
.pbm-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-blue);border-color:var(--border-strong)}
.pbm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--green));opacity:0;transition:var(--transition)}
.pbm-card:hover::before{opacity:1}
.pbm-card-icon{width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm);background:var(--blue-subtle);color:var(--blue-bright);font-size:1.2rem;margin-bottom:1rem;flex-shrink:0}
.pbm-card-icon.green{background:var(--green-subtle);color:var(--green)}
.pbm-card-icon.orange{background:var(--orange-subtle);color:var(--orange)}
.pbm-card-title{font-family:var(--font-head);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:.5rem}
.pbm-card-desc{font-size:.88rem;color:var(--text-secondary);line-height:1.6}

/* ── Problem Cards ── */
.pbm-problem-card{background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.2rem 1.5rem;display:flex;align-items:center;gap:.8rem;transition:var(--transition)}
.pbm-problem-card:hover{border-color:rgba(230,57,70,.3);transform:translateX(4px)}
.pbm-problem-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(230,57,70,.12);color:var(--red);font-size:.8rem;flex-shrink:0}
.pbm-problem-text{font-size:.88rem;color:var(--text-secondary);line-height:1.4}

/* ── Process ── */
.pbm-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative}
.pbm-process-step{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);padding:1.8rem;position:relative;transition:var(--transition)}
.pbm-process-step:hover{transform:translateY(-4px);box-shadow:var(--shadow-blue)}
.pbm-process-num{font-family:var(--font-display);font-size:2.8rem;color:var(--blue);opacity:.15;line-height:1;margin-bottom:.5rem}
.pbm-process-icon{font-size:1.6rem;margin-bottom:.8rem;display:block}
.pbm-process-title{font-family:var(--font-head);font-weight:700;font-size:.95rem;color:var(--white);margin-bottom:.4rem}
.pbm-process-desc{font-size:.82rem;color:var(--text-secondary);line-height:1.5}

/* ── Funnel Flow ── */
.pbm-flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;align-items:start}
.pbm-flow-step{text-align:center;padding:1.2rem .8rem;background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);transition:var(--transition)}
.pbm-flow-step:hover{transform:translateY(-3px);box-shadow:var(--shadow-blue)}
.pbm-flow-num{font-family:var(--font-mono);font-size:.65rem;color:var(--text-muted);margin-bottom:.4rem}
.pbm-flow-icon{font-size:1.4rem;margin-bottom:.5rem;display:block}
.pbm-flow-label{font-family:var(--font-head);font-weight:600;font-size:.78rem;color:var(--text-primary);line-height:1.3}

/* ── Service Blocks ── */
.pbm-service-block{padding:90px 5%;border-bottom:1px solid var(--border);scroll-margin-top:120px}
.pbm-service-block:nth-child(even){background:var(--bg-deep)}
.pbm-service-block:nth-child(odd){background:var(--bg-void)}
.pbm-sb-inner{max-width:1200px;margin:0 auto}
.pbm-sb-header{text-align:center;margin-bottom:3rem}
.pbm-sb-title{font-size:clamp(26px,3.5vw,40px);font-weight:800;color:var(--white);margin-bottom:10px;line-height:1.15}
.pbm-sb-desc{font-size:14px;color:var(--text-secondary);line-height:1.8;max-width:640px;margin:0 auto}
.pbm-sb-offerings{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pbm-sb-offering{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius-sm);padding:14px 12px;text-align:center;font-size:.76rem;color:var(--text-secondary);transition:all .3s}
.pbm-sb-offering:hover{border-color:var(--border-strong);color:var(--text-primary);transform:translateY(-2px)}

/* ── Pricing ── */
.pbm-pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:3rem}
.pbm-pricing-card{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius-xl);overflow:hidden;transition:var(--transition);position:relative}
.pbm-pricing-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-blue);border-color:var(--border-strong)}
.pbm-pricing-card.featured{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue),0 20px 60px rgba(10,102,194,.15)}
.pbm-pricing-label{position:absolute;top:16px;right:16px;font-family:var(--font-mono);font-size:.6rem;color:var(--green);background:var(--green-subtle);padding:.2rem .6rem;border-radius:100px;text-transform:uppercase;letter-spacing:.08em}
.pbm-pricing-header{background:linear-gradient(135deg,var(--bg-elevated),var(--bg-card));padding:2rem 2rem 1.5rem;border-bottom:1px solid var(--border);text-align:center}
.pbm-pricing-name{font-family:var(--font-head);font-size:1.1rem;font-weight:800;color:var(--white);margin-bottom:.3rem}
.pbm-pricing-sub{font-size:.78rem;color:var(--text-muted)}
.pbm-pricing-body{padding:2rem}
.pbm-pricing-desc{font-size:.82rem;color:var(--text-secondary);line-height:1.7;margin-bottom:1.2rem}
.pbm-pricing-features{list-style:none;padding:0;margin:0 0 1.5rem}
.pbm-pricing-features li{font-size:.8rem;color:var(--text-secondary);padding:.4rem 0;padding-left:1.4rem;position:relative;line-height:1.5}
.pbm-pricing-features li::before{content:"\2713";position:absolute;left:0;color:var(--green);font-weight:700;font-size:.75rem}
.pbm-pricing-note{font-size:.7rem;color:var(--text-faint);text-align:center;margin-top:1rem;line-height:1.6;padding:0 2rem 2rem}

/* ── Case Study Scenarios ── */
.pbm-scenario{background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius-lg);padding:2rem;transition:var(--transition)}
.pbm-scenario:hover{border-color:var(--border-strong);box-shadow:var(--shadow-blue)}
.pbm-scenario-label{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--font-mono);font-size:.62rem;color:var(--orange);background:var(--orange-subtle);padding:.2rem .6rem;border-radius:100px;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.05em}
.pbm-scenario h4{font-family:var(--font-head);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:.6rem}
.pbm-scenario p{font-size:.85rem;color:var(--text-secondary);line-height:1.6;margin-bottom:.6rem}
.pbm-scenario ul{list-style:none;padding:0}
.pbm-scenario ul li{font-size:.82rem;color:var(--text-secondary);padding:.25rem 0;padding-left:1.2rem;position:relative;line-height:1.5}
.pbm-scenario ul li::before{content:"\203A";position:absolute;left:0;color:var(--blue);font-weight:700}

/* ── Metrics ── */
.pbm-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.pbm-metric{text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius)}
.pbm-metric-icon{font-size:1.6rem;margin-bottom:.5rem}
.pbm-metric-val{font-family:var(--font-display);font-size:2.6rem;line-height:1;background:linear-gradient(135deg,var(--blue),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.pbm-metric-label{font-size:.82rem;color:var(--text-secondary);margin-top:.3rem}

/* ── Commitments ── */
.pbm-commit-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.pbm-commit-item{display:flex;align-items:center;gap:.7rem;padding:.8rem 1rem;background:var(--bg-card-alt);border:1px solid var(--border-card);border-radius:var(--radius-sm);font-size:.82rem;color:var(--text-secondary);line-height:1.4}
.pbm-commit-item .ck{color:var(--green);font-weight:700;font-size:.9rem;flex-shrink:0}

/* ── FAQ ── */
.pbm-faq-list{max-width:780px;margin:0 auto}
.pbm-faq-item{background:var(--bg-card);border:1px solid var(--border-card);border-radius:var(--radius);margin-bottom:10px;overflow:hidden;transition:var(--transition)}
.pbm-faq-item:hover{border-color:var(--border-strong)}
.pbm-faq-question{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.5rem;cursor:pointer;gap:1rem;-webkit-user-select:none;user-select:none}
.pbm-faq-q-text{font-family:var(--font-head);font-weight:600;font-size:.92rem;color:var(--white);line-height:1.4}
.pbm-faq-icon{font-size:1.2rem;color:var(--text-muted);transition:var(--transition);flex-shrink:0}
.pbm-faq-item.open .pbm-faq-icon{transform:rotate(45deg);color:var(--blue)}
.pbm-faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease}
.pbm-faq-item.open .pbm-faq-answer{max-height:500px}
.pbm-faq-answer-inner{padding:0 1.5rem 1.2rem;font-size:.88rem;color:var(--text-secondary);line-height:1.7}

/* ── Form ── */
.pbm-form-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-card);max-width:800px;margin:0 auto}
.pbm-form-header{padding:1.5rem 2rem;background:linear-gradient(135deg,rgba(10,102,194,.1),rgba(0,200,150,.05));border-bottom:1px solid var(--border)}
.pbm-form-header h3{font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:var(--white)}
.pbm-form-header p{font-size:.82rem;color:var(--text-secondary);margin-top:.3rem}
.pbm-form-body{padding:2rem}
.pbm-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pbm-form-group{margin-bottom:16px}
.pbm-form-label{display:block;font-family:var(--font-mono);font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.pbm-form-input,.pbm-form-select,.pbm-form-textarea{width:100%;padding:13px 16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-elevated);color:var(--white);font-family:var(--font-body);font-size:.88rem;outline:none;transition:var(--transition-fast)}
.pbm-form-input:focus,.pbm-form-select:focus,.pbm-form-textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-glow)}
.pbm-form-input::placeholder,.pbm-form-textarea::placeholder{color:var(--text-faint)}
.pbm-form-textarea{min-height:80px;resize:vertical}
.pbm-form-select{cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A6E88' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
.pbm-form-check{display:flex;align-items:flex-start;gap:10px;margin-top:4px}
.pbm-form-check input[type=checkbox]{width:16px;height:16px;margin-top:3px;accent-color:var(--blue)}
.pbm-form-check label{font-size:.82rem;color:var(--text-secondary);line-height:1.4}
.pbm-form-submit{margin-top:8px}
.pbm-form-success{display:none;text-align:center;padding:3rem 2rem}
.pbm-form-success.visible{display:block}
.pbm-form-success-icon{font-size:3rem;margin-bottom:1rem}
.pbm-form-success h4{font-family:var(--font-head);font-size:1.2rem;font-weight:700;color:var(--green);margin-bottom:.5rem}
.pbm-form-success p{font-size:.9rem;color:var(--text-secondary)}

/* ── CTA ── */
.pbm-cta{text-align:center;padding:100px 5%;position:relative;overflow:hidden}
.pbm-cta-dark{background:var(--bg-deep)}
.pbm-cta-title{font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);line-height:1;color:var(--white);margin-bottom:1rem}
.pbm-cta-sub{font-size:1rem;color:var(--text-secondary);max-width:560px;margin:0 auto 2rem;line-height:1.7}
.pbm-cta-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}

/* ── Sticky CTA ── */
.pbm-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(6,12,20,.92);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:10px 5%;display:none}
.pbm-sticky-cta-inner{max-width:1200px;margin:0 auto;display:flex;gap:10px}
.pbm-sticky-cta .lb{flex:1;justify-content:center}

/* ── Service Grid Card Variant ── */
.pbm-service-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;border:1.5px solid var(--border-card);border-radius:var(--radius-lg);overflow:hidden;margin-top:3rem}
.pbm-service-card{background:var(--bg-card);padding:1.8rem 1.6rem;position:relative;overflow:hidden;transition:background .4s}
.pbm-service-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--green));transform:scaleX(0);transform-origin:left;transition:transform .4s}
.pbm-service-card:hover{background:var(--bg-card-alt)}
.pbm-service-card:hover::after{transform:scaleX(1)}
.pbm-sc-icon{font-family:var(--font-display);font-size:1.5rem;color:var(--blue);margin-bottom:6px}
.pbm-sc-title{font-family:var(--font-head);font-size:.9rem;font-weight:800;color:var(--white);margin-bottom:5px}
.pbm-sc-desc{font-size:.78rem;color:var(--text-muted);line-height:1.65}
.pbm-sc-list{margin-top:8px;display:flex;flex-direction:column;gap:3px}
.pbm-sc-list-item{font-size:.72rem;color:var(--text-faint);display:flex;align-items:center;gap:5px}
.pbm-sc-list-item::before{content:"\2713";color:var(--green);font-weight:700;font-size:.6rem}

/* ── Responsive ── */
@media(max-width:1100px){
  .pbm-hero-layout{grid-template-columns:1fr;gap:40px}
  .pbm-hero-visual{max-width:520px}
  .pbm-grid-4{grid-template-columns:1fr 1fr}
  .pbm-process-grid{grid-template-columns:1fr 1fr}
  .pbm-pricing-grid{grid-template-columns:1fr 1fr}
  .pbm-sb-offerings{grid-template-columns:repeat(3,1fr)}
  .pbm-service-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .pbm-grid-3{grid-template-columns:1fr}
  .pbm-grid-2{grid-template-columns:1fr}
  .pbm-grid-4{grid-template-columns:1fr}
  .pbm-form-row{grid-template-columns:1fr}
  .pbm-process-grid{grid-template-columns:1fr}
  .pbm-pricing-grid{grid-template-columns:1fr}
  .pbm-hero-headline{font-size:clamp(2rem,8vw,3rem)}
  .pbm-section{padding:60px 5%}
  .pbm-sticky-cta{display:block}
  .pbm-sb-offerings{grid-template-columns:repeat(2,1fr)}
  .pbm-service-grid{grid-template-columns:1fr}
  .pbm-metrics{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .pbm-hero-highlights{flex-direction:column;gap:.8rem}
  .pbm-header-logo-text{font-size:.95rem}
  .pbm-metrics{grid-template-columns:1fr 1fr;gap:12px}
  .pbm-metric-val{font-size:2rem}
}
@media(max-width:480px){
  .pbm-sb-offerings{grid-template-columns:1fr}
  .pbm-form-body{padding:20px}
  .pbm-form-input,.pbm-form-select,.pbm-form-textarea{font-size:16px}
}
</style>

<!-- ── Minimal Header ── -->
<header class="pbm-header"><div class="pbm-header-inner">
<a href="<?php echo esc_url($home_url); ?>" class="pbm-header-logo"><img src="https://adscale.co.in/wp-content/uploads/2026/05/Transperent-Logo.png" alt="AdScale Media" class="pbm-header-logo-img"><span class="pbm-header-logo-text">Ad<span>Scale</span> Media</span></a>
<div class="pbm-header-actions">
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get a Free Product Growth Strategy</span></a>
<a href="tel:+917388509954" class="lb lb-sm lb-hide-mobile"><div class="lb-shine"></div><span class="lb-text">📞 +91 7388509954</span></a>
</div></div></header>

<!-- ═══════ HERO ═══════ -->
<section class="pbm-hero">
<div class="pbm-hero-overlay"></div><div class="pbm-orb pbm-orb-1"></div><div class="pbm-orb pbm-orb-2"></div>
<div class="pbm-hero-content"><div class="pbm-hero-layout">
<div class="pbm-hero-text">
<div class="pbm-hero-eyebrow reveal">Product Business Marketing</div>
<h1 class="pbm-hero-headline reveal reveal-delay-1">Product Marketing That Turns Attention Into<br><span class="accent">Measurable Growth</span></h1>
<p class="pbm-hero-sub reveal reveal-delay-2">AdScale helps D2C brands, e-commerce stores, manufacturers, and retailers attract the right customers, improve conversions, and build measurable growth through advertising, creative strategy, landing pages, SEO, automation, and retention-focused marketing.</p>
<div class="pbm-hero-actions reveal reveal-delay-3">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Product Growth Strategy</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Book a Marketing Consultation</span></a>
</div>
<div class="pbm-hero-highlights reveal reveal-delay-4">
<span class="pbm-hero-highlight-item"><span class="dot"></span> Customer acquisition strategy</span>
<span class="pbm-hero-highlight-item"><span class="dot"></span> Conversion-focused campaigns</span>
<span class="pbm-hero-highlight-item"><span class="dot"></span> Product-specific landing pages</span>
<span class="pbm-hero-highlight-item"><span class="dot"></span> Transparent performance tracking</span>
</div></div>
<div class="pbm-hero-visual reveal reveal-delay-2">
<div class="pbm-dashboard-card">
<div class="pbm-db-header"><span class="pbm-db-title">Product Growth Overview</span><span class="pbm-db-badge">● Monitoring</span></div>
<div class="pbm-db-row"><span class="pbm-db-row-label">Campaigns Active</span><span class="pbm-db-row-value green">Tracking enabled</span></div>
<div class="pbm-db-row"><span class="pbm-db-row-label">Customer Acquisition Cost</span><span class="pbm-db-row-value orange">Monitoring</span></div>
<div class="pbm-db-row"><span class="pbm-db-row-label">Conversion Rate</span><span class="pbm-db-row-value blue">Optimizing</span></div>
<div class="pbm-db-row"><span class="pbm-db-row-label">Products Marketing</span><span class="pbm-db-row-value">Strategy active</span></div>
<div style="margin-top:1rem"><div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-bottom:4px"><span>Campaign performance</span><span>Improving</span></div><div class="pbm-db-bar"><div class="pbm-db-bar-fill" style="width:68%"></div></div></div></div></div></div></div></section>

<!-- ═══════ WHO WE HELP ═══════ -->
<section class="pbm-section"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">Who We Help</div><h2 class="pbm-section-title">Product Businesses We Support</h2><p class="pbm-section-sub">Growth-focused marketing solutions for every type of product-based business — from emerging D2C brands to established manufacturers.</p></div>
<div class="pbm-grid-3">
<div class="pbm-card reveal"><div class="pbm-card-icon green">🛍️</div><div class="pbm-card-title">D2C Brands</div><div class="pbm-card-desc">Growth strategies for brands selling directly through their own website. Campaigns designed to build awareness, drive traffic, and improve conversion across the customer journey.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon green">🛒</div><div class="pbm-card-title">E-commerce Stores</div><div class="pbm-card-desc">Campaigns, landing pages, conversion optimization, and retention systems for online stores looking to scale product sales profitably.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon green">🏭</div><div class="pbm-card-title">Manufacturers</div><div class="pbm-card-desc">Digital marketing support for manufacturers entering direct sales, distributor marketing, dealer enquiries, or product awareness campaigns.</div></div>
<div class="pbm-card reveal"><div class="pbm-card-icon green">🏬</div><div class="pbm-card-title">Retailers</div><div class="pbm-card-desc">Marketing systems for retailers selling online, offline, or through omnichannel models — with consistent brand presence across touchpoints.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon green">📦</div><div class="pbm-card-title">Marketplace Sellers</div><div class="pbm-card-desc">Support for brands selling through Amazon, Flipkart, Meesho, or other marketplaces while building stronger direct channels and customer ownership.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon green">🚀</div><div class="pbm-card-title">Product Startups</div><div class="pbm-card-desc">Launch strategies for new consumer products, emerging brands, and early-stage product businesses entering competitive markets.</div></div>
</div></div></section>

<!-- ═══════ CHALLENGES ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label orange">The Challenge</div><h2 class="pbm-section-title">Common Product Marketing Challenges</h2><p class="pbm-section-sub">The obstacles that prevent product businesses from achieving consistent, profitable growth.</p></div>
<div class="pbm-grid-3">
<div class="pbm-problem-card reveal"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">High customer acquisition cost with low return</span></div>
<div class="pbm-problem-card reveal reveal-delay-1"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Website traffic without meaningful sales conversion</span></div>
<div class="pbm-problem-card reveal reveal-delay-2"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Low product-page conversion and add-to-cart rates</span></div>
<div class="pbm-problem-card reveal"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Weak product positioning and unclear value messaging</span></div>
<div class="pbm-problem-card reveal reveal-delay-1"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Poor ad creatives that do not drive product interest</span></div>
<div class="pbm-problem-card reveal reveal-delay-2"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Low repeat purchase rate and weak customer retention</span></div>
<div class="pbm-problem-card reveal"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">High cart abandonment and checkout drop-offs</span></div>
<div class="pbm-problem-card reveal reveal-delay-1"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Heavy dependence on discounts to drive any sale</span></div>
<div class="pbm-problem-card reveal reveal-delay-2"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Over-reliance on marketplaces with no direct customer data</span></div>
<div class="pbm-problem-card reveal"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Low organic visibility and poor product discoverability</span></div>
<div class="pbm-problem-card reveal reveal-delay-1"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">No clear remarketing or abandoned-cart recovery strategy</span></div>
<div class="pbm-problem-card reveal reveal-delay-2"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Disconnected marketing channels with no unified funnel</span></div>
<div class="pbm-problem-card reveal"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Inconsistent sales and difficulty scaling winning products</span></div>
<div class="pbm-problem-card reveal reveal-delay-1"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">Limited customer data and weak retention infrastructure</span></div>
<div class="pbm-problem-card reveal reveal-delay-2"><span class="pbm-problem-icon">✕</span><span class="pbm-problem-text">No structured testing or clear performance reporting</span></div>
</div></div></section>

<!-- ═══════ OUR SOLUTION ═══════ -->
<section class="pbm-section"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label">Our Solution</div><h2 class="pbm-section-title">Complete Product Growth System</h2><p class="pbm-section-sub">An integrated marketing system connecting advertising, creative, landing pages, SEO, email, WhatsApp, CRM, and retention into one connected growth funnel.</p></div>
<div class="pbm-grid-4">
<div class="pbm-card reveal"><div class="pbm-card-icon">🎯</div><div class="pbm-card-title">Product &amp; Market Analysis</div><div class="pbm-card-desc">Product positioning, audience research, competitor analysis, and offer strategy aligned with your business goals and market reality.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon">📱</div><div class="pbm-card-title">Advertising &amp; Creative</div><div class="pbm-card-desc">Meta Ads, Google Ads, Shopping campaigns, and product creative strategy designed to reach the right customers with compelling product messaging.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon">📄</div><div class="pbm-card-title">Landing Pages &amp; CRO</div><div class="pbm-card-desc">Product-specific landing pages, conversion optimization, product-page improvements, and checkout flow analysis to improve purchase completion.</div></div>
<div class="pbm-card reveal reveal-delay-3"><div class="pbm-card-icon">🔄</div><div class="pbm-card-title">Retention &amp; Automation</div><div class="pbm-card-desc">Email marketing, WhatsApp automation, CRM integration, and retention flows designed to support repeat purchases and customer lifetime value.</div></div>
</div></div></section>

<!-- ═══════ SERVICES OVERVIEW ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)" id="services">
<div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">Our Services</div><h2 class="pbm-section-title">Complete Product Marketing Services</h2><p class="pbm-section-sub">Every service designed to work together — from strategy through execution, optimization, and retention.</p></div>
<div class="pbm-service-grid">
<div class="pbm-service-card reveal"><div class="pbm-sc-icon">📋</div><div class="pbm-sc-title">Marketing Strategy</div><div class="pbm-sc-desc">Structured strategy connecting product positioning, audience, offer, channels, and conversion planning.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Product positioning &amp; research</span><span class="pbm-sc-list-item">Audience &amp; competitor analysis</span><span class="pbm-sc-list-item">Campaign roadmap &amp; funnel mapping</span><span class="pbm-sc-list-item">Retention &amp; growth planning</span></div></div>
<div class="pbm-service-card reveal reveal-delay-1"><div class="pbm-sc-icon">📱</div><div class="pbm-sc-title">Meta Ads</div><div class="pbm-sc-desc">Facebook and Instagram campaigns for product discovery, sales, retargeting, and repeat engagement.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Conversion &amp; sales campaigns</span><span class="pbm-sc-list-item">Catalogue &amp; dynamic product ads</span><span class="pbm-sc-list-item">Video &amp; carousel creatives</span><span class="pbm-sc-list-item">Audience &amp; creative testing</span></div></div>
<div class="pbm-service-card reveal reveal-delay-2"><div class="pbm-sc-icon">🔍</div><div class="pbm-sc-title">Google Ads &amp; Shopping</div><div class="pbm-sc-desc">Search, Shopping, and Performance Max campaigns targeting high-intent product seekers.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Search &amp; Shopping campaigns</span><span class="pbm-sc-list-item">Product feed &amp; Merchant Center</span><span class="pbm-sc-list-item">Keyword &amp; search-term management</span><span class="pbm-sc-list-item">Budget &amp; conversion optimization</span></div></div>
<div class="pbm-service-card reveal"><div class="pbm-sc-icon">🎨</div><div class="pbm-sc-title">Creative Strategy</div><div class="pbm-sc-desc">Product-focused creative planning including photography direction, video, and ad format testing.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Product photography &amp; video</span><span class="pbm-sc-list-item">Lifestyle &amp; feature-benefit content</span><span class="pbm-sc-list-item">Short-form &amp; reel creatives</span><span class="pbm-sc-list-item">Creative testing &amp; iteration</span></div></div>
<div class="pbm-service-card reveal reveal-delay-1"><div class="pbm-sc-icon">📄</div><div class="pbm-sc-title">Landing Pages</div><div class="pbm-sc-desc">Product-specific landing pages with optimized content, forms, CTAs, and conversion tracking.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Product &amp; campaign landing pages</span><span class="pbm-sc-list-item">Mobile-first, fast-loading design</span><span class="pbm-sc-list-item">Trust elements &amp; clear CTAs</span><span class="pbm-sc-list-item">Conversion &amp; source tracking</span></div></div>
<div class="pbm-service-card reveal reveal-delay-2"><div class="pbm-sc-icon">📈</div><div class="pbm-sc-title">Conversion Optimization</div><div class="pbm-sc-desc">Improving product pages, checkout, and customer flows to convert more visitors into buyers.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Product page &amp; checkout review</span><span class="pbm-sc-list-item">CTA &amp; offer presentation</span><span class="pbm-sc-list-item">Cart &amp; abandonment analysis</span><span class="pbm-sc-list-item">AOV &amp; upsell opportunities</span></div></div>
<div class="pbm-service-card reveal"><div class="pbm-sc-icon">🌐</div><div class="pbm-sc-title">E-commerce SEO</div><div class="pbm-sc-desc">Long-term product discoverability through structured SEO for product and category pages.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Product &amp; category keyword research</span><span class="pbm-sc-list-item">Product page &amp; schema optimization</span><span class="pbm-sc-list-item">Technical SEO &amp; site structure</span><span class="pbm-sc-list-item">Content &amp; buying-guide strategy</span></div></div>
<div class="pbm-service-card reveal reveal-delay-1"><div class="pbm-sc-icon">✉️</div><div class="pbm-sc-title">Email Marketing</div><div class="pbm-sc-desc">Consent-based email flows for welcome, abandoned cart, post-purchase, and repeat sales.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Welcome &amp; post-purchase flows</span><span class="pbm-sc-list-item">Abandoned cart &amp; browse recovery</span><span class="pbm-sc-list-item">Cross-sell &amp; upsell campaigns</span><span class="pbm-sc-list-item">Customer segmentation &amp; reporting</span></div></div>
<div class="pbm-service-card reveal reveal-delay-2"><div class="pbm-sc-icon">💬</div><div class="pbm-sc-title">WhatsApp Automation</div><div class="pbm-sc-desc">Automated WhatsApp communication for orders, enquiries, support, and product recommendations.</div><div class="pbm-sc-list"><span class="pbm-sc-list-item">Order confirmation &amp; shipping updates</span><span class="pbm-sc-list-item">Abandoned cart &amp; product enquiries</span><span class="pbm-sc-list-item">Review requests &amp; repeat reminders</span><span class="pbm-sc-list-item">Approved templates &amp; opt-out handling</span></div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Campaign suitability depends on product category, pricing, market demand, website quality, margins, advertising budget, and competition.</p>
</div></section>

<!-- ═══════ PRODUCT MARKETING STRATEGY ═══════ -->
<section class="pbm-service-block" id="strategy">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;">Service 01</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Product Marketing <span class="gradient-text">Strategy</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">A structured marketing strategy creates alignment between your product, audience, offer, channels, and conversion process — ensuring every effort contributes to measurable growth.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Product Positioning</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Market Research</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Audience Research</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Buyer Personas</div>
<div class="pbm-sb-offering reveal">Competitor Analysis</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Pricing Review</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Offer Development</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Campaign Roadmap</div>
<div class="pbm-sb-offering reveal">Channel Selection</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Product Launch Planning</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Promotion Strategy</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Funnel Mapping</div>
<div class="pbm-sb-offering reveal">Retention Planning</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Growth Priorities</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Reporting Framework</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Testing Roadmap</div>
</div>
</div></section>

<!-- ═══════ META ADS ═══════ -->
<section class="pbm-service-block" id="meta-ads">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--green);">Service 02</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Meta Ads for <span class="gradient-text">Product Businesses</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Facebook and Instagram campaigns designed to generate product awareness, discovery, website visits, add-to-cart activity, purchases, and repeat engagement.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Facebook Ads</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Instagram Ads</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Conversion Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Sales Campaigns</div>
<div class="pbm-sb-offering reveal">Catalogue Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Video Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Carousel Ads</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Collection Ads</div>
<div class="pbm-sb-offering reveal">Product Launch Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Remarketing</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Dynamic Product Ads</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Lookalike Audiences</div>
<div class="pbm-sb-offering reveal">Creative Testing</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Ad Copy Testing</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Audience Testing</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Campaign Reporting</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">We do not promise guaranteed sales, fixed ROAS, or specific cost-per-purchase outcomes.</p>
</div></section>

<!-- ═══════ GOOGLE ADS & SHOPPING ═══════ -->
<section class="pbm-service-block" id="google-ads">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--orange);">Service 03</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Google Ads &amp; Shopping <span class="gradient-text">Campaigns</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Google Ads captures high-intent shoppers actively searching for specific products, categories, or solutions — making it a critical channel for product-based businesses.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Search Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Shopping Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Brand Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Product-Category Campaigns</div>
<div class="pbm-sb-offering reveal">High-Intent Keyword Targeting</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Negative Keyword Management</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Merchant Center Setup</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Product Feed Optimization</div>
<div class="pbm-sb-offering reveal">Conversion Tracking</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Search-Term Analysis</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Remarketing</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Budget Allocation</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">Campaign suitability depends on product category, pricing, market demand, website quality, product feed quality, margins, advertising budget, and competition.</p>
</div></section>

<!-- ═══════ CREATIVE STRATEGY ═══════ -->
<section class="pbm-service-block" id="creative">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--green);">Service 04</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Creative Strategy &amp; <span class="gradient-text">Product Content</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Strong product marketing depends heavily on creative quality. We plan and direct product visuals, videos, and ad formats that communicate value clearly.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Product Photography Direction</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Product Videos</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Product Demonstrations</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Lifestyle Content</div>
<div class="pbm-sb-offering reveal">Feature-Benefit Content</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Comparison Creatives</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Offer Creatives</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Short-Form Videos &amp; Reels</div>
<div class="pbm-sb-offering reveal">Static Ad Creatives</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Carousel Creatives</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Motion Graphics</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Creative Testing Plan</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">We use only approved and legally usable product assets. We do not fabricate customer reviews or user-generated content.</p>
</div></section>

<!-- ═══════ PRODUCT LANDING PAGES ═══════ -->
<section class="pbm-service-block" id="landing-pages">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;">Service 05</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Product <span class="gradient-text">Landing Pages</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Dedicated product or campaign landing pages consistently outperform sending all traffic to a generic homepage. We build pages designed for conversion.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Product-Specific Pages</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Collection Landing Pages</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Campaign Landing Pages</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Product Launch Pages</div>
<div class="pbm-sb-offering reveal">Offer Pages</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Lead-Generation Pages</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Mobile-First Design</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Fast Loading</div>
<div class="pbm-sb-offering reveal">Clear Pricing &amp; CTA</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Trust Elements</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Conversion Tracking</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Thank-You Pages</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">We do not use fake reviews, ratings, stock levels, urgency counts, or fabricated customer numbers.</p>
</div></section>

<!-- ═══════ CONVERSION OPTIMIZATION ═══════ -->
<section class="pbm-service-block" id="cro">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--orange);">Service 06</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Conversion Rate <span class="gradient-text">Optimization</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Conversion optimization helps more visitors complete meaningful actions — from product discovery to purchase, with fewer drop-offs at every stage.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Product-Page Review</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Homepage Review</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Collection-Page Review</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Cart Review</div>
<div class="pbm-sb-offering reveal">Checkout Review</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Mobile Experience</div>
<div class="pbm-sb-offering reveal reveal-delay-2">CTA Optimization</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Trust Signals</div>
<div class="pbm-sb-offering reveal">Shipping &amp; Policy Clarity</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Page Speed</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Form Simplification</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Product Bundling &amp; Upsells</div>
<div class="pbm-sb-offering reveal">Abandoned-Cart Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-1">AOV Improvements</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Cross-Sell Opportunities</div>
<div class="pbm-sb-offering reveal reveal-delay-3">A/B Testing</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">We do not promise a fixed conversion-rate improvement. Results depend on traffic volume, product, pricing, and customer behaviour.</p>
</div></section>

<!-- ═══════ SEO ═══════ -->
<section class="pbm-service-block" id="seo">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--green);">Service 07</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">SEO for <span class="gradient-text">Product Businesses</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">SEO supports long-term product discoverability — helping potential customers find your products when they search for what you sell.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Product Keyword Research</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Category Keyword Research</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Product-Page SEO</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Collection-Page SEO</div>
<div class="pbm-sb-offering reveal">Technical SEO</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Product Schema</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Category Structure</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Internal Linking</div>
<div class="pbm-sb-offering reveal">Product Descriptions</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Image SEO</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Buying Guides &amp; Content</div>
<div class="pbm-sb-offering reveal reveal-delay-3">FAQ Content</div>
<div class="pbm-sb-offering reveal">Site Speed &amp; Indexing</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Duplicate Content Control</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Local SEO for Retailers</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Merchant Listing Support</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">We do not promise instant rankings or guaranteed positions. SEO is a long-term investment that builds visibility over time.</p>
</div></section>

<!-- ═══════ EMAIL MARKETING ═══════ -->
<section class="pbm-service-block" id="email">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;">Service 08</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">Email <span class="gradient-text">Marketing</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">Email marketing supports retention and repeat sales through consent-based, automated communication with your customers.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Welcome Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Abandoned-Cart Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Browse-Abandonment Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Post-Purchase Flow</div>
<div class="pbm-sb-offering reveal">Product Education Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Cross-Sell Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Upsell Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Review Request Flow</div>
<div class="pbm-sb-offering reveal">Win-Back Flow</div>
<div class="pbm-sb-offering reveal reveal-delay-1">New Product Campaigns</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Customer Segmentation</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Performance Reporting</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">All email communication uses consent-based practices. No spam.</p>
</div></section>

<!-- ═══════ WHATSAPP AUTOMATION ═══════ -->
<section class="pbm-service-block" id="whatsapp">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--green);">Service 09</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">WhatsApp <span class="gradient-text">Automation</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">WhatsApp automation supports customer communication, order updates, product enquiries, and sales follow-up — at scale and with consent.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Order Confirmation</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Shipping Updates</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Product Enquiries</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Abandoned-Cart Reminders</div>
<div class="pbm-sb-offering reveal">Product Recommendations</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Restock Notifications</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Offer Announcements</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Support Responses</div>
<div class="pbm-sb-offering reveal">Human Handover</div>
<div class="pbm-sb-offering reveal reveal-delay-1">COD Confirmation</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Review Requests</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Repeat Purchase Reminders</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1rem">• Official WhatsApp Business API or approved providers may involve charges.<br>• Customer consent may be required. Templates may need approval.<br>• WhatsApp automation must not be used for spam.</p>
</div></section>

<!-- ═══════ CRM INTEGRATION ═══════ -->
<section class="pbm-service-block" id="crm">
<div class="pbm-sb-inner">
<div class="pbm-sb-header">
<div class="pbm-section-label reveal" style="justify-content:center;color:var(--orange);">Service 10</div>
<h2 class="pbm-sb-title reveal reveal-delay-1">CRM &amp; Customer Data <span class="gradient-text">Integration</span></h2>
<p class="pbm-sb-desc reveal reveal-delay-2">CRM integration helps product businesses organize leads, customer interactions, purchase history, and marketing data in one connected system.</p>
</div>
<div class="pbm-sb-offerings">
<div class="pbm-sb-offering reveal">Lead Capture &amp; Auto-Entry</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Customer Profiles</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Purchase History</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Lead Source Tracking</div>
<div class="pbm-sb-offering reveal">Campaign Tracking</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Customer Segmentation</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Follow-Up Reminders</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Sales Pipeline</div>
<div class="pbm-sb-offering reveal">Wholesale &amp; Distributor Enquiries</div>
<div class="pbm-sb-offering reveal reveal-delay-1">Reporting Dashboard</div>
<div class="pbm-sb-offering reveal reveal-delay-2">Marketing Automation Triggers</div>
<div class="pbm-sb-offering reveal reveal-delay-3">Customer Notes &amp; Export</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-muted);margin-top:1.5rem">Integration depends on the selected CRM, website platform, APIs, and automation tools available.</p>
</div></section>

<!-- ═══════ PRODUCT MARKETING FUNNEL ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">Funnel</div><h2 class="pbm-section-title">Integrated Product Marketing Funnel</h2><p class="pbm-section-sub">How advertising, creative, website, SEO, email, WhatsApp, CRM, and retention work together as a connected growth system.</p></div>
<div class="pbm-flow">
<div class="pbm-flow-step reveal"><div class="pbm-flow-num">01</div><span class="pbm-flow-icon">📱</span><div class="pbm-flow-label">Product Discovery</div></div>
<div class="pbm-flow-step reveal reveal-delay-1"><div class="pbm-flow-num">02</div><span class="pbm-flow-icon">📄</span><div class="pbm-flow-label">Product Page Visit</div></div>
<div class="pbm-flow-step reveal reveal-delay-2"><div class="pbm-flow-num">03</div><span class="pbm-flow-icon">🔍</span><div class="pbm-flow-label">Product Evaluation</div></div>
<div class="pbm-flow-step reveal reveal-delay-3"><div class="pbm-flow-num">04</div><span class="pbm-flow-icon">🛒</span><div class="pbm-flow-label">Add to Cart</div></div>
<div class="pbm-flow-step reveal"><div class="pbm-flow-num">05</div><span class="pbm-flow-icon">💳</span><div class="pbm-flow-label">Checkout</div></div>
<div class="pbm-flow-step reveal reveal-delay-1"><div class="pbm-flow-num">06</div><span class="pbm-flow-icon">🔄</span><div class="pbm-flow-label">Abandonment Recovery</div></div>
<div class="pbm-flow-step reveal reveal-delay-2"><div class="pbm-flow-num">07</div><span class="pbm-flow-icon">📦</span><div class="pbm-flow-label">Post-Purchase</div></div>
<div class="pbm-flow-step reveal reveal-delay-3"><div class="pbm-flow-num">08</div><span class="pbm-flow-icon">📈</span><div class="pbm-flow-label">Retention &amp; Repeat</div></div>
</div>
</div></section>

<!-- ═══════ CASE STUDY SCENARIOS ═══════ -->
<section class="pbm-section" id="scenarios"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label orange">Strategy Scenarios</div><h2 class="pbm-section-title">Product Growth Strategy Examples</h2><p class="pbm-section-sub">Illustrative marketing approaches based on common product-business growth situations. These are not client results.</p></div>
<div class="pbm-grid-2">
<div class="pbm-scenario reveal"><div class="pbm-scenario-label">📋 Illustrative — Not a Client Result</div><h4>New D2C Brand Launch</h4><p><strong>Challenge:</strong> A new D2C brand needs awareness, first customers, and product validation.<br><strong>Strategy:</strong> Meta Ads for awareness and conversion, product landing page with clear positioning, email welcome flow, and remarketing to site visitors.<br><strong>Metrics to track:</strong> Cost per purchase, conversion rate, add-to-cart rate, email signup rate, repeat purchase rate.</p></div>
<div class="pbm-scenario reveal reveal-delay-1"><div class="pbm-scenario-label">📋 Illustrative — Not a Client Result</div><h4>E-commerce Store — Low Conversion</h4><p><strong>Challenge:</strong> An established e-commerce store receives traffic but converts poorly.<br><strong>Strategy:</strong> Product-page audit, checkout flow review, CTA and offer optimization, cart-abandonment email flow, creative testing to improve ad-to-site alignment.<br><strong>Metrics to track:</strong> Conversion rate, cart abandonment rate, checkout completion, AOV, email revenue.</p></div>
<div class="pbm-scenario reveal"><div class="pbm-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Manufacturer Moving to Direct Sales</h4><p><strong>Challenge:</strong> A manufacturer wants to sell directly to consumers for the first time.<br><strong>Strategy:</strong> D2C website planning, product and brand positioning, Google Ads for product search, CRM for lead and order management, retention planning.<br><strong>Metrics to track:</strong> Customer acquisition cost, first-purchase rate, repeat purchase rate, organic product discovery.</p></div>
<div class="pbm-scenario reveal reveal-delay-1"><div class="pbm-scenario-label">📋 Illustrative — Not a Client Result</div><h4>Marketplace Seller Building an Independent Brand</h4><p><strong>Challenge:</strong> A marketplace seller wants to reduce dependency and build a direct brand.<br><strong>Strategy:</strong> Direct website development, brand positioning, SEO for product discoverability, Meta and Google Ads for customer acquisition, email and WhatsApp for retention, customer data ownership.<br><strong>Metrics to track:</strong> New customer rate, organic traffic, email conversion, repeat purchase rate, direct channel revenue.</p></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:2rem">Verified campaign results will be added after client approval. These scenarios illustrate strategic approaches, not proven outcomes.</p>
</div></section>

<!-- ═══════ METRICS ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">Measurement</div><h2 class="pbm-section-title">Campaign Metrics to Track</h2><p class="pbm-section-sub">Product marketing campaigns may be evaluated using these performance indicators — tracked and reported transparently.</p></div>
<div class="pbm-metrics">
<div class="pbm-metric reveal"><div class="pbm-metric-icon">💰</div><div class="pbm-metric-val">ROAS</div><div class="pbm-metric-label">Return on ad spend</div></div>
<div class="pbm-metric reveal reveal-delay-1"><div class="pbm-metric-icon">📊</div><div class="pbm-metric-val">CAC</div><div class="pbm-metric-label">Customer acquisition cost</div></div>
<div class="pbm-metric reveal reveal-delay-2"><div class="pbm-metric-icon">📈</div><div class="pbm-metric-val">CVR</div><div class="pbm-metric-label">Conversion rate</div></div>
<div class="pbm-metric reveal reveal-delay-3"><div class="pbm-metric-icon">🔄</div><div class="pbm-metric-val">LTV</div><div class="pbm-metric-label">Customer lifetime value</div></div>
</div>
<p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:1.5rem">Additional metrics: orders, cost per purchase, AOV, add-to-cart rate, checkout completion, cart abandonment, repeat purchase rate, email revenue, organic traffic, creative performance, and landing-page conversion. Actual values are displayed only when verified.</p>
</div></section>

<!-- ═══════ PROCESS ═══════ -->
<section class="pbm-section"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label">Process</div><h2 class="pbm-section-title">Our Product Marketing Process</h2><p class="pbm-section-sub">A structured methodology from product discovery through optimization and repeat sales.</p></div>
<div class="pbm-process-grid">
<div class="pbm-process-step reveal"><div class="pbm-process-num">01</div><span class="pbm-process-icon">🔍</span><div class="pbm-process-title">Product Discovery</div><div class="pbm-process-desc">Understand products, pricing, margins, target customers, best sellers, sales channels, marketing history, and business goals.</div></div>
<div class="pbm-process-step reveal reveal-delay-1"><div class="pbm-process-num">02</div><span class="pbm-process-icon">📊</span><div class="pbm-process-title">Market &amp; Competitor Research</div><div class="pbm-process-desc">Review competitor products, pricing, positioning, customer expectations, marketing channels, creative direction, and search demand.</div></div>
<div class="pbm-process-step reveal reveal-delay-2"><div class="pbm-process-num">03</div><span class="pbm-process-icon">🧩</span><div class="pbm-process-title">Customer Journey Mapping</div><div class="pbm-process-desc">Map awareness, consideration, purchase, abandonment, retention, repeat purchase, and referral paths.</div></div>
<div class="pbm-process-step reveal reveal-delay-3"><div class="pbm-process-num">04</div><span class="pbm-process-icon">🎨</span><div class="pbm-process-title">Strategy &amp; Funnel Creation</div><div class="pbm-process-desc">Plan campaigns, creative requirements, landing pages, website improvements, SEO, email, WhatsApp, CRM, and tracking.</div></div>
</div>
<div class="pbm-process-grid" style="margin-top:20px">
<div class="pbm-process-step reveal"><div class="pbm-process-num">05</div><span class="pbm-process-icon">🚀</span><div class="pbm-process-title">Setup &amp; Launch</div><div class="pbm-process-desc">Prepare and launch approved marketing activities with proper tracking and lead routing.</div></div>
<div class="pbm-process-step reveal reveal-delay-1"><div class="pbm-process-num">06</div><span class="pbm-process-icon">🔄</span><div class="pbm-process-title">Testing &amp; Optimization</div><div class="pbm-process-desc">Review audiences, creatives, offers, product pages, landing pages, checkout behaviour, and campaign cost.</div></div>
<div class="pbm-process-step reveal reveal-delay-2"><div class="pbm-process-num">07</div><span class="pbm-process-icon">📈</span><div class="pbm-process-title">Retention &amp; Repeat Sales</div><div class="pbm-process-desc">Improve customer communication, follow-up, cross-sell, upsell, and repeat purchase systems.</div></div>
<div class="pbm-process-step reveal reveal-delay-3"><div class="pbm-process-num">08</div><span class="pbm-process-icon">📋</span><div class="pbm-process-title">Reporting &amp; Growth Planning</div><div class="pbm-process-desc">Share clear reports, review performance, and prioritize next growth actions.</div></div>
</div></div></section>

<!-- ═══════ PRICING ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)" id="pricing">
<div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label orange">Packages</div><h2 class="pbm-section-title">Growth Packages</h2><p class="pbm-section-sub">Flexible engagement options designed for different stages of product-business growth.</p></div>
<div class="pbm-pricing-grid">
<div class="pbm-pricing-card reveal">
<div class="pbm-pricing-header"><div class="pbm-pricing-name">Starter Growth</div><div class="pbm-pricing-sub">For new product businesses and small D2C brands</div></div>
<div class="pbm-pricing-body">
<p class="pbm-pricing-desc">Initial business review, basic campaign strategy, one primary advertising channel, basic creative planning, landing-page recommendations, monthly reporting, and strategy consultation.</p>
<ul class="pbm-pricing-features"><li>Initial business &amp; product review</li><li>Campaign strategy development</li><li>Primary ad channel management</li><li>Basic creative planning</li><li>Landing-page recommendations</li><li>Monthly performance reporting</li><li>Strategy consultation calls</li></ul>
<a href="#enquiry" class="lb lb-orange lb-full"><div class="lb-shine"></div><span class="lb-text">Choose Starter Growth <span class="arrow">→</span></span></a>
</div>
<div class="pbm-pricing-note">Ad spend is separate from agency fees. Final pricing depends on scope.</div>
</div>
<div class="pbm-pricing-card featured reveal reveal-delay-1">
<div class="pbm-pricing-label">Popular</div>
<div class="pbm-pricing-header"><div class="pbm-pricing-name">Performance Growth</div><div class="pbm-pricing-sub">For growing e-commerce stores and active advertisers</div></div>
<div class="pbm-pricing-body">
<p class="pbm-pricing-desc">Detailed product and audience research, Meta Ads management, Google Ads support, creative testing plan, conversion optimization, remarketing, email or WhatsApp flow planning, monthly reporting, and growth consultation.</p>
<ul class="pbm-pricing-features"><li>Product &amp; audience research</li><li>Meta Ads management</li><li>Google Ads support</li><li>Creative testing plan</li><li>Conversion optimization</li><li>Remarketing setup</li><li>Email or WhatsApp flow planning</li><li>Monthly reporting &amp; growth call</li></ul>
<a href="#enquiry" class="lb lb-orange lb-full"><div class="lb-shine"></div><span class="lb-text">Choose Performance Growth <span class="arrow">→</span></span></a>
</div>
<div class="pbm-pricing-note">Ad spend is separate. Third-party tools or platform charges may apply.</div>
</div>
<div class="pbm-pricing-card reveal reveal-delay-2">
<div class="pbm-pricing-header"><div class="pbm-pricing-name">Full-Funnel Scale</div><div class="pbm-pricing-sub">For established brands seeking an integrated growth system</div></div>
<div class="pbm-pricing-body">
<p class="pbm-pricing-desc">Full-funnel strategy, multi-channel advertising, landing-page support, creative strategy, conversion optimization, SEO planning, email marketing, WhatsApp automation, CRM integration, retention strategy, advanced reporting, and ongoing growth planning.</p>
<ul class="pbm-pricing-features"><li>Full-funnel growth strategy</li><li>Multi-channel advertising</li><li>Landing page &amp; CRO support</li><li>Creative strategy &amp; testing</li><li>SEO planning &amp; execution</li><li>Email &amp; WhatsApp automation</li><li>CRM integration planning</li><li>Retention &amp; repeat sales strategy</li><li>Advanced reporting &amp; growth planning</li></ul>
<a href="#enquiry" class="lb lb-orange lb-full"><div class="lb-shine"></div><span class="lb-text">Discuss Full-Funnel Growth <span class="arrow">→</span></span></a>
</div>
<div class="pbm-pricing-note">Ad spend, platform fees, and third-party charges are separate. Scope may vary.</div>
</div>
</div>
<p style="text-align:center;font-size:.78rem;color:var(--text-faint);margin-top:1rem">No package guarantees specific sales, ROAS, or profitability. All prices are indicative and subject to scope finalization.</p>
</div></section>

<!-- ═══════ WHY ADSCALE ═══════ -->
<section class="pbm-section"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label">Why AdScale</div><h2 class="pbm-section-title">Why Choose AdScale</h2><p class="pbm-section-sub">Built on product-focused strategy, full-funnel execution, and honest marketing.</p></div>
<div class="pbm-grid-4">
<div class="pbm-card reveal"><div class="pbm-card-icon green">✓</div><div class="pbm-card-title">Product-Focused Strategy</div><div class="pbm-card-desc">Every campaign starts with product understanding — positioning, audience, offer, and funnel alignment before execution begins.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon green">✓</div><div class="pbm-card-title">Full-Funnel Execution</div><div class="pbm-card-desc">Advertising, landing pages, SEO, email, WhatsApp, CRM, and retention planned as one connected growth system.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon green">✓</div><div class="pbm-card-title">Creative Testing</div><div class="pbm-card-desc">Structured creative development and testing to improve product messaging, ad performance, and conversion rates.</div></div>
<div class="pbm-card reveal reveal-delay-3"><div class="pbm-card-icon green">✓</div><div class="pbm-card-title">Transparent Reporting</div><div class="pbm-card-desc">No fake sales numbers, no fabricated ROAS. Clear, honest reports with actionable recommendations for growth.</div></div>
</div></div></section>

<!-- ═══════ QUALITY COMMITMENT ═══════ -->
<section class="pbm-section" style="background:var(--bg-deep)"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label orange">Commitment</div><h2 class="pbm-section-title">Our Quality Commitment</h2><p class="pbm-section-sub">How we ensure every campaign meets professional standards and handles your brand with care.</p></div>
<div class="pbm-commit-grid">
<div class="pbm-commit-item reveal"><span class="ck">✓</span> Accurate product information and approved claims only</div>
<div class="pbm-commit-item reveal reveal-delay-1"><span class="ck">✓</span> No fake reviews, ratings, or fabricated customer counts</div>
<div class="pbm-commit-item reveal reveal-delay-2"><span class="ck">✓</span> No misleading before-and-after or false scarcity tactics</div>
<div class="pbm-commit-item reveal reveal-delay-3"><span class="ck">✓</span> No hidden advertising costs or surprise fees</div>
<div class="pbm-commit-item reveal"><span class="ck">✓</span> Secure customer data handling with consent-based communication</div>
<div class="pbm-commit-item reveal reveal-delay-1"><span class="ck">✓</span> Clear campaign tracking and transparent reporting</div>
<div class="pbm-commit-item reveal reveal-delay-2"><span class="ck">✓</span> Mobile-friendly, performance-optimized landing pages</div>
<div class="pbm-commit-item reveal reveal-delay-3"><span class="ck">✓</span> Continuous improvement with honest recommendations</div>
</div></div></section>

<!-- ═══════ WHO THIS IS FOR ═══════ -->
<section class="pbm-section"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">This Service Is For</div><h2 class="pbm-section-title">Who This Service Is For</h2><p class="pbm-section-sub">Product businesses at different stages — from new launches to established brands seeking a stronger marketing system.</p></div>
<div class="pbm-grid-3">
<div class="pbm-card reveal"><div class="pbm-card-icon">🆕</div><div class="pbm-card-title">New D2C Brands</div><div class="pbm-card-desc">Emerging direct-to-consumer brands needing structured marketing from day one.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon">🛒</div><div class="pbm-card-title">Struggling E-commerce Stores</div><div class="pbm-card-desc">Online stores with traffic but low conversion, requiring systematic optimization.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon">🏭</div><div class="pbm-card-title">Manufacturers Going D2C</div><div class="pbm-card-desc">Manufacturers building direct-to-consumer sales channels for the first time.</div></div>
<div class="pbm-card reveal"><div class="pbm-card-icon">🏬</div><div class="pbm-card-title">Retailers Expanding Online</div><div class="pbm-card-desc">Retail businesses expanding from offline to digital with omnichannel marketing.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon">📦</div><div class="pbm-card-title">Marketplace Sellers Building Brands</div><div class="pbm-card-desc">Sellers reducing marketplace dependency by building direct customer relationships.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon">🚀</div><div class="pbm-card-title">Product Launch &amp; Scaling</div><div class="pbm-card-desc">Businesses launching new products or scaling existing successful products.</div></div>
<div class="pbm-card reveal"><div class="pbm-card-icon">📉</div><div class="pbm-card-title">Brands with High CAC</div><div class="pbm-card-desc">Brands struggling with high acquisition costs needing better targeting and conversion.</div></div>
<div class="pbm-card reveal reveal-delay-1"><div class="pbm-card-icon">🔄</div><div class="pbm-card-title">Businesses Needing Retention</div><div class="pbm-card-desc">Product brands wanting stronger repeat purchase and customer retention systems.</div></div>
<div class="pbm-card reveal reveal-delay-2"><div class="pbm-card-icon">⚠️</div><div class="pbm-card-title">May Not Be Suitable</div><div class="pbm-card-desc">Businesses expecting guaranteed sales without a competitive product, sufficient margins, reliable fulfilment, proper budget, or consistent execution.</div></div>
</div></div></section>

<!-- ═══════ MID-PAGE CTA ═══════ -->
<section class="pbm-cta pbm-cta-dark"><div class="pbm-section-inner">
<h2 class="pbm-cta-title reveal">Ready to Turn More Product Views Into Purchases?</h2>
<p class="pbm-cta-sub reveal reveal-delay-1">Build a connected growth system that combines advertising, creatives, landing pages, conversion optimization, retention, and reporting.</p>
<div class="pbm-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Product Growth Strategy</span></a>
</div></div></section>

<!-- ═══════ FAQ ═══════ -->
<section class="pbm-section" id="faq"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label">FAQs</div><h2 class="pbm-section-title">Frequently Asked Questions</h2><p class="pbm-section-sub">Honest answers to common questions about product business marketing.</p></div>
<div class="pbm-faq-list">
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">What is product-based business marketing?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Product-based business marketing uses digital channels such as Meta Ads, Google Ads, Shopping campaigns, landing pages, SEO, email, and WhatsApp to help product businesses attract customers, generate sales, and build brand presence online.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Who is this service for?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">D2C brands, e-commerce stores, manufacturers, retailers, marketplace sellers, product startups, and any business that sells physical or digital products and wants structured, performance-driven marketing.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you market D2C brands?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We work with D2C brands to plan and execute marketing strategies that cover awareness, customer acquisition, conversion optimization, retention, and repeat sales through website-focused campaigns.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you help e-commerce stores increase sales?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We help e-commerce stores improve sales through better advertising, product-page optimization, checkout improvements, remarketing, email flows, and structured testing — but we do not guarantee specific revenue increases.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Do you work with manufacturers?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We support manufacturers entering direct sales, building D2C channels, generating distributor or dealer enquiries, and creating product awareness campaigns tailored to their business model.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you help retailers expand online?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We help retailers build online presence, run local and national product campaigns, set up e-commerce systems, and connect online marketing with offline sales through integrated planning.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Which is better for products — Meta Ads or Google Ads?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Both serve different purposes. Meta Ads build awareness and generate demand through targeting interests and behaviours. Google Ads capture high-intent shoppers actively searching for products. Most product businesses benefit from using both channels together.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Do you manage Google Shopping campaigns?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. Shopping campaigns are a core service. We assist with Merchant Center setup, product feed optimization, campaign structure, bid management, and search-term analysis — where the product category and feed quality support it.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Do you create product landing pages?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We create product-specific and campaign-specific landing pages with optimized content, lead forms, product details, trust signals, clear CTAs, and conversion tracking. Pages are mobile-first and designed for performance.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you improve product-page conversions?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We review product pages for layout, content clarity, trust signals, CTA placement, mobile experience, and checkout flow. Improvements depend on the platform, product, and available data.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Do you create product videos and ad creatives?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We plan and direct product photography, videos, demonstrations, lifestyle content, reels, and ad creatives. Client-provided assets or approvals are required. We do not fabricate content or use misleading visuals.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you help with email marketing?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We plan consent-based email flows including welcome, abandoned cart, post-purchase, cross-sell, upsell, and win-back campaigns. Execution depends on the email platform and integration capabilities.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you set up WhatsApp automation?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. WhatsApp automation can be set up for order updates, product enquiries, abandoned-cart reminders, recommendations, and support. Official API or approved providers may involve charges. Consent and template approval are required.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you integrate marketing leads with a CRM?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Integration depends on the selected CRM, website platform, APIs, and automation tools. We assess requirements during the planning phase and recommend suitable options.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Do you provide SEO for e-commerce websites?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Yes. We provide product keyword research, category SEO, product-page optimization, technical SEO, schema markup, content strategy, and site structure improvements. We do not promise instant rankings.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you guarantee a specific ROAS?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">No. We do not guarantee ROAS, cost per purchase, or any specific performance metric. Results depend on product category, pricing, market demand, competition, website quality, advertising budget, and customer behaviour.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">Can you guarantee sales?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">No. We do not guarantee sales or revenue. Marketing creates visibility, traffic, and enquiries. Sales depend on product quality, pricing, fulfilment, customer service, and market conditions.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">How much advertising budget is required?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Budget depends on product category, competition, target audience size, campaign objectives, and geographic scope. We discuss budget during the consultation and recommend a suitable starting point.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">What information do you need before starting?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Product details, pricing, margins, target customer information, website access, sales data (if available), marketing history, competitor information, brand assets, and campaign goals. Specific requirements depend on the scope.</div></div></div>
<div class="pbm-faq-item"><div class="pbm-faq-question" onclick="togglePBMFAQ(this)"><span class="pbm-faq-q-text">What is included in monthly reporting?</span><span class="pbm-faq-icon">+</span></div><div class="pbm-faq-answer"><div class="pbm-faq-answer-inner">Monthly reports include campaign performance, cost metrics, creative analysis, audience insights, conversion data, customer acquisition trends, retention metrics, and actionable recommendations for the next growth cycle.</div></div></div>
</div></div></section>

<!-- ═══════ ENQUIRY FORM ═══════ -->
<section class="pbm-section" id="enquiry" style="background:var(--bg-deep)"><div class="pbm-section-inner">
<div class="pbm-section-header"><div class="pbm-section-label green">Get Started</div><h2 class="pbm-section-title">Request Your Product Growth Plan</h2><p class="pbm-section-sub">Tell us about your product business and we will share a tailored marketing approach.</p></div>
<div class="pbm-form-card">
<div class="pbm-form-header"><h3>Get My Product Growth Plan</h3><p>Fill in the details and our team will reach out within 24 hours.</p></div>
<div class="pbm-form-body" id="pbmFormBody">
<form id="pbmForm" onsubmit="return submitPBMEnquiry(event)">
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Full Name *</label><input class="pbm-form-input" type="text" id="pbmName" name="name" required placeholder="Your full name"></div>
<div class="pbm-form-group"><label class="pbm-form-label">Business Name *</label><input class="pbm-form-input" type="text" id="pbmBusiness" name="business" required placeholder="Your company or brand name"></div>
</div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Phone Number *</label><input class="pbm-form-input" type="tel" id="pbmPhone" name="phone" required placeholder="+91 98765 43210"></div>
<div class="pbm-form-group"><label class="pbm-form-label">Email Address *</label><input class="pbm-form-input" type="email" id="pbmEmail" name="email" required placeholder="you@example.com"></div>
</div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Website URL *</label><input class="pbm-form-input" type="url" id="pbmWebsite" name="website" required placeholder="https://yourwebsite.com"></div>
<div class="pbm-form-group"><label class="pbm-form-label">Business Type *</label>
<select class="pbm-form-select" id="pbmBusinessType" name="businessType" required>
<option value="">Select business type</option>
<option>D2C Brand</option><option>E-commerce Store</option><option>Manufacturer</option><option>Retailer</option><option>Marketplace Seller</option><option>Product Startup</option><option>Distributor</option><option>Wholesaler</option><option>Other</option>
</select></div>
</div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Product Category</label><input class="pbm-form-input" type="text" id="pbmCategory" name="category" placeholder="e.g. Fashion, Electronics, Beauty, FMCG"></div>
<div class="pbm-form-group"><label class="pbm-form-label">Number of Products</label><input class="pbm-form-input" type="text" id="pbmProdCount" name="productCount" placeholder="e.g. 10, 50, 100+"></div>
</div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Current Sales Channel *</label>
<select class="pbm-form-select" id="pbmChannel" name="salesChannel" required>
<option value="">Select primary channel</option>
<option>Own Website</option><option>Amazon</option><option>Flipkart</option><option>Meesho</option><option>Offline Retail</option><option>Social Media</option><option>WhatsApp</option><option>Distributor Network</option><option>Multiple Channels</option><option>Not Launched Yet</option>
</select></div>
<div class="pbm-form-group"><label class="pbm-form-label">Monthly Revenue Range</label>
<select class="pbm-form-select" id="pbmRevenue" name="revenue">
<option value="">Select range</option>
<option>Pre-revenue</option><option>Under ₹1 Lakh</option><option>₹1 Lakh – ₹5 Lakhs</option><option>₹5 Lakhs – ₹10 Lakhs</option><option>₹10 Lakhs – ₹25 Lakhs</option><option>₹25 Lakhs – ₹1 Crore</option><option>Above ₹1 Crore</option>
</select></div>
</div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Monthly Ad Budget</label>
<select class="pbm-form-select" id="pbmBudget" name="budget">
<option value="">Select range</option>
<option>Under ₹50,000</option><option>₹50,000 – ₹1 Lakh</option><option>₹1 Lakh – ₹3 Lakhs</option><option>₹3 Lakhs – ₹5 Lakhs</option><option>₹5 Lakhs – ₹10 Lakhs</option><option>Above ₹10 Lakhs</option>
</select></div>
<div class="pbm-form-group"><label class="pbm-form-label">Primary Marketing Goal *</label>
<select class="pbm-form-select" id="pbmGoal" name="goal" required>
<option value="">Select primary goal</option>
<option>Increase online sales</option><option>Launch a new product</option><option>Improve ROAS</option><option>Reduce customer acquisition cost</option><option>Improve website conversion</option><option>Increase repeat sales</option><option>Build brand awareness</option><option>Expand into new markets</option><option>Improve marketplace sales</option><option>Build a D2C channel</option><option>Other</option>
</select></div>
</div>
<div class="pbm-form-group"><label class="pbm-form-label">Required Services (select all that apply)</label>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Marketing Strategy"><span>Strategy</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Meta Ads"><span>Meta Ads</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Google Ads"><span>Google Ads</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Shopping Campaigns"><span>Shopping</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Product Creative"><span>Creatives</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Product Videos"><span>Videos</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Landing Pages"><span>Landing Pages</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="CRO"><span>CRO</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="SEO"><span>SEO</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Email Marketing"><span>Email</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="WhatsApp Automation"><span>WhatsApp</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="CRM Integration"><span>CRM</span></label>
<label class="pbm-form-check" style="align-items:center"><input type="checkbox" name="services" value="Complete Growth"><span>Full Solution</span></label>
</div></div>
<div class="pbm-form-row">
<div class="pbm-form-group"><label class="pbm-form-label">Current Marketing Status</label>
<select class="pbm-form-select" id="pbmStatus" name="status">
<option value="">Select</option>
<option>Not started</option><option>Running ads internally</option><option>Working with a freelancer</option><option>Working with another agency</option><option>Previously ran campaigns</option><option>Not sure</option>
</select></div>
<div class="pbm-form-group"><label class="pbm-form-label">Message</label><textarea class="pbm-form-textarea" id="pbmMessage" name="message" placeholder="Tell us about your products, current marketing, or specific requirements..." rows="3"></textarea></div>
</div>
<div class="pbm-form-check"><input type="checkbox" id="pbmConsent" required><label for="pbmConsent">I agree to be contacted regarding my enquiry. Your data will be handled securely.</label></div>
<div class="pbm-form-submit"><button type="submit" class="lb lb-orange lb-full" id="pbmSubmitBtn"><div class="lb-shine"></div><span class="lb-text" id="pbmSubmitText">Get My Product Growth Plan <span class="arrow">→</span></span></button></div>
</form>
<div class="pbm-form-success" id="pbmFormSuccess">
<div class="pbm-form-success-icon">✅</div>
<h4>Thank You</h4>
<p>Your enquiry has been received. Our team will review your requirements and reach out within 24 hours to discuss a tailored product growth plan for your business.</p>
</div></div></div></div></section>

<!-- ═══════ FINAL CTA ═══════ -->
<section class="pbm-cta"><div class="pbm-section-inner">
<h2 class="pbm-cta-title reveal">Build a Stronger Marketing System for Your Product Business</h2>
<p class="pbm-cta-sub reveal reveal-delay-1">Discuss your products, audience, sales channels, margins, campaign goals, and current growth challenges with AdScale.</p>
<div class="pbm-cta-actions reveal reveal-delay-2">
<a href="#enquiry" class="lb lb-orange"><div class="lb-shine"></div><span class="lb-text">Get a Free Product Growth Strategy</span></a>
<a href="#enquiry" class="lb"><div class="lb-shine"></div><span class="lb-text">Book a Marketing Consultation</span></a>
</div></div></section>

<!-- ═══════ FOOTER ═══════ -->
<section class="pbm-section" style="background:#030810;padding:48px 5% 0;margin-top:0;">
<div class="pbm-section-inner">
<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.04);">
<div>
<a href="<?php echo esc_url($home_url); ?>" class="pbm-header-logo" style="margin-bottom:12px;">
<img src="https://adscale.co.in/wp-content/uploads/2026/05/Transperent-Logo.png" alt="AdScale Media" class="pbm-header-logo-img">
<span class="pbm-header-logo-text">Ad<span>Scale</span> Media</span>
</a>
<p style="font-size:13px;color:var(--text-muted);line-height:1.7;max-width:300px;margin-top:10px;">Performance marketing agency helping product-based businesses build measurable growth through advertising, creative strategy, landing pages, SEO, automation, and retention-focused marketing.</p>
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
<h4 style="font-family:var(--font-mono);font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--white);margin-bottom:18px;">Services</h4>
<div style="display:flex;flex-direction:column;gap:8px;">
<a href="<?php echo esc_url(home_url('/services/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Meta Ads</a>
<a href="<?php echo esc_url(home_url('/services/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Google Ads</a>
<a href="<?php echo esc_url(home_url('/seo-services/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">SEO Services</a>
<a href="<?php echo esc_url(home_url('/web-development/')); ?>" style="font-size:13px;color:var(--text-muted);transition:color .2s;text-decoration:none;">Web Development</a>
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
<div class="pbm-sticky-cta" id="pbmStickyCTA"><div class="pbm-sticky-cta-inner">
<a href="tel:+917388509954" class="lb lb-sm lb-hide-mobile"><div class="lb-shine"></div><span class="lb-text">📞 Call Now</span></a>
<a href="#enquiry" class="lb lb-orange lb-sm"><div class="lb-shine"></div><span class="lb-text">Get Your Free Product Growth Plan</span></a>
</div></div>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","name":"Product Business Marketing Services","description":"Digital marketing for D2C brands, e-commerce stores, manufacturers, retailers, and product businesses. Services include Meta Ads, Google Ads, Shopping campaigns, landing pages, SEO, email marketing, WhatsApp automation, and CRM integration.","provider":{"@type":"Organization","name":"AdScale Media","url":"https:\/\/adscale.co.in"},"areaServed":{"@type":"Country","name":"India"},"serviceType":["Digital Marketing","E-commerce Marketing","D2C Marketing","Product Marketing","Performance Marketing"]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is product-based business marketing?","acceptedAnswer":{"@type":"Answer","text":"Product-based business marketing uses digital channels such as Meta Ads, Google Ads, Shopping campaigns, landing pages, SEO, email, and WhatsApp to help product businesses attract customers, generate sales, and build brand presence online."}},{"@type":"Question","name":"Who is this service for?","acceptedAnswer":{"@type":"Answer","text":"D2C brands, e-commerce stores, manufacturers, retailers, marketplace sellers, product startups, and any business that sells physical or digital products and wants structured, performance-driven marketing."}}]}
</script>

<script>
/* ── Scroll Reveal ── */
(function(){var e=document.querySelectorAll('.reveal');if(!e.length)return;var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(e.target.classList.add('visible'),t.unobserve(e.target))})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});e.forEach(function(e){t.observe(e)})})();

/* ── FAQ Accordion ── */
function togglePBMFAQ(el){var p=el.parentElement;p.classList.toggle('open')}

/* ── Toast ── */
function showToast(e,t){var n=document.createElement('div');n.textContent=e,n.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:99999;padding:14px 28px;border-radius:12px;font-size:14px;color:#fff;background:rgba(6,12,20,.95);backdrop-filter:blur(20px);border:1px solid '+(t==='error'?'rgba(230,57,70,.3)':'rgba(0,200,150,.3)')+';box-shadow:0 8px 32px rgba(0,0,0,.5);opacity:0;transition:opacity .4s;max-width:90vw;text-align:center;',document.body.appendChild(n),requestAnimationFrame(function(){n.style.opacity='1'}),setTimeout(function(){n.style.opacity='0',setTimeout(function(){n.remove()},400)},3500)}

/* ── Form Submission ── */
function submitPBMEnquiry(e){e.preventDefault();
var btn=document.getElementById('pbmSubmitBtn'),txt=document.getElementById('pbmSubmitText');
var name=document.getElementById('pbmName').value.trim(),phone=document.getElementById('pbmPhone').value.trim(),email=document.getElementById('pbmEmail').value.trim(),website=document.getElementById('pbmWebsite').value.trim(),btype=document.getElementById('pbmBusinessType').value,channel=document.getElementById('pbmChannel').value,goal=document.getElementById('pbmGoal').value;
if(!name||!phone||!email||!website||!btype||!channel||!goal)return showToast('Please fill in all required fields.','error'),!1;
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return showToast('Please enter a valid email address.','error'),!1;
if(!/^https?:\/\/.+/.test(website))return showToast('Please enter a valid website URL.','error'),!1;
btn.disabled=true;txt.innerHTML='Sending...';
var services=[];document.querySelectorAll('#pbmForm input[name="services"]:checked').forEach(function(cb){services.push(cb.value)});
var data=new URLSearchParams();data.append('action','adscale_contact');data.append('nonce','<?php echo wp_create_nonce('adscale_contact'); ?>');
data.append('name',name);data.append('phone',phone);data.append('email',email);
data.append('brand',document.getElementById('pbmBusiness').value.trim());
var detail='Business Type: '+(btype||'N/A')+' | Channel: '+(channel||'N/A')+' | Category: '+(document.getElementById('pbmCategory').value||'N/A')+' | Products: '+(document.getElementById('pbmProdCount').value||'N/A')+' | Revenue: '+(document.getElementById('pbmRevenue').value||'N/A')+' | Goal: '+(goal||'N/A')+' | Status: '+(document.getElementById('pbmStatus').value||'N/A')+' | Services: '+services.join(', ');
data.append('service',detail);
data.append('budget',document.getElementById('pbmBudget').value||'Not specified');
data.append('industry','Product Business / E-commerce / D2C');
data.append('message',document.getElementById('pbmMessage').value.trim()||'');
fetch('<?php echo admin_url('admin-ajax.php'); ?>',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data.toString()})
.then(function(r){return r.json()}).then(function(r){
if(r.success){txt.innerHTML='\u2713 Request Sent Successfully!';btn.style.boxShadow='0 0 28px -4px rgba(0,200,150,.5)';
showToast('Thank you! Our team will review your requirements and reach out within 24 hours.','success');
setTimeout(function(){document.getElementById('pbmForm').reset();btn.disabled=false;txt.innerHTML='Get My Product Growth Plan <span class="arrow">\u2192</span>';btn.style.boxShadow=''},4000)}
else{showToast(r.data&&r.data.message||'Something went wrong. Please try again.','error');btn.disabled=false;txt.innerHTML='Get My Product Growth Plan <span class="arrow">\u2192</span>'}})
.catch(function(){showToast('Network error. Please try again or WhatsApp us directly.','error');btn.disabled=false;txt.innerHTML='Get My Product Growth Plan <span class="arrow">\u2192</span>'});
return!1}

/* ── Header Scroll ── */
(function(){var h=document.querySelector('.pbm-header');if(!h)return;var last=0;window.addEventListener('scroll',function(){var y=window.scrollY;if(y>last&&y>100){h.style.transform='translateY(-100%)'}else{h.style.transform='translateY(0)'}last=y},{passive:true})})();

/* ── Smooth Anchor Scroll ── */
(function(){document.querySelectorAll('a[href^="#"]').forEach(function(e){e.addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));t&&(e.preventDefault(),t.scrollIntoView({behavior:'smooth',block:'start'}))})})})();
</script>

