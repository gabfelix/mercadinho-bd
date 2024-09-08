"use client";

import CrudTable from "@/components/ui/crud-table";
import { ApiFetch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Contact } from "./page";

export default function CrudContact({ contacts }: { contacts: Contact[] }) {
    const router = useRouter();

    const parseFormData = (formData: any) => {
        return {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        }
    }

    const onCreate = (data: any) => ApiFetch('POST', 'contact', parseFormData(data), router);
    const onUpdate = (data: any) => ApiFetch('PATCH', `contact/${data.id}`, parseFormData(data), router);
    const onRemove = (data: any) => ApiFetch('DELETE', `contact/${data.id}`, router);

    return (
        <CrudTable
            title="Contato"
            data={contacts}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onRemove={onRemove}
        />
    )
}