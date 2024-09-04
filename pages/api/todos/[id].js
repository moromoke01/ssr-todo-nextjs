import { getTodoById, deleteTodoById } from "@/data/todos";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = new req;

    try {
        switch (method) {
            case 'GET': {
                const todo = await new getTodoById(id); // Await the result of getTodoById
                if (!todo) {
                    res.status(404).json({ error: 'Todo not found' });
                    return;
                }
                res.status(200).json(todo);
                break;
            }
            case 'DELETE': {
                await deleteTodoById(id); // Await the result of deleteTodoById
                res.status(204).end();
                break;
            }
            default: {
                res.setHeader('Allow', ['GET', 'DELETE']);
                res.status(405).end(`Method ${req.method} not allowed`);
                break;
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
