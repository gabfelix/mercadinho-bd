"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import GenericFormFields from "./form-fields";

type ObjectWithId = Object & { id: number }

export type CrudTableProps = {
    title?: string,
    data: ObjectWithId[]
}

/** Table component with all CRUD plug-in functionalities (via props) for any Object */
export default function CrudTable({ title, data }: CrudTableProps) {
    const router = useRouter();
    const form = useForm();

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            {title && <h1 className="text-3xl font-bold">Fornecedores</h1>}
            <Dialog>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Foo</DialogTitle>
                        <DialogDescription>foo bar</DialogDescription>
                    </DialogHeader>
                    <FormProvider {...form}>
                        <GenericFormFields />
                    </FormProvider>
                    <DialogFooter>
                        Something
                    </DialogFooter>
                </DialogContent>
                <GenericObjectTable
                    data={data}
                    triggersUpdateDialog
                    onRowClick={(object) => {
                        const keys = Object.keys(object);
                        keys.map((key) => {
                            if (!(key in object)) return;
                            form.setValue(key, object[key]);
                        })
                    }}
                    {...form} />
            </Dialog>
        </div >
    )
}

type GenericObjectTableProps = {
    data: ObjectWithId[],
    triggersUpdateDialog?: true,
    onRowClick?: (object: any) => void,
}

function GenericObjectTable({ data, triggersUpdateDialog, onRowClick }: GenericObjectTableProps) {
    if (data.length === 0) return;

    const form = useFormContext();
    const keys = Object.keys(data[0]);

    return (
        <div className="border rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            keys.map((key) =>
                                (<TableHead key={key}>{key}</TableHead>)
                            )
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((object: any) => {
                        const tableRow = (
                            <TableRow
                                key={object.id}
                                onClick={() => {
                                    if (form) keys.map((key) => form.setValue(key, object[key])) // Set forms inputs to selected row data
                                    onRowClick?.(object);
                                }}>
                                {keys.map((key) => (<TableCell key={`${object.id}-${key}`}>{object[key]}</TableCell>))}
                            </TableRow>
                        )
                        if (triggersUpdateDialog) {
                            return (
                                <DialogTrigger asChild key={object.id}>{tableRow}</DialogTrigger>
                            )
                        } else {
                            return tableRow;
                        }
                    })}
                </TableBody>
            </Table >
        </div>
    )
}

