import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <main className='w-full p-3  flex items-center bg-violet-900/40'>
    <div className="flex w-full  justify-between items-center">
      <span className='text-xl px-10 font-bold text-white font-Head'>
        ASTROSPHERE
      </span>
      <div className="flex space-x-0">
        <Link href="/menu" className='font-bold text-white'>
          Menu
        </Link>
        <Link href="/profile" className='px-20 font-bold text-white'>
          Profile
        </Link>
      </div>
    </div>
  </main>
  

    /*อันเก่า <main className='w-full p-3 flex justify-center bg-violet-900/40'>
        <span className='text-xl font-bold text-white font-Head' >ASTROSPHERE</span>
    </main>
      */
  )
}