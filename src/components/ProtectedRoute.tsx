import { Navigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { Suspense } from "react";
import { Loader } from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
  const { data: currentUser } = useSuspenseQuery(
    convexQuery(api.users.getCurrentUser, {})
  );
  
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