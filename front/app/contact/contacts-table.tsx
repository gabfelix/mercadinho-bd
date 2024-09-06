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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, TrashIcon } from "lucide-react";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "./page";

interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const router = useRouter();
  const form = useForm<Contact>();

  const onCreateSubmit: SubmitHandler<Contact> = async (data) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("http://localhost:3333/contact", requestOptions);
    if (res.ok) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const onUpdateSubmit: SubmitHandler<Contact> = async (data) => {
    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `http://localhost:3333/contact/${data.id}`,
      requestOptions
    );
    if (res.ok) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const onRemoveButtonClick = async (id: number) => {
    const requestOptions: RequestInit = {
      method: "DELETE",
    };
    const res = await fetch(
      `http://localhost:3333/contact/${id}`,
      requestOptions
    );
    if (res.ok) {
      form.reset();
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contatos</h1>
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => form.reset()}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo contato</DialogTitle>
              <DialogDescription>Criar um novo contato</DialogDescription>
            </DialogHeader>
            <form
              action=""
              onSubmit={form.handleSubmit(onCreateSubmit)}
              className="space-y-6"
              {...form}
            >
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  className="col-span-3"
                  id="name"
                  {...form.register("name")}
                />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="col-span-3"
                  id="email"
                  {...form.register("email")}
                />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  className="col-span-3"
                  id="telefone"
                  {...form.register("phone")}
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
      <div className="border rounded-lg p-2">
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <div className="flex flex-row space-x-4">
                <div>
                  <DialogTitle>Contatos</DialogTitle>
                  <DialogDescription>Editar contato</DialogDescription>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => onRemoveButtonClick(form.getValues("id"))}
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
                <Label htmlFor="name">Nome</Label>
                <Input
                  className="col-span-3"
                  id="name"
                  {...form.register("name")}
                />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="col-span-3"
                  id="email"
                  {...form.register("email")}
                />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  className="col-span-3"
                  id="telefone"
                  {...form.register("phone")}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <DialogTrigger asChild key={contact.id}>
                  <TableRow
                    key={contact.id}
                    onClick={() => {
                      form.setValue("id", contact.id);
                      form.setValue("name", contact.name);
                      form.setValue("email", contact.email);
                      form.setValue("phone", contact.phone);
                    }}
                  >
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                  </TableRow>
                </DialogTrigger>
              ))}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    </div>
  );
}
