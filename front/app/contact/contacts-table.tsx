import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Dialog } from "@/components/ui/dialog";
import { PlusCircle, Search } from "lucide-react";
import { NextApiResponse } from "next";
import { Label } from "@/components/ui/label";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch("http://localhost:3333/contact");
  return res.json();
}

export default async function ContactsTable() {
  const contacts: Contact[] = await fetchContacts();
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contatos</h1>
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
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
                <DialogTrigger asChild key={contact.id}>
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
