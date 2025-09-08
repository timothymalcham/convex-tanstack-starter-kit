import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {AnyFieldApi, useForm} from '@tanstack/react-form'
import { authClient } from "@/lib/auth-client";
import {toast } from "sonner"
import { z } from 'zod'
import {Link, useNavigate} from "@tanstack/react-router";

const schema = z.object({
    name: z.string(),
    email: z.string().email('Invalid e-mail address'),
    password: z.string().min(8, "Password must be at least 8 characters").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
    confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
})

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <span className="text-red-500 text-xs">{field.state.meta.errors.map((err) => err.message).join(',')}</span>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            name: "",
            email: '',
            password: '',
            confirmPassword: '',
        },
        validators: {
            onSubmit: schema
        },
        onSubmit: async ({ value }) => {
            await authClient.signUp.email(
                {
                    name: value.name,
                    email: value.email,
                    password: value.password,
                },
                {
                    onError: (ctx) => {
                        console.error(ctx.error)
                        toast.error(ctx?.error?.message ?? "There was an error signing up. Please try again.")
                    },
                    onSuccess: async () => {
                        const { error } = await authClient.emailOtp.sendVerificationOtp({
                            email: value.email,
                            type: "email-verification",
                        });

                        if (!error) {
                            void navigate({
                                to: "/verify-email",
                                search: { email: value.email }
                            })
                        } else {
                            console.error(error)
                            toast.error(error.message ?? "There was an error creating your account.")
                        }
                    }
                }
            );
        },
    })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8"
                onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void form.handleSubmit()
          }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Create your account
                </p>
              </div>
                <div className="grid gap-3">
                    <form.Field
                        name="name"
                        children={(field) => (
                            <>
                                <Label htmlFor={field.name}>Full name</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    placeholder="Jane Smith"
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    required
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>
              <div className="grid gap-3">
                  <form.Field
                      name="email"
                      children={(field) => (
                          <>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  placeholder="email@example.com"
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  required
                              />
                              <FieldInfo field={field} />
                          </>
                      )}
                  />
              </div>
              <div className="grid gap-3">
                  <form.Field
                      name="password"
                      children={(field) => (
                          <>
                                  <Label htmlFor={field.name}>Password</Label>
                              <Input
                                  id={field.name}
                                  type={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  required
                              />
                              <span className="text-xs text-muted-foreground">Password must contain at least one uppercase letter, one lowercase letter, and one number</span>
                              <FieldInfo field={field} />
                          </>
                      )}
                  />
              </div>
                <div className="grid gap-3">
                    <form.Field
                        name="confirmPassword"
                        children={(field) => (
                            <>
                                    <Label htmlFor={field.name}>Confirm password</Label>
                                <Input
                                    id={field.name}
                                    type="password"
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    required
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit} className="w-full">
                    {isSubmitting ? '...' : 'Submit'}
                        </Button>
                    )}
                />
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
