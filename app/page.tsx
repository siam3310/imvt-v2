import { Footer } from '@/components/Footer'
import HomePage from '@/components/Home/HomePage'

export default async function Home() {
  return (
    <main className='overflow-hidden flex flex-col w-full min-h-screen overflow-y-scroll rounded-l-lg pb-[130px] sm:pb-0'>
      <HomePage />
      <div className='w-full z-[1111111] pt-[50px]'>
        <Footer />
      </div>
    </main>
  )
}
