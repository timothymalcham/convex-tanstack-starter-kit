import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useMutation } from "convex/react";
import { api } from "~/_generated/api";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const todos = useSuspenseQuery(convexQuery(api.todo.getAll, {}))
    const createTodoItem = useMutation(api.todo.create);

    return (
        <div>
            <h2>Add a todo item:</h2>

            <form onSubmit={async (e) => {
                e.preventDefault()

                const title = e.currentTarget.value;
                console.log(title)
                await createTodoItem({ title })
            }}>
                <input type="text" name="title" placeholder="Title" />
            </form>

            <ul>
                {todos.data.map(t => (
                    <li key={t.id}>{t.title}</li>
                ))}
            </ul>
        </div>
    )
}