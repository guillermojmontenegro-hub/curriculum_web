// Verifica rutas públicas y contenido básico sin modificar archivos.
// Ejecutar con el servidor iniciado: node scripts/check-site.mjs [URL base].
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:3100';
const checks = [
  ['/', 'El oficio de'],
  ['/?lang=en', 'The craft of'],
  ['/articulos', 'text/html'],
  ['/consultoria', 'text/html'],
  ['/assets/guillermo-montenegro-cv-es.pdf', 'application/pdf'],
  ['/assets/guillermo-montenegro-cv-en.pdf', 'application/pdf'],
  ['/assets/guillermo-montenegro.jpg', 'image/jpeg'],
];
await Promise.all(checks.map(async ([path, expected]) => {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  if (expected.includes('/')) assert.ok(response.headers.get('content-type')?.includes(expected), path);
  else {
    const html = await response.text();
    assert.ok(html.includes(expected), `${path}: translated heading`);
    assert.ok(html.includes('AIDZero'), `${path}: project`);
    assert.ok(html.includes('Power Automate'), `${path}: updated expertise`);
    const article = html.match(/href="(\/articulos\/[^"?]+)(?:\?[^" ]*)?"/);
    assert.ok(article, `${path}: article link`);
    assert.equal((await fetch(base + article[1])).status, 200, 'article detail');
  }
  console.log(`OK ${path}`);
}));
