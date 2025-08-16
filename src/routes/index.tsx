import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

async function fun() {
    return parseInt(
        await new Promise(resolve => setTimeout(resolve, 2000))
    )
}

const serverFun = createServerFn({
    method: 'GET',
}).handler(() => {
    return fun()
})


export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await serverFun(),
})

function Home() {
    const router = useRouter()
    const state = Route.useLoaderData()

    return (
        <div>Hello world</div>
    )
}