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
import { useUpdateUserMutate } from "@/hooks/useUpdateUserMutate";

interface RegisterDialogProps {
  userToEdit?: Usuarios;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
}

export function RegisterDialog({
  userToEdit,
  open,
  onOpenChange,
  onClose,
}: RegisterDialogProps) {
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateUserMutate();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateUserMutate();
  const [formData, setFormData] = useState<Omit<Usuarios, "id">>({
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nome: userToEdit.nome,
        cpf: userToEdit.cpf,
        cep: userToEdit.cep,
        logradouro: userToEdit.logradouro,
        bairro: userToEdit.bairro,
        cidade: userToEdit.cidade,
        estado: userToEdit.estado,
      });
      setIsEdit(true);
    } else {
      setFormData({
        nome: "",
        cpf: "",
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      setIsEdit(false);
    }
  }, [userToEdit]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isEdit && userToEdit?.id) {
      updateMutate(
        { id: userToEdit.id, updateData: formData },
        {
          onSuccess: () => {
            onOpenChange(false);
            if (onClose) {
              onClose();
            }
          },
        }
      );
    } else {
      createMutate(formData, {
        onSuccess: () => {
          setFormData({
            nome: "",
            cpf: "",
            cep: "",
            logradouro: "",
            bairro: "",
            cidade: "",
            estado: "",
          });
          onOpenChange(false);
          if (onClose) {
            onClose();
          }
        },
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Cadastro" : "Novo Cadastro"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Editando o cadastro do usuário"
              : "Criando um novo cadastro no sistema"}
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isCreatePending || isUpdatePending}>
              {isCreatePending || isUpdatePending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>

        {isCreatePending || isUpdatePending ? <p>Processando...</p> : null}
      </DialogContent>
    </Dialog>
  );
}

export function NewUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo Cadastro
          </Button>
        </DialogTrigger>
        <RegisterDialog open={open} onOpenChange={setOpen} />
      </Dialog>
    </>
  );
}
