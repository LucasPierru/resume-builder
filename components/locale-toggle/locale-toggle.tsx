"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LocaleToggle = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const newLocale = locale === "en" ? "fr" : "en";

  return (
    <Link className="text-md rounded-full font-semibold" href={{ pathname }} locale={newLocale}>
      {newLocale.toUpperCase()}
    </Link>
  );
};

export default LocaleToggle;
