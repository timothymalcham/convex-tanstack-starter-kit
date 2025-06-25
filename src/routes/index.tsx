import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

export const Route = createFileRoute("/")({
    component: PublicIndex,
});

function PublicIndex() {
    return (
        <>
            <Authenticated>
                <Navigate to="/_authenticated" />
            </Authenticated>
            
            <Unauthenticated>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome to Convex TanStack Starter
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Please sign in to access your boards
                            </p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="/login"
                                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium"
                            >
                                Sign In
                            </a>
                            <a
                                href="/signup"
                                className="bg-gray-600 text-white hover:bg-gray-700 px-4 py-2 rounded-md font-medium"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </Unauthenticated>
        </>
    );
}