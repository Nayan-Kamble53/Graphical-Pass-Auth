import React, {useState} from 'react'
import { navigate, useLocation } from '@reach/router';
import { NavBar } from '../navbar';
import { Footer } from '../footer';
import { toast } from 'react-toastify';
import axios from 'axios';

const Otp = () => {
    const [enteredOTP, setEnteredOTP] = useState("");
    const [email, setEmail] = useState("");
    const [validationMsg, setValidationMsg] = useState('');
    const location = useLocation();

    const submitHandler = async(e) => {
        e.preventDefault();
        const userEmail = email;

        if (enteredOTP === "") {
        toast.error("Enter Your Otp")
        } else if (!/[^a-zA-Z]/.test(enteredOTP)) {
        toast.error("Enter Valid Otp")
        } else if (enteredOTP.length < 6) {
        toast.error("Otp Length minimum 6 digit")
        } else {
        const data = {
          enteredOTP, email: location.state
        }
    }; 

        try {
            const resp = await axios.post(`http://localhost:6010/validate-otp`, {
              email: userEmail,
              enteredOTP,
            });

            if(resp.data.success) {
              toast.success("OTP verified successfully");
              setValidationMsg(resp.data.message);
              
              const response = await fetch(`http://localhost:6010/delete/${email}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              });
              
              const data = await response.json();
              console.log(data)
              
              if(response.ok) {
                console.log(data.message);
                setTimeout(() => {
                  toast.info("Reset your password");                  
                  navigate('/register');
                }, 3000);
              } else {
                console.error(data.message);
                // Handle error scenarios
              }
              }
              else {
                toast.error("Enter a valid OTP")
                setValidationMsg(resp.data.message);
              }            
          } catch(error) {
            console.log('An error occurred:', error);
          }                    
        }
      
  return (
    <div className='h-screen flex flex-col justify-between'>
        <NavBar/>

        <div className='flex flex-col items-center'>
            <form className="shadow-lg shadow-slate-500 rounded px-8 pt-6 pb-8 mb-4 w-[32vw]">
                <h1 className='text-richblack-5 font-semibold text-[1.6rem] mx-5 mb-5'>
                OTP !
                </h1>

                <p className='text-[1.1rem] mx-5 mb-5'>
                <span className='text-richblack-100'>We have sent you a verification Email, check it and Enter the received OTP.</span>
                <br/>
                <span className='text-blue-100 italic'>Verify the Email ID with OTP and Reset your password.</span>
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

                <div className="mb-4 flex flex-col">
                <label className="text-lg text-richblack-5 mb-1 mx-3" htmlFor="otp">
                    OTP <sup className="text-pink-200">*</sup>
                </label>
                <input
                    className="bg-richblack-800 rounded-[0.75rem] w-[25vw] p-[9px] mx-5 text-richblack-5"
                    id="enteredOTP"
                    type="text"
                    value={enteredOTP}
                    placeholder="Enter OTP here"
                    onChange={(e) => setEnteredOTP(e.target.value)}
                />
                </div>
                
                <div className='flex justify-center'>
                    <button
                        onClick={submitHandler} 
                        type='submit'
                        className='bg-yellow-50 py-[8px] px-[1.2rem] mt-2 rounded-xl font-medium text-richblack-900 focus:outline-none focus:shadow-outline '>
                            Verify 
                    </button>
                </div>
                
            </form>
        </div>
    <Footer/>
    </div>
  )
}

export default Otp