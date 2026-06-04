# FIRST YEAR FOUNDATIONS — Master Build Brief

**Last Updated:** June 2026  
**Complete context document for continuing work in any new Claude session**

---

## 1 — Brand & Business

| Item | Detail |
|------|--------|
| Brand name | First Year Foundations |
| Domain | first-year-foundations.com (purchased on Porkbun) |
| MailerLite domain | first-years-foundations.com (note the S — different from main domain) |
| Business email | hello@first-year-foundations.com (Porkbun email forwarding → talnoga@gmail.com) |
| Contact email | hello@first-year-foundations.com |
| Brand sign-off | First Year Foundations Team (no personal name exposed) |
| Creator credential | Feldenkrais-certified practitioner |
| Target audience | Parents of babies aged 0–12 months, primarily US-based English speakers |
| Business entity | Not formally registered. Operating informally. |
| Governing law | State of Delaware, USA (for legal pages) |
| Tax reporting | Through partner's existing Israeli business when needed |

---

## 2 — Products & Pricing

| Product | Price |
|---------|-------|
| 0–3 Month Developmental Guide | $14.99 |
| 3–6 Month Developmental Guide | $14.99 |
| 6–9 Month Developmental Guide | $14.99 |
| 9–12 Month Developmental Guide | $14.99 |
| Complete First Year Bundle (all 4) | $39.99 |
| Freebie lead magnet | Free — email gated via MailerLite |

**Freebie title:** '5 Gentle Ways to Support Your Baby's Development in the First 3 Months'  
**Note:** No discount codes at launch. TESTORDER (100% off) was a test code — should be deleted.

---

## 3 — Tool Stack & Credentials

| Tool | Status & Notes |
|------|---|
| Whop | LIVE. Store: whop.com/first-year-foundations. 5 products live, payout configured for Israel (USD), verification approved. |
| MailerLite | LIVE. Free plan. Sending domain: first-year-foundations.com verified. Sender: hello@first-year-foundations.com |
| Zapier | LIVE. Zap: Whop new payment → MailerLite Create/Update Subscriber + Add to Buyers group. Free tier (100 tasks/month). |
| GitHub Pages | LIVE. Repo: github.com/talnoga-png/first-years-foundations. Custom domain: first-year-foundations.com. HTTPS enforced. |
| Porkbun | Domain registrar. Email forwarding set up: hello@ → talnoga@gmail.com. |
| Tally.so | LIVE. Feedback form URL: https://tally.so/r/ODkZlM. Linked in PP Email 2. |
| Wise | Waitlist — not needed. Whop pays out to Israel directly. |
| Payoneer | Not needed. Whop handles Israel payouts natively. |
| Pinterest | Not yet set up. Phase 3. |
| Google Search Console | Not yet set up. Add on website launch day. |

---

## 4 — MailerLite Configuration

**Groups:**
- Freebie Leads — subscribers who opted in via the freebie landing page
- Buyers — subscribers added automatically by Zapier when a Whop purchase is made

**Landing page:**
- URL: first-years-foundations-ndpk6k.subscribepage.io
- Fields: First Name + Email
- Double opt-in: enabled
- Consent text: 'You'll also receive emails with tips and offers about baby development guides. You can unsubscribe at any time.'
- Assigned to: Freebie Leads group

**Automation 1: Freebie Nurture Sequence**
- Trigger: Joins Freebie Leads group
- Email 1 (immediate): Welcome + freebie PDF delivery
- Delay 2 days → Email 2: 3 things that actually help
- Delay 2 days → Email 3: Your baby is not behind (no CTA — pure trust)
- Delay 3 days → Condition: Is subscriber in Buyers group? YES → Exit / NO → continue
- Email 4: Your age guide (links to all 4 Whop product URLs)
- Delay 3 days → Email 5: The full roadmap (bundle offer)

