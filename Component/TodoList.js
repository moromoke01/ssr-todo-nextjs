import Link from "next/link";
import { useDispatch } from "react-redux";

export default function TodoList({todos}){
    console.log(todos);
    const dispatch = useDispatch();

    const handleDelete = (id) =>{
        dispatch(deleteTodo(id));
    }

    return(
        <ul>
            {todos?.map((todo, index)=>(
                <>
                <li key={index}>
                    <Link href={`/todos/${todo.id}`}>
                    {todo?.title}
                    </Link>
                </li>

                <button onClick={()=> handleDelete(todo.id)}>delete</button>
                </>
            ))}
        </ul>
    )
}