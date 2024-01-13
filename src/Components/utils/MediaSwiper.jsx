import * as React from "react"
import { Link } from 'react-router-dom'
import { Star, PlayCircle, ExternalLink } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"

export default function MediaSwiper({ data, loading, heading, upcoming, link }) {
    const [basis, setBasis] = React.useState('50%'); // initial basis

    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 600) {
                var newBasis = 100 / Math.floor(width / 200);
            } else {
                var newBasis = 100 / Math.floor(width / 160);
            }
            setBasis(`${newBasis}%`);
        };

        // Attach resize listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (!data) return <div>Loading...</div>

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full flex flex-col h-fit gap-y-5 pl-3 pr-5"
        >
            <div>
                <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] text-white font-bold pt-5 mb-3 overflow-hidden whitespace-nowrap text-ellipsis'>{heading}</h1>
                <Link to={link} ><span className='clickable bg-white px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md text-black font-normal rounded-xl'>View more</span></Link>
            </div>
            <CarouselContent className="">
                {data[0]?.profile_path ? data?.map((post, index) => (
                    <CarouselItem key={index} style={{ flexBasis: basis }} className={`pl-5 relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit`}>
                        <div className="group clickable" key={index}>
                            <Link to={`/people/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                                <span className="z-[3] clickable"><ExternalLink size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                            </Link>
                            <span className='bg-yellow-500 text-white absolute top-1 left-6 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                {(post.known_for_department === "Acting" && "Actor") || (post.known_for_department === "Writing" && "Writer") || (post.known_for_department === "Directing" && "Director") || (post.known_for_department === "Production" && "Producer") || post.known_for_department}
                            </span>
                            <div className='w-full h-full'>
                                <img
                                    className="rounded-t-md overflow-hidden group-hover:cursor-pointer group-hover:blur relative group-hover:scale-90 h-full aspect-[2/3] transition-all duration-300 ease-in-out"
                                    src={post.profile_path}
                                    alt="Your alt text"
                                />
                                <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name}>{post.name}</h2>
                            </div>
                        </div>
                    </CarouselItem>
                )) : data?.map((post, index) => (<CarouselItem key={index} style={{ flexBasis: basis }} className={`pl-5 relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit`}>
                    <div className="group clickable" key={index}>
                        <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                            <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                        </Link>
                        {!upcoming && <span className='bg-yellow-500 text-white absolute top-1 left-6 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                            <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.vote_average).toFixed(1)}
                        </span>}
                        {upcoming && <span className='bg-yellow-500 text-white absolute top-1 left-6 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                            {new Date(post.release_date || post.air_date || post.first_air_date).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>}
                        <div className='w-full h-fulll'>
                            <div className="aspect-[2/3]">
                                <img
                                    className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                    src={post.poster_path}
                                    alt="Your alt text"
                                />
                            </div>
                            <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                        </div>
                    </div>
                </CarouselItem>))}
            </CarouselContent>
            <div className="absolute right-16 top-20">
                <CarouselPrevious className="right-1 top-1/2 -translate-y-1/2" />
                <CarouselNext className="left-0 top-1/2 -translate-y-1/2" />
            </div>

        </Carousel >
    )
}
