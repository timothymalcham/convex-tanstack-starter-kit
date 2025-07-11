import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Loader } from "~/components/Loader";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { useCurrentUser } from "~/hooks/useUser";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/_authenticated/dashboard")({
    component: Dashboard,
    pendingComponent: () => <Loader />,
});

function Dashboard() {
    const user = useCurrentUser();
    const boardsQuery = useSuspenseQuery(convexQuery(api.board.getBoards, {}));
    const boards = boardsQuery.data || [];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "User"}!</h1>
                    <p className="text-text-muted">Here's what's happening with your projects today.</p>
                </div>
                <Button>
                    <Icon name="plus" size="md" />
                    New Project
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <Card.Content className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-muted">Total Projects</p>
                                <p className="text-2xl font-bold">{boards.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Icon name="pin" size="md" />
                            </div>
                        </div>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-muted">Active Tasks</p>
                                <p className="text-2xl font-bold">24</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                                <Icon name="check" size="md" className="text-orange-500" />
                            </div>
                        </div>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-muted">Completed</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                <Icon name="check" size="md" className="text-green-500" />
                            </div>
                        </div>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-muted">Team Members</p>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                <Avatar.Root size="sm">
                                    <Avatar.Fallback>T</Avatar.Fallback>
                                </Avatar.Root>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            {/* Recent Projects */}
            <Card>
                <Card.Header>
                    <div className="flex items-center justify-between">
                        <div>
                            <Card.Title>Recent Projects</Card.Title>
                            <Card.Description>Your most recently accessed projects</Card.Description>
                        </div>
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </div>
                </Card.Header>
                <Card.Content>
                    {boards.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-text-muted mb-4">No projects yet</p>
                            <Button>
                                <Icon name="plus" size="md" />
                                Create your first project
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {boards.slice(0, 5).map((board) => (
                                <div
                                    key={board.id}
                                    className="flex items-center justify-between p-4 border border-border-outline rounded-lg hover:bg-surface-hover transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Icon name="pin" size="md" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{board.name}</p>
                                            <p className="text-sm text-text-muted">Last updated 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                            Active
                                        </span>
                                        <Link
                                            to="/boards/$boardId"
                                            params={{
                                                boardId: board.id,
                                            }}
                                        >
                                            <Button variant="ghost" size="sm">
                                                Open
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card.Content>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Stay updated with your latest notifications</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Icon name="settings" size="sm" />
                            Settings
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                id: 1,
                                type: "success",
                                title: "Profile updated successfully",
                                message: "Your profile information has been updated",
                                time: "2 minutes ago",
                                read: false,
                            },
                            {
                                id: 2,
                                type: "info",
                                title: "New team member joined",
                                message: "Sarah Johnson has joined your team",
                                time: "1 hour ago",
                                read: false,
                            },
                            {
                                id: 3,
                                type: "warning",
                                title: "Subscription expires soon",
                                message: "Your Pro plan expires in 7 days",
                                time: "3 hours ago",
                                read: true,
                            },
                            {
                                id: 4,
                                type: "info",
                                title: "System maintenance scheduled",
                                message: "Scheduled maintenance on Dec 15th at 2:00 AM",
                                time: "1 day ago",
                                read: true,
                            },
                        ].map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                                    notification.read
                                        ? "bg-surface-base border-border-outline"
                                        : "bg-surface-card border-primary/20"
                                }`}
                            >
                                <div className="mt-1">
                                    {notification.type === "success" && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    )}
                                    {notification.type === "info" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    {notification.type === "warning" && (
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    )}
                                    {notification.type === "error" && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`font-medium ${!notification.read ? "text-text-primary" : "text-text-muted"}`}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-text-muted whitespace-nowrap ml-2">
                                            {notification.time}
                                        </p>
                                    </div>
                                    <p className="text-sm text-text-muted mt-1">{notification.message}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-2">
                                    <Icon name="x" size="sm" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                            View All Notifications
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <Card.Header>
                        <Card.Title>Recent Activity</Card.Title>
                        <Card.Description>Latest updates from your team</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div className="space-y-4">
                            {[
                                {
                                    user: "John Doe",
                                    action: "completed task",
                                    item: "Design Review",
                                    time: "2 hours ago",
                                },
                                {
                                    user: "Jane Smith",
                                    action: "commented on",
                                    item: "API Documentation",
                                    time: "4 hours ago",
                                },
                                {
                                    user: "Mike Johnson",
                                    action: "created",
                                    item: "New Feature Request",
                                    time: "1 day ago",
                                },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Avatar.Root size="sm">
                                        <Avatar.Fallback>{activity.user.charAt(0)}</Avatar.Fallback>
                                    </Avatar.Root>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                                            <span className="font-medium">{activity.item}</span>
                                        </p>
                                        <p className="text-xs text-text-muted">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Header>
                        <Card.Title>Quick Actions</Card.Title>
                        <Card.Description>Common tasks and shortcuts</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <Icon name="plus" size="md" />
                                Create New Project
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Icon name="mail" size="md" />
                                Invite Team Member
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Icon name="check" size="md" />
                                View All Tasks
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
}
