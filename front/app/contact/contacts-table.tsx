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
import { PlusCircle } from "lucide-react";
import { Contact } from "./page";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { register } from "module";

interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const form = useForm<Contact>();

  const onUpdateSubmit: SubmitHandler<Contact> = (data) =>
    console.log(JSON.stringify(data));

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
            <form action="" className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input className="col-span-3" id="name" />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="email">Email</Label>
                <Input className="col-span-3" id="email" />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="telefone">Telefone</Label>
                <Input className="col-span-3" id="telefone" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg p-2">
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contatos</DialogTitle>
              <DialogDescription>Editar contato</DialogDescription>
            </DialogHeader>
            <form
              action=""
              onSubmit={() => form.handleSubmit(onUpdateSubmit)}
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
                <Button type="submit">Alterar</Button>
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
                <DialogTrigger
                  asChild
                  key={contact.id}
                  onClick={() => {
                    form.setValue("name", contact.name);
                    form.setValue("email", contact.email);
                    form.setValue("phone", contact.phone);
                  }}
                >
                  <TableRow key={contact.id}>
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
