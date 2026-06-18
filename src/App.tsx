import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPokemons } from "./services/pokemon.service";

import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import PokemonSkeleton from "./components/PokemonSkeleton";

function App() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  const filteredPokemons = data?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 via-yellow-300 to-blue-500 p-6">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
        Pokédex
      </h1>

      <SearchBar onSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PokemonSkeleton key={index} />
            ))
          : filteredPokemons?.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                index={index}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
