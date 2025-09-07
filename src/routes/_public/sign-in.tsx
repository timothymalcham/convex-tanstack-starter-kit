import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/sign-in')({
  component: RouteComponent,
    beforeLoad: ({ context }) => {
        if (context.userId) {
            throw redirect({ to: '/' })
        }
    },
})

function RouteComponent() {
  return <div>Hello "/sign-in"!</div>
}
