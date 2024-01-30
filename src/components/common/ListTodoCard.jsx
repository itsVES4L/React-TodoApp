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

import {
  KeyboardArrowDown as Arrow,
  DeleteForever as Delete,
  DriveFileRenameOutlineRounded as Edit,
} from "@mui/icons-material";

const ListTodoCard = ({
  title,
  subTasks,
  id,
  isEditing,
  setShowEditPage,
  setData,
}) => {
  const dispatch = useDispatch();
  const areAllSubTasksCompleted = subTasks?.every((task) => task?.isCompleted);
  const anyTaskIsUnCompleted = subTasks?.some((task) => !task.isCompleted);
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
    if (open) closeTheCard();
    else openTheCard();
  };

  const CompletedStyles = (completed) => {
    if (!completed) return "text-white";
    return "dark:text-[#b7a3a399] text-[#ffffff54] dark:accent-[#b7a3a399] accent-[#ffffff54] line-through";
  };

  useEffect(() => {
    dispatch(
      toggleCompleteTask({ id: id, isCompleted: areAllSubTasksCompleted })
    );
    if (areAllSubTasksCompleted) closeTheCard();
  }, [subTasks]);

  useEffect(() => {
    const index = findIndexByIsEditingValue(todos, isEditing);
    setData(todos[index]);
  }, [isEditing]);

  const todos = useSelector((state) => state.tasks);

  const handleClick = () => {
    dispatch(toggleEditTask({ id: id, isEditing: true }));
    setShowEditPage(true);
  };

  return (
    <div className="flex w-full justify-center">
      <div
        className={`w-[95%] transition-all ease-in overflow-hidden rounded-xl delay-300 ${style} dark:bg-[#2f2d36] bg-[#3E9DFF] relative`}
      >
        <div className="w-full flex flex-row justify-between gap-4 mt-7 px-4">
          <p
            className={`flex relative bottom-1 transition-all delay-150 ease-in ${CompletedStyles(
              areAllSubTasksCompleted
            )} items-center text-[20px]`}
          >
            {title}
          </p>
          <div className="flex gap-2">
            <div
              onClick={handleClick}
              className={`w-fit h-fit cursor-pointer ${
                !areAllSubTasksCompleted ? "block" : "hidden"
              } dark:text-[#84849D] text-white`}
            >
              <Edit />
            </div>
            <div
              className={`cursor-pointer ${
                areAllSubTasksCompleted ? "block" : "hidden"
              } dark:text-[#84849D] text-white w-fit h-fit hover:text-red-300`}
              onClick={() => dispatch(deleteTask({ id: id }))}
            >
              <Delete className={`w-5`} alt="delete" />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3 flex-col mb-10 mt-[22px] px-8">
          {subTasks?.map((item, i) => (
            <div key={i} className={`flex gap-3`}>
              <input
                checked={item.isCompleted}
                onChange={(e) => {
                  if (areAllSubTasksCompleted)
                    dispatch(
                      toggleCompleteTask({
                        id: id,
                        isCompleted: areAllSubTasksCompleted,
                      })
                    );
                  dispatch(
                    toggleCompleteSubTask({
                      taskId: id,
                      subTaskId: item.id,
                      isCompleted: e.target.checked,
                    })
                  );
                }}
                type="checkbox"
                className={`${CompletedStyles(
                  item.isCompleted
                )} cursor-pointer outline-none`}
                id={id}
              />
              <label
                htmlFor={id}
                className={`cursor-pointer ${CompletedStyles(
                  item.isCompleted
                )} first-letter:uppercase`}
              >
                {item.subTask}
              </label>
            </div>
          ))}
        </div>
        <div className="absolute bottom-1 flex justify-center w-[100%]">
          <div
            onClick={clickHandler}
            className={`ease-in transition-all w-fit h-fit ${downIcon}`}
          >
            <Arrow
              fontSize="large"
              className={`w-12 h-12 text-3xl dark:text-[#84849D] text-white cursor-pointer`}
              alt="open"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTodoCard;
