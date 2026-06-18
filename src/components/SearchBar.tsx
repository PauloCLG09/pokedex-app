import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { searchSchema, type SearchFormData } from "../schemas/search.schema";

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const { register, watch } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");

  onSearch(searchValue);

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        {...register("search")}
        className="w-full max-w-md p-4 rounded-xl border-none shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
      />
    </div>
  );
};

export default SearchBar;
