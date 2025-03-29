import { SearchBarProps } from "@/utlis/SearchBarProps";
import { Input } from "../ui/input";

export function SearchBar({ setSearch }: SearchBarProps) {
  return (
    <form className="flex items-center gap-2">
      <Input
        name="search"
        placeholder="Pesquise pelos campos"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}