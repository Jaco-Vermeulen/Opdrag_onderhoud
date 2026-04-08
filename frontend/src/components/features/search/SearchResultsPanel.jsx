import { memo } from 'react';

/**
 * Result list region — driven only by `query` from the URL.
 * Implement: fetch via API, loading/error/empty states, links to `/pokemon/:id`.
 */
export const SearchResultsPanel = memo(function SearchResultsPanel({ query }) {
  if (!query) {
    return (
      <p data-testid="search-results-empty" style={{ color: '#666' }}>
        Voer ’n soekterm in en druk Soek — die resultate verskyn hier sonder dat die bladsy herlaai.
      </p>
    );
  }

  return (
    <div data-testid="search-results-active" aria-live="polite">
      <h2 className="sr-only">Resultate</h2>
      <p>
        Stub: resultate vir <strong>{query}</strong> (koppel backend-soektog; URL bly die bron van waarheid vir
        <code> ?q=</code>).
      </p>
    </div>
  );
});
