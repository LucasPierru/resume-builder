import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resume } from "@/validation/resume";
import { ArrowDown, ArrowUp, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type BulletPointsProps = {
  fieldIndex: number;
  control: Control<Resume>;
  section: "experience" | "projects" | "extracurriculars";
};

function BulletPoints({ fieldIndex, control, section }: BulletPointsProps) {
  const { fields, append, remove, move } = useFieldArray({
    name: `${section}.${fieldIndex}.bulletPoints`,
  });
  const t = useTranslations("Resume");

  return (
    <div className="col-span-full w-full space-y-2">
      <FormLabel>{t("bullet-points")}</FormLabel>
      {fields.map((input, index) => (
        <div key={input.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${section}.${fieldIndex}.bulletPoints.${index}.text`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea className="min-h-20" placeholder={t("bullet-point-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => move(index, index - 1)}
            disabled={index === 0}>
            <ArrowUp />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => move(index, index + 1)}
            disabled={index === fields.length - 1}>
            <ArrowDown />
          </Button>
          <Button size="icon" type="button" variant="destructive" onClick={() => remove(index)}>
            <TrashIcon />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          append({ text: "" });
        }}
        className="w-fit mt-2">
        <PlusIcon />
        {t("add-bullet-point")}
      </Button>
    </div>
  );
}

export default BulletPoints;
