import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  toggleCompleteSubTask,
  toggleCompleteTask,
  toggleEditTask,
} from "../../redux/taskSlice";
import { findIndexByIsEditingValue } from "../../helper";
import { useSelector } from "react-redux";
// ICON
import Arrow from "@mui/icons-material/KeyboardArrowDown";
import Delete from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/DriveFileRenameOutlineRounded";
const ListTodoCard = ({
  title,
  subTasks,
  id,
  isEditing,
  setShowEditPage,
  setData,
}) => {
  const dispatch = useDispatch();
  // check if all of tasks are Completed
  const areAllSubTasksCompleted = subTasks?.every((task) => task?.isCompleted);
  // check if there is any unCompleted task
  const anyTaskIsUnCompleted = subTasks?.some(
    (task) => task.isCompleted === false
  );
  // Styles for Closing & Opening Card
  const [style, setStyle] = useState("h-20");
  const [open, setOpen] = useState(false);
  const [downIcon, setDownIcon] = useState("");

  const openTheCard = () => {
    setOpen(true);
    setStyle("h-fit");
    setDownIcon("rotate-[180deg]");
  };
  const closeTheCard = () => {
    setOpen(false);
    setStyle("h-20");
    setDownIcon("rotate-[0deg]");
  };

  const clickHandler = () => {
    if (open) {
      closeTheCard();
    } else {
      openTheCard();
    }
  };
  // Styles Completed Tasks
  const CompletedStyles = (completed) => {
    if (!completed) {
      return "text-white";
    } else {
      return "dark:text-[#b7a3a399] text-[#ffffff54] dark:accent-[#b7a3a399] accent-[#ffffff54]  line-through";
    }
  };

  useEffect(() => {
    dispatch(
      toggleCompleteTask({ id: id, isCompleted: areAllSubTasksCompleted })
    );
    if (areAllSubTasksCompleted) {
      // if All SubTasks Are Completed :
      closeTheCard();
    }
  }, [subTasks]);

  
  useEffect(() => {
    const index = findIndexByIsEditingValue(todos, isEditing);
    setData(todos[index]);
  }, [isEditing]);

  // Tasks Array
  const todos = useSelector((state) => state.tasks);
  //  click Handler for Edit task
  const handleClick = () => {
    dispatch(toggleEditTask({ id: id, isEditing: true }));
    setShowEditPage(true);
  };
  return (
    <div className="flex w-full   justify-center">
      <div
        className={` w-[95%] transition-all  ease-in overflow-hidden rounded-xl delay-300  ${style}  dark:bg-[#2f2d36] bg-[#3E9DFF] relative `}
      >
        <div className="w-full    flex flex-row justify-between gap-4 mt-7 px-4 ">
          <p
            className={` flex relative bottom-1 transition-all delay-150 ease-in ${CompletedStyles(
              areAllSubTasksCompleted
            )}    items-center  text-[20px]`}
          >
            {title}
          </p>
          <div className="flex gap-2">
            {/* EDIT button */}
            <div
              onClick={handleClick}
              className={`w-fit h-fit  cursor-pointer ${
                !areAllSubTasksCompleted ? "block" : "hidden"
              } dark:text-[#84849D] text-white `}
            >
              <Edit />
            </div>
            {/* DELETE button */}
            <div
              className={` cursor-pointer   ${
                areAllSubTasksCompleted ? "block" : "hidden"
              } dark:text-[#84849D] text-white w-fit h-fit hover:text-red-300 `}
              onClick={() => {
                // Takes the ID to find and then Delete the TASK
                dispatch(deleteTask({ id: id }));
              }}
            >
              <Delete className={`w-5     `} alt="delete" />
            </div>
          </div>
        </div>

        {/* SUB TASKS */}
        <div className="w-full flex gap-3 flex-col  mb-10 mt-[22px]  px-8 ">
          {subTasks?.map((item, i) => {
            return (
              <div key={i} className={`flex gap-3   `}>
                <input
                  checked={item.isCompleted}
                  onChange={(e) => {
                    if (areAllSubTasksCompleted) {
                      dispatch(
                        toggleCompleteTask({
                          id: id,
                          isCompleted: areAllSubTasksCompleted,
                        })
                      );
                    }

                    dispatch(
                      toggleCompleteSubTask({
                        taskId: id,
                        subTaskId: item.id,
                        isCompleted: e.target.checked,
                      })
                    );
                  }}
                  type="checkbox"
                  className={`  ${CompletedStyles(
                    item.isCompleted
                  )} cursor-pointer outline-none `}
                  id={i + id}
                />
                <label
                  htmlFor={i + id}
                  className={` cursor-pointer ${CompletedStyles(
                    item.isCompleted
                  )} first-letter:uppercase `}
                >
                  {item.subTask}
                </label>
              </div>
            );
          })}
        </div>

        {/* Down Icon */}
        <div className="absolute bottom-1   flex  justify-center w-[100%]">
          <div
            onClick={clickHandler}
            className={`ease-in  transition-all  w-fit h-fit  ${downIcon}`}
          >
            <Arrow
              fontSize="large"
              className={`w-12 h-12  text-3xl dark:text-[#84849D] text-white   cursor-pointer`}
              alt="open"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTodoCard;
