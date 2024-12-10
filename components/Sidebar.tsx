'use client'

import React, { createContext, useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/public/assets/logo.svg'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import {
  Clapperboard,
  Compass,
  ExternalLink,
  Film,
  HomeIcon,
  LogIn,
  MoreVertical,
  PanelLeftClose,
  PanelRightClose,
  Tv,
  XCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/custom-sidebar-nav-menu'
import { ProfilePopover } from '@/components/user/ProfilePopover'

const SidebarContext = createContext({ expanded: false })

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [hideSidebar, setHideSidebar] = useState<boolean>(false)
  const { userData, loading } = useAuthenticatedUser()
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/signup') return <></>

  return (
    <aside
      className={`h-[100dvh] dark:text-white bg-[#dcdad7] dark:bg-[#0b0b0b]`}
    >
      {hideSidebar && (
        <button
          onClick={() => {
            setHideSidebar((curr) => !curr)
            setExpanded(false)
          }}
          className={`absolute top-4 left-4 z-10 clickable p-1.5 rounded-lg bg-gray-50 dark:text-black hover:bg-gray-100`}
        >
          <PanelRightClose />
        </button>
      )}
      <nav
        className={`h-[100dvh] z-100 flex flex-col shadow-sm bg-[#dcdad7] dark:bg-[#0b0b0b] ${
          expanded && 'absolute z-[100000] top-0 left-0 '
        } ${hideSidebar ? 'absolute z-10 top-0 right-[100vw]' : 'lg:static '}`}
      >
        <div className={`p-4 flex justify-between items-center`}>
          <Link href={`/`}>
            <Image
              src={Logo}
              className={`clickable transition-all rounded-lg bg-gray-50 hover:bg-gray-100 object-cover aspect-[1.5/1] ${
                expanded ? 'w-28 img-3d-shine' : 'w-0'
              }`}
              alt='Logo'
              width={150}
              height={100}
              loading={'eager'}
            />
          </Link>
          <div className='flex gap-x-3'>
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className={`clickable p-1.5 rounded-lg bg-gray-50 dark:text-black hover:bg-gray-100`}
              >
                <PanelLeftClose />
              </button>
            )}
            <button
              onClick={() => {
                if (expanded) {
                  setHideSidebar(true)
                  setExpanded(false)
                } else setExpanded(true)
              }}
              className={`clickable p-1 rounded-lg bg-gray-50 dark:text-black hover:bg-gray-100`}
            >
              {expanded ? (
                <XCircle />
              ) : (
                <Image
                  src={Logo}
                  className={`overflow-hidden transition-all w-8 h-8 object-cover`}
                  alt='Logo'
                  width={50}
                  height={50}
                  loading={'eager'}
                />
              )}
            </button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <NavigationMenu>
            <NavigationMenuList className='flex-1 px-3 flex flex-col justify-center gap-y-3'>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <SidebarItem
                    links={[
                      '/',
                      '/trending/all',
                      '/trending/movies',
                      '/trending/tv-shows',
                      '/trending/people',
                    ]}
                    text='Home'
                    icon={<HomeIcon />}
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 w-[500px] grid-cols-[.75fr_1fr]'>
                    <li className='row-span-4'>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://e1.pxfuel.com/desktop-wallpaper/574/383/desktop-wallpaper-movie-poster-mix-of-movies.jpg)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              Imvt Home
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Homapage of this website
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href='/trending/all' title='Weekly Trending'>
                      Discover what&apos;s trending this week
                    </ListItem>
                    <ListItem href='/trending/movies' title='Trending Movies'>
                      Explore the most popular movies
                    </ListItem>
                    <ListItem
                      href='/trending/tv-shows'
                      title='Trending TV Shows'
                    >
                      Browse trending TV shows
                    </ListItem>
                    <ListItem href='/trending/people' title='Trending People'>
                      Learn about trending personalities
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Explore */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <SidebarItem
                    links={['/search', '/explore']}
                    text='Search'
                    icon={<Compass />}
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 w-[500px] grid-cols-[1fr_1fr]'>
                    <li>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full min-h-[300px]'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://help.apple.com/assets/66E35283F4657A2118066184/66E3528772AEC8C5E2071904/en_US/d008b3d64c1c096eb4ab1fa1ed629129.png)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/search'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              Search
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Search movies, TV shows, and personalities by
                              entering their names in the search bar.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full min-h-[300px]'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://previews.123rf.com/images/kentoh/kentoh1005/kentoh100500488/6955744-movie-poster-of-film-genres-vintage-background.jpg)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/explore'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              Explore
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Discover movies and TV shows with filters for a
                              more tailored viewing experience.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Movies */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <SidebarItem
                    links={[
                      '/movies',
                      '/movies/trending',
                      '/movies/popular',
                      '/movies/top-rated',
                      '/movies/upcoming',
                    ]}
                    text='Movies'
                    icon={<Clapperboard />}
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 w-[500px] grid-cols-[0.75fr_1.25fr]'>
                    <li className='row-span-4'>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/explore'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              Movies
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Uncover movies that match your preferences using
                              our custom filters
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href='/movies/trending' title='Trending Now'>
                      Dive into the movies that are making waves right now
                    </ListItem>
                    <ListItem href='/movies/popular' title="What's Popular">
                      Check out the movies that everyone&apos;s talking about
                    </ListItem>
                    <ListItem href='/movies/top-rated' title='Top Rated'>
                      Browse through the highest-rated TV shows
                    </ListItem>
                    <ListItem href='/movies/upcoming' title='Upcoming'>
                      Get a sneak peek at the most anticipated upcoming movies
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* TV Shows */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <SidebarItem
                    links={[
                      '/tv-shows',
                      '/tv-shows/trending',
                      '/tv-shows/popular',
                      '/tv-shows/top-rated',
                      '/tv-shows/on-the-air',
                      '/tv-shows/airing-today',
                    ]}
                    text='TV Shows'
                    icon={<Film />}
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 w-[500px] grid-cols-[0.75fr_1.25fr]'>
                    <li className='row-span-5'>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://image.tmdb.org/t/p/original/63FA8vwSZnXkGxedrDQwni4JuZN.jpg)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/explore'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              TV Shows
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Discover TV shows that align with your taste using
                              our custom filters
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href='/tv-shows/airing-today'
                      title='Airing Today'
                    >
                      Catch the TV shows airing today
                    </ListItem>
                    <ListItem href='/tv-shows/on-the-air' title='On the Air'>
                      Explore the airing TV shows
                    </ListItem>
                    <ListItem href='/tv-shows/trending' title='Trending Now'>
                      Browse the Top Rated TV shows
                    </ListItem>
                    <ListItem href='/tv-shows/popular' title="What's Popular">
                      Discover the popular TV shows
                    </ListItem>
                    <ListItem href='/tv-shows/top-rated' title='Top Rated'>
                      Preview the upcoming TV shows
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Iptv */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <SidebarItem links={['/iptv']} text='Live TV' icon={<Tv />} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 w-[300px] grid-cols-[1fr]'>
                    <li className='row-span-4'>
                      <NavigationMenuLink asChild>
                        <div className='relative h-full w-full min-h-[300px]'>
                          <div className='absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none'></div>
                          <Link
                            style={{
                              backgroundImage: `URL(https://c4.wallpaperflare.com/wallpaper/865/705/243/abstract-dove-colorful-butterfly-wallpaper-preview.jpg)`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `center`,
                              backgroundSize: `cover`,
                            }}
                            className='relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                            href='/iptv'
                          >
                            <div className='mb-2 mt-4 text-lg font-medium z-[3]'>
                              <ExternalLink />
                              Live TV
                            </div>
                            <p className='text-sm leading-tight text-muted-foreground z-[3]'>
                              Tune in to real-time broadcasts from around the
                              world.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SidebarContext.Provider>

        {userData || loading ? (
          <ProfilePopover userData={userData}>
            <div className='border-t flex p-3 text-black dark:text-white'>
              <Image
                src={
                  userData?.profile_photo || 'https://via.placeholder.com/150'
                }
                className='w-10 h-10 rounded-md clickable object-cover'
                alt={`user pfp`}
                width={100}
                height={100}
                loading={'lazy'}
                placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
              />
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
              >
                <div className='leading-4'>
                  <h4 className='font-semibold clickable'>{userData?.name}</h4>
                  <span className='text-xs clickable'>{userData?.email}</span>
                </div>

                <MoreVertical size={20} className='clickable' />
              </div>
            </div>
          </ProfilePopover>
        ) : (
          <Link
            className='p-1 flex items-center justify-center w-full'
            href='/login'
          >
            {expanded ? (
              <Button className='w-full'>
                Sign In&nbsp;&nbsp;
                <LogIn size={20} />
              </Button>
            ) : (
              <Button>
                <LogIn size={20} />
              </Button>
            )}{' '}
          </Link>
        )}
      </nav>
    </aside>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  const pathname = usePathname()
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
            className
          )}
          href={props.href || '/'}
          {...props}
        >
          <div className='text-sm font-medium leading-none flex items-center space-x-2'>
            <ExternalLink />
            &nbsp;&nbsp;{title}
          </div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  links,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)
  const pathname = usePathname()

  return (
    <Link
      href={links[0]}
      className={`z-[2]
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors clickable group
         ${links.includes(pathname) && 'bg-indigo-50'}
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all ${
          expanded ? 'w-56 ml-3' : 'w-0'
        }
          `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? '' : 'top-2'
          }
          `}
        />
      )}
    </Link>
  )
}

interface SidebarItemProps {
  icon: JSX.Element
  text: string
  active?: boolean
  alert?: boolean
  links: string[]
}
