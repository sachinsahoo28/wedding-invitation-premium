/**
 * Build one client's invitation as a standalone site.
 *
 *   npm run build:client -- <slug>
 *
 * Only that client's config and media end up in dist/, and the site root
 * renders that client regardless of the URL.
 */
import { existsSync } from 'node:fs';
import { build } from 'vite';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run build:client -- <slug>');
  process.exit(1);
}
if (!existsSync(`src/data/clients/${slug}.js`)) {
  console.error(`No client config at src/data/clients/${slug}.js`);
  process.exit(1);
}

process.env.VITE_CLIENT = slug;
await build();
await import('./postbuild.mjs');
