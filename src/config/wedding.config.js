/**
 * Platform settings: how the engine picks which client to render.
 * Client data itself lives in src/data/clients/<slug>.js.
 */
export const platformConfig = {
  // Shown at the site root and when the URL names an unknown client.
  defaultClient: 'aarav-meera',

  // Where to look for the client slug, in order:
  //   'path'  → https://site/<slug>/
  //   'query' → https://site/?client=<slug>
  // A build made with `npm run build:client -- <slug>` ignores both and
  // always renders that one client.
  resolveFrom: ['path', 'query'],
};
