
import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <h1 className='font-medium text-lg'>Comapny NAME</h1>
      <p className='text-sm text-gray-500'>Location</p>
      <div>
        <h1 className='font-bold text-lg my-2'>JOb title</h1>
        <p className='text-sm text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
       <Badge className="text-blue-700 font-bold" variant="ghost"> 12 Positions</Badge>
       <Badge className="text-[#f83002] font-bold" variant="ghost"> part Time</Badge>
       <Badge className="text-[#7209b7] font-bold" variant="ghost"> 24 lpas</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard
