import React from 'react';
import Link from 'next/link';
import MessageForm from '@/components/MessageForm';

export default function LeaveMessage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-8 text-white hover:underline">
        &larr; Back to Home
      </Link>
      <MessageForm />
    </div>
  )
}