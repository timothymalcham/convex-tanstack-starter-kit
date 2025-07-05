import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexMutation } from "@convex-dev/react-query";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Field } from "~/components/ui/Field";
import { Input } from "~/components/ui/Input";
import { Switch } from "~/components/ui/Switch";
import { useCurrentUser } from "~/hooks/useUser";
import { SessionManagement } from "~/components/SessionManagement";

const profileFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email(),
    emailNotifications: z.boolean(),
});

export const Route = createFileRoute("/_authenticated/profile")({
    component: ProfilePage,
});

function ProfilePage() {
    const navigate = useNavigate();
    const { signOut } = useAuthActions();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Fetch current user data
    const currentUser = useCurrentUser();

    // Update profile mutation
    const updateProfile = useConvexMutation(api.users.updateProfile);

    // Delete account mutation
    const deleteAccount = useConvexMutation(api.users.deleteAccount);

    const form = useForm({
        defaultValues: {
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            emailNotifications: currentUser?.emailNotifications ?? true,
        },
        onSubmit: async ({ value }) => {
            try {
                await updateProfile({
                    name: value.name,
                    emailNotifications: value.emailNotifications,
                });
                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to update profile");
            }
        },
        validators: {
            onChange: profileFormSchema,
        },
    });

    const handleSignOut = async () => {
        await signOut();
        await navigate({ to: "/login" });
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount({});
            await signOut();
            await navigate({ to: "/" });
            toast.success("Account deleted successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete account");
        }
    };

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <form.Field name="name">
                                    {(field) => (
                                        <Field.Root>
                                            <Field.Label htmlFor={field.name}>Name</Field.Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 sm:text-sm"
                                                placeholder="Enter your name"
                                            />
                                            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                                <Field.Error>{field.state.meta.errors.join(", ")}</Field.Error>
                                            )}
                                        </Field.Root>
                                    )}
                                </form.Field>

                                <form.Field name="email">
                                    {(field) => (
                                        <Field.Root>
                                            <Field.Label htmlFor={field.name}>Email</Field.Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                value={field.state.value}
                                                disabled
                                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:border-gray-600 dark:bg-gray-900 sm:text-sm"
                                            />
                                            <Field.Description>Email cannot be changed</Field.Description>
                                        </Field.Root>
                                    )}
                                </form.Field>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Email Preferences
                                </h3>

                                <form.Field name="emailNotifications">
                                    {(field) => (
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <label
                                                    htmlFor={field.name}
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Email Notifications
                                                </label>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Receive email notifications about important updates
                                                </p>
                                            </div>
                                            <Switch
                                                id={field.name}
                                                checked={field.state.value}
                                                onCheckedChange={(checked) => field.handleChange(checked)}
                                                className="ml-4"
                                            />
                                        </div>
                                    )}
                                </form.Field>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex justify-between">
                                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                        {([canSubmit, isSubmitting]) => (
                                            <Button
                                                type="submit"
                                                disabled={!canSubmit || isSubmitting}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </Button>
                                        )}
                                    </form.Subscribe>

                                    <Button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Danger Zone</h2>
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                                <div className="flex">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                                            Delete Account
                                        </h3>
                                        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        <Button
                                            type="button"
                                            onClick={() => setShowDeleteDialog(true)}
                                            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <SessionManagement />
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Information</h2>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 font-mono">
                                    {currentUser._id}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verified</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                                    {currentUser.emailVerificationTime ? (
                                        <span className="text-green-600 dark:text-green-400">Verified</span>
                                    ) : (
                                        <span className="text-yellow-600 dark:text-yellow-400">Not verified</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Account Created
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                                    {new Date(currentUser._creationTime).toLocaleDateString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Sign-in Methods
                                </dt>
                                <dd className="mt-1">
                                    <div className="flex flex-wrap gap-2">
                                        {currentUser.authProviders.map((provider) => (
                                            <span
                                                key={provider}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            >
                                                {provider === "password" ? "Email/Password" : 
                                                 provider === "github" ? "GitHub" :
                                                 provider === "google" ? "Google" : 
                                                 provider.charAt(0).toUpperCase() + provider.slice(1)}
                                            </span>
                                        ))}
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Delete Account</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone. All of your data
                            will be permanently removed.
                        </p>
                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                onClick={() => setShowDeleteDialog(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
