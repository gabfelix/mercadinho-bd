"use client";

import CrudTable, { GenericObjectTable } from "@/components/ui/crud-table";
import { useRouter } from "next/navigation";

export default function RoSalesTable({ data }: { data: any }) {
  console.log(data);
  const router = useRouter();
  return <GenericObjectTable data={data} />;
}
