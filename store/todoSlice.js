import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
    const res = await axiosInstance.get('/todos');
    return res.data;
})

export const fetchTodo = createAsyncThunk('todos/fetchTodo', async(id) => {
    const res = await axiosInstance.get(`/todos/${id}`);
    return res.data;
})

export const createTodo = createAsyncThunk('todos/createTodo', async(todo)=>{
    const res = await axiosInstance.post('/todos', todo);
    return res.data;
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async({id, updatedTodo})=>{
   const res = await axiosInstance.put(`/todos/${id}`, updatedTodo);
   return res.data;
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async(id)=>{
    await axiosInstance.delete(`/todos/${id}`);
    return id;
})


// export const deleteTodo = createAsyncThunk('todo/deleteTodo', async(id)=> {
//     const response = await fetch(`/todos/${id}`, {
//         method: 'DELETE',
//     });

//     if(!response.ok){
//         throw new Error('failed to delete the todo');
//     }
//     return id;
// });





const todosSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: null,
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle a single todo separately
            .addCase(fetchTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todo = action.payload;  // Use a separate field for a single todo
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Create todo
            .addCase(createTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos.push(action.payload);
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Update todo
            .addCase(updateTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedTodo = action.payload;
                const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
                if (index !== -1) {
                    state.todos[index] = updatedTodo;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Delete todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const id = action.payload;
                const index = state.todos.findIndex(todo => todo.id === id);
                if (index !== -1) {
                    state.todos.splice(index, 1);
                }
            });

        //delete extraReducer
        // .addCase(deleteTodo.fulfilled, (state, action)=>{
        //     state.status = 'succeeded';
        //     state.todos = state.todos.filter(todo=> todo.id !== action.payload)
        // })
       
        
    }
});

export const getTodoData = (state) => state.todo
export default todosSlice.reducer;