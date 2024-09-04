import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
    const res = await axiosInstance.get('/todos');
    return res.data;
})

export const createTodo = createAsyncThunk('todos/createTodo', async(todo)=>{
    const res = await axiosInstance.post('/todos', todo);
    return res.data;
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async({id, todo})=>{
    await axiosInstance.delete(`/todos/${id}`);
    return id;
})





const todosSlice = createSlice({
    name: 'todo',
    initialState:{
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state)=> {
            state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(createTodo.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(createTodo.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.todos.push(action.payload);
        })
        .addCase(createTodo.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })

        //delete extraReducer
        .addCase(deleteTodo.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(deleteTodo.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.todos = state.todos.filter(todo=> todo.id !== action.payload)
        })
        .addCase(deleteTodo.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export const getTodoData = (state) => state.todo
export default todosSlice.reducer;