#!/usr/bin/env node
// IndexNow notifier for en-spartamax.vercel.app
// Usage (after each deployment):  node scripts/indexnow.mjs        -> submits new/changed/removed sitemap URLs
//                                 node scripts/indexnow.mjs --all  -> submits every sitemap URL
// Keeps a content-hash state file so unchanged URLs are never re-submitted.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const HOST = 'en-spartamax.vercel.app';
const ORIGIN = `https://${HOST}`;
const KEY = readFileSync(new URL('../key.txt', import.meta.url), 'utf8').trim();
const KEY_LOCATION = `${ORIGIN}/key.txt`;
const STATE = new URL('../.indexnow-state.json', import.meta.url);
const ALL = process.argv.includes('--all');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) { const r = await fetch(url, { redirect: 'manual' }); return { status: r.status, text: await r.text() }; }

const live = await get(`${KEY_LOCATION}`);
if (live.status !== 200 || live.text.trim() !== KEY) { console.error('Key file not live or mismatched:', live.status); process.exit(1); }

const sm = await get(`${ORIGIN}/sitemap.xml`);
const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(ORIGIN + '/'));
const prev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const next = {}; const changed = [];
for (const u of urls) {
  const page = await get(u);
  if (page.status !== 200) { console.warn('skip (status ' + page.status + '):', u); continue; }
  const h = createHash('sha256').update(page.text).digest('hex');
  next[u] = h;
  if (ALL || prev[u] !== h) changed.push(u);
}
const removed = Object.keys(prev).filter((u) => !(u in next));
const list = [...changed, ...removed];
if (!list.length) { console.log('No new, changed or removed URLs. Nothing submitted.'); process.exit(0); }

for (let attempt = 1; attempt <= 3; attempt++) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: list.slice(0, 10000) })
  });
  console.log(`IndexNow response: HTTP ${res.status} for ${list.length} URL(s)`);
  if (res.status === 200 || res.status === 202) { writeFileSync(STATE, JSON.stringify(next, null, 1)); console.log('Accepted (accepted is not the same as indexed).'); process.exit(0); }
  if (res.status === 400 || res.status === 403 || res.status === 422) { console.error('Rejected:', await res.text()); process.exit(1); }
  await sleep(attempt * 5000);
}
process.exit(1);
