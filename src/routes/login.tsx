import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { Input } from "../components/ui/Input";
import { SocialLoginButtons } from "../components/SocialLoginButtons";

const loginSearchSchema = z.object({
    error: z.string().optional(),
    success: z.string().optional(),
    redirect: z.string().optional(),
});

const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/login")({
    validateSearch: loginSearchSchema,
    component: LoginPage,
});

function LoginPage() {
    const { signIn } = useAuthActions();
    const navigate = useNavigate();
    const { error, success, redirect } = Route.useSearch();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData();
                formData.append("email", value.email);
                formData.append("password", value.password);

                await signIn("password", formData);
                // Redirect to the intended page or home
                await navigate({ to: redirect || "/" });
            } catch (err) {
                // Update search params with error
                await navigate({
                    to: "/login",
                    search: {
                        error: err instanceof Error ? err.message : "Failed to sign in",
                        redirect,
                    },
                });
            }
        },
        validators: {
            onChange: loginFormSchema,
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or{" "}
                        <Link
                            to="/signup"
                            search={{ redirect }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            create a new account
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
                                        autoComplete="current-password"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="relative block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        placeholder="Password"
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
                                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Signing in..." : "Sign in"}
                                </Button>
                            )}
                        </form.Subscribe>

                        <div className="text-center">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </form>

                <SocialLoginButtons redirect={redirect} />
            </div>
        </div>
    );
}
