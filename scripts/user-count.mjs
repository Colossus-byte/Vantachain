/**
 * User count script — reads public Firestore collections via REST API.
 * No service account needed; uses the API key from firebase-applet-config.json.
 *
 * Public collections (allow read: if true): wallet_registrations, leaderboard
 *
 * Usage:
 *   node scripts/user-count.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local if present so the script can run without setting shell vars
const envPath = resolve(__dirname, '../.env.local');
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}

const PROJECT = process.env.VITE_FIREBASE_PROJECT_ID;
const API_KEY  = process.env.VITE_FIREBASE_API_KEY;

if (!PROJECT || !API_KEY) {
  console.error('Missing VITE_FIREBASE_PROJECT_ID or VITE_FIREBASE_API_KEY in .env.local');
  process.exit(1);
}

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

async function listCollection(name, pageSize = 300) {
  const docs = [];
  let pageToken = '';
  do {
    const url = `${BASE}/${name}?key=${API_KEY}&pageSize=${pageSize}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${err}`);
    }
    const json = await res.json();
    if (json.documents) docs.push(...json.documents);
    pageToken = json.nextPageToken ?? '';
  } while (pageToken);
  return docs;
}

function getField(doc, field) {
  const f = doc.fields?.[field];
  if (!f) return null;
  return f.stringValue ?? f.integerValue ?? f.doubleValue ?? f.booleanValue
    ?? f.timestampValue ?? null;
}

function sep(char = '─', len = 62) { return char.repeat(len); }

async function main() {
  console.log(`\n${sep()}`);
  console.log(`  Clarix Protocol — User Count Report`);
  console.log(`  Project: ${PROJECT}`);
  console.log(`  Date:    ${new Date().toISOString()}`);
  console.log(sep());

  // ── Wallet registrations ────────────────────────────────────────────────
  console.log('\n🔗  wallet_registrations\n');
  let walletDocs;
  try {
    walletDocs = await listCollection('wallet_registrations');
  } catch (e) {
    console.error('  Failed to fetch wallet_registrations:', e.message);
    walletDocs = [];
  }

  const walletTs = [];
  walletDocs.forEach(doc => {
    const address = getField(doc, 'address') ?? doc.name.split('/').pop();
    const username = getField(doc, 'username') ?? '?';
    const ts = getField(doc, 'connectedAt');
    const tsMs = ts ? new Date(ts).getTime() : null;
    if (tsMs) walletTs.push(tsMs);
    const dateStr = ts ? new Date(ts).toISOString().slice(0, 10) : '—';
    console.log(`  ${address.padEnd(44)} ${username.padEnd(16)} ${dateStr}`);
  });

  if (walletTs.length) {
    walletTs.sort((a, b) => a - b);
    console.log(`\n  Earliest: ${new Date(walletTs[0]).toISOString()}`);
    console.log(`  Latest:   ${new Date(walletTs[walletTs.length - 1]).toISOString()}`);
  }

  // ── Leaderboard (user proxy) ────────────────────────────────────────────
  console.log('\n\n🎓  leaderboard (registered users)\n');
  let lbDocs;
  try {
    lbDocs = await listCollection('leaderboard');
  } catch (e) {
    console.error('  Failed to fetch leaderboard:', e.message);
    lbDocs = [];
  }

  lbDocs.forEach(doc => {
    const uid = doc.name.split('/').pop();
    const username = getField(doc, 'username') ?? '?';
    const lessons = getField(doc, 'completedLessons') ?? 0;
    const xp = getField(doc, 'xp') ?? 0;
    console.log(`  ${uid.slice(0, 20).padEnd(22)} ${username.padEnd(18)} lessons:${String(lessons).padStart(3)}  xp:${String(xp).padStart(5)}`);
  });

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log(`\n${sep()}`);
  console.log(`  Total wallet registrations : ${walletDocs.length}`);
  console.log(`  Total leaderboard entries  : ${lbDocs.length}`);
  if (walletTs.length) {
    console.log(`  First wallet connected     : ${new Date(walletTs[0]).toISOString()}`);
    console.log(`  Last wallet connected      : ${new Date(walletTs[walletTs.length - 1]).toISOString()}`);
  }
  console.log(`${sep()}\n`);
}

main().catch(e => { console.error('\n❌ Script failed:', e.message); process.exit(1); });
