import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { useUserDataStore } from "@/store/userDataStore";
import { useQuery, gql } from '@apollo/client';
import {GetUserData} from '@/graphql/queries/GetUserData.gql'
import { createClient } from '@/utils/supabase/client'
import { set } from 'react-hook-form';

export function useAuthenticatedUser() {
    const [userSession, setUserSession] = useState<any>()
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();
    const { userData, setUserData } = useUserDataStore();
    // const [userComponentSession, setUserComponentSession] = useState(null);
    useEffect(() => {
        const getUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data?.session?.user && pathname !== "/login" && pathname !== "/signup") {
                router.push("/login");
            }
            setUserSession(data?.session);
        };
        getUserSession();
    }, [supabase.auth.onAuthStateChange, pathname]);

    const { data: userDataFromGraphql, loading } = useQuery(GetUserData, {
        variables: { userId: userSession?.user?.id },
        skip: !userSession,
    });

    useEffect(() => {
        if (!loading && userDataFromGraphql?.getUser) {
            setUserData(userDataFromGraphql?.getUser);
        }
    }, [supabase.auth.onAuthStateChange, userDataFromGraphql?.getUser]);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
        setUserData(null);
        router.push("/login");
    };

    return { userData, userSession, handleSignOut, loading };
}