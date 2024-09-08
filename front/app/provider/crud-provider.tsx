"use client"

import CrudTable from "@/components/ui/crud-table";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { ProviderWithContactName } from "./page";

export default function CrudProvider({ providers }: { providers: ProviderWithContactName[] }) {
  const router = useRouter();

  const parseFormData = (providerFormData: any) => {
    const typedData = {
      cnpj: providerFormData.cnpj,
      contactId: Number(providerFormData.contactId)
    }
    if (!typedData.contactId || typedData.cnpj.length === 0) {
      console.error(`Invalid fields received:\n${JSON.stringify(typedData)}`);
    }
    return typedData;
  }

  const onCreate = (data: any) => {
    fetch("http://localhost:3333/provider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseFormData(data)),
    }).then((res) => {
      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    });
  }

  const onUpdate = (data: any) => {
    fetch(`http://localhost:3333/provider/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseFormData(data)),
    }).then((res) => {
      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    });
  }

  const onRemove = (id: number) => {
    fetch(`http://localhost:3333/provider/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    });
  }

  return (
    <CrudTable
      title='Fornecedor'
      onCreate={onCreate}
      onUpdate={onUpdate}
      onRemove={onRemove}
      data={providers}
      tableHiddenKeys={['contactId']}
      formHiddenKeys={['contactName']}
    />
  )
}