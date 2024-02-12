import React, { useState, useRef } from "react";
import axios from "axios";
import { ImageGrid } from "../imageGrid";
import CryptoJS from "crypto-js";
import { navigate } from "@reach/router";
import Canvas from "../canvas/Canvas";
import { Footer } from "../footer";
import { NavBar } from "../navbar";
import { Spinner } from "../spinner";
import { toast } from "react-toastify";

const NUM_TILES = Number(process.env.REACT_APP_NUM_TILES);
const NUM_ROUNDS = Number(process.env.REACT_APP_NUM_ROUNDS);

function hashImage(image, ref_point) {
  const str = image + ref_point.join();
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.base64);
}

function Login() {
  const [email, setEmail] = useState("");
  const [ imageCaption , setImageCaption ] = useState("");
  const [roundNumber, setRoundNumber] = useState(0);
  const [images, setImages] = useState([]);
  const sequences = useRef([]);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(roundNumber);
    // fetching first round images
    if (roundNumber === 0) {
      console.log("round 0, no img tile");
      try {
        const res = await axios.post(
          `https://gpa-backend-api.onrender.com/api/login`,
          {
            email: email,
            iterationNum: roundNumber,
            passwordHash: "",
            key: "",
          },
          { "Content-Type": "application/json" }
        );

        if (res.status === 200) {
          setImages(res.data.images);
          setImageCaption(res.data.caption)
          setRoundNumber((prev) => prev + 1);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // middle rounds
    else if (roundNumber < NUM_ROUNDS) {
      console.log("int rounds");
      try {
        console.log(sequences);
        const currentSequence = sequences.current[sequences.current.length - 1];
        const res = await axios.post(
          `https://gpa-backend-api.onrender.com/api/login`,
          {
            email: email,
            iterationNum: roundNumber,
            passwordHash: "",
            key: hashImage(currentSequence.image, currentSequence.tileSequence),
          },
          { "Content-Type": "application/json" }
        );

        if (res.status === 200) {
          setImageCaption(res.data.caption);
          setImages(res.data.images);
          setRoundNumber((prev) => prev + 1);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // last round
    else if (roundNumber === NUM_ROUNDS) {
      console.log("last r");
      const hashes = [];
      console.log(sequences.current.length);
      sequences.current.map((imageSelection) => {
        hashes.push(
          hashImage(imageSelection.image, imageSelection.tileSequence)
        );
      });

      const passwordHash = CryptoJS.SHA256(hashes.join()).toString(
        CryptoJS.enc.base64
      );

      const currentSequence = sequences.current[sequences.current.length - 1];
      try {
        const res = await axios.post(
          `https://gpa-backend-api.onrender.com/api/login`,
          {
            email: email,
            iterationNum: roundNumber,
            passwordHash: passwordHash,
            key: hashImage(currentSequence.image, currentSequence.tileSequence),
          },
          { "Content-Type": "application/json" }
        );

        if (res.status === 200) {
          console.log("success!!");
          toast.success("Logged in successfully!");
          navigate("/authenticated");
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          toast.error("Invalid login");
          setRoundNumber(0);
          setIsHuman(false);
          setImages([]);
          sequences.current = [];
        } else {
          toast.error("Server error")
        }
      }
    }
    setLoading(false);
  };

  const addImageAndTileSequence = (image, tileSequence) => {
    console.log("handle tile");
    sequences.current.push({
      image,
      tileSequence,
    });
    setImages([]);
    handleSubmit();
  };

  return (
    <div className="flex flex-col justify-between h-screen ">
      <Canvas
        modalIsOpen={showCaptcha}
        setIsOpen={setShowCaptcha}
        onResult={(captchaResult) => {
          if (captchaResult) {
            setIsHuman(true);
            handleSubmit();
          } else {
            toast.warn("Error in recognising Captcha, Please try again");
          }
          setShowCaptcha(false);
        }}
      />

      <NavBar/>
      { showDiv ? (
      <div className="m-8 font-light flex justify-center">
        <form className="shadow-lg shadow-slate-500 rounded px-8 pt-6 pb-8 mb-4 w-[32vw]">

          <h1 className='text-richblack-5 font-semibold text-[1.6rem] mx-5 mb-5'>
            Login to Graphical Password Authentication System !
          </h1>

          <p className='text-[1.1rem] mx-5 mb-5'>
            <span className='text-richblack-100'>Enter your login credentials to access our page.</span>
            <br/>
            <span className='text-blue-100 italic'>Try new password system for your next project.</span>
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
          
          <div className="flex items-center justify-center">

            {roundNumber === 0 && <button
              className="bg-yellow-50 py-[8px] px-[1.2rem] mt-2 rounded-xl font-medium text-richblack-900 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setShowDiv(!showDiv);
                if (roundNumber === 0 && !isHuman) {
                  setShowCaptcha(true);
                }
              }}
            >
              Login
            </button>}
          </div>

          <span className="flex justify-center text-center mt-2 text-richblack-200 font-bold hover:underline cursor-pointer"
          onClick={() => navigate("/reset")}>
            Forgot Password ?
          </span>
        </form>
      </div>) :
      ( loading ? (<Spinner/>) :
      (<div className="bg-richblack-900">
        <ImageGrid
          imageURLs={images}
          thumbnails={images}
          addImageAndTileSequence={addImageAndTileSequence}
          numRounds={NUM_ROUNDS}
          numTiles={NUM_TILES}
        />
      </div>)
      )}
        <Footer/>
    </div>
  );
}

export default Login;
