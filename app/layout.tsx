import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import CustomCursor from '@/components/Common/CustomCursor'
import BottomNav from '@/components/BottomNav'
import Sidebar from '@/components/Sidebar'
import Provider from '@/configs/Provider'
import { siteInfo } from '@/configs/site'
import { twMerge } from 'tailwind-merge'
import { Toaster } from "@/components/ui/sonner"
import './globals.css'
import './styles.css'

const inter = Nunito({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: siteInfo.name,
    template: `%s - ${siteInfo.name}`,
  },
  description: siteInfo.description,
  authors: siteInfo.authors,
  generator: siteInfo.generator,
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({ children }: IChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        {/* <CustomCursor> */}
        <div
          className={twMerge(
            inter.className,
            'flex w-full max-h-[100svh] overflow-y-hidden select-none sm:pb-0 pb-[50px] text-black bg-[#e0d7d7] dark:text-white dark:bg-[#151516]'
          )}
        >
          <Provider>
            <div className='z-[11111111]'>
              <BottomNav />
            </div>
            <div className="w-fit sm:block hidden z-[11111111]">
              <Sidebar />
            </div>
            {children}
            <Toaster />
          </Provider>
        </div>
        {/* </CustomCursor> */}
      </body>
    </html>
  )
}
