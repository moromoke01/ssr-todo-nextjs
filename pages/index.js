import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { getTodoData, fetchTodos } from "@/store/todoSlice";
import { useEffect } from "react";
import TodoList from "@/Component/TodoList";
import TodoForm from "@/Component/TodoForm";

import { wrapper } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(getTodoData);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Todos</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && todos.length > 0 &&
        <TodoList todos={todos} />
      }

      <h1>Create Todos</h1>
      <TodoForm />
    </div>
  );
}

// Import wrapper from your store configuration
export const getServerSideProps =  wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(fetchTodos());
  return {
    props: {}
  };
});

export default Home;
