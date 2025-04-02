import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
    <>
      <Link href="/room"> Room</Link>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        <Button
              asChild
              size="sm"
              variant={"default"}
              className="opacity-75"
            >
              <Link href="/test">test</Link>
            </Button>
      </main>
    </>
  );
}
