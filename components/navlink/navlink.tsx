"use client";

import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ children, ...otherProps }: { children: ReactNode } & LinkProps) {
  const pathname = usePathname();
  return (
    <Link className={`${pathname === otherProps.href ? "font-semibold" : ""}`} {...otherProps}>
      {children}
    </Link>
  );
}

export default NavLink;
