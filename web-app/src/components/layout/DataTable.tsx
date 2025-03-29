import { useQuery } from "@tanstack/react-query";
import { findListUsers } from "../../service/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTableProps } from "@/utlis/DataTableProps";
import { Button } from "../ui/button";
import { useState } from "react";
import { RegisterDialog } from "./RegisterDialog";

export function DataTable({ search }: DataTableProps) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["itens"],
    queryFn: findListUsers,
  });

  const sortedData = data ? [...data].sort((a, b) => b.id - a.id) : [];

  const filteredData = sortedData.filter((user: any) =>
    Object.values(user).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value.toString().toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  );

  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (user: any) => {
    setUserToEdit(user);
    setIsEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setUserToEdit(null);
    setIsEditDialogOpen(false);
    refetch();
  };

  if (isLoading) return <p>Carrengando...</p>;
  if (error) return <p>Erro ao carregar os dados</p>;

  return (
    <div className="border rounded-lg p-4">
      <RegisterDialog
        userToEdit={userToEdit}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onClose={handleDialogClose}
      />
      <Table>
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead>Logradouro</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>{user.cep}</TableCell>
                <TableCell>{user.logradouro}</TableCell>
                <TableCell>{user.bairro}</TableCell>
                <TableCell>{user.cidade}</TableCell>
                <TableCell>{user.estado}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEditClick(user)}>
                      Editar
                    </Button>
                    {/* <Button
                      onClick={() => handleDelete(user.id)}
                    >
                      Deletar
                    </Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
