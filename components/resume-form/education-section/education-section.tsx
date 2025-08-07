import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "react-datepicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { defaultEducation, Resume } from "@/validation/resume";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";

function ProjectSection({ control }: { control: Control<Resume> }) {
  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "education", // unique name for your Field Array
  });
  const t = useTranslations("Resume");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t("education")}</h2>
      {fields.map((input, index) => (
        <div
          key={input.id}
          className="grid grid-cols-2 place-items-start item-stretch gap-y-2 gap-x-4 border border-border p-4 rounded-md">
          <FormField
            control={control}
            name={`education.${index}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("institution")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("institution-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.location`}
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
          <FormField
            control={control}
            name={`education.${index}.degree`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("degree")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("degree-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.gpa`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("gpa")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("gpa-placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.startDate`}
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
          <div className="w-full space-y-2">
            <FormField
              control={control}
              name={`education.${index}.endDate`}
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
            <FormField
              control={control}
              name={`education.${index}.currentlyWorking`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="mb-0">{t("currently-studying")}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            <TrashIcon /> {t("remove-education")}
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append(defaultEducation)} className="w-fit">
        <PlusIcon />
        {t("add-education")}
      </Button>
    </div>
  );
}

export default ProjectSection;
