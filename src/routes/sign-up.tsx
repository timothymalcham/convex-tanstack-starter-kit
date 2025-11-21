import { createFileRoute } from '@tanstack/react-router'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Container } from '@/components/ui/container'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

    const handleSignIn = async () => {
        const { data, error } = await authClient.signIn.email(
        {
            email,
            password,
        },
        {
            onRequest: () => {
                setOtpLoading(true)
            },
            onSuccess: async (ctx) => {
                setOtpLoading(false)
                if (ctx.data.twoFactorRedirect) {
                    //await navigate({ to: '/verify-2fa' })
                } else {
                    await navigate({ to: '/' })
                }
            },
            onError: (ctx) => {
                setOtpLoading(false)
                alert(ctx.error.message)
            },
        },
    )

    console.log({ data, error })
  }

  const handleResetPassword = async () => {
    setForgotLoading(true)
    try {
          await authClient.forgetPassword({
              email,
              redirectTo: `${import.meta.env.VITE_SITE_URL}/reset-password`,
          });
        alert("Check your email for the reset password link!");
    } catch {
      alert('Failed to send reset password link. Please try again.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <Container>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
                void handleSignIn()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
              />
            </div>


              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    size="sm"
                    type="button"
                    onClick={handleResetPassword}
                    className="cursor-pointer"
                    disabled={forgotLoading || !email}
                  >
                    {forgotLoading ? (
                      <Loader2 size={14} className="animate-spin mr-1" />
                    ) : null}
                    Forgot your password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={otpLoading}>
                  Sign in with Password
                </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-neutral-500">
                  or continue with
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Don&apos;t have an account?{' '}
        <Link
          to="/sign-up"
          className="text-orange-400 hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200 underline"
        >
          Sign up
        </Link>
      </p>
    </Container>
  )
}
