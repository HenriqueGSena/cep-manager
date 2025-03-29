import { useQuery } from "@tanstack/react-query";
import { findListUsers } from '../../service/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function DataTable() {
  const { data, isLoading, error } = useQuery ({
    queryKey: ['itens'],
    queryFn: findListUsers,
  });

  if (isLoading) return <p>Carrengando...</p>;
  if (error) return <p>Erro ao carregar os dados</p>;

  const sortedData = data ? [...data].sort((a, b) => b.id - a.id) : [];

  return (
    <div className="border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>Cpf</TableHead>
          <TableHead>Cep</TableHead>
          <TableHead>Logradouro</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
        </TableHeader>
        <TableBody>
          {sortedData?.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.cep}</TableCell>
                <TableCell>{item.logradouro}</TableCell>
                <TableCell>{item.bairro}</TableCell>
                <TableCell>{item.cidade}</TableCell>
                <TableCell>{item.estado}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
