import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export function ProfilePopover({ userData, children }: { userData: any, children: any }) {
    const { handleSignOut } = useAuthenticatedUser()
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 z-[11111111111111]">
                <div className="grid gap-4">
                    {/* <h4 className="font-medium leading-none">Hi {userData?.name}</h4> */}
                    <Link href="/my-profile"><Button className="w-full">Your Profile</Button></Link>
                    <Button onClick={handleSignOut} className="w-full">Sign Out</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
