# Launch Configuration Guide

## Overview

First Year Foundations is a static HTML site hosted on GitHub Pages with a custom domain (first-year-foundations.com). This guide covers configuration from code to live.

---

## Pre-Launch Checklist

- [ ] All 15 HTML pages built and tested
- [ ] GA4 account created, Measurement ID integrated (G-PYRBFC16BM already in code)
- [ ] Pediatrician review completed — medical claims approved
- [ ] Lawyer review completed — legal pages approved
- [ ] Whop products created with correct pricing and download links:
  - [ ] 0-3 Month Guide ($14.99) — https://whop.com/joined/first-year-foundations/products/0-3-month-developmental-guide/
  - [ ] 3-6 Month Guide ($14.99) — https://whop.com/joined/first-year-foundations/products/3-6-month-developmental-guide/
  - [ ] 6-9 Month Guide ($14.99) — https://whop.com/joined/first-year-foundations/products/6-9-month-developmental-guide/
  - [ ] 9-12 Month Guide ($14.99) — https://whop.com/joined/first-year-foundations/products/9-12-month-developmental-guide/
  - [ ] Bundle ($39.99) — https://whop.com/joined/first-year-foundations/products/complete-first-year-bundle/
  - [ ] Free Guide email capture (via MailerLite) — https://first-years-foundations-ndpk6k.subscribepage.io
- [ ] MailerLite email sequence set up for free guide delivery
- [ ] Zapier automation configured: Whop purchase → MailerLite Buyers group
- [ ] TESTORDER promo code deleted from Whop
- [ ] All images optimized and placed in `images/` folder (logo.png, etc.)

---

## GitHub Repository Setup

### 1. Create GitHub Repository

```bash
# If not already a git repo
git init

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/first-years-foundations.git

# Push initial commit
git add .
git commit -m "initial: First Year Foundations website"
git push -u origin master
```

### 2. Enable GitHub Pages

**In GitHub UI:**
1. Go to repository **Settings** → **Pages**
2. Under "Source", select:
   - Branch: `master`
   - Folder: `/ (root)`
3. Click **Save**
4. GitHub will provide a URL: `https://YOUR_USERNAME.github.io/first-years-foundations/` (temporary)

### 3. Add `CNAME` File for Custom Domain

Create a file named `CNAME` (no extension) in the repository root:

```
first-year-foundations.com
```

Push this file:
```bash
git add CNAME
git commit -m "chore: add custom domain CNAME"
git push
```

GitHub will detect this and update Pages settings automatically.

---

## Domain & DNS Configuration

### 1. Point Domain to GitHub Pages

**If you manage DNS yourself:**

Update DNS records for `first-year-foundations.com`:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | YOUR_USERNAME.github.io |

**If using a domain registrar (GoDaddy, Namecheap, etc.):**
- Update nameservers to point to GitHub Pages, or
- Add DNS A and AAAA records as above

### 2. Verify Domain in GitHub

**In GitHub UI:**
1. **Settings** → **Pages**
2. Under "Custom domain", verify it shows: `first-year-foundations.com`
3. Wait for DNS to propagate (can take 24 hours)
4. Check the **Enforce HTTPS** checkbox once DNS propagates

---

## SSL/HTTPS Certificate

GitHub Pages provides **free automatic HTTPS** via Let's Encrypt once the domain is configured.

- [ ] DNS propagation complete (typically 24–48 hours)
- [ ] HTTPS working at https://first-year-foundations.com
- [ ] "Enforce HTTPS" enabled in Pages settings
- [ ] All internal links use relative URLs (already done)
- [ ] All external links (Whop, MailerLite) use https://

---

## Pre-Launch Testing

### 1. Local Testing

Before pushing to production:

```bash
# Open in a local browser (from repo root)
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (if installed)
npx http-server
```

Visit `http://localhost:8000` and test:
- [ ] All pages load
- [ ] Navigation works
- [ ] Links to Whop/MailerLite work
- [ ] GA4 tracking fires (check browser DevTools → Network tab for gtag requests)
- [ ] Mobile responsiveness at 390px width
- [ ] Footer appears on all pages

