interface Props {
  name: string;
  image: string;
}

const PokemonCard = ({ name, image }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition">
      <img src={image} alt={name} className="mx-auto w-24 h-24" />

      <h2 className="capitalize font-bold mt-2">{name}</h2>
    </div>
  );
};

export default PokemonCard;
