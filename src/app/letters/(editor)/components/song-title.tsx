"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor-provider";

export const SongTitle = () => {
  const { songTitle, setSongTitle } = useEditor();

  const [isEditing, setIsEditing] = useState<boolean>(true);

  return (
    <div className="flex flex-row items-start justify-start" onClick={() => setIsEditing(true)}>
      {isEditing || !songTitle ? (
        <input
          value={songTitle ?? ""}
          onBlur={() => setIsEditing(false)}
          onChange={e => setSongTitle(e.target.value)}
          placeholder="Title song"
          autoFocus
          className="m-auto h-[80px] w-full appearance-none border-none bg-transparent p-4 font-heading text-5xl font-bold outline-none placeholder:text-muted"
        />
      ) : (
        <h1 className={cn("h-[80px] p-4 text-5xl font-bold outline-none")}>{songTitle}</h1>
      )}
    </div>
  );
};
