import { ApiFetch } from "@/lib/utils";
import { Contact } from "../contact/page";
import CrudProduct from "./crud-product";

export type Product = {
  id: number;
  name: string;
  amountInStock: number;
  suggestedPrice: number;
  providerId: number
}

async function fetchProviders(): Promise<Product[]> {
  const providers = await ApiFetch('GET', 'provider', undefined, undefined, true);
  return providers ? providers.json() : [];
}

async function fetchProducts(): Promise<
  Product[]
> {
  const products = await ApiFetch('GET', 'product', undefined, undefined, true);
  return products ? products.json() : [];
}

export default async function Providers() {
  const providers = await fetchProducts();

  return (
    <main>
      <CrudProduct products={providers} />
    </main>
  );
}
