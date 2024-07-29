import React from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Loading from '@/components/Loading'
import MessageList from '@/components/MessageList'
import SpecialMessage from '@/components/SpecialMessage';

const BirthdayHero = dynamic(() => import('@/components/hero'), { 
  ssr: false,
  loading: () => <Loading />
})

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <BirthdayHero name="Tulsi" />
      <div className="mt-16">
        <SpecialMessage />
        <MessageList />
      </div>
    </main>
  )
}