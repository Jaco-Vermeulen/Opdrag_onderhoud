import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('renders search shell without full navigation', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Pokémon Spanbouer/i)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Soek');
    expect(screen.getByTestId('search-results-empty')).toBeTruthy();
  });

  it('reflects committed search in URL via client-side params', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    const main = screen.getByRole('main');
    await user.type(within(main).getByLabelText('Soekterm'), 'pika');
    await user.click(within(main).getByRole('button', { name: /^Soek$/i }));
    expect(screen.getByTestId('search-results-active')).toBeTruthy();
    expect(screen.getByText(/pika/i)).toBeTruthy();
  });

  it('pre-hydrates results panel from ?q= in the URL', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=eevee']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-results-active')).toBeTruthy();
    expect(screen.getByText(/eevee/i)).toBeTruthy();
  });
});
