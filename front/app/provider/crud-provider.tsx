"use client"

import CrudTable from "@/components/ui/crud-table";
import { Provider } from "./page";


export default function CrudProvider({ providers }: { providers: Provider[] }) {
  const onCreate = (data: any) => {
    console.log(JSON.stringify(data));
  }

  const onRemove = (id: number) => {
    console.log(`trying to remove provider with id ${id}`)
  }

  return (
    <CrudTable
      title='Fornecedor'
      onCreate={onCreate}
      onUpdate={onCreate}
      onRemove={onRemove}
      data={providers}
      tableHiddenKeys={['contactId']}
      formHiddenKeys={['contactName']}
    />
  )
}