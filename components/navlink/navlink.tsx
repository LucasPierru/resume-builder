"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <Link className={`${pathname === `/${locale}${href === "/" ? "" : href}` ? "font-semibold" : ""}`} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
