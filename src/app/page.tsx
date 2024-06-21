'use client'
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { createFile, getFiles } from '../../convex/files';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { organization } = useOrganization();
  const files = useQuery(
    api.files.getFiles,
     organization?.id ? { orgId: organization.id } : "skip");
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sing Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign Int</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button onClick={() => {
        if (!organization) return;
        createFile({
          name: "hello word",
          orgId: organization.id,
        });
      }}>Click Me</Button>
    </main>
  )
}
