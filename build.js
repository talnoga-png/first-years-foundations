#!/usr/bin/env node
/**
 * FYF static site builder
 * Usage: node build.js
 *
 * Reads every *.src.html file in the current directory,
 * replaces {{NAV}} and {{FOOTER}} with the shared partials,
 * and writes the output as the matching .html file.
 *
 * Also sets the correct `data-page` on <body> so CSS can
 * apply the active nav indicator without any per-page logic.
 */

const fs   = require('fs');
const path = require('path');

const nav    = fs.readFileSync('_nav.html',    'utf8');
const footer = fs.readFileSync('_footer.html', 'utf8');

// Map from output filename → data-page value (matches data-nav on <a> tags)
const PAGE_IDS = {
  'index.html':       'home',
  '0-3-months.html':  '0-3',
  '3-6-months.html':  '3-6',
  '6-9-months.html':  '6-9',
  '9-12-months.html': '9-12',
  'about.html':       'about',
  'free.html':        'free',
  'bundle.html':      'bundle',
  'faq.html':         'faq',
  'blog.html':        'blog',
  'disclaimer.html':  'disclaimer',
  'terms.html':       'terms',
  'privacy.html':     'privacy',
  'blog-tummy-time.html': 'blog-tummy-time',
  'blog-rolling.html':    'blog-rolling',
};

const srcFiles = fs.readdirSync('.').filter(f => f.endsWith('.src.html'));

if (srcFiles.length === 0) {
  console.log('No *.src.html files found. Nothing to build.');
  console.log('Rename your page files to e.g. index.src.html, then run this script.');
  process.exit(0);
}

srcFiles.forEach(src => {
  const out     = src.replace('.src.html', '.html');
  const pageId  = PAGE_IDS[out] || 'unknown';
  let   content = fs.readFileSync(src, 'utf8');

  // Inject partials
  content = content.replace(/\{\{NAV\}\}/g,    nav);
  content = content.replace(/\{\{FOOTER\}\}/g, footer);

  // Set data-page on <body> for CSS active-nav targeting
  content = content.replace(/<body([^>]*)>/, (match, attrs) => {
    // Remove any existing data-page, then add the correct one
    const cleaned = attrs.replace(/\s*data-page="[^"]*"/, '');
    return `<body${cleaned} data-page="${pageId}">`;
  });

  fs.writeFileSync(out, content, 'utf8');
  console.log(`Built: ${src} → ${out}  (data-page="${pageId}")`);
});

console.log('\nDone. Commit the .html files to GitHub.');
