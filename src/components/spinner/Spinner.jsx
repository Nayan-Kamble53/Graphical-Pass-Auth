import React from 'react'
// import './Spinner.css'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='loader'></div>
      <p className='mt-2 ml-4'>Loading...</p>
    </div>    
  )
}

export default Spinner