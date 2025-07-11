import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link, Navigate, Outlet, useNavigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Menu, MenuContent } from "~/components/ui/Menu";
import { SidebarLayout } from "~/components/ui/SidebarLayout";
import { useTheme } from "~/contexts/ThemeContext";
import { useCurrentUser } from "~/hooks/useUser";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/_authenticated")({
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    return (
        <>
            <Authenticated>
                <DashboardLayout />
            </Authenticated>

            <Unauthenticated>
                <Navigate to="/login" search={{ redirect: currentPath }} />
            </Unauthenticated>
        </>
    );
}

function DashboardLayout() {
    const user = useCurrentUser();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const { signOut } = useAuthActions();

    const handleSignOut = async () => {
        await signOut();
        navigate({ to: "/login" });
    };

    return (
        <SidebarLayout>
            <SidebarLayout.Header>
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Convex TanStack Starter</h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button variant="ghost" size="sm">
                                {theme === "light" && <Icon name="sun" size="md" />}
                                {theme === "dark" && <Icon name="moon" size="md" />}
                                {theme === "system" && <Icon name="computer" size="md" />}
                            </Button>
                        </Menu.Trigger>
                        <MenuContent>
                            <Menu.Item onClick={() => setTheme("light")}>
                                <Icon name="sun" size="md" />
                                Light
                            </Menu.Item>
                            <Menu.Item onClick={() => setTheme("dark")}>
                                <Icon name="moon" size="md" />
                                Dark
                            </Menu.Item>
                            <Menu.Item onClick={() => setTheme("system")}>
                                <Icon name="computer" size="md" />
                                System
                            </Menu.Item>
                        </MenuContent>
                    </Menu.Root>

                    {/* User Dropdown */}
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <Avatar.Root size="sm">
                                    {user?.image && <Avatar.Image src={user?.image} alt={user?.name || "User"} />}
                                    <Avatar.Fallback>{(user?.name || "User").charAt(0)}</Avatar.Fallback>
                                </Avatar.Root>
                                <span className="hidden sm:inline">{user?.name || "User"}</span>
                            </Button>
                        </Menu.Trigger>
                        <MenuContent>
                            <Menu.Item asChild>
                                <Link to="/profile">Profile</Link>
                            </Menu.Item>
                            <Menu.Item asChild>
                                <Link to="/settings">Settings</Link>
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item onClick={handleSignOut}>
                                <Icon name="logout" size="md" />
                                Sign Out
                            </Menu.Item>
                        </MenuContent>
                    </Menu.Root>
                </div>
            </SidebarLayout.Header>

            <SidebarLayout.Body>
                <SidebarLayout.Sidebar>
                    <nav className="space-y-2">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors"
                            activeProps={{ className: "bg-surface-selected" }}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors"
                            activeProps={{ className: "bg-surface-selected" }}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors"
                            activeProps={{ className: "bg-surface-selected" }}
                        >
                            Settings
                        </Link>
                    </nav>
                </SidebarLayout.Sidebar>

                <SidebarLayout.Main>
                    <Outlet />
                </SidebarLayout.Main>
            </SidebarLayout.Body>
        </SidebarLayout>
    );
}
