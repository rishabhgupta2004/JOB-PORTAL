import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
 
  const {user}=useSelector (store=>store.auth)// Mock user state (change it to false to test the Login/Register)

  return (
    <>
      <div className='bg-white shadow-md'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
          <div>
            <h1 className='text-2xl'>Job<span className='text-[#f83532]'>Khojo</span></h1>
          </div>

          <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
              
            </ul>
            {
              !user ? (
                <div className='flex gap-4'>
                  <Link to="/Login">
                  <Button variant='outline' className="bg-blue-700  hover:bg-blue-500 text-white">Login</Button>
                  </Link >
                  <Link to="/Signup">
                  <Button variant='destructive' className="bg-red-600 hover:bg-red-500">Register</Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className='w-80'>
                    <div className='flex gap-4 space-y-2'>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>Rishabh Company</h4>
                        <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                    <div className='flex flex-col my-2 text-gray-600'>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link"><Link  to="/profile">View Profile</Link></Button>
                      </div>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button variant="link">Logout</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
