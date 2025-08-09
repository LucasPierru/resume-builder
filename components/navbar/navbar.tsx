import React from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import NavLink from "../navlink/navlink";
import LoginDialog from "../auth/login-dialog/login-dialog";
import { createClient } from "@/utils/supabase/server";
import ProfileDropdown from "../profile-dropdown/profile-dropdown";
import LocaleToggle from "../locale-toggle/locale-toggle";
import { getTranslations } from "next-intl/server";

async function Navbar() {
  const supabase = await createClient();
  const t = await getTranslations("Navbar");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const routes = [
    { name: t("home"), path: "/" },
    { name: t("generation"), path: "/job-generation" },
    { name: t("resume"), path: "/resume" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-background/95 supports-[backdrop-filter]:bg-background/60 flex items-center backdrop-blur justify-between h-14 border-b border-border">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <span className="text-lg font-semibold">Adaptify</span>
        <nav className="flex space-x-4">
          {routes.map((route) => (
            <NavLink key={route.name} href={route.path}>
              {route.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user ? <ProfileDropdown /> : <LoginDialog />}
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
