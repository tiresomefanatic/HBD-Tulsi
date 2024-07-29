import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-200 to-teal-400">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

export default Loading