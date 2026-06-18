interface Props {
  name: string;
  index: number;
}

const PokemonCard = ({ name, index }: Props) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-5 text-center hover:scale-105 hover:shadow-2xl transition duration-300 border border-white/30">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`}
        alt={name}
        className="mx-auto w-28 h-28"
      />

      <p className="text-gray-500 text-sm">
        #{String(index + 1).padStart(3, "0")}
      </p>

      <h2 className="capitalize font-bold text-xl mt-2">{name}</h2>
    </div>
  );
};

export default PokemonCard;
