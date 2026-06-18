import type { PokemonResponse } from "../types/pokemon";

export const getPokemons = async (): Promise<PokemonResponse> => {
  // delay artificial para ver skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  if (!response.ok) {
    throw new Error("Error fetching pokemons");
  }

  return response.json();
};