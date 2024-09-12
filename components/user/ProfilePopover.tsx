import Image from 'next/image';
import Link from 'next/link';
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl';

import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function ProfilePopover({
  userData,
  children,
}: {
  userData: any;
  children: any;
}) {
  const { handleSignOut } = useAuthenticatedUser();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80 z-[11111111111111]'>
        <div className='grid gap-2'>
          <Link
            href='/my-profile'
            className='w-full justify-start items-start flex gap-x-2'
          >
            <Image
              src={userData?.profile_photo || 'https://via.placeholder.com/150'}
              className='w-[50%] aspect-square rounded-md clickable object-cover'
              alt={`user pfp`}
              width={100}
              height={100}
              loading={'lazy'}
              placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
            />
            <div className='flex flex-col items-start justify-start max-w-[75%]'>
              <h2 className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                {userData?.name}
              </h2>
              <h2 className='text-md font-light whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                {userData?.email}
              </h2>
            </div>
          </Link>
          <Link href='/my-profile'>
            <Button className='w-full'>Your Profile</Button>
          </Link>
          <Link href='/watchlist'>
            <Button className='w-full'>Watchlist</Button>
          </Link>
          <Button
            variant={'destructive'}
            onClick={handleSignOut}
            className='w-full'
          >
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
