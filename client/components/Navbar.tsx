import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <main className='w-full p-2 flex items-center bg-violet-900/40'>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center px-24">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />

          <span className='text-[15px] font-semibold text-white font-Head ml-2'>
            ASTROSPHERE
          </span>
        </div>

        <div className="flex w-1/3 justify-between px-20">
          <Link href="/menu" className='text-[18px] font-semibold text-white'>
            Menu
          </Link>

          <Link href="/profile" className='text-[18px] font-semibold text-white'>
            Profile
          </Link>
          
          <Link href="/logout" className='text-[18px] font-semibold text-white'>
            LogOut
          </Link>
        </div>
      </div>
    </main>
  )
}