import { ApiFetch } from "@/lib/utils";
import ContactsTable from "./contacts-table";
import CrudContact from "./crud-contact";

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function fetchContacts(): Promise<Contact[]> {
  const contacts = await ApiFetch('GET', 'contact', undefined, undefined, true);
  return contacts ? contacts.json() : [];
}

export default async function Contacts() {
  const contacts = await fetchContacts();

  return (
    <main>
      <CrudContact contacts={contacts} />
    </main>
  );
}
