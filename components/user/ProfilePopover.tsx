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
                <div className="grid gap-2">
                    <Link href="/my-profile"><Button className="w-full">Your Profile</Button></Link>
                    <Link href="/watchlist"><Button className="w-full">Watchlist</Button></Link>
                    <Button variant={"destructive"} onClick={handleSignOut} className="w-full">Sign Out</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
