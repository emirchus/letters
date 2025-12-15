"use server";

import {redirect, RedirectType} from "next/navigation";
import {Suspense} from "react";

import {SongTitle} from "@/app/letters/(editor)/components/song-title";
import {TextChordViewer} from "@/app/letters/(editor)/components/text-chord-viewer";
import {ChordEditor} from "@/app/letters/(editor)/components/text-editor";
import {ToolbarPortal} from "@/app/letters/(editor)/components/toolbar";
import {getSong} from "@/app/supabase/get-song";
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {EditorContextProvider} from "@/provider/editor-provider";

interface Props {
  params: Promise<{letterId?: string | string[]}>;
}

export default async function HomePage({params}: Props) {
  const {letterId} = await params;

  if (Array.isArray(letterId) && letterId.length > 1) {
    redirect(`/letters/${letterId[0]}`, RedirectType.replace);
  }

  const letterStringId = Array.isArray(letterId) ? letterId[0] : (letterId ?? "");

  const song = await getSong(letterStringId);

  return (
    <EditorContextProvider songTitle={song?.title}>
      <div className="h-screen w-full flex-1 overflow-auto overflow-x-hidden">
        <header className="bg-background sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="h-4" orientation="vertical" />
          {new Date().toLocaleDateString("es")}
        </header>
        <SongTitle className="w-screen md:w-[calc(100vw-var(--sidebar-width))] md:group-data-[state=collapsed]/wrapper:w-screen" />

        <div className="relative flex w-screen flex-col space-y-4 p-4 md:w-[calc(100vw-var(--sidebar-width))] md:group-data-[state=collapsed]/wrapper:w-screen">
          <Suspense>
            <TextChordViewer />
          </Suspense>
          <ChordEditor className="" />
        </div>
      </div>
      <ToolbarPortal />
    </EditorContextProvider>
  );
}
