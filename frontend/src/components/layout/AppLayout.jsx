import { memo } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

/**
 * SPA shell: static chrome does not remount on route changes; only `<Outlet />` updates.
 */
export function AppLayout() {
  return (
    <>
      <StaticChrome />
      <main>
        <Outlet />
      </main>
    </>
  );
}

/** Header + nav — memoised so navigations that only swap the outlet skip re-rendering this subtree. */
const StaticChrome = memo(function StaticChrome() {
  return (
    <header
      style={{
        background: '#1a1a2e',
        color: '#fff',
        padding: '0.75rem 1.25rem',
      }}
    >
      <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <strong>Pokémon Spanbouer</strong>
        <NavLink to="/search" style={navStyle}>
          Soek
        </NavLink>
        <NavLink to="/backpack" style={navStyle}>
          Rugsak
        </NavLink>
        <NavLink to="/team" style={navStyle}>
          Span
        </NavLink>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          <NavLink to="/login" style={navStyle}>
            Meld aan
          </NavLink>
          <NavLink to="/register" style={navStyle}>
            Registreer
          </NavLink>
        </span>
      </nav>
    </header>
  );
});

function navStyle({ isActive }) {
  return {
    color: '#dbe4ff',
    textDecoration: 'none',
    fontWeight: isActive ? 700 : 400,
  };
}
