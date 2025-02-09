"use client";

import { ArrowDownWideNarrowIcon, Copy, Edit, MoreHorizontal, Share, Trash2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { use } from "react";

import { getSongs } from "@/app/supabase/get-songs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
            <Link href={`/letters/${item.id}`} className="flex cursor-pointer">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage className="object-cover" src={item.cover} alt={item.title} />
                <AvatarFallback className="rounded-lg">{item.title[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{item.title}</span>
                <span className="truncate text-xs">{item.author}</span>
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
