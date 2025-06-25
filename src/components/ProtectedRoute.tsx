import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { api } from "../../convex/_generated/api";
import { Loader } from "./Loader";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
    const { data: currentUser } = useSuspenseQuery(convexQuery(api.users.getCurrentUser, {}));

    if (!currentUser) {
        return <Navigate to="/login" search={{ redirect: window.location.pathname }} />;
    }

    return <>{children}</>;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    return (
        <Suspense fallback={<Loader />}>
            <ProtectedRouteInner>{children}</ProtectedRouteInner>
        </Suspense>
    );
}
