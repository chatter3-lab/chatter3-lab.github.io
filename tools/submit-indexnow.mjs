// Hands the pages of the notes to Bing, Yandex and the other engines that
// speak IndexNow.
//
// GitHub Pages submits nothing by itself, so this has to be run after every
// change to a note. It needs no account and no API key: the key file in
// the root of the site is the proof that the sender owns it.
//
//   node tools/submit-indexnow.mjs               every page
//   node tools/submit-indexnow.mjs /call-clock/  one page
//
// The answer is printed: 200 means accepted, 202 means accepted and still
// being checked, and anything else is printed with the body, because the
// body says why.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const HOST = 'chatter3-lab.github.io';
const BASE = 'https://' + HOST;

// The key is the name of the file in the root of the site.
const keyFile = readFileSync(join(ROOT, 'indexnow.key'), 'utf8').trim();

const all = [
  '/',
  '/arkweb-freeze/',
  '/camera-permission/',
  '/durable-object-peer-loss/',
  '/route-order/',
  '/peer-not-joined/',
  '/call-clock/',
  '/data/',
  '/zh/',
];

const wanted = process.argv.slice(2);
const paths = wanted.length ? wanted : all;

const urls = paths.map((p) => (p.startsWith('http') ? p : BASE + (p.startsWith('/') ? p : '/' + p)));

const res = await fetch('https://api.indexnow.org/indexnow?host=' + encodeURIComponent(HOST) + '&key=' + keyFile, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ host: HOST, key: keyFile, urlList: urls }),
});
const text = await res.text();
console.log(urls.length + ' url(s) ->', res.status, text.slice(0, 300).trim());
if (res.status >= 300) process.exitCode = 1;
