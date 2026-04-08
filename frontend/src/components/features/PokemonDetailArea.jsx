import { useParams } from 'react-router-dom';

/**
 * Detail + evolution feature — root for `/pokemon/:pokeapiId`.
 * Compose e.g. `Sprite`, `StatsTable`, `EvolutionTree`, `OwnershipBadges` as child components.
 */
export function PokemonDetailArea() {
  const { pokeapiId } = useParams();
  return (
    <section aria-labelledby="detail-title">
      <h1 id="detail-title">Pokémon #{pokeapiId}</h1>
      <p>Stub — implement detail and evolution views from smaller components.</p>
    </section>
  );
}
