import { ApiFetch } from "@/lib/utils";
import RoSalesTable from "./ro-sales-table";

export default async function Home() {
  const res = await ApiFetch("GET", "sale", undefined, undefined, true, true);
  const data = await res?.json();
  data.map((sale: any) => {
    sale.sale_id = undefined;
    sale.customer_id = undefined;
    sale.product_id = undefined;
    sale.sale_date = new Date(sale.sale_date).toLocaleString("pt-BR");
  });
  return (
    <main>
      <h1 className="flex justify-center text-3xl mt-2 font-bold">Vendas</h1>
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <RoSalesTable data={data} />
      </div>
    </main>
  );
}
