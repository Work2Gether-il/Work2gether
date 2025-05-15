"use client";

import { SmtpMessage } from "@/app/(auth-pages)/smtp-message";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SignupClient({ message }: { message: Message }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col min-w-64 max-w-64 mx-auto" action={signUpAction}>
          <h1 className="text-2xl font-medium">{t("signup")}</h1>
          <p className="text-sm text text-foreground">
            {t("alreadyAccount")}{" "}
            <Link className="text-primary font-medium underline" href="/sign-in">
              {t("signin")}
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">{t("mail")}</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">{t("pwd")}</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              {t("signup")}
            </SubmitButton>
            <FormMessage message={message} />
          </div>
        </form>
        <SmtpMessage />
      </div>
    </div>
  );
}
