import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    todosSelector,
    markComplete,
    deleteTodo,
    getTodos
} from "../store/reducers/todosSlice";
import TodoForm from "./Todoform";

const Todos = () => {
    const todos = useSelector(todosSelector);
    const dispatch = useDispatch();

    const toggleTodoCompleted = (todoId) => {
        // console.log(todoId);
        dispatch(markComplete(todoId));
    };

    const deleteSingleTodo = (todoId) => {
        dispatch(deleteTodo(todoId));
    };

    //[], Component chi chay 1 lan luc khoi tao, khong chay khi thay doi
    useEffect(() => {
        //Send request to JSONplaceholder
        dispatch(getTodos());
        //dispatch
    }, [dispatch]);

    return (
        <div className='todo-list'>
            <TodoForm />
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={todo.completed ? "completed" : ""}>
                        {todo.title}
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            onChange={toggleTodoCompleted.bind(this, todo.id)}
                        />
                        <button onClick={deleteSingleTodo.bind(this, todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
