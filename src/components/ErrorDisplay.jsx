import React from 'react'
import { UilExclamationTriangle } from '@iconscout/react-unicons'

const ErrorDisplay = () => {
  return (
    <div className='flex flex-col items-center'>
        <UilExclamationTriangle className="text-yellow-400" size={180}/>
        <div className='text-5xl text-center text-white'>No such data Available</div>
    </div>
  )
}

export default ErrorDisplay