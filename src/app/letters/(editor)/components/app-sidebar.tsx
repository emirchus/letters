"use server";

import { LetterText } from "lucide-react";
import { RedirectType } from "next/navigation";
import * as React from "react";

import { getSongs } from "@/app/supabase/get-songs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { NavMain } from "./nav-main";
import { NavQuotaCard } from "./nav-quota-card";
import { NavUser } from "./nav-user";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return encodedRedirect("error", "/login", error?.message ?? "Unknown error", {
      type: RedirectType.replace,
    });
  }

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
          <React.Suspense
            fallback={
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton className="bg-primary/50" />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            }
          >
            <NavMain promise={getSongs()} />
          </React.Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <NavQuotaCard />
        </div>
        <NavUser
          user={{
            name: user?.user_metadata?.name ?? "Unknown",
            email: user?.email ?? "Unknown",
            avatar: user?.user_metadata?.avatar_url ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
