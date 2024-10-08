let todos = [
    { id: 1, title: "reading", description: "reading at midnight" },
    { id: 2, title: "meeting", description: "attending meeting by 2pm" }
  ];
  
  export const getTodos = () => todos;
  
  export const getTodoById = (id) => {
    console.log("Searching for todo with ID:", id);
    return todos.find((todo) => todo.id === parseInt(id, 10));
  }
  
  export const addTodo = (todo) => {
    const newId = Date.now(); 
    const newTodo = { ...todo, id: newId };
    todos.push(newTodo);
    return newTodo;
  };
  
  export const updateTodoById = (id, data) => {
    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));
    if (index !== -1) {
      todos[index] = { ...todos[index], ...data };
      return todos[index];
    }
    return null;
  };
  
  export const deleteTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1);
      return deletedTodo[0];
    }
    return null;
  };
  