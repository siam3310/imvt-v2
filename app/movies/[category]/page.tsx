import MoviesCategoryPages from '@/components/Movies/MoviesCategoryPages';

export default function MoviesCategory({
  params,
}: {
  params: { category: string };
}) {
  return (
    <main className='w-full bg-[#151517] rounded-l-lg overflow-hidden'>
      <MoviesCategoryPages category={params.category} />
    </main>
  );
}
