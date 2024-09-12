import TrendingMediaPages from '@/components/Trending/TrendingMediaPages'

export default function TrendingMediaTypes({
  params,
}: {
  params: { type: string }
}) {
  return (
    <div className='w-full bg-[#151517] rounded-l-lg overflow-hidden'>
      <TrendingMediaPages type={params.type} />
    </div>
  )
}
