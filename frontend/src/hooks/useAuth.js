/**
 * Minimal auth readout; extend with context if you centralise login state.
 */
export function useAuth() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    token,
    isAuthenticated: Boolean(token),
  };
}
