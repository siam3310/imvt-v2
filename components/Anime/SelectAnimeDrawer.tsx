import * as React from 'react'
import { GetAnimebyQuery } from '@/graphql/queries/GetAnime.gql'
import { useQuery } from '@apollo/client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import MediaGrid from '@/components/Common/MediaGrid'

const SelectAnimeDrawer = ({
  children,
  animeQuery,
}: {
  children: React.ReactNode
  animeQuery: string
}) => {
  const { data, loading, error } = useQuery(GetAnimebyQuery, {
    variables: {
      query: animeQuery,
    },
  })
  const AnimeData = data?.getAnimebyQuery
  // console.log(AnimeData)
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='overflow-hidden max-h-[80dvh] z-[11111111111111111]'>
        <DrawerHeader>
          <DrawerTitle className='text-center text-xl'>
            Select the Anime
          </DrawerTitle>
        </DrawerHeader>
        <div className='w-full h-full overflow-scroll'>
          <MediaGrid mediaData={AnimeData} loading={loading} type='anime' />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='default'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectAnimeDrawer
