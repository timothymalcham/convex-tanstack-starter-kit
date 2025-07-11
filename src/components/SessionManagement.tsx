import { formatDistanceToNow } from "date-fns";
import { Loader2, Monitor, Shield, Trash2 } from "lucide-react";
import { useRevokeOtherSessions, useRevokeSession, useSessionStats, useUserSessions } from "../hooks/useSessions";
import { Card } from "./Card";
import { Button } from "./ui/Button";

export function SessionManagement() {
    const { data: sessions, isLoading: sessionsLoading } = useUserSessions();
    const { data: stats } = useSessionStats();
    const revokeSession = useRevokeSession();
    const revokeOtherSessions = useRevokeOtherSessions();

    if (sessionsLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Session Management</h2>
                <p className="text-sm text-muted-foreground">
                    Manage your active sessions and enhance your account security
                </p>
            </div>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                        <div className="flex items-center space-x-2">
                            <Monitor className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Active Sessions</p>
                                <p className="text-2xl font-semibold">{stats.activeSessions}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Total Sessions</p>
                                <p className="text-2xl font-semibold">{stats.totalSessions}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Oldest Session</p>
                            <p className="text-sm font-medium">
                                {formatDistanceToNow(Date.now() - stats.oldestSessionAge, { addSuffix: true })}
                            </p>
                        </div>
                    </Card>
                </div>
            )}

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium">Active Sessions</h3>
                    {sessions && sessions.length > 1 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeOtherSessions.mutate()}
                            disabled={revokeOtherSessions.isPending}
                        >
                            Revoke All Other Sessions
                        </Button>
                    )}
                </div>

                <div className="space-y-2">
                    {sessions?.map((session) => (
                        <Card key={session._id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <Monitor className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            {session.isCurrent ? "Current Session" : "Other Session"}
                                        </span>
                                        {session.isCurrent && (
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Created {formatDistanceToNow(session._creationTime, { addSuffix: true })}
                                    </p>
                                    {session.expirationTime && (
                                        <p className="text-xs text-muted-foreground">
                                            Expires {formatDistanceToNow(session.expirationTime, { addSuffix: true })}
                                        </p>
                                    )}
                                </div>
                                {!session.isCurrent && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => revokeSession.mutate(session._id)}
                                        disabled={revokeSession.isPending}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
