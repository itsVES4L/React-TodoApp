import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { findIndexById } from "../helper";

let initialState;
try {
  const storedData = localStorage.getItem("toDosList");
  initialState = (storedData && JSON.parse(storedData)) || [];
} catch (error) {
  console.error("Error parsing JSON from local storage:", error);
  initialState = [];
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, subTasks } = action.payload;
      const newTask = {
        title,
        subTasks,
        isCompleted: false,
        isEditing: false,
        id: uuidv4(),
      };
      state.push(newTask);
      localStorage.setItem("toDosList", JSON.stringify(state));
    },
    toggleCompleteTask: (state, action) => {
      const { id, isCompleted } = action.payload;
      const index = findIndexById(state, id);
      if (index !== -1) {
        state[index].isCompleted = isCompleted;
        localStorage.setItem("toDosList", JSON.stringify(state));
      }
    },

    toggleCompleteSubTask: (state, action) => {
      const { taskId, subTaskId, isCompleted } = action.payload;
      const taskIndex = findIndexById(state, taskId);

      const subTaskIndex = findIndexById(state[taskIndex].subTasks, subTaskId);

      if (isCompleted !== undefined) {
        state[taskIndex].subTasks[subTaskIndex].isCompleted = isCompleted;
      }
      localStorage.setItem("toDosList", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      const index = findIndexById(state, id);

      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("toDosList", JSON.stringify(state));
    },
    toggleEditTask: (state, action) => {
      const { id, isEditing } = action.payload;
      const index = findIndexById(state, id);

      if (isEditing !== undefined) {
        state[index].isEditing = isEditing;
      }
      localStorage.setItem("toDosList", JSON.stringify(state));
    },
    editTask: (state, action) => {
      const { id, subTasks, title, isEditing } = action.payload;
      const index = findIndexById(state, id);

      state[index].isEditing = isEditing;
      state[index].subTasks = subTasks;
      state[index].title = title;
      localStorage.setItem("toDosList", JSON.stringify(state));
    },
  },
});

export const {
  addTask,
  toggleCompleteTask,
  toggleCompleteSubTask,
  deleteTask,
  toggleEditTask,
  editTask,
} = taskSlice.actions;
export default taskSlice.reducer;
