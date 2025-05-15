"use client";

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction, signInAnonymously } from "@/app/actions";
import Link from "next/link";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LoginClient({ message }: { message: Message }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box>
        <form className="flex-1 flex flex-col min-w-64" action={signInAction}>
          <h1 className="text-2xl font-medium">{t("signin")}</h1>
          <p className="text-sm text-foreground">
            {t("noAccount")}{" "}
            <Link className="text-foreground font-medium underline" href="/sign-up">
              {t("signup")}
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">{t("mail")}</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">{t("pwd")}</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                {t("pwdforgot")}
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton pendingText="Signing In...">
              {t("signin")}
            </SubmitButton>

            <FormMessage message={message} />
          </div>
        </form>

        <form className="flex-1 flex flex-col min-w-64" action={signInAnonymously}>
          <SubmitButton pendingText="Signing In...">
            {t("signano")}
          </SubmitButton>
          <FormMessage message={message} />
        </form>
      </Box>
    </div>
  );
}
