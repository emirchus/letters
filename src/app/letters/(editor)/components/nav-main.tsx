"use client";

import { ArrowDownWideNarrowIcon, Copy, Edit, MoreHorizontal, NotepadText, Share, Trash2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { use } from "react";

import { getSongs } from "@/app/supabase/get-songs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface Props {
  promise: Promise<Awaited<ReturnType<typeof getSongs>>>;
}

export const NavMain = ({ promise }: Props) => {
  const songs = use(promise);
  return (
    <SidebarMenu className="gap-2">
      {songs?.map(item => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton size={"lg"} asChild>
            <Link href={`/letters/${item.id}`} className="flex cursor-pointer flex-row items-start gap-2">
              <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <NotepadText className="size-4" />
              </div>
              <div
                className="flex w-full flex-col overflow-hidden"
                style={{
                  width: "calc(var(--sidebar-width) - 5rem)",
                }}
              >
                <h3 className="truncate font-bold">{item.title}</h3>
                <h4 className="truncate text-xs text-muted-foreground">{item.author}</h4>
              </div>
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={false ? "bottom" : "right"}
              align={false ? "end" : "start"}
              className="min-w-56 rounded-lg"
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{item.title}</span>
                    <span className="truncate text-xs">{item.author}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Edit />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy />
                  Copy
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowDownWideNarrowIcon />
                  Download
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
