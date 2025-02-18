import React from 'react'
import Link from 'next/link'
import Header from './_components/Header'
export default function page() {

  return (
    <main>
      <Header></Header>
      <Link href="/register">Go Register</Link>
    </main>
  )
}

