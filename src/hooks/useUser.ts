import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function useCurrentUser() {
    const { data: user } = useSuspenseQuery(convexQuery(api.users.getCurrentUser, {}));
    return user;
}

export function useHasCompletedProfile() {
    const { data: hasCompleted } = useSuspenseQuery(convexQuery(api.users.hasCompletedProfile, {}));
    return hasCompleted;
}
