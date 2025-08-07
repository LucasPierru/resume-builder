import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { defaultExtracurricular, Resume } from "@/validation/resume";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import BulletPoints from "../bullet-points/bullet-points";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";

function ExperienceSection({ control }: { control: Control<Resume> }) {
  const { fields, append, remove, move, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "extracurriculars", // unique name for your Field Array
  });
  const t = useTranslations("Resume");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t("extracurriculars")}</h2>
      {fields.map((input, index) => (
        <div
          key={input.id}
          className="grid grid-cols-2 place-items-start item-stretch gap-y-2 gap-x-4 border border-border p-4 rounded-md">
          <FormField
            control={control}
            name={`extracurriculars.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("activity")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("activity-placeholder")} {...field} />
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
                <FormLabel>{t("activity-description")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("activity-description-placeholder")} {...field} />
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
                <FormLabel>{t("start-date")}</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value ? new Date(parseISO(field.value)) : new Date()}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : "");
                    }}
                    minDate={new Date("1900-01-01")}
                    maxDate={new Date()}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    wrapperClassName="datePicker"
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center h-full w-full space-y-2">
            {!fields[index].currentlyWorking && (
              <FormField
                control={control}
                name={`extracurriculars.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("end-date")}</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value ? new Date(parseISO(field.value)) : new Date()}
                        onChange={(date) => {
                          field.onChange(date ? date.toISOString() : "");
                        }}
                        minDate={new Date("1900-01-01")}
                        maxDate={new Date()}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name={`extracurriculars.${index}.currentlyWorking`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        update(index, {
                          ...fields[index],
                          currentlyWorking: checked as boolean,
                        });
                      }}
                    />
                  </FormControl>
                  <FormLabel className="mb-0">{t("currently-working")}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name={`extracurriculars.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("location")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("location-placeholder")} {...field} />
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
            <TrashIcon /> {t("remove-activity")}
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append(defaultExtracurricular)} className="w-fit">
        <PlusIcon />
        {t("add-activity")}
      </Button>
    </div>
  );
}

export default ExperienceSection;
