"use server";

import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

import { SongTitle } from "@/app/letters/(editor)/components/song-title";
import { TextChordViewer } from "@/app/letters/(editor)/components/text-chord-viewer";
import { ChordEditor } from "@/app/letters/(editor)/components/text-editor";
import { ToolbarPortal } from "@/app/letters/(editor)/components/toolbar";
import { getSong } from "@/app/supabase/get-song";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditorContextProvider } from "@/provider/editor-provider";

interface Props {
  params: Promise<{ letterId?: string | string[] }>;
}

export default async function HomePage({ params }: Props) {
  const { letterId } = await params;

  if (Array.isArray(letterId) && letterId.length > 1) {
    redirect(`/letters/${letterId[0]}`, RedirectType.replace);
  }

  const letterStringId = Array.isArray(letterId) ? letterId[0] : (letterId ?? "");

  const song = await getSong(letterStringId);

  return (
    <EditorContextProvider songTitle={song?.title}>
      <div className="h-screen w-full flex-1 overflow-auto overflow-x-hidden">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          {new Date().toLocaleDateString("es")}
        </header>
        <SongTitle className="w-[calc(100vw-var(--sidebar-width))] group-data-[state=collapsed]/wrapper:w-screen" />

        <div className="relative flex w-[calc(100vw-var(--sidebar-width)-370px)] flex-row p-4 group-data-[state=collapsed]/wrapper:w-[calc(100vw-370px)]">
          <ChordEditor />
          <Suspense>
            <TextChordViewer />
          </Suspense>
        </div>
      </div>
      <ToolbarPortal />
    </EditorContextProvider>
  );
}
