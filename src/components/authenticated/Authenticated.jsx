import React from 'react';
import Confetti from 'react-confetti';
import {navigate} from '@reach/router'
import { toast } from "react-toastify";
import tick from '../Assets/tick.png';


function Authenticated() {
  function logoutHandler() {
    navigate("/");
    toast.success("Logged out successfully"); 
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-4xl text-center">You're in </h1>

      <div className='bg-indigo-900 w-[35vw] rounded-xl shadow-lg shadow-gray-700 h-[35vh] mt-5 flex py-5 px-8 items-center flex-col'>
        <img width={100} src={tick}/>
          <p className='font-bold text-xl mt-2'>LOG IN SUCCESSFUL</p>
          <p className='mt-3 text-center text-[16px]'>You have successfully signed into your account. You can close this window and continue using the product.</p>

          <button onClick={logoutHandler}
                className="bg-cyan-600 text-gray-200 py-[6px] px-[12px] rounded-[8px] border border-richblack-700 mt-5">
                    Log Out
          </button>
      </div>       
      <Confetti />
    </div>
  )
}

export default Authenticated