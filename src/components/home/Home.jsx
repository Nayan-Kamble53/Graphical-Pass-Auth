import React from "react";
import { Canvas } from "../canvas"
import home from '../Assets/home.png'
import {NavBar} from '../navbar'

const DIMENSION = 500;
const SELECTION_RESOLUTION = 5;  // 1 * 1
const IMAGE = `https://picsum.photos/${DIMENSION}`;

function Home() {
  return (
    <div className="h-screen">
    <NavBar/>
      <Canvas />
      <div className='flex justify-center items-center'>
      <img src={home} className='opacity-10 blur-lg h-[88vh] w-full'/>

      <div className='absolute text-slate-300 text-center'>
        <h1 className='font-bold text-3xl mb-10'>
          Unlock a world of Graphical Password Benefits <br/>
          <span className=''>Register Now!</span> 
        </h1>

        <div className='max-w-[45vw] text-lg'>
          <h2 className='text-slate-400'>
            Welcome to Graphical Password Authentication! We are thrilled to have you here, and we want to make sure you get the most out of your experience. By registering with us, you'll gain access to a wide range of exclusive features and benefits that will enhance your visit.
          </h2>

          <h3 className='text-blue-500 italic mt-2'>
            Explore a new password system for your next website.
          </h3>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
