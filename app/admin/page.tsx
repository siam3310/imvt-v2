import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function Admin() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    console.log(data);

    if (!data.session?.user) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: data.session.user.id },
    });

    if (user?.role !== "admin") {
        // redirect("/");
    }

    return (
        <div>
            <h1 className="text-2xl text-center mb-8">Admin page</h1>
            <pre>{JSON.stringify({ user }, null, 4)}</pre>
        </div>
    );
}