**Automation 2: Buyers Post-Purchase Sequence**
- Trigger: Joins Buyers group (added by Zapier on Whop purchase)
- Email 1 (immediate): You're all set — guide access instructions
- Delay 5 days → Email 2: How are you getting on? + Tally form link
- Delay 9 days → Email 3: Your baby is growing — next stage nudge + bundle link

**Email settings:**
- Sender name: First Year Foundations Team
- Sender email: hello@first-year-foundations.com
- Footer: Educational only — not medical advice. first-year-foundations.com + unsubscribe link
- Variable syntax: {$name} for first name personalisation

---

## 5 — Website Structure & Build Status

| Page | URL / Status |
|------|---|
| Homepage | / — ✅ BUILT |
| 0–3 Month Guide | /0-3-months.html — TO BUILD |
| 3–6 Month Guide | /3-6-months.html — TO BUILD |
| 6–9 Month Guide | /6-9-months.html — TO BUILD |
| 9–12 Month Guide | /9-12-months.html — TO BUILD |
| Bundle page | /bundle.html — TO BUILD |
| About page | /about.html — TO BUILD |
| FAQ page | /faq.html — TO BUILD |
| Free guide opt-in | /free.html — TO BUILD |
| Blog index | /blog.html — TO BUILD |
| Health disclaimer | /disclaimer.html — TO BUILD |
| Terms of use | /terms.html — TO BUILD |
| Privacy policy | /privacy.html — TO BUILD |
| sitemap.xml | /sitemap.xml — TO BUILD |
| robots.txt | /robots.txt — TO BUILD |

**GitHub repository:**
- Repo URL: https://github.com/talnoga-png/first-years-foundations
- Branch: main
- Deploy: GitHub Pages, root folder
- Custom domain: first-year-foundations.com
- Logo path: images/logo.png
- To work locally: clone repo, edit files, commit and push to main — site rebuilds automatically

---

## 6 — Design System

**Colour palette:**

| Variable | Hex value |
|----------|-----------|
| --lavender-bg (page background) | #FDFCFF |
| --lavender-light (section alternate) | #F5F3FF |
| --lavender-mid (accent) | #CECBF6 |
| --purple-main (links, accents) | #5851A0 |
| --purple-button (buttons) | #8880DC |
| --purple-dark (headings, footer) | #3D3580 |
| --text-body | #3A3A38 |
| --text-muted | #707080 |
| --border | #E8E5FA |
| --cream (about strip bg) | #FDF8F5 |
| --teal (freebie strip, accents) | #3D7A72 |
| --terracotta (logo colour, accents) | #C1603A |

**Typography:**
- Primary font: Georgia, serif
- Fallback: Times New Roman, serif
- Body size: 17px
- Line height: 1.7

**Components:**
- Buttons: border-radius 30px (pill shape). Primary: #8880DC. Outline: transparent with #8880DC border.
- Cards: border-radius 16px, border 1px #E8E5FA, white background
- Sections alternate: #FDFCFF and #F5F3FF
- Navigation: sticky, white background, border-bottom #E8E5FA
- Footer: background #3D3580 (purple-dark)

---

## 7 — SEO & GEO Requirements

**Every page must include:**
- Unique `<title>` tag — format: '[Page topic] | First Year Foundations'
- Unique meta description — 140–160 characters, outcome-focused
- Self-referencing canonical tag
- Open Graph tags: og:title, og:description, og:image, og:url, og:type
- Relevant JSON-LD schema (see below)
- Credential byline: 'Written by a Feldenkrais-certified practitioner' on all content pages
- Short educational disclaimer on all product and blog pages

**Schema by page type:**

| Page | Schema |
|------|--------|
| Homepage | WebSite + Organization |
| Age guide pages | Product (name, description, price, currency) |
| Bundle page | Product |
| Blog posts | BlogPosting (author, datePublished, description) |
| FAQ page | FAQPage |
| About page | Person (name, jobTitle, description) |
| Any page with Q&A | FAQPage on the Q&A block |

