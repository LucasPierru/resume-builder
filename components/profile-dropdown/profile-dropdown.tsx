import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { UserIcon } from "lucide-react";
import Logout from "../auth/logout/logout";
import { getTranslations } from "next-intl/server";

async function ProfileDropdown() {
  const t = await getTranslations("Navbar");

  return (
    <Menubar className="p-0 rounded-sm border">
      <MenubarMenu>
        <MenubarTrigger className="h-9 w-9">
          <UserIcon className="h-8 w-8" />
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarLabel>{t("my-account")}</MenubarLabel>
          <MenubarSeparator />
          <MenubarItem>{t("profile")}</MenubarItem>
          <MenubarItem>{t("billing")}</MenubarItem>
          <MenubarItem>{t("add-credits")}</MenubarItem>
          <MenubarItem>
            <Logout />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default ProfileDropdown;
