"use-client";
import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";


export function SmtpMessage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#407BA7]/10 border border-[#407BA7]/40 px-5 py-3 rounded-md flex gap-4">
      <InfoIcon size={16} className="mt-0.5 text-[#407BA7]" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-[#1a2e3d]">
          <strong>{t('note')}</strong> {t('noteContent')}
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-[#407BA7] hover:text-[#2e628e] flex items-center text-sm gap-1"
          >
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>

  );
}
