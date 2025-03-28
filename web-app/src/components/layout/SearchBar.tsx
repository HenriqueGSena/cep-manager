import { Input } from "../ui/input";

export function SearchBar() {
    return (
      <form className="flex items-center gap-2">
        <Input name="id" placeholder="Pesquise os dados aqui"></Input>
      </form>
    );
}