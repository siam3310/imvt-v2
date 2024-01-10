import * as React from "react"
import { Link } from 'react-router-dom'
import { Star, ExternalLink } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"

export default function MediaSwiper({ data, loading, heading, upcoming }) {
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

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full flex flex-col h-fit gap-y-5"
        >
            <div>
                <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] text-white font-bold ml-6 pt-5 mb-3 overflow-hidden whitespace-nowrap text-ellipsis'>{heading}</h1>
                <span className='clickable bg-white px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md text-black font-normal rounded-xl ml-6'>View more</span>
            </div>
            <CarouselContent className="-px-2 mx-3">
                {data[0].profile_path ? data?.map((post, index) => (
                    <CarouselItem key={index} style={{ flexBasis: basis }} className={`px-2 min-w-0 shrink-0 grow-0 basis-1/2 h-fit`}>
                        <div className="clickable aspect-[2/3]" key={index}>
                            <img
                                className="rounded-2xl"
                                src={post.profile_path}
                                alt="Your alt text"
                            />

                        </div>
                    </CarouselItem>
                )) : data?.map((post, index) => (<CarouselItem key={index} style={{ flexBasis: basis }} className={`px-2 min-w-0 shrink-0 grow-0 basis-1/2 h-fit`}>
                    <div className="clickable group" key={index}>
                        <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className='clickable aspect-[2/3]'>
                            <img
                                className="rounded-2xl"
                                src={post.poster_path}
                                alt="Your alt text"
                            />
                        </Link>
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
