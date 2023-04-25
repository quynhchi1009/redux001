import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk
export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return response.data;
});

export const addTodo = createAsyncThunk("todos/todoAdded", async (title) => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false,
    };
    await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
    return newTodo;
});

export const deleteTodo = createAsyncThunk(
    "todos/todoDeleted",
    async (todoId) => {
        await axios.delete(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`
        );
        return todoId;
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        allTodos: [],
    },
    reducers: {
        markComplete(state, action) {
            const todoId = action.payload;
            state.allTodos = state.allTodos.map((todo) => {
                if (todo.id === todoId) todo.completed = !todo.completed;
                return todo;
            });
        },
    },
    extraReducers: {
        //Get All todos
        [getTodos.pending]: (state, action) => {
            console.log("Fetching todos from Backend....");
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log("Fetched!");
            state.allTodos = action.payload;
        },
        [getTodos.rejected]: (state, action) => {
            console.log("Failed fetching..");
        },

        //Add todo
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload);
        },

        //Delete todo
        [deleteTodo.fulfilled]: (state, action) => {
            const todoId = action.payload;
            state.allTodos = state.allTodos.filter(
                (todo) => todo.id !== todoId
            );
        },
    },
});

//Reducer => change State
const todosReducer = todosSlice.reducer;

//Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

//Export Action
export const { markComplete } = todosSlice.actions;

//Export Reducer
export default todosReducer;