### 2. Post-Deploy Testing (Live)

After deploying to GitHub Pages:

- [ ] Visit https://first-year-foundations.com and all subpages load
- [ ] `sitemap.xml` accessible at https://first-year-foundations.com/sitemap.xml
- [ ] `robots.txt` accessible at https://first-year-foundations.com/robots.txt
- [ ] GA4 events showing in real time (GA4 Dashboard → Real Time)
- [ ] Whop links open product pages without errors
- [ ] MailerLite free guide link works
- [ ] Form submission doesn't error

### 3. SEO Verification

- [ ] Google Search Console setup:
  1. Add property for `https://first-year-foundations.com`
  2. Verify via CNAME or HTML file upload
  3. Submit sitemap at `https://first-year-foundations.com/sitemap.xml`
- [ ] Bing Webmaster Tools (optional but recommended)
- [ ] robots.txt accessible and correct

---

## Post-Launch Monitoring

### GA4 Setup Verification

1. **Real-Time Events** — Visit site, check GA4 Dashboard → Real Time to confirm page_view events
2. **Custom Events** — Click a Whop link, verify guide_purchase_click event appears in GA4 Real Time
3. **Check Data Collection Warning** — Any "Data collection isn't active" warnings should resolve within 24 hours

### Email Automation Testing

- [ ] Sign up for free guide via MailerLite landing page
- [ ] Verify welcome email arrives with PDF download link
- [ ] Purchase a guide via Whop
- [ ] Verify purchase confirmation from Whop
- [ ] Verify Zapier added purchaser to MailerLite "Buyers" group (if configured)

### Ongoing Monitoring

**Weekly:**
- [ ] GA4: Check traffic trends, page views, conversion events
- [ ] Email: Ensure MailerLite sequences are sending properly
- [ ] Whop: Check for new orders, successful fulfillment

**Monthly:**
- [ ] Check Google Search Console for crawl errors, mobile usability issues
- [ ] Review GA4 for traffic patterns, user behavior, drop-off points
- [ ] Monitor uptime (GitHub Pages is highly reliable, but check status.github.com)

---

## Rollback Plan

If critical issues arise post-launch:

```bash
# Revert to previous commit
git log --oneline  # Find the good commit hash
git revert <commit-hash>
git push

# Or reset to previous version
git reset --hard <commit-hash>
git push --force
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Domain not resolving** | DNS changes can take 24–48 hours. Check propagation at whatsmydns.net |
| **HTTPS not working** | Wait for Let's Encrypt to issue cert (can take 30 mins after DNS propagation) |
| **GA4 not tracking** | Check browser console for errors. Verify Measurement ID is correct in all pages (G-PYRBFC16BM). |
| **Whop links broken** | Verify Whop product URLs are correct and products are published. |
| **MailerLite form not working** | Verify landing page URL is correct and form is enabled in MailerLite. |
| **Images not loading** | Ensure `images/` folder is committed to git and paths are relative (e.g., `images/logo.png`). |

---

## Launch Day Checklist

**Morning of Launch:**
- [ ] All code committed and pushed to master
- [ ] GitHub Pages deployment successful (check Actions tab for green ✓)
- [ ] HTTPS working, no cert warnings
- [ ] Site loads at https://first-year-foundations.com
- [ ] All pages render correctly
- [ ] GA4 tracking active (real-time events visible)
- [ ] Whop & MailerLite links functional
- [ ] Brief manual smoke test on mobile

**Launch Confirmation:**
- [ ] Domain pointing correctly
- [ ] No 404 errors on any page
- [ ] All CTAs clickable
- [ ] Ready to announce

---

## Next Steps After Launch

1. **Day 1–7:** Monitor GA4 real-time for traffic, errors, user behavior
2. **Week 1:** Submit sitemap to Google Search Console, monitor crawl stats
3. **Week 2:** Review GA4 for any drop-off issues, user feedback
4. **Month 1:** Full GA4 report, email engagement analysis, user feedback synthesis
5. **Ongoing:** Monthly monitoring, quarterly content audits, annual legal review

