import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { getTodoData, fetchTodos, updateTodo, createTodo, deleteTodo } from "@/store/todoSlice";
import { useState, useEffect } from "react";
import TodoList from "@/pages/component/TodoList";
import TodoForm from "@/pages/component/TodoForm";
import { wrapper } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(getTodoData);

  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleSave = async (todo) => {
    if (todo.id) {
      console.log("Updating Todo ID:", todo.id);
      dispatch(updateTodo({
        id: todo.id,
        updatedTodo: {
          title: todo.title,
          description: todo.description,
        },
      }));
    } else {
      const newTodo = await dispatch(createTodo({
        title: todo.title,
        description: todo.description,
      }));

      console.log("New Todo Created with ID:", newTodo.payload.id);
      
      if (newTodo.payload?.id) {
        setCurrentTodo({ ...todo, id: newTodo.payload.id });
      }
    }

    dispatch(fetchTodos());
    setCurrentTodo(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="min-h-screen m-auto flex flex-col items-center justify-center bg-gray-200">
      <div className="w-full p-5 m-4 bg-blue-900 rounded-lg shadow-md sm:w-3/4 md:w-2/3 lg:w-3/6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white">My Todo List</h1>

        <TodoForm 
          initialData={currentTodo || {}}
          onSave={handleSave}
        />

        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && todos.length > 0 &&
          <div className="mt-4 bg-white rounded-lg p-4">
            {todos.map((todo) => (
              <TodoList 
                key={todo.id}
                todo={todo} 
                onEdit={setCurrentTodo}
                onDelete={handleDelete}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

// Import wrapper from your store configuration
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(fetchTodos());
  return {
    props: {},
  };
});

export default Home;
