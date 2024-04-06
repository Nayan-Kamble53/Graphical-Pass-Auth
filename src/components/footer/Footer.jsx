import React from 'react'
import { navigate } from "@reach/router";

const Footer = () => {
    function backHandler() {
        navigate('/')
    }

  return (
    <div className=' bg-slate-900 flex items-center w-full py-2 h-[9vh] mx-auto'>
        <div className='foot ml-[35%] text-lg'>
            Made with ❤️ by Nayan K. &#169; 2023 Graphical Password Authentication !
        </div>

        <div className="foot flex items-center gap-x-4 text-richblack-100 ml-[13.5%]"> 
                <button onClick={backHandler}
                className="bg-richblack-800 py-[6px] px-[25px] rounded-[8px] border border-richblack-700">
                    Back
                </button>
        </div>
    </div>
  )
}

export default Footer