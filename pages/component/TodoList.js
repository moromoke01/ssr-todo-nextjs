import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";


export default function TodoList({ todo, onEdit, onDelete }) {

    return (
                <div className="flex justify-between items-center p-4 border-b">
                  
                        <h3 className="text-lg px-5 font-semibold">{todo?.title}</h3>
                
                    <div className="pl-5">
                        <button onClick={() => onEdit(todo)} className="mr-2 text-blue-500">
                            <FaEdit className="text-blue-600" />
                        </button>

                        <button onClick={() => onDelete(todo.id)} className="text-red-500">
                            <RiDeleteBin6Fill className="text-red-600" />
                        </button>

                 <Link href={`/todos/${todo?.id}`}>
                    <button
                      className="p-2 ">
                     <IoEyeSharp />
                    </button>
                  </Link>
                    </div>
                </div>
        
    );
}
