'use server';

import { LetterText } from 'lucide-react';
import { RedirectType } from 'next/navigation';
import * as React from 'react';
import { getSongs } from '@/app/supabase/get-songs';
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
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/server';
import { encodedRedirect } from '@/lib/utils';
import { NavMain } from './nav-main';
import { NavQuotaCard } from './nav-quota-card';
import { NavUser } from './nav-user';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const supabase = await createClient();

  // const {
  //   data: {user},
  //   error,
  // } = await supabase.auth.getUser();

  // if (error || !user) {
  //   return encodedRedirect("error", "/login", error?.message ?? "Unknown error", {
  //     type: RedirectType.replace,
  //   });
  // }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="font-heading! text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 font-semibold outline-hidden transition-[margin] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0">
              Letters
            </h1>
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
            name: 'Papurri13',
            email: '',
            avatar: '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
