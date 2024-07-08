'use client'
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { createFile, getFiles } from '../../convex/files';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <Button onClick={() => {
          if (!orgId) return;
          createFile({
            name: "hello word",
            orgId,
          });
        }}>
          Upload File
        </Button>
      </div>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}


    </main>
  )
}
