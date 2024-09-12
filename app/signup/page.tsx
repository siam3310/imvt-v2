import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import AuthenticationPage from '@/components/authentication/AuthenticationPage'

export default async function SignUpPage() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore)
  // const { data } = await supabase.auth.getSession();
  // if (data.session?.user) {
  //     redirect("/");
  // }

  return (
    <div className='w-full h-[100dvh] overflow-y-scroll'>
      <AuthenticationPage
        title='Signup'
        link='login'
        description='Create your account'
      />
    </div>
  )
}
