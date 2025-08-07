"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function Logout() {
  const t = useTranslations("Navbar");
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <Button onClick={handleLogout} size="sm" variant="ghost" className="w-full">
      <LogOutIcon className="text-foreground mr-2" />
      {t("logout")}
    </Button>
  );
}

export default Logout;
