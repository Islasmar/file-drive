import { OrganizationSwitcher, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";

export function Header() {
    return (
        <div className=" border-b py-4 bg-gray-50">
            <div className="items-center container mx-auto justify-between flex">
                <div>File Drive</div>
                <div className="flex gap-2">
                    <OrganizationSwitcher />
                    <UserButton />
                    <SignedOut>
                        <SignInButton>
                            <Button>Sing In</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}