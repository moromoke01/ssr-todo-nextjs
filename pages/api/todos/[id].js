import { getTodoById, deleteTodoById, updateTodoById } from "@/data/todos";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req; 

    console.log("Received ID:", id);

    try {
        switch (method) {
            case 'GET': {
                const todo = getTodoById(id); 
                if (!todo) {
                    res.status(404).json({ error: 'Todo not found' });
                    return;
                }
                res.status(200).json(todo);
                break;
            }
            case 'DELETE': {
                const deletedTodo = deleteTodoById(id); 
                if (!deletedTodo) {
                    res.status(404).json({ error: 'Todo not found' });
                    return;
                }
                res.status(204).end(); // No content
                break;
            }
            case 'PUT': { 
                const data = req.body;
                const updatedTodo = updateTodoById(id, data); 
                if (!updatedTodo) {
                    res.status(404).json({ error: 'Todo not found or not updated' });
                    return;
                }
                res.status(200).json(updatedTodo);
                break;
            }
            default: {
                res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
                res.status(405).end(`Method ${req.method} not allowed`);
                break;
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
