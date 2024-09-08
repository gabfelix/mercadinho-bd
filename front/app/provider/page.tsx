import CrudTable from "@/components/ui/crud-table";
import { Contact } from "../contact/page";
import CrudProvider from "./crud-provider";

export type ProviderWithContactName = Provider & { contactName: string }

export type Provider = {
  id: number;
  cnpj: string;
  contactId: number;
}

async function fetchProviders(): Promise<Provider[]> {
  const res = await fetch("http://localhost:3333/provider", {
    cache: "no-store",
  });
  return res.json();
}

async function fetchProvidersWithContactNames(): Promise<
  ProviderWithContactName[]
> {
  const providers = await fetchProviders();
  return await Promise.all(
    providers.map(async (provider) => {
      // Get contact name
      const res = await fetch(
        `http://localhost:3333/contact/${provider.contactId}`,
        { cache: "no-store" }
      );
      if (!res.ok)
        throw new Error(`Failed to fetch contact ${provider.contactId}`);
      const contact: Contact = await res.json();

      return {
        id: provider.id,
        cnpj: provider.cnpj,
        contactId: provider.contactId,
        contactName: contact.name,
      };
    })
  );
}

export default async function Providers() {
  const providers = await fetchProvidersWithContactNames();

  return (
    <main>
      <CrudProvider providers={providers} />
    </main>
  );
}
