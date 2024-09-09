"use client";

import CrudTable from "@/components/ui/crud-table";
import { ApiFetch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product, ProductWithProviderName } from "./page";

type CrudProductProps = {
  products: ProductWithProviderName[];
  tableHiddenKeys?: (keyof Product)[];
  formHiddenKeys?: (keyof ProductWithProviderName)[];
};

export default function CrudProduct({
  products,
  tableHiddenKeys,
  formHiddenKeys,
}: CrudProductProps) {
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
      title="Produto"
      onCreate={onCreate}
      onUpdate={onUpdate}
      onRemove={onRemove}
      data={products}
      tableHiddenKeys={tableHiddenKeys}
      formHiddenKeys={formHiddenKeys}
    />
  );
}
