import React from 'react'
import Image from 'next/image'
import Pic1 from "@/assets/pic1.png";

export default function Header() {
  return (
    <div><Image src={Pic1} alt='pic1' width={300} height={200}></Image></div>
    
  )
}
