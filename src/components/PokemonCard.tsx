import { Link } from "react-router-dom";

interface Props {
  name: string;
  image: string;
}

const PokemonCard = ({ name, image }: Props) => {
  return (
    <Link to={`/pokemon/${name}`}>
      <div className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition cursor-pointer">
        <img src={image} alt={name} className="mx-auto w-24 h-24" />

        <h2 className="capitalize font-bold mt-2">{name}</h2>
      </div>
    </Link>
  );
};

export default PokemonCard;
