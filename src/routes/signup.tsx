import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { Input } from "../components/ui/Input";

const signupSearchSchema = z.object({
    error: z.string().optional(),
    redirect: z.string().optional(),
});

const signupFormSchema = z
    .object({
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const Route = createFileRoute("/signup")({
    validateSearch: signupSearchSchema,
    component: SignupPage,
});

function SignupPage() {
    const { signIn } = useAuthActions();
    const navigate = useNavigate();
    const { error, redirect } = Route.useSearch();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData();
                formData.append("email", value.email);
                formData.append("password", value.password);
                formData.append("flow", "signUp");

                await signIn("password", formData);
                // Redirect to verification page
                await navigate({ 
                    to: "/verify", 
                    search: { 
                        email: value.email,
                        redirect 
                    } 
                });
            } catch (err) {
                // Update search params with error
                await navigate({
                    to: "/signup",
                    search: {
                        error: err instanceof Error ? err.message : "Failed to create account",
                        redirect,
                    },
                });
            }
        },
        validators: {
            onChange: signupFormSchema,
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or{" "}
                        <Link
                            to="/login"
                            search={{ redirect }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            sign in to your existing account
                        </Link>
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

                        <form.Field name="password">
                            {(field) => (
                                <Field.Root>
                                    <Field.Label htmlFor={field.name}>Password</Field.Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="password"
                                        autoComplete="new-password"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="relative block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        placeholder="Password (min 8 characters)"
                                    />
                                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                        <Field.Error>{field.state.meta.errors.join(", ")}</Field.Error>
                                    )}
                                </Field.Root>
                            )}
                        </form.Field>

                        <form.Field name="confirmPassword">
                            {(field) => (
                                <Field.Root>
                                    <Field.Label htmlFor={field.name}>Confirm Password</Field.Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="password"
                                        autoComplete="new-password"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="relative block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        placeholder="Confirm password"
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

                    <div>
                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Creating account..." : "Create account"}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </div>
        </div>
    );
}
