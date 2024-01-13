import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons:
import { github, instagram } from "../assets";
import List from "@mui/icons-material/ViewStreamRounded";
import Grid from "@mui/icons-material/GridViewRounded";
import All from "@mui/icons-material/AllInboxRounded";
import Active from "@mui/icons-material/RadioButtonCheckedRounded";
import Completed from "@mui/icons-material/LibraryAddCheckRounded";
const SideMenu = ({ setTheme, view, setView, setDisplay, display }) => {
  // dark mode
  const [dark, SetDark] = useState(true);
  const [darkBtnStyle, setDarkBtnStyle] = useState("left-1");
  const changeMode = () => {
    if (dark) {
      SetDark(false);
      setDarkBtnStyle("right-1");
      setTheme("light");
    } else {
      setTheme("dark");
      setDarkBtnStyle("left-1");
      SetDark(true);
    }
  };

  const viewGridHandler = () => {
    setView("grid");
  };
  const viewListHandler = () => {
    setView("list");
  };

  return (
    <div
      className="text-white fixed z-10   flex justify-center items-center  top-0 bg-[rgba(0,0,0,0.4)] backdrop-blur lg:backdrop-blur-0
    lg:bg-[rgba(0,0,0,0)] lg:w-fit w-screen h-screen"
    >
      <div
        className="w-[262px] 
      lg:h-full lg:rounded-none
      lg:absolute
      lg:left-0
      rounded-3xl  shadow-lg dark:bg-[#18181C] bg-[#efefef] h-[603px]"
      >
        <div className="flex items-center mt-[33px] justify-between px-[28px]">
          {" "}
          <p className="dark:text-[#805CF7] text-[#0f6bae] text-[24px] font-bold">
            {" "}
            Filter{" "}
          </p>{" "}
          {/* <dark Mode Button> */}
          <div
            onClick={changeMode}
            className="dark:bg-[#2F2D36] bg-[#C6CDFF] relative rounded-xl cursor-pointer w-[40px] transition-all ease-in delay-300 px-[2px] flex items-center h-[17px]"
          >
            {" "}
            <div
              className={`dark:bg-[#1E1E1E] bg-[#0f6bae] absolute transition-all ease-in ${darkBtnStyle} delay-300  w-[13px] h-[13px] rounded-full`}
            ></div>{" "}
          </div>{" "}
          {/* <dark Mode Button/> */}
        </div>
        {/* <view> */}
        <div className="w-full  mt-[38px] h-[55px]  flex justify-center gap-[59px] items-center">
          <div
            onClick={viewGridHandler}
            className={`  cursor-pointer w-[55px] h-[55px] rounded-xl flex justify-center items-center   ${
              view === "grid"
                ? "dark:bg-[#2F2D36] bg-[#3E9DFF] dark:text-[#84849D] text-white"
                : " dark:text-[#84849D] text-[#3e9dff]"
            }   `}
          >
            {" "}
            <Grid fontSize="large" alt="icon" />{" "}
          </div>
          {/* #3E9DFF */}
          <div
            onClick={viewListHandler}
            className={`
            ${
              view === "list"
                ? "dark:bg-[#2F2D36] bg-[#3E9DFF] dark:text-[#84849D] text-white"
                : " dark:text-[#84849D] text-[#3e9dff]"
            } 
          cursor-pointer w-[55px] h-[55px] rounded-xl flex justify-center items-center  `}
          >
            {" "}
            <List fontSize="large" alt="icon" />{" "}
          </div>
        </div>
        {/* <view/> */}

        <div className="flex flex-col w-full    items-center  gap-[16px] mt-[53px]">
          <div
            onClick={() => {
              setDisplay("all");
            }}
            className={`flex cursor-pointer px-2 rounded-lg gap-4 w-[204px]  ${
              display === "all"
                ? "dark:bg-[#2F2D36] text-white  bg-[#3E9DFF]"
                : "dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] dark:text-[#84849D] text-[#3E9DFF]"
            } h-[40px] justify-start dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] items-center dark:text-[#84849D] text-[20px]`}
          >
            {" "}
            <All /> <p>All Tasks</p>{" "}
          </div>

          <div
            onClick={() => {
              setDisplay("active");
            }}
            className={`flex cursor-pointer dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] dark:text-[#84849D] text-[#3E9DFF]  px-2 rounded-lg gap-4 w-[204px]  h-[40px] justify-start items-center text-[20px]  ${
              display === "active"
                ? "dark:bg-[#2F2D36] text-white  bg-[#3E9DFF]"
                : "dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] dark:text-[#84849D] text-[#3E9DFF]"
            } `}
          >
            {" "}
            <Active /> <p>Active</p>{" "}
          </div>

          <div
            onClick={() => {
              setDisplay("completed");
            }}
            className={`flex cursor-pointer  dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] px-2 rounded-lg gap-4 w-[204px]  h-[40px] justify-start items-center dark:text-[#84849D] text-[#3E9DFF] text-[20px]   ${
              display === "completed"
                ? "dark:bg-[#2F2D36] text-white  bg-[#3E9DFF]"
                : "dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] dark:text-[#84849D] text-[#3E9DFF]"
            }`}
          >
            {" "}
            <Completed /> <p>Completed</p>{" "}
          </div>
        </div>

        {/* links */}

        <div className="flex w-full justify-center items-end  gap-[70px] mt-[100px] ">
          {" "}
          <Link
            to={"https://github.com/itsVES4L"}
            className="cursor-pointer w-[35px]"
          >
            {" "}
            <img src={github} alt="" />{" "}
          </Link>{" "}
          <Link
            to={"https://instagram.com/whosvesal"}
            className="cursor-pointer w-[35px]"
          >
            {" "}
            <img src={instagram} alt="" />{" "}
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
