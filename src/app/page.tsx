import { SignInButton, SignOutButton, SignedIn, useSession } from "@clerk/nextjs";
import { Button } from "../components/ui/button";

export default function Home() {

  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton></SignOutButton>
      </SignedIn>
      <Button>Sign Out</Button>
    </main>
  )}
