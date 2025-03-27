import { signInAnonymously } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
        <SubmitButton pendingText="Signing In..." formAction={signInAnonymously}>
          Sign in anonymously
        </SubmitButton>
        <FormMessage message={searchParams} />
    </form>
  );
}
