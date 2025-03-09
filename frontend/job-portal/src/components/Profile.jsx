import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'

const skills = ["HTML", "CSS", "Python", "React"]

const Profile = () => {
  const isResume = true

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8'>
        
        {/* Profile Header */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://i.pinimg.com/564x/05/5a/91/055a91979264664a1ee12b9453610d82.jpg" alt="avatar" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>FULL NAME</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, repudiandae.</p>
            </div>
          </div>
          <Button variant="outline"><Pen /></Button>
        </div>

        {/* Contact Details */}
        <div className='mt-6 space-y-3'>
          <div className='flex items-center gap-4'>
            <Mail />
            <span>email@example.com</span>
          </div>
          <div className='flex items-center gap-4'>
            <Contact />
            <span>1234567890</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className='my-5'>
          <h1 className="text-lg font-semibold">Skills</h1>
          <div className="flex gap-2 mt-2">
            {skills.length !== 0 
              ? skills.map((skill, index) => <Badge key={index}>{skill}</Badge>) 
              : <span>NA</span>
            }
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium text-gray-700">Resume</label>
          {isResume 
            ? <a target="_blank" rel="noopener noreferrer" href="https://www.google.com" className="text-blue-500 hover:underline">View</a> 
            : <span>NA</span>
          }
        </div>

        {/* Applied Jobs Section */}
        <div className='max-w-xl mx-auto bg-white rounded-2xl mt-6 p-4 shadow-sm'>
          <h1 className="text-lg font-semibold mb-3 MY-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>

      </div>
    </div>
  )
}

export default Profile
