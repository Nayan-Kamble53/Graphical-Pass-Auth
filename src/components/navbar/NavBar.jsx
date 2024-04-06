import React, { useState } from "react";
import { navigate } from "@reach/router";
import logo from "../Assets/logo.png";
import "./NavBar.css";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="navBar bg-slate-900 flex justify-around items-center w-full py-2 mx-auto">
      <img
        className="cursor-pointer"
        onClick={homeClick}
        src={logo}
        alt="logo"
        width={220}
        loading="lazy"
      />

      <nav className={isMobile ? "nav-links-mobile" : ""}
        onClick={() => setIsMobile(false)}>
        <ul className="flex gap-x-6 text-richblack-100 text-lg">
          <li className="home1 cursor-pointer" onClick={homeClick}>
            Home
          </li>
          <li className="about cursor-pointer" onClick={aboutClick}>
            About
          </li>
          <li className="contact cursor-pointer" onClick={contactClick}>
            Contact Us
          </li>
        </ul>
      </nav>

      <div className="lr flex items-center gap-x-4 text-richblack-100">
        <button
          onClick={loginClick}
          className="l bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700"
        >
          Login
        </button>

        <button
          onClick={regClick}
          className="r bg-richblack-800 py-[6px] px-[12px] rounded-[8px] border border-richblack-700"
        >
          Register
        </button>
      </div>

      <button className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaXmark /> : <FaBars />}
      </button>
    </div>
  );
}
