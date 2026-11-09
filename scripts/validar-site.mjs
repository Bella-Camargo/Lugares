import assert from 'node:assert/strict';
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { dirname, posix } from 'node:path';

const html = readFileSync('index.html', 'utf8');
assert.match(html, /<!doctype html>/i);
assert.match(html, /<title>\s*[^<]+<\/title>/i);
const ids = new Set(Array.from(html.matchAll(/\bid=["']([^"']+)["']/gi), m => m[1]));
let checked = 0;

function check(value, file) {
  if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return;
  if (value.startsWith('#')) {
    if (file === 'index.html') assert(ids.has(value.slice(1)), `Âncora ausente: ${value}`);
    checked++;
    return;
  }
  assert(!value.startsWith('/'), `Use caminho relativo no GitHub Pages: ${value}`);
  const target = posix.normalize(posix.join(dirname(file), decodeURIComponent(value.split(/[?#]/)[0])));
  let dir = '.';
  for (const part of target.split('/')) {
    assert(part !== '..' && readdirSync(dir).includes(part), `Referência ausente ou grafia incorreta em ${file}: ${value}`);
    dir = posix.join(dir, part);
  }
  assert(statSync(dir).isFile(), `Arquivo esperado: ${dir}`);
  checked++;
}

for (const [, value] of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']*)["']/gi)) check(value, 'index.html');
for (const name of readdirSync('css').filter(name => name.endsWith('.css'))) {
  const file = `css/${name}`;
  for (const [, value] of readFileSync(file, 'utf8').matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) check(value.trim(), file);
}
console.log(`Site validado: ${checked} referências locais verificadas.`);
