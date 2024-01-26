import React from 'react'
import home from '../Assets/home.png';
import {navigate} from '@reach/router'
import logo from '../Assets/logo.png'
import '../navbar/NavBar.css';

export default function Home2() {
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

  function resetPass() {
    navigate("/reset");
  }

  return (
    <div className='bg-richblack-500 h-full flex justify-center items-center flex-col'>
      <div className='bg-slate-900 flex justify-around items-center w-full mx-auto py-2'>
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

                  <button onClick={resetPass}
                  className="bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700">
                      Reset Pass
                  </button>
      </div>
      </div>

        <img src={home} className='opacity-10 blur-lg relative h-[89.3vh] w-full'/>

        <div className='absolute text-slate-300 text-center'>
          <h1 className='font-bold text-3xl mb-10'>
            Welcome Back - Login Now!
            
          </h1>

          <div className='max-w-[45vw] text-lg'>
            <h2 className='text-slate-400'>
              We are thrilled to have you here, and we want to make sure you get the most out of your experience. By registering with us, you'll gain access to a wide range of exclusive features and benefits that will enhance your visit.
            </h2>

            <h3 className='text-blue-500 italic mt-2'>
              Explore a new password system for your next website.
            </h3>
          </div>

        </div>
    </div>
  )
}
