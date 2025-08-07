import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultCertification, Resume } from "@/validation/resume";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";

function ProjectSection({ control }: { control: Control<Resume> }) {
  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "certifications", // unique name for your Field Array
  });
  const t = useTranslations("Resume");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t("certifications")}</h2>
      {fields.map((input, index) => (
        <div
          key={input.id}
          className="grid grid-cols-2 place-items-start item-stretch gap-y-2 gap-x-4 border border-border p-4 rounded-md">
          <FormField
            control={control}
            name={`certifications.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("certification-name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("certification-name-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`certifications.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("certification-description")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("certification-description-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-start-1">
            <Button
              type="button"
              variant="ghost"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              className="w-fit">
              <ArrowUpIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={index === fields.length - 1}
              onClick={() => move(index, index + 1)}
              className="w-fit">
              <ArrowDownIcon />
            </Button>
          </div>
          <Button type="button" variant="destructive" onClick={() => remove(index)} className="justify-self-end w-fit">
            <TrashIcon /> {t("remove-certification")}
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append(defaultCertification)} className="w-fit">
        <PlusIcon />
        {t("add-certification")}
      </Button>
    </div>
  );
}

export default ProjectSection;
