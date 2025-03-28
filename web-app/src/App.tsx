import { SearchBar } from "./components/layout/SearchBar";
import { RegisterDialog } from "./components/layout/RegisterDialog";
import { DataTable } from "./components/layout/DataTable";

export function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 mt-10">
      <h1 className="text-3xl font-bold">Registro de Clientes</h1>

      <div className="flex items-center justify-between gap-3">
        <SearchBar />
        <RegisterDialog />
      </div>

      <DataTable />
    </div>
  );
}
