import React from 'react'
import { FaGithub } from "react-icons/fa6";


const Header = () => {
  return (
    <div className='bg-primary h-[8vh] text-accent'>
      <div className='flex justify-between px-10 h-full items-center'>
        <div className="flex gap-2">
          <h2>Hello, </h2> 
          <p className='font-semibold te  xt-neutral'>{"abhishekpathak1720@gmail.com"}</p>
        </div>
        <div className='flex gap-10 h-full items-center'>
            <button className='btn btn-secondary text-primary px-7 py-1 no-animation text-lg'>Logout</button>
            <FaGithub className='text-2xl cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default Header   