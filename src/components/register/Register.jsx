import React, { Fragment, useState } from "react";
import { ImageGrid } from "../imageGrid";
import { createApi } from "unsplash-js";
import CryptoJS from "crypto-js";
import axios from "axios";
import { navigate } from "@reach/router";
import Canvas from "../canvas/Canvas";
import {NavBar} from '../navbar'
import {Footer} from '../footer'
import {Spinner} from '../spinner'
import registerImg from '../Assets/reg.png'
import { toast } from "react-toastify";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

const NUM_TILES = Number(process.env.REACT_APP_NUM_TILES);
const NUM_ROUNDS = Number(process.env.REACT_APP_NUM_ROUNDS);

function hashImage(image, ref_point) {
  const str = image + ref_point.join();
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.base64);
}

function encryptImage(image, key) {
  return CryptoJS.AES.encrypt(image, key).toString();
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [rawImages, setRawImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const getImages = async () => {
    if (category.trim() === "") {
      toast.info("Please enter a category");
      return;
    }
    setIsLoading(true);
    let fullImages = [];
    let thumbnails = [];

    try {
      const tempResult = await unsplash.search.getPhotos({
        query: category,
        page: 1,
        perPage: 1,
        orientation: "squarish",
      });

      const pic = tempResult.response;
      const totalImages = pic.total;
      const randomNumber = Math.floor(Math.random() * totalImages) + 1;
      const imagePage = Math.floor(randomNumber / 30) + 1;
      
      const result = await unsplash.search.getPhotos({
        query: category,
        page: imagePage,
        // perPage: Number(process.env.REACT_APP_PER_PAGE_IMAGE_LIMIT),
        perPage: 9,
        orientation: "squarish",
      });

      const pictures = result.response;
      pictures.results.forEach((pic) => {
        fullImages.push(`${pic.urls.full}&crop=faces&fit=crop&h=250&w=250`);
        thumbnails.push(`${pic.urls.thumb}&crop=faces&fit=crop&h=250&w=250`);
      });

      setIsLoading(false);
      setRawImages(fullImages);
      setThumbnails(thumbnails);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addImageAndTileSequence = (image, tileSequence) => {
    setSequences((prev) => [
      ...prev,
      {
        image,
        tileSequence: tileSequence,
      },
    ]);
    setRoundNumber((prev) => prev + 1);
    setCategory("");
    setRawImages([]);
    setThumbnails([]);
  };

  const register = async () => {
    if (!name || !name.trim() || !email || !email.trim()) {
      toast.warning("Please enter your details");
    }
    const hashes = [];
    let captions = [];
    sequences.map((imageSelection) => {
      hashes.push(hashImage(imageSelection.image, imageSelection.tileSequence));
    });

    Promise.all(captions).then(async(values) => {
      console.log(values);
      let captionList = [];
      for(let i=0; i<values.length;i++){
        captionList.push(values[i].text);
      }
      const encryptedImages = [];

      for (let i = 1; i < NUM_ROUNDS; i++) {
        encryptedImages.push(encryptImage(sequences[i].image, hashes[i - 1]));
      }

      const passwordHash = CryptoJS.SHA256(hashes.join()).toString(
        CryptoJS.enc.base64
      );

      try {
        const res = await axios.post('https://graphical-pass-auth.onrender.com/api/register', {
          name,
          email,
          passwordHash,
          images: [sequences[0].image, ...encryptedImages],
          captions : captionList,
        });

        if (res.status === 200) {
          console.log("Registration successful");
          toast.success("Registration Successful!");
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 500) {
          toast.error("An error occured");
        } else {
          toast.error("Invalid login");
          sequences.current = [];
          setRoundNumber(0);
        }
      }
    })
    setShowDiv(!showDiv);
  };

  return (
    <Fragment>
      <Canvas
        modalIsOpen={showCaptcha}
        setIsOpen={setShowCaptcha}
        onResult={(captchaResult) => {
          if (captchaResult) {
            setIsHuman(true);
            getImages();
          } else {
            toast.warning("Please try again");
          }
          setShowCaptcha(false);
        }}
      />

      <NavBar/>
      <div className="mx-auto my-2 font-light flex justify-between h-full max-w-[75vw] mb-[-2.2%]">
        <form className="reg pt-6 w-[28vw] flex flex-col items-center">
          <h1 className='text-richblack-5 font-semibold text-[1.6rem] mx-5 mb-5'>
            Welcome to Graphical Password Authentication System !
          </h1>
          
          <p className='text-[1.1rem] mx-5 mb-5'>
            <span className='text-richblack-100'>Explore GPA and set sequences of images as a password.</span>
            <br/>
            <span className='text-blue-100 italic'>Try new password system for your next project.</span>
          </p>

            <div className="inp mb-4 flex flex-col">
              <label className="text-lg text-richblack-5 mb-2 leading-[1.375rem] mx-3" htmlFor="name">
                Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                className="bg-richblack-800 rounded-[0.75rem] w-[25vw] p-[9px] mx-5 text-richblack-5"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inp mb-4 flex flex-col ">
              <label className="text-gray-100 mb-2 text-lg mx-3" htmlFor="email">
                Email <sup className="text-pink-200">*</sup>
              </label>
              <input
                className="bg-richblack-800 rounded-[0.75rem] w-[25vw] p-[9px] mx-5 text-richblack-5"
                id="email"
                type="text"
                placeholder="Enter your Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>

            <div className="inp mb-4 flex flex-col">
              <label className="text-gray-100 mb-2 mx-3 text-lg" htmlFor="category">
                Category for image <sup className="text-pink-200">*</sup>
              </label>
              <input
                className="bg-richblack-800 rounded-[0.75rem] w-[25vw] p-[9px] mx-5 text-richblack-5"
                id="category"
                placeholder="Try 'cars'"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-50 w-full py-[8px] px-[2rem] mt-2 rounded-[8px] font-medium text-richblack-900"
                type="button"
                onClick={() => {
                  if (roundNumber === 0 && !isHuman) {
                    setShowCaptcha(true);
                  } else {
                    getImages();
                  }
                }}
              >
                Search
              </button>
            </div>
        </form>

        <div className='regImg relative max-w-[32vw] left-16 mt-[-10%]'>
        <img src={registerImg}
            alt='frame' 
            width={558}
            height={504}
            loading='lazy' 
        />
        </div>
      </div> 
      
      {roundNumber === NUM_ROUNDS ? 
      (
        <div className="regCon flex flex-col justify-center items-center mt-10">
          <p className="mx-auto text-3xl my-2">You're almost there!</p>
          
          <button className="bg-yellow-50 w-[12vw] py-[8px] px-[] mt-2 rounded-xl font-medium text-richblack-900 mb-20" 
            onClick={register}>
              Confirm registration
          </button>
        </div> ) : 

        ( isLoading ? (<Spinner/>) :
          (<ImageGrid
            imageURLs={rawImages}
            thumbnails={thumbnails}
            addImageAndTileSequence={addImageAndTileSequence}
            numRounds={NUM_ROUNDS}
            numTiles={NUM_TILES}
            isLoading={isLoading}
          />)
      )}  
      
      <div className=" mt-[-1%]">
        <Footer/>
      </div>
    </Fragment>
  );
}

export default Register;
