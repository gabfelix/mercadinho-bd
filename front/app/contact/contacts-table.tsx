import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NextApiResponse } from "next";

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="border rounded-lg p-2">
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
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
