const PokemonSkeleton = () => {
  return (
    <div className="bg-white/80 rounded-2xl shadow-xl p-5 animate-pulse">
      <div className="bg-gray-300 w-28 h-28 rounded-full mx-auto"></div>

      <div className="bg-gray-300 h-4 rounded mt-4"></div>

      <div className="bg-gray-300 h-4 rounded mt-2 w-1/2 mx-auto"></div>
    </div>
  );
};

export default PokemonSkeleton;
