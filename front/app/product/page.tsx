import { ApiFetch } from "@/lib/utils";
import { Contact } from "../contact/page";
import CrudProduct from "./crud-product";
import { Provider } from "../provider/page";
import DefaultProductImage from "../../public/miojo.jpg";

export type ProductWithProviderName = {
  id: number;
  image: string;
  name: string;
  amountInStock: number;
  suggestedPrice: number;
  providerId: number;
  providerName: string;
};

export type Product = {
  id: number;
  image?: Buffer;
  name: string;
  amountInStock: number;
  suggestedPrice: number;
  providerId: number;
};

async function fetchProductsWithProviderName(): Promise<
  ProductWithProviderName[]
> {
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
      // Convert image (if present) to base64
      if (product.image) product.image = Buffer.from(product.image); // I don't know why I have to do this but it works
      const productImageSource = product.image
        ? `data:image/jpeg;base64,${JSON.stringify(
            product.image.toString("base64")
          )}`
        : DefaultProductImage.src;

      // Return product with provider name
      return {
        id: product.id,
        image: productImageSource,
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
  const products = await fetchProductsWithProviderName();

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
