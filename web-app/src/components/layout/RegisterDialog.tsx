import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateUserMutate } from "@/hooks/useCreateUserMutate";
import { useEffect, useState } from "react";
import { Usuarios } from "@/utlis/Ususarios";
import { useFindAddress } from "@/hooks/useFindAddress";

export function RegisterDialog() {
  const { mutate, isPending, isSuccess, isError } = useCreateUserMutate();
  const [formData, setFormData] = useState<Omit<Usuarios, "id">>({
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const { data: addressData } = useFindAddress(formData.cep);

  useEffect(() => {
    if (addressData?.data) {
      setFormData((prev) => ({
        ...prev,
        logradouro: addressData.data.logradouro || "",
        bairro: addressData.data.bairro || "",
        cidade: addressData.data.localidade || "",
        estado: addressData.data.uf || "",
      }));
    }
  }, [addressData]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    mutate(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo Cadastro
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Cadastro</DialogTitle>
          <DialogDescription>
            Criando um novo cadastro no sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((field) => (
            <div
              key={field}
              className="grid grid-cols-5 items-center text-right gap-3"
            >
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                className="col-span-3"
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                disabled={
                  ["logradouro", "bairro", "cidade", "estado"].includes(
                    field
                  ) && formData.cep.length === 8
                }
              />
            </div>
          ))}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>

        {isSuccess && (
          <p className="text-green-500">Usuário criado com sucesso!</p>
        )}
        {isError && <p className="text-red-500">Erro ao criar o usuário.</p>}
      </DialogContent>
    </Dialog>
  );
}
