import { SearchBar } from "./components/layout/SearchBar";
import { RegisterDialog } from "./components/layout/RegisterDialog";
import { DataTable } from "./components/layout/DataTable";
import { useState } from "react";
import { Button } from "./components/ui/button";

export function App() {
  const [search, setSearch] = useState("");
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 mt-10">
      <h1 className="text-3xl font-bold">Registro de Clientes</h1>

      <div className="flex items-center justify-between gap-3">
        <SearchBar setSearch={setSearch} />
        <RegisterDialog
          open={isNewUserDialogOpen}
          onOpenChange={setIsNewUserDialogOpen}
        />
        <Button onClick={() => setIsNewUserDialogOpen(true)}>
          Novo Cadastro
        </Button>
      </div>

      <DataTable search={search} />
    </div>
  );
}
