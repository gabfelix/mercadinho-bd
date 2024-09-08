import { ApiFetch } from "@/lib/utils";
import { Contact } from "../contact/page";
import CrudProvider from "./crud-provider";

export type ProviderWithContactName = Provider & { contactName: string }

export type Provider = {
  id: number;
  cnpj: string;
  contactId: number;
}

async function fetchProviders(): Promise<Provider[]> {
  const providers = await ApiFetch('GET', 'provider', undefined, undefined, true);
  return providers ? providers.json() : [];
}

async function fetchProvidersWithContactNames(): Promise<
  ProviderWithContactName[]
> {
  const providers = await fetchProviders();
  return await Promise.all(
    providers.map(async (provider) => {
      // Get contact name
      const res = await ApiFetch('GET', `contact/${provider.contactId}`, undefined, undefined, true);
      if (!res?.ok)
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
