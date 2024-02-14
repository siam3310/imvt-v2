import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LoginForm } from "@/components/authentication/LoginForm"
import { SignupForm } from "@/components/authentication/SignupForm"
export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage({ link, title, description }: { link: string, title: string, description: string }) {

    return (
        <div className="w-full h-full overflow-y-scroll">
            <div className="container relative h-full flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <Link
                    href={`/${link}`}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8 z-[1] bg-white text-black"
                    )}
                >
                    {link.slice(0, 1).toUpperCase() + link.slice(1)}
                </Link>

                <div className="relative hidden flex-col h-full bg-muted text-white lg:flex dark:border-r movie-backdrop">
                    <Image
                        src="https://static.itavisen.no/wp-content/uploads/2019/06/netflix-popout.jpg"
                        width={1280}
                        height={843}
                        alt="Authentication"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="lg:p-8 z-[1] pb-[10px]">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {link === "signup" ? <LoginForm /> : <SignupForm />}
                    </div>
                </div>

                <div className="absolute top-0 left-0 z-0 w-full bg-black bg-opacity-50 lg:hidden flex-col h-[50dvh] bg-muted text-white dark:border-r movie-backdrop">
                    <Image
                        src="https://static.itavisen.no/wp-content/uploads/2019/06/netflix-popout.jpg"
                        width={1280}
                        height={843}
                        alt="Authentication"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}