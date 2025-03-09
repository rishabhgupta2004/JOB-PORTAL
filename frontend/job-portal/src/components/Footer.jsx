import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">JobFinder</h2>
          <p className="text-sm mt-2">Your Dream Job is Just a Click Away</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="hover:text-blue-500">About Us</a>
          <a href="/jobs" className="hover:text-blue-500">Jobs</a>
          <a href="/contact" className="hover:text-blue-500">Contact</a>
          <a href="/privacy" className="hover:text-blue-500">Privacy Policy</a>
        </div>

        <div className="text-sm">© {new Date().getFullYear()} JobFinder. All Rights Reserved.</div>
      </div>
    </footer>
  )
}

export default Footer