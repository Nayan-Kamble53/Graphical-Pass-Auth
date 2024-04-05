import React, {useState} from 'react'
import { Footer } from '../footer'
import { NavBar } from '../navbar'
import contact from '../Assets/contact2.gif'
import axios from 'axios';
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  // const BASE_URL = process.env.BASE_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://graphical-pass-auth.onrender.com/contact`, formData);
      console.log(response.data);
      toast.success('Message sent successfully!');
      setTimeout(() => {
        toast.info('Thank You for reaching out to us, we will get in touch with you shortly!', {
          autoClose: 4000
        });
      }, 2000);

      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } catch(error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='h-full flex flex-col justify-between'>
      <NavBar/>
      
      <div className='flex justify-center items-start gap-24'>
        <div className='flex items-center justify-center mt-40 w-[40vw] h-[50vh] p-0 shadow-richblack-200 shadow-lg rounded-3xl'>
          <img width={580} src={contact}/>
        </div>

        <div className='flex flex-col gap-y-4 my-16 shadow-richblack-200 shadow-lg p-12 rounded-3xl'>
          <h1 className='text-richblack-5 font-semibold text-[2rem] max-w-[32vw] mb-5'>
            Got a Idea? We'he got the skills. Let's team up.
          </h1>

          <div className='flex gap-3'>
            <label className="text-lg text-richblack-5 leading-[1.375rem] ">
              First Name<sup className="text-pink-200">*</sup><br/>
            <input className='mt-2 bg-richblack-800 rounded-[0.75rem] text-[15px] w-[15vw] p-[12px] text-richblack-5' 
            type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder='Enter first name' />
            </label>

            <label className="text-lg text-richblack-5 leading-[1.375rem] mx-3">
              Last Name<sup className="text-pink-200">*</sup><br/>
            <input className='mt-2 bg-richblack-800 text-[15px] rounded-[0.75rem] w-[15vw] p-[12px] text-richblack-5'
            type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder='Enter last name' />
            </label> 
          </div>
          
          <div>
            <label className="text-lg text-richblack-5 leading-[1.375rem]">
              Email<sup className="text-pink-200">*</sup><br/>
              <input className='mt-2 bg-richblack-800 text-[15px] rounded-[0.75rem] w-[31.5vw] p-[12px] text-richblack-5'
              type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Enter email address' />
            </label>
          </div> 
          
          <div>
            <label className="text-lg text-richblack-5 leading-[1.375rem]">
              Subject <sup className="text-pink-200">*</sup><br/>
              <input  className='mt-2 bg-richblack-800 text-[15px] rounded-[0.75rem] w-[31.5vw] p-[12px] text-richblack-5'
              type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder='Enter your subject'/>
            </label>
          </div>

          <div>
            <label className="text-lg text-richblack-5 leading-[1.375rem]">
              Message <sup className="text-pink-200">*</sup><br/>
              <textarea className='mt-2 bg-richblack-800 text-[15px] rounded-[0.75rem] w-[31.5vw] p-[12px] text-richblack-5'
              name="message" value={formData.message} onChange={handleChange} required rows={8} placeholder='Enter your message' />
            </label>
          </div> 

          <div>
            <button className="bg-yellow-50 w-full py-[8px] px-[2rem] rounded-[8px] font-medium text-richblack-900"
            type="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Contact