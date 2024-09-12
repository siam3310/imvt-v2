import React, { useEffect, useState } from 'react';
import DiscoverMedia from '@/graphql/queries/DiscoverMedia.gql';
import { gql, useQuery } from '@apollo/client';

import MediaGrid from '@/components/Common/MediaGrid';
import PaginationComponent from '@/components/Common/PaginationComponent';

const ExploreResults = ({
  type,
  dategte,
  datelte,
  votesAvglte,
  votesAvggte,
  votesCountlte,
  votesCountgte,
  sort,
  genres,
  page,
  setPage,
}: {
  type: string;
  dategte: string;
  datelte: string;
  votesAvglte: number | undefined;
  votesAvggte: number | undefined;
  votesCountlte: number | undefined;
  votesCountgte: number | undefined;
  sort: string;
  genres: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data, loading } = useQuery(DiscoverMedia, {
    variables: {
      type,
      dategte,
      datelte,
      votesAvglte,
      votesAvggte,
      votesCountlte,
      votesCountgte,
      sort,
      genres,
      page,
    },
  });

  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false,
    total_results: 0,
    total_pages: 0,
    currentPage: 0,
  });
  useEffect(() => {
    setMediaData(data?.discoverMedia);
  }, [data, page]);

  return (
    <>
      <div className='w-full flex flex-col gap-y-3'>
        {mediaData?.total_results ? (
          <h1 className='text-white text-start font-semibold text-[1rem] pl-5'>
            {mediaData?.total_results} results found
          </h1>
        ) : null}
        <div className='w-full h-full'>
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent
            mediaData={mediaData}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default ExploreResults;
