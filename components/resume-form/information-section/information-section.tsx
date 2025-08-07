import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/validation/resume";
import { useTranslations } from "next-intl";
import React from "react";
import { Control } from "react-hook-form";

function InformationSection({ control }: { control: Control<Resume> }) {
  const t = useTranslations("Resume");

  return (
    <div className="grid grid-cols-2 place-items-start item-stretch gap-y-2 gap-x-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("name")}</FormLabel>
            <FormControl>
              <Input placeholder={t("name-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("email")}</FormLabel>
            <FormControl>
              <Input placeholder={t("email-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="linkedIn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("linkedIn")}</FormLabel>
            <FormControl>
              <Input placeholder={t("linkedIn-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("phone")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phone-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="github"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("github")}</FormLabel>
            <FormControl>
              <Input placeholder={t("github-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="location"
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
        name="summary"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>{t("summary")}</FormLabel>
            <FormControl>
              <Textarea className="min-h-24" placeholder={t("summary-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default InformationSection;
