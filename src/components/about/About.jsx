import React from 'react'
import { Footer } from '../footer'
import { NavBar } from '../navbar'
import gif1 from '../Assets/1.gif'
import gif2 from '../Assets/2.gif'

const About = () => {
  return (
    <div className='h-screen flex flex-col justify-between items-center bg-richblack-900'>
      <NavBar/>

      <div className='bg-richblack-900 w-full'>
      <div className='bg-richblack-700 h-[65vh] w-full flex flex-col items-center pt-[5%]'>
        <div className='driving w-[60vw] text-white font-bold text-4xl text-center'>
          Driving Innovation in Online Password System for a 
          <p className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>
            Secure Environment
          </p>
        </div>

        <div className='cutting w-[60vw] text-center mt-5 text-lg'>
         A cutting-edge project focused on enhancing security through innovative graphical password authentication. Our mission is to revolutionize traditional text-based password systems by introducing a visually intuitive and secure method of user authentication.
        </div>

        <div className='gifs flex gap-10'>
          <img 
          width={400}
          src={gif1}/>
          <img 
          className='gif1'
          width={400}
          src={gif1}/>
          <img 
          width={400}
          src={gif1}/>
        </div>
      </div>

      <div className='our mt-[12%] mb-[4%] bg-richblack-900 text-[35px] text-center w-[75vw] font-semibold text-white ml-[11%]'>
          Our project leverages the power of <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Visual memory,</span> allowing users to create and recall passwords through 
          <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'> Graphical elements.</span> Move beyond the limitations of traditional 
          <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'> Text-based Passwords.</span> 
      </div>

      <div className='bg-richblack-700 h-[1px] w-full'></div>

      <div className='flex justify-evenly items-center'>
        <div className='cutting w-[45vw] text-lg'>
        <div className='text-center text-3xl bg-gradient-to-b from-[#f6079a] via-[#da0d0d] to-[#e0a912] text-transparent bg-clip-text font-bold mb-5'>
          Key Features 
        </div>
        Graphical Passwords :- Our project leverages the power of visual memory, allowing users to create and recall passwords through graphical elements. <br/>
        Enhanced Security :- Move beyond the limitations of traditional passwords with a system designed to resist common security threats and attacks. <br/>
        User-Friendly Interface :- We prioritize a seamless user experience, ensuring that our graphical password authentication is both accessible and easy to use. <br/><br/>
        Security :- Strengthening user security through a novel approach to authentication. 
        Usability :- Creating a system that is not only secure but also user-friendly for individuals of all technical backgrounds.
        Innovation :- Pushing the boundaries of traditional authentication methods by introducing a visually engaging and effective alternative.
        </div>

        <div className='gifs mt-5'>
          <img width={450} src={gif2}/>
        </div>
      </div>

      <div className='how flex justify-evenly mt-10 mb-10'>
        <div className='how1 w-[42vw] text-lg'>
          <div className='text-center text-3xl bg-gradient-to-b from-[#f6079a] via-[#da0d0d] to-[#e0a912] text-transparent bg-clip-text font-bold mb-10'>
            How it works 
          </div>
          <span className='font-bold text-lg'>Registration :- </span>
          Firstly, You have to create a account by registering in the system. Once you click on Register you'll be redirected to registration page. Now you have to enter your Name, Email, and search a image according to your choice. Select a image of your choice amongst the randomly generated images, a grid of image pixels will be generated of the image you selected before and select the two pixels of that image to set it as your password. You have to repeat the same steps 3 times and your registration will be done. <br/>

          <span className='font-bold text-lg'>Login :- </span>
          Once you're registered successfully, you'll be redirected to login page. Enter your Email and click on Login button, select all the images which you set in the pass-word while registration. <br/>

          <span className='font-bold text-lg'>Reset :- </span>
          To reset the password, you need to be logged in. Once you click on Reset button, you'll be redirected to reset page. Now enter Email and it'll sent an Email on user Email id. And you'll be redirected to OTP verification page, now enter email and received OTP to verify that you are a valid user. Once verification is done you'll be redirected to registration page and now you can update your password.
        </div>
          
        <div className='text-center'>
          <div className='text-center text-3xl bg-gradient-to-b from-[#f6079a] via-[#da0d0d] to-[#e0a912] text-transparent bg-clip-text font-bold mb-10'>
            Team Members
          </div>
          <div className='cursor-pointer hover:underline hover:font-bold mb-3 text-lg' onClick={() => window.open('https://www.linkedin.com/in/nayan-kamble-85a696255/')}>
            Nayan Kamble (Team Lead)
          </div>
          <div className='cursor-pointer hover:underline mb-3 text-lg hover:font-bold' onClick={() => window.open('https://www.linkedin.com/in/tushar-bisen-2833411aa/')}>
            Tushar Bisen
          </div>
          <div className='cursor-pointer hover:underline mb-3 text-lg hover:font-bold' onClick={() => window.open('https://www.linkedin.com/in/lucky-chaudhari-644b7b258/')}>
            Lucky Chaudhari
          </div>
          <div className='cursor-pointer hover:underline text-lg hover:font-bold' onClick={() => window.open('https://www.linkedin.com/in/yashashri-mekhe-8899142ab/')}>
            Yashashri Mekhe
          </div>
        </div>
      </div>

      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default About