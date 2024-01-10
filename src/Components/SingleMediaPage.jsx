import React from 'react'
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import { Star, ClockIcon, Users } from "lucide-react";
import MediaDetailsTabs from './MediaDetailsTabs';
import './SingleMediaPage.css';
const query = gql`
query GetMoviebyId($tmdbId: ID!) {
    getMoviebyId(tmdbId: $tmdbId) {
      adult
      backdrop_path
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
      }
      budget
      genres
      homepage
      id
      imdb_id
      original_language
      original_title
      overview
      popularity
      poster_path
      release_date
      revenue
      runtime
      status
      tagline
      title
      video
      vote_average
      vote_count
      production_companies {
        id
        logo_path
        name
        origin_country
      }
      production_countries {
        iso_3166_1
        name
      }
      spoken_languages {
        iso_639_1
        name
      }
      videos {
        results {
          iso_639_1
          iso_3166_1
          name
          key
          published_at
          site
          size
          type
          official
          id
        }
      }
      streamingId
        casts {
          adult
          id
          name
          original_name
          media_type
          popularity
          gender
          known_for_department
          profile_path
          cast_id
          character
          credit_id
          order
        }
        logos {
          url
          aspectRatio
          width
        }
        recommendations {
          id
          title
          image
          type
          rating
          releaseDate
        }
        similar {
          id
          title
          image
          type
          rating
          releaseDate
        }
        reviews {
          author
          content
          created_at
          id
          updated_at
          url
          author_details {
            name
            username
            avatar_path
            rating
          }
        }
    }
  }
`;
const SingleMediaPage = () => {
  const { id } = useParams();
  const tmdbId = id;
  const { data, loading } = useQuery(query, {
    variables: { tmdbId },
  });
  const movieData = data?.getMoviebyId;


  if (loading || !movieData) return <div>Loading...</div>
  return (<>
    <div className='overflow-y-scroll w-full h-[100dvh]'>
      <div className="flex w-full h-[40dvh] sm:h-[100dvh] movie-backdrop sm:bg-fixed" style={{ backgroundImage: `URL(${movieData?.backdrop_path})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}>
      </div>
      <div className='flex flex-col gap-y-5 lg:gap-y-14'>
        <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
          <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex justify-center'>
            <img className='min-w-[150px] w-[40%] sm:w-[60%] lg:w-[50%] poster-box-shadow' src={movieData?.poster_path} alt="no image" />
          </div>
          <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5'>
            <h1 className='text-[2rem] lg:text-[2.5rem] font-bold'>{movieData?.title}</h1>
            <h2 className='text-[1.2rem] font-serif'>{movieData?.tagline}</h2>
            <div className='flex flex-wrap items-center gap-3 mt-3'>
              {movieData?.adult && <span className='bg-red-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                NSFW
              </span>}
              <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                <Star fill="white" color='white' width={16} />&nbsp;{parseFloat(movieData?.vote_average).toFixed(1)}&nbsp;•&nbsp;<Users fill="white" color='white' width={16} />&nbsp;{movieData?.vote_count}
              </span>
              <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                {new Date(movieData?.release_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                <ClockIcon color='white' width={16} />&nbsp;{movieData?.runtime % 60 === 0 ? `${movieData?.runtime}m` : `${Math.floor(movieData?.runtime / 60)}h ${movieData?.runtime % 60}m`}
              </span>
              {movieData?.genres.map((genre, index) => (
                <span key={index} className='bg-green-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                  {genre}
                </span>
              ))}
              <p className='text-lg hidden lg:block'>{movieData?.overview}</p>
            </div>
          </div>
        </div>
        <p className='text-lg text-white px-3 sm:px-10 lg:hidden'>{movieData?.overview}</p>
        <div className='flex justify-center'><MediaDetailsTabs movieData={movieData} /></div>
      </div>
    </div>
  </>
  )
}

export default SingleMediaPage