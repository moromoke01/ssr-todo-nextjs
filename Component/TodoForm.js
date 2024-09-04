import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo, fetchTodos } from "@/store/todoSlice";
import { Input } from "postcss";

export default function TodoForm(){
    const [formData, setFormData] = useState({title: '', description: ''});
    const dispatch = useDispatch();


    const handleInputChange = (e) =>{
        const { title, description } = e.target;
        setFormData({...formData, [name]:value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await dispatch (createTodo(formData))
            alert("Todo created successfully");
            setFormData({title: '', description: ''});
            dispatch(fetchTodos());
        }catch(error){
            console.log('Error creating todo:', error);
            alert('failed to create todo')
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" name="title" 
            onChange={handleInputChange}
            value={formData.title} placeholder="todo title"/>
            
            <Input type="text" name="description" 
            onChange={handleInputChange}
            value={formData.description} placeholder="todo description"/>

            <button type="submit">create Todo</button>
        </form>
    )
}