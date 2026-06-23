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
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-300 to-blue-600 p-6">
      <div className="max-w-6xl mx-auto">
        <section className="text-center mb-10">
          <span className="inline-block bg-white/90 text-red-500 font-bold px-4 py-2 rounded-full shadow mb-4">
            PokeAPI Explorer
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Pokédex
          </h1>

          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Explora Pokémon, busca por nombre, revisa detalles y navega entre
            páginas.
          </p>
        </section>

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
              className="bg-white/90 px-5 py-3 rounded-xl shadow font-bold hover:bg-white transition disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="bg-white/90 px-5 py-3 rounded-xl shadow font-bold text-gray-800">
              Page {page}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-white/90 px-5 py-3 rounded-xl shadow font-bold hover:bg-white transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
