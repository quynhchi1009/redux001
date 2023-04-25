import { createSlice, nanoid } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        allTodos: [
            { id: 1, title: "Sign Paper", completed: false },
            { id: 2, title: "Read Paper", completed: false },
            { id: 3, title: "Packet", completed: true },
        ],
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.allTodos.unshift(action.payload);
            },
            prepare(title) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false,
                    },
                };
            },
        },
        markComplete(state, action) {
            const todoId = action.payload;
            state.allTodos = state.allTodos.map((todo) => {
                if (todo.id === todoId) todo.completed = !todo.completed;
                return todo;
            });
        },
        deleteTodo(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        }
    },
});

//Reducer => change State
const todosReducer = todosSlice.reducer;

//Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

//Export Action
export const { addTodo, markComplete, deleteTodo } = todosSlice.actions;

//Export Reducer
export default todosReducer;
