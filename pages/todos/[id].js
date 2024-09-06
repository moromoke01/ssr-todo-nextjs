import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo, getTodoData } from '@/store/todoSlice'; 

export default function TodoDetail() {
  const dispatch = useDispatch();
  const { todo, status, error } = useSelector(getTodoData);
  const router = useRouter();
  const { id } = router.query; // Fetch the todo ID from the query parameter

  useEffect(() => {
    if (id) {
      console.log("Fetching todo with ID:", id); 
      dispatch(fetchTodo(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <p className='text-center'>Loading...</p>;
  }

  if (status === "failed") {
    return <p className='text-center'>Error: {error}</p>;
  }

  return (
    <div className="w-full mx-auto m-4 p-4 mt-10 bg-blue-900 sm:w-3/4 md:w-2/3 lg:w-3/6">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Todo Detail</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Todo Title: <b>{todo?.title}</b></h2>
        <p>ID: {todo?.id}</p>
        <p>Description: <span className='text-red-500'><b>{todo?.description}</b></span></p>
      </div>
    </div>
  );
}
