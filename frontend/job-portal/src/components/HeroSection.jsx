import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
      <div className='gap-5 my-10'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#f89330] font-medium'>
          No. 1 Job Hunt Website
        </span>
        <h1 className='text-5xl my-10 font-bold'>
          Search, Apply & <br /> Get your{' '}
          <span className='text-[#6A38C2]'>Dream Jobs Here</span>
        </h1>
      </div>
      <p className='mb-8 text-gray-500'>
        Start your journey with the best job portal to land your dream job effortlessly.
      </p>
      
      <div className='flex w-[40%] max-w-full shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input
          type='text'
          placeholder='Find your dream jobs'
          aria-label='Job Search'
          className='outline-none border-none w-full p-3 text-sm'
        />
        <Button className='rounded-r-full bg-[#6A38C2] hover:bg-[#5a2ea1]'>
          <Search className='h-5 w-5 text-white' />
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
