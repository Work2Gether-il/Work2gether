import { FormMessage, Message } from "@/components/form-message";
import SignupClient from "@/components/signup-client";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={message} />
      </div>
    );
  }

  return <SignupClient message={message} />;
}

