import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import {createFileRoute, Outlet} from "@tanstack/react-router";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { api } from "../../convex/_generated/api";
import {AppHeader} from "@/components/app-header";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}