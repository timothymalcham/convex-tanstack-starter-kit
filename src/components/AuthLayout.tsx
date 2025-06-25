import { useAuthActions } from "@convex-dev/auth/react";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { Avatar } from "../components/ui/Avatar";
import { Menu } from "../components/ui/Menu";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const navigate = useNavigate();
    const { signOut } = useAuthActions();

    // Fetch current user data
    const { data: currentUser } = useSuspenseQuery(convexQuery(api.users.getCurrentUser, {}));

    const handleSignOut = async () => {
        await signOut();
        await navigate({ to: "/login" });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                                    Convex TanStack Starter
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center">
                            {currentUser ? (
                                <Menu.Root>
                                    <Menu.Trigger>
                                        <button
                                            type="button"
                                            className="flex items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <Avatar.Root className="h-8 w-8">
                                                <Avatar.Fallback className="bg-indigo-600 text-white">
                                                    {currentUser.name?.[0] || currentUser.email[0].toUpperCase()}
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                        </button>
                                    </Menu.Trigger>

                                    <Menu.Portal>
                                        <Menu.Positioner>
                                            <Menu.Popup className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                <div className="py-1">
                                                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                                                        <div className="font-medium">{currentUser.name || "User"}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {currentUser.email}
                                                        </div>
                                                    </div>

                                                    <Menu.Item>
                                                        <Link
                                                            to="/profile"
                                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            Profile Settings
                                                        </Link>
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        <Link
                                                            to="/boards/$boardId"
                                                            params={{ boardId: "1" }}
                                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            Boards
                                                        </Link>
                                                    </Menu.Item>

                                                    <Menu.Separator className="my-1 border-t border-gray-200 dark:border-gray-700" />

                                                    <Menu.Item>
                                                        <button
                                                            onClick={handleSignOut}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            Sign Out
                                                        </button>
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Popup>
                                        </Menu.Positioner>
                                    </Menu.Portal>
                                </Menu.Root>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
