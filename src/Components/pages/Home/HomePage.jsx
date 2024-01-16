import React from 'react'
import HeroSectionCarousel from '../../utils/HeroSectionCarousel.jsx'
import MediaSwiper from '../../utils/MediaSwiper.jsx'
import { gql, useQuery } from "@apollo/client";
import HeroMiniCarousel from '../../utils/HeroMiniCarousel.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const query = gql`
query GetHomeData {
  getAnyTrendingWeek {
    results {
      ... on Movie {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      ... on TV {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
  getAnyTrendingToday {
    results {
      ... on Movie {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
      ... on TV {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
  getMovieTrendingWeek {
    results {
      backdrop_path
      id
      title
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
  getTvTrendingWeek {
    results {
      backdrop_path
      id
      name
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
  getPeopleTrendingWeek {
    results {
      adult
      biography
      id
      name
      original_name
      media_type
      popularity
      gender
      known_for_department
      profile_path
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
}
`;
const HomePage = () => {
  const { data, loading } = useQuery(query);
  // return <SkeletonTheme className="overflow-scroll" baseColor="#202020" highlightColor="#444">
  //   <div className="embla">
  //     <div className="embla-thumbs">
  //       <div className="embla-thumbs__viewport">
  //         <div className="embla-thumbs__container">
  //           <div
  //             className='embla-thumbs__slide'
  //           >
  //             <div
  //               className="hidden sm:block group embla-thumbs__slide__button overflow-hidden transition-all duration-500 ease-in-out"
  //               type="button"
  //             >
  //               <Skeleton className="embla-thumbs__slide__img group-hover:scale-[1.2] transition-all duration-500 ease-in-out" />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  // </SkeletonTheme>

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek?.results} loading={loading} heading="Weekly Trending" link="trending/all" />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Movies" link="trending/movies" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Series" link="trending/tv shows" />
      <MediaSwiper data={data?.getPeopleTrendingWeek?.results} loading={loading} heading="Trending People" link="trending/people" />
    </div>
  )
}

export default HomePage