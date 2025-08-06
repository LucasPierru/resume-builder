"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  const pathname = usePathname();
  return (
    <Link className={`${pathname === href ? "font-semibold" : ""}`} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
