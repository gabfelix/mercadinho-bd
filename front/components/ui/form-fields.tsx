"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";

export default function GenericFormFields(): JSX.Element {
    const form = useFormContext();
    if (!form) return <></>;
    const keys = Object.keys(form.getValues());

    return (
        <div className="grid grid-cols-4 items-center text-right gap-3">
            {keys.map((key) => {
                const valueAsNumber = !isNaN(Number(form.getValues(key)));

                return (
                    <React.Fragment key={`${key}-container`}>
                        <Label key={`${key}-label`} htmlFor={key}>{key}</Label>
                        <Input
                            className="col-span-3"
                            id={key}
                            key={`${key}-input`}
                            {...form.register(key)} /> {/* FIXME: Figure out some way to set valueAsNumber */}
                    </React.Fragment>
                );
            })}
        </div>
    );
}