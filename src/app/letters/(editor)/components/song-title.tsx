"use client";

import React, { useState } from "react";

import { AutosizeTextarea } from "@/components/autosize-textarea";
import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor-provider";

interface Props {
  className?: string;
}

export const SongTitle = ({ className }: Props) => {
  const { songTitle, setSongTitle } = useEditor();

  const [isEditing, setIsEditing] = useState<boolean>(true);

  return (
    <div className={cn("sticky top-[64px] z-20 bg-background", className)} onClick={() => setIsEditing(true)}>
      {isEditing || !songTitle ? (
        <AutosizeTextarea
          value={songTitle ?? ""}
          onBlur={() => setIsEditing(false)}
          onChange={e => setSongTitle(e.target.value)}
          placeholder="Title song"
          autoFocus
          className={cn(
            "h-[80px] w-full resize-none appearance-none border-none bg-transparent p-4 font-heading text-5xl font-bold outline-none placeholder:text-muted"
          )}
        />
      ) : (
        <h1 className={cn("h-[80px] truncate p-4 text-5xl font-bold outline-none")}>{songTitle}</h1>
      )}
    </div>
  );
};
