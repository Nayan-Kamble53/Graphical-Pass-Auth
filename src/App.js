import React, { useState } from "react";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Router } from "@reach/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Authenticated } from "./components/authenticated";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Reset } from "./components/reset";
import { Otp } from "./components/otp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="bg-richblack-900">
      <Router>
        <Home path="/" />
        <Register path="/register" />
        <Login path="/login" setIsLoggedIn={setIsLoggedIn}/>
        <PrivateRoute path="/authenticated" component={Authenticated} isLoggedIn={isLoggedIn} />
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
