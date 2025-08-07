"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import LoginForm from "../login-form/login-form";
import RegisterForm from "../register-form/register-form";
import { createClient } from "@/utils/supabase/client";
import { useTranslations } from "next-intl";

function LoginDialog() {
  const t = useTranslations("Login");
  const supabase = createClient();
  const [hasAccount, setHasAccount] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("login")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>{t("continue-with")}</DialogTitle>
          <DialogDescription className="text-center">{t("choose-method")}</DialogDescription>
        </DialogHeader>
        {hasAccount ? <LoginForm /> : <RegisterForm />}
        <span className="text-center">{t("or")}</span>
        <Button onClick={handleGoogleLogin}>
          <Image src="/google.svg" alt="Google logo" width={16} height={16} />
          Google
        </Button>
        <span className="text-center">
          {hasAccount ? t("dont-have-account") : t("already-have-account")}
          <button className="cursor-pointer text-blue-500" onClick={() => setHasAccount((hasAccount) => !hasAccount)}>
            {hasAccount ? t("sign-up") : t("sign-in")}
          </button>
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
