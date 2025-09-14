import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
    SidebarFooter
} from "@/components/ui/sidebar"
import {NavUser} from "@/components/nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Section 1",
      url: "#",
      items: [
        {
          title: "A Nav Item",
          url: "#",
        },
        {
          title: "Another Nav Item",
          url: "#",
        },
      ],
    },
    {
      title: "Section 2",
      url: "#",
      items: [
        {
          title: "Nav Item",
          url: "#",
        },
        {
          title: "Nav Item",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
}

export function AppSidebar({ user, ...props }: { user: { avatar?:string, name?: string, email?: string }} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
          <h1 className="text-sm uppercase p-2 pt-3 font-semibold">Tanstack + Convex <br />Starter Kit</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
        <SidebarFooter>
            <NavUser user={user} />
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
