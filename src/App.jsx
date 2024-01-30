import { useState, useEffect } from "react";
import SideMenu from "./components/SideMenu";
import TasksContainer from "./components/TodoCardsContainer";

function App() {
  // Load theme from localStorage on initial page load
  const initialTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(initialTheme);

  const [opened, setOpened] = useState(false);
  const [display, setDisplay] = useState("all");
  const [animationX, setAnimationX] = useState("");
  const [view, setView] = useState("list");

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setAnimation = () => {
    if (opened) {
      setOpened(false);
      setAnimationX(["bg-[#0F6BAE]", "bg-[#0F6BAE]"]);
    } else {
      setOpened(true);
      setAnimationX([
        "rotate-45 translate-y-2 bg-[#efefef]  ",
        "rotate-[-45deg] translate-y-[-2px] bg-[#efefef]",
      ]);
    }
  };


 

  return (
    <div className={`${theme}`}>
      <div
        className={`font-[lato] t   m-0 dark:bg-[#121215] bg-[#C6CDFF] w-screen h-screen overscroll-none overflow-hidden
    transition-all
     delay-300  ease-in `}
      >
        <div className="flex  px-10 py-5 items-center justify-between md:justify-end ">
          {" "}
          <p className="text-[#ffffffcc] dark:bg-[#121215] dark:p-0  rounded-2xl p-0 bg-[#3e9effb7] h-6 flex justify-end items-end font-[inter]  font-bold text-4xl">
            {" "}
            to<span className="dark:text-[#805CF7] ">do.</span>{" "}
          </p>{" "}
          <div
            onClick={setAnimation}
            className="flex flex-col lg:hidden sticky  z-20  gap-1.5 cursor-pointer  "
          >
            {" "}
            <div
              className={`w-8 h-1 transition-all bg-[#0F6BAE]  ease-in dark:bg-[#805CF7]   rounded ${animationX[0]}`}
            ></div>
            <div
              className={`w-8 h-1 transition-all ease-in  bg-[#0F6BAE]  dark:bg-[#805CF7]  rounded ${animationX[1]}`}
            ></div>
          </div>{" "}
        </div>
        {opened ? (
          <SideMenu
            theme={theme}
            setTheme={setTheme}
            view={view}
            setView={setView}
            setDisplay={setDisplay}
            display={display}
          />
        ) : null}

        <TasksContainer display={display} view={view} />

        <div className="hidden lg:block ">
          <SideMenu
            theme={theme}
            setTheme={setTheme}
            view={view}
            setView={setView}
            setDisplay={setDisplay}
            display={display}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