**GEO (AI citability) requirements:**
- Quick answer block at top of every blog post — 2–3 sentence direct answer
- Q&A formatted sections throughout content
- Outbound citations to NHS, AAP, or pathways.org where developmental claims are made
- Consistent credential across all pages — same name, title, brief bio
- Language: variation, foundations, gentle support — never diagnose, treat, cure, therapy, fix

---

## 8 — Content Plan

**Blog posts — priority order:**

| When | Title | Links to |
|------|-------|----------|
| Before launch | Gentle tummy time support for newborns | 0–3 guide |
| Before launch | How to support your baby's rolling without pushing milestones | 3–6 guide |
| Month 1 | Why does my baby only turn their head to one side? | 0–3 guide |
| Month 1 | My baby hates tummy time at 5 months — what actually helps | 3–6 guide |
| Month 2 | Should I prop my baby into sitting? | 6–9 guide |
| Month 2 | My baby isn't crawling at 8 months — is that normal? | 6–9 guide |
| Month 3 | Does my baby need to crawl before walking? | 9–12 guide |
| Month 3 | How to support baby pulling to stand without rushing | 9–12 guide |
| Month 4+ | Follow Google Search Console query data | TBD |

**Topical clusters to build:**
- Tummy time cluster: newborn tummy time, tummy time at 3 months, tummy time alternatives
- Rolling cluster: when do babies roll, baby only rolls one way, supporting rolling
- Crawling cluster: baby not crawling at 8 months, do babies need to crawl
- Sitting cluster: should I prop baby to sit, baby topples when sitting
- Milestone anxiety cluster: baby behind on milestones, gentle development philosophy
- Feldenkrais cluster: what is Feldenkrais, Feldenkrais and baby movement

---

## 9 — Legal

| Item | Status |
|------|--------|
| Health Disclaimer page | Drafted — needs to be built at /disclaimer.html |
| Terms of Use page | Drafted — needs to be built at /terms.html |
| Privacy Policy page | Drafted — needs to be built at /privacy.html |
| Whop product disclaimers | DONE — added to all 5 product descriptions/FAQs |
| Email footer disclaimers | DONE — in all 8 emails |
| Lawyer review | Pending — do before driving real traffic |

**Short disclaimer — use on all product pages, blog posts, email footers:**

"Educational only — not medical advice. This guide is for general educational purposes and does not replace evaluation or care from your pediatrician or a qualified health professional. If you have concerns about your baby's development, consult your pediatrician."

---

## 10 — Tasks Remaining

**Website pages to build (priority order):**
- [ ] about.html — most important trust page
- [ ] 0-3-months.html — age guide product page
- [ ] 3-6-months.html — age guide product page
- [ ] 6-9-months.html — age guide product page
- [ ] 9-12-months.html — age guide product page
- [ ] bundle.html — bundle product page
- [ ] free.html — freebie opt-in page (embed MailerLite form OR link to MailerLite landing page)
- [ ] faq.html — full FAQ page with FAQPage schema
- [ ] disclaimer.html — health disclaimer
- [ ] terms.html — terms of use
- [ ] privacy.html — privacy policy
- [ ] blog.html — blog index page
- [ ] sitemap.xml — all pages listed
- [ ] robots.txt — allow all, point to sitemap

**After website is built:**
- [ ] Connect first-year-foundations.com to Google Search Console
- [ ] Submit sitemap.xml
- [ ] Set up Pinterest Business account
- [ ] Write first 2 blog posts before launch
- [ ] Create Pinterest pins for each blog post
- [ ] Have lawyer review legal pages
- [ ] Delete TESTORDER promo code in Whop
- [ ] Create product banners in Canva for Whop product pages
- [ ] Change 'By Tal' to 'First Year Foundations' in Whop account settings
- [ ] Upload final PDF guides to Whop (currently placeholders)
