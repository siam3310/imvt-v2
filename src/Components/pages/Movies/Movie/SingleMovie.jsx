import React from 'react'
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import SingleMediaPage from '../../../utils/SingleMediaPage';
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
const SingleMovie = () => {
  const { id } = useParams();
  const tmdbId = id;
  const { data, loading } = useQuery(query, {
    variables: { tmdbId },
  });
  const movieData = data?.getMoviebyId;
  console.log(data);

  return (<>
    <SingleMediaPage mediaData={movieData} loading={loading} type="movie" />
  </>
  )
}

export default SingleMovie