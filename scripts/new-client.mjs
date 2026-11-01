/**
 * Scaffold a new client.
 *
 *   npm run new-client -- <slug>
 *
 * Creates src/data/clients/<slug>.js from the template and the media
 * folders public/weddings/<slug>/{photos,video,audio}.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new-client -- <slug>   (lowercase letters, numbers and hyphens, e.g. priya-arjun)');
  process.exit(1);
}

const file = `src/data/clients/${slug}.js`;
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const template = readFileSync('src/data/clients/_template.js', 'utf8')
  .replace(/'REPLACE_ME-slug'/g, `'${slug}'`)
  .replace(/<clientId>/g, slug)
  .replace(/\/\*\*[\s\S]*?\*\/\n/, `/**\n * Client: ${slug}\n * Replace every REPLACE_ME value — the site won't render until you do.\n */\n`);
writeFileSync(file, template);

for (const dir of ['photos', 'video', 'audio']) {
  mkdirSync(`public/weddings/${slug}/${dir}`, { recursive: true });
  writeFileSync(`public/weddings/${slug}/${dir}/.gitkeep`, '');
}

console.log(`Created ${file}
Created public/weddings/${slug}/{photos,video,audio}/

Next:
  1. Fill in ${file} (replace every REPLACE_ME).
  2. Add photos, video and music under public/weddings/${slug}/.
  3. Preview: npm run dev → http://localhost:5173/${slug}/`);
