"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { PlusCircle, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Provider } from "./page";

export type ProviderWithContactName = Provider & { contactName: string };

interface ProviderTableProps {
  providers: ProviderWithContactName[];
}

export default function ProviderTable({ providers }: ProviderTableProps) {
  const router = useRouter();
  const form = useForm<Provider>();

  const onCreateSubmit: SubmitHandler<Provider> = async (data) => {
    const res = await fetch("http://localhost:3333/provider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        id: undefined, // Unset the id because the backend won't have it
      }),
    });

    if (res.ok) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const onUpdateSubmit: SubmitHandler<Provider> = async (data) => {
    const res = await fetch(`http://localhost:3333/provider/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        id: undefined, // Unset the id because the backend won't have it
      }),
    });
    if (res.ok) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Fornecedores</h1>
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => form.reset()}>
              <PlusCircle className="w-4 h-4 mr-2" /> Novo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Fornecedor</DialogTitle>
              <DialogDescription>Adicionar novo fornecedor</DialogDescription>
            </DialogHeader>
            <form
              action=""
              onSubmit={form.handleSubmit(onCreateSubmit)}
              className="space-y-6"
              {...form}
            >
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  className="col-span-3"
                  id="cnpj"
                  {...form.register("cnpj")}
                />
                <Label htmlFor="contactId">ID Contato</Label>
                <Input
                  className="col-span-3"
                  id="contactId"
                  {...form.register("contactId", { valueAsNumber: true })}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Salvar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-row space-x-4">
              <div>
                <DialogTitle>Fornecedores</DialogTitle>
                <DialogDescription>Editar fornecedor</DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => console.log("delet")}
                >
                  <TrashIcon className="w-4 h-4 mr-2" /> Remover
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          <form
            action=""
            onSubmit={form.handleSubmit(onUpdateSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                className="col-span-3"
                id="cnpj"
                {...form.register("cnpj")}
              />
              <Label htmlFor="contactId">ID Contato</Label>
              <Input
                className="col-span-3"
                id="contactId"
                {...form.register("contactId", { valueAsNumber: true })}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Nome Contato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <DialogTrigger asChild key={provider.id}>
                  <TableRow
                    key={provider.id}
                    onClick={() => {
                      form.setValue("id", provider.id);
                      form.setValue("cnpj", provider.cnpj);
                      form.setValue("contactId", provider.contactId);
                    }}
                  >
                    <TableCell>{provider.id}</TableCell>
                    <TableCell>{provider.cnpj}</TableCell>
                    <TableCell>{provider.contactName}</TableCell>
                  </TableRow>
                </DialogTrigger>
              ))}
            </TableBody>
          </Table>
        </div>
      </Dialog>
    </div>
  );
}
