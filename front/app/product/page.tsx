import { ApiFetch } from "@/lib/utils";
import { Contact } from "../contact/page";
import CrudProduct from "./crud-product";
import { Provider } from "../provider/page";

export type ProductWithProviderName = Product & { providerName: string };

export type Product = {
  id: number;
  name: string;
  amountInStock: number;
  suggestedPrice: number;
  providerId: number;
};

async function fetchProducts(): Promise<ProductWithProviderName[]> {
  const res = await ApiFetch("GET", "product", undefined, undefined);
  if (!res?.ok) return [];
  const products: Product[] = await res.json();

  return await Promise.all(
    products.map(async (product) => {
      const resProvider = await ApiFetch(
        "GET",
        `provider/${product.providerId}`,
        undefined,
        undefined
      );
      if (!resProvider?.ok)
        throw new Error(`Failed to fetch provider ${product.providerId}`);
      const provider: Provider = await resProvider.json();
      return {
        id: product.id,
        providerName: provider.name,
        name: product.name,
        amountInStock: product.amountInStock,
        suggestedPrice: product.suggestedPrice,
        providerId: product.providerId,
      };
    })
  );
}

export default async function Products() {
  const products = await fetchProducts();

  return (
    <main>
      <CrudProduct
        products={products}
        tableHiddenKeys={["providerId"]}
        formHiddenKeys={["providerName"]}
      />
    </main>
  );
}
