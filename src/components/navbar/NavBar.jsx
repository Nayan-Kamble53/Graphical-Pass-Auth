import React from 'react'
import {navigate} from '@reach/router'
import logo from '../Assets/logo.png'
import './NavBar.css'

export default function NavBar() {
  function homeClick() {
    navigate("/");
  }

  function aboutClick() {
    navigate("/about");
  }

  function contactClick() {
    navigate("/contact");
  }

  function loginClick() {
    navigate("/login");
  }

  function regClick() {
    navigate("/register");
  }

  return (
    <div className='bg-slate-900 flex justify-around items-center w-full py-2 mx-auto'>
      <img className='cursor-pointer' onClick={homeClick} src={logo} alt='logo' width={220} loading='lazy' />

    <nav>
      <ul className="flex gap-x-6 text-richblack-100 text-lg">
          <li className='cursor-pointer' onClick={homeClick}>Home</li>
          <li className='cursor-pointer' onClick={aboutClick}>About</li>
          <li className='cursor-pointer' onClick={contactClick}>Contact Us</li>
      </ul>
    </nav>

    <div className="flex items-center gap-x-4 text-richblack-100"> 
                <button onClick={loginClick}
                className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">
                    Login
                </button>

                <button onClick={regClick}
                className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">
                    Register
                </button>
    </div>
    </div>
  )
}
