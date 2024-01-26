import React from "react";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Home2 } from "./components/home2";
import { Router } from "@reach/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Authenticated } from "./components/authenticated";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Reset } from "./components/reset";
import { Otp } from "./components/otp";

function App() {
  return (
    <div className="bg-richblack-900">
      <Router>
        <Register path="/register" />
        <Login path="/login" />
        <Home path="/" />
        <Home2 path="/home" />
        <Authenticated path="/authenticated" />
        <About path="/about" />
        <Contact path="/contact" />
        <Reset path="/reset" />
        <Otp path="/otp" />
      </Router>

      <ToastContainer
        position="top-right"
        style={{marginTop: 80}} 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
