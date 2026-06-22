import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPokemonByName } from "../services/pokemon.service";

function PokemonDetail() {
  const { name } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name!),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="mx-auto w-40 h-40"
        />

        <h1 className="text-4xl font-bold capitalize mt-4">{data.name}</h1>

        <p className="mt-4 text-gray-600">Height: {data.height}</p>

        <p className="text-gray-600">Weight: {data.weight}</p>

        <div className="mt-4">
          <h2 className="font-bold text-xl mb-2">Types</h2>

          <div className="flex justify-center gap-2">
            {data.types.map((type: { type: { name: string } }) => (
              <span
                key={type.type.name}
                className="bg-yellow-300 px-3 py-1 rounded-full"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;