import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { findIndexById } from "../helper";
import { json } from "react-router-dom";

const taskSlice = createSlice({
  name: "task",
  initialState: [
    {
      title: " example title ",
      subTasks: [
        {
          isCompleted: true,
          subTask: " example subTask 1",
          id: uuidv4(),
        },
        {
          isCompleted: true,
          subTask: " example subTask 2",
          id: uuidv4(),
        },
      ],
      isCompleted: true,
      isEditing: false,
      id: uuidv4(),
    },
  ],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        title: action.payload.title,
        subTasks: action.payload.subTasks,
        isCompleted: false,
        isEditing: false,
        id: uuidv4(),
      };
      state.push(newTask);
    },
    toggleCompleteTask: (state, action) => {
      const { id, isCompleted } = action.payload;
      const index = findIndexById(state, id);
      if (isCompleted !== undefined) {
        state[index].isCompleted = isCompleted;
      }
    },
    toggleCompleteSubTask: (state, action) => {
      const { taskId, subTaskId, isCompleted } = action.payload;
      const taskIndex = findIndexById(state, taskId);

      const subTaskIndex = findIndexById(state[taskIndex].subTasks, subTaskId);

      if (isCompleted !== undefined) {
        state[taskIndex].subTasks[subTaskIndex].isCompleted = isCompleted;
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      const index = findIndexById(state, id);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    toggleEditTask: (state, action) => {
      const { id, isEditing } = action.payload;
      const index = findIndexById(state, id);

      if (isEditing !== undefined) {
        state[index].isEditing = isEditing;
      }
    },
    editTask: (state, action) => {
      const { id, subTasks, title, isEditing } = action.payload;
      const index = findIndexById(state, id);

      state[index].isEditing = isEditing;
      state[index].subTasks = subTasks;
      state[index].title = title;

      
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
