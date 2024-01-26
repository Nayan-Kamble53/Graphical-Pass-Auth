import React, { useState } from 'react'
import { NavBar } from '../navbar'
import { Footer } from '../footer'
import { toast } from "react-toastify";
import { navigate } from "@reach/router";
import axios from 'axios';
import { Spinner } from '../spinner';

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const commonrequest = async(methods,url,body,header)=>{
      let config = {
          method:methods,
          url,
          headers:header ? header 
          :{
              "Content-Type":"application/json"
          },
          data:body
      }
  
      // axios instance
      return axios(config).then((data)=>{
          return data
      }).catch((error)=>{
          return error
      })
  }

    const sentOtpFunction = async(data)=>{
      return await commonrequest("POST",`https://gpa-backend-api.onrender.com/sendotp`,data)
  }

    const submitHandler = async (e) => {
      e.preventDefault();

      if (email === "") {
          toast.error("Enter Your Email !")
      } else if (!email.includes("@")) {
          toast.error("Enter Valid Email !")
      } else {
          setIsLoading(true)
          const data = {
              email: email
          }

          const response = await sentOtpFunction(data);

          if (response.status === 200) {
              setIsLoading(false);
              toast.success(`OTP Sent Successfully!`)
              navigate("/otp",{state:email})
          } else {
              toast.error(response.response.data.error);
          }
      }
    }      
    
  return (
      <div className='h-screen flex flex-col justify-between'>
        <NavBar/>
        {isLoading ? <Spinner/> :
        <div className='flex flex-col items-center'>
            <div className="shadow-lg shadow-slate-500 rounded px-8 pt-6 pb-8 mb-4 w-[32vw]">
                <h1 className='text-richblack-5 font-semibold text-[1.6rem] mx-5 mb-5'>
                Reset your Password !
                </h1>

                <p className='text-[1.1rem] mx-5 mb-5'>
                <span className='text-richblack-100'>Enter your valid Email ID here.</span>
                <br/>
                <span className='text-blue-100 italic'>Verify the Email ID and Reset your password.</span>
                </p>

                <div className="mb-4 flex flex-col">
                <label className="text-lg text-richblack-5 mb-1 mx-3" htmlFor="email">
                    Email <sup className="text-pink-200">*</sup>
                </label>
                <input
                    className="bg-richblack-800 rounded-[0.75rem] w-[25vw] p-[9px] mx-5 text-richblack-5"
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                
                <div className='flex justify-center'>
                    <button
                        onClick={submitHandler} 
                        className='bg-yellow-50 py-[8px] px-[1.2rem] mt-2 rounded-xl font-medium text-richblack-900 focus:outline-none focus:shadow-outline '>
                            Verify Email
                    </button>
                </div>
                
            </div>
        </div>
        }

        <Footer/>
    </div>
  )
}

export default Reset