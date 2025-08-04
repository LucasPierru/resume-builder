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

function ProfileDropdown() {
  return (
    <Menubar className="p-0 rounded-sm border">
      <MenubarMenu>
        <MenubarTrigger className="h-9 w-9">
          <UserIcon className="h-8 w-8" />
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarLabel>My Account</MenubarLabel>
          <MenubarSeparator />
          <MenubarItem>Profile</MenubarItem>
          <MenubarItem>Billing</MenubarItem>
          <MenubarItem>Add credits</MenubarItem>
          <MenubarItem>
            <Logout />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default ProfileDropdown;
