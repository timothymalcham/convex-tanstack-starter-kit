import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { Input } from "../components/ui/Input";

const forgotPasswordSearchSchema = z.object({
    email: z.string().email().optional(),
    error: z.string().optional(),
    success: z.string().optional(),
});

const forgotPasswordFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const Route = createFileRoute("/forgot-password")({
    validateSearch: forgotPasswordSearchSchema,
    component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
    const { signIn } = useAuthActions();
    const navigate = useNavigate();
    const { email: searchEmail, error, success } = Route.useSearch();

    const form = useForm({
        defaultValues: {
            email: searchEmail || "",
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData();
                formData.append("email", value.email);
                formData.append("flow", "reset");

                await signIn("password", formData);

                // Redirect to reset password page
                await navigate({
                    to: "/reset-password",
                    search: {
                        email: value.email,
                    },
                });
            } catch (err) {
                // Update search params with error
                await navigate({
                    to: "/forgot-password",
                    search: {
                        email: value.email,
                        error: err instanceof Error ? err.message : "Failed to send reset email",
                    },
                });
            }
        },
        validators: {
            onChange: forgotPasswordFormSchema,
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a reset code
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="mt-8 space-y-6"
                >
                    <div className="space-y-4 rounded-md">
                        <form.Field name="email">
                            {(field) => (
                                <Field.Root>
                                    <Field.Label htmlFor={field.name}>Email address</Field.Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        autoComplete="email"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="relative block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        placeholder="Email address"
                                    />
                                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                        <Field.Error>{field.state.meta.errors.join(", ")}</Field.Error>
                                    )}
                                </Field.Root>
                            )}
                        </form.Field>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                            <p className="text-sm text-green-800 dark:text-green-400">{success}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending reset code..." : "Send reset code"}
                                </Button>
                            )}
                        </form.Subscribe>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
