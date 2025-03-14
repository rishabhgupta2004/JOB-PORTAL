import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 transition hover:shadow-2xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <Avatar>
                    <AvatarImage src={job?.company?.logo || 'https://via.placeholder.com/50'} alt="Company Logo" />
                </Avatar>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location || 'India'}</p>
                </div>
            </div>

            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} Positions</Badge>
                <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.jobType}</Badge>
                <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
            </div>

            <div className='flex gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7] flex items-center gap-2">
                    <Bookmark size={16} />
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
