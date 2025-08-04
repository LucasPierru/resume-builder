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

function LoginDialog() {
  const [hasAccount, setHasAccount] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `http://localhost:3000/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Continue with</DialogTitle>
          <DialogDescription className="text-center">Choose a method to continue</DialogDescription>
        </DialogHeader>
        {hasAccount ? <LoginForm /> : <RegisterForm />}
        <span className="text-center">OR</span>
        <Button onClick={handleGoogleLogin}>
          <Image src="/google.svg" alt="Google logo" width={16} height={16} />
          Google
        </Button>
        <span className="text-center">
          {hasAccount ? "Don't have an account? " : "Already have an account? "}
          <button className="cursor-pointer text-blue-500" onClick={() => setHasAccount((hasAccount) => !hasAccount)}>
            {hasAccount ? "Sign up" : "Sign in"}
          </button>
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
