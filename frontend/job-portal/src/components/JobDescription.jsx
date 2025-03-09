import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
  const isApplied = true

  return (
    <div className="bg-white rounded-lg shadow-md max-w-7xl mx-auto my-10 p-6">
      {/* Job Title & Details */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold mb-2">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">Positions</Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">Part-time</Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">LPA</Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="text-right">
          <Button
            className={`mt-4 rounded-lg text-white px-4 py-2 ${
              isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5e0c92]'
            }`}
            disabled={isApplied}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="mt-6">
        <h2 className="border-b-2 border-gray-300 font-medium pb-2">Job Description</h2>
        <div className="mt-3 space-y-2 text-gray-800">
          <p><span className="font-bold">Role:</span> Frontend Developer</p>
          <p><span className="font-bold">Location:</span> Noida</p>
          <p><span className="font-bold">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><span className="font-bold">Experience:</span> 5 years</p>
          <p><span className="font-bold">Salary:</span> 12 LPA</p>
          <p><span className="font-bold">Total Applicants:</span> 500</p>
          <p><span className="font-bold">Posted Date:</span> 17-07-2024</p>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
