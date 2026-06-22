import type { PokemonResponse } from "../types/pokemon";

export const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<PokemonResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );

  return response.json();
};

export const getPokemonByName = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  return response.json();
};
