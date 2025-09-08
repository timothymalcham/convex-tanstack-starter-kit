import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {AnyFieldApi, useForm} from '@tanstack/react-form'
import { authClient } from "@/lib/auth-client";
import {toast } from "sonner"
import { z } from 'zod'
import {useNavigate} from "@tanstack/react-router";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

const schema = z.object({
    code: z.string()
})

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export function VerifyEmailForm({
  email, className, ...props
}: {email: string} & React.ComponentProps<"div">) {
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
           code: ""
        },
        validators: {
            onSubmit: schema
        },
        onSubmit: async ({ value }) => {
            // const { error } = await authClient.emailOtp.checkVerificationOtp({
            //     email,
            //     type: "email-verification",
            //     otp: value.code,
            // })
            //
            // if (error) {
            //     console.log(email, value.code.toString())
            //     console.error(error)
            //     toast.error("The code could not be verified");
            //     return;
            // }

           const { error: verificationError } = await authClient.emailOtp.verifyEmail({
                email,
                otp: value.code.toString()
            });

            if (verificationError) {
                console.log(email, value.code.toString())
                console.error(verificationError)
                toast.error("Your email could not be verified at this time");
            } else {
                void navigate({ to: "/" })
            }

            // the user has already signed up, so let's sign them in automatically:
            // const { error: signInError } = await authClient.signIn.emailOtp({
            //     email,
            //     otp: value.code,
            // });

            // if (signInError) {
            //     console.error(signInError)
            //     toast.error("Authentication failed");
            //     return
            // }

            // if all went well, let's redirect them to the dashboard since they are fully authenticated now

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
                <h1 className="text-2xl font-bold">Verify your email</h1>
              </div>
              <div className="grid gap-3">
                  <form.Field
                      name="code"
                      children={(field) => (
                          <>
                              <Label htmlFor={field.name}>Code</Label>
                              <InputOTP
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(value) => field.handleChange(value)}
                                  maxLength={6}
                                  required
                              >
                                  <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                              </InputOTP>
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
    </div>
  )
}
