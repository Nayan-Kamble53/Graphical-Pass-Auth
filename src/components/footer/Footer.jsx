import React from "react";
import { navigate } from "@reach/router";

const Footer = () => {
  function backHandler() {
    navigate("/");
  }

  return (
    <div className=" bg-slate-900 flex items-center justify-center w-full py-2 h-[9vh]">
      <div className="text-lg flex justify-center w-full ml-24">
        Made with ❤️ by Nayan K. &#169; 2023 Graphical Password Authentication !
      </div>

      <div className="flex justify-end mr-5 text-richblack-100">
        <button
          onClick={backHandler}
          className="bg-richblack-800 py-[6px] px-[25px] rounded-[8px] border border-richblack-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Footer;
