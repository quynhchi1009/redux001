import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [
      { id: 1, title: "Sign Paper", completed: false },
      { id: 2, title: "Read Paper", completed: false },
      { id: 3, title: "Packet", completed: true },
    ],
  },
});

//Reducer => change State
const todosReducer = todosSlice.reducer;

//Selector
export const todosSelector = state => state.todosReducer.allTodos

//Export
export default todosReducer