import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { Id } from "../../convex/_generated/dataModel";
import { useConvexMutation } from "@convex-dev/react-query";
import { toast } from "sonner";

// Hook to get current session
export function useCurrentSession() {
  return useQuery(convexQuery(api.sessions.getCurrentSession, {}));
}

// Hook to get all user sessions
export function useUserSessions() {
  return useQuery(convexQuery(api.sessions.getUserSessions, {}));
}

// Hook to get session statistics
export function useSessionStats() {
  return useQuery(convexQuery(api.sessions.getSessionStats, {}));
}

// Hook to revoke a specific session
export function useRevokeSession() {
  const mutation = useConvexMutation(api.sessions.revokeSession);
  
  return useMutation({
    mutationFn: async (sessionId: Id<"authSessions">) => {
      return mutation({ sessionId });
    },
    onSuccess: () => {
      toast.success("Session revoked successfully");
    },
    onError: (error) => {
      toast.error(`Failed to revoke session: ${error.message}`);
    },
  });
}

// Hook to revoke all other sessions
export function useRevokeOtherSessions() {
  const mutation = useConvexMutation(api.sessions.revokeOtherSessions);
  
  return useMutation({
    mutationFn: async () => {
      return mutation({});
    },
    onSuccess: (data) => {
      if (data.revokedCount > 0) {
        toast.success(`Revoked ${data.revokedCount} session${data.revokedCount > 1 ? 's' : ''}`);
      } else {
        toast.info("No other sessions to revoke");
      }
    },
    onError: (error) => {
      toast.error(`Failed to revoke sessions: ${error.message}`);
    },
  });
}