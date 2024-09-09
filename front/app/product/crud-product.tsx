"use client";

import { Button } from "@/components/ui/button";
import CrudTable from "@/components/ui/crud-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApiFetch } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ImageIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, ProductWithProviderName } from "./page";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Blob } from "buffer";

type CrudProductProps = {
  products: ProductWithProviderName[];
  hideTitle?: true;
  tableHiddenKeys?: (keyof Product)[];
  formHiddenKeys?: (keyof ProductWithProviderName)[];
};

export default function CrudProduct({
  products,
  hideTitle,
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
    <>
      <div className="flex center justify-center mt-2">
        <UploadImageDialog />
      </div>
      <CrudTable
        title={hideTitle ? undefined : "Produto"}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onRemove={onRemove}
        data={products}
        tableHiddenKeys={tableHiddenKeys}
        formHiddenKeys={formHiddenKeys}
      />
    </>
  );
}

function UploadImageDialog(): JSX.Element {
  const router = useRouter();
  const form = useForm<{ id: number }>({ defaultValues: { id: 1 } });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onFileSelect = (files: File[] | null) => {
    if (!files) return;
    if (files.length === 0) setSelectedImage(null);
    setSelectedImage(files[0]);
  };

  const onSubmit = async ({ id }: { id: number }) => {
    if (!selectedImage) {
      console.error("Image not selected");
      return;
    }
    // Send image
    const formData = new FormData();

    formData.append("file", selectedImage);
    await ApiFetch(
      "POST",
      `product/${id}/set-image`,
      formData,
      router,
      true,
      false
    );
  };

  const dropzoneConfig = {
    accept: { "image/*": [".jpeg", ".jpg"] },
    maxFiles: 2,
    multiple: true,
  } satisfies DropzoneOptions;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <ImageIcon className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Upload</DialogTitle>
            <DialogDescription>
              Fazer upload de imagem de produto
            </DialogDescription>
          </DialogHeader>
          <FileUploader
            value={selectedImage ? [selectedImage] : null}
            onValueChange={onFileSelect}
            reSelect
            dropzoneOptions={dropzoneConfig}
          >
            <FileInput>
              <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                <UploadIcon className="w-4 h-4 mr-2" />
                <p className="text-gray-400">Clique ou arraste</p>
              </div>
            </FileInput>
            <FileUploaderContent className="flex items-center flex-row gap-2">
              {selectedImage && (
                <FileUploaderItem
                  index={0}
                  className="size-20 p-0 rounded-md overflow-hidden"
                  aria-roledescription={`file ${1} containing ${
                    selectedImage.name
                  }`}
                >
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt={selectedImage.name}
                    height={80}
                    width={80}
                    className="size-20 p-0"
                  />
                </FileUploaderItem>
              )}
            </FileUploaderContent>
          </FileUploader>
          <Label>ID do produto</Label>
          <div>
            <Input id={"id"} {...form.register("id")} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Enviar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
