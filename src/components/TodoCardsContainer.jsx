import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { GridTodoCard, ListTodoCard } from "./common";
import AddTaskForm from "./AddTaskForm";
import EditTask from "./EditTask";

const TodoCardsContainer = ({ view, display }) => {
  const todosList = useSelector((state) => state.tasks);
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTask, setEditingTask] = useState("");

  const sortTodos = (display) => {
    if (display === "all") return todosList;
    return todosList.filter((item) =>
      display === "completed" ? item.isCompleted : !item.isCompleted
    );
  };

  let todos = sortTodos(display);

  
  return (
    <div className="w-screen relative flex lg:relative overflow-hidden items-end flex-col">
      <div className="w-[100vw] mt-10 lg:mt-0 lg:ml-[262px] rounded-t-[30px] lg:rounded-[30px] h-screen lg:w-[65%] lg:flex-grow lg:mr-[100px] lg:h-[80vh] relative overflow-y-scroll scrollbar-none pl-1 dark:bg-[#18181c] bg-[#efefef]">
        <p className="dark:text-[#805cf7] text-[#0f6bae] p-1 pl-[26px] w-full h-[50px] z-[2] dark:bg-[#18181c] bg-[#efefef] mt-[20px] sticky top-0 font-[600] text-[24px] font-[lato]">
          {isAddNewTask ? "New Task" : isEditingTask ? "Edit Task" : "tasks"}
        </p>
        {isAddNewTask ? (
          <AddTaskForm
            isAddNewTask={isAddNewTask}
            setIsAddNewTask={setIsAddNewTask}
          />
        ) : isEditingTask && editingTask ? (
          <EditTask setIsEditingTask={setIsEditingTask} data={editingTask} />
        ) : (
          <div
            className={`p-4 flex flex-row flex-wrap gap-[10px] ${
              todos?.length > 1 && "justify-center"
            } lg:justify-start w-full h-fit`}
          >
            {!todos?.length ? (
              <p className="w-full h-[50vh] items-center flex justify-center gap-1 text-[#65636c] text-lg">
                "There is no{" "}
                <span className="font-bold dark:text-[#805cf7] text-[#0f6bae]">
                  {display === "all" ? "task" : `${display} task`}
                </span>{" "}
                to show."
              </p>
            ) : (
              todos?.map((item, i) =>
                view === "list" ? (
                  <ListTodoCard
                    key={i}
                    {...item}
                    showEditPage={isEditingTask}
                    setShowEditPage={setIsEditingTask}
                    setData={setEditingTask}
                  />
                ) : (
                  <GridTodoCard
                    key={i}
                    {...item}
                    showEditPage={isEditingTask}
                    setShowEditPage={setIsEditingTask}
                    setData={setEditingTask}
                  />
                )
              )
            )}
          </div>
        )}
      </div>
      {!isAddNewTask && !isEditingTask && (
        <button
          onClick={() => setIsAddNewTask(true)}
          className="lg:sticky fixed cursor-pointer dark:bg-[#825FF7] bg-[#3E9DFF] font-bold text-white flex justify-center items-center bottom-12 shadow-xl lg:w-32 py-3 px-4 lg:py-2 lg:px-0 rounded-md lg:right-32 lg:bottom-24 right-6"
        >
          New Task
        </button>
      )}
    </div>
  );
};

export default TodoCardsContainer;
