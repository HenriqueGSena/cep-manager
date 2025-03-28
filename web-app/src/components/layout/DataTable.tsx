import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function DataTable() {
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
          {Array.from({ length: 15 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
                <TableCell>oi</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
