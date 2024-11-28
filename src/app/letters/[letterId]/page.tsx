import { TextChordViewer } from "@/app/letters/components/text-chord-viewer";
import { ChordEditor } from "@/app/letters/components/text-editor";
import ToolbarExpandable from "@/app/letters/components/toolbar";
import { getSong } from "@/app/supabase/get-song";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditorContextProvider } from "@/provider/editor-provider";

export async function generateMetadata({ params }: { params: Promise<{ letterId: string }> }) {
  const { letterId } = await params;
  const song = await getSong(letterId);

  return {
    title: song?.title,
  };
}

export default async function HomePage({ params }: { params: Promise<{ letterId: string }> }) {
  const { letterId } = await params;
  const song = await getSong(letterId);

  return (
    <EditorContextProvider>
      <div className="h-full w-full flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          {new Date().toLocaleDateString("es")}
        </header>
        <h1 className="p-4 text-5xl font-bold">{song?.title}</h1>

        <div className="relative flex w-[calc(100vw-var(--sidebar-width))] flex-row p-4">
          <ChordEditor />
          <TextChordViewer />
          <ToolbarExpandable />
        </div>
      </div>
    </EditorContextProvider>
  );
}
