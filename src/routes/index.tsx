import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useMutation } from "convex/react";
import { api } from "~/_generated/api";
import { z } from 'zod'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submitButton"

// Tanstack Router - Route Setup
export const Route = createFileRoute('/')({
    component: Home,
})

// Tanstack Form - Form Setup
const { fieldContext, formContext } = createFormHookContexts()

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
    fieldComponents: {
        Input,
    },
    formComponents: {
        SubmitButton,
    },
    fieldContext,
    formContext,
})

function Home() {
    // Convex Queries & Mutations
    const todosQuery = useSuspenseQuery(convexQuery(api.todo.getAll, {}))
    console.log("TODOS: ", todosQuery);
    const createTodoItem = useMutation(api.todo.create);

    // Tanstack Form
    const form = useAppForm({
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

            <form onSubmit={async (e) => {
                e.preventDefault()
                await form.handleSubmit()
            }}>
                {/* Components are bound to `form` and `field` to ensure extreme type safety */}
                {/* Use `form.AppField` to render a component bound to a single field */}
                <form.AppField
                    name="title"
                    children={(field) => <field.Input name="title" />}
                />
                {/* Components in `form.AppForm` have access to the form context */}
                <form.AppForm>
                    <form.SubmitButton />
                </form.AppForm>
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