import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Resume } from "@/validation/resume";
import { ArrowDown, ArrowUp, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type BulletPointsProps = {
  fieldIndex: number;
  control: Control<Resume>;
  section: "experience" | "project" | "extracurriculars";
};

function BulletPoints({ fieldIndex, control, section }: BulletPointsProps) {
  const { fields, append, remove, move } = useFieldArray({
    name: `${section}.${fieldIndex}.bulletPoints`,
  });

  return (
    <div className="col-span-full space-y-2">
      <FormLabel>Bullet Point</FormLabel>
      {fields.map((input, index) => (
        <div key={input.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${section}.${fieldIndex}.bulletPoints.${index}.text`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea className="min-h-20" placeholder="Tell us about what you did" {...field} />
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
        Add Bullet Point
      </Button>
    </div>
  );
}

export default BulletPoints;
