import { getTodos, addTodo } from "@/data/todos";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET': {
                const todos = await  getTodos(); 
                res.status(200).json(todos);
                break;
            }
            case 'POST': {
                const { title, description } =  req.body;
                if (!title || !description) {
                    res.status(400).json({ error: 'Title and description are required' });
                    return;
                }

                const newTodo = await addTodo({ title, description }); 
                res.status(201).json(newTodo);
                break;
            }
           
            default: {
                res.setHeader("Allow", ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} not allowed`);
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
