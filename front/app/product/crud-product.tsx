"use client";

import CrudTable from "@/components/ui/crud-table";
import { ApiFetch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product } from "./page";

export default function CrudProduct({ products }: { products: Product[] }) {
  const router = useRouter();

  const parseFormData = (providerFormData: any) => {
    if (
      !providerFormData ||
      isNaN(Number(providerFormData.suggestedPrice)) ||
      isNaN(Number(providerFormData.amountInStock)) ||
      isNaN(Number(providerFormData.providerId))
    )
      throw new Error(
        `Invalid fields received:\n${JSON.stringify(providerFormData)}`
      );
    console.log(providerFormData);

    return {
      name: providerFormData.name,
      amountInStock: Number(providerFormData.amountInStock),
      suggestedPrice: Number(providerFormData.suggestedPrice),
      providerId: Number(providerFormData.providerId),
    };
  };

  const onCreate = (data: any) =>
    ApiFetch("POST", "product", parseFormData(data), router);
  const onUpdate = (data: any) =>
    ApiFetch("PATCH", `product/${data.id}`, parseFormData(data), router);
  const onRemove = (id: number) =>
    ApiFetch("DELETE", `product/${id}`, undefined, router);

  return (
    <CrudTable
      title="Fornecedor"
      onCreate={onCreate}
      onUpdate={onUpdate}
      onRemove={onRemove}
      data={products}
      tableHiddenKeys={["contactId"]}
      formHiddenKeys={["contactName"]}
    />
  );
}
