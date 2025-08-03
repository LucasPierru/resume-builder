import React from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import NavLink from "../navlink/navlink";

function Navbar() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Generation", path: "/job-generation" },
    { name: "Resume", path: "/resume" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full flex items-center backdrop-blur justify-between h-14 border-b border-border">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div>Builder</div>
        <nav className="flex space-x-4">
          {routes.map((route) => (
            <NavLink key={route.name} href={route.path}>
              {route.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href="/profile">
            <UserIcon className="h-6 w-6 inline-block ml-2" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
