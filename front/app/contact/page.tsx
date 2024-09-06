import ContactsTable from "./contacts-table";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch("http://localhost:3333/contact", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Contacts() {
  return (
    <main>
      <ContactsTable contacts={await fetchContacts()} />
    </main>
  );
}
