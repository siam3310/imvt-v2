'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import { handleDownload } from '@/utils/downloadImage'
import { gql, useQuery } from '@apollo/client'
import { Star, Users } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import 'react-loading-skeleton/dist/skeleton.css'

import GetpeoplebyId from '@/graphql/queries/GetpeoplebyId.gql'

import MediaThumbnailComponent from '@/components/Common/MediaThumbnailComponent'

const SinglePeoplePage = ({ id }: { id: string }) => {
  const [basis, setBasis] = useState('50%')

  const Id = id
  const { data, loading } = useQuery(GetpeoplebyId, {
    variables: { Id },
  })
  const peopleData = data?.getpeoplebyId

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width > 600) {
        var newBasis = 100 / Math.floor(width / 200)
      } else {
        var newBasis = 100 / Math.floor(width / 150)
      }
      setBasis(`${newBasis}%`)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) {
    return (
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <div className='w-full flex flex-col gap-4 my-4 h-full overflow-y-scroll'>
          <div className='sm:flex hidden w-full justify-evenly items-center'>
            <Skeleton height={400} width={'30vw'} />
            <Skeleton height={400} width={'50vw'} />
          </div>
          <div className='sm:hidden flex flex-col w-full justify-evenly items-center gap-4'>
            <Skeleton height={400} width={'60vw'} />
            <Skeleton height={400} width={'75vw'} />
          </div>
          <div className='w-full flex justify-evenly items-center'>
            <Skeleton height={600} width={'85vw'} />
          </div>
        </div>
      </SkeletonTheme>
    )
  }

  return (
    <div className='w-full h-[100dvh] overflow-y-scroll'>
      <Card className='flex flex-col sm:flex-row justify-center items-center'>
        <div className='w-full sm:w-1/2 h-[400px] flex flex-col justify-center items-center gap-y-2 p-5'>
          <Image
            className='w-fit h-full rounded-lg object-contain'
            src={peopleData?.profile_path}
            alt={`${peopleData?.name}-profile`}
            width={400}
            height={600}
            loading={'lazy'}
            placeholder={`data:image/${shimmerBlurDataUrl(400, 200)}`}
          />
        </div>

        <div className='w-full sm:w-1/2 h-[400px] overflow-hidden flex flex-col justify-center items-center gap-y-2 p-5'>
          <div className='w-full flex flex-col justify-start items-start gap-y-2'>
            <CardTitle className='text-3xl'>{peopleData?.name}</CardTitle>
            <CardDescription className='text-pretty text-xl'>
              Known for {peopleData?.known_for_department}
            </CardDescription>
            <CardDescription className='text-pretty text-lg'>
              Gender: {peopleData?.gender}
            </CardDescription>
            <CardDescription className='text-pretty text-lg'>
              Dob: {peopleData?.birthday}
            </CardDescription>
            {peopleData?.deathday ? (
              <CardDescription className='text-pretty text-lg'>
                Death: ${peopleData?.deathday}
              </CardDescription>
            ) : null}
            <CardDescription className='text-pretty text-lg'>
              {peopleData?.place_of_birth}
            </CardDescription>
            <CardDescription className='text-pretty text-lg'>
              Also Known as
            </CardDescription>
            <ScrollArea className='max-h-[100px]'>
              {peopleData?.also_known_as.map((akaName: string) => {
                return (
                  <CardDescription className='text-justify text-pretty text-lg'>
                    {akaName}
                  </CardDescription>
                )
              })}
            </ScrollArea>
          </div>
        </div>
      </Card>

      <Card className='w-full py-5 pb-[150px] sm:pb-[30px] sm:px-10'>
        <Tabs defaultValue='biography' className='w-full'>
          <TabsList className='w-full justify-start overflow-x-scroll'>
            <TabsTrigger value='biography'>Biography</TabsTrigger>
            <TabsTrigger value='images'>Images</TabsTrigger>
            <TabsTrigger value='credits'>Credits</TabsTrigger>
          </TabsList>

          <TabsContent value='biography'>
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-justify text-pretty text-lg'>
                  <ScrollArea className='w-full'>
                    {peopleData?.biography}
                  </ScrollArea>
                </CardDescription>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className='w-full' value='images'>
            <Card className='w-full'>
              <div className='relative w-full h-full flex flex-row flex-wrap justify-center sm:justify-start items-start'>
                {peopleData?.images.profiles.map(
                  (image: any, index: number) => (
                    <Card
                      key={index}
                      className='flex flex-col w-fit justify-center items-center gap-y-2 min-w-0 h-fit shrink-0 grow-0 basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 3xl:basis-1/4 p-2'
                    >
                      <CardContent className='p-1 relative w-full h-[400px] flex justify-center items-center'>
                        <div className='absolute opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                          <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                            <Star fill='white' color='white' width={16} />
                            &nbsp;{image.vote_average.toFixed(1)}&nbsp;•&nbsp;
                            <Users fill='white' color='white' width={16} />
                            &nbsp;{image.vote_count}
                          </span>
                        </div>
                        <Image
                          className='w-full h-full object-contain'
                          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                          alt={`${peopleData?.name}-profile-${index + 1}`}
                          width={400}
                          height={200}
                          loading={(index as number) < 10 ? 'eager' : 'lazy'}
                          placeholder={`data:image/${shimmerBlurDataUrl(
                            400,
                            200
                          )}`}
                        />
                      </CardContent>
                      <CardFooter className='w-full h-fit flex justify-center items-center p-0'>
                        <Button
                          onClick={() =>
                            handleDownload(
                              `https://image.tmdb.org/t/p/original${image.file_path}`,
                              `${peopleData?.name}-profile-${index + 1}`
                            )
                          }
                          type='button'
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </Card>
          </TabsContent>
          <TabsContent value='credits'>
            <Tabs defaultValue='cast' className='w-full'>
              <TabsList className='w-fit justify-start'>
                <TabsTrigger value='cast'>Cast</TabsTrigger>
                <TabsTrigger value='crew'>Crew</TabsTrigger>
              </TabsList>

              <TabsContent value='cast'>
                <div className='w-full h-full flex justify-center'>
                  <div className='w-full flex flex-wrap justify-start items-center'>
                    {peopleData?.combined_credits.cast.map(
                      (post: any, index: React.Key | number) => (
                        <div
                          key={index}
                          style={{ flexBasis: basis }}
                          className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}
                        >
                          <MediaThumbnailComponent
                            title={post.name || post.title}
                            id={post.id}
                            link={`/${post.media_type}/${post.id}`}
                            poster={post.poster_path}
                            width={200}
                            height={300}
                            index={index}
                            type={post.title ? 'movie' : 'tv'}
                            title2={`as ${post.character}`}
                          >
                            <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                              Acting
                            </span>
                          </MediaThumbnailComponent>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='crew'>
                <div className='w-full h-full flex justify-center'>
                  <div className='w-full flex flex-wrap justify-start items-center'>
                    {peopleData?.combined_credits.crew.map(
                      (post: any, index: React.Key | number) => (
                        <div
                          key={index}
                          style={{ flexBasis: basis }}
                          className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}
                        >
                          <MediaThumbnailComponent
                            title={post.name || post.title}
                            id={post.id}
                            link={`/${post.media_type}/${post.id}`}
                            poster={post.poster_path}
                            width={200}
                            height={300}
                            index={index}
                            type={post.title ? 'movie' : 'tv'}
                            title2={post.department}
                          >
                            <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                              {post.job}
                            </span>
                          </MediaThumbnailComponent>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default SinglePeoplePage
