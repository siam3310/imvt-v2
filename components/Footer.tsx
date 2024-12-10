import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='dark:text-white dark:bg-gradient-to-b from-[#151516] to-black py-6 sm:py-8 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Disclaimer</h3>
            <p className='text-sm sm:text-base'>
              IMVT is an educational project aggregating information about
              movies, TV shows, anime, and live TV from various public APIs.
              This website is for educational and demonstration purposes only.
              We do not host, distribute, or profit from any copyrighted
              content.
            </p>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Copyright Notice</h3>
            <p className='text-sm sm:text-base'>
              All content displayed on this website is the property of their
              respective owners. IMVT does not claim ownership of any content
              shown here. If you believe your copyrighted work has been used
              inappropriately, please contact us for prompt removal.
            </p>
          </div>
        </div>
        <div className='mt-6 sm:mt-8 pt-4 border-t border-gray-700 text-sm sm:text-base text-center'>
          <p>&copy; {currentYear} IMVT. All rights reserved.</p>
          <p className='mt-2'>
            For removal requests or inquiries, please{' '}
            <Link
              href='mailto:generatedbybot@gmail.com'
              className='text-blue-400 hover:underline'
            >
              contact us via email
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
