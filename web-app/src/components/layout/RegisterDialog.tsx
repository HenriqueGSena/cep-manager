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

export function RegisterDialog() {
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

          <form className="space-y-6">
            <div className="grid grid-cols-5 items-center text-right gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input className="col-span-3" id="name" />
            </div>

            <div className="grid grid-cols-5 items-center text-right gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input className="col-span-3" id="name" />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
