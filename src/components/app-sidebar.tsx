import { BookTypeIcon, GalleryVerticalEnd, LetterText, NotepadText } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavQuotaCard } from "./nav-quota-card";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LetterText className="size-4" />
              </div>
              <div className="flex flex-col justify-center gap-0.5 leading-none">
                <h1 className="!font-heading font-semibold">Letters</h1>
                <span className="font-mono text-xs">v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {[
              {
                title: "Mi canción :v",
                author: "Emirchus",
                url: "#",
              },
              {
                title: "Av. santa fé",
                author: "Facu Tobogán",
                url: "#",
              },
              {
                title: "Té para tres",
                author: "Soda Stereo",
                url: "#",
              },
            ].map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton size={"lg"}>
                  <div className="flex flex-row items-start gap-2">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <NotepadText className="size-4" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold">{item.title}</h3>
                      <h4 className="text-xs text-muted-foreground">{item.author}</h4>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <NavQuotaCard />
        </div>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
