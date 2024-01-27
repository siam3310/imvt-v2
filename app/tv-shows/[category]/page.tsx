import TvCategoryPages from '@/components/TvShows/TvCategoryPages'

export default function TvCategory({ params }: { params: { category: string } }) {
  return (
    <main className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
      <TvCategoryPages category={params.category} />
    </main>
  )
}
