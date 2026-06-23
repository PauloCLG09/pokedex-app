import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  name: string;
  image: string;
}

function PokemonCard({ name, image }: Props) {
  return (
    <Link to={`/pokemon/${name}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ duration: 0.3 }}
        className="group bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transition border border-white/40"
      >
        <div className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <img src={image} alt={name} className="w-24 h-24 object-contain" />
        </div>

        <h2 className="capitalize text-2xl font-extrabold text-center text-gray-800">
          {name}
        </h2>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Click to view details
        </p>
      </motion.article>
    </Link>
  );
}

export default PokemonCard;