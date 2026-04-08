import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm } from './SearchForm.jsx';
import { SearchResultsPanel } from './SearchResultsPanel.jsx';

/**
 * Search feature — route `/search` with optional `?q=` (shareable, bookmarkable).
 * Static title + form chrome; results panel swaps by query string — all client-side.
 */
export function SearchArea() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();

  return (
    <section aria-labelledby="search-title">
      <SearchHeading />
      <SearchForm />
      <SearchResultsPanel query={q} />
    </section>
  );
}

const SearchHeading = memo(function SearchHeading() {
  return <h1 id="search-title">Soek</h1>;
});
