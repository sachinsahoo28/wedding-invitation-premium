import { createContext, useContext } from 'react';

const WeddingContext = createContext(null);

/** `value`: { config, via } — via is how the client was resolved (path/query/build/default). */
export function WeddingProvider({ value, children }) {
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

/** The active client's merged configuration. */
export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error('useWedding must be used inside <WeddingProvider>.');
  return ctx.config;
}

/** Headings and labels for one section (defaults merged with client overrides). */
export function useText(section) {
  return useWedding().text[section];
}

/** The ?client= value to keep in shared links when the client came from the query string. */
export function useClientQuery() {
  const ctx = useContext(WeddingContext);
  return ctx?.via === 'query' ? ctx.config.slug : '';
}

/** Couple display helpers used across sections. */
export function useCouple() {
  const { couple } = useWedding();
  return {
    groom: couple.groom,
    bride: couple.bride,
    names: `${couple.groom.firstName} & ${couple.bride.firstName}`,
  };
}
