import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultExtracurricular, Resume } from "@/validation/resume";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import BulletPoints from "../bullet-points/bullet-points";

function ExperienceSection({ control }: { control: Control<Resume> }) {
  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "extracurriculars", // unique name for your Field Array
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Extracurricular Activities</h2>
      {fields.map((input, index) => (
        <div key={input.id} className="grid grid-cols-2 gap-4 border border-border p-4 rounded-md">
          <FormField
            control={control}
            name={`extracurriculars.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your activity name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`extracurriculars.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`extracurriculars.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`extracurriculars.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`extracurriculars.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <BulletPoints fieldIndex={index} control={control} section="extracurriculars" />
          <div>
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
            <TrashIcon /> Remove Extracurricular
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append(defaultExtracurricular)} className="w-fit">
        <PlusIcon />
        Add Activity
      </Button>
    </div>
  );
}

export default ExperienceSection;
