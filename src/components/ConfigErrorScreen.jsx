/**
 * Shown when a client config fails validation. Developers see every error;
 * guests on a production site see a polite message instead.
 */
export default function ConfigErrorScreen({ errors, slug }) {
  if (!import.meta.env.DEV) {
    return (
      <main className="config-error">
        <p className="eyebrow">Wedding invitation</p>
        <h1>This invitation isn’t available right now.</h1>
        <p>Please check the link you received, or try again a little later.</p>
      </main>
    );
  }
  return (
    <main className="config-error dev" role="alert">
      <p className="eyebrow">Config error{slug ? ` · ${slug}` : ''}</p>
      <h1>This client config needs fixing</h1>
      <p>
        Edit <code>src/data/clients/{slug || '<slug>'}.js</code>. The invitation renders once these are resolved:
      </p>
      <ul>
        {errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </main>
  );
}
