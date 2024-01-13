import React, { useState } from "react";
import { addTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';



const AddTaskForm = ({ setIsAddNewTask, isAddNewTask }) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  const [addedSubTask, setAddedSubTask] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState([]);
  const [title, setTitle] = useState("");

  const doneHandler = (e) => {
    e.preventDefault();

    if (addedSubTask.length >= 1) {
      setTodo([...todo, { subTasks: addedSubTask, title: title }]);
      setTitle("");
      setAddedSubTask([]);
      dispatch(addTask({ title:  !title ? "newTask" : title, subTasks: addedSubTask }));
    }
   

    isAddNewTask && setIsAddNewTask(false);
    
  };

  const addSubTaskHandler = (e) => {
    e.preventDefault();
    if (currentSubTask.length >= 1) {
      setAddedSubTask([
        ...addedSubTask,
        { subTask: currentSubTask, isCompleted: false ,id:uuidv4() },
      ]);
      setCurrentSubTask("");
    }
  };

  return (
    <div className="w-full text-[#84849D]">
      <div className="flex flex-col gap-5 w-full mb-6 justify-center items-center  ">
        <p className="text-xs flex justify-center gap-2 items-center ">
          <span className="font-bold text-[#8d8fd2]  ">note :</span> add all
          your tasks and then click the done button
        </p>
        <div className="w-[80%] flex items-center gap-3">
          <label htmlFor="title">title </label>
          <input

            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text "
            className="w-[90%]  rounded-md p-2 dark:bg-[#2F2D36] bg-[#C6CDFF] outline-none "
          />
        </div>
        <div className="w-[80%] flex gap-3 items-center">
          <label htmlFor="subTask">task</label>

          <input

            id="subTask"
            type="text"
            value={currentSubTask}
            onChange={(e) => {
              setCurrentSubTask(e.target.value);
            }}
            className="w-[80%] dark:bg-[#2F2D36] bg-[#C6CDFF] outline-none p-2 rounded-md "
          />
          <button
            onClick={addSubTaskHandler}
            className="dark:bg-[#8d8fd2] bg-[#459EFC]  text-white p-2 rounded-md w-fit sm:w-[8%]"
          >
            {" "}
            add{" "}
          </button>
        </div>
        <div className="w-[80%] flex flex-col gap-4 mt-3 ">
          <p>
            the <span className="text-[#8d8fd2] font-bold">tasks</span> you
            added :
          </p>
          <div className="w-[70%] flex overflow-y-scroll overflow-x-hidden pt-2 scrollbar-thumb-[#8d8fd2] scrollbar-thin md:h-[200px] justify-start pl-3 pb-2 flex-col gap-2">
            <p>
              <span className="text-[#8d8fd2] font-bold">0.</span> example task
            </p>
            {addedSubTask.map((item, index) => {
              return (
                <p key={index}>
                  <span className="text-[#8d8fd2] font-bold">
                    {index + 1} .{" "}
                  </span>
                  {item.subTask}
                </p>
              );
            })}
          </div>
        </div>
        <div
          className="flex w-[50%] md:w-[70%]   md:px-0
                      justify-center md:absolute md:right-12
                      md:bottom-10
                      md:justify-end gap-4 "
        >
          <button
            onClick={doneHandler}
            className="p-1 h-[40px] px-6 mt-4 dark:bg-[#8d8fd2] bg-[#459EFC]  rounded-md text-white "
          >
            done
          </button>
          <button
            onClick={() => {
              setIsAddNewTask(false);
            }}
            className="p-1 h-[40px] px-6 mt-4 dark:bg-[#8d8fd2] bg-[#459EFC]  rounded-md text-white "
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
