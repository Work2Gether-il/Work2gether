import AuthButton from "@/components/header-auth";
import Header from "@/components/hero";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <Link href="/room"> Room</Link>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <Button
              asChild
              size="sm"
              variant={"default"}
              className="opacity-75"
            >
              <Link href="/test">test</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              className="opacity-75"
            >
              <Link href="/createRoom">create Room</Link>
            </Button>
      </main>

      <div>
        <AuthButton/>
      </div>
    </div>
  );
}
