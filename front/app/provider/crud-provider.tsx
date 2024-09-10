"use client";

import CrudTable from "@/components/ui/crud-table";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Provider, ProviderWithContactName } from "./page";
import { ApiFetch } from "@/lib/utils";

type CrudProviderProps = {
  providers: Provider[];
  tableHiddenKeys?: (keyof ProviderWithContactName)[];
  formHiddenKeys?: (keyof ProviderWithContactName)[];
};

export default function CrudProvider({
  providers,
  tableHiddenKeys,
  formHiddenKeys,
}: CrudProviderProps) {
  const router = useRouter();

  const parseFormData = (providerFormData: any) => {
    if (
      !providerFormData ||
      !providerFormData.contactId ||
      providerFormData.cnpj?.length === 0 ||
      isNaN(Number(providerFormData.contactId))
    )
      throw new Error(
        `Invalid fields received:\n${JSON.stringify(providerFormData)}`
      );

    return {
      cnpj: providerFormData.cnpj,
      contactId: Number(providerFormData.contactId),
    };
  };

  const onCreate = (data: any) =>
    ApiFetch("POST", "provider", parseFormData(data), router);
  const onUpdate = (data: any) =>
    ApiFetch("PATCH", `provider/${data.id}`, parseFormData(data), router);
  const onRemove = (id: number) =>
    ApiFetch("DELETE", `provider/${id}`, undefined, router);

  return (
    <CrudTable
      title="Fornecedor"
      onCreate={onCreate}
      onUpdate={onUpdate}
      onRemove={onRemove}
      data={providers}
      tableHiddenKeys={tableHiddenKeys}
      formHiddenKeys={formHiddenKeys}
    />
  );
}
