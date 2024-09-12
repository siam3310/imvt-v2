import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <section className='flex w-full h-[100dvh] items-center p-16 dark:bg-black dark:text-gray-100'>
      <div className='container h-full flex flex-col items-center justify-center px-5 mx-auto py-8 sm:mb-0 mb-[150px]'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl dark:text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className='mt-4 mb-8 dark:text-gray-400'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel='noopener noreferrer'
            href='/'
            className='px-8 py-3 font-semibold rounded dark:bg-white dark:text-gray-900'
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
