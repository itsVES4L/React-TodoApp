import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, toggleEditTask } from "../redux/taskSlice";

const EditTask = ({ setIsEditingTask, data }) => {
  const dispatch = useDispatch();
  const taskData = data || {};
  
  const handleChange = (index, field, value) => {
    setSubTasks((prevSubTasks) => {
      const newSubTasks = [...prevSubTasks];
      newSubTasks[index] = { ...newSubTasks[index], [field]: value };
      return newSubTasks;
    });
  };

  const handleDoneClick = () => {
    setIsEditingTask(false);
    if (taskData) {
      dispatch(toggleEditTask({ id: taskData.id, isEditing: false }));
      dispatch(editTask({
        id: taskData.id,
        subTasks: subTasks,
        title: title,
        isEditing: false,
      }));
    }
  };

  const [subTasks, setSubTasks] = useState(taskData.subTasks || []);
  const [title, setTitle] = useState(taskData.title || "");

  return (
    <div className="w-full text-[#84849D]">
      <div className="flex flex-col gap-5 w-full mb-6 justify-center items-center">
        <p className="text-xs flex justify-center gap-2 items-center">
          <span className="font-bold text-[#8d8fd2]">note :</span> edit the
          tasks you want and then click the done button!
        </p>
        <div className="w-[80%] flex flex-col items-start gap-3">
          <label htmlFor="title">title </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            className="w-[88%] rounded-md p-2 dark:bg-[#2F2D36] bg-[#C6CDFF] outline-none"
          />
        </div>
        <div className="w-[80%] flex flex-col gap-3 items-start h-fit">
          <p>tasks:</p>
          <div className="flex flex-col gap-3 w-full scrollbar-thumb-[#8d8fd2] scrollbar-thin overflow-y-auto md:h-[160px] h-[340px]">
            {subTasks.map((item, index) => (
              <div className="flex items-center justify-start gap-2" key={index}>
                <span className="text-center text-[#8d8fd2] rounded-full"> {index + 1} </span>
                <input
                  value={item.subTask}
                  onChange={(e) => handleChange(index, 'subTask', e.target.value)}
                  id="subTask"
                  type="text"
                  className="w-[84%] dark:bg-[#2F2D36] bg-[#C6CDFF] outline-none p-2 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[50%] md:w-[70%]  mr-8 md:px-0 justify-center items-center md:absolute md:right-12 md:bottom-10 md:justify-end gap-4">
          <button
            onClick={handleDoneClick}
            className="p-1 h-[40px] w-full px-6 mt-4 dark:bg-[#8d8fd2] bg-[#3E9DFF] rounded-md text-white"
          >
            done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
