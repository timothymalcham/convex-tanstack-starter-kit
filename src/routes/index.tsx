import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useMutation } from "convex/react";
import { api } from "~/_generated/api";
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { Input } from "@/components/ui/input"

// Tanstack Router - Route Setup
export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    // Convex Queries & Mutations
    const todosQuery = useSuspenseQuery(convexQuery(api.todo.getAll, {}))
    const createTodoItem = useMutation(api.todo.create);

    // Tanstack Form
    const form = useForm({
        defaultValues: {
            title: ""
        },
        validators: {
            // Pass a schema or function to validate
            onSubmit: z.object({
                title: z.string(),
            }),
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log("creating todo item: ",  JSON.stringify(value));
            await createTodoItem({ title: value.title })
        },
    })

    return (
        <div>
            <h2>Add a todo item:</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    void form.handleSubmit()
                }
            }>
                <form.Subscribe
                    selector={(state) => [state.errorMap]}
                    children={([errorMap]) =>
                        errorMap.onSubmit ? (
                            <div>
                                <em>There was an error on the form: {errorMap.onSubmit.toString()}</em>
                            </div>
                        ) : null
                    }
                />
                <form.Field
                    name="title"
                    children={(field) => (
                        <div>
                        <Input
                            name="title"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                            {field.state.meta.errors.map((error) => (
                                error && <p key={error as never as string}>{error.message}</p>
                            ))}
                        </div>
                    )}
                />
                <form.Subscribe
                    selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <button type="submit" disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Submit'}
                        </button>
                    )}
                </form.Subscribe>
            </form>


            <h2>Todo items:</h2>
            <ul>
                {todosQuery.data.map(t => (
                    <li key={t._id}>{t.title}</li>
                ))}
            </ul>
        </div>
    )
}