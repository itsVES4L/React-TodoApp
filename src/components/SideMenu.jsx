import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ViewStreamRounded as ListIcon,
  GridViewRounded as GridIcon,
  AllInboxRounded as AllIcon,
  RadioButtonCheckedRounded as ActiveIcon,
  LibraryAddCheckRounded as CompletedIcon,
} from "@mui/icons-material";

import { github, instagram } from "../assets";

const SideMenu = ({ setTheme, view, setView, setDisplay, display }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme"));
  const darkBtnStyle =
    (mode === "dark" && "right-6") || (mode === "light" && "left-6");
  const changeMode = () => {
    setTheme((mode === "dark" && "light") || (mode === "light" && "dark"));
    setMode((mode === "dark" && "light") || (mode === "light" && "dark"));
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleDisplayChange = (newDisplay) => {
    setDisplay(newDisplay);
  };

  return (
    <div className="text-white fixed z-10 flex justify-center items-center top-0 bg-[rgba(0,0,0,0.4)] backdrop-blur lg:backdrop-blur-0 lg:bg-[rgba(0,0,0,0)] lg:w-fit w-screen h-screen">
      <div className="w-[262px] lg:h-full lg:rounded-none lg:absolute lg:left-0 rounded-3xl shadow-lg dark:bg-[#18181C] bg-[#efefef] h-[603px]">
        <div className="flex items-center mt-[33px] justify-between px-[28px]">
          <p className="dark:text-[#805CF7] text-[#0f6bae] text-[24px] font-bold">
            Filter
          </p>
          <div
            onClick={changeMode}
            className={`dark:bg-[#2F2D36] bg-[#C6CDFF] relative rounded-xl cursor-pointer w-[40px] transition-all ease-in delay-300 px-[2px] flex items-center h-[17px] 
            `}
          >
            <div
              className={`dark:bg-[#1E1E1E] bg-[#0f6bae] absolute transition-all ease-in  delay-300  w-[13px] h-[13px] rounded-full ${darkBtnStyle}`}
            ></div>
          </div>
        </div>

        <div className="w-full mt-[38px] h-[55px] flex justify-center gap-[59px] items-center">
          {["grid", "list"].map((icon, index) => (
            <div
              key={index}
              onClick={() => handleViewChange(icon)}
              className={`cursor-pointer w-[55px] h-[55px] rounded-xl flex justify-center items-center ${
                view === icon
                  ? "dark:bg-[#2F2D36] bg-[#3E9DFF] dark:text-[#84849D] text-white"
                  : " dark:text-[#84849D] text-[#3e9dff]"
              }`}
            >
              {icon === "grid" ? (
                <GridIcon fontSize="large" alt="icon" />
              ) : (
                <ListIcon fontSize="large" alt="icon" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full items-center gap-[16px] mt-[53px]">
          {["all", "active", "completed"].map((option, index) => (
            <div
              key={index}
              onClick={() => handleDisplayChange(option)}
              className={`flex cursor-pointer px-2 rounded-lg gap-4 w-[204px] ${
                display === option
                  ? "dark:bg-[#2F2D36] text-white bg-[#3E9DFF]"
                  : "dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] dark:text-[#84849D] text-[#3E9DFF]"
              } h-[40px] justify-start dark:hover:bg-[#2f2d3680] hover:text-white hover:bg-[#3e9eff6b] items-center dark:text-[#84849D] text-[18px]`}
            >
              {option === "all" ? (
                <AllIcon />
              ) : option === "active" ? (
                <ActiveIcon />
              ) : (
                <CompletedIcon />
              )}{" "}
              <p>{option.charAt(0).toUpperCase() + option.slice(1)} Tasks</p>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center items-end gap-[70px] mt-[100px]">
          {[
            { link: "https://github.com/itsVES4L", icon: github },
            { link: "https://instagram.com/whosvesal", icon: instagram },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="cursor-pointer w-[35px]"
            >
              <img src={item.icon} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
