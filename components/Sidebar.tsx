"use client"
import { MoreVertical, HomeIcon, Tv, ExternalLink, Clapperboard, Film, PanelRightClose, PanelLeftClose, XCircle, Compass } from "lucide-react";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/custom-sidebar-nav-menu"
import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { shimmerBlurDataUrl } from "@/utils/blurDataUrl";
const SidebarContext = createContext({
  expanded: false,
});

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hideSidebar, setHideSidebar] = useState<boolean>(false);
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]
  return (
    <aside className={`h-[100dvh] text-black`}>
      {hideSidebar && (
        <button
          onClick={() => {
            setHideSidebar((curr) => !curr);
            setExpanded(false);
          }}
          className={`absolute top-4 left-4 z-10 clickable p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100`}
        >
          <PanelRightClose />
        </button>
      )}
      <nav className={`h-[100dvh] z-100 flex flex-col shadow-sm bg-[#0b0b0b] ${expanded && "absolute z-[100000] top-0 left-0 bg-[#0b0b0b]"} ${hideSidebar ? "absolute z-10 top-0 right-[100vw] bg-[#151517]" : "lg:static "}`}>
        <div className={`p-4 flex justify-between items-center`}>
          <Link href={`/`}>
            <Image
              src={Logo}
              className={`clickable transition-all rounded-lg bg-gray-50 hover:bg-gray-100 object-cover aspect-[1.5/1] ${expanded ? "w-28" : "w-0"
                }`}
              alt="Logo"
              width={150}
              height={100}
              loading={"eager"}
            />
          </Link>
          <div className="flex gap-x-3">
            {expanded && <button onClick={() => setExpanded(false)} className={`clickable p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100`}>
              <PanelLeftClose />
            </button>}
            <button
              onClick={() => {
                if (expanded) { setHideSidebar(true); setExpanded(false) }
                else setExpanded(true)
              }}
              className={`clickable p-1 rounded-lg bg-gray-50 hover:bg-gray-100`}
            >
              {expanded ? <XCircle /> : <Image
                src={Logo}
                className={`overflow-hidden transition-all w-8 h-8 object-cover`}
                alt="Logo"
                width={50}
                height={50}
                loading={"eager"}
              />}
            </button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <NavigationMenu>
            <NavigationMenuList className="flex-1 px-3 flex flex-col justify-center gap-y-3">

              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><SidebarItem link="/" text="Home" icon={<HomeIcon />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[500px] grid-cols-[.75fr_1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://e1.pxfuel.com/desktop-wallpaper/574/383/desktop-wallpaper-movie-poster-mix-of-movies.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />Imvt Home
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Homapage of this website
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/trending/all" title="Weekly Trending">
                      Discover what&apos;s trending this week
                    </ListItem>
                    <ListItem href="/trending/movies" title="Trending Movies">
                      Explore the most popular movies
                    </ListItem>
                    <ListItem href="/trending/tv-shows" title="Trending TV Shows">
                      Browse trending TV shows
                    </ListItem>
                    <ListItem href="/trending/people" title="Trending People">
                      Learn about trending personalities
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


              {/* Explore */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><SidebarItem link="/search" text="Search" icon={<Compass />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[500px] grid-cols-[1fr_1fr]">
                    <li >
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full min-h-[300px]">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://i.ebayimg.com/images/g/Xs4AAOSw8GJcpfD0/s-l1200.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/search"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />Search
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Search movies, TV shows, and personalities by entering their names in the search bar.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li >
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full min-h-[300px]">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://previews.123rf.com/images/kentoh/kentoh1005/kentoh100500488/6955744-movie-poster-of-film-genres-vintage-background.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/explore"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />Explore
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Discover movies and TV shows with filters for a more tailored viewing experience.
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
                <NavigationMenuTrigger><SidebarItem link="/movies" text="Movies" icon={<Clapperboard />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[500px] grid-cols-[0.75fr_1.25fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/explore"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />Movies
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Uncover movies that match your preferences using our custom filters
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/movies/trending" title="Trending Now">
                      Dive into the movies that are making waves right now
                    </ListItem>
                    <ListItem href="/movies/popular" title="What&apos;s Popular">
                      Check out the movies that everyone&apos;s talking about
                    </ListItem>
                    <ListItem href="/movies/top-rated" title="Top Rated">
                      Browse through the highest-rated TV shows
                    </ListItem>
                    <ListItem href="/movies/upcoming" title="Upcoming">
                      Get a sneak peek at the most anticipated upcoming movies
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


              {/* TV Shows */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><SidebarItem link="/tv-shows" text="TV Shows" icon={<Film />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[500px] grid-cols-[0.75fr_1.25fr]">
                    <li className="row-span-5">
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://image.tmdb.org/t/p/original/63FA8vwSZnXkGxedrDQwni4JuZN.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/explore"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />TV Shows
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Discover TV shows that align with your taste using our custom filters
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/tv-shows/airing-today" title="Airing Today">
                      Catch the TV shows airing today
                    </ListItem>
                    <ListItem href="/tv-shows/on-the-air" title="On the Air">
                      Explore the airing TV shows
                    </ListItem>
                    <ListItem href="/tv-shows/trending" title="Trending Now">
                      Browse the Top Rated TV shows
                    </ListItem>
                    <ListItem href="/tv-shows/popular" title="What&apos;s Popular">
                      Discover the popular TV shows
                    </ListItem>
                    <ListItem href="/tv-shows/top-rated" title="Top Rated">
                      Preview the upcoming TV shows
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Trending */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger><SidebarItem link="/trending" text="Trending" icon={<Flame />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI and
                            Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}


              {/* Iptv */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><SidebarItem link="/iptv" text="Live TV" icon={<Tv />} /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[300px] grid-cols-[1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <div className="relative h-full w-full min-h-[300px]">
                          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-[2] pointer-events-none"></div>
                          <Link
                            style={{ backgroundImage: `URL(https://c4.wallpaperflare.com/wallpaper/865/705/243/abstract-dove-colorful-butterfly-wallpaper-preview.jpg)`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}
                            className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                            href="/iptv"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium z-[3]">
                              <ExternalLink />Live TV
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground z-[3]">
                              Tune in to real-time broadcasts from around the world.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


              {/* <SidebarItem link="/iptv" text="Live TV" icon={<Tv />} /> */}
              {/* <SidebarItem link="/trending" text="Trending" icon={<Flame />} /> */}
              {/* <SidebarItem link="/search" text="Search" icon={<Search />} />
              <SidebarItem link="/movies" text="Movies" icon={<Clapperboard />} />
              <SidebarItem link="/tv-shows" text="TV Shows" icon={<Film />} /> */}
            </NavigationMenuList>
          </NavigationMenu>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Image
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Vishwajeet%20Yadav"
            className="w-10 h-10 rounded-md clickable"
            alt={`user pfp`}
            width={100}
            height={100}
            loading={"lazy"}
            placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white clickable">Vishwajeet Yadav</h4>
              <span className="text-xs text-white clickable">vishwajeety14122@gmail.com</span>
            </div>
            <MoreVertical size={20} color="white" className="clickable" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={props.href || '/'}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center space-x-2"><ExternalLink />&nbsp;&nbsp;{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function SidebarItem({ icon, text, active, alert, link }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={link}
      className={`z-[2]
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors clickable group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? "w-56 ml-3" : "w-0"}
          `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}
          `}
        />
      )}

      {/* {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 whitespace-nowrap py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )} */}
    </Link>
  );
}

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  link: string;
}
