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
const GridTodoCard = ({
  title,
  subTasks,
  id,
  isCompleted,
  setShowEditPage,
  isEditing,
  setData,
}) => {
  // const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  // check if all of tasks are Completed
  const areAllSubTasksCompleted = subTasks.every((task) => task.isCompleted);
  // check if there is any unCompleted task
  const anyTaskIsUnCompleted = subTasks.some(
    (task) => task.isCompleted === false
  );

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
    }
  }, [subTasks]);

  useEffect(() => {
    const index = findIndexByIsEditingValue(todos, isEditing);
    setData(todos[index]);
  }, [isEditing]);

  // Tasks Array
  const todos = useSelector((state) => state.tasks);
  // click handler for edit task
  const handleClick = () => {
    dispatch(toggleEditTask({ id: id, isEditing: true }));

    setShowEditPage(true);
  };
  return (
    <div className=" w-[170px]  lg:w-[270px] h-auto min-h-[120px] dark:bg-[#2f2d36] bg-[#3E9DFF] rounded-xl">
      <div className="flex p-3  justify-between">
        <div className="flex gap-2">
          <p
            className={` flex relative bottom-1 transition-all delay-150 ease-in ${CompletedStyles(
              areAllSubTasksCompleted
            )}    items-center  font-bold`}
          >
            {title}
          </p>
        </div>
        <div className="flex gap-2">
          {/* EDIT button */}
          <div
            className={`w-fit h-fit  cursor-pointer ${
              !areAllSubTasksCompleted ? "block" : "hidden"
            } dark:text-[#84849D] text-white `}
          >
            <Edit onClick={handleClick} />
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

      <div className="px-3 pb-3 flex flex-col gap-2">
        {/* SUB TASKS */}

        {subTasks.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-2  justify-start   items-center"
            >
              <div className="flex gap-2 bg justify-start  items-start ">
                {/* isCompleted CheckBox: */}
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
                  id={index + id}
                  className={`delay-300 ${CompletedStyles(
                    item.isCompleted
                  )} cursor-pointer outline-none mt-1.5 `}
                  type="checkbox"
                />

                <label
                  htmlFor={index + id}
                  className={`cursor-pointer ${CompletedStyles(
                    item.isCompleted
                  )} first-letter:uppercase     h-full break-words   w-[120px] text-start`}
                >
                  {item.subTask}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridTodoCard;
