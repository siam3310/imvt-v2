import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import CustomCursor from '@/components/Common/CustomCursor'
import BottomNav from '@/components/BottomNav'
import Sidebar from '@/components/Sidebar'
import Provider from '@/configs/Provider'
import { siteInfo } from '@/configs/site'
import { twMerge } from 'tailwind-merge'
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

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <CustomCursor>
        <body
          className={twMerge(
            inter.className,
            'flex max-h-[100svh] overflow-y-hidden select-none sm:pb-0 pb-[50px] text-[#dcdad7] dark:text-white bg-[#282b2d] dark:bg-[#151517]'
          )}
        >
          <div className='z-[11111111]'>
            <BottomNav />
          </div>
          <div className="w-fit sm:block hidden z-[11111111]">
            <Sidebar />
          </div>
          <Provider>
            {children}
          </Provider>
        </body>
      </CustomCursor>
    </html>
  )
}
