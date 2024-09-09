"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import GenericFormFields from "./form-fields";

type ObjectWithId = Object & { id: number };

export type CrudTableProps = {
  title?: string;
  data: ObjectWithId[];
  onCreate: (data: any) => void;
  onUpdate: (data: any) => void; // TODO: Change this so that it's (id: number, data: any) and remove id from data
  onRemove: (id: number) => void;
  tableHiddenKeys?: string[];
  formHiddenKeys?: string[];
};

/** Table component with all CRUD functionalities (via callbacks) for any Object */
export default function CrudTable({
  title,
  data,
  tableHiddenKeys = [],
  formHiddenKeys = [],
  onCreate,
  onRemove,
  onUpdate,
}: CrudTableProps) {
  if (data.length === 0) data = [];

  formHiddenKeys.push("id"); // We never want the id in a form

  // Generate form and default values
  let defaultValues = {} as any;
  if (data.length > 0) {
    Object.keys(data[0]).map((key) => {
      defaultValues[key] = "";
    });
  }
  const form = useForm({ defaultValues });

  if (!title) title = "Desconhecido";

  return (
    <FormProvider {...form}>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {title && <h1 className="text-3xl font-bold">{title}</h1>}
        <div className="flex items-center justify-end">
          <CreateDialog
            title={title}
            onCreate={onCreate}
            formHiddenKeys={formHiddenKeys}
          />
        </div>
        <UpdateDialog
          data={data}
          title={title}
          onUpdate={onUpdate}
          onRemove={onRemove}
          formHiddenKeys={formHiddenKeys}
          tableHiddenKeys={tableHiddenKeys}
        />
      </div>
    </FormProvider>
  );
}

type CreateDialogProps = {
  title: string;
  onCreate: (data?: any) => void;
  formHiddenKeys?: string[];
  formWipeCb?: () => void;
};

function CreateDialog({ title, formHiddenKeys, onCreate }: CreateDialogProps) {
  const form = useFormContext();
  if (!title) title = "Desconhecido";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => form.reset()}>
          <PlusCircle className="w-4 h-4 mr-2" /> Novo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Criar novo(a) {title?.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onCreate)} className="space-y-6">
          <GenericFormFields hiddenKeys={formHiddenKeys} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type UpdateDialogProps = {
  title: string;
  data: ObjectWithId[];
  onUpdate: (data?: any) => void;
  onRemove: (id: number) => void;
  tableHiddenKeys?: string[];
  formHiddenKeys?: string[];
};

function UpdateDialog({
  title,
  data,
  tableHiddenKeys,
  formHiddenKeys,
  onRemove,
  onUpdate,
}: UpdateDialogProps) {
  const form = useFormContext();

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-row space-x-4">
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Editar um(a) {title?.toLowerCase()} existente
              </DialogDescription>
            </div>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => onRemove(Number(form.getValues("id")))}
              >
                <Trash className="w-4 h-4 mr-2" /> Remover
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-6">
          <GenericFormFields hiddenKeys={formHiddenKeys} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>

      <GenericObjectTable
        data={data}
        triggersUpdateDialog
        onRowClick={(object) => {
          const keys = Object.keys(object);
          keys.map((key) => {
            if (!(key in object)) return;
            form.setValue(key, object[key]);
          });
        }}
        hiddenKeys={tableHiddenKeys}
        {...form}
      />
    </Dialog>
  );
}

type GenericObjectTableProps = {
  data: ObjectWithId[];
  triggersUpdateDialog?: true;
  hiddenKeys?: string[];
  onRowClick?: (object: any) => void;
};

function GenericObjectTable({
  data,
  triggersUpdateDialog,
  onRowClick,
  hiddenKeys,
}: GenericObjectTableProps) {
  const form = useFormContext();
  const keys = Object.keys(data[0]).filter((key) => !hiddenKeys?.includes(key));

  return (
    <div className="border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            {keys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((object: any) => {
            const tableRow = (
              <TableRow
                key={object.id}
                onClick={() => {
                  if (form) keys.map((key) => form.setValue(key, object[key])); // Set forms inputs to selected row data
                  onRowClick?.(object);
                }}
              >
                {keys.map((key) => {
                  const isImage = key.toLowerCase().search("image") !== -1;
                  return (
                    <TableCell key={`${object.id}-${key}`}>
                      {isImage ? <img src={object.image} /> : object[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
            if (triggersUpdateDialog) {
              return (
                <DialogTrigger asChild key={object.id}>
                  {tableRow}
                </DialogTrigger>
              );
            } else {
              return tableRow;
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
}
