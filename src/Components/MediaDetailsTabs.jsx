import React from "react"
import { Link } from 'react-router-dom'
import { Star, PlayCircle, ExternalLink } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import MediaVideos from "./MediaVideos"
export default function MediaDetailsTabs({ mediaData, type }) {
  const [basis, setBasis] = React.useState('50%'); // initial basis

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 600) {
        var newBasis = 100 / Math.floor(width / 200);
      } else {
        var newBasis = 100 / Math.floor(width / 100);
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
    <Tabs defaultValue="casts" className="w-[95%] sm:w-[90%] dark mb-10">


      <TabsList className=" w-full flex justify-start overflow-scroll">
        <TabsTrigger value="casts">Casts</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        {mediaData?.similar && <TabsTrigger value="similar">Similar</TabsTrigger>}
        {mediaData?.recommendations && <TabsTrigger value="recommendations">Recommendations</TabsTrigger>}
        {mediaData?.reviews && mediaData?.reviews.length > 0 && <TabsTrigger value="reviews">Reviews</TabsTrigger>}
      </TabsList>


      <TabsContent value="videos" className="rounded-3xl">
        <MediaVideos mediaData={mediaData} type={type} />
      </TabsContent>


      <TabsContent value="casts" className="p-5 max-h-[85dvh] overflow-y-scroll">
        <div className="flex flex-wrap justify-between items-center gap-y-5">
          {mediaData?.casts.map((cast, index) => (<div key={index} className="flex items-center gap-x-5 w-[100%] sm:w-[50%] lg:w-[33%]">
            <img className="rounded-full w-24 h-24 aspect-square object-cover" src={cast.profile_path !== "https://image.tmdb.org/t/p/originalnull" ? cast.profile_path : "https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"} alt="cast image" />
            <div className="flex flex-col justify-start items-start text-white gap-y-1">
              <h3 className="text-lg font-bold text-[#5179ff]">{cast.name || cast.original_name}</h3>
              <h2 className="text-md font-semibold font-sans">as {cast.character}</h2>
              <h3 className="text-sm">{(cast.known_for_department === "Acting" && "Actor") || (cast.known_for_department === "Writing" && "Writer") || (cast.known_for_department === "Directing" && "Director") || (cast.known_for_department === "Production" && "Producer") || cast.known_for_department}</h3>
            </div>
          </div>)
          )}
        </div>
      </TabsContent>


      {mediaData?.similar && <TabsContent value="similar">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-wrap justify-start items-center">
            {mediaData?.similar.map((post, index) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
              <div className="group clickable" key={index}>
                <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                  <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                </Link>
                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                  <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.rating).toFixed(1)}
                </span>
                <div className='w-full h-fulll'>
                  <div className="aspect-[2/3]">
                    <img
                      className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                      src={post.image}
                      alt="Your alt text"
                    />
                  </div>
                  <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                </div>
              </div>
            </div>)
            )}
          </div>
        </div>
      </TabsContent>}


      {mediaData?.recommendations && <TabsContent value="recommendations">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-wrap justify-start items-center">
            {mediaData?.recommendations.map((post, index) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
              <div className="group clickable">
                <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                  <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                </Link>
                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                  <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.rating).toFixed(1)}
                </span>
                <div className='w-full h-fulll'>
                  <div className="aspect-[2/3]">
                    <img
                      className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                      src={post.image}
                      alt="Your alt text"
                    />
                  </div>
                  <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                </div>
              </div>
            </div>)
            )}
          </div>
        </div>
      </TabsContent>}


      {mediaData?.reviews && mediaData?.reviews.length > 0 && <TabsContent value="reviews" className="p-5 max-h-[85dvh] overflow-y-scroll">
        <div className="flex flex-wrap justify-between items-center gap-y-5">
          {mediaData?.reviews.map((review, index) => (
            <div key={index} className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-x-5 w-[100%] h-fit">
              <div className="flex flex-col items-center justify-start h-full w-[90%] sm:w-1/3">
                <img className="rounded-full min-w-24 min-h-24 max-w-24 max-h-24 aspect-square object-cover" src={review.author_details.avatar_path ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : "https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"} alt="user image" />
                <h3 className="text-lg font-bold text-[#5179ff]">{review.author_details.username}</h3>
                <h2 className="text-md font-semibold text-white font-sans">{review.author_details.author || review.author}</h2>
                <span className=' text-white font-mono py-[2px] px-2 text-[1rem] rounded-3xl whitespace-nowrap flex items-center'>
                  Rated {review.author_details.rating} out of 10
                </span>
              </div>
              <div className="flex flex-col w-[90%] sm:w-2/3 justify-start items-start text-white gap-y-1">
                <h3 className="text-sm max-h-[200px] overflow-hidden">{review.content}</h3>
              </div>
            </div>)
          )}
        </div>
      </TabsContent>}


    </Tabs>
  )
}
