import React from 'react'
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import SingleMediaPage from '../../../utils/SingleMediaPage';
const query = gql`
query GetTvbyId($tmdbId: ID!) {
    getTvbyId(tmdbId: $tmdbId) {
      adult
      backdrop_path
      genres
      id
      original_language
      original_name
      overview
      poster_path
      first_air_date
      status
      tagline
      name
      vote_average
      vote_count
      spoken_languages {
        iso_639_1
        name
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
      trailer {
        id
        url
      }

      type
      seasons {
        season
        image {
          mobile
          hd
        }
        episodes {
          id
          title
          episode
          Season
          releaseDate
          description
          url
          img {
            mobile
            hd
          }
        }
        isReleased
      }
      last_air_date
      last_episode_to_air {
        id
        name
        overview
        vote_average
        vote_count
        air_date
        episode_number
        episode_type
        production_code
        runtime
        season_number
        show_id
        still_path
      }
      languages
      number_of_seasons
      number_of_episodes
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
    }
  }
`;
const SingleTv = () => {
  const { id } = useParams();
  const tmdbId = id;
  const { data, loading } = useQuery(query, {
    variables: { tmdbId },
  });
  const tvData = data?.getTvbyId;

  return (<>
    <SingleMediaPage mediaData={tvData} loading={loading} type="tv" />
  </>
  )
}

export default SingleTv