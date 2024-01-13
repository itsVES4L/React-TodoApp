import React, { useEffect, useState } from "react";

// components
import GridTodoCard from "./common/GridTodoCard";
import ListTodoCard from "./common/ListTodoCard";
import AddTaskForm from "./AddTaskForm";
import { useSelector } from "react-redux";
import EditTask from "./EditTask";

const TodoCardsContainer = ({ view, display }) => {
  //
  const [isAddNewTask, setIsAddNewTask] = useState(false); //it change by click on new task button OR close button
  const [isEditingTask, setIsEditingTask] = useState(false); //it change by click on edit button

  const changeTodos = (display) => {
    if (display === "all") return tasks;
    if (display === "completed")
      return tasks.filter((item) => item.isCompleted === true);
    if (display === "active")
      return tasks.filter((item) => item.isCompleted === false);
  };
  // Tasks array

  const tasks = useSelector((state) => state.tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  let todos = changeTodos(display);
  // the task being edited :
  const [editingTask, setEditingTask] = useState("");
 

  return (
    <div className="w-screen  relative flex   lg:relative  overflow-hidden items-end flex-col   ">
      <div
        className="w-[100vw] mt-10 
      lg:mt-0
      lg:ml-[262px] 
      rounded-t-[30px]
      lg:rounded-[30px] h-screen   
      lg:w-[65%] lg:flex-grow
      lg:mr-[100px]
      lg:h-[80vh]
      
      relative
      overflow-y-scroll scrollbar-none pl-1  dark:bg-[#18181c] bg-[#efefef]"
      >
        <p className="dark:text-[#805cf7] text-[#0f6bae] p-1 pl-[26px] w-full  h-[50px] z-[2] dark:bg-[#18181c] bg-[#efefef] mt-[20px]  sticky top-0   font-[600] text-[24px] font-[lato]">
          {isAddNewTask ? "New Task" : isEditingTask ? "Edit Task" : "tasks"}
        </p>
        {/* add new task component ( OR ) todo Cards components ( OR ) edit Tasks component */}
        {isAddNewTask ? (
          <AddTaskForm
            isAddNewTask={isAddNewTask}
            setIsAddNewTask={setIsAddNewTask}
          />
        ) : isEditingTask && editingTask ? (
          <EditTask setIsEditingTask={setIsEditingTask} data={editingTask} />
        ) : (
          //
          <div
            className={` p-4 flex flex-row flex-wrap gap-[10px] ${
              todos?.length > 1 && "justify-center"
            }  lg:justify-start   w-full h-fit`}
          >
            {/* when there is no TASK : */}
            {!todos?.length && (
              <p className="w-full  h-[50vh] items-center flex justify-center gap-1 text-[#65636c] text-lg">
                {" "}
                " there is no{" "}
                <span className="font-bold dark:text-[#805cf7] text-[#0f6bae]">
                  {display === "all" ? "task" : `${display} task`}
                </span>{" "}
                to Show "{" "}
              </p>
            )}
            {/* when there is TASKS : */}
            {todos?.map((item, i) =>
              // Change view to LIST OR GRID, by view State
              view === "list" ? (
                <ListTodoCard
                  key={i}
                  title={item.title}
                  subTasks={item.subTasks}
                  id={item.id}
                  isEditing={item.isEditing}
                  isCompleted={item.isCompleted}
                  showEditPage={isEditingTask}
                  setShowEditPage={setIsEditingTask}
                  setData={setEditingTask}
                />
              ) : (
                <GridTodoCard
                  key={i}
                  title={item.title}
                  subTasks={item.subTasks}
                  id={item.id}
                  isEditing={item.isEditing}
                  isCompleted={item.isCompleted}
                  showEditPage={isEditingTask}
                  setShowEditPage={setIsEditingTask}
                  setData={setEditingTask}
                />
              )
            )}
          </div>
        )}
      </div>
      {!isAddNewTask && !isEditingTask && (
        // show new task button
        <button
          onClick={() => {
            setIsAddNewTask(true);
          }}
          className="lg:sticky fixed cursor-pointer dark:bg-[#825FF7] bg-[#3E9DFF]
            font-bold text-white flex
            justify-center items-center
            bottom-12 shadow-xl lg:w-32
            py-3 px-4 lg:py-2 lg:px-0
            rounded-md
            lg:right-32
            lg:bottom-24
            right-6"
        >
          New Task
        </button>
      )}
    </div>
  );
};

export default TodoCardsContainer;
