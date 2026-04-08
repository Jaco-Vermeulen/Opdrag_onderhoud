import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { LoginArea } from './components/features/LoginArea.jsx';
import { RegisterArea } from './components/features/RegisterArea.jsx';
import { SearchArea } from './components/features/search/SearchArea.jsx';
import { PokemonDetailArea } from './components/features/PokemonDetailArea.jsx';
import { BackpackArea } from './components/features/BackpackArea.jsx';
import { TeamArea } from './components/features/TeamArea.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/login" element={<LoginArea />} />
        <Route path="/register" element={<RegisterArea />} />
        <Route path="/search" element={<SearchArea />} />
        <Route path="/pokemon/:pokeapiId" element={<PokemonDetailArea />} />
        <Route path="/backpack" element={<BackpackArea />} />
        <Route path="/team" element={<TeamArea />} />
      </Route>
    </Routes>
  );
}
