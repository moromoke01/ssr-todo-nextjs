import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo, fetchTodos } from "@/store/todoSlice";


export default function TodoForm(){
    const [formData, setFormData] = useState({title: '', description: ''});
    const dispatch = useDispatch();


    const handleInputChange = (e) =>{
        const { name , value } = e.target;
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
        <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 rounded-lg border"
        placeholder="Enter todo title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 mt-2 rounded-lg border"
        placeholder="Enter todo description"
      />
      <button type="submit" className="mt-2 py-2 px-5 bg-blue-500 text-white rounded-xl">
        {formData.id ? 'Update' : 'Add'}
      </button>
    </form>
    )
}