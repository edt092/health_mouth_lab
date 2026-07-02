// Auditoría/fix puntual: el modelo a veces excede el límite de 160 caracteres en
// seo.description a pesar de la instrucción en el prompt. Este script detecta y
// trunca de forma segura (a nivel de palabra) cualquier descripción que rompa el
// schema de Content Collections, sin tener que regenerar el artículo completo.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'src', 'content', 'articles');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function truncateToWord(str, max) {
  if (str.length <= max) return str;
  const cut = str.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '.';
}

const files = walk(ROOT).filter((f) => f.endsWith('.md'));
let fixed = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const match = content.match(/^ {2}description: (".*")$/m);
  if (!match) continue;

  const current = JSON.parse(match[1]);
  if (current.length <= 160) continue;

  const truncated = truncateToWord(current, 160);
  const newLine = `  description: ${JSON.stringify(truncated)}`;
  const updated = content.replace(match[0], newLine);
  writeFileSync(file, updated, 'utf-8');
  fixed += 1;
  console.log(`[FIXED ${current.length} -> ${truncated.length}] ${file}`);
}

console.log(`\nTotal corregidos: ${fixed}`);
