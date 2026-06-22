import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPokemons } from "../services/pokemon.service";

import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import PokemonSkeleton from "../components/PokemonSkeleton";
import type { Pokemon } from "../types/pokemon";

function Home() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dynamicLimit = search ? 1300 : 20;
  const offset = search ? 0 : (page - 1) * dynamicLimit;

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", page, search],
    queryFn: () => getPokemons(dynamicLimit, offset),
  });

  const filteredPokemons = data?.results.filter(
    (pokemon: { name: string; url: string }) =>
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
          : filteredPokemons?.map((pokemon: Pokemon) => {
              const pokemonId = pokemon.url.split("/")[6];

              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

              return (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  image={image}
                />
              );
            })}
      </div>

      {!search && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-white px-4 py-2 rounded-lg shadow"
          >
            Previous
          </button>

          <span className="text-white font-bold text-xl min-w-[100px] text-center">
            Page {page}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-white px-4 py-2 rounded-lg shadow"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
