import { signInAction, signInAnonymously } from "@/app/actions";
import { Message } from "@/components/form-message";
import LoginClient from "@/components/login-client";

export default async function LoginPage({ searchParams }: { searchParams: Message }) {
  return <LoginClient message={searchParams} />;
}
