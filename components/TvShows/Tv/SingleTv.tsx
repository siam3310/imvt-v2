'use client'

import React from 'react'
import GetTvbyId from '@/graphql/queries/GetTvbyId.gql'
import { gql, useQuery } from '@apollo/client'

import SingleMediaPage from '@/components/Common/SingleMediaPage'

const SingleTv = ({ id }: { id: string }) => {
  const tmdbId = id
  const { data, loading } = useQuery(GetTvbyId, {
    variables: { tmdbId },
  })
  const tvData = data?.getTvbyId

  return (
    <>
      <SingleMediaPage mediaData={tvData} loading={loading} type='tv' />
    </>
  )
}

export default SingleTv
