let todos = [
    {id:1, title: "reading", description: "reading at midnight"},
    {id:2, title: "meeting", description: "attending meeting by 2pm"}
]

export const getTodos = ()=> todos

export const getTodoById = (id) => todos.find((todo)=> todo.id === parseInt(id, 10));

export const addTodo = (todo) => {
    const newTodo = {...todo, id:todo.length +1};
    todos.push(newTodo);
    return newTodo;
}

export const updateTodoById =  (id, data) => {
    const index = todos.findIndex((todo)=> todo.id === parseInt(id, 10));
    if(index !== -1){
        todos[index] = {...todos[index], ...data};

    }
    return null;
}

export const deleteTodoById = (id) => {
    const index = todos.findIndex((todo)=> todo.id === parseInt(id, 10));
    if(index !== -1){
        const deletedTodo = todos.splice(index, 1);
        return deletedTodo[0];
    }

    return null;
}